module.exports = {
  Query: {
    visit: async (_, { id }, { models }) => {
      return await models.Visit.findById(id);
    }
  },
}