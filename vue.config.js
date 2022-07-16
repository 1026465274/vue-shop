const { defineConfig } = require("@vue/cli-service");
const { resolve } = require("core-js/fn/promise");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
});
