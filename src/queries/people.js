const { AuthenticationError } = require('apollo-server');
const { postData, getData } = require('../axios');

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
  getBioByUsername: async (_, { username }, { isAuthenticated }) => {
    if (!isAuthenticated) {
      throw new AuthenticationError('must authenticate');
    }

    const { data } = await getData(`${process.env.JBM_TORRE_API_URL_BIOS}/${username}`);

    return data;
  },
  // eslint-disable-next-line no-empty-pattern
  getPeopleAggregators: async (_, {}, { isAuthenticated }) => {
    if (!isAuthenticated) {
      throw new AuthenticationError('must authenticate');
    }

    const { data } = await postData(
      `${process.env.JBM_TORRE_API_URL}/people/_search/?aggregate=true&offset=0&size=0`
    );

    return data;
  },
};
