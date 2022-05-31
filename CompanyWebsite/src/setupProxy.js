const { createProxyMiddleware } = require('http-proxy-middleware');

import {ip_address} from "./internalWebsite/commonCode/CommonCode";

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: ip_address,
      changeOrigin: true,
    })
  );
};