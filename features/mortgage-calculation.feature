Feature: Enter my mortgage details
  As a user, 
  I want to figure out how much a loan of $500,000 will cost me on a monthly basis.
  So that I can evaluate whether I can afford to buy a house in that price bracket

  @dev
  Scenario: 
    Given I am on the "/mortgage" page
    And the "term" defaults to: "25" (years)
    When I enter the "Loan amount": "500" (thousand dollars)
    And I enter the "Deposit amount": "100" (thousand dollars)
    And I enter the "Interest rate": "5" (percent)
    Then the "Repayment amount" field populates: $1,334"
    And I see the the phrase: "Over 25 years you will have paid the $400k principal and $301,113 total interest."

Scenario: 2
   Given I am on the "/mortgage" page
   And the "term" defaults to: "25" (years)
   When I enter the "House Price": "650" (thousand dollars)
   And I enter the "Deposit": "150" (thousand dollars)
   And I enter the "Interest rate": "5" (percent)
   Then the "Repayment amount" field populates: "$1,345"
   And I see the the phrase: "Over 25 years you will have paid the $500k principal and $376,391 total interest."
   
   
