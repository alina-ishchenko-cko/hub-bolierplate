
Feature: Dashboard

  Scenario: As a Merchant Admin user, I should see the Dashboard main indicators
    Given I'm visiting login page
    When I login as merchant admin
    Then I should be redirected to dashboard
    Then I should see title Revenue, Net Revenue, Approved Sales, Customers
    Then I should also see subheading for Revenue, Net Revenue and Approved Sales
    And I should see the currency of the Revenue and Net Revenue to be GBP

  Scenario: As a Merchant user, I should see the Dashboard main indicators
    Given I'm visiting login page
    When I login as merchant user
    Then I should be redirected to dashboard
    Then I should see title Revenue, Net Revenue, Approved Sales, Customers
    Then I should also see subheading for Revenue, Net Revenue and Approved Sales
    And I should see the currency of the Revenue and Net Revenue to be GBP    

  Scenario: As a Merchant Admin user, I should see the Detailed Indicators section
    Given I'm visiting login page
    When I login as merchant admin
    Then I should be redirected to dashboard
    Then I should see Payment methods tab enabled
    Then I should see columns Payment method, Revenue, Net Revenue, Approves Sales, Customers
    Then I click Currencies tab
    Then I should see Currencies tab enabled
    Then I should see columns Currency, Revenue, Net Revenue, Approves Sales, Customers    

  Scenario: As a Merchant user, I should see the Detailed Indicators section
    Given I'm visiting login page
    When I login as merchant user
    Then I should be redirected to dashboard
    Then I should see Payment methods tab enabled
    Then I should see columns Payment method, Revenue, Net Revenue, Approves Sales, Customers
    Then I click Currencies tab
    Then I should see Currencies tab enabled
    Then I should see columns Currency, Revenue, Net Revenue, Approves Sales, Customers