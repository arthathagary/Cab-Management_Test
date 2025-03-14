const { By, until } = require('selenium-webdriver');
const createDriver = require('../utils/driver');

jest.setTimeout(15000);

describe('New Driver Form Automation with Selenium and Jest', () => {
  let driver;

  beforeAll(async () => {
    driver = await createDriver();
  });

  test('Should fill out and submit the new driver form', async () => {
    // Navigate to the new driver form page.
    await driver.get('http://localhost:3000/drivers/new');

    // Fill in the personal information fields.
    const nameInput = await driver.findElement(By.css('input[placeholder="Enter full name"]'));
    const emailInput = await driver.findElement(By.css('input[placeholder="Enter email address"]'));
    const phoneInput = await driver.findElement(By.css('input[placeholder="Enter phone number"]'));
    const addressInput = await driver.findElement(By.css('textarea[placeholder="Enter address"]'));

    await nameInput.sendKeys('Jane Smith');
    await emailInput.sendKeys('jane.smith@example.com');
    await phoneInput.sendKeys('0987654321');
    await addressInput.sendKeys('456 Another St, Cardiff');

    // Fill in the driver details.
    const licenseInput = await driver.findElement(By.css('input[placeholder="Enter license number"]'));
    const experienceInput = await driver.findElement(By.css('input[placeholder="0"]'));

    await licenseInput.sendKeys('LIC12345');
    await experienceInput.clear();
    await experienceInput.sendKeys('3');

    // Handle the Status select component.
    // The Select renders a button displaying the default value "Active".
    const selectTrigger = await driver.findElement(By.xpath("//button[contains(., 'Active')]"));
    await driver.executeScript("arguments[0].scrollIntoView(true);", selectTrigger);
    await selectTrigger.click();

    // Wait for the dropdown option "Suspended" to be visible and select it.
    const suspendedOption = await driver.wait(
      until.elementLocated(By.xpath("//*[text()='Suspended']")),
      5000
    );

    await suspendedOption.click();

    // Submit the form by clicking the button with the text "Create Driver".
    const submitButton = await driver.findElement(By.xpath("//button[contains(., 'Create Driver')]"));
    await driver.executeScript("arguments[0].click();", submitButton);

    // Optionally, wait for redirection or confirmation that the submission succeeded.
    await driver.wait(until.urlContains('/drivers'), 5000);
  });

  afterAll(async () => {
    await driver.quit();
  });
});