<div align="center">
  
# Fairy-Ring
<br>
A browser extension for fairylandgame.com

<p>
<a target="_blank" href="https://opensource.org/licenses/MIT" title="License: MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
<img src="https://img.shields.io/badge/contributions-welcome-green.svg?style=flat)](https://github.com/dwyl/learn-travis/issues">
</a>
<img src="https://img.shields.io/badge/Chrome-Supported-green.svg">
<img src="https://img.shields.io/badge/Firefox-Supported-green.svg">
<img src="https://img.shields.io/badge/Android-Supported-green.svg">
</p>
</div>

## Table of contents
<!--ts-->
   * [Installations](#Installations)
   * Features
      * [Wildlife Calculations](#wildlifecalc)
      * [Quality of life](#qol)
      * [Planned Features](#planned)
   * [FAQ](#faq)
   * [Limitations / Current Issues](#issues)
   * [Versions](#Versions)
   * [Contributing](#contribute)
   * [Acknowledgments](#acknowledgments)
   * [License](#license)
<!--te-->

<a name="Installations"></a>
## Installations
To use the app on your Android, you will need to install Firefox!

### Google Chrome: <a href="https://chrome.google.com/webstore/detail/fairy-ring/ncmgbhjephcfekbcdfeclbjldipffmge" target="_blank">Chrome Webstore</a>

### Firefox & Firefox Android: <a href="https://addons.mozilla.org/en-US/firefox/addon/fairy-ring/" target="_blank">Firefox Addons</a>

<a name="Features"></a>
## Features

<a name="wildlifecalc"></a>
### Wildlife Calculations
* This app will look at a loaded garden page and calculate the percent chance of wildlife in the garden, on a given plate, and the time period that a plate is able to recieve new wildlife.
* Ability to embed the calculated information right into the page for quick decisions.
* Ability to set custom percentages to alert, along with the ability to set custom colors to go with them.

<a name="qol"></a>
### Quality of life
* Ability to hide gardens which do not currently contain food.
* Ability to automatically complete minigames.
* Ability to click a plant directly to water it.
* Ability to set a custom message to automatically type on every visited garden (you will still have to hit "post").
* Wildlife pages now have two additional buttons:
  * Open all (opens all garden links on the page instantly)
  * Next (no more having to scroll down each time).

<a name="planned"></a>
### Planned Features
* Bring extension to Firefox, Edge, and potentially mobile browsers. 
* Improve calculation algorithm as more data is aquired
* Display users who have blocked you/hide their gardens so you do not waste your time. 
* Potentially display all of the possible wildlife a garden can have below the garden window (like how wildlifecalc does). I could increase the accuracy of the calculation by this as well. 
* Dark theme - I experimented with changing the colors of fairyland, the issue is there are some bits that look rather ugly that cannot be changed easily as they are embedded images. 

<a name="faq"></a>
## FAQ
>Why isn't the extension loading?

The extension will only work on <a href="https://www.fairylandgame.com/fbfairy/" target="_blank">the official fairyland site,</a> it will not work on Facebook.


>How do I turn on features or change the configuration?

Once installed, click on the app in the top right of your screen (look for the mushroom).


>Why can I automatically complete snail races but not mushroom games?

Mushroom games are automatically completed regardless of which mushroom you click on or if you actually click it. The moment you enter the garden and water you have already either been given a diamond or you have lost. 

>Why does the "open all gardens" button not opening all of the ones listed?

You may need to enable popups for Fairyland, check your browser settings (there should be a notification on the screen where you clicked the button).

The button also checks for duplicates and will only open one link if the same person has posted multiple times. 

>What do the numbers over the plates mean?

The percentage above the plate indicates the chance that wildlife will be at that plate at that exact moment. 

The fraction below the percentage is the "visit window". The number on the right is the maximum time between visits for that food type (this differs if the food is fresh). The number on the left is the time since the window opened. The number on the left is 100% accurate in the case of fresh food, superfood (as all wildlife stay for their max time), and when the previous wildlife was not spotted (as it will give the exact duration of it's stay). Anything else will assume the maximum stay time of the last wildlife to visit that plate. 

The overall chance listed in the top right is the combined chance for all plates in a garden. 

>Why is the visit window a negative number?

This is because the visit window has not opened yet for the next wildlife, it is impossible for new wildlife to currently be there. Fairyland allots "windows", which is an arrival time and a leave time based upon the maximum and minimum duration for that given wildlife. Even if wildlife is spotted on a plate, new wildlife cannot come until it would have "left" if not spotted. 

>Why is the percent chance so low on a garden with food that has been left out for a long time? 

The percent chance given is meant for watering at that exact moment. It takes into account if someone has watered within the last 60 minutes. An easier way to think of it might be if someone watered 3 minutes ago, it is giving you the chance that wildlife has shown up in the last 3 minutes taking into account the remaining time before it absolutely must appear. 

You should use the percent chance as a tool to help you decide when to water, and use the visit window located above the food plates to decide when to stay in a garden. 

>What about alerts?

The app cannot detect alerts, if there is an alert then the percentages will not consider it and so you should go with your own judgement. 

>What is the exact equation used to calculate the chance of wildlife?

Currently the calculation is as follows:

Active time (capped at 60) <b>/</b> ( [max time between visits for the given food type] - Inactive time )

* Active time is the time that wildlife could have visited the plate since the food was left out, or since the last water.
* Active time is capped at 60 minutes as nothing can stay longer than 60 minutes, anything beyond this moves to inactive time.
* Watering resets Active time to when the last water occured and moves everything before the watering to inactive time. 
In practice it looks like this:
*Organic food has a maximum visit time of 6 hours, we will assume that this food has already been visited. 
*Mouse arrived 4 hours ago.
*Maximum stay time of the mouse is 1 hour.
*Because of this, we can assume that the slot opened exactly 3 hours ago ( arrival - stay time ). 
*The current active time is 1 hour, and the inactive time is 2 hours.
*The garden was watered 30 minutes ago. Now the final active time is 30 minutes and the inactive time is 2.5 hours.
* 0.5 / (6 - 2.5) = 14.2% of wildlife being on this plate at this exact moment.

If additional plates in the garden exist and have a chance of containing wildlife, the total percentage is calculated in the formula below by calculating the odds of there not being wildlife and subtracting that from the final percentage. This is to factor in the fact that there are four outcomes, one is due, the other is due, both are due, none are due. This will also scale up to 4 plates. 

* Final percent = 100 * (1 - ((1 - duepercent) * (1 - duepercent2)))

<a name="issues"></a>
## Limitations / Current Issues
The calculations involving wildlife have come a long way, but there are some bits of information missing or not yet implemented which keep the percentage from being as accurate as it can be. 

* It is impossible to determine the exact stay time if the wildlife was spotted. If it was not spotted then the exact slot time is known and used, but usually this is not the case. Currently this app uses the maximum stay time for the last visiting wildlife (superfood is always max), but this could be updated to be an average between the max and min for regular and organic food.
* While the app can see what has already visited and use this to calculate the visit windows, the calculation currently does not take into consideration the specific wildlife that a garden can attract. This only impacts certain circumstances (gardens which can ONLY attract wildlife with long stay times should have a higher percentage as they must arrive 1 hour prior to the food window closing). 
* If the above issue is ever fixed, the rarity of wildlife and how much of a factor it is is an unknown variable, along with the numbers behind how deterrants function.
* The app cannot see alerts. There are too many variables associated with this, mainly with it being impossible to know when the alert started. If you see an alert, ignore the percentages and use your own judgement. 

Fixing some of these will require more data and input from the community.


<a name="Versions"></a>
## Versions
<a href="https://github.com/thedanger1/Fairy-Ring/blob/master/CHANGELOG.md" target="_blank">Changelog</a>

<a name="contribute"></a>
## Contributing
If you are interested in contributing I would love to see a pull request. Submit all pull-requests to the master branch.

<a name="acknowledgements"></a>
## Acknowledgments

* Thanks to Mike (developer of Fairyland) for a great game.
* Thanks to jscolor (Jan Odvarko).
* Thanks to Freedom Fairies for providing feedback and testing.
* Thanks to the community.

<a name="license"></a>
## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
