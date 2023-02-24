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
			if (csplit[0][0] == "<") { // remove the "move left"
				csplit[0] = csplit[0].slice(1);
			}
			if (escape(csplit[0][1]) == "%A0" || escape(csplit[0][1]) == "%20") { // fairyland will randomly put either 1 or 2 spaces in the beginning...
			csplit[0] = csplit[0].slice(2);
			} else if (escape(csplit[0][0]) == "%A0" || escape(csplit[0][0]) == "%20"){
				csplit[0] = csplit[0].slice(1);
			}
			Final[i]["name"] = csplit[0];
			var name = Final[i]["name"];
			if (name == "Veggies" ||
				name == "Bamboo" ||
				name == "Frogspawn" || 
				name == "Grass" || 
				name == "Treasure" || 
				name == "Water" || 
				name == "Straw" || 
				name == "Wood" || 
				name == "Bricks" || 
				name == "Comfits" ||
				name == "Tarts" ||
				escape(name) == "Hot%A0%A0Porridge" ||
				escape(name) == "Cold%A0%A0Porridge") { // These use different spaces so are not split
				Final[i]["string"] = csplit.slice(1);
			} else if (name == "Eat" || name[2] + name[3] == "th") { // the only 3 word foods
				Final[i]["string"] = csplit.slice(3);
			} else { // all other food types are 2 words
				Final[i]["string"] = csplit.slice(2); 
			}
		}
	}
	Final['ActiveFood'] = ActiveFood;
	return Final;
}

/*
0 = SF
1 = Organic
2 = Organic Double
3 = Organic Triple
4 = Regular
5 = Regular Double
6 = Regular Triple
7 = Cake
*/


function gettype(dict) { // determines type of food then removes from string
	var ActiveFood = dict['ActiveFood'];
	var Final = dict;
	for (var z = 0; z < ActiveFood.length; z++) {
		var i = ActiveFood[z];
		var current = Final[i];
		var statusindex = 0;
		if (current.string[1].includes("Status")) {
			statusindex = 1;
		}
			if (current.string[0].includes("Super")) {
				Final[i]["type"] = 0;
			} else if (current.string[statusindex].includes("Organic") && current.string[0].includes("Triple")) {
				Final[i]["type"] = 3;
			} else if (current.string[statusindex].includes("Organic") && current.string[0].includes("Double")) {
				Final[i]["type"] = 2;
			} else if (current.string[statusindex].includes("Organic")) {
				Final[i]["type"] = 1;
			} else if (current.string[statusindex].includes("Regular") && current.string[0].includes("Double")) {
				Final[i]["type"] = 5;
			} else if (current.string[statusindex].includes("Regular") && current.string[0].includes("Triple")) {
				Final[i]["type"] = 6;
			} else if (current.string[statusindex].includes("Regular")) {
				Final[i]["type"] = 4;
			} else {
				console.log(current.string);
				console.log("Unknown Food!");
			}
			if (statusindex == 1) { // remove two word food types
				Final[i]["string"] = Final[i]["string"].slice(1);
			}
			var spacetype = "  "; // %A0
			if (escape(Final[i]["string"][0]).includes("%20")) {
				spacetype = "  "; // %20
			}
			Final[i]["string"][0] = Final[i]["string"][0].split(spacetype)[1];
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
		console.log(one);
		console.log(two);
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

function AliceRemover(thedict) {
	var test = thedict["string"]
	var filteredlist = []
	for (var z=0; z < test.length; z++) {
		if (test[z] != "" &&
			test[z] != "\n" &&
			test[z] != "(Leftmost" &&
			test[z] != "(Middle" &&
			test[z] != "(Rightmost" &&
			test[z] != "card" &&
			test[z] != "too" &&
			test[z] != "high)Arrived" &&
			test[z] != "low)Arrived" &&
			test[z] != "correct!)Arrived") {
			filteredlist.push(test[z])
		} else if (test[z] == "high)Arrived" || test[z] == "low)Arrived" || test[z] == "correct!)Arrived") {
			filteredlist.push("Arrived")
			
		}
	}

	thedict["string"] = filteredlist
	return thedict
}

function getlastfeed(dict) { // Returns dict after adding values for what, if any, was the last to eat from food and when
	var ActiveFood = dict['ActiveFood'];
	var Final = dict;
	for (var i = 0; i < ActiveFood.length; i++) {
		var z = ActiveFood[i];
		var current = Final[z];
		var current = AliceRemover(current)
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
		
		var mindex = current["string"].findIndex(matchesarrived); // index that "arrived" is at
		var seconds = 0;
		var visitor = "";
		if (current["string"][1].includes("Diamonds]")) {
			var prefix = "Diamonds]"
		} else if (current["string"][1].includes("Attracted\n")){
			var prefix = "Attracted\n"
		} else {
			var prefix = "Attracted"
		}
		if ((mindex - 1) == 5) {
				visitor += current["string"][1].split(prefix)[1] + " " + current["string"][2] + " "+ current["string"][3] + " "+ current["string"][4] + " " + current["string"][5] + " " + current["string"][6].split("Arrived")[0]
		} else if ((mindex - 1) == 4) { // previously 3 word starting at 2
				visitor += current["string"][1].split(prefix)[1] + " " + current["string"][2] + " "+ current["string"][3] + " "+ current["string"][4] + " "+ current["string"][5].split("Arrived")[0]
			//visitor += current["string"][2] + " " + current["string"][3] + " " + current["string"][4]
		} else if ((mindex - 1) == 3) { // 4 word, index 1-4
				visitor += current["string"][1].split(prefix)[1] + " " + current["string"][2] + " "+ current["string"][3] + " "+ current["string"][4].split("Arrived")[0]
		} else if ((mindex - 1) == 2) { // 3 word, index 1-3
				visitor += current["string"][1].split(prefix)[1] + " " + current["string"][2] + " " + current["string"][3].split("Arrived")[0]
		} else if ((mindex - 1) == 1) { // 2 word, index 1-2
				visitor += current["string"][1].split(prefix)[1] + " " + current["string"][2].split("Arrived")[0]
		} else if ((mindex - 1) == 0) { // 1 word, index 1
			visitor += current["string"][1].split(prefix)[1].split("Arrived")[0]
		} else {
			console.log("Mindex error!" + mindex-1)
		}
		visitor = visitor.trim()
		/*
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
		*/
		
		Final[z]["lastvisitor"] = visitor;
		seconds += gettime(current["string"][mindex + 1], current["string"][mindex + 2]);
		var notspotted = 0;
		var agoStayedindex = current["string"].indexOf("agoStayed", 1)
		
		if (agoStayedindex < 13 && agoStayedindex > 0) {
			notspotted += gettime(current["string"][agoStayedindex+1], current["string"][agoStayedindex+2])
			if (current["string"][agoStayedindex+3].includes("but")) {
			} else {
				notspotted += gettime(current["string"][agoStayedindex+3], current["string"][agoStayedindex+4])
			}
		}
		if (current["string"][mindex+3].includes("ago")) {
			Final[z]["lastfeed"] = seconds;
		} else {
			seconds += gettime(current["string"][mindex + 3], current["string"][mindex + 4]);
		}
		Final[z]["notspotted"] = notspotted;
		Final[z]["lastfeed"] = seconds;
	}
	return Final;
}

function getcolor(percent, settings, type) { // takes a percentage and matches it to the thresholds set by user
	var border = false;
	switch(type) {
		case "GardenBorder":
			var percentvar = "threshold";
			var colorvar = "threshold";
			var border = true;
			break;
		case "NormalGlow":
			var percentvar = "threshold";
			var colorvar = "threshold";
			break;
		case "WindowGlow":
			var percentvar = "Windowthreshold";
			var colorvar = "Windowthreshold";
			break;
		case "NormalText":
			var percentvar = "threshold";
			var colorvar = "TextColorthreshold";
			break;
		case "WindowText":
			var percentvar = "Windowthreshold"
			var colorvar = "WindowTextColorthreshold";
			break;
	}
	for (i=1; i < 7; i++) {
		if (i == 1 && percent <= (parseFloat(settings[`${percentvar}${i}`])/100)) {
			if (border && settings[`threshold${i}border`] == "inner") {
				console.log("Inner");
				return '#' + settings[`TextColorthreshold${i}c`];
			}
			return '#' + settings[`${colorvar}${i}c`];
		} else if (percent < (parseFloat(settings[`${percentvar}${i}`])/100)) {
			if (border && settings[`threshold${i}border`] == "inner") {
				console.log("Inner");
				return '#' + settings[`TextColorthreshold${i}c`];
			}
			return '#' + settings[`${colorvar}${i}c`];
		} else if (i == 6) {
			if (border && settings[`threshold${i}border`] == "inner") {
				console.log("Inner");
				return '#' + settings[`TextColorthreshold${i}c`];
			}
			return '#' + settings[`${colorvar}${i}c`];
		}
	}
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
			if (settings.statuschance) {
				StatusChance(0);
			}
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
			var NormGlow = getcolor(percentdecimal, settings, "NormalGlow");
			var NormColor = getcolor(percentdecimal, settings, "NormalText");
		} else {
			var NormGlow = "black";
			var NormColor = "white";
		}
		var seconds = dict[z]["math3"];
		var righthours = Math.floor(dict[z]["math2"] / 3600);
		var rightminutes = Math.round(((dict[z]["math2"] / 3600) - righthours) * 60);
		if (rightminutes == 0) {
			var righttotal = righthours + "h";
		} else {
			var righttotal = righthours + "h " + rightminutes + "m";
		}
		if (settings.colorwindow) {
			var WindowGlow = getcolor((seconds/dict[z]["math2"]), settings, "WindowGlow");
			var WindowColor = getcolor((seconds/dict[z]["math2"]), settings, "WindowText");
		} else {
			var WindowGlow = "black";
			var WindowColor = "white";
		}
		var bottom = "";
		percent = Math.floor(percentdecimal * 1000)/10;
		duepercentarr.push(dict[z]["math1"]);
		if (settings.foodoverlay) {
			var foodheightoffset = 44
			if (dict[z].name == "Treasure") {
				foodheightoffset = 111
			} else if (dict[z].name == "Birthday" || dict[z].name.trim()[2] + dict[z].name.trim()[3] == "th" ) {
				foodheightoffset = 88
			} else if (dict[z].name == "Grass") {
				foodheightoffset = 55
			} else if (dict[z].name == "Eat") {
				foodheightoffset = 75
			}
			if (dict[z].name == "Water") {
				var position = 0
			} else {
				var position = parseInt($('.planttd').eq(z).children().eq(0).children().eq(0).children().eq(0).children('img[src*="byo_food"]').css('bottom').split("px")[0])
			}
			var adjustedpos = position+foodheightoffset
			
			var hours = seconds / 3600;
			var rhours = Math.floor(hours);
			var minutes = (hours - rhours) * 60;
			var rminutes = Math.round(minutes);
			if (seconds <= -3600) {
				seconds *= -1
				var hours = seconds / 3600;
				var rhours = Math.floor(hours);
				var minutes = (hours - rhours) * 60;
				var rminutes = Math.round(minutes);
				bottom = `<div class="foodwindow${i}"><center><font color="${WindowColor}";><span id="foodwindowZ${i}">-${rhours}h${rminutes}m</span></font><font color="white";>/${righttotal}</font></center></div>`;
			} else if (seconds < 0) {
				bottom = `<div class="foodwindow${i}"><center><font color="${WindowColor}";><span id="foodwindowZ${i}">${Math.floor(seconds/60)}m</span></font><font color="white";>/${righttotal}</font></center></div>`;
			} else if (seconds < 3600) {
				bottom = `<div class="foodwindow${i}"><center><font color="${WindowColor}";><span id="foodwindowZ${i}">${Math.floor(seconds/60)}m</span></font><font color="white";>/${righttotal}</font></center></div>`;
			} else if (seconds >= 3600) {
				bottom = `<div class="foodwindow${i}"><center><font color="${WindowColor}";><span id="foodwindowZ${i}">${rhours}h ${rminutes}m</span></font><font color="white";>/${righttotal}</font></center></div>`;
			} else {
				bottom = "Error.";
			}
			var Final = `<div class="foodpercent${i}"><center><font size="4px"; color="${NormColor}";>${percent}%</font></center></div>`;
			if (dict[z]["name"] == "Water") { // Water (birdbath) has formatting issues, this makes it so text doenst clip inside it
				//$('.planttd').eq(z).prepend("<br><br><br><br><br><br>");
				adjustedpos=90
			}
			else if (dict[z]["name"] == "Afternoon") { // Afternoon tea has formatting issues, this makes it so text doenst clip inside it
				//$('.planttd').eq(z).prepend("<br><br><br><br><br><br>");
				if ($('.planttd').eq(z).children()[0].innerHTML.includes("byo_table/top")) {
					adjustedpos=73
				} else {
				adjustedpos=168
				}
			}
			
			else if ($('.planttd').eq(z).children()[0].innerHTML.includes("byo_table/top")) {
				if(settings.debug){console.log("Custom mini-plate detected")};
				if (dict[z].name == "Birthday" || dict[z].name.trim()[2] + dict[z].name.trim()[3] == "th") {
					//$('.planttd').eq(z).prepend('<br><br><br><br><br>');
					adjustedpos = 60
				} else if (dict[z].name == "Eat") {
					adjustedpos = 65
				}
				else {
					adjustedpos = 25
					//$('.planttd').eq(z).prepend('<br><br>');
				}
			}
			
			$('.planttd').eq(z).prepend(bottom);
			$('.planttd').eq(z).prepend(Final);
			
			$(`.foodwindow${i}`).css('textShadow',`-1px -1px 0 black,1px -1px 0 black,-1px 1px 0 black,1px 1px 0 black`);
			$(`.foodwindow${i}`).css('position', "relative");
			$(`.foodwindow${i}`).css('bottom', `${adjustedpos}px`);
			$(`.foodwindow${i}`).css('z-index', "999");
			$(`.foodwindow${i}`).css('white-space', "nowrap");

			$(`#foodwindowZ${i}`).css('textShadow',`-1px -1px 0 ${WindowGlow},1px -1px 0 ${WindowGlow},-1px 1px 0 ${WindowGlow},1px 1px 0 ${WindowGlow}`);
			
			$(`.foodpercent${i}`).css('textShadow',`-1px -1px 0 ${NormGlow},1px -1px 0 ${NormGlow},-1px 1px 0 ${NormGlow},1px 1px 0 ${NormGlow}`);
			$(`.foodpercent${i}`).css('position', "relative");
			$(`.foodpercent${i}`).css('bottom', `${adjustedpos}px`);
			$(`.foodpercent${i}`).css('z-index', "999");

		}
	}
	if (duepercentarr.length == 2 ) {
		var duepercent = 1 - ((1 - duepercentarr[0]) * (1 - duepercentarr[1]));
	} else if (duepercentarr.length == 3 ) {
		var duepercent = 1 - ((1 - duepercentarr[0]) * (1 - duepercentarr[1]) * (1 - duepercentarr[2]));
	} else if (duepercentarr.length == 4 ) { // birdbath
		var duepercent = 1 - ((1 - duepercentarr[0]) * (1 - duepercentarr[1]) * (1 - duepercentarr[2]) * (1 - duepercentarr[3]));
	} else if (duepercentarr.length == 5 ) { // birdbath + tophat
		var duepercent = 1 - ((1 - duepercentarr[0]) * (1 - duepercentarr[1]) * (1 - duepercentarr[2]) * (1 - duepercentarr[3]) * (1 - duepercentarr[4]));
	} else {
		var duepercent = duepercentarr[0];
	}
	//'<div id="questbar" style="position:absolute;top:29px;left:548px;font-weight:bold;cursor:pointer" onclick="showInfo(20,null);">3050</div>');
	if (settings.debug) {console.log("There is a " + (Math.floor(duepercent*1000))/10 + "% overall chance that this garden contains wildlife.");}
	if (settings.statuschance) {
		StatusChance(duepercent);
	}
	if (settings.toprightchance) {
		TopRightChance(duepercent, prior);
	}
	var color;
	color = getcolor(duepercent, settings, "GardenBorder");
	if (settings.colorborder) {
		ColorBorder(color);
	}
	}
}


function checknewspot(oldspot) {
	var spot = $('.standard_message.status').children().eq(0).children().eq(1).html();
	if (spot == null || spot == "") {
		return false;
	} else if (oldspot == undefined || oldspot == false) {
		return [spot];
	} else {
		oldspot.push(spot);
		return oldspot;
	}
}

function checkforpd(prior) {
	var pdtemp = $(".standard_message")[0].innerText;
	if (pdtemp != undefined && pdtemp.includes("Pink Diamond")) {
		return true;
	} else {
		return false;
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
		var mtimeAdjusted = mtime - type["minftime"]
		var vtime = current["leftout"];
		var activetime = vtime - type["minftime"];
		if (activetime < 0) {
			
			if (settings.debug) {console.log("There is no chance of wildlife here currently.");
				console.log("The plate was left out " + vtime/60 + "mins ago");
				console.log("There is a dead time of " + type["minftime"]/60 + "mins in which nothing can come for this food type, so we must subtract this from the above and also from the activetime to shift the window. New max time: " + mtimeAdjusted/60+ "mins")
				console.log("Subtracting the above number from the time that the food was left out gives us the active time. Wildlife cannot come for another: " + activetime/60 + "mins")
			}
			return [0, mtimeAdjusted, activetime, water];
		}
		if (activetime > maxtime) {
			overtime = activetime - maxtime;
			time = maxtime;
		} else {
			time = activetime;
		}
		if (water < activetime) {
			if (settings.debug) {console.log("LastWater < activetime detected, changing the new activetime to the last water time.             Water (new activetime):" + water/60 +  "  Previous Activetime:" + activetime/60);}
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
		
		var fin = [time / (mtimeAdjusted - overtime), mtime];
		fin.push(activetime);
		fin.push(water);
		if (settings.debug) {
		console.log("This food type's max time between first visits is " + mtime/60 + "mins");
		console.log("There is a dead time of " + type["minftime"]/60 + "mins in which nothing can come, so we must subtract this from the above and also from the activetime to shift the window. New max time: " + mtimeAdjusted/60)
		console.log("This food was left out " + vtime/60 + "mins ago.");
		console.log("The dead time for first feeds for this food (time before something can come) is " + type["minftime"]/60 + "mins")
		console.log("Subtracting the above number from the time that the food was left out gives us the active time (time that the plate has been able to have wildlife on it): " + activetime/60 + "mins ago")
		console.log("There is " + Math.floor(fin[0]*100) + "% chance that wildlife is here. Activetime (if over 60 or someone waters then its rolled into overtime) / (max time between visits - overtime" + ` ${time/60} / (${mtime/60}-${overtime/60})`);}
		return fin;
	} else { // not fresh
		var mtime = type["maxtime"];
		if (current["notspotted"] > 0) { // if the stay time is known calculate off this, otherwise go off defaults
			var vtime = current["notspotted"];
			if (settings.debug) {console.log(current["lastvisitor"] + " visited " + lfeed/60 + " mins ago and stayed for " + vtime/60 + " mins, the current slot opened at the end of that.");}
		} else {
			if (type["issuperfood"] == true) {
				if (settings.debug) {
					console.log("Superfood detected, using max time instead of min");
				}
				var vtime = maxtimes[current["lastvisitor"]]*60;
			} else {
				var vtime = mintimes[current["lastvisitor"]]*60;
			}
			if (settings.debug) {console.log(current["lastvisitor"] + " visited " + lfeed/60 + " mins ago. This creature's minimum stay time (if its SF it's actually max here) is " + vtime/60 + " mins, the new window/activetime starts as soon as it left.");}
		}
		var activetime = ((lfeed - vtime))
		if (settings.debug) {console.log("The last wildlife departed this long ago in minutes (it hasn't departed yet if it's negative): " + activetime/60)}
		var activetime = ((lfeed - vtime)-type["mintime"])
		if (settings.debug) {console.log("The dead time in which wildlife can't come for this food type is " + type["mintime"]/60 +" mins, so subtracting this from the above # we get the time that the next wildlife can come (Window hasnt opened yet if its a negative): " + activetime/60)};
		if (settings.debug) {console.log("This slot has been opened for at least " + activetime/60 + " minutes")}
		var newmtime = mtime - vtime;
		if (settings.debug) {
			console.log("Because the max time between visits is " + mtime/60 + " for this food type and the last creature stayed for " + vtime/60 + ", the new maximum time before the next arrival is " + newmtime/60 + " since the last critter left");
		}
		var newmtime = newmtime - type["mintime"]
		if (settings.debug) {
			console.log("Finally, we have to subtract the dead time from the max time before next arrival as well like we did the activetime. This is because it's still the same window and doesn't extend it any, but nothing can come during it so we have to shift everything. The new max time before something can come in mins is " + newmtime/60);
		}
		if (activetime < 0) {
			if (settings.debug) {console.log("There is no chance of wildlife here currently.");}
			return [0, newmtime, activetime, water];
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
		var fin = [time / (newmtime - overtime), newmtime];
		fin.push(activetime);
		fin.push(water);
		if (settings.debug) {console.log("There is " + Math.floor(fin[0]*100) + "% chance that wildlife is on this plate. Formula: Activetime (capped at 60 and reset on waters, over 60 or time before water is rolled into overtime) / (max time between visits - overtime " + ` ${time/60} / (${mtime/60}-${overtime/60})`);}
		return fin;
	}
}

function logic(settings, dict, prior, priordict) { // config values for timings and calls calc() to set percentages
	var ActiveFood = dict['ActiveFood'];
	var superfood = {
		"issuperfood": true,
		"minftime": 180, // 3 mins
		"maxftime": 4200, 
		"mintime": 300, // 5 mins
		"maxtime": 9000}; // 2hr 30 highest seen
	var organic = {
		"minftime": 1980, // 33 mins
		"maxftime": 6780, // 1 hr 53 mins 
		"mintime": 2520, // 42 mins
		"maxtime": 18000}; // 5 hours 
	var regular = {
		"minftime": 5580, // 1 hour 33 mins
		"maxftime": 12900, // 1 hour 53 mins 
		"mintime": 4980, // 1 hour 23 mins
		"maxtime": 21600}; // 6 hours
	var Final = dict;
	for (var z = 0; z < ActiveFood.length; z++) {
		var i = ActiveFood[z];
		var current = Final[i];
		var matharr;
		switch(current["type"]) {
			case 0: // SF
				matharr = calc(settings, superfood, current, prior, priordict, dict["newspot"]);
				break;
			case 1: // Organic
				matharr = calc(settings, organic, current, prior, priordict, dict["newspot"]);
				break;
			case 2: // Organic Double
				matharr = calc(settings, organic, current, prior, priordict, dict["newspot"]);
				break;
			case 3: // triple organic
			case 7: // cake
				matharr = calc(settings, organic, current, prior, priordict, dict["newspot"]);
				break;
			case 4: // Regular
				matharr = calc(settings, regular, current, prior, priordict, dict["newspot"]);
				break;
			case 5: // Regular Double
				matharr = calc(settings, regular, current, prior, priordict, dict["newspot"]);
				break;
			case 6: // Regular Triple
				matharr = calc(settings, regular, current, prior, priordict, dict["newspot"]);
				break;
			case 8: // Null
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
		if ($('a[title="New Message"]').children().eq(0)[0]) {
		$('a[title="New Message"]').children().eq(0)[0].innerHTML = $('a[title="New Message"]').children().eq(0)[0].innerHTML.split(" (<span")[0] // UGLY
		}
	}
} 

function hidewateringcan() { // removes the div for the watering can animation
	$('#watering')[0].remove()
}
function writemessage(settings, prior, spotlist, current) {
	formatted = formatmessage(settings, prior, spotlist, current, false); // formatmessage.js
	if (formatted != undefined) {
		$('#wall_message')[0].value = formatted;
	}
	ownernameinserter()
	
}

function autosnail(settings) { // Automatically does snail game for you
	if (settings.autosnail) {
		if (($('.wall_subtitle').length > 0 ) && ($('.wall_subtitle')[0].innerText == "Snail Racing!")) {
			var choice = parseInt(settings.snailchoice);
			var Final = (choice-1)*2
			$('.snailbox').children().eq(Final).click();
		}
	}
}
function waterbutton(settings, finaldict) { // allows clicking plants to water them

	var gardenobjs = $('.link');
	for (i = 0; i < gardenobjs.length; i++) {
		if (gardenobjs[i].innerHTML == "Water It") {
			var obj = gardenobjs[i];
			$('.link').eq(i).on("click", function() {  // Normal water button
				garden(settings, true, finaldict, false); // send past dictionary in case wildlife is spotted so it doesn't reset last water time.
			});
			if (settings.waterbutton) {
				var plantid = obj.outerHTML.slice(34, -23);
				$(`#plantdiv${plantid}`).attr('onclick', `water(${plantid},null)`);
				$(`#plantdiv${plantid}`).on("click", function() {
					garden(settings, true, finaldict, false); // send past dictionary in case wildlife is spotted so it doesn't reset last water time.
				});
			}
		} else if (gardenobjs[i].innerHTML == "Revive It!") {
			var obj = gardenobjs[i];
			$('.link').eq(i).on("click", function() {  // Normal water button
				garden(settings, true, finaldict, false); // send past dictionary in case wildlife is spotted so it doesn't reset last water time.
			});
			if (settings.waterbutton) {
				var plantid = obj.outerHTML.slice(34, -30);
				console.log(plantid)
				$(`#plantdiv${plantid}`).attr('onclick', `water(${plantid},'diamond')`);
				$(`#plantdiv${plantid}`).on("click", function() {
					garden(settings, true, finaldict, false); // send past dictionary in case wildlife is spotted so it doesn't reset last water time.
				});
			}
		}
	}
}

function addrefresh(settings) { // Adds listeners for the built in refresh buttons on the garden
 // refresh button
	$('#gardenrefresh_icon').on("click", function() {
			var tempcolor = $('#gardenrefresh_icon').eq(0).css("color");
			
			if (!(tempcolor == "rgb(0, 128, 0)")) {
				$('#gardenrefresh_icon').eq(0).css("color", "rgb(0, 128, 0)");
			garden(settings, true, false, false);
			}
	}); // Garden name button
	$('.gardenskin').eq(0).on("click", function() {
		var tempcolor = $('#gardenrefresh_icon').eq(0).css("color");
			
			if (!(tempcolor == "rgb(0, 128, 0)")) {
			$('#gardenrefresh_icon').eq(0).css("color", "rgb(0, 128, 0)");
			garden(settings, true, false, false);
		}
	});
}

function getvalue() {
	return $('scriptvalue').length;
}

function addopenall() {
	$(".wall_form").children().eq(1).append('<input id="openall" class="inputsubmit" style="float:right;border:1px outset #007f00;background-color:#007f00;padding-top: 4px" type=button value="Open All"/>');
	document.getElementById ("openall").addEventListener ("click", openurls, false);
}

function addnext() {
	$(".wall_form").children().eq(1).append('<input id="next" class="inputsubmit" style="float:right;border:1px outset #007f00;background-color:#007f00;padding-top: 4px" type=button value="Next"/>');
	document.getElementById ("next").addEventListener ("click", next, false);
}

function handlepostbtn() { // "Post"
	$('.inputsubmit').eq(0).attr('style','float: left;');
}

function checkunblocked() {
	if (($('#wallButton').length) == 0) {
		return false
	} else {
		return true
	}
}
function buttonhandler(settings) { // adds buttons on garden page
	handlepostbtn();
	if (settings.gardenExtraBtns) {
		window.sessionStorage.setItem("openedlinks", JSON.stringify([settings.flid]));
		if (checkunblocked()) {
			addnext();
			addopenall();
		}
	}
	if (settings.biggerBtns) {
		var defaultW = 10;
		var defaultH = 3;
		$('.inputsubmit').css('padding-top', ((defaultH + parseInt(settings.biggerBtnsSizeH)/2).toString() + 'px'));
		$('.inputsubmit').css('padding-bottom', ((defaultH + parseInt(settings.biggerBtnsSizeH)/2).toString() + 'px'));
		$('.inputsubmit').css('padding-left', ((defaultW + parseInt(settings.biggerBtnsSizeW)/2).toString() + 'px'));
		$('.inputsubmit').css('padding-right', ((defaultW + parseInt(settings.biggerBtnsSizeW)/2).toString() + 'px'));
		$('.inputsubmit').parent().eq(0).css('height', ((defaultH + parseInt(settings.biggerBtnsSizeH)+14).toString() + 'px'));
	} else {
		$('.inputsubmit').parent().eq(0).css('height', ('14px'));
	}
}

function getCurrentTime(){
	var date = new Date();
	return date.getTime()
}

function garden(settings, prior, priordict, addbuttons) { // calls all functions required when on a garden page
	var startTime = getCurrentTime()
	if (!prior) {
		var script = document.createElement('script');
		var scriptvalue = document.createElement('scriptvalue');
		(document.head).appendChild(scriptvalue);
		script.textContent = '$(document).bind("ajaxSend", function(){$("scriptvalue").remove();}).bind("ajaxComplete", function(){var scriptvalue = document.createElement("scriptvalue");scriptvalue.textContent = `true`;(document.head).appendChild(scriptvalue);});';
		(document.head||document.documentElement).appendChild(script);
		script.remove();
	}
	var total = 0;
	var interval = setInterval(function() { // 
		if (total > 200) {
			clearInterval(interval);
			console.log("Timed out");
		} else {
			total++;
		}
		var finishedloading = getvalue();
		if (finishedloading != 0) {
			if (!prior) {
				buttonhandler(settings);
				if (settings.hidewateringcan) {
					hidewateringcan();
				}
			}
			clearInterval(interval);
			$("scriptvalue").remove();
			var Plantarray = fetcher();
			var food = parser(Plantarray);
			var namedfood = getname(settings, food);
			var typefood = gettype(namedfood);
			var feedsleft = getfeeds(typefood);
			var leftout = getleftout(feedsleft);
			var lastfeed = getlastfeed(leftout);
			if (prior) {lastfeed["newspot"] = checknewspot(priordict["newspot"]);} // check it here in case there is no food left.
			var logicarr = logic(settings, lastfeed, prior, priordict);
			if (prior && !prior["pd"]) {logicarr["pd"] = checkforpd(logicarr["pd"])}
			Write(logicarr, settings, prior);
			rmnotification(settings);
			if (checkunblocked()) { writemessage(settings, prior, lastfeed["newspot"], logicarr); }
			waterbutton(settings, logicarr);
			if (addbuttons) {
			addrefresh(settings);
			}
			autosnail(settings);
			if (settings.debug) {console.log(logicarr);}
			if (settings.debug) {
				console.log("Fairy Ring finished everything in " + (getCurrentTime() - startTime).toString() + "ms")
			}
		} else {
			if (settings.debug) {console.log("AJAX not loaded yet, timing out for 50ms before rechecking");}
		}
	}, 50);
}