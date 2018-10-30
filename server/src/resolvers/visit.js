const { combineResolvers } = require('graphql-resolvers');
const { isAuthenticated } = require('./authorization');

module.exports = {
  Query: {
    visit: async (_, { id }, { models }) => {
      return await models.Visit.findById(id);
    }
  },
  Mutation: {
    createVisit: combineResolvers(
      isAuthenticated,
      async (parent, { visit, place }, { models: { Visit, Place }, viewer }) => {
        console.log(visit);
      }
    )
  }
}