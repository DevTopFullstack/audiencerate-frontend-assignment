# Audiencerate DMP — Mock API Reference

A small in-memory REST API that simulates a Data Management Platform (DMP).
You do **not** need to modify it — just consume it from your frontend.

## Running it

```bash
cd api
npm install
npm start
# → http://localhost:4000
```

Requirements: Node.js 18+. No database, no build step.

- Data is **deterministic** (same dataset for everyone) and lives in memory.
- Mutations (create / update / delete) persist until you restart the process, then reset.
- Every request has a small **simulated latency** (~250 ms) so you can build real
  loading states. Disable with `LATENCY_MS=0 npm start`.
- Change the port with `PORT=5000 npm start`.

### Forcing errors (to test error UI)

Send the header `x-simulate-error: 500` (or `400`, `503`, …) on any request and the
API will return that status. Handy for exercising your error / retry states.

CORS is open, so a dev server on any port can call it directly (client-side).

### Consuming it

The API is open (no auth) so your RTK Query `baseQuery` can point straight at
`http://localhost:4000/api`. CORS is open, so the Vite dev server on any port can
call it directly.

---

## Conventions

- Base URL: `http://localhost:4000/api`
- List endpoints return `{ "data": [...], "pagination": {...} }`.
- Single-resource endpoints return `{ "data": {...} }`.
- Errors return `{ "error": { "code": number, "message": string, "details"?: {...} } }`.

---

## Endpoints

### `GET /api/overview`
Dashboard aggregates.
```jsonc
{
  "kpis": {
    "totalProfiles": 40828000,
    "totalSegments": 64,
    "activeSegments": 28,
    "avgMatchRate": 0.67,
    "totalActivations": 41,
    "identitiesResolved": 27527003
  },
  "segmentsByStatus": { "active": 28, "draft": 21, "archived": 15 },
  "profilesTrend": [ { "date": "2026-05-01", "profiles": 33500000 }, ... ], // 30 points
  "topSegments": [ { "id": "seg_0025", "name": "Mortgage Intenders", "audienceSize": 4153000 }, ... ]
}
```

### `GET /api/segments`
List of audience segments with search / filter / sort / pagination.

| Query param     | Example                | Notes                                                            |
|-----------------|------------------------|------------------------------------------------------------------|
| `page`          | `2`                    | default `1`                                                      |
| `pageSize`      | `12`                   | default `12`, max `100`                                          |
| `search`        | `cart`                 | matches name / description / tags                                |
| `status`        | `active` or `active,draft` | comma-separated                                              |
| `dataSourceId`  | `ds_001`               | only segments fed by this source                                 |
| `tag`           | `high-value`           | single tag                                                       |
| `sort`          | `-audienceSize`        | field asc, or `-field` desc (`name`, `audienceSize`, `updatedAt`, `matchRate`) |

Returns:
```jsonc
{
  "data": [ Segment, ... ],
  "pagination": { "page": 1, "pageSize": 12, "total": 28, "totalPages": 3 }
}
```

**Segment shape:**
```jsonc
{
  "id": "seg_0001",
  "name": "High-Value Shoppers",
  "description": "Profiles built from first-party behavioural signals.",
  "status": "active",            // "active" | "draft" | "archived"
  "audienceSize": 1840500,
  "matchRate": 0.62,             // 0..1
  "dataSourceIds": ["ds_001", "ds_004"],
  "tags": ["high-value", "loyalty"],
  "createdBy": "Giulia B.",
  "createdAt": "2025-08-12T...Z",
  "updatedAt": "2026-05-20T...Z"
}
```

### `GET /api/segments/:id`
Single segment → `{ "data": Segment }`. `404` if missing.

### `GET /api/segments/:id/trend?range=30`
Audience-size time series. `range` in days (7–180, default 30).
```jsonc
{ "data": [ { "date": "2026-05-22", "audienceSize": 1499215, "matchedProfiles": 1229356 }, ... ] }
```

### `GET /api/segments/:id/activations`
Activations for one segment, each enriched with its `destination` object.

### `POST /api/segments`
Create a segment.
```jsonc
// body
{ "name": "My Segment", "status": "draft", "description": "...", "dataSourceIds": ["ds_001"], "tags": ["b2b"] }
```
- `name` required (3–80 chars). Other fields optional.
- `201` → `{ "data": Segment }`. `400` → `{ "error": { ..., "details": { "name": "..." } } }`.

### `PATCH /api/segments/:id`
Partial update of `name`, `description`, `status`, `dataSourceIds`, `tags`.
Returns `{ "data": Segment }`. `404` if missing, `400` on validation failure.

### `DELETE /api/segments/:id`
`204` on success. `404` if missing.

### `GET /api/data-sources`
`{ "data": [ { "id": "ds_001", "name": "Salesforce CRM", "type": "CRM", "status": "connected", "profilesCount": 1234000, "matchRate": 0.71, "lastSyncAt": "...Z" }, ... ] }`

### `GET /api/destinations`
`{ "data": [ { "id": "dest_001", "name": "Google Ads", "color": "#4285F4" }, ... ] }`

### `GET /api/activations?segmentId=&destinationId=&sort=&page=&pageSize=`
List of activations, each enriched with `segment` and `destination`.
```jsonc
{
  "id": "act_0001",
  "segmentId": "seg_0001",
  "destinationId": "dest_002",
  "status": "live",          // "live" | "syncing" | "paused" | "error"
  "syncedProfiles": 920400,
  "createdAt": "...Z",
  "lastSyncAt": "...Z",
  "segment": { "id": "seg_0001", "name": "High-Value Shoppers" },
  "destination": { "id": "dest_002", "name": "Meta Ads", "color": "#0866FF" }
}
```

### `POST /api/activations`
Activate a segment to a destination.
```jsonc
// body
{ "segmentId": "seg_0001", "destinationId": "dest_002" }
```
`201` → new activation (status `syncing`). `400` if ids are missing/invalid.

### `PATCH /api/activations/:id`
Update status, e.g. `{ "status": "paused" }`. Useful for pause / resume.

### `GET /api/health`
`{ "status": "ok", "time": "...Z" }`
