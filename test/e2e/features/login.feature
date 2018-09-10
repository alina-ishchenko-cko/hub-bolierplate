
Feature: Login

  Scenario: As a Merchant Admin user, I should be able to login with my credentials
    Given I'm visiting login page
    When I login as merchant admin
    Then I should be redirected to dashboard

  Scenario: As a Merchant Admin user, I should get error message if i submit incorrect valid username
    Given I'm visiting login page
    When I type circleci_merchan@checkout.com in email field
    And I type "wrongpassword" in password field
    And I'm submitting the form
    Then I should see error message Invalid user email or password

  Scenario: As a user, I should get error message if i submit incorrect valid password
    Given I'm visiting login page
    When I type qa_email+write@checkout.com in email field
    And I type "wrongpassword" in password field
    And I'm submitting the form
    Then I should see error messages containing 2 more attempts remaining
    Then I should see error messages containing Last successful login:

Scenario: As a Merchant Admin user, I should be able to logout from my account
    Given I'm visiting login page
    When I login as merchant merchant admin
    Then I should be redirected to dashboard
    When I press logout
    Then My session should be terminated
