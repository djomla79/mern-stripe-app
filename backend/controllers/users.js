const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/auth-constants');
const User = require('../models/user');
const HttpError = require('../models/http-error');
const { signupUserValidaton } = require('../models/express-validator');
// const verifyGoogleToken = require('../middleware/google-auth');

const getUsers = async (req, res, next) => {
  let users = [];
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    return next(new HttpError('There are no active users at the moment!', 401));
  }
  res
    .status(200)
    .json({ users: users.map((u) => u.toObject({ getters: true })) });
};

const signupUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    signupUserValidaton(req, res, next, existingUser);

    const passwordBcrypted = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: passwordBcrypted,
      placeIds: [],
      // image: req.file.path,
    });

    const createdUser = await user.save(user);

    const accessToken = jwt.sign({ id: createdUser.id }, config.tokenSecret, {
      expiresIn: config.jwtExpiration,
    });

    const refreshToken = jwt.sign(
      { id: createdUser.id },
      config.refreshTokenSecret,
      { expiresIn: config.jwtRefreshExpiration }
    );

    const cookie = req.cookies.jwt;

    if (cookie === undefined) {
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
    } else {
      console.log('cookie already exists', cookie);
    }

    res.status(201).json({ id: createdUser.id, email, accessToken });
  } catch (err) {
    return next(new HttpError(err, 500));
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return next(
        new HttpError('Could not find user with this email address!', 403)
      );
    }

    let isValidPassword = false;

    isValidPassword = bcrypt.compare(password, existingUser.password);

    if (!isValidPassword) {
      return next(new HttpError('Please enter correct password!', 403));
    }

    const accessToken = jwt.sign({ id: existingUser.id }, config.tokenSecret, {
      expiresIn: config.jwtExpiration,
    });

    const refreshToken = jwt.sign(
      { id: existingUser.id },
      config.refreshTokenSecret,
      { expiresIn: config.jwtRefreshExpiration }
    );

    const cookie = req.cookies.jwt;

    if (cookie === undefined) {
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
    } else {
      console.log('cookie already exists', cookie);
    }

    return res.status(200).json({ id: existingUser.id, accessToken });
  } catch (err) {
    return next(new HttpError(err, 500));
  }
};

const refreshToken = async (req, res, next) => {
  const { id } = req.body;

  if (req.cookies?.jwt) {
    const refreshToken = req.cookies.jwt;

    jwt.verify(refreshToken, config.refreshTokenSecret, (err, decoded) => {
      if (err) {
        return res.status(406).json({ error: 'Unauthorized' });
      } else {
        const accessToken = jwt.sign({ id }, config.tokenSecret, {
          expiresIn: config.jwtExpiration,
        });
        return res.json(accessToken);
      }
    });
  } else {
    return next(new HttpError('Unauthorized!', 406));
  }
};

// TESTING GOOGLE AUTH
// const signupUserWithGoogle = async (req, res, next) => {
//  // tbd
// };

// const loginUserWithGoogle = async (req, res, next) => {
//   // const { email, password } = req.body;
//   let data;
//   const credentials = req.body.credentials;
//   console.log('credentials: ', credentials);

//   // const token = req.headers.authorization.split(' ')[1];
//   try {
//     data = await verifyGoogleToken(credentials);
//   } catch (err) {}
//   console.log('data in login: ', data);
//   return res.status(200).json({ data });
// };

module.exports = {
  getUsers,
  signupUser,
  loginUser,
  refreshToken,
  // signupUserWithGoogle,
  // loginUserWithGoogle,
};
