module.exports = {
  isTokenValid: token => {
    if (process.env.JBM_BYPASS_AUTHORIZATION == 'true') {
      return true;
    }

    return (token || '') === process.env.JBM_AUTHORIZATION_KEY;
  },
};
