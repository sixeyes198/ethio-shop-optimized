## Repo overview

This repository is a small monorepo with a Node/Express + MongoDB backend and a React + Vite frontend.

- Backend: `backend/` — Express server, Mongoose models, JWT auth. Entry: `backend/server.js` (exports `app`).
- Frontend: `frontend/ethio-shop/` — Vite + React app. Entry: `frontend/ethio-shop/src/main.jsx`.

Keep in mind: the backend serves the frontend production build from `../frontend/ethio-shop/dist`.

## Quick dev commands

- Start backend (dev): cd into `backend/` and run `npm start` (uses `nodemon server.js`).
- Frontend dev: cd into `frontend/ethio-shop/` and run `npm run dev` (Vite).
- Build frontend for production: `npm run build` in `frontend/ethio-shop` — this produces `dist/` that the backend serves.

## Important env vars

- `MONGODB_CONNECT` — MongoDB connection string used in `backend/server.js`.
- `ACCESS_TOKEN_SECRET` — JWT secret used in `backend/server.js` and `backend/utilities.js`.

Place them in a `.env` file at the project root used by the backend (server uses `require('dotenv').config()`).

## Authentication pattern

- JWT-based. Tokens are signed with payloads like `{ user: <userDoc> }` in `backend/server.js` (see Signup/Login).
- Middleware: `backend/utilities.js` (exported as `authenticateToken`) reads Authorization header and sets `req.user` to the verified payload. Note: handlers then do `const { user } = req.user` (nested `user` field).

Example protected route usage: `app.get('/get-user', authenticateToken, ...)` in `backend/server.js`.

## Key backend routes & models

- Products API: `backend/Routes/products.js` — CRUD endpoints mounted at `/api/products`.
- Product model: `backend/Models/products_models.js` — fields: `name`, `image`, `price`, `quantity`.
- There are also `backend/Routes/contact.js` and `backend/Routes/payments.js` (payments uses `stripe` dependency in package.json).

When modifying DB models or routes, check `backend/server.js` where routes are mounted and where MongoDB is connected.

## Frontend integration points

- API client: `frontend/ethio-shop/src/utils/axiosInstance.js` — sets `baseURL` and injects `Authorization: Bearer <token>` from `localStorage` via an interceptor.
  - Note: the current `baseURL` expression uses `"https://ethio-shop-b0zq.onrender.com" || "http://localhost:5000"` which will always resolve to the first string; update for local development as needed.
- Routing: `frontend/ethio-shop/src/App.jsx` uses React Router; main pages live under `src/pages/` (e.g., `pages/Home`, `pages/Login`, `pages/SignUp`).

## Conventions & small quirks to watch for

- Duplicate files with a `-Yossi` suffix exist (for example `Navbar.jsx` and `Navbar-Yossi.jsx`). Prefer the non-suffixed versions unless you know otherwise.
- The backend listens on port `5000` (see `app.listen(5000)` in `backend/server.js`).
- Token lifetime in code is very long (`expiresIn: '30000m'`). Tests / dev may rely on long-lived tokens.
- `backend/server.js` exports the `app` object — good for unit/integration tests or serverless adapters.

## How the data flows end-to-end (short)

1. Frontend calls backend through `axiosInstance` (baseURL pointing to deployed or local backend).
2. Backend route handlers (e.g., `Routes/products.js`) use Mongoose models to read/write to MongoDB.
3. Auth uses JWT tokens stored in `localStorage` and sent on each request by the Axios interceptor.
4. In production, backend serves the static frontend build from `frontend/ethio-shop/dist`.

## Suggested prompts for AI agents working on this repo

- "Add a new Products field (e.g., category) — update `backend/Models/products_models.js`, migrations (if any), and CRUD tests, and update frontend forms in `src/pages/Admin` and the product list." 
- "Fix local dev setup so frontend uses `http://localhost:5000` as API base — update `frontend/ethio-shop/src/utils/axiosInstance.js` and document in README." 

## Files to inspect for context when making changes

- `backend/server.js` — server entry, route mounting, env usage, static serving.
- `backend/utilities.js` — JWT auth middleware.
- `backend/Routes/*.js` and `backend/Models/*.js` — API surface and data shape.
- `frontend/ethio-shop/src/utils/axiosInstance.js` — API client, token handling.
- `frontend/ethio-shop/package.json` & `frontend/ethio-shop/src/main.jsx` — frontend scripts and entry point.

If anything here is unclear or you'd like the instructions to emphasize other areas (tests, CI, or deployment steps), tell me which parts to expand or correct.
