## Versions

### BETA 0.3.5:
Changes:
+ Rewrote the refresh handler for pages loading. In a nutshell this will make the script load faster and fix some issues where latency would cause it to never load. Before it was done by a static timeout which was a bad idea. 

Bug Fixes:
+ Fixed a bug where certain plates of food had a random space prefixed in certain gardens causing errors.

### BETA 0.3.4:
Changes:
+ Displaying the percent chance in the top right no longer removes notifications from wall/backwall messages. Now it only hides the name to make room, but the message icon will still display. 
+ Added some "did you know" tips to the "Games" tab.

Bug Fixes:
+ Fixed a bug where Magical Mushroom games would continue to automatically complete despite the box being unchecked. 

### BETA 0.3.3:
Features:
+ Added a logo for the addon.
+ Added a notification over the app icon itself for when an update is detected, it persists until it is clicked. 

Bug Fixes:
+ Fixed a typo for "Phoenish" wildlife which was causing them to throw an error when the app tried to detect their maximum visit time.
+ Fixed a bug causing certain wildlife with "&" in their name to accidentially detect as multiple wildlife, and then bug out on the auto typer (xundefined).

### BETA 0.3.2:
Features:
+ Added a new setting to automatically complete games of Magical Mushrooms.
+ Added a notification popup that happens whenever the app is updated, informing people that it has been updated. 

Changes:
+ Changed some of the "About" page.
+ Added a "Games" tab and moved snail racing settings and magical mushrooms settings there.

Bug Fixes:
+ Fixed a bug causing "Hot Porridge" foods to throw an error, this is because it uses different character encoding for some reason. 
+ Fixed a bug causing certain wildlife with the "&" symbol to display as "&amp;" on the auto writer function. 

### BETA 0.3.1:
Features:
+ Added Firefox and Firefox Android support.

Bug Fixes:
+ Fixed issue where logging into the game would cause the main page extension to not load until navigating to a new page. 

### BETA 0.3.0:
Features:
+ Added alchemy page settings and buttons, this will automatically fill in the alchemy page and place buttons on the top of the page for ease of access.

Changes:
+ If multiple wildlife are spotted, the autotyper will now append "x2" (or however many) rather than repeating itself. 
+ Wilting gardens will no longer be hidden, regardless of having food or not.

### BETA 0.2.3:
Changes:
+ "Hide gardens with no food" will now also hide frozen gardens.

Bug fixes:
+ Fixed a bug involving the homepage throwing null values which caused errors. 

### BETA 0.2.2:
Bug fixes:
+ App now loads UI upon clicking the in-built "refresh garden" button, and the refresh button on the title.

### BETA 0.2.1:
Bug fixes

### BETA 0.2.0:
Initial beta release, expect frequent changes/some gliches. 
