# Backend Demo via curl

A curated 5-command walkthrough of the URateTrail API for live demo purposes. Tells the architectural story end-to-end: authentication, REST data shape, JWT-derived user identity, and creator-only authorization.

## Setup

Prerequisites:
- Backend running locally (`npm run dev`, port 3000)
- `jq` installed (`brew install jq`)
- Two tokens stashed in the same terminal session

Stash the demo user's token:

~~~bash
TOKEN=$(curl -s -X POST http://localhost:3000/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{"username":"carlosuser","password":"carlos1234"}' \
  | sed -E 's/.*"token":"([^"]+)".*/\1/')
~~~

Stash testuser1's token (whose comment carlosuser will try to modify):

~~~bash
TOKEN1=$(curl -s -X POST http://localhost:3000/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser1","password":"test1234"}' \
  | sed -E 's/.*"token":"([^"]+)".*/\1/')
~~~

---

## The demo

### 1. Echo the token

Show that you're authenticated as carlosuser:

~~~bash
echo $TOKEN
~~~

The long `eyJ...` string is a JWT containing the user identity, signed by the server. The frontend stores this in localStorage and sends it with every protected request as `Authorization: Bearer <token>`.

### 2. List all trails (full JSON)

The raw shape of the data:

~~~bash
curl -s http://localhost:3000/trails -H "Authorization: Bearer $TOKEN" | jq
~~~

9 trails come back, each with name, lat/lng, description, imageUrl, address, and Mongoose-managed timestamps. This is exactly what the frontend consumes.

### 3. List trails filtered with jq

Same data, transformed view — just trail names:

~~~bash
curl -s http://localhost:3000/trails -H "Authorization: Bearer $TOKEN" | jq '.[].name'
~~~

`jq` is a command-line JSON processor that pretty-prints, queries, and transforms JSON. Powerful for terminal demos, debugging, and shell scripting.

### 4. Create a comment as carlosuser

The most interesting endpoint architecturally:

~~~bash
curl -s -X POST http://localhost:3000/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"trail":"69fd4648cc491c44e5d2201e","text":"Demo comment from carlosuser.","rating":4}' | jq
~~~

Notice: the request body does NOT include a `user` field. The server attaches the user identity from the JWT, not from anything the client sends. This prevents impersonation. The response shows `user` populated as carlosuser, plus `trail` populated with name "Lands End Trail" — Mongoose `.populate()` doing its job.

### 5. carlosuser tries to modify testuser1's comment (should 403)

testuser1 already left a comment on Lands End Trail. carlosuser tries to overwrite it:

~~~bash
curl -s -i -X PUT http://localhost:3000/comments/69fd523225369a9d1fe54b98 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"text":"HACKED by carlosuser","rating":1}'
~~~

Response: `HTTP/1.1 403 Forbidden` with `{"err":"You can only edit your own comments"}`. The controller compares `req.user._id` (from the JWT) against `comment.user`, and rejects when they don't match. Authorization is enforced server-side, not by the frontend hiding buttons.

---

## What this demonstrates

- JWT-based authentication
- RESTful data shape
- Server-side user identity from the token, not the request body
- Creator-only authorization on mutations
- JSON error responses with consistent shape `{err: "message"}`
- `jq` as a terminal tool for working with API responses

## Test data state assumed

- User `carlosuser` (password `carlos1234`) exists
- User `testuser1` (password `test1234`) exists
- Trail "Lands End Trail" `_id`: `69fd4648cc491c44e5d2201e`
- testuser1 comment on Lands End `_id`: `69fd523225369a9d1fe54b98`

If reseeding happens, IDs change. Re-run the setup steps in `docs/API_TESTING.md` to get current IDs and recreate the testuser1 comment.
