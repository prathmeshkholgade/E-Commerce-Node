# E-Commerce Application

A full-stack e-commerce web application built using Node.js, Express.js, EJS templates, Sequelize ORM, and SQL database integration.

## Features

- User authentication system
- Product listing and management
- Shopping cart functionality
- Product review system
- Server-side rendering with EJS
- RESTful routing structure
- Centralized error handling
- SQL database integration using Sequelize

---

## Tech Stack

### Backend
- Node.js
- Express.js
- Sequelize ORM
- SQL Database

### Frontend
- EJS Templates
- CSS
- JavaScript

---

## Project Structure

```bash
src/
│
├── config/          # Database configuration
├── routes/          # Application routes
├── controllers/     # Route controllers
├── models/          # Sequelize models
├── views/           # EJS frontend templates
├── public/          # Static assets (CSS, JS, images)
├── middleware/      # Custom middleware
└── utils/           # Utility/helper functions
```

## Frontend

The frontend is built using EJS templating engine with server-side rendering support.

Static assets are served from the `public/` directory.

---

## Error Handling

Centralized error handling middleware is implemented for consistent API responses.

