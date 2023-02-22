const { defineConfig } = require('@vue/cli-service');
const fs = require('fs');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    http2: true,
    // https: {
    //   key: fs.readFileSync('./etc/privkey.pem'),
    //   cert: fs.readFileSync('./etc/cert.pem'),
    //   ca: fs.readFileSync('./etc/chain.pem'),
    // },
    https: {
      key: fs.readFileSync('./etc/privkey.pem'),
      cert: fs.readFileSync('./etc/cert.pem'),
      ca: fs.readFileSync('./etc/chain.pem'),
    },
  },
});
