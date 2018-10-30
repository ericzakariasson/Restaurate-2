const { ForbiddenError } = require('apollo-server');
const { combineResolvers, skip } = require('graphql-resolvers');

const isAuthenticated = (parent, args, { viewer }) => {
  viewer ? skip : new ForbiddenError('Not authenticated')
}

module.exports = {
  isAuthenticated
}