var Page = require('./page')
var DepositsPage = Object.create(Page, {

    /**
     * define elements
     */

    depositsTableArray: { get: function () { return browser.elements('.title'); } },




    /**
     * define or overwrite page methods
     */

    open: { value: function() {
        Page.open.call(this, 'deposits');
    } }
});
module.exports = DepositsPage
