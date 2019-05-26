function fetcher() { // returns array of 1-9 items in garden from left to right
	var Unfilteredgardenobjs = $('.plantpopup');
	var gardenobjs = Unfilteredgardenobjs.filter(function (el) {
	  return el != null;
	});
	return gardenobjs;
}

function parser(arr) { // Checks if object in array is food
	var Final = [];
	var ActiveFood = [];
	var FinalDict = {};
	for (var i = 0; i < arr.length; i++) {
		var dtext = arr[i].innerText;
		if (dtext.includes("remainingLeft")) {
			Final.push(arr[i]);
			ActiveFood.push(i);
		} else {
			Final.push(null); // set a placeholder
		}
	}
	FinalDict['ActiveFood'] = ActiveFood;
	FinalDict['Workingarr'] = Final;
	return FinalDict;
}


function getname(settings, Working) { // Takes array of food and uses name for dictionary key, then removes from string.
	var arr = Working['Workingarr'];
	var ActiveFood = Working['ActiveFood'];
	var Final = {};
	for (var z = 0; z < ActiveFood.length; z++) {
		var i = ActiveFood[z];
		if (arr[i] == null) {
			continue;
		} else {
			var current = arr[i].innerText + '';
			var csplit = current.split(" ");
			Final[i] = {};
			if (settings.debug) { console.log(csplit); }
			csplit[0] = csplit[0].slice(2);
			if (csplit[0] == " ") { // not sure why I need this but sometimes there is an extra space. Could investigate later. 
				csplit[0] = csplit[0].splice(1);
			}
			Final[i]["name"] = csplit[0];
			var name = Final[i]["name"]
			if (name == "Veggies" || 
				name == "Bamboo" || 
				name == "Frogspawn" || 
				name == "Grass" || 
				name == "Treasure" || 
				name == "Water" || 
				name == "Straw" || 
				name == "Wood" || 
				name == "Bricks" || 
				escape(name) == "Hot%A0%A0Porridge") { // for some reason only hot porridge seems be in a different character encoding.
				Final[i]["string"] = csplit.slice(1);
			} else if (name == "just") {
				Final[i]["string"] = csplit.slice(3);
			} else {
				Final[i]["string"] = csplit.slice(2); // cut off name from string
			}
		}
	}
	Final['ActiveFood'] = ActiveFood;
	return Final;
}

/*
0 = SF
1 = Double Organic
2 = Organic
3 = Double Regular
4 = Regular
5 = Cake
6 = None
*/

function gettype(dict) { // determines type of food then removes from string
	var ActiveFood = dict['ActiveFood'];
	var Final = dict;
	for (var z = 0; z < ActiveFood.length; z++) {
		var i = ActiveFood[z];
		var current = Final[i];
			if (current.string[0].includes("Super")) {
				Final[i]["type"] = 0;
				Final[i]["string"][0] = Final[i]["string"][0].slice(13);
			} else if (current.string[0].includes("(Double") && current.string[1].includes("Organic)")) {
				Final[i]["type"] = 1;
				Final[i]["string"] = Final[i]["string"].slice(1);
				Final[i]["string"][0] = Final[i]["string"][0].slice(10);
			} else if (current.string[0].includes("(Organic)")) {
				Final[i]["type"] = 2;
				Final[i]["string"][0] = Final[i]["string"][0].slice(11);
			} else if (current.string[0].includes("Organic)")) { // not sure if need
				Final[i]["type"] = 2;
				Final[i]["string"][0] = Final[i]["string"][0].slice(10);
			} else if (current.string[0].includes("(Double") && current.string[1].includes("Regular)")) {
				Final[i]["type"] = 3;
				Final[i]["string"] = Final[i]["string"].slice(1);
				Final[i]["string"][0] = Final[i]["string"][0].slice(10);
			} else if (current.string[0].includes("(Regular)")) {  // not sure if needed
				Final[i]["type"] = 4;
				Final[i]["string"][0] = Final[i]["string"][0].slice(11);
			} else if (current.string[0].includes("Regular")) {
				Final[i]["type"] = 4;
				Final[i]["string"][0] = Final[i]["string"][0].slice(10);
			} else {
				console.log(current.string);
				console.log("Unknown Food!");
			}
	}
	return Final;
}

function getfeeds(dict, HasFood) { // get the feeds left on food, creates array of active food referencing the dict key
	var ActiveFood = dict['ActiveFood'];
	var Final = dict;
	var Remove = [];
	var NewAFood = ActiveFood;
	for (var z = 0; z < ActiveFood.length; z++) {
		var i = ActiveFood[z];
		var feeds = Final[i]["string"][0].split(":")[1];
		Final[i]["feedsremaining"] = feeds;
		if (feeds == "0") {
			Remove.push(z);
			Final[i] = undefined; // if no remaining food
		} else {
			Final['HasFood'] = true;
			Final[i]["string"] = Final[i]["string"].slice(3);
		}
	}
	if (Remove.length > 0){ // removes empty food plate
		for (var i = Remove.length -1; i >= 0; i--) {
			NewAFood.splice(Remove[i],1);
		}
	}
	Final['ActiveFood'] = NewAFood;
	return Final
}

function gettime(one, two) { // IN: int, time format (minutes, days). Output seconds
	var one = parseInt(one);
	if (two.includes("day")) {
		return one * 24 * 60 * 60;
	} else if (two.includes("hour")) {
		return one * 60 * 60;
	} else if (two.includes("minute")) {
		return one * 60;
	} else if (two.includes("second")) {
		return one;
	} else {
		console.log("Error in gettime");
		return 0;
	}
}

function getwater() { // Returns the last time garden was watered in seconds
	var stat = $('#gardenmsg .status')[0].innerText.split(" ");
	var str = "";
	if ((stat.indexOf("you!")) != -1) { // if garden is watered by user
		return 0;
	}
	function matchago(element) {
		return element.includes("ago");
	}
	var agodex = stat.findIndex(matchago);
	var seconds = 0;
	if (stat[3] == "your") {
		seconds += gettime(stat[7], stat[8]);
		if (agodex > 10) {
			seconds += gettime(stat[9], stat[10]);
		}
	} else {
		seconds += gettime(stat[6], stat[7]);
		if (agodex > 9) {
			seconds += gettime(stat[8], stat[9]);
		}
	}
	return seconds;
	
}
function getleftout(dict) { // Returns dict with the added time the food was left out
	var ActiveFood = dict['ActiveFood'];
	var Final = dict;
	for (var i = 0; i < ActiveFood.length; i++) {
		var z = ActiveFood[i];
		var current = Final[z];
		var seconds = 0;
		seconds += gettime(current["string"][0].split(":")[1], current["string"][1]);
		if (current["string"][2].includes("ago")) {
			Final[z]["string"] = Final[z]["string"].slice(2);
			Final[z]["leftout"] = seconds;
			continue;
		} else {
			seconds += gettime(current["string"][2], current["string"][3]);
		}
		
		Final[z]["string"] = Final[z]["string"].slice(4);
		Final[z]["leftout"] = seconds;
	}
	return Final;
}

function getlastfeed(dict) { // Returns dict after adding values for what, if any, was the last to eat from food and when
	var ActiveFood = dict['ActiveFood'];
	var Final = dict;
	for (var i = 0; i < ActiveFood.length; i++) {
		var z = ActiveFood[i];
		var current = Final[z];
		if (current["string"][1] == "Attracted(Nothing,") { // if no feeds
			Final[z]["lastfeed"] = -1;
			continue;
		}
		if (current["string"][1].includes("[Clear")) {
			current["string"] = current["string"].slice(4);
		}
		function matchesarrived(element) {
			return element.includes("Arrived");
		}
		var mindex = current["string"].findIndex(matchesarrived);
		var seconds = 0;
		var visitor = "";
		
		for (var p = 1; p < mindex; p++) { 
			if (p == 1) {
				if (mindex == 2) {
				visitor += (current["string"][1].slice(9).slice(0, -1));
				} else {
					visitor += (current["string"][1].slice(9) + " ");
				}
			} else if (p + 1 == mindex ) { // if last
				visitor += (current["string"][p].slice(0, -1));
			} else {
				visitor += (current["string"][p] + " ");
			}
		}
		Final[z]["lastvisitor"] = visitor;
		seconds += gettime(current["string"][mindex + 1], current["string"][mindex + 2]);
		var slotopen = 0;
		if (current["string"][mindex+3].includes("ago")) {
			Final[z]["lastfeed"] = seconds;
			if (current["string"][mindex+3].includes("Stayed")) { // If wildlife wasn't spotted this gets the exact time of the slot opening
				slotopen += gettime(current["string"][mindex+5], current["string"][mindex+6]);
				if (current["string"][mindex+9] == "but") {
					slotopen += gettime(current["string"][mindex+7], current["string"][mindex+8]);
				}
			}
		} else {
			seconds += gettime(current["string"][mindex + 3], current["string"][mindex + 4]);
			if (current["string"][mindex+5].includes("Stayed")) { // If wildlife wasn't spotted this gets the exact time of the slot opening
				slotopen += gettime(current["string"][mindex+7], current["string"][mindex+8]);
				if (current["string"][mindex+11] == "but") {
					slotopen += gettime(current["string"][mindex+9], current["string"][mindex+10]);
				}
			}

		}
		Final[z]["slotopen"] = slotopen;
		Final[z]["lastfeed"] = seconds;
	}
	return Final;
}

function getcolor(percent, settings) { // takes a percentage and matches it to the thresholds set by user
	if (percent <= parseFloat(settings.threshold1)/100) {
		color = settings.threshold1c;
	} else if (percent <  parseFloat(settings.threshold2)/100) {
		color = settings.threshold2c;
	} else if (percent <  parseFloat(settings.threshold3)/100) {
		color = settings.threshold3c;
	} else if (percent <  parseFloat(settings.threshold4)/100) {
		color = settings.threshold4c;
	} else if (percent <  parseFloat(settings.threshold5)/100) {
		color = settings.threshold5c;
	} else {
		color = settings.threshold6c;
	}
	return '#' + color;
}

function TopRightChance(chance, prior) {
	
	if (prior) {
		document.getElementById('duepercent').remove();
	}
	var textnode = document.createElement("div");
	textnode.setAttribute("id", "duepercent");
	textnode.style = "position:absolute;top:28px;left:635px;font-weight:boldcursor:pointer";
	textnode.innerHTML = '<font size="2px"; color="red";>'+(Math.floor(chance*1000))/10 + "% </font><b> chance</b>";
	document.getElementById('pagetitle').appendChild(textnode);
}

function StatusChance(chance) {
	$('#gardenmsg .status')[0].append(" and currently has a "+ (Math.floor(chance*1000))/10 +"% chance of containing wildlife.");
}

function ColorBorder(color) {
	$('.gardenskin').css('background-color', color);
	document.getElementById('thegardenframe').style.border = `1px solid ${color}`;
}

function Write(dict, settings, prior) { // Formats gathered data and writes to web page
	var ActiveFood = dict['ActiveFood'];
	if (!dict.HasFood) {
		if (settings.toprightchance) {
			TopRightChance(0, prior);
			StatusChance(0);
		}
		if (settings.colorborder) {
			ColorBorder(`#${settings.threshold1c}`);
		}
		console.log("no food");
	} else {
	var duepercentarr = [];
	for (var i = 0; i < ActiveFood.length; i++) {
		var z = ActiveFood[i];
		percentdecimal = dict[z]["math1"];
		if (settings.colorgardentext) {
			var ctest = getcolor(percentdecimal, settings);
		} else {
			var ctest = "black";
		}
		var seconds = dict[z]["math3"];
		var outof = dict[z]["math2"] / 3600;
		var bottom = "";
		percent = Math.floor(percentdecimal * 1000)/10;
		duepercentarr.push(dict[z]["math1"]);
		if (settings.foodoverlay) {
			if (seconds < 0) {
				bottom = `<div class="foodwindow"><center><font color="white";>${Math.floor(seconds/60)}min/${outof}hrs</font></center></div>`;
			} else if (seconds < 3600) {
				bottom = `<div class="foodwindow"><center><font color="white";>${Math.floor(seconds/60)}min/${outof}hrs</font></center></div>`;
			} else if (seconds >= 3600) {
				var hours = seconds / 3600;
				var rhours = Math.floor(hours);
				var minutes = (hours - rhours) * 60;
				var rminutes = Math.round(minutes);
				bottom = `<div class="foodwindow"><center><font color="white";>${rhours}hr ${rminutes}min/${outof}hrs</font></center></div>`;
			} else {
				bottom = "Error.";
			}
			var Final = `<div class="foodpercent${z}"><center><font size="4px"; color="white";>${percent}%</font></center></div><br>`;
			if (dict[z]["name"] == "Water") { // Water (birdbath) has formatting issues, this makes it so text doenst clip inside it
				$('.planttd').eq(z).prepend("<br><br><br><br><br><br>");
			}
			$('.planttd').eq(z).prepend(bottom);
			$('.planttd').eq(z).prepend(Final);
			$('.foodwindow').css('textShadow','-1px -1px 0 black,1px -1px 0 black,-1px 1px 0 black,1px 1px 0 black');
			$(`.foodpercent${z}`).css('textShadow',`-1px -1px 0 ${ctest},1px -1px 0 ${ctest},-1px 1px 0 ${ctest},1px 1px 0 ${ctest}`);
		}
	}
	if (duepercentarr.length == 2 ) {
		var duepercent = 1 - ((1 - duepercentarr[0]) * (1 - duepercentarr[1]));
	} else if (duepercentarr.length == 3 ) {
		var duepercent = 1 - ((1 - duepercentarr[0]) * (1 - duepercentarr[1]) * (1 - duepercentarr[2]));
	} else if (duepercentarr.length == 4 ) { // birdbath
		var duepercent = 1 - ((1 - duepercentarr[0]) * (1 - duepercentarr[1]) * (1 - duepercentarr[2]) * (1 - duepercentarr[3]));
	} else {
		var duepercent = duepercentarr[0];
	}
	//'<div id="questbar" style="position:absolute;top:29px;left:548px;font-weight:bold;cursor:pointer" onclick="showInfo(20,null);">3050</div>');
	if (settings.debug) {console.log("There is a " + (Math.floor(duepercent*1000))/10 + "% overall chance that this garden contains wildlife.");}
	StatusChance(duepercent);
	if (settings.toprightchance) {
		TopRightChance(duepercent, prior);
	}
	var color;
	color = getcolor(duepercent, settings);
	if (settings.colorborder) {
		ColorBorder(color);
	}
	}
}

function checknewspot(oldspot) {
	console.log(oldspot);
	var spot = $('.standard_message.status').children().eq(0).children().eq(1).html();
	if (spot == null || spot == "") {
		return false;
	} else if (oldspot == undefined) {
		return [spot];
	} else {
		oldspot.push(spot);
		console.log(oldspot);
		return oldspot;
	}
}

function calc(settings, type, current, prior, priordict, newspot) { // Returns dict with probabilities
	var maxtime = 3600; // max time any wildlife could possibly stay for
	var time = 0;
	var overtime = 0;
	var lfeed = current["lastfeed"];
	if (prior && newspot) { // use old water time if the garden was just watered and wildlife spotted
		if (settings.debug) {console.log("Wildlife spotted, not refreshing water.");}
		var water = priordict["lastwater"];
	} else {
		var water = getwater();
	}
	if (current["lastfeed"] < 0) { // fresh
		var mtime = type["maxftime"];
		var vtime = current["leftout"];
		var activetime = vtime - type["minftime"];
		if (activetime < 0) {
			
			if (settings.debug) {console.log("There is no chance of wildlife here currently.");}
			return [0, mtime, activetime, water];
		}
		if (activetime > maxtime) {
			overtime = activetime - maxtime;
			time = maxtime;
		} else {
			time = activetime;
		}
		if (water < activetime) {
			if (settings.debug) {console.log("Water < activetime " + water +  "  " + activetime);}
			overtime += (time - water);
			var diff = 0;
			if (water > maxtime) { // to not exceed cap of 3600
				diff = water - maxtime;
				time = 3600;
				overtime += diff;
			} else {
				time = water;
			}
			
		}
		
		//var fin = [(current["leftout"] - 5) / mtime, mtime];
		var fin = [time / (mtime - overtime), mtime];
		fin.push(activetime);
		fin.push(water);
		if (settings.debug) {console.log("This food was left out " + vtime/60 + "mins ago.");
		console.log("This food type's max time between first visits is " + mtime/60);
		console.log("There is " + Math.floor(fin[0]*100) + "% chance that wildlife is here. Time since slot opened (capped at 60mins for longest wildlife) / (max time between visits - overtime (when slot time goes over 60 it goes here, starts at 0)" + ` ${time/60} / (${mtime/60}-${overtime/60})`);}
		return fin;
	} else { // not fresh
		var mtime = type["maxtime"];
		if (current["slotopen"] > 0) { // if the stay time is known calculate off this, otherwise go off defaults
			var vtime = current["slotopen"];
			if (settings.debug) {console.log(current["lastvisitor"] + " visited " + lfeed/60 + " mins ago and stayed for " + vtime/60 + " mins, the current slot opened at the end of that.");}
		} else {
			var vtime = maxtimes[current["lastvisitor"]]*60;
			if (settings.debug) {console.log(current["lastvisitor"] + " visited " + lfeed/60 + " mins ago. This creature's max time slot is " + vtime/60 + " mins, the current slot opened at or before that time. We will assume it opened at the end of the window but it likely opened sooner.");}
		}
		var activetime = (lfeed - vtime);
		if (settings.debug) {console.log("This slot has been opened for at least " + activetime/60 + " minutes");}
		if (activetime < 0) {
			if (settings.debug) {console.log("There is no chance of wildlife here currently.");}
			return [0, mtime, activetime, water];
		}
		if (activetime > maxtime) {
			overtime = activetime - maxtime;
			time = maxtime;
		} else {
			time = activetime;
		}
		if (water < activetime) {
			if (settings.debug) {console.log("The garden was watered within this window, adding this into the equation. (water < slot) " + water/60 +  " < " + activetime/60);}
			overtime += (time - water);
			var diff = 0;
			if (water > maxtime) {
				if (settings.debug) {console.log("The maximum time in which wildlife can stay has been reached in Activetime, capping at 60.");}
				diff = water - maxtime;
				time = 3600;
				overtime += diff; 
				if (settings.debug) {console.log("Factoring in the last water, the current activetime is 60mins, the overtime is " + (overtime));}
			} else {
				time = water;
				if (settings.debug) {console.log("Factoring in the last water, the current activetime is " + time/60 + " mins");}
			}
		}
		//var fin = [(lfeed - vtime) / mtime, mtime];
		var fin = [time / (mtime - overtime), mtime];
		fin.push(activetime);
		fin.push(water);
		if (settings.debug) {console.log("This food type's max time between visits is " + mtime/60 + " mins (this considers fresh food as it has a different window)");
		console.log("There is " + Math.floor(fin[0]*100) + "% chance that wildlife is on this plate. Formula: Activetime / (max time between visits - overtime " + ` ${time/60} / (${mtime/60}-${overtime/60})`);}
		return fin;
	}
}

function logic(settings, dict, prior, priordict) { // config values for timings and calls calc() to set percentages
	var ActiveFood = dict['ActiveFood'];
	var superfood = {
		"minftime": 0,  // Unknown if minimum times exist for fresh food, if they do this can be changed.
		"maxftime": 5400, //90 max time in mins for fresh food visit, assumed
		"maxtime": 10800}; //180 maximum time for visit, this value is 100% known
	var organic = {
		"minftime": 0,
		"maxftime": 7200, // 120 max time in mins for fresh food visit, assumed
		"maxtime": 21600}; // 360
	var regular = {
		"minftime": 0, 
		"maxftime": 10800,  // 180 max time in mins for fresh food visit, assumed
		"maxtime": 28800}; // 480
	var Final = dict;
	for (var z = 0; z < ActiveFood.length; z++) {
		var i = ActiveFood[z];
		var current = Final[i];
		var matharr;
		switch(current["type"]) {
			case 0: // SF
			case 5: // cake
				matharr = calc(settings, superfood, current, prior, priordict, dict["newspot"]);
				break;
			case 1: // Double Organic
			case 2: // Organic
				matharr = calc(settings, organic, current, prior, priordict, dict["newspot"]);
				break;
			case 3: // Double Regular
			case 4: // Regular
				matharr = calc(settings, regular, current, prior, priordict, dict["newspot"]);
				break;
			case 6: // Null
				console.log("Food error in logic()");
				break;
			 
		}
		Final[i]["math1"] = matharr[0]; // percent chance this plate is due
		Final[i]["math2"] = matharr[1]; // maxtimum time betweens visit for food
		Final[i]["math3"] = matharr[2]; // activetime
		Final["lastwater"] = matharr[3]; // lastwater
	}
	return Final;
}

function rmnotification(settings) { // removes notifications in top right when on garden page
	if (settings.toprightchance) {
		$('a[title="New Message"]').remove();
	}
} 

function writemessage(settings, prior, spotlist) {
	if (prior && spotlist && settings.newspotmsg) {
		var msg = settings.newmsgtext.split("(critter)");
		var spot = "";
		var counts = {};
		var finallist = [];
		for (i = 0; i < spotlist.length; i++) {
			x = spotlist[i].split('amp;').join('');// somewhat hack way of doing this, need to find out why some & symbols show up as &amp;
			counts[x] = (counts[x] || 0)+1;
			if (!(finallist.includes(x))) {
				finallist.push(x);
			} else {
			}
		}
		
		finallist.forEach(function(part, index) {
			if (counts[part] != 1) {
				this[index] = part + ` x${counts[part]}`;
			} else {
			}
		}, finallist);
		
		if (settings.debug) {console.log(finallist);}
		if (finallist.length == 1) {
			spot = finallist[0];
		} else if (finallist.length == 2) {
			spot = finallist[0] + " and " + finallist[1];
		} else if (finallist.length == 3) {
			spot = finallist[0] + ", " + finallist[1] + ", and " + finallist[2];
		} else if (finallist.length == 4) {
			spot = finallist[0] + ", " + finallist[1] + ", " + finallist[2] + ", and " + finallist[3];
		} else {
			console.log("Something weird happened: " + finallist.length);
		}
		if (msg.length > 1) {
			var Final = msg;
			for (i = msg.length-1; i > 0; i--) {
				Final.splice(i, 0, spot);
			}
			$('#wall_message')[0].value = Final.join("");
		} else {
			$('#wall_message')[0].value = msg[0]
		}
	} else if (settings.automsg && !prior) {
		$('#wall_message')[0].value = settings.msg;
	} 
}

function autosnail(settings) { // Automatically does snail game for you
	if (settings.autosnail) {
		if (($('.wall_subtitle').length > 0 ) && ($('.wall_subtitle')[0].innerText == "Snail Racing!")) {
			var choice = parseInt(settings.snailchoice);
			var Final = (choice-1)*2
			setTimeout(function() {
						$('.snailbox').children().eq(Final).click();
					}, 5);
		}
	}
}
function waterbutton(settings, finaldict) { // allows clicking plants to water them

	var gardenobjs = $('.link');
	for (i = 0; i < gardenobjs.length; i++) {
		if (gardenobjs[i].innerHTML == "Water It") {
			var obj = gardenobjs[i];
			$('.link').eq(i).on("click", function() {  // Normal water button
					setTimeout(function() {
						garden(settings, true, finaldict); // send past dictionary in case wildlife is spotted so it doesn't reset last water time.
					}, 450);
			});
			if (settings.waterbutton) {
				var plantid = obj.outerHTML.slice(34, -23);
				$(`#plantdiv${plantid}`).attr('onclick', `water(${plantid},null)`);
				// I need to fix some things with this, but can make it so garden auto refreshes with percent chance
				$(`#plantdiv${plantid}`).on("click", function() {  
					setTimeout(function() {
						garden(settings, true, finaldict); // send past dictionary in case wildlife is spotted so it doesn't reset last water time.
					}, 450);
				});
			}
		}
	}
}

function addrefresh(settings) { // Adds listeners for the built in refresh buttons on the garden

	$('#gardenrefresh_icon').on("click", function() {  // refresh button
		setTimeout(function() {
			if ($('.foodwindow').length == 0) { // need to check this as fairyland has a timeout where it wont actually refresh the garden.
				garden(settings, true, false);
			}
		}, 450);
	});
	$('.gardenskin').eq(0).on("click", function() {  // Garden name button
		setTimeout(function() {
			if ($('.foodwindow').length == 0) { // need to check this as fairyland has a timeout where it wont actually refresh the garden.
				garden(settings, true, false);
			}
		}, 450);
	});
}

function garden(settings, prior, priordict, lastspot) { // calls all functions required when on a garden page
	
	var Plantarray = fetcher();
	var food = parser(Plantarray);
	var namedfood = getname(settings, food);
	var typefood = gettype(namedfood);
	var feedsleft = getfeeds(typefood);
	var leftout = getleftout(feedsleft);
	var lastfeed = getlastfeed(leftout);
	if (prior) {lastfeed["newspot"] = checknewspot(priordict["newspot"]);} // check it here in case there is no food left.
	var logicarr = logic(settings, lastfeed, prior, priordict);
	Write(logicarr, settings, prior);
	rmnotification(settings);
	writemessage(settings, prior, lastfeed["newspot"]);
	waterbutton(settings, logicarr);
	addrefresh(settings);
	autosnail(settings);
	if (settings.debug) {console.log(logicarr);}
}