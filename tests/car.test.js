const { By, until } = require('selenium-webdriver');
const createDriver = require('../utils/driver');

jest.setTimeout(15000);

describe('New Car Form Automation with Selenium and Jest', () => {
  let driver;

  beforeAll(async () => {
    driver = await createDriver();
  });

  test('Should fill out and submit the new car form', async () => {
    // Navigate to the new car form page.
    await driver.get('http://localhost:3000/cars/new');

    // Fill in the car model, plate number, and seating capacity.
    const modelInput = await driver.findElement(By.css('input[placeholder="Enter car model"]'));
    const plateInput = await driver.findElement(By.css('input[placeholder="Enter plate number"]'));
    const capacityInput = await driver.findElement(By.css('input[placeholder="Enter capacity"]'));

    await modelInput.sendKeys('Toyota Camry');
    await plateInput.sendKeys('XYZ987');
    await capacityInput.clear();
    await capacityInput.sendKeys('5');

    // Handle the Status select component.
    // The Select renders a button displaying the default value "Available".
    const selectTrigger = await driver.findElement(By.xpath("//button[contains(., 'Available')]"));
    await driver.executeScript("arguments[0].scrollIntoView(true);", selectTrigger);
    await selectTrigger.click();

    // Wait for the dropdown option "Maintenance" to be visible and select it.
    const maintenanceOption = await driver.wait(
      until.elementLocated(By.xpath("//*[text()='Maintenance']")),
      5000
    );

    await maintenanceOption.click();

    await driver.sleep(500); 


    // Submit the form by clicking the button with id="submit-btn"
    const submitButton = await driver.findElement(By.id("submit-btn"));
    await driver.executeScript("arguments[0].click();", submitButton);

  });

  afterAll(async () => {
    await driver.quit();
  });
});