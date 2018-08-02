const users = [];

const jwt = require('jsonwebtoken');

function generateToken(user) {
  const token = jwt.sign(user, process.env.SECRET, { expiresIn: process.env.TOKEN_LIFE });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFE });

  return {
    token,
    refreshToken,
  }
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const User = {
  findOrCreate: (newUser) => {

    const existingUser = users.find(user => user.id === newUser.id);

    console.log('existingUser: ', existingUser);

    if (!existingUser) {
      const user = {
        id: guid(),
        googleId: newUser.sub,
        name: newUser.name,
        email: newUser.email,
        picture: newUser.picture,
        locale: newUser.locale
      }
      console.log('user: ', user);


      const { token, refreshToken } = generateToken(user);

      user.refreshToken = refreshToken;
      users.push(user);

      return {
        user,
        token,
        refreshToken,
      }
    } else {
      const { token, refreshToken } = generateToken(existingUser);

      existingUser.refreshToken = refreshToken;

      return {
        existingUser,
        token,
        refreshToken,
      }
    }
  }
}

module.exports = User;