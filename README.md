<div align="center">
  
# Fairy-Ring
<br>
<img src="icons/fring.png"><br>
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

### Firefox: <a href="https://addons.mozilla.org/en-US/firefox/addon/fairy-ring/" target="_blank">Firefox Addons</a>

### Firefox Android: 
In August 2020, the new mobile version of Firefox was released which unfortunately only supports a few extensions currently (Fairy Ring is not one of them). Due to this, Fairy Ring requires some additional steps to get working on mobile devices again. In a nutshell, you will have to get a open source clone version of firefox as detailed below.

1. <a href="https://f-droid.org/en/" target="_blank">Download F-Droid</a> on your device. F-Droid is like a free app store of its own and is open source. 
Note: You may be prompted to enable installations from unknown sources. This is because it isn't on the app store and so they want you to be careful about what you download, but you can rest assured with F-Droid as it is widely used, open source and safe. 

2. Once you have F-Droid, open it and search for "Icecat" (it is called IceCatMobile) and then install it. It is an open source Firefox clone that function and look just like the old Firefox (aside from it's icon), it generally offers more privacy than the actual Firefox as well.

3. Once you have Icecat Firefox clone downloaded, open it and go to the normal <a href="https://addons.mozilla.org/en-US/firefox/addon/fairy-ring/" target="_blank">Firefox Addons</a> link to add Fairy Ring. The blue button to add will probably be greyed out, but you can click the grey text right below it that says "download file" and that should add it and get it working. That is it! To access the settings, click the three dots in the top right of the icecat screen and scroll down to "Fairy Ring". 

Hopefully the normal Firefox will push a fix soon to bring back the many thousands of addons like Fairy Ring, but until then this is the only way to fix it. 

<a name="Features"></a>
## Features

<a name="wildlifecalc"></a>
### Wildlife Calculations
* This app will look at a loaded garden page and calculate the percent chance of wildlife in the garden, on a given plate, and the time period that a plate is able to recieve new wildlife.
* Ability to embed the calculated information right into the page for quick decisions.
* Ability to set custom percentages thresholds with matching colors.

<a name="qol"></a>
### Quality of life
* Ability to hide gardens which do not currently contain food.
* Ability to automatically complete minigames and Magical Mushrooms.
* Ability to click a plant directly to water it.
* Ability to set a custom message to automatically type on every visited garden (you will still have to hit "post").
* Wildlife pages and garden pages now have two additional buttons:
  * Open all (opens all garden links on the page instantly)
  * Next (no more having to scroll down each time).
* Ability to enlarge buttons to custom amounts, especially useful for mobile.
* Display users who have blocked you. 

<a name="planned"></a>
### Planned Features
* Potentially display all of the possible wildlife a garden can have below the garden window (like how wildlifecalc does). I could increase the accuracy of the calculation by this as well. 
* Dark theme - I experimented with changing the colors of fairyland, the issue is there are some bits that look rather ugly that cannot be changed easily as they are embedded images. 

<a name="faq"></a>
## FAQ
>Why isn't the extension loading?

The extension will only work on <a href="https://www.fairylandgame.com/fbfairy/" target="_blank">the official fairyland site,</a> it will not work on Facebook.


>How do I turn on features or change the configuration?

Once installed, click on the app in the top right of your screen (look for the mushroom).

>How do I sync my settings to another computer or mobile device?

This will be done automatically as long as you are signed into Chrome or Firefox.

>Why can I automatically complete snail races but not mushroom games?

Mushroom games are automatically completed regardless of which mushroom you click on or if you actually click it. The moment you enter the garden and water you have already either been given a diamond or you have lost. 

>Why does my "open all gardens" button not work?

You may need to enable popups for Fairyland, check your browser settings (there should be a notification on the screen where you originally clicked the button). Android is a little bit more difficult but below are the steps to enable popups on Firefox Android:

* In the search bar, type about:config
* In the new search bar on the config page, search for dom.disable_open_during_load and locate the corresponding option.
* Toggle it to "false" to allow popups. 

The open all gardens button also checks for duplicates and will only open one link if the same person has posted multiple times. 

>What do the numbers over the plates mean?

The percentage above the plate indicates the chance that wildlife will be at that plate at that exact moment.

The fraction below the percentage is the "visit window". 
* The number on the right is the time before something MUST arrive. (maximum time between visits for that food type - the time the last wildlife stayed for).
* The number on the left is the "Visit window" (time elapsed since the last creature left). The number on the left is 100% accurate in the case of fresh food, superfood (as all wildlife stay for their max time), and when the previous creature was not spotted (as it will give the exact duration of it's stay). Anything else will assume the minimum stay time of the last wildlife to visit that plate. 

The overall chance listed in the top right is the combined chance for all plates in a garden. 

>Why is the visit window a negative number?

This is because the last creature has not yet left, it is impossible for new wildlife to currently be there. Fairyland gives an arrival time and a leave time based upon the maximum and minimum duration for that given wildlife. Even if wildlife is spotted on a plate, new wildlife cannot come until it would have "left" if not spotted. 

>Why is the percent chance so low on a garden with food that has been left out for a long time? 

The percent chance given is meant for watering at that exact moment. It takes into account if someone has watered within the last 60 minutes. An easier way to think of it might be if someone watered 3 minutes ago, it is giving you the chance that wildlife has shown up in the last 3 minutes taking into account the remaining time before it absolutely must appear. 

You should use the percent chance as a tool to help you decide when to water, and use the visit window located above the food plates to decide when to stay in a garden. 

>What about alerts?

The app cannot detect alerts, if there is an alert then the percentages will not consider it and so you should go with your own judgement. 

>What is the exact equation used to calculate the chance of wildlife currently being present?

Currently the calculation is as follows:

[Active time - plate dead time](capped at 60) <b>/</b> ( [max time between visits for the given food type] - [Inactive time + last creature stay time + plate dead time] )

* Active time is the time that wildlife could have visited the plate since the food was left out, or since the last water.
* Active time is capped at 60 minutes as nothing can stay longer than 60 minutes, anything beyond this moves to inactive time.
* Plate dead time is the minimum time between arrivals for the type of food, aka the time in which nothing can come.
* Watering resets Active time if the activetime is a positive number to when the last water occured and moves the old activetime number to inactive time.
* The total stay time of the creature is also added to inactive time, because the fairyland time between visit counter starts counting as soon as it visits, even though something new cannot visit until it leaves.
* The plate dead time is also added to inactive time, because it is stll part of the window and so by subtracting it from both sides we narrow down the time in which wildlife can come.

<b>Step by step for getting the percent chance that something is currently on the plate:</b>
* [Active time - plate dead time]<b>/</b>([max time between visits] - [Inactive time + last creature stay time + plate dead time])
* Organic food has a maximum time between visits of 5 hours, we will assume that this is not the first feed.
* [Active time - plate dead time]<b>/</b>(<b>5hr</b> - [Inactive time + last creature stay time + plate dead time])
* The mid plate dead time for organic is 37min.
* [Active time - <b>37min</b>]<b>/</b>(5hr - [Inactive time + <b>55min + 37min</b>])
* Mouse arrived 4 hours ago, the minimum staytime of mouse is 55 minutes (if it is missed then we get the exact time and use that instead).
* This means the mouse would have at the earliest departed 3 hours, 5 minutes ago. This is our "active time" before subtracting the dead time in which nothing could come.
* [<b>3hr5min</b> - 37min]<b>/</b>(5hr - [Inactive time + 55min + 37min])
* [<b>2hr28min</b>]<b>/</b>(5hr - [Inactive time + 55min + 37min])
* Because the activetime is greater than 60, we leave 60 as the activetime and subtract 60 from the whole number and that is our inactive time
* [<b>1hr</b>]<b>/</b>(5hr - [<b>1hr28min</b> + 55min + 37min])
* Lets pretend that someone watered the plate 5 minutes ago, 5min is the new activetime since something could have come and we add the remaining 55 minutes into inactive time
* [<b>5min</b>]<b>/</b>(5hr - [1hr28min + <b>55min</b> + 55min + 37min])
* [5min]<b>/</b>(5hr - [<b>3hr55min</b>])
* [5min]<b>/1hr5min</b>
* There is a 7.69% chance that wildlife is currently on this plate at this exact moment.
* The visit window would look like: 3 hours 5 minutes / 4 hours 5 minutes (to see how to get this, look at the guide below)

If additional plates in the garden exist and have a chance of containing wildlife, the total percentage is calculated in the formula below by calculating the odds of there not being wildlife and subtracting that from the final percentage. This is to factor in the fact that there are four outcomes, one is due, the other is due, both are due, none are due. This will also scale up to 4 plates. 

* Final percent = 100 * (1 - ((1 - duepercent) * (1 - duepercent2)))

>What is the exact equation used to calculate the visit window fraction (bottom fraction)?
<b>Step by step for getting the visit window (the bottom fraction over plates):</b>
It is basically the same formula as above, minus the need for "inactive time" or to cap activetime at 60.
Using the same example as above, lets say a field mouse came 4 hours ago on a plate of organic food that is not fresh. Remember that organic dead time is 37min.
* [Active time(time since last critter departed) - plate dead time]<b>/</b>([max time between visits] - [last creature stay time + plate dead time])
* [3hr5min - 37min]<b>/</b>([5hr] - [55min + 37min])
* 2hr28min <b>/</b> 3hr28min
* It has been 2 hours and 28 minutes since something has been able to arrive, and something must come by the 3hr 28 min mark so there is only 1 hour left in the window.
<a name="issues"></a>
## Limitations / Current Issues
The calculations involving wildlife have come a long way, but there are some bits of information missing or not yet implemented which keep the percentage from being as accurate as it can be. 

* It is impossible to determine the exact stay time if the wildlife was spotted. If it was not spotted then the exact slot time is known and used, but usually this is not the case. Currently this app uses the minimum stay time for the last visiting wildlife.
* If the ability to see which wildlife a garden attracts is ever added, the rarity of wildlife and how much of a factor it is is an unknown variable, along with the numbers behind how deterrants function.
* The app cannot see alerts. There are too many variables associated with this, mainly with it being impossible to know when the alert started. If you see an alert, ignore the percentages and use your own judgement. 

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
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

Disclaimer: Fairyland is a registered trademark, this extension/project is not affiliated with it.
