@ignore
Feature: Transaction Details Screen

 Scenario: As a Merchant Admin user, I should be able to see the transaction details screen
  Given I'm visiting login page
  When I login as merchant admin
  Then I should be redirected to dashboard
  And I should be able to access transaction details screen

 Scenario: As a Merchant Admin user, I should be able to see the transaction details screen
 Given I'm visiting login page
  When I login as merchant user
  Then I should be redirected to dashboard
  And I should be able to access transaction details screen