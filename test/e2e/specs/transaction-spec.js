/*
summary: { get: function () { return browser.element('a[ng-href="/transactions/summary"]'); } },
keyIndicators: { get: function () { return browser.element('.ng-scope>h3'); } },
indicatorsArray: { get: function () { return browser.elements('.key-indicators-title'); } },
searchBox: { get: function () { return browser.element('input[ng-model="searchCriterion"]'); } },
filterButton: { get: function () { return browser.element('i[class="cko cko-filter"]'); } },
actionDropDown: { get: function () { return browser.element('div[ng-change="onActionChange()"]'); } },
createPayment: { get: function () { return browser.element('.cko-btn.blue.ng-scope')); } },

*/
var TransactionsPage = require('../pages/transaction-page');
var data = require('../util/user.json');

module.exports = function() {

    this.Then(/^I should be able to access Transactions page$/, function () {
        TransactionsPage.open();
        for (var i = 0; i < TransactionsPage.indicatorsArray.length; i ++){
          if(i == 0) {
            expect(indicatorsArray[i].getText()).toBe("Revenue");
          } else if (i==1){
            expect(indicatorsArray[i].getText()).toBe("Approved Sales");
          } else if (i==2){
            expect(indicatorsArray[i].getText()).toBe("Refunds");
          } else {
            expect(indicatorsArray[i].getText()).toBe("Chargebacks");
          }

        }
        browser.pause(1000);
        for (var i = 0; i < TransactionsPage.transactionTableArray.length; i ++){
          if(i == 0) {
            expect(indicatorsArray[i].getText()).toBe("Timestamp");
          } else if (i==1){
            expect(indicatorsArray[i].getText()).toBe("Charge ID");
          } else if (i==2) {
            expect(indicatorsArray[i].getText()).toBe("Status");
          } else if(i==3) {
            expect(indicatorsArray[i].getText()).toBe("Card Holder");
          } else if(i==4) {
            expect(indicatorsArray[i].getText()).toBe("Customer Email");
          } else if(i==5) {
            expect(indicatorsArray[i].getText()).toBe("Track ID");
          } else if(i==6) {
            expect(indicatorsArray[i].getText()).toBe("Response code");
          } else if(i==7) {
            expect(indicatorsArray[i].getText()).toBe("Product");
          } else if(i==8) {
            expect(indicatorsArray[i].getText()).toBe("Value");
          } else {
            expect(indicatorsArray[i].getText()).toBe("Payment Method");
          }

        }
      });

      this.Then(/^I should ([^"]*) Create Payment button$/, function (arg1) {
          if(arg1 === 'see disabled') {
            expect(TransactionsPage.createPayment.isEnabled()).toBe(false);
          } else if (arg1 === 'see enabled') {
            expect(TransactionsPage.createPayment.isEnabled()).toBe(true);
          } else if (arg1 === 'not see') {
            expect(TransactionsPage.createPaymentArray.state).toBe('success');
          } else {
            console.log("Invalid use of step");
          }
      });


}
