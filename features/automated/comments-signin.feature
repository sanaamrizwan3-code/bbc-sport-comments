Feature: Sign in options inside comments section

  Scenario: Unauthenticated user sees Sign In and Register options
    Given the user opens a BBC Sport article with comments enabled
    When the user scrolls to the comments section
    Then the comments section should contain a "Sign in" button
    And the comments section should contain a "Register" button
