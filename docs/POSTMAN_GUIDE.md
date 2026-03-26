# Postman Guide

## Files

- `docs/Creator-Platform-API.postman_collection.json`
- `docs/Local-Development.postman_environment.json`

## Local API setup

1. Install server dependencies if needed:

```bash
cd server
npm install
```

2. Make sure your backend environment variables are configured, including your database connection and JWT settings.

3. Start the API server:

```bash
cd server
npm run dev
```

4. By default this backend listens on `http://localhost:5000`, which matches the included Postman environment.

## Importing into Postman

1. Import `docs/Creator-Platform-API.postman_collection.json` as a collection.
2. Import `docs/Local-Development.postman_environment.json` as an environment.
3. Select the `Local Development` environment before sending requests.

## Collection structure

- `Health`
  - `Health Check`
- `Auth`
  - `Register User`
  - `Login User`
- `Posts`
  - `Get All Posts`
  - `Create Post`
  - `Update Post`
  - `Delete Post`

## Actual API endpoints used

These requests match the current Express backend:

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/posts?page=1&limit=10`
- `POST /api/posts`
- `PUT /api/posts/:id`
- `DELETE /api/posts/:id`

`/api/posts` routes are protected in this codebase, so `Get All Posts`, `Create Post`, `Update Post`, and `Delete Post` all require a bearer token.

## Request bodies used

### Register User

```json
{
  "name": "Postman User",
  "email": "postman.user@example.com",
  "password": "secret123"
}
```

### Login User

```json
{
  "email": "postman.user@example.com",
  "password": "secret123"
}
```

### Create Post

```json
{
  "title": "My first Postman post",
  "content": "Created from the assignment collection.",
  "coverImage": "https://example.com/cover.jpg",
  "category": "general",
  "status": "draft"
}
```

### Update Post

```json
{
  "title": "Updated Postman post",
  "content": "This post was updated from Postman.",
  "category": "announcements",
  "status": "published"
}
```

## Variables used

- `{{baseURL}}`
  - Base API URL. Included in the environment as `http://localhost:5000`.
- `{{authToken}}`
  - Saved automatically after a successful `Login User` request.
- `{{postId}}`
  - Stored as a collection variable after a successful `Create Post` request and reused by `Update Post` and `Delete Post`.

## Recommended request order

1. Run `Health Check` to confirm the API is up.
2. Run `Register User` once to create a test account.
3. Run `Login User` to receive a JWT and save it into `authToken`.
4. Run `Get All Posts` to confirm authenticated access works.
5. Run `Create Post` to create a post and save its `_id` into `postId`.
6. Run `Update Post` to modify the post created in the previous step.
7. Run `Delete Post` to remove the same post.

## Included Postman tests

The collection includes Postman test scripts for:

- `Health Check`
- `Register User`
- `Login User`
- `Get All Posts`
- `Create Post`

Those tests verify status codes and key parts of each response shape. The login request also saves the returned JWT into the environment variable `authToken`.
