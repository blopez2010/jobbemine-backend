const { AuthenticationError } = require('apollo-server');
const { post } = require('../axios');

module.exports = {
  getOpportunities: async (_, { offset, size }, { isAuthenticated }) => {
    if (!isAuthenticated) {
      throw new AuthenticationError('must authenticate');
    }

    const { data } = await post(
      `/opportunities/_search/?offset=${offset}&size=${size}`,
      {}
    );

    return data;
  },
};
