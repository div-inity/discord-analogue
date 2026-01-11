const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.50.51:14444', // адрес сервера Laravel
        changeOrigin: true,
      },
    },
  },

});
