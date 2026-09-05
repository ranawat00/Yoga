const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      logLevel: 'silent',
      onError: (err, req, res) => {
        if (!res.headersSent) {
          res.writeHead(503, {
            'Content-Type': 'application/json',
          });
          res.end(JSON.stringify({ status: 'error', message: 'Backend service unavailable or restarting.' }));
        }
      }
    })
  );
};
