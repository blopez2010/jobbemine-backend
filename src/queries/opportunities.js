const { create } = require('axios');
const { AuthenticationError } = require('apollo-server');

const myClient = create({
  baseURL: process.env.JBM_TORRE_API_URL,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});

module.exports = {
  getOpportunities: async (_, { offset, size }, { isAuthenticated }) => {
    if (!isAuthenticated) {
      throw new AuthenticationError('must authenticate');
    }

    const { data } = await myClient.post(
      `/opportunities/_search/?offset=${offset}&size=${size}`,
      {}
    );

    return data;
  },
};
