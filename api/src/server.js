/**
 * Audiencerate — Frontend Assignment mock API
 * A small in-memory REST API simulating a Data Management Platform (DMP).
 *
 *   npm install
 *   npm start            # http://localhost:4000
 *
 * Config (optional env vars):
 *   PORT=4000            # port to listen on
 *   LATENCY_MS=250       # simulated base latency per request (helps you build
 *                        # proper loading states); set to 0 to disable
 *
 * Testing error states:
 *   Send header  x-simulate-error: 500  on any request to force a 500 response.
 */

const express = require('express');
const cors = require('cors');
const { state, trendFor, overview, nextSegmentId, nextActivationId } = require('./data');
const { paginate, sortItems } = require('./helpers');

const app = express();
const PORT = process.env.PORT || 4000;
const LATENCY_MS = process.env.LATENCY_MS != null ? Number(process.env.LATENCY_MS) : 250;

app.use(cors());
app.use(express.json());

// --- On-demand error injection (for testing error UI) -----------------------
app.use((req, res, next) => {
  if (req.headers['x-simulate-error']) {
    const code = parseInt(req.headers['x-simulate-error'], 10) || 500;
    return res
      .status(code)
      .json({ error: { code, message: 'Simulated error (x-simulate-error header).' } });
  }
  next();
});

// --- Simulated latency ------------------------------------------------------
app.use((req, res, next) => {
  if (!LATENCY_MS) return next();
  const jitter = Math.random() * 150;
  setTimeout(next, LATENCY_MS + jitter);
});

const notFound = (res, message = 'Resource not found') =>
  res.status(404).json({ error: { code: 404, message } });

const badRequest = (res, message, details) =>
  res.status(400).json({ error: { code: 400, message, details } });

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// ---------------------------------------------------------------------------
// Overview / dashboard KPIs
// ---------------------------------------------------------------------------
app.get('/api/overview', (_req, res) => res.json(overview()));

// ---------------------------------------------------------------------------
// Data sources
// ---------------------------------------------------------------------------
app.get('/api/data-sources', (_req, res) => res.json({ data: state.dataSources }));

// ---------------------------------------------------------------------------
// Destinations
// ---------------------------------------------------------------------------
app.get('/api/destinations', (_req, res) => res.json({ data: state.destinations }));

// ---------------------------------------------------------------------------
// Segments — list with search / filter / sort / pagination
//   GET /api/segments?page=1&pageSize=12&search=foo&status=active
//                     &dataSourceId=ds_001&tag=high-value&sort=-audienceSize
// ---------------------------------------------------------------------------
app.get('/api/segments', (req, res) => {
  let items = [...state.segments];
  const { search, status, dataSourceId, tag, sort } = req.query;

  if (search) {
    const q = String(search).toLowerCase();
    items = items.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
    );
  }
  if (status) {
    const allowed = String(status).split(',');
    items = items.filter((s) => allowed.includes(s.status));
  }
  if (dataSourceId) items = items.filter((s) => s.dataSourceIds.includes(dataSourceId));
  if (tag) items = items.filter((s) => s.tags.includes(tag));

  items = sortItems(items, sort || '-updatedAt');
  res.json(paginate(items, req.query));
});

app.get('/api/segments/:id', (req, res) => {
  const segment = state.segments.find((s) => s.id === req.params.id);
  if (!segment) return notFound(res, `No segment with id ${req.params.id}`);
  res.json({ data: segment });
});

// Trend / time series for a single segment
//   GET /api/segments/:id/trend?range=30   (range in days: 7, 30, 90)
app.get('/api/segments/:id/trend', (req, res) => {
  const segment = state.segments.find((s) => s.id === req.params.id);
  if (!segment) return notFound(res, `No segment with id ${req.params.id}`);
  const range = Math.min(180, Math.max(7, parseInt(req.query.range, 10) || 30));
  res.json({ data: trendFor(segment, range) });
});

// Activations for a single segment
app.get('/api/segments/:id/activations', (req, res) => {
  const segment = state.segments.find((s) => s.id === req.params.id);
  if (!segment) return notFound(res, `No segment with id ${req.params.id}`);
  const list = state.activations
    .filter((a) => a.segmentId === segment.id)
    .map((a) => ({
      ...a,
      destination: state.destinations.find((d) => d.id === a.destinationId) || null,
    }));
  res.json({ data: list });
});

// Create a segment
function validateSegment(body) {
  const errors = {};
  if (!body || typeof body.name !== 'string' || body.name.trim().length < 3)
    errors.name = 'Name is required and must be at least 3 characters.';
  if (body && body.name && body.name.length > 80)
    errors.name = 'Name must be at most 80 characters.';
  if (body && body.status && !['active', 'draft', 'archived'].includes(body.status))
    errors.status = 'Status must be one of: active, draft, archived.';
  if (body && body.dataSourceIds) {
    if (!Array.isArray(body.dataSourceIds)) errors.dataSourceIds = 'Must be an array of data source ids.';
    else {
      const unknown = body.dataSourceIds.filter(
        (id) => !state.dataSources.some((d) => d.id === id)
      );
      if (unknown.length) errors.dataSourceIds = `Unknown data source ids: ${unknown.join(', ')}`;
    }
  }
  if (body && body.tags && !Array.isArray(body.tags)) errors.tags = 'Tags must be an array of strings.';
  return errors;
}

app.post('/api/segments', (req, res) => {
  const errors = validateSegment(req.body);
  if (Object.keys(errors).length) return badRequest(res, 'Validation failed', errors);

  const now = new Date().toISOString();
  const segment = {
    id: nextSegmentId(),
    name: req.body.name.trim(),
    description: (req.body.description || '').trim(),
    status: req.body.status || 'draft',
    audienceSize: Math.round((req.body.dataSourceIds?.length || 1) * (50000 + Math.random() * 400000)),
    matchRate: Number((0.4 + Math.random() * 0.4).toFixed(2)),
    dataSourceIds: req.body.dataSourceIds || [],
    tags: req.body.tags || [],
    createdBy: 'You',
    createdAt: now,
    updatedAt: now,
  };
  state.segments.unshift(segment);
  res.status(201).json({ data: segment });
});

// Update a segment (partial)
app.patch('/api/segments/:id', (req, res) => {
  const segment = state.segments.find((s) => s.id === req.params.id);
  if (!segment) return notFound(res, `No segment with id ${req.params.id}`);

  const errors = validateSegment({ name: segment.name, ...req.body });
  if (Object.keys(errors).length) return badRequest(res, 'Validation failed', errors);

  const editable = ['name', 'description', 'status', 'dataSourceIds', 'tags'];
  editable.forEach((key) => {
    if (req.body[key] !== undefined) segment[key] = req.body[key];
  });
  segment.updatedAt = new Date().toISOString();
  res.json({ data: segment });
});

// Delete a segment
app.delete('/api/segments/:id', (req, res) => {
  const idx = state.segments.findIndex((s) => s.id === req.params.id);
  if (idx === -1) return notFound(res, `No segment with id ${req.params.id}`);
  state.segments.splice(idx, 1);
  state.activations = state.activations.filter((a) => a.segmentId !== req.params.id);
  res.status(204).end();
});

// ---------------------------------------------------------------------------
// Activations
// ---------------------------------------------------------------------------
app.get('/api/activations', (req, res) => {
  let items = state.activations;
  if (req.query.segmentId) items = items.filter((a) => a.segmentId === req.query.segmentId);
  if (req.query.destinationId) items = items.filter((a) => a.destinationId === req.query.destinationId);
  const enriched = items.map((a) => ({
    ...a,
    segment: state.segments.find((s) => s.id === a.segmentId)
      ? { id: a.segmentId, name: state.segments.find((s) => s.id === a.segmentId).name }
      : null,
    destination: state.destinations.find((d) => d.id === a.destinationId) || null,
  }));
  res.json(paginate(sortItems(enriched, req.query.sort || '-createdAt'), req.query));
});

// Activate a segment to a destination
app.post('/api/activations', (req, res) => {
  const errors = {};
  const segment = state.segments.find((s) => s.id === req.body?.segmentId);
  const destination = state.destinations.find((d) => d.id === req.body?.destinationId);
  if (!segment) errors.segmentId = 'A valid segmentId is required.';
  if (!destination) errors.destinationId = 'A valid destinationId is required.';
  if (Object.keys(errors).length) return badRequest(res, 'Validation failed', errors);

  const now = new Date().toISOString();
  const activation = {
    id: nextActivationId(),
    segmentId: segment.id,
    destinationId: destination.id,
    status: 'syncing',
    syncedProfiles: 0,
    createdAt: now,
    lastSyncAt: now,
  };
  state.activations.unshift(activation);
  res.status(201).json({ data: { ...activation, segment: { id: segment.id, name: segment.name }, destination } });
});

// Update activation status (e.g. pause / resume)
app.patch('/api/activations/:id', (req, res) => {
  const activation = state.activations.find((a) => a.id === req.params.id);
  if (!activation) return notFound(res, `No activation with id ${req.params.id}`);
  if (req.body.status && !['live', 'syncing', 'paused', 'error'].includes(req.body.status))
    return badRequest(res, 'Validation failed', { status: 'Invalid status.' });
  if (req.body.status) activation.status = req.body.status;
  activation.lastSyncAt = new Date().toISOString();
  res.json({ data: activation });
});

// ---------------------------------------------------------------------------
app.use((_req, res) => notFound(res, 'Unknown endpoint'));

// Clean error responses (e.g. malformed JSON body) instead of HTML stack traces
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  if (err && (err.type === 'entity.parse.failed' || err instanceof SyntaxError)) {
    return res.status(400).json({ error: { code: 400, message: 'Invalid JSON body.' } });
  }
  console.error(err);
  return res.status(500).json({ error: { code: 500, message: 'Internal server error.' } });
});

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`\n  Audiencerate DMP mock API`);
  console.log(`  → http://localhost:${PORT}/api`);
  console.log(`  → simulated latency: ${LATENCY_MS}ms (+jitter). Set LATENCY_MS=0 to disable.\n`);
});
