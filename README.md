# Full Stack Technical Assessment

A data-driven marketing SaaS microservice to track and visualize real-time performance metrics of marketing campaigns. Built with Node.js (Express, Sequelize, MySQL, JWT) and React (Vite, shadcn/ui, Axios).

---

## Project Structure

```
task2/
  backend/    # Node.js + Express + Sequelize + MySQL API
  frontend/   # Vite + React + shadcn/ui client
```

---

## Backend Setup

1. **Install dependencies:**
   ```sh
   cd backend
   npm install
   ```
2. **Configure environment variables:**
   - Create a `.env` file in `backend/`:
     ```
     DB_HOST=localhost
     DB_USER=your_mysql_user
     DB_PASSWORD=your_mysql_password
     DB_NAME=campaign_db
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```
3. **Start MySQL** and create the database if it doesn't exist:
   ```sql
   CREATE DATABASE campaign_db;
   ```
4. **Run the backend server:**
   ```sh
   npx nodemon server.js
   ```

---

## Frontend Setup

1. **Install dependencies:**
   ```sh
   cd frontend
   npm install
   ```
2. **Start the frontend dev server:**
   ```sh
   npm run dev
   ```
3. **Access the app:**
   - Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Features
- User registration (email, username, password)
- JWT authentication (signup/login)
- Campaign CRUD (create, read, update, delete)
- Filter campaigns by name
- Clean UI with shadcn/ui components

---

## Test Credentials
- Register a new user or use:
  - **Email:** test@example.com
  - **Username:** testuser
  - **Password:** testpassword

---

## Bonus
- [Live Demo Link](#) (add your deployed link here)

---

## Notes
- Ensure MySQL is running and credentials are correct.
- The backend runs on port 5000, frontend on 5173 by default.
- Update CORS or API URLs if deploying to production. 