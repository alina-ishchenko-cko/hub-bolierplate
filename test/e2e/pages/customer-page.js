var Page = require('./page')
var CustomersPage = Object.create(Page, {

    /**
     * define elements
     */
    indicatorsArray: { get: function () { return browser.elements('.ant-card-head-title'); } },
    customerTableArray: { get: function () { return browser.elements('.title'); } },




    /**
     * define or overwrite page methods
     */

    open: { value: function() {
        Page.open.call(this, 'customers');
    } }
});
module.exports = CustomersPage
