const { defineConfig } = require('@vue/cli-service');
const fs = require('fs');

module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   server: {
  //     type: 'https',
  //     options: {
  //       key: fs.readFileSync('./etc/privkey.pem'),
  //       cert: fs.readFileSync('./etc/cert.pem'),
  //     },
  //   },
  // },
});
