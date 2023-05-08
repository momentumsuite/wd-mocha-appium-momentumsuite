
const wd = require("wd");
const axios = require('axios').default;
const {expect} = require('chai');
var assert = require('assert');
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 25000;

require('colors');
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const should = chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

exports.should = should;
var DEFAULT_TIMEOUT=8000;
var DEFAULT_TIMEOUT_MID=1500;
var DEFAULT_TIMEOUT_MIN=500;

/********* ELEMENTS ********/
var ELEMENT = {

    ///Login Ekranı
        USERNAME_TXT         : "app.com.sandjs.bankaccountfakewallet:id/username_txt", 
        PASSWORD_TXT         : "app.com.sandjs.bankaccountfakewallet:id/password_txt",
        LOGIN_BTN            : "app.com.sandjs.bankaccountfakewallet:id/login_btn",
    //////Accaount Ekranı ///////

    
    
}


exports.setDriverMethods = (driver) => {
    
    wd.addPromiseChainMethod('login', (user,pass) => {
    return driver
    .sleep(3000)
        .waitForElementById(ELEMENT.USERNAME_TXT, DEFAULT_TIMEOUT)
        .sendKeys(user)
        .sleep(DEFAULT_TIMEOUT_MIN)
        .waitForElementById(ELEMENT.PASSWORD_TXT, DEFAULT_TIMEOUT)
        .sendKeys(pass)
        .sleep(DEFAULT_TIMEOUT_MIN)
        .waitForElementById(ELEMENT.LOGIN_BTN, DEFAULT_TIMEOUT)
        .click()
        .sleep(DEFAULT_TIMEOUT_MID);
    })
    wd.addPromiseChainMethod('example_axios', () => {
        axios.defaults.baseURL = 'https://reqres.in/';
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.timeout = 25000;
        //----------SET DATA----------
        var loginUsername = "morpheus";
        var loginPassword = "leader";

        return new Promise((resolve, reject) => {
                //----------SET REQUEST HEADERS----------
                var config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                driver.log("API Request Headers: " + JSON.stringify(config));  
                //----------API CALL-1 - LOGIN ----------
                return axios.get("/api/users/2", config)
                    .then((response) => {
                        driver.log("API SUCCESS response: " + Object.values(response).flat().join());      
                        resolve(response);

                        
                                        //----------SET REQUEST BODY----------
                                        var requestBody = {
                                            'name': loginUsername,
                                            'job': loginPassword
                                            }
                                        driver.log("API Request Body: " + JSON.stringify(requestBody));  
                                        //----------SET REQUEST HEADERS----------
                                        config = {
                                            headers: {
                                                'Content-Type': 'application/json'
                                            }
                                        }
                                        driver.log("API Request Headers: " + JSON.stringify(config));  
                                        //----------API CALL-2 - testPlanUrlPath ----------

                                        return axios.post("/api/users", config,requestBody)
                                        .then((response) => {
                                            driver.log("API SUCCESS response: " + Object.values(response));      
                                            resolve(response);
                                            driver.log(response);

                    })
                    .catch((error) => {  
                        driver.log("API ERROR response: " + error);   
                        resolve(null);
                    });
                })
        })
    })

}