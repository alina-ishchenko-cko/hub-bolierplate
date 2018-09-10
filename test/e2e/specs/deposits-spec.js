/*
summary: { get: function () { return browser.element('a[ng-href="/transactions/summary"]'); } },
keyIndicators: { get: function () { return browser.element('.ng-scope>h3'); } },
indicatorsArray: { get: function () { return browser.elements('.key-indicators-title'); } },
searchBox: { get: function () { return browser.element('input[ng-model="searchCriterion"]'); } },
filterButton: { get: function () { return browser.element('i[class="cko cko-filter"]'); } },
actionDropDown: { get: function () { return browser.element('div[ng-change="onActionChange()"]'); } },
createPayment: { get: function () { return browser.element('.cko-btn.blue.ng-scope')); } },

*/
var DepositsPage = require('../pages/deposits-page');
var data = require('../util/user.json');

module.exports = function() {

    this.Then(/^I should be able to access Deposits page$/, function () {
        DepositsPage.open();
        for (var i = 0; i < DepositsPage.depositsTableArray.length; i ++){
          if(i == 0) {
            expect(indicatorsArray[i].getText()).toBe("Date");
          } else if (i==1){
            expect(indicatorsArray[i].getText()).toBe("ID");
          } else if (i==2){
            expect(indicatorsArray[i].getText()).toBe("Period");
          } else if(i==3){
            expect(indicatorsArray[i].getText()).toBe("Name");
          } else if(i==4){
            expect(indicatorsArray[i].getText()).toBe("Status");
          }

        }
      });

}
