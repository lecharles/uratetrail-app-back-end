# TODO.md

> Internal task tracking for URateTrail. The public Trello board is the official deliverable for instructors; this is the working list for the team.

## Currently in progress

- Sunday wrap-up session. Backend complete. William is struggling with Heroku deployment and has added Carlos as collaborator. Moving to joint Heroku troubleshooting next.

## Up next (priority order)

### Tonight's plan (joint)

- [ ] Help William finish backend or frontend Heroku deployment (Carlos added as collaborator)
- [ ] Verify deployed app end-to-end
- [ ] Practice 5-command backend demo via `docs/CURL_DEMO.md`
- [ ] Optional: prep 3 talking points (proud of / challenge / learning) for Monday class presentation

### Bugs found during William's demo (session 5)

- [ ] Sign-out button missing on first load until cache refresh (William)
- [ ] Empty dashboard after sign-in needs default trail (Carlos: added Vernal Falls Footbridge to seed; William wiring up frontend default)
- [ ] No update button for comments — backend supports PUT, frontend only has delete (William)
- [ ] Plain HTML error page on bad routes — backend now returns JSON; William builds error component end-to-end
- [ ] No success/error banners for user feedback (William, deferred polish)
- [ ] Mongoose cast error on malformed ObjectId is verbose (could clean up to 400 with friendly message — optional)

### Frontend (William, active)

- [ ] Wire up Vernal Falls Footbridge as default dashboard trail
- [ ] Build update button for comments (`PUT /comments/:id`)
- [ ] Fix sign-out cache bug
- [ ] Build generic error page component
- [ ] Style polish, WCAG 2.0 AA color contrast

### Backend (Carlos, deferred)

- [ ] Set up Postman collection — deferred, curl + docs/API_TESTING.md is sufficient
- [ ] Document Postman collection setup process — deferred

### Google Cloud (William → Carlos handoff)

- [x] Create Google Cloud project (William)
- [x] Generate API key (William)
- [x] Integrate key into frontend `.env` (William)
- [ ] Restrict key by HTTP referrer
- [ ] Restrict key to specific APIs only
- [ ] Set daily quota cap (cost guardrail)

## MVP definition (what must ship)

- [x] Backend with Express + Node + MongoDB
- [x] Frontend with React (rendering trails, map, photos, comments)
- [x] JWT auth (sign up, sign in, sign out)
- [x] Authorization (verifyJwt blocks unauthenticated requests; comments creator-only)
- [x] Three data entities (User, Trail, Comment)
- [x] Full CRUD on backend
- [x] Full CRUD on frontend (create/read/delete done; update button pending — William)
- [ ] No secret keys in frontend
- [ ] Project deployed online (in progress — William struggling with Heroku)

## Roadmap (post-MVP)

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
- [x] Backend `README.md` with team, stack, ERD, getting-started, endpoint list
- [x] ERD designed in dbdiagram.io and committed
- [x] Two-person team confirmed (Carlos + William)
- [x] Branching strategy decided
- [x] Auth approach decided: JWT
- [x] `docs/TODO.md`, `docs/REQUIREMENTS.md`, `docs/API_TESTING.md`, `docs/CURL_DEMO.md` published
- [x] `_internal/` gitignored
- [x] MongoDB Atlas: `uratetrail` database created
- [x] `.env` configured (MONGODB_URI, SECRET_KEY, PORT)
- [x] `db/connection.js`
- [x] `models/user.js` (hashedPassword + toJSON transform)
- [x] `models/trail.js`
- [x] `models/comment.js`
- [x] `controllers/auth.js`
- [x] `controllers/trails.js` (full CRUD)
- [x] `controllers/comments.js` (full CRUD with creator-only edit/delete)
- [x] `middlewares/verify-jwt.js`
- [x] `server.js` wired with public + protected routes
- [x] JSON 404 catch-all and 500 error handler middleware added to `server.js`
- [x] Server runs locally and connects to MongoDB
- [x] Auth flow tested end-to-end with curl
- [x] Test users `testuser1`, `testuser2`, and `carlosuser` (for demo) created
- [x] `seed.js` script built and run; 9 trails populated (Bay Area + Sierra + Vernal Falls Footbridge)
- [x] All trails endpoints smoke-tested via curl (GET list, GET one, POST, PUT, DELETE)
- [x] All comments endpoints smoke-tested via curl (POST, GET list, GET by trail, PUT, DELETE)
- [x] 403 cross-user authorization tests verified (PUT and DELETE comments)
- [x] Backend `docs/CURL_DEMO.md` created with 5-command demo for class presentation
- [x] `jq` installed for terminal JSON pretty-printing
- [x] Trello board set up
- [x] User stories on Trello
- [x] Wireframes added to Trello
- [x] ERD card added to Trello
- [x] Planning materials submitted for instructor approval
- [x] Carlos cloned William's frontend repo locally and created `carlos-dev` branch
- [x] Carlos fixed App.jsx undefined Trails reference
- [x] Carlos resolved duplicate TrailIndex import after merging William's main
- [x] Frontend README.md minor fixes (backend/frontend mix-up, typo)
- [x] Frontend running locally against shared MongoDB via `.env`
- [x] William demo'd full MVP end-to-end
- [x] Lands End Trail image URL fixed (previous Unsplash photo was 404) and reseeded
- [x] `docs/API_TESTING.md` and `docs/CURL_DEMO.md` updated with current IDs and cleaner authorization framing
