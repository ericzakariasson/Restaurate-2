const { makeExecutableSchema, gql } = require('apollo-server-express');

const { 
  typeDef: User, 
  resolvers: userResolvers 
} = require('./user');

const { 
  typeDef: Visit, 
  resolvers: visitResolvers 
} = require('./visit');

const Query = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

const resolvers = {}

const combinedResolvers = Object.assign({}, 
  resolvers, 
  userResolvers,
  visitResolvers,
)

const schema = makeExecutableSchema({
  typeDefs: [Query, User, Visit],
  resolvers: combinedResolvers
})

module.exports = schema;