/**
 * Deterministic mock dataset for the Audiencerate DMP API.
 *
 * Data is generated from a fixed seed, so every candidate gets exactly the
 * same dataset. The data lives in memory: mutations (create / update / delete)
 * persist for the lifetime of the process and reset when the server restarts.
 */

// --- tiny seeded PRNG (mulberry32) so the dataset is reproducible -----------
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20240517);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const between = (min, max) => Math.floor(rand() * (max - min + 1)) + min;
const round = (n, step) => Math.round(n / step) * step;

const NOW = Date.now();
const DAY = 24 * 60 * 60 * 1000;
const daysAgo = (d) => new Date(NOW - d * DAY).toISOString();
const hoursAgo = (h) => new Date(NOW - h * 60 * 60 * 1000).toISOString();

// --- Data sources -----------------------------------------------------------
const DATA_SOURCE_TYPES = [
  'CRM',
  'Website Pixel',
  'Mobile SDK',
  'File Upload',
  'CDP',
  'Partner Feed',
];

const dataSources = [
  'Salesforce CRM',
  'Web Pixel — Main Site',
  'iOS App SDK',
  'Android App SDK',
  'Loyalty Program Export',
  'Segment CDP',
  'Newsletter Platform',
  'Partner Data Feed',
].map((name, i) => ({
  id: `ds_${String(i + 1).padStart(3, '0')}`,
  name,
  type: pick(DATA_SOURCE_TYPES),
  status: rand() > 0.15 ? 'connected' : 'error',
  profilesCount: round(between(120_000, 9_500_000), 1000),
  matchRate: Number((0.42 + rand() * 0.5).toFixed(2)),
  lastSyncAt: hoursAgo(between(1, 72)),
}));

// --- Destinations (activation channels) -------------------------------------
const destinations = [
  { name: 'Google Ads', color: '#4285F4' },
  { name: 'Meta Ads', color: '#0866FF' },
  { name: 'DV360', color: '#34A853' },
  { name: 'The Trade Desk', color: '#1D4ED8' },
  { name: 'Amazon DSP', color: '#FF9900' },
  { name: 'LinkedIn Ads', color: '#0A66C2' },
  { name: 'Adform', color: '#1A1A2E' },
].map((d, i) => ({
  id: `dest_${String(i + 1).padStart(3, '0')}`,
  name: d.name,
  color: d.color,
}));

// --- Segments ---------------------------------------------------------------
const TAG_POOL = [
  'in-market',
  'high-value',
  'lookalike',
  'retargeting',
  'b2b',
  'lapsed',
  'loyalty',
  'auto-intenders',
  'travel',
  'finance',
  'cart-abandoners',
  'newsletter',
];

const SEGMENT_NAMES = [
  'High-Value Shoppers',
  'Cart Abandoners — 7 days',
  'Frequent Travellers',
  'Auto Intenders',
  'Lapsed Customers',
  'Newsletter Engaged',
  'Premium Card Holders',
  'Mobile App Power Users',
  'Black Friday Lookalike',
  'B2B Decision Makers',
  'Pet Owners',
  'Fitness Enthusiasts',
  'New Parents',
  'Home Improvement Intenders',
  'Streaming Subscribers',
  'Luxury Fashion Buyers',
  'Eco-Conscious Consumers',
  'Gaming Audience',
  'Recent Site Visitors',
  'Webinar Registrants',
  'Loyalty Tier Gold',
  'First-Time Buyers',
  'Cross-Sell Candidates',
  'Insurance Renewals',
  'Mortgage Intenders',
  'Frequent Flyers — EU',
  'Holiday Gift Shoppers',
  'High AOV — Last 90d',
  'Re-engagement Pool',
  'Email Openers — 30d',
  'In-Store + Online',
  'Smart Home Intenders',
];

const STATUS_WEIGHTS = ['active', 'active', 'active', 'draft', 'draft', 'archived'];
const PEOPLE = ['Marco R.', 'Giulia B.', 'Alex T.', 'Sara M.', 'Davide P.', 'Elena C.'];

let segments = [];
let segmentSeq = 0;

function buildSegment(baseName, suffix) {
  segmentSeq += 1;
  const audienceSize = round(between(8_000, 4_200_000), 500);
  const createdDays = between(5, 400);
  const usedSources = dataSources
    .filter(() => rand() > 0.55)
    .map((d) => d.id);
  return {
    id: `seg_${String(segmentSeq).padStart(4, '0')}`,
    name: suffix ? `${baseName} ${suffix}` : baseName,
    description: pick([
      'Profiles built from first-party behavioural signals.',
      'Deterministic match against CRM identities.',
      'Lookalike modelled on top converters.',
      'Cross-device audience resolved via the identity graph.',
      'Suppression list for active campaigns.',
      'High-intent users based on recent on-site activity.',
    ]),
    status: pick(STATUS_WEIGHTS),
    audienceSize,
    matchRate: Number((0.38 + rand() * 0.55).toFixed(2)),
    dataSourceIds: usedSources.length ? usedSources : [pick(dataSources).id],
    tags: [...new Set([pick(TAG_POOL), pick(TAG_POOL)])],
    createdBy: pick(PEOPLE),
    createdAt: daysAgo(createdDays),
    updatedAt: daysAgo(between(0, Math.min(createdDays, 30))),
  };
}

SEGMENT_NAMES.forEach((name) => segments.push(buildSegment(name)));
// pad to ~64 so pagination is meaningful
SEGMENT_NAMES.forEach((name) => segments.push(buildSegment(name, '(v2)')));

// --- Activations ------------------------------------------------------------
const ACTIVATION_STATUS = ['live', 'live', 'syncing', 'paused', 'error'];
let activations = [];
let activationSeq = 0;

segments
  .filter((s) => s.status === 'active')
  .forEach((s) => {
    const count = between(0, 3);
    const used = new Set();
    for (let i = 0; i < count; i += 1) {
      const dest = pick(destinations);
      if (used.has(dest.id)) continue;
      used.add(dest.id);
      activationSeq += 1;
      activations.push({
        id: `act_${String(activationSeq).padStart(4, '0')}`,
        segmentId: s.id,
        destinationId: dest.id,
        status: pick(ACTIVATION_STATUS),
        syncedProfiles: round(s.audienceSize * (0.4 + rand() * 0.5), 100),
        createdAt: daysAgo(between(1, 90)),
        lastSyncAt: hoursAgo(between(1, 48)),
      });
    }
  });

// --- Per-segment time series (audience size over time) ----------------------
function trendFor(segment, days) {
  const seedRand = mulberry32(
    [...segment.id].reduce((acc, c) => acc + c.charCodeAt(0), 0) + days
  );
  const points = [];
  let value = segment.audienceSize * (0.7 + seedRand() * 0.2);
  for (let d = days - 1; d >= 0; d -= 1) {
    value *= 1 + (seedRand() - 0.45) * 0.06;
    points.push({
      date: new Date(NOW - d * DAY).toISOString().slice(0, 10),
      audienceSize: Math.round(value),
      matchedProfiles: Math.round(value * segment.matchRate),
    });
  }
  return points;
}

// --- Overview / KPI aggregation ---------------------------------------------
function overview() {
  const totalProfiles = dataSources.reduce((a, d) => a + d.profilesCount, 0);
  const activeSegments = segments.filter((s) => s.status === 'active').length;
  const avgMatchRate =
    segments.reduce((a, s) => a + s.matchRate, 0) / segments.length;

  const profilesTrend = [];
  const r = mulberry32(99);
  let base = totalProfiles * 0.82;
  for (let d = 29; d >= 0; d -= 1) {
    base *= 1 + (r() - 0.4) * 0.02;
    profilesTrend.push({
      date: new Date(NOW - d * DAY).toISOString().slice(0, 10),
      profiles: Math.round(base),
    });
  }

  const byStatus = segments.reduce(
    (acc, s) => {
      acc[s.status] += 1;
      return acc;
    },
    { active: 0, draft: 0, archived: 0 }
  );

  return {
    kpis: {
      totalProfiles,
      totalSegments: segments.length,
      activeSegments,
      avgMatchRate: Number(avgMatchRate.toFixed(2)),
      totalActivations: activations.length,
      identitiesResolved: Math.round(totalProfiles * avgMatchRate),
    },
    segmentsByStatus: byStatus,
    profilesTrend,
    topSegments: [...segments]
      .sort((a, b) => b.audienceSize - a.audienceSize)
      .slice(0, 5)
      .map((s) => ({ id: s.id, name: s.name, audienceSize: s.audienceSize })),
  };
}

module.exports = {
  state: { segments, dataSources, destinations, activations },
  trendFor,
  overview,
  nextSegmentId: () => `seg_${String((segmentSeq += 1)).padStart(4, '0')}`,
  nextActivationId: () => `act_${String((activationSeq += 1)).padStart(4, '0')}`,
};
