# Menit.com - News Platform

## Overview
Menit.com is a full-stack news platform with two main components:
- **CMS (Content Management System)**: For administrators to manage articles, categories, and users
- **Public News Site**: For readers to browse and read news articles

This application is built using a modern tech stack, featuring React for the frontend and Node.js (Express) with Sequelize ORM for the backend.

## Project Structure

```
menit-com/
├── client/                  # Frontend applications
│   ├── cms-news/            # Content Management System
│   └── public-news/         # Public news site
└── server/                  # Backend API server
    ├── controllers/         # API endpoint handlers
    ├── middlewares/         # Express middlewares
    ├── models/              # Sequelize models
    ├── routers/             # Express routes
    └── helpers/             # Utility functions
```

## Features

### CMS
- User authentication and authorization
- Article management (create, read, update, delete)
- Category management
- Image upload functionality
- User management (admin only)

### Public News Site
- Browse articles by category
- Read full articles
- Responsive design for mobile and desktop

### Server
- RESTful API endpoints
- JWT authentication
- Role-based access control
- Database integration with Sequelize ORM
- Error handling middleware

## Tech Stack

### Frontend
- React 19
- React Router 7
- Tailwind CSS 4
- Axios for API requests
- SweetAlert2 for notifications

### Backend
- Node.js with Express
- Sequelize ORM
- PostgreSQL database
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL
- npm or yarn package manager

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/menit-com.git
   cd menit-com
   ```

2. Setup backend server
   ```bash
   cd server
   npm install
   
   # Configure your database in config/config.json
   
   # Run migrations and seeds
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   
   # Start the server
   npm start
   ```

3. Setup CMS frontend
   ```bash
   cd ../client/cms-news
   npm install
   npm run dev
   ```

4. Setup Public News frontend
   ```bash
   cd ../public-news
   npm install
   npm run dev
   ```

## API Endpoints

### Public Routes
- `GET /public/articles` - Get all published articles
- `GET /public/articles/:id` - Get article by ID
- `GET /public/categories` - Get all categories

### Authentication Routes
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and receive JWT token

### Protected Routes (requires authentication)
- `GET /articles` - Get all articles
- `POST /articles` - Create a new article
- `PUT /articles/:id` - Update an article
- `DELETE /articles/:id` - Delete an article
- `GET /categories` - Get all categories
- `POST /categories` - Create a new category

## Testing
```bash
cd server
npm test
```

## License
ISC

## Contributors
- Your Name - Initial work