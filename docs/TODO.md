# TODO.md

> Internal task tracking for URateTrail. The public Trello board is the official deliverable for instructors; this is the working list for the team.

## Currently in progress

- Backend complete and fully tested (every endpoint and authorization case proven via curl). Pivoting to frontend integration tonight: pulling William's repo, creating `carlos-dev` branch, debugging trails display end-to-end against the local backend.

## Up next (priority order)

### Shared (active, blocking integration)

- [ ] Carlos creates `carlos-dev` branch on William's frontend repo for integration testing
- [ ] Get end-to-end working: William's frontend pulling and rendering trails from the local backend with valid JWT
- [ ] Agree on JSON contract between backend and frontend (mostly done implicitly via API_TESTING.md)

### Frontend (William, active)

- [ ] Pull latest backend `main` and confirm `npm install` + `npm run dev` works against shared MongoDB
- [ ] Set up `VITE_BACK_END_SERVER_URL` env var
- [ ] Build trail index page (hit `GET /trails`)
- [ ] Build trail detail page (hit `GET /trails/:id` and `GET /comments/trail/:trailId`)
- [ ] Build comment form with star rating (hit `POST /comments`)
- [ ] Build comment list display with average rating
- [ ] Integrate Google Maps JavaScript API (William has API key)
- [ ] Style according to chosen visual theme
- [ ] Ensure WCAG 2.0 AA color contrast
- [ ] Deploy frontend to Heroku

### Backend (Carlos, deferred)

- [ ] Deploy backend to Heroku
- [ ] Confirm MongoDB Atlas IP whitelist still permits Heroku (already at 0.0.0.0/0)
- [ ] Add API documentation polish to README if needed after frontend integration starts
- [ ] Set up Postman collection (workflow: sign-in → save token → use in protected requests) — deferred, curl + API_TESTING.md is sufficient for now
- [ ] Document Postman collection setup process — deferred, only relevant if Postman gets set up

### Google Cloud (William → Carlos handoff)

- [x] Create Google Cloud project (William)
- [x] Generate API key (William)
- [ ] Restrict key by HTTP referrer
- [ ] Restrict key to specific APIs only
- [ ] Set daily quota cap (cost guardrail)
- [ ] Document setup process
- [ ] Integrate key into frontend `.env`

## MVP definition (what must ship)

Pulled from project requirements doc in `docs/REQUIREMENTS.md`.

- [x] Backend with Express + Node + MongoDB
- [ ] Frontend with React
- [x] JWT auth (sign up, sign in)
- [ ] Sign out (frontend-only, William's working on it)
- [x] Authorization (guests cannot access protected routes; verifyJwt blocks unauthenticated requests)
- [x] Three data entities (User, Trail, Comment) with at least one having a relationship with User
- [x] Full CRUD on backend
- [ ] Full CRUD on frontend
- [ ] No secret keys in frontend
- [ ] Project deployed online

## Roadmap (post-MVP, in priority order)

1. Places Autocomplete: type-to-search any trail by name
2. Place Details: pull full info from Google when user picks search result
3. Place Photos: show Google's user-contributed photos alongside curated image
4. User-submitted photos via comments
5. "Trails near me" using browser geolocation
6. Sort/filter trails by average rating

## Done

- [x] Backend repo created on GitHub
- [x] Frontend repo created on GitHub (William)
- [x] Backend `package.json` initialized with all dependencies
- [x] Backend `.gitignore` set up
- [x] Backend `README.md` with team, stack, ERD section, getting-started guide, and API endpoint list
- [x] ERD designed in dbdiagram.io and committed to repo (with `hashedPassword` matching boilerplate)
- [x] Two-person team confirmed (Carlos + William)
- [x] Branching strategy decided
- [x] Auth approach decided: JWT (per Billy's boilerplate)
- [x] `docs/TODO.md` and `docs/REQUIREMENTS.md` published
- [x] `docs/API_TESTING.md` published with curl commands for every endpoint, including 403 cross-user authorization tests
- [x] `_internal/` gitignored, contains memory files and boilerplate zips
- [x] MongoDB Atlas: `uratetrail` database created in existing cluster
- [x] `.env` configured with MONGODB_URI, SECRET_KEY, PORT
- [x] `db/connection.js` (Mongoose connection)
- [x] `models/user.js` (with hashedPassword and toJSON transform)
- [x] `models/trail.js`
- [x] `models/comment.js` (with refs to User and Trail)
- [x] `controllers/auth.js` (sign-up, sign-in)
- [x] `controllers/trails.js` (full CRUD)
- [x] `controllers/comments.js` (full CRUD with creator-only edit/delete)
- [x] `middlewares/verify-jwt.js`
- [x] `server.js` wired with public + protected routes (auth, trails, comments all mounted)
- [x] Server runs locally and connects to MongoDB
- [x] Auth flow tested end-to-end with curl (sign-up, sign-in, wrong password, duplicate username all working correctly)
- [x] Test user `testuser1` created and verified in MongoDB
- [x] Test user `testuser2` created and verified in MongoDB (for cross-user authorization testing)
- [x] `seed.js` script built and run; 8 Bay Area + Sierra trails populated in MongoDB Atlas
- [x] `GET /trails` smoke-tested via curl, returns all 8 seeded trails
- [x] `GET /trails/:id` smoke-tested via curl
- [x] `POST /trails` smoke-tested via curl (creates trail with all fields)
- [x] `PUT /trails/:id` smoke-tested via curl (verified `updatedAt` advances while `createdAt` stays frozen)
- [x] `DELETE /trails/:id` smoke-tested via curl (returns `{"message":"Trail deleted"}`)
- [x] `POST /comments` smoke-tested via curl (verified user attached from JWT, not request body)
- [x] `GET /comments` smoke-tested via curl (verified user and trail populated)
- [x] `GET /comments/trail/:trailId` smoke-tested via curl (verified trail-scoped query)
- [x] `PUT /comments/:id` happy path smoke-tested via curl (creator can edit own comment)
- [x] `PUT /comments/:id` 403 case smoke-tested via curl (testuser2 blocked from editing testuser1's comment)
- [x] `DELETE /comments/:id` happy path smoke-tested via curl (creator can delete own comment)
- [x] `DELETE /comments/:id` 403 case smoke-tested via curl (testuser2 blocked from deleting testuser1's comment)
- [x] Trello board set up (required deliverable for GA)
- [x] User stories written on Trello (As a [user role], I want [feature], so that [reason])
- [x] Wireframes added to Trello
- [x] ERD card added to Trello
- [x] Planning materials submitted for instructor approval
