const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const { AuthenticationError } = require('apollo-server-express');

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);


module.exports.createToken = async user => {

  const expiresIn = process.env.TOKEN_LIFE;
  const secret = process.env.SECRET

  const {
    id,
    googleId,
    name,
    email,
    picture,
  } = user;

  return await jwt.sign({ id, googleId, name, email, picture }, secret, {
    expiresIn: '7d',
  });

  // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFE });
}

module.exports.verifyGoogleToken = async idToken => {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    console.log(payload);

    if (payload.aud.includes(process.env.GOOGLE_CLIENT_ID)) {
      return payload;
    }

    return null;

  } catch (error) {
    return null;
  }
};

module.exports.getViewer = async req => {
  const token = req.headers["authorization"];

  console.log('token: ', token);
  console.log(typeof token)

  if (token && token !== 'null') {
    console.log('THERE IS A TOKEN')
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (err) {
      throw new AuthenticationError(
        'Your session has expired. Re-authentication needed'
      );
    }
  }
}