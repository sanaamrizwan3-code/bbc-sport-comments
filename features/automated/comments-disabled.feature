Feature: BBC Sport article without comments

  Scenario: Article without comments enabled does not display comments section
    Given the user opens a BBC Sport article without comments enabled
    Then the comments section should not be visible
