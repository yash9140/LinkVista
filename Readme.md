# LinkVista

A full-stack web application to save, summarize, and manage your bookmarks.

---

## Tech Stack

**Frontend:**  
- React 19  
- React Router DOM  
- CSS Modules

**Backend:**  
- Node.js  
- Express  
- MongoDB (via Mongoose)  
- JWT Authentication  
- Cheerio (for HTML parsing)  
- node-fetch (for HTTP requests)  
- get-website-favicon (for favicon extraction)  
- dotenv

---

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository

```sh
git clone <your-repo-url>
cd LinkVista
```

### 2. Backend Setup

```sh
cd server
npm install
```

- Copy `.env` and set your MongoDB URI and JWT secret if needed:

```
PORT=3001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
```

- Start the backend server:

```sh
npm start
```

### 3. Frontend Setup

```sh
cd ../client
npm install
```

- Ensure `.env` contains:

```
REACT_APP_API_URL=http://localhost:3001/api
```

- Start the frontend:

```sh
npm start
```

- Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Time Spent

- **Backend:** ~3 hours  
  (API design, authentication, bookmark CRUD, content/favicons fetching)
- **Frontend:** ~3 hours  
  (React setup, routing, authentication, bookmark UI, styling)
- **Testing & Debugging:** ~1 hour  
- **Total:** ~7 hours

---

## Features

- User signup/login with JWT
- Add bookmarks with automatic title, summary, and favicon fetching
- List and delete bookmarks
- Responsive, clean UI

---

##