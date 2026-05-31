# Simple Blogger Webapp

Simple Blogger Webapp is a full-stack blogging application with a Node.js/Express backend, MySQL database, and React frontend.

## Project Structure

```text
Simple_Blogger_Webapp/
+-- backend/      # Express API and MySQL connection
+-- frontend/     # React client app
```

## Requirements

Install these before running the project:

- Node.js and npm
- MySQL Server
- Git

## Backend Setup

Open a terminal in the project root and go to the backend folder:

```bash
cd backend
```

Install backend dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=simple_blogger
JWT_SECRET=your_secret_key
```

Update `DB_USER` and `DB_PASSWORD` according to your MySQL username and password.

## Database Setup

Open MySQL and create the database:

```sql
CREATE DATABASE simple_blogger;
USE simple_blogger;
```

Create the required tables:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

Start the backend server:

```bash
npm run dev
```

If you do not want to use nodemon, run:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

## Frontend Setup

Open a second terminal in the project root and go to the frontend folder:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

Start the React app:

```bash
npm start
```

The frontend will run on:

```text
http://localhost:3000
```

The frontend is configured to call the backend API at:

```text
http://localhost:5000/api
```

## How To Run The Full Project

Use two terminals:

Terminal 1:

```bash
cd backend
npm run dev
```

Terminal 2:

```bash
cd frontend
npm start
```

Then open this URL in your browser:

```text
http://localhost:3000
```

## Useful API Routes

- `POST /api/auth/register` - register a user
- `POST /api/auth/login` - login a user
- `GET /api/posts` - get all posts
- `GET /api/posts/:id` - get one post with comments
- `POST /api/posts` - create a post
- `PUT /api/posts/:id` - update a post
- `DELETE /api/posts/:id` - delete a post
- `POST /api/comments/:postId` - add a comment

Some routes require login. After login, the frontend stores the token and sends it automatically with requests.

## Common Problems

If the backend does not start, check that:

- MySQL Server is running.
- The `.env` file exists inside the `backend` folder.
- The database name, username, and password are correct.
- You ran `npm install` inside the `backend` folder.

If the frontend does not start, check that:

- You ran `npm install` inside the `frontend` folder.
- The backend server is running on port `5000`.
- No other app is already using port `3000`.

## GitHub Upload Commands

After making changes, upload them to GitHub with:

```bash
git add .
git commit -m "Update project files"
git push origin main
```
