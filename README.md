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

>What is the exact equation used to calculate the chance of wildlife?

Currently the calculation is as follows:

Active time (capped at 60) <b>/</b> ( [max time between visits for the given food type] - [Inactive time + last creature stay time] )

* Active time is the time that wildlife could have visited the plate since the food was left out, or since the last water.
* Active time is capped at 60 minutes as nothing can stay longer than 60 minutes, anything beyond this moves to inactive time.
* Watering resets Active time to when the last water occured and moves everything before the watering to inactive time.
* The total stay time of the creature is also added to inactive time, because the fairyland time between visit counter starts counting as soon as it visits, even though something new cannot visit until it leaves.

In practice it looks like this:
* Organic food has a maximum time between visits of 6 hours, we will assume that this food has already been visited. 
* Mouse arrived 4 hours ago.
* Minimum staytime of mouse is 55 minutes.
* Visit window = (arrival time - staytime) / (max time between feeds - staytime)
* The visit window would look like: 3 hours 5 minutes / 5 hours 5 minutes

* Because of this, we will assume that the slot opened exactly 3 hours 5 minutes ago ( arrival - stay time ).
* The current active time is 1 hour, and the inactive time is 2 hours and 5 minutes.
* The garden was watered 30 minutes ago. Now the final active time is 30 minutes and the inactive time is 2 hours 35 minutes
* Finally, we add the last creature's stay time (55 minutes) to the inactive time, even though wildlife cannot come during this period this is still part of the "max time between visits".
* 30 min activetime / ( [6 hr max time between visits] - [2hr 35 min inactive time + 55min time last creature stayed])
* 0.5 / (6 - (2.583 + 0.917)) = 20% chance of wildlife being on this plate at this exact moment.

If someone hadn't of watered 30 minutes ago, it would instead look like this:
* 60 min activetime / ( [6 hr max time between visits] - [2hr 5 min inactivetime + 55min time last creature stayed])
* 1.0 / (6 - (2.083 + 0.917)) = 33.33% chance of wildlife being here currently.


If additional plates in the garden exist and have a chance of containing wildlife, the total percentage is calculated in the formula below by calculating the odds of there not being wildlife and subtracting that from the final percentage. This is to factor in the fact that there are four outcomes, one is due, the other is due, both are due, none are due. This will also scale up to 4 plates. 

* Final percent = 100 * (1 - ((1 - duepercent) * (1 - duepercent2)))

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
