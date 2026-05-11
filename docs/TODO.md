# TODO.md

> Internal task tracking for URateTrail. Working list for the team.

## Currently in progress

- Session 8 wrap-up (Sunday night, May 10). Backend deployed to Heroku, frontend deployed to Netlify by William. End-to-end production working. Tuesday May 12 is the class presentation. Monday May 11 (6-9pm class) is in-class prep.

## GA rubric verification

### Group project requirements - Technical MVP

- [x] Backend built with Express and Node
- [x] Frontend built with React
- [x] MongoDB as the database
- [x] JWT auth (sign-up, sign-in, sign-out) across frontend and backend
- [x] Authorization across frontend and backend; guest users blocked from create/update/delete
- [x] At least two data entities in addition to User, at least one related to User (Trail and Comment both relate to User)
- [x] Full CRUD on backend AND frontend
- [x] No secret keys in frontend (Maps JS API key by design intended for frontend, restricted by referrer + API; verified with Billy)
- [x] Deployed online (Heroku backend + Netlify frontend)

### Group project requirements - Code conventions

- [x] Files organized per lecture conventions
- [x] Code adheres to lecture conventions (plural names for arrays, etc)
- [x] No dead code, commented-out sections, or console logs
- [x] No errors in backend terminal or frontend browser console
- [x] Backend follows RESTful routing
- [x] Proper indentation throughout

### Group project requirements - UI/UX

- [x] Visual theme, consistent color palette, cohesive layout
- [x] Easily navigable by first-time user; navigation via links
- [x] CSS Flexbox/Grid for layout
- [x] WCAG 2.0 AA color contrast
- [x] Edit forms pre-filled with current item details
- [x] Only data creator sees edit/delete UI for their data
- [x] All images have alt text
- [x] No text overlaid on images that makes text inaccessible
- [x] All buttons styled

### Group project requirements - Git and GitHub

- [x] Only team members shown as contributors on GitHub
- [x] Repos named appropriately (`uratetrail-app-back-end`, `uratetrail-app-front-end`)
- [x] Repos publicly accessible on personal accounts
- [x] Commits dating back to project start (May 4)

### Group project requirements - README

- [x] Frontend README has screenshot/logo, app name + description, getting started with deployed link + planning + backend repo, technologies, next steps (verified with William; backend README also extended beyond minimum)

### Group project requirements - Presentation

- [ ] Tuesday May 12 class presentation

### Individual contributor requirements

- [x] Contributor in GitHub (backend, commits across both repos)
- [x] Commits in frontend and backend (frontend work on `carlos-dev` branch, backend on `main`)
- [x] Descriptive commit messages
- [ ] Tuesday presentation: demonstrate a feature built during project week (backend curl demo planned)

## Heroku follow-ups (deferred)

- [ ] Document Heroku CLI setup step-by-step in `_internal/HEROKU_SETUP.md`
- [ ] Walk through Heroku web dashboard (env vars, Resources, Activity, log viewer, dyno scaling)
- [ ] Switch `docs/CURL_DEMO.md` and `docs/API_TESTING.md` to production URL (single source of truth)
- [ ] Upgrade Node engines pin from `20.x` to `22.x` (Heroku flagged 20 as EOL on first build)

## Production optimization roadmap

Engineering improvements beyond bootcamp scope. Useful as "what I'd improve next" material for presentations.

1. `await mongoose.connect` before `app.listen`. Currently both init in parallel. ~200ms window where the app listens but Mongo isn't ready yet. First request after deploy can hang or fail.
2. JWT expiration + refresh tokens. Tokens currently have no expiry — once issued, valid forever.
3. Rate limiting on auth endpoints (brute-force protection on sign-in).
4. Structured logging. Replace `console.log` with pino or winston.
5. Fix `seed.js` to also clear comments on reseed (prevents orphan comments after the trail wipe).

## Bugs frontend demo (session 6)

Status with William TBD as of session 8 (some may be resolved on his Netlify deploy).

- [x] Sign-out button missing on first load until cache refresh (William)
- [x] Empty dashboard after sign-in needs default trail (Vernal Falls Footbridge seeded; William wiring frontend default)
- [x] No update button for comments (William)
- [ ] Plain HTML error page on bad routes (backend returns JSON; William builds error component)
- [x] No success/error banners (William, deferred polish)
- [x] Mongoose cast error verbose message (optional cleanup)

## Frontend (William, done)

- [x] Wire up Vernal Falls Footbridge as default dashboard trail
- [x] Build update button for comments (`PUT /comments/:id`)
- [x] Fix sign-out cache bug
- [ ] Build generic error page component
- [x] Style polish, WCAG 2.0 AA color contrast (likely already done)

## Backend (Carlos, deferred)

- [ ] Postman collection setup (deferred indefinitely; curl + `docs/API_TESTING.md` is sufficient)

## Google Cloud (William)

- [x] Create Google Cloud project
- [x] Generate API key
- [x] Integrate key into frontend `.env`
- [ ] Restrict key by HTTP referrer
- [ ] Restrict key to specific APIs only
- [ ] Set daily quota cap (cost guardrail)

## MVP definition (what must ship)

- [x] Backend with Express + Node + MongoDB
- [x] Frontend with React (rendering trails, map, photos, comments)
- [x] JWT auth (sign up, sign in, sign out)
- [x] Authorization (verifyJwt blocks unauthenticated; comments creator-only)
- [x] Three data entities (User, Trail, Comment)
- [x] Full CRUD on backend
- [x] Full CRUD on frontend
- [x] No secret keys in frontend (Maps JS API by design)
- [x] Project deployed online (Heroku backend + Netlify frontend)

## Roadmap (post-MVP product features)

1. Places Autocomplete: type-to-search any trail by name
2. Place Details: pull full info from Google when user picks search result
3. Place Photos: show Google's user-contributed photos alongside curated image
4. User-submitted photos via comments
5. "Trails near me" using browser geolocation
6. Sort/filter trails by average rating

## Done

1. [x] Backend repo created on GitHub
2. [x] Frontend repo created on GitHub (William)
3. [x] Backend `package.json` initialized with all dependencies
4. [x] Backend `.gitignore` set up
5. [x] Backend `README.md` with team, stack, ERD, getting-started, endpoint list
6. [x] ERD designed in dbdiagram.io and committed
7. [x] Two-person team confirmed (Carlos + William)
8. [x] Branching strategy decided
9. [x] Auth approach decided: JWT
10. [x] `docs/TODO.md`, `docs/REQUIREMENTS.md`, `docs/API_TESTING.md`, `docs/CURL_DEMO.md` published
11. [x] `_internal/` gitignored
12. [x] MongoDB Atlas: `uratetrail` database created
13. [x] `.env` configured (MONGODB_URI, SECRET_KEY, PORT)
14. [x] `db/connection.js`
15. [x] `models/user.js` (hashedPassword + toJSON transform)
16. [x] `models/trail.js`
17. [x] `models/comment.js`
18. [x] `controllers/auth.js`
19. [x] `controllers/trails.js` (full CRUD)
20. [x] `controllers/comments.js` (full CRUD with creator-only edit/delete)
21. [x] `middlewares/verify-jwt.js`
22. [x] `server.js` wired with public + protected routes
23. [x] JSON 404 catch-all and 500 error handler middleware
24. [x] Server runs locally and connects to MongoDB
25. [x] Auth flow tested end-to-end with curl
26. [x] Test users `testuser1`, `testuser2`, `carlosuser` created
27. [x] `seed.js` built and run; 9 trails populated (Bay Area + Sierra + Vernal Falls Footbridge)
28. [x] All trails endpoints smoke-tested via curl
29. [x] All comments endpoints smoke-tested via curl
30. [x] 403 cross-user authorization tests verified (PUT and DELETE comments)
31. [x] `docs/CURL_DEMO.md` created with 5-command class demo
32. [x] `jq` installed for terminal JSON pretty-printing
33. [x] Trello board set up (planning, user stories, wireframes, ERD card)
34. [x] Planning materials submitted for instructor approval
35. [x] Carlos cloned William's frontend, created `carlos-dev` branch
36. [x] App.jsx undefined Trails reference fixed
37. [x] Duplicate TrailIndex import resolved after merging William's main
38. [x] Frontend README minor fixes
39. [x] Frontend running locally against shared MongoDB
40. [x] William demo'd full MVP end-to-end (session 6)
41. [x] Lands End Trail image URL fixed and reseeded (session 7)
42. [x] `docs/API_TESTING.md` and `docs/CURL_DEMO.md` updated with current IDs and cleaner authorization framing (session 7)
43. [x] Node engines pinned to `20.x` in `package.json` for Heroku (session 8)
44. [x] Heroku CLI installed and authenticated (session 8)
45. [x] Heroku app created at `uratetrail-app-back-end-7c6c4acd90d4.herokuapp.com` (session 8)
46. [x] Heroku config vars set: `MONGODB_URI`, `SECRET_KEY` (session 8)
47. [x] Backend deployed to Heroku, first build green (session 8)
48. [x] Production validated end-to-end: smoke route, sign-in, protected `/trails` with token (session 8)
49. [x] William's Netlify frontend confirmed hitting production backend (CORS preflights returning 204, GETs returning 200/304) (session 8)
50. [x] Backend deployment URL shared with William for `VITE_BACK_END_SERVER_URL` (session 8)
51. [x] Orphan comments from session 7 reseed cleaned up (session 8)
52. [x] Carlosuser comments seeded on Lands End, Mt Tam East Peak, Mission Peak for demo richness (session 8)
53. [x] Backend README updated with deployed URLs, screenshots, Node 20.x prerequisite (session 8)
***