const wd = require('wd');
const fs = require('fs');
const options = require("../options.json");
const capabilityHelper = require('./set-capabilities');

let serverConfig = {
  host: 'console.momentumsuite.com',
  port: 443,
  path: '/gateway/wd/hub/',
  protocol: 'https'
};
var driver = wd.promiseChainRemote(serverConfig);

var caps = {
    "platformName": 'Android', //ios
    "automationName": "UiAutomator2", //XCUITest
    "app":"ms://<hashed-app-id>",
    "fullReset": true,
    "noReset": false,
    "deviceName": "",
    "udid": "",
    "autoGrantPermissions": true, //Only available with Android
    //"autoAcceptAlerts": true, //Only available with iOS
    //"remoteDebugProxy": 6094, //Only available with iOS
    "momentum:user":"<momentum-suite-username>",
    "momentum:token":"<momentum-suite-access-key>",
    "momentum:gw": 4094 //M-Connect DeviceId
};


driver.saveScreen = function (fileName) {
  return new Promise((resolve) => {
    this.takeScreenshot().then(function (image) {
      process.env.SCREENSHOT_ORDER++;
      var filePath = `screenshot_${fileName}.png`;
      fs.writeFile(filePath, image, 'base64', function (err) {
        resolve(true)
      })
    })
  })
}

exports.getDriver = async () => {
    return new Promise((resolve, reject) => {
      driver.init(caps).then(() => {
        console.log("created");
        resolve(driver);
      }).catch((error) => {
        reject(new Error('driver create error'));
        console.log(error);
      });
    })
  };
