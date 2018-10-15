const { gql } = require('apollo-server-express');

const userSchema = require('./user');
const visitSchema = require('./visit');

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  
  type Mutation {
    _: Boolean
  }
`;

module.exports = [
  linkSchema,
  userSchema,
  visitSchema
]