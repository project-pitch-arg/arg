const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://95.80.24.200:3000',
      changeOrigin: true,
    })
  );
};