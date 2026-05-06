# API Testing

All endpoints can be tested via curl while the dev server is running locally (`npm run dev`, port 3000).

Protected routes require a valid JWT in the `Authorization: Bearer <token>` header. Get a token by signing in (see Auth section below), then stash it in a shell variable:

```bash
TOKEN="<paste your token here>"
```

Then reference it as `$TOKEN` in subsequent commands.

---

## Auth (public)

### Sign up

```bash
curl -X POST http://localhost:3000/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser1","password":"test1234"}'
```

Returns: `{ "token": "..." }` on success, `{ "err": "Username already taken" }` on duplicate.

### Sign in

```bash
curl -X POST http://localhost:3000/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser1","password":"test1234"}'
```

Returns: `{ "token": "..." }` on success, `{ "err": "Invalid credentials" }` on bad password.

---

## Trails (protected)

### List all trails (verified session 3)

```bash
curl http://localhost:3000/trails \
  -H "Authorization: Bearer $TOKEN"
```

Returns an array of all trails sorted newest first.

### Get one trail

```bash
curl http://localhost:3000/trails/69facdda9953e946b7dedc1e \
  -H "Authorization: Bearer $TOKEN"
```

(That ID is Lands End Trail from the seeded data. Replace with any other trail's `_id` from the list endpoint.)

### Create a trail (not yet smoke-tested)

```bash
curl -X POST http://localhost:3000/trails \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Sample Trail","lat":37.7749,"lng":-122.4194,"description":"A sample trail for testing.","imageUrl":"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"}'
```

### Update a trail (not yet smoke-tested)

```bash
curl -X PUT http://localhost:3000/trails/69facdda9953e946b7dedc1e \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"description":"Updated description for Lands End Trail."}'
```

### Delete a trail (not yet smoke-tested)

```bash
curl -X DELETE http://localhost:3000/trails/69facdda9953e946b7dedc1e \
  -H "Authorization: Bearer $TOKEN"
```

(Don't actually run this against a seeded trail unless you want to remove it. Run `node seed.js` again to repopulate.)

---

## Comments (protected, all verified session 3)

### Create a comment

```bash
curl -X POST http://localhost:3000/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"trail":"69facdda9953e946b7dedc1e","text":"Beautiful coastal views, especially at sunset. Easy access from the parking lot.","rating":5}'
```

Returns the new comment with `user` and `trail` populated. The `user` field is attached server-side from the JWT, NOT from the request body. Capture the returned `_id` to use in the update and delete tests below.

### List all comments

```bash
curl http://localhost:3000/comments \
  -H "Authorization: Bearer $TOKEN"
```

Returns array with `user` and `trail` populated as nested objects.

### List comments for one trail

```bash
curl http://localhost:3000/comments/trail/69facdda9953e946b7dedc1e \
  -H "Authorization: Bearer $TOKEN"
```

Returns array with `user` populated. The `trail` field is just an ID string here, since the caller already knows the trail.

### Update a comment (creator only)

```bash
curl -X PUT http://localhost:3000/comments/<COMMENT_ID_FROM_CREATE> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"text":"Updated review: Beautiful coastal views, especially at sunset. Wear layers, gets windy.","rating":4}'
```

Replace `<COMMENT_ID_FROM_CREATE>` with the `_id` returned by the create step. Returns 403 if the JWT user is not the original creator.

### Delete a comment (creator only)

```bash
curl -X DELETE http://localhost:3000/comments/<COMMENT_ID_FROM_CREATE> \
  -H "Authorization: Bearer $TOKEN"
```

Returns `{ "message": "Comment deleted" }` on success, 403 if not the creator.

### Confirm deletion

```bash
curl http://localhost:3000/comments \
  -H "Authorization: Bearer $TOKEN"
```

Should return `[]` if the comment above was the only one in the database.

---

## Test data

Existing test user (created in session 2):

- username: `testuser1`
- password: `test1234`

Trails: 8 seeded in session 3 via `node seed.js`. The seed script wipes the trails collection before inserting, so it's safe to rerun any time.

To get the full list of trail `_id`s for use in other tests, hit `GET /trails` after signing in.