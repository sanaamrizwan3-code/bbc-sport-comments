@manual
Feature: Manual validation for BBC Sport comments

  @manual
  Scenario: Verify logged-in user can see existing comments
    Given the user opens a BBC Sport article with comments enabled
    And the user signs in with a valid BBC account
    When the user scrolls to the comments section
    Then existing comments should be visible to the signed-in user

  @manual
  Scenario: Verify comment count is displayed
    Given the user opens a BBC Sport article with comments enabled
    When the user scrolls to the comments section
    Then the total number of comments should be displayed

  @manual
  Scenario: Verify sorting dropdown defaults to "Highest Rated"
    Given the user opens a BBC Sport article with comments enabled
    When the user scrolls to the comments section
    Then the comment sorting control should default to "Highest Rated"

  @manual
  Scenario: Verify article without comments icon does not contain comment area
    Given the user opens a BBC Sport article without comments enabled
    Then the page should not contain a comment area

  @manual
  Scenario: Verify expired session redirects user to sign in
    Given the user has an expired BBC account session
    When the user attempts to interact with the comments section
    Then the user should be redirected to the BBC sign-in page
