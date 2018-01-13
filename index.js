const bail = (error) => {
  console.error(error);
  process.exit(1);
};
process.on('uncaughtException', bail);
process.on('unhandledRejection', bail);

// we could use @std/esm but lets instead use babel to do both jsx and import/export
require('babel-register')({
  only: /[\\/]src[\\/]/,
  extensions: ['.js'],
  cache: false,
  plugins: ['transform-es2015-modules-commonjs']
});

require('./src/apiServer.js');
require('./src/webServer.js');
