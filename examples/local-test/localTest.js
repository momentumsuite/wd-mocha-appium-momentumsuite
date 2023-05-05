require("./helpers/setup");
const wd = require("wd");
const tesultsReporter = require("mocha-tesults-reporter");
const {DATA} = require('../../test-settings.js');

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
        require("./helpers/logging").configure(driver);

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

    after(function () {
        return driver
            .quit();
    });

    afterEach(function () {
        allPassed = allPassed && this.currentTest.state === 'passed';
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