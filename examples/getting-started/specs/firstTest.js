require("../../../examples/helpers/setup.js");
const {setDriverMethods} = require('../../../examples/getting-started/Libraries/example.js');
const {ELEMENT} = require('../../../examples/getting-started/Libraries/example.js');
const wd = require("wd");
const {DATA} = require('../../../test-settings.js');
const serverConfig = {
    host: 'localhost',
    port: 4723
};
const serverConfigMomentum = {
    host: DATA.CLOUD['momentum.hostname'],
    port: DATA.CLOUD['momentum.gw'],
    path: DATA.CLOUD['momentum.path'],
    protocol: DATA.CLOUD['momentum.protocol'],
};

describe("sample test", function () {
    this.timeout(300000);

    let driver;
    let allPassed = true;

    before(async function () {
        driver = wd.promiseChainRemote(serverConfigMomentum);
        require("../../../examples/helpers/logging.js").configure(driver);

        setDriverMethods(driver);
        const  desiredCaps = {

            platformName: 'Android',
            "automationName": "UiAutomator2",
            "autoGrantPermissions": true,
            "app":DATA.CLOUD['momentum.app'],
            "fullReset": true,
            "noReset": false,
            "deviceName": "",
            "udid": "",
            "momentum:user":DATA.CLOUD['momentum.user'],
            "momentum:token":DATA.CLOUD['momentum.token'],
            "momentum:gw": DATA.CLOUD['momentum.deviceList'][0]
        };
        return driver
            .init(desiredCaps)
            .setImplicitWaitTimeout(8000);
    });

    after(function () {
        return driver
            .quit();
    });

    afterEach(function () {
        allPassed = allPassed && this.currentTest.state === 'passed';
    });

    it("login example with mobile test",async function () {
        return driver.login("hakan","12355");

    });
    it("api call example with axios 2",async function () {
        return driver.example_axios();

    });
    it("api call example with axios 2",async function () {
        return driver.example_axios3();

    })
});