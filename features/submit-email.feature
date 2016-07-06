Feature: submit my email
  
  @watch
  Scenario: 
    Given I am on the "/offset" page 
    When I enter my email: "johnny5@alive.com"
      And I click "Find out more"
    Then I see a notification telling me: "Thanks! You will be contacted shortly"
