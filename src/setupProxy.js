const { createProxyMiddleware } = require('http-proxy-middleware');

import {ip_address} from "./InternalWebsite/CommonCode/CommonCode";

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: ip_address,
      changeOrigin: true,
    })
  );
};