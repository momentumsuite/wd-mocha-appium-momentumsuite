require("../../examples/helpers/setup.js");
const wd = require("wd");
const tesultsReporter = require("mocha-tesults-reporter");
const {DATA} = require('../../test-settings.js');

// returns ChildProcess instance
var generation = allure(['generate', 'allure-results']);
const serverConfigLocal = {
    hostname: DATA.LOCAL.hostname,
    port: DATA.LOCAL.port,
    path: DATA.LOCAL.path,
    protocol:  DATA.LOCAL.protocol,
};

describe("sample test", function () {
    this.timeout(300000);

    let driver;
    let allPassed = true;
    before(function () {
        
        driver = wd.promiseChainRemote(serverConfigLocal);
        require("../../examples/helpers/logging.js").configure(driver);

        let desired = {
            platformName: 'Android',
            deviceName:  DATA.LOCAL.deviceName,
            app:  DATA.LOCAL.app,
            fullReset: false,
            noReset: true
        };
        return driver
            .init(desired)
            .setImplicitWaitTimeout(8000);
    });
    after(async function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await driver.takeScreenshot();
            await driver.closeApp();
            driver.deleteSession(); 
            driver.quit();   
        }
    });
    afterEach(function () {
        allPassed = allPassed && this.currentTest.state === 'passed';
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                15000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    });
    generation.on('exit', function(exitCode) {
        console.log('Generation is finished with code:', exitCode);
    });
    it("login example", function () {
        return driver
            .waitForElementById("app.com.sandjs.bankaccountfakewallet:id/username_txt")
            .should.eventually.exist
            .click()
            .elementById("app.com.sandjs.bankaccountfakewallet:id/username_txt")
            .sendKeys("hakana")
            .hideKeyboard()
            .elementById("app.com.sandjs.bankaccountfakewallet:id/password_txt")
            .sendKeys("123456Aa.")
            .hideKeyboard()
            .elementById("app.com.sandjs.bankaccountfakewallet:id/login_btn")
            .click()

    });
});