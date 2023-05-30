// This file is used to customise the configuration of the Vue CLI (Command Line Interface). 
// It allows to modify various settings related to development and build processes.

const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: { port: 8080 , host: "0.0.0.0"}
})