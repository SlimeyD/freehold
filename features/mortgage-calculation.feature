Feature: enter my mortgage details
  As a user, 
  I want to figure out how much a loan of $500,000 will cost me on a monthly basis.
  So that I can evaluate whether I can afford to buy a house in that price bracket

  @dev
  Scenario: 
    Given I am on the "/mortgage" page
    And the "term" defaults to: "25" (years)
    When I enter the "Loan amount": "500" (thousand dollars)
    And I enter the "Interest rate": "5" (percent)
    Then I see the phrase: "Repayment amount: $1,334"
    And I see the the phrase: "Over 25 years you will have paid the $500k principal and $?k total interest."
