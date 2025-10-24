const { Builder, By, until } = require('selenium-webdriver');

(async function loginTest() {
    // Initialize WebDriver (Chrome)
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to the login page
        await driver.get('https://myezra-staging.ezra.com/sign-in');

        // Wait for the email input to be visible
        await driver.wait(until.elementLocated(By.name('email')), 10000);

        // Enter email
        await driver.findElement(By.name('email')).sendKeys('bhavin_mital_06@yahoo.com');

        // Enter password
        await driver.findElement(By.name('password')).sendKeys('Password1!');

        // Wait until the submit button is located
        const submitButton = await driver.wait(
        until.elementLocated(By.css('button.submit-btn')),
        10000  // wait up to 10 seconds
        );

        // Wait until the button is visible
        await driver.wait(
        until.elementIsVisible(submitButton),
        5000
        );

        // Click the button
        await submitButton.click();

        // Wait for dashboard or success element
        // Wait for the "Appointments" section to appear
        const appointmentsSection = await driver.wait(
        until.elementLocated(By.xpath("//div[contains(@class,'section-header') and contains(text(),'Appointments')]")),
        20000
        );

        console.log('✅ Login successful!');
    } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        // Close the browser
        await driver.quit();
    }
})();