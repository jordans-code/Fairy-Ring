# Fairy-Ring
<br>
<div align="center">
A browser extension for fairylandgame.com

<p>
<a target="_blank" href="https://opensource.org/licenses/MIT" title="License: MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
<img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/learn-travis/issues"></a>
</p>
</div>

## Table of contents
<!--ts-->
   * [Versions](#Versions)
   * Features
      * [Wildlife Calculations](#wildlifecalc)
      * [Quality of life](#qol)
      * [Planned Features](#planned)
   * [FAQ](#faq)
   * [Limitations / Current Issues](#issues)
   * [Contributing](#contribute)
   * [Acknowledgments](#acknowledgments)
   * [License](#license)
<!--te-->

<a name="Versions"></a>
## Versions

### BETA 0.2.2:
Bug fixes 
+ App now loads UI upon clicking the in-built "refresh garden" button, and the refresh button on the title.

### BETA 0.2.1:
Bug fixes

### BETA 0.2.0:
Initial beta release, expect frequent changes/some gliches. 

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
* Improve calculation algorithm as more data is aquired
* Display users who have blocked you/hide their gardens so you do not waste your time. 
* Potentially display all of the possible wildlife a garden can have below the garden window (like how wildlifecalc does). I could increase the accuracy of the calculation by this as well. 
* Dark theme - I experimented with changing the colors of fairyland, the issue is there are some bits that look rather ugly that cannot be changed easily as they are embedded images. 

<a name="faq"></a>
## FAQ
*Why isn't the extension loading?*
The extension will only work on <a href="https://www.fairylandgame.com/fbfairy/" target="_blank">the official fairyland site,</a> it will not work on Facebook.

*How do I turn on features or change the configuration?*
Once installed, click on the app in the top right of your screen (look for the mushroom).

*What is the algorithm used for wildlife?*

Currently the calculation is as follows:

[Time since the latest window opened and since the last water (capped at 60)] / ([Maximum time between visits for the specific food type] - Overtime)

* Overtime is in the event that time since the slot opened is no longer a possibility for a visit, in other words if a watering happened or if the time went above 60 (as wildlife cannot stay longer than this). 
In practice it looks like this:
*Organic food has a maximum visit time of 6 hours, and we will assume that this food has already been visited. 
*Mouse arrived 4 hours ago.
*Maximum stay time of the mouse is 1 hour.
*Because of this, we can assume that the slot opened exactly 3 hours ago ( arrival - stay time ). 
*The current active time is 1 hour, and the overtime is 2 hours. This is because the active time is capped at 1 hour as wildlife cannot stay any longer.
*The garden was watered 0.5 hours ago. Now the final active time is 0.5 hours and the overtime is 2.5 hours
* 0.5 / (6 - 2.5) = 14.2% of wildlife being on this plate

If additional plates in the garden exist and have a chance of containing wildlife, the total percentage is calculated in the formula below by calculating the odds of there not being wildlife and subtracting that from the final percentage. This is to factor in the fact that there are four outcomes, one is due, the other is due, both are due, none are due. 

* Final percent = 100 * (1 - ((1 - duepercent) * (1 - duepercent2)))

<a name="issues"></a>
## Limitations / Current Issues
The calculations involving wildlife have come a long way, but there are some bits of information missing or not yet implemented which keep the percentage from being as accurate as it can be. 

* It is impossible to determine the exact stay time if the wildlife was spotted. If it was not spotted then the exact slot time is known and used, but usually this is not the case. Currently this app uses the maximum stay time for the last visiting wildlife (superfood is always max), but this could be updated to be an average between the max and min for regular and organic food.
* The calculation currently does not take into consideration the specific wildlife that a garden can attract along with the rarity.
* The rarity and how much of a factor it is is an unknown variable, along with the numbers behind how deterrants function.

Fixing some of these will require more data and input from the community.

<a name="contribute"></a>
## Contributing
If you are interested in contributing I would love to see a pull request. Submit all pull-requests to the master branch.

<a name="acknowledgements"></a>
## Acknowledgments

* Thanks to Mike (developer of Fairyland) for a great game.
* Thanks to jscolor (Jan Odvarko)
* Thanks to the community

<a name="license"></a>
## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
