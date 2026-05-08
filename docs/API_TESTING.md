# API Testing

All endpoints can be tested via curl while the dev server is running locally (`npm run dev`, port 3000).

Protected routes require a valid JWT in the `Authorization: Bearer <token>` header. Get a token by signing in (see Auth section below), then stash it in a shell variable:

~~~bash
TOKEN1="<paste your token here>"
~~~

Then reference it as `$TOKEN1` in subsequent commands. For tests that involve two users (the 403 cross-user authorization tests at the bottom), you'll also stash a `TOKEN2` for the second user.

All shell variables only exist within the terminal session where you set them. If you open a new terminal, you'll need to re-stash.

---

## Auth (public)

### Sign up

~~~bash
curl -X POST http://localhost:3000/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser1","password":"test1234"}'
~~~

Returns: `{ "token": "..." }` on success, `{ "err": "Username already taken" }` on duplicate.

### Sign in

~~~bash
curl -X POST http://localhost:3000/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser1","password":"test1234"}'
~~~

Returns: `{ "token": "..." }` on success, `{ "err": "Invalid credentials" }` on bad password.

---

## Trails (protected, all verified)

### List all trails

~~~bash
curl http://localhost:3000/trails \
  -H "Authorization: Bearer $TOKEN1"
~~~

Returns an array of all trails sorted newest first.

### Get one trail

~~~bash
curl http://localhost:3000/trails/69facdda9953e946b7dedc1e \
  -H "Authorization: Bearer $TOKEN1"
~~~

(That ID is Lands End Trail from the seeded data. IDs change on reseed.)

### Create a trail

~~~bash
curl -X POST http://localhost:3000/trails \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN1" \
  -d '{"name":"Smoke Test Trail","lat":37.7749,"lng":-122.4194,"description":"A throwaway trail created during smoke testing.","imageUrl":"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"}'
~~~

Returns the new trail with a fresh `_id`. Capture for update/delete tests.

### Update a trail

~~~bash
curl -X PUT http://localhost:3000/trails/<TRAIL_ID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN1" \
  -d '{"description":"Updated description."}'
~~~

`updatedAt` advances; `createdAt` stays frozen.

### Delete a trail

~~~bash
curl -X DELETE http://localhost:3000/trails/<TRAIL_ID> \
  -H "Authorization: Bearer $TOKEN1"
~~~

Returns `{ "message": "Trail deleted" }`.

---

## Comments (protected, all verified including 403 cross-user cases)

### Create a comment

~~~bash
curl -X POST http://localhost:3000/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN1" \
  -d '{"trail":"69facdda9953e946b7dedc1e","text":"Beautiful coastal views.","rating":5}'
~~~

Returns the new comment with `user` and `trail` populated. The `user` field is attached server-side from the JWT, NOT from the request body.

### List all comments

~~~bash
curl http://localhost:3000/comments \
  -H "Authorization: Bearer $TOKEN1"
~~~

### List comments for one trail

~~~bash
curl http://localhost:3000/comments/trail/69facdda9953e946b7dedc1e \
  -H "Authorization: Bearer $TOKEN1"
~~~

`user` populated; `trail` returned as ID string only since the caller already knows the trail.

### Update a comment (creator only)

~~~bash
curl -X PUT http://localhost:3000/comments/<COMMENT_ID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN1" \
  -d '{"text":"Updated review.","rating":4}'
~~~

### Delete a comment (creator only)

~~~bash
curl -X DELETE http://localhost:3000/comments/<COMMENT_ID> \
  -H "Authorization: Bearer $TOKEN1"
~~~

Returns `{ "message": "Comment deleted" }`.

---

## 403 cross-user authorization tests

### Sign up second user

~~~bash
curl -X POST http://localhost:3000/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser2","password":"test1234"}'
~~~

Stash as `TOKEN2`.

### testuser1 creates a comment

~~~bash
curl -X POST http://localhost:3000/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN1" \
  -d '{"trail":"69facdda9953e946b7dedc1e","text":"Comment by testuser1.","rating":5}'
~~~

### testuser2 tries to update (should 403)

~~~bash
curl -X PUT http://localhost:3000/comments/<COMMENT_ID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN2" \
  -d '{"text":"HACKED","rating":1}'
~~~

Expected: `{ "err": "You can only edit your own comments" }`.

### testuser2 tries to delete (should 403)

~~~bash
curl -X DELETE http://localhost:3000/comments/<COMMENT_ID> \
  -H "Authorization: Bearer $TOKEN2"
~~~

Expected: `{ "err": "You can only delete your own comments" }`.

### Cleanup: testuser1 deletes own comment

~~~bash
curl -X DELETE http://localhost:3000/comments/<COMMENT_ID> \
  -H "Authorization: Bearer $TOKEN1"
~~~

---

## Error handling

All errors return JSON with shape `{ "err": "message" }`. Common cases:

### Unknown route (catch-all 404)

~~~bash
curl -i http://localhost:3000/badroute \
  -H "Authorization: Bearer $TOKEN1"
~~~

Returns `404` with `{ "err": "Route not found" }`.

Note: hitting an unknown route WITHOUT a token returns `401 Unauthorized` from the JWT middleware, not 404. This is by design — unauthenticated probing is blocked first.

### Resource not found (valid ObjectId, no match)

~~~bash
curl -i http://localhost:3000/trails/000000000000000000000000 \
  -H "Authorization: Bearer $TOKEN1"
~~~

Returns `404` with `{ "err": "Trail not found" }`.

### Malformed ObjectId (Mongoose cast error)

~~~bash
curl -i http://localhost:3000/trails/badid \
  -H "Authorization: Bearer $TOKEN1"
~~~

Returns `500` with the raw Mongoose error message in the `err` field. The shape is consistent (`{err: ...}`) so the frontend can parse it; the message is verbose but works.

### Invalid token

~~~bash
curl -i http://localhost:3000/trails \
  -H "Authorization: Bearer not-a-real-token"
~~~

Returns `401` with `{ "err": "Invalid Token" }`.

---

## Test data

Existing test users:

- `testuser1` (password `test1234`)
- `testuser2` (password `test1234`)

Trails: 9 seeded via `node seed.js` (8 Bay Area/Sierra + Vernal Falls Footbridge added in session 5). Seed wipes the trails collection before inserting; safe to rerun.

Get the full list of trail `_id`s by hitting `GET /trails` after signing in.
