module.exports = {
  tokenSecret: process.env.TOKEN_SECRET_KEY,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET_KEY,
  //   jwtExpiration: '1h', // 1 hour
  //   jwtRefreshExpiration: '7d', // 7 days

  /* for test */
  jwtExpiration: '1h',
  jwtRefreshExpiration: '1d',
};
