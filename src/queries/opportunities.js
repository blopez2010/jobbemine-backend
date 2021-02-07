const { AuthenticationError } = require('apollo-server');
const { postData, getData } = require('../axios');

module.exports = {
  getOpportunities: async (_, { offset, size }, { isAuthenticated }) => {
    if (!isAuthenticated) {
      throw new AuthenticationError('must authenticate');
    }

    const { data } = await postData(
      `${process.env.JBM_TORRE_API_URL}/opportunities/_search/?offset=${offset}&size=${size}`
    );

    return data;
  },
  getOpportunityById: async (_, { id }, { isAuthenticated }) => {
    if (!isAuthenticated) {
      throw new AuthenticationError('must authenticate');
    }

    const { data } = await getData(`${process.env.JBM_TORRE_API_URL_OPPORTUNITIES}/${id}`);

    return data;
  },
  // eslint-disable-next-line no-empty-pattern
  getOpportunitiesAggregators: async (_, {}, { isAuthenticated }) => {
    if (!isAuthenticated) {
      throw new AuthenticationError('must authenticate');
    }

    const { data } = await postData(
      `${process.env.JBM_TORRE_API_URL}/opportunities/_search/?aggregate=true&offset=0&size=0`
    );

    return data;
  }
};
