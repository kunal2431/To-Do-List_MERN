# To-Do List MERN Application

This project is a full-stack **To-Do List web application** built using the MERN stack. It allows users to create, view, update, and delete tasks with persistent storage using MongoDB. The application is deployed using Vercel and follows a simple REST-based architecture.

---

## Tech Stack

### Frontend
- React.js (with Vite)
- HTML5 / CSS3
- JavaScript (ES6+)
- React Testing Library + Vitest (for frontend testing)

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose (ODM for MongoDB)
- Jest + Supertest (for backend testing)

### Deployment
- Vercel
  - Frontend and backend deployed as **separate Vercel projects**
- MongoDB Atlas for cloud database hosting

---

## Project Architecture

React Frontend  
↓ (HTTP requests)  
Express REST API (Node.js)  
↓  
MongoDB Atlas

The frontend communicates with the backend using REST APIs.  
The backend handles business logic and database interactions.

---

## Features

- Add new tasks
- View all tasks
- Mark tasks as completed or pending
- Delete tasks
- Persistent data storage using MongoDB
- Responsive web interface
- Fully deployed and accessible online

---

## REST API Endpoints

| Method  | Endpoint        | Description               |
|--------|-----------------|---------------------------|
| GET    | /tasks          | Fetch all tasks           |
| POST   | /tasks          | Create a new task         |
| PUT    | /tasks/:id      | Update task status        |
| DELETE | /tasks/:id      | Delete a task             |

All APIs exchange data in **JSON format**.

---

## Testing

### Backend Testing
- Implemented using **Jest + Supertest**
- Uses **in-memory MongoDB** for isolated testing
- Test cases include:
  - Creating a task (POST /tasks)
  - Deleting a task (DELETE /tasks/:id)

Run backend tests:
```
cd backend
npm test
```

### Frontend Testing
- Implemented using **Vitest + React Testing Library**
- API calls are mocked to isolate UI behavior
- Test cases include:
  - Adding a task and verifying it appears in the UI
  - Marking a task as completed and checking status update

Run frontend tests:
```
cd frontend
npm test
```

---

## Deployment Details

- Frontend deployed on **Vercel** using Vite build
- Backend deployed on **Vercel**
- MongoDB Atlas used for production database
- Environment variables (such as database connection URI) are securely managed using **Vercel Environment Variables**

---

## 📂 Project Structure

To-Do-List_MERN/  
├── frontend/  
│   ├── src/  
│   ├── test/  
│   └── vite.config.js  
├── backend/  
│   ├── routes/  
│   ├── models/  
│   ├── __tests__/  
│   └── server.js  
└── README.md

---

## Future Enhancements

- User authentication (login and signup)
- Task categories or tags
- Due dates and reminders
- Improved UI/UX with filters and search
- Role-based access control
- Pagination for large task lists

---

## Summary

This project demonstrates a complete MERN stack workflow:
- React frontend consuming REST APIs
- Express/Node backend handling business logic
- MongoDB for persistent storage
- Cloud deployment with proper environment configuration
- Automated testing for both frontend and backend

The application was built with a focus on **correctness and real-world development practices**.
