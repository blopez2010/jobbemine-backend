const { AuthenticationError } = require('apollo-server');
const { post } = require('../axios');

module.exports = {
  getPeople: async (_, { offset, size }, { isAuthenticated }) => {
    if (!isAuthenticated) {
      throw new AuthenticationError('must authenticate');
    }

    const { data } = await post(
      `/people/_search/?offset=${offset}&size=${size}`,
      {}
    );

    return data;
  },
};
