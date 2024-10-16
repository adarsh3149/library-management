const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const router = express.Router();

router.use(
  '/borrowings',
  createProxyMiddleware({
    target: process.env.BORROWING_SERVICE_URL,
    changeOrigin: true,
  })
);

module.exports = router;
