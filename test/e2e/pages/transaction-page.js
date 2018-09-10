var Page = require('./page')
var TransactionsPage = Object.create(Page, {

    /**
     * define elements
     */

    summary: { get: function () { return browser.element('a[ng-href="/transactions/summary"]'); } },
    keyIndicators: { get: function () { return browser.element('.ng-scope>h3'); } },
    indicatorsArray: { get: function () { return browser.elements('.ant-card-head-title'); } },
    searchBox: { get: function () { return browser.element('input[ng-model="searchCriterion"]'); } },
    filterButton: { get: function () { return browser.element('i[class="cko cko-filter"]'); } },
    actionDropDown: { get: function () { return browser.element('div[ng-change="onActionChange()"]'); } },
    createPayment: { get: function () { return browser.element('.ant-btn.ant-btn-primary'); } },
    createPaymentArray: { get: function () { return browser.elements('.ant-btn.ant-btn-primary'); } },
    transactionTableArray: { get: function () { return browser.elements('.title'); } },




    /**
     * define or overwrite page methods
     */

    open: { value: function() {
        Page.open.call(this, 'transactions');
    } }
});
module.exports = TransactionsPage
