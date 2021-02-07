const { get, post } = require('axios');

module.exports = {
  getData: url =>
    get(url, {
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
    }),
  postData: url =>
    post(
      url,
      {},
      {
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
        },
      }
    ),
};
