Feature: View comments on BBC Sport article

  Scenario: Article with comments enabled displays the comments section
    Given the user opens a BBC Sport article with comments enabled
    When the user scrolls to the comments section
    Then the comments section should be visible
    And the page should display the text "Join the conversation"
