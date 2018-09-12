const { makeExecutableSchema, gql } = require('apollo-server-express');

const { typeDef: User, resolvers: userResolvers } = require('./user');

const Query = gql`
  type Query {
    _empty: String
  }
`;

const resolvers = {}

const combinedResolvers = Object.assign({}, 
  resolvers, 
  userResolvers
)

const schema = makeExecutableSchema({
  typeDefs: [Query, User],
  resolvers: combinedResolvers
})

module.exports = schema;