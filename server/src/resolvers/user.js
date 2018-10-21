const { AuthenticationError } = require('apollo-server-express');
const { verifyGoogleToken, createToken } = require('../auth');

module.exports = {
  Query: {
    viewer: async (_, args, { models, viewer }) => {
      console.log('viewer: ', viewer);
      if (!viewer) {
        return null;
      }

      return await models.User.findById(viewer.id);
    }
  },
  Mutation: {
    signUp: async (_, { tokenId }, { models }) => {
      const payload = await verifyGoogleToken(tokenId);

      if (!payload) {
        throw new AuthenticationError('Something is wrong with provided user');
      }

      const {
        sub,
        name,
        email,
        picture,
      } = payload;


      const viewer = await models.User
        .findOrCreate({
          where: {
            googleId: sub,
            name,
            email,
            picture,
          }
        })
        .spread((user, created) => {
          return user.get({ plain: true });
        })

      return { token: createToken(viewer) }
    }
  },
  User: {
    visits: async (user, args, { models }) => {
      await models.Visit.findAll({
        where: {
          visitor: user.id
        }
      })
    },
  },
}