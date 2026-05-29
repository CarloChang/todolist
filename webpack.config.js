const path = require('path');

module.exports = {
  mode: 'development',        // 'production' for minified output
  entry: './src/index.js',    // where webpack starts reading
  output: {
    filename: 'bundle.js',    // the output file name
    path: path.resolve(__dirname, 'dist'),  // absolute path to dist/
  },
};
