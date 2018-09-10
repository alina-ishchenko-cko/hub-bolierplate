var DashboardPage = require('../pages/dashboard-page');
var data = require('../util/user.json');

module.exports = function() {
  this.Then(
    /^I should see title Revenue, Net Revenue, Approved Sales, Customers$/,
    function() {
      browser.pause(5000);
      for (var i = 0; i < DashboardPage.kpiTitle.value.length; i++) {
        if (i == 0) {
          expect(DashboardPage.kpiTitle.value[i].getText()).toBe('Revenue');
        } else if (i == 1) {
          expect(DashboardPage.kpiTitle.value[i].getText()).toBe('Net Revenue');
        } else if (i == 2) {
          expect(DashboardPage.kpiTitle.value[i].getText()).toBe(
            'Approved Sales'
          );
        } else {
          expect(DashboardPage.kpiTitle.value[i].getText()).toBe('Customers');
        }
      }
    }
  );

  this.Then(
    /^I should also see subheading for Revenue, Net Revenue and Approved Sales$/,
    function() {
      for (var i = 0; i < DashboardPage.kpiSubheading.value.length; i++) {
        if (i == 0) {
          expect(DashboardPage.kpiSubheading.value[i].getText()).toBe(
            'Sum of Captured Transactions'
          );
        } else if (i == 1) {
          expect(DashboardPage.kpiSubheading.value[i].getText()).toBe(
            'Revenue minus refunds and chargebacks'
          );
        } else if (i == 2) {
          expect(DashboardPage.kpiSubheading.value[i].getText()).toBe(
            'Count of Captured Transactions'
          );
        }
      }
    }
  );
  this.Then(
    /^I should see the currency of the Revenue and Net Revenue to be GBP$/,
    function() {
      for (var i = 0; i < DashboardPage.currency.value.length; i++) {
        if (i == 0) {
          expect(DashboardPage.currency.value[i].getText()).toBe('GBP');
        } else {
          expect(DashboardPage.currency.value[i].getText()).toBe('GBP');
        }
      }
    }
  );

  this.Then(/^I should see (.*) tab enabled$/, function(arg1) {
    if (arg1 == 'Payment methods') {
      expect(DashboardPage.activeTab.getText()).toBe('Payment methods');
    } else {
      expect(DashboardPage.activeTab.getText()).toBe('Currencies');
    }
  });

  this.Then(
    /^I should see columns (.*), Revenue, Net Revenue, Approves Sales, Customers$/,
    function(arg1) {
      browser.pause(5000);
      expect(DashboardPage.columnNameOne.getText()).toBe(arg1);
      expect(DashboardPage.RevenueColumnName.getText()).toBe('Revenue');
      expect(DashboardPage.NetRevenueColumnName.getText()).toBe('Net Revenue');
      expect(DashboardPage.ApprovedSalesColumnName.getText()).toBe(
        'Approved Sales'
      );
      expect(DashboardPage.CustomersColumnName.getText()).toBe('Customers');
    }
  );

  this.Then(/^I click Currencies tab$/, function() {
    expect(DashboardPage.currenciesTab.getText()).toBe('Currencies');
    DashboardPage.currenciesTab.click();
  });
};
