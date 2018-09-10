var LoginPage = require('../pages/login-page');
var data = require('../util/user.json');

module.exports = function() {

    this.Given(/^I'm visiting login page$/, function () {
        LoginPage.open();
    });

    this.Given(/^I login as (.*)$/, function (arg1) {
        if (arg1==='merchant admin') {
                LoginPage.username.setValue(data.merchantUsername);
        } else if (arg1==='merchant user') {
                LoginPage.username.setValue(data.merchantReadOnly);
        }else if (arg1==='Merchant Admin') {
                LoginPage.username.setValue(data.MerchantUsername);
        }
        else {
                LoginPage.username.setValue(data.adminUsername);
        }
        LoginPage.password.setValue(data.password);
        LoginPage.submit.click();
    });

    this.When(/^I type (.*) in email field$/, function (arg1) {
        LoginPage.username.setValue(arg1);
    });

    this.When(/^I type "([^"]*)" in password field$/, function (arg1) {
        LoginPage.password.setValue(arg1);
    });
    this.When(/^I'm submitting the form$/, function () {
         LoginPage.submitButton.click();
    });

    this.Then(/^I should be redirected to (.*)$/, function (arg1) {
        browser.waitUntil(function () {
            return browser.getUrl().includes(arg1)
        }, 20000, 'expected ' + arg1 + ' to appear in ' + browser.getUrl(), 500);
    });

    this.Then(/^I should see error message (.*)$/, function (arg1) {
        browser.pause(2000);
        expect(LoginPage.error.getText()).toMatch(arg1);
    });

    this.Then(/^I should see error messages containing (.*)$/, function (arg1) {
        browser.pause(2000);       
        expect(LoginPage.error.getText()).toContain(arg1);
    });

    this.When(/^I press logout$/, function () {
       // browser.pause(60000);
        LoginPage.signout.click();
        //browser.pause(60000);
    });

    this.Then(/^My session should be terminated$/, function () {
        expect(browser.sessionStorageSize()).toBeNull;
    });

    this.When(/^I press forgot password link$/, function () {
        LoginPage.forgotPassword.click();
    });

    this.Then(/^I should be navigated to the reset password screen$/, function () {
        expect(LoginPage.resetPasswordText.getText()).toBe('Locked yourself out?');
    });

}
