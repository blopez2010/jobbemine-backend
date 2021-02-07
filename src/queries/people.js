const { AuthenticationError } = require('apollo-server');
const { postData } = require('../axios');

module.exports = {
  getPeople: async (_, { offset, size }, { isAuthenticated }) => {
    if (!isAuthenticated) {
      throw new AuthenticationError('must authenticate');
    }

    const { data } = await postData(
      `${process.env.JBM_TORRE_API_URL}/people/_search/?offset=${offset}&size=${size}`
    );

    return data;
  },
};
