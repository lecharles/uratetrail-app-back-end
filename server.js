const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');

const authController = require('./controllers/auth');
const trailsController = require('./controllers/trails');
const commentsController = require('./controllers/comments');
const verifyJwt = require('./middlewares/verify-jwt');

require('./db/connection');

app.use(cors()); // roadmap add allowlist for front url only
app.use(express.json());
app.use(logger('dev'));

app.get('/', (req, res) => {
  res.json({ message: 'URateTrail API is running' });
});

// Public routes
app.use('/auth', authController);

// Protected routes (everything below requires a valid JWT)
app.use(verifyJwt);
app.use('/trails', trailsController);
app.use('/comments', commentsController);

// Catch-all 404 for unmatched routes
app.use((req, res) => {
  res.status(404).json({ err: 'Route not found' });
});

// Generic error handler (must have 4 parameters for Express to recognize it)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ err: err.message || 'Internal server error' });
});

app.listen(process.env.PORT, () => {
  console.log(`The express app is ready on port ${process.env.PORT}!`);
});