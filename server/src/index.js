require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { ApolloServer } = require('apollo-server-express');
const { models, sequelize } = require('./models');
const schema = require('./schema');

const { getViewer } = require('./auth');

const app = express();

app.use(cors());
app.use(morgan('dev'));

const server = new ApolloServer({
  schema,
  playground: true,
  context: async ({ req }) => {
    const viewer = getViewer(req);
    return { 
      models,
      viewer,
    };
  }
});

server.applyMiddleware({
  app,
  path: '/graphql'
});

const PORT = process.env.PORT || 4000;

sequelize.sync().then(() => {
    console.log(`Database connection to ${process.env.DB_HOST} established`);
    app.listen(PORT, () => console.log(`Apollo Server running on http://localhost:${PORT}/graphql`));
  })
  .catch(err => console.error(err));
