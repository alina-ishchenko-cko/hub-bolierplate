/*
summary: { get: function () { return browser.element('a[ng-href="/transactions/summary"]'); } },
keyIndicators: { get: function () { return browser.element('.ng-scope>h3'); } },
indicatorsArray: { get: function () { return browser.elements('.key-indicators-title'); } },
searchBox: { get: function () { return browser.element('input[ng-model="searchCriterion"]'); } },
filterButton: { get: function () { return browser.element('i[class="cko cko-filter"]'); } },
actionDropDown: { get: function () { return browser.element('div[ng-change="onActionChange()"]'); } },
createPayment: { get: function () { return browser.element('.cko-btn.blue.ng-scope')); } },

*/
var CustomersPage = require('../pages/customer-page');
var data = require('../util/user.json');

module.exports = function() {

    this.Then(/^I should be able to access Customers page$/, function () {
        CustomersPage.open();
        for (var i = 0; i < CustomersPage.indicatorsArray.length; i ++){
          if(i == 0) {
            expect(indicatorsArray[i].getText()).toBe("Customers");
          } else if (i==1){
            expect(indicatorsArray[i].getText()).toBe("Returning Customers");
          } else if (i==2){
            expect(indicatorsArray[i].getText()).toBe("Average Spend");
          } else {
            expect(indicatorsArray[i].getText()).toBe("Unique Visitors");
          }

        }
        browser.pause(1000);
        for (var i = 0; i < CustomersPage.customerTableArray.length; i ++){
          if(i == 0) {
            expect(indicatorsArray[i].getText()).toBe("Customer ID");
          } else if (i==1){
            expect(indicatorsArray[i].getText()).toBe("Customer Email");
          } else if (i==2) {
            expect(indicatorsArray[i].getText()).toBe("Order History");
          } else if(i==3) {
            expect(indicatorsArray[i].getText()).toBe("LTV");
          } else if(i==4) {
            expect(indicatorsArray[i].getText()).toBe("Last Purchase");
          } else if(i==5) {
            expect(indicatorsArray[i].getText()).toBe("Last Order Value");
          } else if(i==6) {
            expect(indicatorsArray[i].getText()).toBe("Usual Payment Method");
          }

        }
      });

}
