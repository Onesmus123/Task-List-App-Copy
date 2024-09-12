# Task Management Application

## Overview
  A task management application built with the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to create, update, delete, and manage tasks with features for authentication, task listing, and filtering.

## Features
  User Registration and Login
  
  Task Creation, Update, and Deletion
  
  Personalized Task Lists
  
  Task Filtering and Sorting
  
  Secure Token-based Authentication
  
## Technologies Used
  **Frontend**: React.js

  **Backend**: Node.js, Express.js

  **Database**: MongoDB

  **Authentication**: JSON Web Tokens (JWT)

## Installation
1. ### Clone the Repository

```bash
git clone https://github.com/Onesmus123/Task-List-App.git
cd TaskList Project

```
2. ### Backend Setup
  Navigate to the backend directory:

```bash
cd backend

```
  Install dependencies:

```bash
npm install

```
  Create a `.env` file with the following variables:

```bash
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>

```
  Start the server:

```bash
node index.js

```
3. ### Frontend Setup

  Navigate to the frontend directory:

```bash
cd ../frontend
```
  Install dependencies:

```bash
npm install
```

  Start the React application:

```bash
npm start
```

## Usage

1. ### User Authentication

  Register and log in to access your personalized task list.

2. ### Task Management

  Create new tasks with title, description, and deadline.
  
  Update or delete existing tasks.
  
  Filter tasks by status or search by title/description.
  
  Sort tasks by deadline or priority.


## API Endpoints

  **POST /api/users/register**: Register a new user
  
  **POST /api/users/login**: Log in a user
  
  **GET /api/tasks**: Retrieve tasks for the logged-in user
  
  **POST /api/tasks**: Create a new task
  
  **PUT /api/tasks/**: Update an existing task
  
  **DELETE /api/tasks/**: Delete a task


## Contributing

  Feel free to open issues or submit pull requests for improvements and bug fixes.
