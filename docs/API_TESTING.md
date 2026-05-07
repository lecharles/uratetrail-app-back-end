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

(That ID is Lands End Trail from the seeded data. Replace with any other trail's `_id` from the list endpoint.)

### Create a trail

~~~bash
curl -X POST http://localhost:3000/trails \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN1" \
  -d '{"name":"Smoke Test Trail","lat":37.7749,"lng":-122.4194,"description":"A throwaway trail created during smoke testing. Will be deleted shortly.","imageUrl":"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"}'
~~~

Returns the new trail with a fresh `_id`. Capture the `_id` to use in the update and delete tests below.

### Update a trail

~~~bash
curl -X PUT http://localhost:3000/trails/<TRAIL_ID_FROM_CREATE> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN1" \
  -d '{"description":"Updated description: this trail will be deleted in the next test."}'
~~~

Returns the updated trail. Note that `updatedAt` advances while `createdAt` stays frozen.

### Delete a trail

~~~bash
curl -X DELETE http://localhost:3000/trails/<TRAIL_ID_FROM_CREATE> \
  -H "Authorization: Bearer $TOKEN1"
~~~

Returns `{ "message": "Trail deleted" }` on success.

(Don't run DELETE against a seeded trail unless you want to remove it. Run `node seed.js` again to repopulate.)

---

## Comments (protected, all verified including 403 cross-user cases)

### Create a comment

~~~bash
curl -X POST http://localhost:3000/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN1" \
  -d '{"trail":"69facdda9953e946b7dedc1e","text":"Beautiful coastal views, especially at sunset. Easy access from the parking lot.","rating":5}'
~~~

Returns the new comment with `user` and `trail` populated. The `user` field is attached server-side from the JWT, NOT from the request body. Capture the returned `_id` to use in the update and delete tests below.

### List all comments

~~~bash
curl http://localhost:3000/comments \
  -H "Authorization: Bearer $TOKEN1"
~~~

Returns array with `user` and `trail` populated as nested objects.

### List comments for one trail

~~~bash
curl http://localhost:3000/comments/trail/69facdda9953e946b7dedc1e \
  -H "Authorization: Bearer $TOKEN1"
~~~

Returns array with `user` populated. The `trail` field is just an ID string here, since the caller already knows the trail.

### Update a comment (creator only)

~~~bash
curl -X PUT http://localhost:3000/comments/<COMMENT_ID_FROM_CREATE> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN1" \
  -d '{"text":"Updated review: Beautiful coastal views, especially at sunset. Wear layers, gets windy.","rating":4}'
~~~

Replace `<COMMENT_ID_FROM_CREATE>` with the `_id` returned by the create step. Returns the updated comment if the JWT user is the creator.

### Delete a comment (creator only)

~~~bash
curl -X DELETE http://localhost:3000/comments/<COMMENT_ID_FROM_CREATE> \
  -H "Authorization: Bearer $TOKEN1"
~~~

Returns `{ "message": "Comment deleted" }` on success.

---

## 403 cross-user authorization tests

These tests prove that creator-only authorization actually blocks impersonation, not just allows the owner. Requires a second user.

### Sign up a second user

~~~bash
curl -X POST http://localhost:3000/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser2","password":"test1234"}'
~~~

Stash the returned token as `TOKEN2`:

~~~bash
TOKEN2="<paste testuser2's token here>"
~~~

### As testuser1, create a comment

~~~bash
curl -X POST http://localhost:3000/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN1" \
  -d '{"trail":"69facdda9953e946b7dedc1e","text":"Comment created by testuser1 to test cross-user authorization.","rating":5}'
~~~

Capture the comment `_id`.

### As testuser2, try to update testuser1's comment (should fail)

~~~bash
curl -X PUT http://localhost:3000/comments/<COMMENT_ID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN2" \
  -d '{"text":"HACKED by testuser2","rating":1}'
~~~

Expected: `{ "err": "You can only edit your own comments" }`. The comment should remain untouched (verify by listing comments as testuser1 afterwards).

### As testuser2, try to delete testuser1's comment (should fail)

~~~bash
curl -X DELETE http://localhost:3000/comments/<COMMENT_ID> \
  -H "Authorization: Bearer $TOKEN2"
~~~

Expected: `{ "err": "You can only delete your own comments" }`. The comment should remain in the database.

### Cleanup: testuser1 deletes their own comment

~~~bash
curl -X DELETE http://localhost:3000/comments/<COMMENT_ID> \
  -H "Authorization: Bearer $TOKEN1"
~~~

Returns `{ "message": "Comment deleted" }`. Confirms the creator can still delete their own comment after the failed attempts above.

---

## Test data

Existing test users:

- `testuser1` (password `test1234`) — created session 2
- `testuser2` (password `test1234`) — created session 4 for cross-user authorization testing

Trails: 8 seeded via `node seed.js`. The seed script wipes the trails collection before inserting, so it's safe to rerun any time.

To get the full list of trail `_id`s for use in other tests, hit `GET /trails` after signing in.
