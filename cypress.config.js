const { defineConfig } = require("cypress");
const webpack = require("@cypress/webpack-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    webpack({
      webpackOptions: {
        resolve: {
          extensions: [".ts", ".js"],
        },
        module: {
          rules: [
            {
              test: /\.feature$/,
              use: [
                {
                  loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                  options: config,
                },
              ],
            },
          ],
        },
      },
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    setupNodeEvents,
    "video": false
  },
  env: {
    "apiBaseURL": "https://threat-intel.qa.a10networks.com/api",
    "apiTenantURL": "https://threat-intel.qa.a10networks.com/api",
    "apiResourceURL": "https://threat-intel.qa.a10networks.com/api",
    "apiResourceUsageURL": "https://threat-intel.qa.a10networks.com/api",
    "apiProductURL": "http://threat-intel.qa.a10networks.com/api",
    "apiServerURL": "http://threat-intel.qa.a10networks.com/api",
  }
});