const { gql, AuthenticationError } = require('apollo-server-express');

const { verifyGoogleToken, createToken } = require('../auth');

const typeDef = gql`
  extend type Query {
    viewer: User
  }

  extend type Mutation {
    signUp(
      idToken: String!
    ): Token!
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!,
    googleId: String!
    name: String!,
    email: String!,
    picture: String,
    visits: [Visit!],
  }
`;

const resolvers = {
  Query: {
    viewer: async (_, args, { viewer, models }) => {
      if (!viewer) {
        return null;
      }

      return await models.User.findById(viewer.id);
    }
  },
  Mutation: {
    signUp: async (_, { tokenId }, { models }) => {
      const payload = verifyGoogleToken(tokenId);

      if (!payload) {
        throw new AuthenticationError('Something is wrong with provided user');
      }

      const {
        sub,
        name,
        email,
        picture,
      } = payload;

      const viewer = await models.User.create({
        googleId: sub,
        name,
        email,
        picture,
      });

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
    }
  }
}

module.exports = {
  typeDef,
  resolvers
}