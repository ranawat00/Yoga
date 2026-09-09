const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000',
      changeOrigin: true,
      logLevel: 'silent',
      onError: (err, req, res) => {
        if (!res.headersSent) {
          res.writeHead(503, {
            'Content-Type': 'application/json',
          });
          res.end(JSON.stringify({
            status: 'error',
            message: 'Backend server is offline or unreachable on port 5000. Please ensure the backend is started (cd backend && npm run dev).'
          }));
        }
      }
    })
  );
};
