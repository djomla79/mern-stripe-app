const { OAuth2Client } = require('google-auth-library');
const HttpError = require('../models/http-error');
const config = require('../config/google-constants');

const verifyGoogleToken = async (token) => {
  let ticket;
  let payload;
  const client = new OAuth2Client(
    config.googleClientId
    // config.googleClientSecret
  );

  try {
    if (!token) {
      throw new HttpError('Authentication failed, missing token!');
    }
    const tokenInfo = await client.getTokenInfo(token);
    console.log('tokenInfo in getTokenInfo: ', tokenInfo);

    ticket = await client.verifyIdToken({
      idToken: token,
      //   audience: config.googleClientId,
    });
    payload = ticket.getPayload();
    return { payload };
  } catch (error) {
    return next(new HttpError(error));
  } finally {
    console.log('payload in verifyGoogleToken: ', payload);
  }
};

module.exports = verifyGoogleToken;
