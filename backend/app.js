const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const { OAuth2Client } = require('google-auth-library');
// const config = require('./config/auth-constants');
// const corsOptions = require('./config/cors-options');
const placesRouter = require('./routes/places');
const usersRouter = require('./routes/users');
const stripeRouter = require('./routes/stripe');
const HttpError = require('./models/http-error');
const connectMongodb = require('./mongo-db');

connectMongodb();

const app = express();

// app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json());

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Access-Token, X-Requested-With, Accept, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('uploads/images', express.static(path.join('uploads', 'images')));

app.use('/api/places', placesRouter);
app.use('/api/users', usersRouter);
app.use('/api/stripe', stripeRouter);

app.use((req, res, next) => {
  throw new HttpError('Could not find this route.', 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
