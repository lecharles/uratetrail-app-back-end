# TODO.md

> Internal task tracking for URateTrail. The public Trello board is the official deliverable for instructors; this is the working list for the team.

## Currently in progress

- Backend functionally complete and end-to-end tested via curl. Awaiting frontend integration and Heroku deployment (Carlos, next session).

## Up next (priority order)

### Backend (Carlos)

- [ ] Set up Postman collection (workflow: sign-in → save token → use in protected requests)
- [ ] Smoke-test trails CRUD POST/PUT/DELETE via curl or Postman (only GET /trails verified so far in session 3)
- [ ] Smoke-test 403 case on PUT/DELETE comments (user A trying to edit user B's comment)
- [ ] Document Postman collection setup process
- [ ] Deploy backend to Heroku
- [ ] Confirm MongoDB Atlas IP whitelist still permits Heroku (already at 0.0.0.0/0)
- [ ] Add API documentation polish to README if needed after frontend integration starts

### Frontend (William)

- [ ] Pull latest backend `main` and confirm `npm install` + `npm run dev` works against shared MongoDB
- [ ] Use the React JWT auth template as starting point for the repo
- [ ] Set up `VITE_BACK_END_SERVER_URL` env var
- [ ] Build trail index page (hit `GET /trails`)
- [ ] Build trail detail page (hit `GET /trails/:id` and `GET /comments/trail/:trailId`)
- [ ] Integrate Google Maps JavaScript API (William has API key)
- [ ] Build comment form with star rating (hit `POST /comments`)
- [ ] Build comment list display with average rating
- [ ] Style according to chosen visual theme
- [ ] Ensure WCAG 2.0 AA color contrast
- [ ] Deploy frontend to Heroku

### Shared

- [ ] Carlos creates `carlos-dev` branch on William's frontend repo for integration testing
- [ ] Agree on JSON contract between backend and frontend (mostly done implicitly via API_TESTING.md)

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
- [x] `docs/API_TESTING.md` published with curl commands for every endpoint
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
- [x] `seed.js` script built and run; 8 Bay Area + Sierra trails populated in MongoDB Atlas
- [x] `GET /trails` smoke-tested via curl, returns all 8 seeded trails
- [x] `POST /comments` smoke-tested via curl (verified user attached from JWT, not request body)
- [x] `GET /comments` smoke-tested via curl (verified user and trail populated)
- [x] `GET /comments/trail/:trailId` smoke-tested via curl (verified trail-scoped query)
- [x] `PUT /comments/:id` smoke-tested via curl (creator-only happy path verified)
- [x] `DELETE /comments/:id` smoke-tested via curl (creator-only happy path verified)
- [x] Trello board set up (required deliverable for GA)
- [x] User stories written on Trello (As a [user role], I want [feature], so that [reason])
- [x] Wireframes added to Trello
- [x] ERD card added to Trello
- [x] Planning materials submitted for instructor approval
