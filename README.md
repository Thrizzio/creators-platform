# Creators Platform

## Project Overview
Creators Platform is a MERN application that supports authentication and user-owned post management.
Users can register, log in, create posts, view their own paginated posts, edit posts they own, and delete posts they own.

## Tech Stack
- MongoDB + Mongoose
- Express.js + Node.js
- React (Vite)
- JWT Authentication
- Axios + React Toastify

## Folder Structure
```text
project-root/
|-- client/
|   |-- src/
|   |-- package.json
|   `-- vite.config.js
|-- server/
|   |-- controllers/
|   |-- models/
|   |-- routes/
|   |-- middleware/
|   |-- index.js
|   `-- package.json
|-- .gitignore
`-- README.md
```

## Setup Instructions
1. Install root dependencies:
```bash
npm install
```
2. Install server dependencies:
```bash
npm install --prefix server
```
3. Install client dependencies:
```bash
npm install --prefix client
```
4. Create environment files:
- `server/.env`
- `client/.env`

## Environment Variables

### server/.env
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
PORT=5000
```

### client/.env
```env
VITE_API_URL=http://localhost:5000
```

## Run Commands

### Run both client and server
```bash
npm run dev
```

### Run server only
```bash
npm run server
```

### Run client only
```bash
npm run client
```

## Feature List
- JWT register/login authentication
- Protected backend routes
- Ownership-based authorization (users can only manage their own posts)
- Post CRUD (create/read/update/delete)
- Pagination for post listing
- Centralized backend error middleware
- Frontend toast-based success/error feedback
- Token persistence in localStorage
- Axios request interceptor for automatic JWT header injection
