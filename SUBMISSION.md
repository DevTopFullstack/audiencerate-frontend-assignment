# Submission — [Cristina Constantine]

> Please fill this in and include it in your submission (replace the prompts in
> each section). It helps us understand your thinking and speeds up the follow-up
> conversation. Keep it short — bullet points are fine.

## How to run
```bash
# from this folder
cd api && npm install && npm start     # API on http://localhost:4000
cd web && npm install && npm run dev   # app on http://localhost:5173 (Vite default)
```
Node version: [e.g. 20.x] · Anything else we should know to run it: [v24.15.0]

## What I built
- [Which of the tasks you completed: overview / segments list / detail / create-edit]

* Overview with header ,cards ,2 chart and one filterable pagination table
* segment details by clicking on an eye icon in segments table
* details of segments by chart is an segments.tsx component
* create a segment by clicking on cretae button on header
* routes by npm package react-router-dom
* RTK by creating apiSlice 
* using Vite and Tailwindcss and reduxt and redux toolkit

* Overview Dashboard (/overview)
* Header Section: Clean navigation with page title and create button
* KPI Cards: 6 metric cards showing Total Profiles, Segments, Active Segments, Avg Match Rate, Identities Resolved, and Activations
* Interactive Charts:

30-Day Trends Line Chart with tooltips and formatted numbers
Segments by Status Donut Chart with percentage labels and color coding

* Server-Side Table: Fully paginated segments table with:

Debounced search by name
Filter by status (Active/Draft/Inactive/Archived)
Sort by audience size, match rate, and last updated
Dynamic page size selector (5/10/25/50 per page)
 *  Segments List (/segments)

Integrated into Overview dashboard as main table
Server-side pagination, filtering, and sorting
Real-time search with 500ms debounce
Empty and loading states with user-friendly messaging
*  Segment Details (/segments/:id)

Complete segment information view including:

Basic info: name, status, audience size, match rate
Metadata: created by, creation date, last updated
Tags and data sources as badge lists
30-Day trend chart for audience growth
Activations table with destination color coding
Back navigation to overview
Proper 404 handling for invalid IDs

* Create Segment (/createSegment)

Form with validation for:

Name (required)
Description (optional)
Status dropdown (Active/Draft/Inactive/Archived)
Audience size (number input)
Match rate (slider with 0-1 range)
Success/error notifications
Automatic list refresh after creation

- [Any stretch goals you tackled: error handling- URL-synced - responsive mode] :

* Error Handling: Comprehensive error boundaries with retry options for API failures
* Loading States: Skeleton loaders and spinner animations for all async operations
* URL-Synced Routing: Full React Router integration with dynamic params
* Responsive Design: Mobile-friendly layouts using Tailwind CSS grid and flexbox
* Type Safety: Full TypeScript implementation with strict typing
* Real-time Feedback: Toast notifications for create/update operations

- [A sentence or two on the overall result : ]
src/
├── components/
│   ├── Overview.tsx           # Dashboard with KPIs, charts, table
│   ├── Segments.tsx     # Single segment view with trends
│   └── CreateSegment.tsx # Segment creation form
    └── Dashboard.tsx  
     ── LeftMenu.tsx 
     ── Header.tsx 
    
├── Redux/
│   └── apiSlice.ts            # RTK Query API definitions
├── utils/
│   └── formatters.ts          # Number/percent formatting
└── App.tsx                    # Routes configuration

## Data layer (Redux Toolkit / RTK Query)
- [How your api slice / tags / invalidation are structured]
- [What lives in RTK Query vs in Redux slices, and why]

Endpoints implemented:

getOverView - Dashboard KPIs and trend data
getSegments - Paginated segments list with query params
getSegmentById - Single segment details
getSegmentTrend - 30-day trend data for a segment
getSegmentActivations - Activations list for a segment
createSegment - Create new segment (mutation)

Queries provide tags - They declare what data they contain
Mutations invalidate tags - They tell RTK Query which cached data is now stale
Automatic refetching - RTK Query automatically refetches any queries with invalidated tags

## Key decisions & trade-offs
- [Notable architectural or UX decisions and why]
- [Anything you deliberately simplified or faked, and why]

* Overview screen with header and left menu
* Metric Cards Layout (6-Column Grid)
* Line Chart Design (30-Day Trends)
Why: 
The reference dashboard shows a trend line with 30K-70K range. A single trend line is easier to interpret than multi-line charts for this metric.
* Donut Chart for Segment Status:
Why:
The reference shows "Segments by status" as a circular visualization
Donut charts allow center text for total count
Better visual hierarchy than standard pie charts 
* segments table with pagination and show details icon 
* Status Badges with Semantic Colors:
why : Matches the reference's "Status" column where statuses are visually distinguished. Users can scan quickly.

[Anything I deliberately simplified or faked]:

* Mock KPIs for Initial Render(arrays , objects,,, then I removed them after getting real data from API)
*  Fixed Page Size Options
* No Segment Edit/Delete
* Edit/Delete would require confirmation modals and additional mutations
Can be added using same pattern as createSegment
* No Authentication Layer :No login, no JWT tokens, no protected routes.
Dynamic Destination Colors (Inline Styles):  Used inline style={{ color: destination.color }} instead of Tailwind classes.


## What I'd do next (with more time)
- [The first 2–3 things you'd add or improve, and why they matter]
⏸ Edit/Delete operations 
⏸ Authentication (separate concern)
⏸ Comprehensive unit tests 
...

## Notes
- Time spent: [~6 hours]
- AI tools used (if any) and for what: [...
Deepsick -Grok => types of Typesctpt and interfaces- getting help in UI/UX - askings some questions retalet to
a real example of whole goal of this system
]

---

## Freelance details
*(This is a freelance engagement — please share these so we can move quickly to the
commercial conversation. It does not affect how we score your code.)*

- **Typical daily rate:** [€240 / day, net of VAT — state currency]
- **Availability:** [5 days per week ; I can start Immediately]
- **Working hours overlap with CET/CEST:** [CEST / Full day]
- **Setup preference:** [fully remote ]
