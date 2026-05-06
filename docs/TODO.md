# TODO.md

> Internal task tracking for URateTrail. The public Trello board is the official deliverable for instructors; this is the working list for the team.

## Currently in progress

- Backend foundation complete; awaiting Postman testing and seed script (Carlos, next session)

## Up next (priority order)

### Backend (Carlos)

- [ ] Set up Postman collection (workflow: sign-in → save token → use in protected requests)
- [ ] Test all trails CRUD endpoints via Postman
- [ ] Test all comments CRUD endpoints via Postman, including creator-only checks
- [ ] Build `seed.js` to pre-populate 5-10 trails (gather names, lat/lng, photo URLs)
- [ ] Update README with API documentation (routes, request/response shapes)
- [ ] Deploy backend to Heroku
- [ ] Document Postman collection setup process

### Frontend (William)

- [ ] Use the React JWT auth template as starting point for the repo
- [ ] Set up `VITE_BACK_END_SERVER_URL` env var
- [ ] Build trail index page
- [ ] Build trail detail page
- [ ] Integrate Google Maps JavaScript API (William has API key)
- [ ] Build comment form with star rating
- [ ] Build comment list display with average rating
- [ ] Style according to chosen visual theme
- [ ] Ensure WCAG 2.0 AA color contrast
- [ ] Deploy frontend to Heroku

### Shared

- [ ] Agree on JSON contract between backend and frontend
- [ ] Set up Trello board (required deliverable for GA)
- [ ] Write user stories on Trello (As a [user role], I want [feature], so that [reason])
- [ ] Add wireframes to Trello
- [ ] Add ERD card to Trello
- [ ] Submit planning materials for instructor approval
- [ ] Carlos creates `carlos-dev` branch on William's frontend repo for integration testing

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
- [x] Backend `README.md` with team, stack, ERD section
- [x] ERD designed in dbdiagram.io and committed to repo (with `hashedPassword` matching boilerplate)
- [x] Two-person team confirmed (Carlos + William)
- [x] Branching strategy decided
- [x] Auth approach decided: JWT (per Billy's boilerplate)
- [x] `docs/TODO.md` and `docs/REQUIREMENTS.md` published
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
- [x] `server.js` wired with public + protected routes
- [x] Server runs locally and connects to MongoDB
- [x] Auth flow tested end-to-end with curl (sign-up, sign-in, wrong password, duplicate username all working correctly)
- [x] Test user `testuser1` created and verified in MongoDB
