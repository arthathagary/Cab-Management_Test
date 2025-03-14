const { By, until } = require("selenium-webdriver");
const createDriver = require("../utils/driver");

jest.setTimeout(20000);

describe("New Booking Form Automation with Selenium and Jest", () => {
  let driver;

  beforeAll(async () => {
    driver = await createDriver();
  });

  test("Should fill out and submit the new booking form", async () => {
    // Navigate to the new booking form page.
    await driver.get("http://localhost:3000/bookings/new");

    // Wait until the Booking Information header is visible.
    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(., 'Booking Information')]")),
      5000
    );

    // -- Select Customer --
    // Click on the customer select trigger.
    const customerSelect = await driver.findElement(
      By.xpath("//button[contains(., 'Select a customer')]")
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      customerSelect
    );
    await driver.executeScript("arguments[0].click();", customerSelect);
    await driver.sleep(500);
    // Wait for and select the customer option "John Doe"
    const customerOption = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(., 'John Doe')]")),
      5000
    );
    //await customerOption.click();
    await driver.executeScript("arguments[0].click();", customerOption);

    // -- Select Driver (Optional) --
    // Click on the driver select trigger.
    const driverSelect = await driver.findElement(
      By.xpath("//button[contains(., 'Select a driver')]")
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      driverSelect
    );
    await driver.executeScript("arguments[0].click();", driverSelect);
    await driver.sleep(500);
    // Wait for and select the driver option "Jane Doe"
    const driverOption = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(., 'Jane Smith')]")),
      5000
    );
    await driver.executeScript("arguments[0].click();", driverOption);

    // -- Select Car (Optional) --
    // Click on the car select trigger.
    const carSelect = await driver.findElement(
      By.xpath("//button[contains(., 'Select a car')]")
    );
    await driver.executeScript("arguments[0].scrollIntoView(true);", carSelect);
    await driver.executeScript("arguments[0].click();", carSelect);
    await driver.sleep(500);
    // Wait for and select the car option "Toyota Camry (XYZ123)"
    const carOption = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(., 'Toyota Camry')]")),
      5000
    );
    await driver.executeScript("arguments[0].click();", carOption);

    // -- Select Status --
    // Click on the status select trigger (default should be "Pending")
    const statusSelect = await driver.findElement(
      By.xpath("//button[contains(., 'Pending')]")
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      statusSelect
    );
    await driver.executeScript("arguments[0].click();", statusSelect);
    // Wait for and select the "Confirmed" option.
    const statusOption = await driver.wait(
      until.elementLocated(By.xpath("//*[text()='Confirmed']")),
      5000
    );
    await statusOption.click();

    // -- Fill Pickup and Drop Locations --
    const pickupInput = await driver.findElement(
      By.css('input[placeholder="Pickup Location"]')
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      pickupInput
    );
    await driver.sleep(500);
    await driver.executeScript("arguments[0].click();", pickupInput);

    // Type a partial city name to open the popover.
    await pickupInput.sendKeys("Fort");

    // Wait for the matching city option and click it.
    const cityOption = await driver.wait(
      until.elementLocated(By.xpath("//*[text()='Colombo 01 - Fort']")),
      5000
    );
    await driver.executeScript("arguments[0].click();", cityOption);

    // Fill the drop location.
    const dropInput = await driver.findElement(
      By.css('input[placeholder="Drop Location"]')
    );
    await driver.executeScript("arguments[0].scrollIntoView(true);", dropInput);
    await driver.sleep(500);
    await driver.executeScript("arguments[0].click();", dropInput);

    // Type a partial city name to open the popover.
    await pickupInput.sendKeys("Fort");

    // Wait for the matching city option and click it.
    const cityOption2 = await driver.wait(
      until.elementLocated(By.xpath("//*[text()='Colombo 01 - Fort']")),
      5000
    );
    await driver.executeScript("arguments[0].click();", cityOption2);

    const fareInput = await driver.findElement(
      By.css('input[placeholder="0.00"]')
    );
    await driver.wait(until.elementIsVisible(fareInput), 5000);
    await driver.wait(until.elementIsEnabled(fareInput), 5000);
    await driver.executeScript("arguments[0].scrollIntoView(true);", fareInput);
    await driver.sleep(500);

    await driver.executeScript("arguments[0].value = '';", fareInput);
    await fareInput.sendKeys("50");

    // -- Submit the Form --
    // Click the "Create Booking" button.
    const submitButton = await driver.findElement(
      By.xpath("//button[contains(., 'Create Booking')]")
    );
    await driver.executeScript("arguments[0].click();", submitButton);

    await driver.wait(until.urlContains("/bookings"), 5000);
  });

  afterAll(async () => {
    await driver.quit();
  });
});
