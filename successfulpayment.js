const { Builder, By, until } = require('selenium-webdriver');

(async function loginTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Open login page
        await driver.get('https://myezra-staging.ezra.com/sign-in');

        // Enter email and password
        await driver.findElement(By.name('email')).sendKeys('bhavin_mital_06@yahoo.com');
        await driver.findElement(By.name('password')).sendKeys('Password1!');

        // Click login
        const submitButton = await driver.wait(until.elementLocated(By.css('button.submit-btn')), 10000);
        await driver.wait(until.elementIsVisible(submitButton), 5000);
        await submitButton.click();

        console.log('✅ Logged in successfully!');

        // Step 2: Click "Book a scan" button
        // Wait for Appointments section
        const appointmentsSection = await driver.wait(
            until.elementLocated(
                By.xpath("//div[contains(@class,'section-header') and contains(text(),'Appointments')]")
            ),
            10000
        );
        // Find the "Book a scan" button inside Appointments
        const bookScanButton = await appointmentsSection.findElement(
            By.css('button.basic.mini-new.black-chocolate')
        );
        // Wait until button is visible and scroll into view
        await driver.wait(until.elementIsVisible(bookScanButton), 15000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", bookScanButton);

        // Click the button
        await bookScanButton.click();
        console.log('✅ Book a scan button clicked successfully!');

        // Step 3: Select service
        //const mriOption = await driver.wait(
        //    until.elementLocated(By.xpath("//button[contains(text(),'MRI Scan')]")),
         //   30000
        //);
        //await mriOption.click(), 6000;

         // Step 4: Select your scan - Enter Date of Birth
        const dobInput = await driver.wait(
          until.elementLocated(By.xpath("/html/body/div[2]/div/div[1]/div/div/div/div[2]/div/div[1]/div[2]/form/div[1]/div/div/input")),
          10000
        );
        await driver.wait(until.elementIsVisible(dobInput), 5000);
        await dobInput.sendKeys('03/01/1990'); // Replace with desired DOB
        console.log('✅ Date of Birth entered!');

        // Click the dropdown to open it
        const sexDropdown = await driver.wait(
          until.elementLocated(By.xpath("/html/body/div[2]/div/div[1]/div/div/div/div[2]/div/div[1]/div[2]/form/div[2]/div/div/div/div[1]")),
          10000
        );
        await driver.wait(until.elementIsVisible(sexDropdown), 5000);
        await sexDropdown.click();
        console.log('✅ Dropdown clicked!');

        // Select an option (Male or Female)
        const sexOption = await driver.wait(
          until.elementLocated(By.xpath("/html/body/div[2]/div/div[1]/div/div/div/div[2]/div/div[1]/div[2]/form/div[2]/div/div/div/div[2]/ul/li[1]/span")), 
          10000
        );
        await driver.wait(until.elementIsVisible(sexOption), 5000);
        await sexOption.click();
        console.log('✅ Sex at Birth selected!');
        
        // Wait for MRI Scan element to be present and clickable
        await driver.sleep(3000); // wait for list to load
          const mriScan = await driver.wait(
              until.elementLocated(By.xpath("/html/body/div[2]/div/div[1]/div/div/div/div[2]/div/div[1]/div[3]/ul/li[2]/div[1]/div[1]")),
              20000
        );
        await driver.wait(until.elementIsVisible(mriScan), 5000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", mriScan);
        await mriScan.click();
        console.log('✅ MRI Scan selected!');

        // Click Continue button on Select Plan / Schedule Your Scan
        await driver.findElement(By.xpath("/html/body/div[2]/div/div[1]/div/div/div/div[2]/div/div[2]/div[2]/button[2]")).click();
        10000
        console.log('✅ Continue clicked!');  

         // Step 6: Schedule your scan - select Recommended option
        await driver.sleep(5000); // wait for page to load
        const recommended = await driver.wait(
          until.elementLocated(By.xpath("//div[contains(text(),'Recommended')]")),
          15000
        );
        await driver.wait(until.elementIsVisible(recommended), 5000);
        await recommended.click();
        console.log('✅ "Recommended" label clicked!');

         // Wait for the date element
        const dateElement = await driver.wait(
            until.elementLocated(By.xpath("//div[contains(@class,'day') or contains(@class,'calendar')][1]")),
            15000
        );
        await driver.wait(until.elementIsVisible(dateElement), 5000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", dateElement);
        await dateElement.click();
        console.log('✅ Date selected!');

        // Select Time Slot
        await driver.sleep(5000); // give time for slots to render
        const timeSlot = await driver.wait(
          until.elementLocated(By.xpath("//label[contains(@class,'time') or contains(@class,'slot') or @for]")),
          20000
        );
        await driver.wait(until.elementIsVisible(timeSlot), 5000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", timeSlot);
        await timeSlot.click();
        console.log('✅ Time slot selected!');

          // Click the "Continue" button on Schedule your Scan page
       await driver.sleep(4000); // wait for page to load
        const continueButton = await driver.findElement(By.xpath("//button[contains(.,'Continue')]"));
        await driver.executeScript("arguments[0].scrollIntoView(true);", continueButton);
        await driver.executeScript("arguments[0].click();", continueButton);
        console.log('✅ Continue clicked!');

        
      // Step 7: Enter payment details - reserve your appointment
        async function enterStripePayment(driver) {
      // Card Number
        await driver.switchTo().frame(await driver.findElement(By.css('iframe[name^="__privateStripeFrame"]')));
        await driver.findElement(By.css('input[name="cardnumber"]')).sendKeys('4242 4242 4242 4242');
        await driver.switchTo().defaultContent();

      // Expiry Date
        await driver.switchTo().frame(await driver.findElement(By.css('iframe[name^="__privateStripeFrame"]')));
        await driver.findElement(By.css('input[name="exp-date"]')).sendKeys('12/34');
        await driver.switchTo().defaultContent();

      // CVC
        await driver.switchTo().frame(await driver.findElement(By.css('iframe[name^="__privateStripeFrame"]')));
        await driver.findElement(By.css('input[name="cvc"]')).sendKeys('567');
        await driver.switchTo().defaultContent();

      // Postal Code
        await driver.switchTo().frame(await driver.findElement(By.css('iframe[name^="__privateStripeFrame"]')));
        await driver.findElement(By.css('input[name="postal"]')).sendKeys('10022');
        await driver.switchTo().defaultContent();

        console.log('✅ Stripe payment entered!');
      };

      // Click the "Continue" button on Payment Screen
        const paymentContinue = await driver.findElement(By.xpath("//button[contains(.,'Continue') or contains(.,'Next')]"));
        await driver.executeScript("arguments[0].scrollIntoView(true);", paymentContinue);
        await driver.executeScript("arguments[0].click();", paymentContinue);
        console.log('✅ Payment Continue clicked!');

        // Step 6: Verify booking success
        await driver.sleep(5000); // wait for confirmation to render
        const confirmedMsg = await driver.findElement(
          By.xpath("//h4[contains(text(),'MRI Scan Appointment')]")
        );
        await driver.executeScript("arguments[0].scrollIntoView(true);", confirmedMsg);
        console.log('✅ Booking confirmed!');

      } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        if (driver) await driver.quit();
    }
})();
