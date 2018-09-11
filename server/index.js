require('dotenv').config();

const express = require('express');
const { User } = require('./models');
const { OAuth2Client } = require('google-auth-library');
const {
  ApolloServer,
  gql,
  AuthenticationError,
  UserInputError
} = require('apollo-server-express');

const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);


function generateToken(user) {
  const token = jwt.sign(user, process.env.SECRET, { expiresIn: process.env.TOKEN_LIFE });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFE });

  return { token, refreshToken }
}

const verifyToken = async idToken => {
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

const typeDefs = gql`
  type User {
    id: ID!
    googleId: String!
    name: String!
    email: String!
    email_verified: Boolean
    picture: String
    locale: String
  }

  type Query {
    viewer: User
  }

  type LoginMutationResponse {
    token: String!
    refreshToken: String!
    viewer: User!
  }

  type Mutation {
    login(idToken: String!): LoginMutationResponse
  }
`;

const resolvers = {
  Query: {
    viewer: (_, args, { user }) => {
      if (!user) { throw new AuthenticationError('User is not logged in'); }

      return user;
    }
  },
  Mutation: {
    login: async (_, { idToken }) => {
      console.log('LOGGING IN')
      if (!idToken) {
        throw new UserInputError('ID token is missing')
      }

      const newUser = await verifyToken(idToken);

      console.log('newUser: ', newUser);

      if (!newUser) {
        throw new UserInputError('Invalid ID token')
      }

      const { user: viewer, token, refreshToken } = User.findOrCreate(newUser);

      return { viewer, token, refreshToken };
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
  /* context: async ({ req }) => {
    //const token = req.headers.authorization || '';
    //const user = await getUser(token);
    //return { user };
  } */
});

server.applyMiddleware({
  app,
  path
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
/* db.sequelize
.sync()
.then(() => {
    console.log(`Database connection to ${process.env.DB_HOST} established`);
  })
  .catch(err => console.error(err)); */
