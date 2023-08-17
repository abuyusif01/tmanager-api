# Task Manager API

A Task Manager API provides endpoints to manage tasks. This API allows you to create, retrieve, update, and delete tasks.

## Table of Contents

- [Task Manager API](#task-manager-api)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Server](#running-the-server)
  - [API Documentation](#api-documentation)
    - [Endpoints](#endpoints)
    - [Request and Response Formats](#request-and-response-formats)
      - [Task Object](#task-object)
      - [Error Response](#error-response)
  - [Testing](#testing)
  - [Technology Stack](#technology-stack)

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/abuyusif01/tmanager-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd tmanager-api
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root of the project.

2. Configure the following environment variables in the `.env` file:

   ```dotenv
   DB_USERNAME=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_DATABASE=your_mysql_database
   DB_HOST=127.0.0.1
   DB_DIALECT=mysql
   ```

## Running the Server

Start the API server using the following command:

```bash
npm start
```

The server will start on `http://localhost:3000`.

## API Documentation

### Endpoints

- `GET /api/tasks`: Get a list of all tasks.
- `POST /api/task`: Create a new task.
- `GET /api/tasks/:id`: Get a task by its ID.
- `PATCH /api/tasks/:id`: Update a task by its ID.
- `DELETE /api/tasks/:id`: Delete a task by its ID.

### Request and Response Formats

#### Task Object

```json
{
  "id": 1,
  "title": "Sample Task",
  "description": "This is a sample task",
  "completed": false,
  "createdAt": "2023-08-16T19:02:29.602Z",
  "updatedAt": "2023-08-16T19:02:29.602Z"
}
```

#### Error Response

```json
{
  "error": "Error message"
}
```

## Testing

The API is thoroughly tested using the Mocha testing framework along with the Chai assertion library and Chai HTTP for making HTTP requests. Run the test suite using the following command:

```bash
npm test
```

This will execute tests for the API endpoints, controllers, and validation middleware.

## Technology Stack

- Node.js
- Express.js
- Sequelize (MySQL ORM)
- Mocha (Testing framework)
- Chai (Assertion library)
- Chai HTTP (HTTP testing)
- MySQL

---

This Task Manager API is built on Node.js and Express.js, using the Sequelize ORM for MySQL database interactions. It provides a comprehensive set of endpoints for managing tasks, including validation middleware to ensure data integrity. The API is thoroughly tested using Mocha to ensure robust functionality.
