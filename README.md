# TASK APP Backend

## Table of Contents

- [Project Overview](#project-overview)
- [Project Setup](#project-setup)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
    - [PostgreSQL Setup](#postgresql-setup)
  - [Running the Application](#running-the-application)
    -  [Database Migrations](#database-migrations)
- [API Endpoints](#api-endpoints)
- [Developer Notes](#developer-notes)
- [Project Structure](#project-structure)
- [Technologies and Libraries Used](#technologies-and-libraries-used)

## Project Overview

This project is a backend application that provides APIs for user authentication, task management, and invitation. The application is built using Express.js with TypeScript, providing a robust and scalable architecture.

### Features

- User authentication (Login/Signup)
    - Signup invite only
    - Only Admin can create invite
- Invitation with expiration
- Role-based access control (Admin and Client users)
- CRUD operations for tasks
- Cursor Based Pagination for Tasks and Users listing
- Filtering for task listing
- Complete API documentation using Swagger

## Project Setup

### Prerequisites
- Node.js (20) and npm installed on your machine
- PostgreSQL database

### Database Setup
#### PostgreSQL Setup
- Install PostgreSQL on laptop.
- Create a PostgreSQL database with the name **taskinvitesdb**
- Configure the DATABASE_URL environment variable in the .env file with the appropriate PostgreSQL connection URL.


### Installation

1. Clone the repository:

```bash
git clone https://github.com/zahidalidev/Backend-Node-Task.git
```

2. Navigate to the project directory:

```bash
cd Backend-Node-Task
```
3. Install dependencies:
```bash
npm install
```

### Environment Variables
Create a .env file in the root directory of the project and add the following environment variables:
```bash
# Express server port
PORT=3000

# JWT secret key for generating token
JWT_SECRET=your_jwt_secret

# Postgresql Database connection URL
DATABASE_URL=postgresql://username:password@localhost:5432/taskinvitesdb

# Invite expiration format (e.g., 1h, 1m, 1d, 1s)
INVITE_EXPIRATION=1d

# JWT token expiration format (e.g., 1h, 1m, 1d, 1s)
JWT_TOKEN_EXPIRATION=1d

```


### Running the Application
To start the application, run the following command:
```bash
npm start
```
The server will start running on the port (default is 3000).


### Database Migrations
Run database migrations (to seed the Admin)

```bash
npm run migration:up
```
This will create admin user with these credientials:
- Email: admin@gmail.com
- Password: admin


## API Endpoints
The API endpoints are documented using Swagger. You can access the API documentation by visiting http://localhost:3000/api-docs after starting the server.

## Developer Notes

### Design Patterns

- **MVC Architecture** The project follows the Model-View-Controller (MVC) architectural pattern for better organization and separation of concerns.

- **Middleware** Middleware functions are used for authentication etc.

- **Services** Business logic is implemented in service classes, promoting code reusability and maintainability.

## Project Structure

```
src/
├── config/
│   └── database.ts
│   └── env.ts
│   └── swagger.ts
├── controllers/
│   ├── auth.controller.ts
│   ├── invite.controller.ts
│   ├── task.controller.ts
│   └── user.controller.ts
├── middleware/
│   └── auth.middleware.ts
├── migrations/
│   └── 1714769401268-SeedAdmin.ts
├── models/
│   ├── invite.model.ts
│   ├── task.model.ts
│   └── user.model.ts
├── routes/
│   ├── auth.routes.ts
│   └── invite.routes.ts
│   └── task.routes.ts
│   └── user.routes.ts
├── services/
│   ├── auth.service.ts
│   └── task.service.ts
│   └── user.service.ts
├── utils/
│   └── error-handler.ts
│   └── helpers.ts
├── index.ts
```


- **config**: Contains configuration files, such as database configuration.
- **controllers**: Implements controller logic for handling HTTP requests.
- **middleware**: Defines middleware functions for request processing.
- **models**: Contains entity models for database tables.
- **routes**: Defines API routes and their corresponding controllers.
- **services**: Implements business logic and interacts with the database.
- **utils**: Contains utility functions, such as error handling.

## Technologies and Libraries Used

- **TypeScript** TypeScript is used for writing the backend application, providing static typing and improved developer experience.

- **Express** Express.js is utilized as the web application framework for handling HTTP requests and routing.

- **TypeORM** TypeORM is employed as the Object-Relational Mapping (ORM) tool for interacting with the PostgreSQL database.

- **PostgreSQL** PostgreSQL is used as the relational database management system for storing and managing application data.

- **JSON Web Tokens (JWT)** JWT is utilized for authentication and authorization purposes, providing secure communication between client and server.

- **Bcrypt** Bcrypt is used for hashing passwords, enhancing the security of user authentication.

- **Swagger** Swagger is utilized for documenting the API endpoints, providing a clear and interactive interface for developers to explore.

- **Cors** Cors is used to enable Cross-Origin Resource Sharing, allowing the backend server to accept requests from different origins.

- **Dotenv** Dotenv is employed for loading environment variables from a .env file, ensuring secure configuration management.

- **Nodemon** Nodemon is utilized as a development dependency for automatically restarting the server upon file changes, enhancing the development workflow.

- **ESLint** ESLint is used for linting the TypeScript codebase, ensuring code consistency and identifying potential errors.

- **Prettier** Prettier is employed for code formatting, ensuring a consistent and aesthetically pleasing codebase.



## Additional Notes

- Proper error handling is implemented using custom error classes and middleware.
- The application follows RESTful conventions for API design.
- Input validation is performed using TypeScript types.


