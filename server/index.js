require('dotenv').config();

const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const {
  ApolloServer,
  gql,
  AuthenticationError
} = require('apollo-server-express');

const cors = require('cors');

const morgan = require('morgan');

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

const getUser = async token => {
  try {
    const idToken = token.split(' ')[1];
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    const {
      name,
      email,
      email_verified,
      picture,
      sub: googleId,
      locale
    } = payload;

    const user = {
      googleId,
      name,
      email,
      email_verified,
      picture,
      locale
    };

    return user;
  } catch (error) {
    return null;
  }
};

const typeDefs = gql`
  type User {
    googleId: String!
    name: String
    email: String
    email_verified: Boolean
    picture: String
    locale: String
  }

  type Query {
    viewer: User
  }

`;

const resolvers = {
  Query: {
    viewer: (_, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('User is not logged in');
      }

      return user;
    }
  }
};

const app = express();

app.use(cors());
app.use(morgan('dev'));

const path = '/graphql';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const user = await getUser(token);

    return { user };
  }
});

server.applyMiddleware({
  app,
  path
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
