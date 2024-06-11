const path = require('path');

module.exports = {
  // Other configurations...
  resolve: {
    fallback: {
      "buffer": require.resolve("buffer/")
    }
  },
  // Other configurations...
};
