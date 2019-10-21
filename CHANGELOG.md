## Versions

<a name="latest"></a>

### BETA 0.8.1:
Changes:
+ Typer will now use "and" when a pink diamond and two critters are found, before it just used a comma despite the list only being two items.
	+ Changed default value for the "PD box" to ". Also got a pink diamond"
+ Typer will now use "an" instead of "a" when creatures start with a vowel sound.

### BETA 0.8.0:
Changes:
+ Changed the visit window and percent chance algorithm, they will now be far more accurate.
	+ A community member pointed out an important detail that I was mistaken on: The max time between visits starts with the arrival of the last creature, not it's departure. This is despite the fact that nothing can come while the last creature is present.
	+ The algorithm will now subtract the stay time of the last creature from the max time between visits on the window fraction so that users can get an accurate reading of the true maximum time before something arrives
	+ In events where the stay time is 100% known (superfood and if the last creature wasn't spotted), the percentage given will be very accurate. The only other variables will be alerts and the type of creatures the garden can attract/the rarity. 
	+ The algorithm will now assume the minimum stay times in cases where it has to estimate how long a creature would have stayed, it will still lowball it but this will be much more negligable than it was prior. 
	 
Bug Fixes:
+ Fixed a couple of incorrect maximum stay times on wildlife.
+ Changed the maximum time between a visit for fresh superfood to 1 hour 40 minutes, this is the highest that I have seen but I am starting to think that it could be 1 hour 45 minutes. If anyone has seen a time higher than this for a first feed please let me know.

### BETA 0.7.1:
Bug Fixes:
+ Fixed an issue with spotting wildlife after refreshing a garden with the in-page buttons, the issue would cause a crash and would not let the typer function correctly.
+ The percentages over plates will no longer be hidden behind pumpkins.
+ Fixed an issue which could cause refreshing the page too quickly with the in-page buttons to display multiple percentages.

### BETA 0.7.0:
Changes:

+ Open All button overhaul:
  + The button will now check if a garden has already been opened during a "session" (until you refresh or leave the page) and will ignore gardens which have already been opened. This means that even when you click "next", it will still remember to ignore what you've already opened.
  + Added interface on wildlife pages to track how many unique gardens have been opened this session.
  + Added a spot to place your FLID on the settings tab, this will let the open-all button know who you are so that it can skip your garden.
  + All of these changes are both for the open-all buttons on the wildlife pages and the garden pages. 

+ Autotyper changes:
  + Added the ability to lowercase creature names on the wildlife autotyper. 
  + Added abbreviations for summer creatures for (crittercondensed)

### BETA 0.6.0:
Features:
+ Added "Open All" and "Next" button options which will place them on the garden pages
+ Added the ability to resize the "Post" button and the above buttons, this should be especially useful on mobile.
+ Threshold tab overhaul!
	+ Added the ability to set colors on the visit window fraction, these colors/percentages can be set on the "Thresholds" tab. This changes the color of the text below the percentage based upon the current time the window has been opened / max time before feed fraction displayed. Example: 2 hours / 3 hours = 66%. 
	+ Added the ability to select if you want the border color to change to either the Glow color or the Inner color for a given threshold.
	+ Added sample text which changes to match the colors for the given threshold.
	
Changes:
+ Changed font for Firefox to the Chrome default, it was causing my formatting to be slightly off on the Firefox edition. 
+ Added some text to the Misc tab to better explain how the blocked garden "snooper" works.
+ Added "useful links" to the Misc tab, linking to the fairyland spoiler and wildlife calculator.

Bug Fixes:
+ Fixed an issue where the percent chance and visit window would appear behind the food of custom tables (the ones you get after you complete the quest levels). This will now check for them and handle them correctly. 

### BETA 0.5.0:
Features:
+ Added the "Misc" tab, which now has a feature for viewing who you have blocked and who has blocked you.
+ Typer tab overhaul!
	+ Added an optional Pink Diamond text box on the typer tab which can be called with (pd) in the event a spot earns a pink diamond.
	+ Added an optional (crittercondensed) flag which will act similar to (critter), but minimize/remove grammar and try to abbreviate the wildlife.
	+ Added a "sample box" at the bottom of the Typer tab which you can use to test what message will be typed for certain conditions of wildlife you spot. 

Changes:
+ Moved Alchemy settings to the "Games" tab.
+ Moved the logo to the "About" tab.
+ Moved the debug settings to the "Misc" tab.
+ Added some Horizontal Rules to the tabs.

Bug Fixes:
+ Fixed an issue where the "open all" garden buttons would open gardens which you should not see (blocked gardens).

### BETA 0.4.0:
Changes: 
+ Changed the second Typer box (for when a critter is spotted) to append quantities. This means that you no longer need to have "a" before "(critter)" as the function will handle this for you. "Spotted (critter), thanks!" will now look like: "Spotted a Field Mouse, thanks!", or "Spotted a White Mouse and 2 Field Mice, thanks!". This will also add an "s" to make it plural when needed, or change to the plural word (such as "mice"). 
+ Rewrote the function which checks for the food type (regular, organic, superfood). It should now be more efficient. 

Bug Fixes:
+ Fixed check for cold porridge food type, before it was throwing errors due to using a special type of spaces between the words. 
+ Fixed a bug caused by the implementation of the previous patch, it caused certain food times to display incorrectly in your own garden due to a typo.

### BETA 0.3.5:
Changes:
+ Rewrote the refresh handler for re-loading the extension when needed (normally post watering). In a nutshell this will make the script load faster and fix some issues where latency would cause it to never load. Before it was done by a static timeout which was a bad idea. 

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
