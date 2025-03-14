const { By, Key, until } = require('selenium-webdriver');
const createDriver = require('../utils/driver');

describe('Login Functionality Automation with Selenium and Jest', () => {
    let driver;

    beforeAll(async () => {
        driver = await createDriver();
    });

    test('Should log in successfully and redirect to dashboard', async () => {
       
        await driver.get('http://localhost:3000/login');

        const emailInput = await driver.findElement(By.css('input[placeholder="Email"]'));
        const passwordInput = await driver.findElement(By.css('input[placeholder="Password"]'));
        const loginButton = await driver.findElement(By.css('button[type="submit"]'));

        await emailInput.sendKeys('agary@gmail.com');
        await passwordInput.sendKeys('agary');
        await loginButton.click();

        // Wait for the redirect to the dashboard
        await driver.wait(until.urlContains('/dashboard'), 5000);
        const currentUrl = await driver.getCurrentUrl();
        console.log('Current URL:', currentUrl);
        expect(currentUrl).toContain('/dashboard');
    });

    afterAll(async () => {
        await driver.quit();
    });
});