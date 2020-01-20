function insertspot(msg, spot) {
	if (msg.length > 1) {
		var Final = msg;
		for (i = msg.length-1; i > 0; i--) {
			Final.splice(i, 0, spot);
		}
		return Final.join("");
	} else {
		return msg[0];
	}
}

function insertpd(pinklist, pinkmsg) {
	if (pinklist.length > 1) {
		var Final = pinklist;
		for (i = Final.length-1; i > 0; i--) {
			Final.splice(i, 0, pinkmsg);
		}
		return Final.join("");
	} else {
		return pinklist[0];
	}
}

function pluralhandler(critter) {
	var plurallist = ["Mouse", "Wolf", "Sweettooth", "mice", "wolf"]; // only needed when > 1 word 
	var plural = {
			"Mouse": "Mice",
			"Wolf": "Wolves",
			"Sweettooth": "Sweettoothes",
			"mouse": "mice", // lowercases are for if people set custom names in lowercase forms so that it will still do this right
			"wolf": "wolves"
		};

	for (i = 0; i < plurallist.length; i++) {
		if (critter.includes(plurallist[i])) {
			var newplural = plural[plurallist[i]];
			critter = critter.split(plurallist[i])[0] + newplural;
			return critter;
		}
	}
	
	if (critter.toLowerCase().includes("fish") && critter != "Kingfisher") {
		return critter;
	}
	if (plural[critter] != undefined) {
		return plural[critter];
	}
	if (critter.toLowerCase().includes("pair")) {
		return "Pairs" + critter.split("Pair")[1]
	}
	if (critter.toLowerCase() == "pegasus") {
		return "Pegasi"
	}
	if (critter.toLowerCase().slice(-1) == "s") { // pair of magpies
		return critter+"es"
	}
	if (critter.toLowerCase().slice(-1) == "y") { // bunny, 
		return critter.slice(0, critter.length-1) +"ies"
	}
	return critter + "s"
}
function formatcustomnames(settings) {
	var data = settings.customcritterdata
	var datadict = {}
	var lastopen = -1
	console.log(data)
	try {
		for (i = 0; i < data.length; i++) {
			if (lastopen == -1) {
				if (data[i] == "(") {
					lastopen = i
				}
			} else if (data[i] == ")") {
				var whole = data.slice(lastopen+1,i)
				datadict[whole.split("=")[0].toLowerCase().replace(/\s/g, '')]=whole.split("=")[1].trim();
				lastopen = -1
			}
		}
	} catch { 
	datadict = false
	}
	console.log(datadict)
	return datadict
}
function formatmessage(settings, prior, spotlist, current) {
	if (prior && spotlist && settings.newspotmsg) {
		var pdspotted = false;
		if (prior["pd"] || current["pd"]) {
			pdspotted = true;
		}
		var msg = settings.newmsgtext.split("(critter)");
		var spot = "";
		var counts = {};
		var countc = {};
		var finallist = [];
		if (settings.customcritternames) {
			console.log(settings)
			var formatedcustomnames = formatcustomnames(settings)
			if (!formatedcustomnames) {
				return "There is an error in your formatting in custom critter names! Please ensure that you have exactly one equals sign within each pair of parentheses"
			}
		}
		for (i = 0; i < spotlist.length; i++) {
			x = spotlist[i].split('amp;').join('');// somewhat hack way of doing this, need to find out why some & symbols show up as &amp;
			if (settings.customcritternames && x.toLowerCase().replace(/\s/g, '') in formatedcustomnames) {
				x = formatedcustomnames[x.toLowerCase().replace(/\s/g, '')]
			}
			counts[x] = (counts[x] || 0)+1;
			if (!(finallist.includes(x)) && x != "") {
				finallist.push(x);
			} else {
			}
		}
		
		finallist.forEach(function(part, index) {
			
			if (counts[part] != 1) { // plural
				this[index] = `${counts[part]} ` + pluralhandler(part);
			} else { // singular
				var vowels = "aeio"; // left out u as it is handled below (because of unicorn)
				var nogrammar = 
				["goldilocks",
				"jack", 
				"snow white",
				"blusher",
				"jolly",
				"wheezy",
				"grouchy",
				"prof",
				"snoozy",
				"dozy"]
				if (part.toLowerCase().includes("the ") || nogrammar.includes(part.toLowerCase())) {
					var grammartype = "";
				} else if (vowels.includes(part[0].toLowerCase()) || part == "Ugly Duckling") {
					var grammartype = 'an ';
				} else {
					var grammartype = 'a ';
				}
				this[index] = grammartype + part;
			}
		}, finallist);
		
		if (settings.msglowercase) {
			finallist.forEach(function(part, index) {
				this[index] = part.toLowerCase();
			}, finallist);
		}
		
		if (finallist.length == 1) {
			spot = finallist[0];
		} else if (finallist.length == 2) {
			spot = finallist[0] + " and " + finallist[1];
		} else if (finallist.length == 3) {
			spot = finallist[0] + ", " + finallist[1] + ", and " + finallist[2];
		} else if (finallist.length == 4) {
			spot = finallist[0] + ", " + finallist[1] + ", " + finallist[2] + ", and " + finallist[3];
		} else {
			console.log("Something weird happened: " + finallist);
		}
		
		
		msg = insertspot(msg, spot);
		var pinklist = msg.split("(pd)");
		if (pdspotted) {
			var pinktext = settings.pdtext;
			msg = insertpd(pinklist, pinktext);
		} else {
			msg = pinklist.join("");
		}
		if (settings.debug) {console.log(msg);}
	return msg;
	} else if (settings.automsg && !prior) {
		return settings.msg;
	} 
}