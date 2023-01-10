/* eslint-disable import/no-extraneous-dependencies */

const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // eslint-disable-next-line global-require
            require('cypress-localstorage-commands/plugin')(on, config);
            return config;
        },
        baseUrl: 'http://localhost:3000',
        viewportWidth: 1920,
        viewportHeight: 1080,
    },
});
