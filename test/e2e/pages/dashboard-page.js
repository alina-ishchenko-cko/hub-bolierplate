var Page = require('./page')
var DashboardPage = Object.create(Page, {

    /**
     * define elements
     */
    //browser.execute("document.querySelectorAll('p.css-9nrcau')[0].innerText");
    kpiTitle:  { get: function () { return browser.elements('p.css-9nrcau');  } },
    kpiSubheading:  { get: function () { return browser.elements('p[class="sub-title css-8hgn4u"]');  } },
    currency:{get:function(){return browser.elements('span[class="currency css-401vsu"]'); } },
    DetailedIndicatorSubHeading: { get: function () { return browser.element('.title'); } },
    columnNameOne: { get: function () { return browser.element('thead > tr > th:nth-child(1) > span'); } },
    RevenueColumnName: { get: function () { return browser.element('thead > tr > th:nth-child(2) > span'); } },
    NetRevenueColumnName: { get: function () { return browser.element('thead > tr > th:nth-child(3) > span'); } },
    ApprovedSalesColumnName: { get: function () { return browser.element('thead > tr > th:nth-child(4) > span'); } },
    CustomersColumnName: { get: function () { return browser.element('thead > tr > th:nth-child(5) > span'); } },
    paymentMethodsTab: { get: function () { return browser.element('a[id="payment-methods"]'); } },
    currenciesTab: { get: function () { return browser.element('a[id="currencies"]'); } },
    activeTab:{get:function(){return browser.element('a[class="tableTab active"]');}}
    });
module.exports = DashboardPage