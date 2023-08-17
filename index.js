const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./api/route/taskRoutes');
const db = require('./server/models');


// Sync the database
db.sequelize.sync().then(() => {});

// Create the express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', taskRoutes); // Mount the task routes under the '/api/tasks' path

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on localhost port ${PORT}`);
});

// Export the app object (for testing)
module.exports = app;