Feature: smoke test
  
  @watch
  Scenario: Success
    Given I have visited the home page
    When I click on begin
    Then the page changes to mortgage 
