// 配置跨域
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
      // '/devApi',
      process.env.REACT_APP_API,
      createProxyMiddleware({
          target: process.env.REACT_APP_BASE_URL, // 环境变量读取公共路径
          changeOrigin: true,
          pathRewrite: {
            // "^/devApi": ""
            [`^${process.env.REACT_APP_API}`]: ""
          }
      })
  );
};