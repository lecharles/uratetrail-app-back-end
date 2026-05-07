# TODO.md

> Internal task tracking for URateTrail. The public Trello board is the official deliverable for instructors; this is the working list for the team.

## Currently in progress

- Backend complete and fully tested. William is finishing the last frontend pieces tonight (image rendering, comment submission). Tomorrow: Heroku deployment for both repos at the same time, then end-to-end run-through together around 6pm. Project may be feature-complete by end of tomorrow.

## Up next (priority order)

### Tomorrow's plan (joint)

- [ ] Carlos and William deploy backend and frontend to Heroku together
- [ ] Confirm MongoDB Atlas IP whitelist still permits Heroku (already at 0.0.0.0/0)
- [ ] End-to-end run-through around 6pm: sign up new users, browse trails, submit comments, verify map and rating UI all work against the deployed backend
- [ ] Optional stretch: Places Autocomplete (only if everything else is solid; both teammates fine with meeting requirements without it)

### Frontend (William, active tonight)

- [ ] Get image URLs to populate in trail detail / photo section (data already in seed via `imageUrl`)
- [ ] Build comment + rating submission to `POST /comments`
- [ ] Style according to chosen visual theme
- [ ] Ensure WCAG 2.0 AA color contrast

### Backend (Carlos, deferred)

- [ ] Set up Postman collection (workflow: sign-in → save token → use in protected requests) — deferred, curl + API_TESTING.md is sufficient for now
- [ ] Document Postman collection setup process — deferred, only relevant if Postman gets set up

### Google Cloud (William → Carlos handoff)

- [x] Create Google Cloud project (William)
- [x] Generate API key (William)
- [x] Integrate key into frontend `.env` (William, completed during integration)
- [ ] Restrict key by HTTP referrer
- [ ] Restrict key to specific APIs only
- [ ] Set daily quota cap (cost guardrail)
- [ ] Document setup process

## MVP definition (what must ship)

Pulled from project requirements doc in `docs/REQUIREMENTS.md`.

- [x] Backend with Express + Node + MongoDB
- [x] Frontend with React (rendering trails from backend as of session 4)
- [x] JWT auth (sign up, sign in)
- [ ] Sign out (frontend-only, William's working on it)
- [x] Authorization (guests cannot access protected routes; verifyJwt blocks unauthenticated requests)
- [x] Three data entities (User, Trail, Comment) with at least one having a relationship with User
- [x] Full CRUD on backend
- [ ] Full CRUD on frontend (comments POST is the last piece; William finishing tonight)
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
- [x] `GET /trails` smoke-tested via curl
- [x] `GET /trails/:id` smoke-tested via curl
- [x] `POST /trails` smoke-tested via curl
- [x] `PUT /trails/:id` smoke-tested via curl (verified `updatedAt` advances while `createdAt` stays frozen)
- [x] `DELETE /trails/:id` smoke-tested via curl
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
- [x] Carlos cloned William's frontend repo locally and created `carlos-dev` branch (pushed to William's remote)
- [x] Carlos fixed App.jsx referencing undefined Trails component (replaced with TrailIndex import); committed and pushed to carlos-dev
- [x] Frontend confirmed running locally against shared MongoDB via `.env` with `VITE_BACK_END_SERVER_URL`
- [x] Trail name, location, and description rendering on frontend from backend seed data (William)
- [x] Google Maps integration wired up and rendering trails on the map (William)
