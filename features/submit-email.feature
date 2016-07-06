Feature: submit my email

  Scenario: 
    Given I am on the "/offset" page 
    When I enter my email
      And click "Find out more"
    Then I see a notification telling me I will be contacted shortly
