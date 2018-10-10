const { gql, AuthenticationError } = require('apollo-server-express');

const typeDef = gql`
  extend type Query {
    visit(id: ID!): Visit
  }

  type Visit {
    id: ID!,
    visitor: User!
    visitAt: Int,
    score: Float,
    review: Review!,
  }

  type Review {
    orders: [String!],
    ratings: Ratings!,
    comment: String,
  }

  type Ratings {
    food: Food,
    service: Service,
    environment: Environment,
    experience: Int
  }

  type Food {
    value: Int,
    taste: Int,
    quality: Int
  }

  type Service {
    value: Int,
    knowledge: Int,
    treatment: Int
  }

  type Environment {
    value: Int,
    athomsphere: Int,
    design: Int,
  }
`;

const resolvers = {
  Query: {
    visit: async (_, { id }, { models }) => {
      return await models.Visit.findById(id);
    }
  },
}

module.exports = {
  typeDef,
  resolvers
}