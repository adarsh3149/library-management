const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const router = express.Router();

router.use(
  '/books',
  createProxyMiddleware({
    target: process.env.BOOK_SERVICE_URL,
    changeOrigin: true,
  })
);

module.exports = router;
