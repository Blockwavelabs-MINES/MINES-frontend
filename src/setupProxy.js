const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/users", "/links", "/wallets", "/trxs"], {
      target: "https://api.3tree.club",
      changeOrigin: true,
      autoRewrite: true,
    })
  );
  //   app.listen(3000);
};
