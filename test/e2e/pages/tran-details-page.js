var tranData = require('./postman/'+ENV+'.automation.postman_environment.json');
var Page = require('./page')
var TransactionsDetailsPage = Object.create(Page, {

summary: { get: function () { return browser.element('a[ng-href="/transactions/summary"]'); } },


        open: { value: function() {
        Page.open.call(this, 'transactions');
    } }
});
module.exports = TransactionsDetailsPage