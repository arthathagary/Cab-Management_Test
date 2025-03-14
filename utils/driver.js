const { Builder } = require('selenium-webdriver');

async function createDriver() {
    return new Builder().forBrowser('chrome').build();
}

module.exports = createDriver;
