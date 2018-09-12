require('dotenv').config();

const express = require('express');
const { User } = require('./models');
const { ApolloServer } = require('apollo-server-express');

const schema = require('./schema');

const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(morgan('dev'));

const server = new ApolloServer({
  schema,
  playground: true,
  /* context: async ({ req }) => {
    //const token = req.headers.authorization || '';
    //const user = await getUser(token);
    //return { user };
  } */
});

server.applyMiddleware({
  app,
  path: '/graphql'
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
/* db.sequelize
.sync()
.then(() => {
    console.log(`Database connection to ${process.env.DB_HOST} established`);
  })
  .catch(err => console.error(err)); */
