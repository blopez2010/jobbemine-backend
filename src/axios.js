const { create } = require('axios');

const { post, get } = create({
  baseURL: process.env.JBM_TORRE_API_URL,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});

module.exports = {
  get,
  post,
};
