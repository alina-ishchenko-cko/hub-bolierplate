@ignore
Feature: Customers Screen


Scenario: As a Merchant Admin user, I should be able to access Customers Screen
  Given I'm visiting login page
  When I login as merchant admin
  Then I should be redirected to dashboard
  And I should be able to access Customers page

Scenario: As a Merchant Read Only user, I should be able to access Customers Screen
  Given I'm visiting login page
  When I login as merchant user
  Then I should be redirected to dashboard
  And I should be able to access Customers page