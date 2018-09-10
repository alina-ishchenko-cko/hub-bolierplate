var Page = require('./page')
var LoginPage = Object.create(Page, {

    /**
     * define elements
     */

    username: { get: function () { return browser.element('input[type="email"]'); } },
    password: { get: function () { return browser.element('input[type="password"]'); } },
    submit: { get: function () { return browser.element('button[value="Sign In"]'); } },


    error:     { get: function () { return browser.element('.ant-alert-description'); } },
    userMenu:    { get: function () { return browser.element('.ng-binding.ng-scope'); } },
    signout:    { get: function () { return browser.element('#logout-link'); } },
    forgotPassword:    { get: function () { return browser.element('.forgot-password-link.ng-scope'); } },
    resetPasswordText:    { get: function () { return browser.element('.login-title.password-forgotten-title.ng-scope'); } },
    submitButton:    { get: function () { return browser.element('button[id="login-btn"]'); } },
    /**
     * define or overwrite page methods
     */

    open: { value: function() {
        Page.open.call(this, 'login');
    } },
    moveToLogin: { value: function() {
        Page.moveToElement.call(this, '.ng-binding.ng-scope');
    } },
        waitForErrorText: { value: function() {
        browser.waitForText('.login-error-message',2000);
    } }
});
module.exports = LoginPage
