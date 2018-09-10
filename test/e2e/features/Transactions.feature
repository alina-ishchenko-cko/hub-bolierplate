@ignore
Feature: Transactions Screen


Scenario: As a Merchant Admin user, I should be able to access Transactions Screen
  Given I'm visiting login page
  When I login as merchant admin
  Then I should be redirected to dashboard
  And I should be able to access Transactions page
  And I should see disabled Create Payment button

Scenario: As a Merchant Read Only user, I should be able to access Transactions Screen
  Given I'm visiting login page
  When I login as merchant user
  Then I should be redirected to dashboard
  And I should be able to access Transactions page
  And I should not see Create Payment button
