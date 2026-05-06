const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');

require('./db/connection');

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.get('/', (req, res) => {
  res.json({ message: 'URateTrail API is running' });
});

app.listen(process.env.PORT, () => {
  console.log(`The express app is ready on port ${process.env.PORT}!`);
});