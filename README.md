# WD Mocha Appium Momentumsuite
Boilerplate project to run MOBILE Test Automation with WD, Mocha, Appium, Allure reporting and Momentum Suite cloud device farm support

[WD](https://github.com/admc/wd) Integration with local or [Momentum Suite](https://www.momentumsuite.com/) real mobile farm devices.

## Supports
  * Native or Hybrid Android and iOS apps (APK, AAB, IPA)
  * Chrome mobileweb testing on Android devices
  * Safari mobileweb testing on iOS devices
  * Local testing or using Momentum Suite's 150+ Android or iOS devices
  * Auto generated HTML [Allure](https://docs.qameta.io/allure/) test report after test

## Setup

**Requirements:**

* WD requires Node.js, If you don't have Node installed, download it from [here](https://nodejs.org/en/).
* Install the [Allure command-line tool](https://www.npmjs.com/package/allure-commandline), and process the results directory after test run.

**Install the dependencies:**

Run the following command in project's base directory :
```
npm i
npm install mocha
```

## Getting Started
Getting Started with Appium tests using WD on Momentum Suite couldn't be easier!
With a Momentum Suite account, You need 4 things to start without any Appium or Android SDK dependencies.
  * **momentum:user** Usually it could be your email address
  * **momentum:token** Your unique access token learned from momentumsuite.com
  * **momentum:gw** Momentum Suite mobile device ID to run/debug the test.
  * **appium:app** Your uploaded IPA, APK or AAB app file from Momentum Suite Application Library. Example format is ms://<hashed-app-id> Optionally you can use a public accessible web URL.
 
 Do not forget to set these 4 Appium capability values and check hostname, port, path and protocol values on your **test-settings.js** file.
  
**Start with Android device:**
 Open for editing your "../test/test-settings.js" file under root directory.
 
 Set momentum.user, momentum.token, momentum.deviceList, momentum.app on your JS file.
 
 Test script is available in getting-started directory
 
 Run the following command in project's base directory :
```
npm run test
```
 
 **All available commands to start mobile testing:**
 ```
 npm run local-test
 npm run local-test-allure
 npm run momentum-test
 npm run momentum-test-allure
```
