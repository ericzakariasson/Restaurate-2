const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');


const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);


function signToken(user) {
  const token = jwt.sign(user, process.env.SECRET, { expiresIn: process.env.TOKEN_LIFE });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFE });

  return { token, refreshToken }
}

function verifyToken(token) {
  const decoded = jwt.verify(token, process.env.SECRET);
}

const verifyGoogleToken = async idToken => {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    return payload;
  } catch (error) {
    return null;
  }
};