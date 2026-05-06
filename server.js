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

app.use(cors());
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

app.listen(process.env.PORT, () => {
  console.log(`The express app is ready on port ${process.env.PORT}!`);
});