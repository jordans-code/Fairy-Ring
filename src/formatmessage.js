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

function insertcondensed(condensedmsg, condensedspot) {
	if (condensedmsg.length > 1) {
		var Final = condensedmsg;
		for (i = Final.length-1; i > 0; i--) {
			Final.splice(i, 0, condensedspot);
		}
		return Final.join("");
	} else {
		return condensedmsg[0];
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

function condenser(critter) {
	var condense = {
	  "Field Mouse": "FM",
	  "White Mouse": "WM",
	  "Pygmy Mouse": "PM",
	  "Antillean Crested Hummingbird":"ACH",
	  "Australian King Parrot":"AKP",
	  "Brown Bunny":"BB",
	  "Baby Blue Caterpillar":"BBC",
	  "Big Bad Wolf":"BBW",
	  "Birthday Dodo":"BD",
	  "Birthday Field Mouse": "BFM",
	  "Birthday Unicorn": "BU",
	  "Birthday Wriggly Red Caterpillar": "BWRC",
	  "Birthday Mermaid": "BM",
	  "Birthday Badger": "BB",
	  "Birthday Kinkajou": "BK",
	  "Birthday Wise Fairy": "BWF",
	  "Birthday Orangutan": "BO",
	  "Birthday Albino Raccoon": "BAR",
	  "Red Chameleon": "RC",
	  "Orange Chameleon": "OC",
	  "Yellow Chameleon": "YC",
	  "Green Chameleon": "GC",
	  "Blue Chameleon": "BC",
	  "Indigo Chameleon": "IC",
	  "Violet Chameleon": "VC",
	  "Rainbow Chameleon": "RC",
	  "Blossomcrown Hummingbird":"BCH",
	  "Broad Billed Hummingbird":"BBH",
	  "Dancing Firewing Butterfly":"DFB",
	  "Easter Bunny":"EB", 
	  "Elf Field Mouse":"EFM",
	  "Elf Mallard":"EM", 
	  "Elf Pygmy Mouse":"EPM", 
	  "Elf White Mouse":"EWM", 
	  "Festive Field Mouse":"FFM", 
	  "Festive White Mouse":"FWM",
	  "Festive Pygmy Mouse":"FPM",
	  "Forest Leafwing Butterfly":"FLB", 
	  "Fluffy Violet Caterpillar":"FVC", 
	  "Giant Anteater":"GA", 
	  "Golden Dragon":"GD", 
	  "Golden Dart Frog":"GDF", 
	  "Ghostly Field Mouse":"GFM", 
	  "Golden Lion Tamarin":"GLT", 
	  "Hedgehog":"HH", 
	  "Kingfisher": "KF",
	  "Lazy Indigo Caterpillar":"LIC", 
	  "Minty Green Caterpillar": "Minty",
	  "Mystic River Butterfly":"MRB", 
	  "Moonlight Tranquility Butterfly":"MTB", 
	  "Mellow Yellow Caterpillar":"MYC", 
	  "Pink Fairy Armadillo":"PFA", 
	  "Pushmi-Pullyu":"PP", 
	  "Prickly Orange Caterpillar":"POC", 
	  "Rainbow Butterfly":"RB", 
	  "Rainbow Dragon":"RD", 
	  "Red Squirrel":"RS", 
	  "Saw Billed Hummingbird":"SBH", 
	  "Singing Bushlark":"SBL", 
	  "Sunset Dreamer Butterfly":"SDB", 
	  "Summer Field Mouse":"SFM",
	  "Summer White Mouse":"SWM",
	  "Summer Pygmy Mouse":"SPM",
	  "Summer Mallard":"SM",
	  "Rainbow Queen Bee":"RQB",
	  "Shimmering Musicwing Butterfly":"SMB", 
	  "Sunlight Sparklewing Butterfly":"SSB", 
	  "Swallow Tailed Hummingbird":"STH", 
	  "Topiary Black Unicorn":"TBU", 
	  "Topiary Golden Unicorn":"TGU", 
	  "Topiary Meerkat":"TopKat", 
	  "Topiary Rainbow Unicorn":"TRU", 
	  "Topiary Unicorn":"TU", 
	  "Topiary Winged Unicorn":"TWU", 
	  "Topiary White Unicorn":"TWU", 
	  "Unicorn":"Uni", 
	  "Violet Headed Hummingbird":"VHH", 
	  "Violet Sabrewing Hummingbird":"VSH", 
	  "Water Dragon":"WD", 
	  "Wriggly Red Caterpillar":"WRC", 
	  "Zombie Field Mouse":"ZFM", 
	  "Zombie Mallard":"ZM", 
	  "Zombie Pygmy Mouse":"ZPM", 
	  "Zombie White Mouse":"ZWM"
		
	}
	var newcrit = condense[critter];
	if (newcrit != undefined) {
		return newcrit;
	} else {
		return critter;
	}
}

function pluralhandler(critter) {
	var plurallist = ["Mouse", "Wolf", "Fairy", "Butterfly"];
	var plural = {
			"Mouse": "Mice",
			"Wolf": "Wolves",
			"Fairy": "Fairies",
			"Butterfly": "Butterflies"
			
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
	return critter + "s"
}

function formatmessage(settings, prior, spotlist, current) {
	if (prior && spotlist && settings.newspotmsg) {
		var pdspotted = false;
		if (prior["pd"] || current["pd"]) {
			pdspotted = true;
		}
		var msg = settings.newmsgtext.split("(critter)");
		var spot = "";
		var condensedspot = "";
		var counts = {};
		var countc = {};
		var finallist = [];
		var condensedlist = [];
		for (i = 0; i < spotlist.length; i++) {
			x = spotlist[i].split('amp;').join('');// somewhat hack way of doing this, need to find out why some & symbols show up as &amp;
			counts[x] = (counts[x] || 0)+1;
			if (!(finallist.includes(x)) && x != "") {
				finallist.push(x);
			} else {
			}
		}
		for (i = 0; i < spotlist.length; i++) {
			x = condenser(spotlist[i].split('amp;').join(''));
			countc[x] = (countc[x] || 0)+1;
			if (!(condensedlist.includes(x)) && x != "") {
				condensedlist.push(x);
			} else {
			}
		}
		condensedlist.forEach(function(part, index) {
			if (countc[part] != 1) { // plural
				this[index] = pluralhandler(part, true);
			} else { // singular
				this[index] = part;
			}
		}, condensedlist);
		
		
		finallist.forEach(function(part, index) {
			
			if (counts[part] != 1) { // plural
				this[index] = `${counts[part]} ` + pluralhandler(part);
			} else { // singular
				var vowels = "aeio"; // left out u as it is handled below (because of unicorn)
				if (vowels.includes(part[0].toLowerCase()) || part == "Ugly Duckling") {
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
			condensedlist.forEach(function(part, index) {
				this[index] = part.toLowerCase();
			}, condensedlist);
		}
		
		if (finallist.length == 1) {
			spot = finallist[0];
			condensedspot = condensedlist[0];
		} else if (finallist.length == 2) {
			if (pdspotted) {
				spot = finallist[0] + " and " + finallist[1];
				condensedspot = condensedlist[0] + " & " + condensedlist[1];
			} else {
				condensedspot = condensedlist[0] + " & " + condensedlist[1];
				spot = finallist[0] + " and " + finallist[1];
			}
		} else if (finallist.length == 3) {
			if (pdspotted) {
				spot = finallist[0] + ", " + finallist[1] + ", " + finallist[2];
			} else {
				spot = finallist[0] + ", " + finallist[1] + ", and " + finallist[2];
			}
			condensedspot = condensedlist[0] + ", " + condensedlist[1] + ", " + condensedlist[2];
		} else if (finallist.length == 4) {
			if (pdspotted) {
				spot = finallist[0] + ", " + finallist[1] + ", " + finallist[2] + ", " + finallist[3];
			} else {
				spot = finallist[0] + ", " + finallist[1] + ", " + finallist[2] + ", and " + finallist[3];
			}
			condensedspot = condensedlist[0] + ", " + condensedlist[1] + ", " + condensedlist[2] + ", " + condensedlist[3];
		} else {
			console.log("Something weird happened: " + finallist);
		}
		
		if (condensedlist.length == 1) {
			condensedspot = condensedlist[0];
		} else if (condensedlist.length == 2) {
			if (pdspotted) {
				condensedspot = condensedlist[0] + ", " + condensedlist[1];
			} else {
				condensedspot = condensedlist[0] + " & " + condensedlist[1];
			}
		} else if (condensedlist.length == 3) {
			condensedspot = condensedlist[0] + ", " + condensedlist[1] + ", " + condensedlist[2];
		} else if (condensedlist.length == 4) {
			condensedspot = condensedlist[0] + ", " + condensedlist[1] + ", " + condensedlist[2] + ", " + condensedlist[3];
		} else {
			console.log("Something weird happened: " + finallist);
		}
		
		msg = insertspot(msg, spot);
		var condensedmsg = msg.split("(crittercondensed)");
		msg = insertcondensed(condensedmsg, condensedspot);
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