const { By, until } = require('selenium-webdriver');
const createDriver = require('../utils/driver');

jest.setTimeout(15000);

describe('New Customer Form Automation with Selenium and Jest', () => {
  let driver;

  beforeAll(async () => {
    driver = await createDriver();
  });

  test('Should fill out and submit the new customer form', async () => {
    // Navigate to the new customer form page.
    await driver.get('http://localhost:3000/customers/new');

    // Fill in the name, email, phone, and address fields.
    const nameInput = await driver.findElement(By.css('input[placeholder="Enter full name"]'));
    const emailInput = await driver.findElement(By.css('input[placeholder="Enter email address"]'));
    const phoneInput = await driver.findElement(By.css('input[placeholder="Enter phone number"]'));
    const addressInput = await driver.findElement(By.css('textarea[placeholder="Enter address"]'));

    await nameInput.sendKeys('John Doe');
    await emailInput.sendKeys('john.doe@example.com');
    await phoneInput.sendKeys('1234567890');
    await addressInput.sendKeys('123 Main St, Cardiff');

    // Submit the form by clicking the submit button with the text "Create Customer"
    const submitButton = await driver.findElement(By.xpath("//button[contains(., 'Create Customer')]"));
    await driver.executeScript("arguments[0].click();", submitButton);

    await driver.wait(until.urlContains('/customers'), 5000);
  });

  afterAll(async () => {
    await driver.quit();
  });
});