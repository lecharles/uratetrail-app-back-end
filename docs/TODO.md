# TODO.md

> Internal task tracking for URateTrail. The public Trello board is the official deliverable for instructors; this is the working list for the team.

## Currently in progress

- Backend repo initial scaffold (Carlos)

## Up next (priority order)

### Backend (Carlos)

- [ ] Update ERD: change `passwordHash` to `hashedPassword` (matches boilerplate convention), re-export image, replace in `docs/uratetrail-erd.png`
- [ ] Install missing dependencies: `bcrypt`, `jsonwebtoken`
- [ ] Add `start` and `dev` scripts to `package.json`
- [ ] Create `.env` file with `MONGODB_URI`, `SECRET_KEY`, `PORT`
- [ ] Set up MongoDB Atlas cluster
- [ ] Build `db/connection.js`
- [ ] Build `models/user.js` (with `hashedPassword` field and `toJSON` transform)
- [ ] Build `models/trail.js`
- [ ] Build `models/comment.js` (with refs to User and Trail)
- [ ] Build `controllers/auth.js` (sign-up, sign-in)
- [ ] Build `middlewares/verify-jwt.js`
- [ ] Build `controllers/trails.js` (full CRUD)
- [ ] Build `controllers/comments.js` (CRUD with creator-only edit/delete)
- [ ] Build `controllers/users.js` (current user info)
- [ ] Wire up `server.js` with all controllers and middleware
- [ ] Build `seed.js` to pre-populate 5-10 trails
- [ ] Test all endpoints in Postman
- [ ] Set up `dev` branch
- [ ] Deploy backend to Heroku
- [ ] Document Postman collection setup

### Frontend (William)

- [ ] Use the React JWT auth template as the starting point for the repo
- [ ] Set up `VITE_BACK_END_SERVER_URL` env var
- [ ] Build trail index page
- [ ] Build trail detail page
- [ ] Integrate Google Maps JavaScript API
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

### Google Cloud (Carlos)

- [ ] Create Google Cloud project
- [ ] Enable Maps JavaScript API
- [ ] Enable Places API (New) for autocomplete (post-MVP)
- [ ] Generate API key
- [ ] Restrict key by HTTP referrer
- [ ] Restrict key to specific APIs only
- [ ] Set daily quota cap (cost guardrail)
- [ ] Document setup process

## MVP definition (what must ship)

Pulled from project requirements doc in `docs/REQUIREMENTS.md`.

- [ ] Backend with Express + Node + MongoDB
- [ ] Frontend with React
- [ ] JWT auth (sign up, sign in, sign out)
- [ ] Authorization (guests cannot create/update/delete)
- [ ] Three data entities (User, Trail, Comment) with at least one having a relationship with User
- [ ] Full CRUD on backend and frontend
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
- [x] Backend `package.json` initialized with core dependencies
- [x] Backend `.gitignore` set up
- [x] Backend `README.md` created with team, stack, ERD section
- [x] ERD designed in dbdiagram.io and added to README
- [x] Two-person team confirmed (Carlos + William)
- [x] Branching strategy decided (`dev` for backend, `carlos-dev` for testing on frontend)
- [x] Auth approach decided: JWT (per Billy's boilerplate)
