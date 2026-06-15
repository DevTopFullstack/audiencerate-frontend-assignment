# AudienceRate — Frontend Take-Home

Welcome, and thanks for interviewing with us. This repository contains everything
you need for the frontend assignment.

## What's in here

```
.
├── ASSIGNMENT.md        ← read this first: what to build & how we evaluate
├── SUBMISSION.md        ← fill this in and send it back with your code
├── api/                 ← the mock DMP API you'll build against (don't modify)
│   ├── README.md        ← full API reference
│   └── src/
└── docker-compose.yml   ← optional one-command way to run the API
```

## Quick start

**1. Start the API** — Option A, Node (recommended):
```bash
cd api
npm install
npm start            # API on http://localhost:4000
```
Option B, Docker:
```bash
docker compose up     # API on http://localhost:4000
```
Verify it's up: `curl http://localhost:4000/api/health`

**2. Build your frontend** in a new `web/` folder — a **React + TypeScript SPA
(Vite)**, styled with **Tailwind**, state via **Redux Toolkit / RTK Query**,
consuming the REST API. Run it on `http://localhost:5173` (Vite default).

## The stack we ask for

React + TypeScript SPA (Vite) · Tailwind CSS · Redux Toolkit + RTK Query.

Full task details and evaluation criteria are in **[ASSIGNMENT.md](./ASSIGNMENT.md)**;
the API contract is in **[api/README.md](./api/README.md)**.

Good luck — and reach out if anything is unclear.
# audiencerate-frontend-assignment
