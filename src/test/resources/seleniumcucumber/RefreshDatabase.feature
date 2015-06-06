Feature: Refreshing the database with the intended case.

@uno
Scenario: Refresh Database Case no. 1
Given User navigates on refresh-job database case 1 on jenkins
When User logs in and select build parameter Case 1
Then User logs out Case 1 and close the browser.
@dos
Scenario: Refresh Database Case no. 2
Given User navigates on refresh-job database case 2 on jenkins
When User logs in and select build parameter Case 2
Then User logs out Case 2 and close the browser.

