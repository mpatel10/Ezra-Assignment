const { Builder, By, until } = require('selenium-webdriver');

(async function loginTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Open login page
        await driver.get('https://myezra-staging.ezra.com/sign-in');

        // Enter email and password
        await driver.findElement(By.name('email')).sendKeys('mital.patel10@gmail.com');
        await driver.findElement(By.name('password')).sendKeys('Password1!');

        // Click Submit
        const submitButton = await driver.findElement(By.css('button.submit-btn'));
        await driver.executeScript("arguments[0].click();", submitButton);

        // 4️⃣ Wait for error message
        await driver.sleep(3000); // wait for error to render
        const errorMsg = await driver.findElement(
            By.xpath("//div[contains(text(),'The username/password combination is invalid')]")
        );
        console.log('❌ Invalid login detected:', await errorMsg.getText());

    } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        await driver.quit();
    }
})();
