## Versions

<a name="latest"></a>
### BETA 0.12.1:
Changes:
+ Reworded the "hide gardens with no food" button to include frozen gardens. It always did this but now it says it.

Bug Fix:
+ Fixed a bug where frozen gardens were no longer being hidden when the "hide gardens with no food" button was checked. 

### BETA 0.12.1:
Features:
+ Added a new button toggle in the settings to reorder the search gardens box on the home page. This will move it to the top of the page if enabled.

Changes:
+ The "hide gardens on the homepage with no food" will now also hide wilting gardens with no food.
+ + Before this did not hide wilting gardens due ot the valuable snails, but as they are now removed I feel it is no longer needed.
+ Changed the dark theme for the new homepage, it should look much better.

Bug Fix:
+ Fixed the homepage open all buttons which were broken with the recent homepage update.

### BETA 0.12.0:
Features:
+ Updated timings for the latest food changes
+ + A script was made and we collected and analyzed 50k records of recent wildlife visits with the new food.
+ + To see our findings and the data, the link is here: https://docs.google.com/spreadsheets/d/1LBwHMC0UqZjxoIxJWJ9WNE5emCklzAeqvfpAuDNibIE/
+ Added the ability to buy custom amounts of dusts at the store.

Changes:
+ Added "dead time" to the food timing equation, in a nutshell this considerably increases the accuracy of it all in general and you will see more plates with a negative number indicating that nothing can currently be present.
+ Minor formatting changes in some menus.
+ Removed the dark mode transparent gold image for prizes, it was causing images to stack vertically rather than horizontally and sadly with how fairyland was made I'm not sure of how to do it otherwise and so it'll just break the dark theme when you occasionally see it as white boxes, but you wont have gold going off the page.
Bug Fix:
+ Fixed a dark mode bug which made some text for the sprinkle timer dissapear due to sizing.

### BETA 0.11.4:
Changes:
+ The Open all button on wildlife pages will no longer ignore gardens which have blocked you as you can now water in them. This could be added as a toggle-able option if requested.

Bug Fix:
+ Fixed a crash caused by the latest update involving blocking people. Anytime you would visit a garden which had blocked you fairy ring would not function. 

### BETA 0.11.3:
Bug Fix:
+ Fixed a bug which was occasionally causing (ownername) to not insert the owner's name. This was because the name was loading before fairy ring's code could run sometimes when the open-all buttons were used and it'd have to load a bunch of gardens at once. Added a check for this. 

### BETA 0.11.2:
Bug Fix:
+ Fixed a bug which was preventing the blocklist from updating when the "persistent opened gardens" option was not checked. 

### BETA 0.11.1:
Bug Fix:
+ Fixed a bug where (ownername) wasn't working in the typer tab box for when a critter is spotted.

### BETA 0.11.0:
Features: 
+ Added "persistent opened garden sessions" setting
  + When off: The open all buttons on wildlife pages functions as it did before (if you refresh or go to a different one it resets.
  + When on: The open all button will now keep track of which gardens you have opened across all wildlife pages and after resets or even closing your browser, it can only be manually reset by clicking the button.
    + This means that you can hunt multiple wildlife types without opening the same gardens. Note, this does not impact the open all buttons on garden pages themselves, only wildlife.

+ Added (ownername) as an option that you can use in the typer tab, this will insert the garden owner's name into your message so you can thank them! 
  + You may notice that it takes a second to fill it in rather than everything else being instant, this was the initial problem because the page takes longer to load the garden owner name because it has to fetch it from facebook each time. I found a way to have it simply insert it once the page gets it without having to stop everything to wait for it.

Changes:
+ Added a toggle checkbox in settings to turn off the "and has a percent chance of..." message in the bottom right status message on gardens. It will now be off by default but can be re-enabled.
+ Some changes on the backend to make Fairy Ring run a bit faster/more efficient

### BETA 0.10.3:
Features:
+ You can now left click wilted plants to revive them (if the left click to water option is enabled). 

Changes:
+ Added a timestamp in the browser console which shows how long it took for fairy ring to load (if debug enabled).
+ Re-organized the settings page and fixed some grammar mistakes. 

Bug Fixes:
+ Fixed an issue with the dark theme which caused errors when refreshing gardens
+ Removed some pointless console logs

### BETA 0.10.2:
Features:
+ Added support for new dinosaur creatures
+ Added the (gardenname) keyword to the typer tab, it will replace (gardenname) with the actual name of whatever garden you are currently in.
+ Added the (fairyname) keyword to the typer tab, it will replace (fairyname) with the actual name of the garden owner's fairy for the garden you are currently in.

Changes:
+ Moved some text around on the typer page for cleanliness.
+ Fixed some boxes for the dark theme that were showing up as the original color.

### BETA 0.10.1:
Features:
+ Added support for new rainbow candy creatures

Bug Fixes:
+ Fixed some incorrect wildlife times for other candy creatures

### BETA 0.10.0:
Features:
+ Added ability to set custom critter nicknames in Typer tab which will replace the normal critter name
	+ There is no limit to how many custom names can be set
	+ The format is as easy as I could make it
		+ The normal creature name is not case sensitive and spacing does not matter
		+ The parenthesis and "=" character are VERY specific, for every open parenthasis "(" there must be an "=" inside it followed by a closing one ")"
		+ If the above format is not followed, the application will throw an error until it is corrected (it will stop outputting stuff in the sample box and on the main page).

Changes:
+ Overhauled Typer tab
	+ Removed (crittercondensed) as the custom critter nicknames box now fulfills this requirement. 
	+ Added better handling of plural creatures to better support the new custom names.
		+ Critters ending in "y" will instead end in "ies" when plural.
		+ Critters ending in "s" will instead end in "es" when plural.
		+ Critters with "Pair" in them (pair of magpies/lovebirds) will ignore the above rule and instead add an "s" to pair
		+ Pegasus will change to "Pegasi"
+ Changed some colors for dark mode following user feedback
		
Bug Fixes:
+ Fixed a dark theme bug which swapped snails with the gold image (it was only a visual bug). 
+ Fixed a bug which caused the wildlife page "next" buttons to open random windows when you were on the last page.
+ Fixed the "open all" buttons sizing on the home page for non dark mode users.
	
	
### BETA 0.9.1:
Bug Fixes:
	+ Fixed a bug with custom plates where the percentages would be inside the food.
	+ The above fix should also have fixed a bug involving percentages sometimes moving upon watering.
	
### BETA 0.9.0:

Features:
+ Added a Dark Theme mode, which can be enabled in the settings.
	+ This is still a work and progress, expect frequent changes. I would like to make it so that people can set colors themselves.
	+ Dark theme has required me to replace a number of images in fairyland, some I would like to redo when I have more time.
+ Added 3 "open all" buttons on the homepage for the friends, favorites and random gardens (can be disabled in the settings).

Changes:
	+ Fixed grammar for certain fairytale creatures, ex: You will see "Spotted The Giant" instead of "Spotted a The Giant"

Bug Fixes:
	+ Fixed the new candy wildlife from throwing errors
	+ Various behind the scenes fixes to allow the dark theme to work
	
### BETA 0.8.3:
Bug Fix:
+ Fixed a bug causing the (1) notification to persist when multiple synced devices are used. 

### BETA 0.8.2:
Bug Fix:
+ Fixed a typo for Ghostly Loch Ness Monster which caused an error.

### BETA 0.8.1:
Changes:
+ Typer will now always use "and" for the last creature in the list if multiple are spotted, before it just used commas. 
	+ Changed default value for the "PD box" to ". Also got a pink diamond"
+ Typer will now use "an" instead of "a" when creatures start with a vowel sound.
+ Default settings for "hide gardens without food" option to "Off". 
	+ Some people were getting confused after installing fairy ring why they could not see friends who didn't have food, I will leave this feature but just have it be off by default.

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
