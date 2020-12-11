function getblocklist(settings) {
	if ($('#mainpage').children()[2].innerHTML.includes("{display:none")) {
		var unfiltered = $('#mainpage').children()[2].innerHTML.split("{display:none;}");
	} else {
		if (settings.debug) {
		console.log("Found no blocks, if you know you are blocking someone then please send in a bug report with the below info:");
		console.log($('#mainpage').children());
		console.log($('#mainpage').children()[2]);
		}
		return [];
	}
	var filtered = [];
	unfiltered.forEach(function(part, index) {
		if (part.length > 1) {
		if (part[0] == " ") {
			filtered.push(part.slice(5));
		} else {
		filtered.push(part.slice(4));
		}
		}
	}, unfiltered);
	return filtered;
}

function blockhandler(settings, wildlifesettings) {
	var blocklist = getblocklist(settings);
	if (settings.debug) {console.log(blocklist);}
	chrome.storage.local.set({blocktotal: blocklist.length, blockid: blocklist.reverse().join(", ")});
}

function openurls() { // handles "open all" button on wildlife page
	links = getlinks();
	for (i = 0; i < links.length; i++) {
		window.open(links[i]);
	}
}

function openurlspersist() { // handles "open all" button on wildlife page when persist option is checked, two functions because this one has to use a promise
	getlinkspersist().then(function(links) {
	console.log(links)
	console.log(links.length);
	for (i = 0; i < links.length; i++) {
		console.log(links[i]);
		window.open(links[i]);
	}
	console.log("done opening");
	});
}

async function getlinkspersist() {
	return new Promise((resolve, reject) => {
		try {
		var posts = $(".wall_postcontent");
		var links = [];
		var finaljawn = []
		chrome.storage.sync.get({flid: ""}, function(item) {
		chrome.storage.local.get({persistentsessionslist: []}, function(wildlifeitem) {
			finaljawn = wildlifeitem.persistentsessionslist
			console.log(finaljawn)
			for (i = 0; i < posts.length; i++) {
				var linkz = posts[i].getElementsByTagName("a")[0].toString();
				var linkid = linkz.split("=")[1];
				console.log(linkid)
				var flid = item.flid;
				if (!finaljawn.includes(flid)) {
					finaljawn.push(flid);
				}
			
			if (posts.eq(i).is(":visible") && !(finaljawn.includes(linkid))) {
				finaljawn.push(linkid);
				links.push(linkz);
				console.log(finaljawn);
			}
			updatetotals(finaljawn.length - 1);
			}
			chrome.storage.local.set({persistentsessionslist: finaljawn});
		console.log("final link return")
		console.log(links);
		resolve(links);
			}
		)})} catch (ex) {
			reject(ex);
		}
	});
}


function getlinks() { // returns array of links to gardens from wildlife page
	var posts = $(".wall_postcontent");
	var links = [];
		for (i = 0; i < posts.length; i++) {
			var linkz = posts[i].getElementsByTagName("a")[0].toString();
			var linkid = linkz.split("=")[1];
			var raw = window.sessionStorage.getItem("openedlinks");
			var openedlinks = JSON.parse(raw);
			if (posts.eq(i).is(":visible") && !(openedlinks.includes(linkid))) {
				openedlinks.push(linkid);
				console.log(openedlinks);
				var stringify = JSON.stringify(openedlinks);
				window.sessionStorage.setItem("openedlinks", stringify);
				if (window.location.pathname == "/fbfairy/wildlifewall.php") {
					updatetotals(openedlinks.length - 1);
				}
				links.push(linkz);
			} else {
				console.log(posts[i].getElementsByTagName("a")[0].toString() + " is blocking us or has already been opened, skipping.");
			}
		}
	return links;
}


function next() { // next page button
	if ($("span.link")[0].innerHTML == "Older Posts &gt;") {
		$("span.link").eq(0).click();
	} else if ($("span.link")[1].innerHTML == "Older Posts &gt;") {
		$("span.link").eq(1).click();
	}
}

function initialhtml(settings) {
	var persistent = "off";
	if (settings.persistentsessions) {
		var persistent = "on";
	}
	$('.wildlifetype').parent().eq(0).append(`<div id='totals' style='width: 370px; background-color: #ddeedd;padding:4px;border: 1px solid #aabbaa; margin-left: 10px; margin-right: 10px;'><center><span id='totalsspan'>You have opened 0 gardens for this creature during this session.</span></center><br><br>Note: This only keeps track of gardens opened through the <b>open all</b> button, the button will also ignore gardens which have already been opened this session. If the open all button does not respond, it is because you have already opened all of the gardens on that page.<br><hr><span id='persistentsession'>Persistent opened garden sessions is currently <b>${persistent}</b>.</span><br><br>If it is off, then your opened gardens will reset each time the page is refreshed. This also means that it will be different for each wildlife page you visit. <br><br>If it is on, then your opened gardens will persist across all wildlife pages until you click the 'clear opened gardens' button below. This means you can hunt on as many different pages as you want without opening the same gardens, but you have to manually reset when you want to start over.</div>`);
	if (settings.persistentsessions) {
		$('#totals').prepend('<center><input id="sessionclear" class="inputsubmit" style="padding-top: 15px; padding-bottom: 15px;border:2px outset #007f00;background-color:#007f00;" type=button value="Clear Opened Gardens"/></center><br>');
	}
}

function updatetotals(total) {
	if (total == -1) { total = 0 };
	$('#totalsspan')[0].innerText = `You have opened ${total} gardens during this session.`;
}

function wallhandler(settings, wildlifesettings) { // handles wildlife page buttons
		if(settings.debug){console.log(wildlifesettings);}
		initialhtml(settings);
		if (settings.persistentsessions) {
			try {
				updatetotals(wildlifesettings.persistentsessionslist.length - 1)
			} catch (e) {
				updatetotals("ERROR")
			}
		}
		if (settings.flid.length != 0) {
			window.sessionStorage.setItem("flid", true);
		}
		window.sessionStorage.setItem("openedlinks", JSON.stringify([settings.flid]));
		if ($(".mike_error").length == 0) { // If user is not on advert cooldown
		$(".wall_form").children().eq(1).append('<input id="openall" class="inputsubmit" style="border:1px outset #007f00;background-color:#007f00;padding-top: 4px" type=button value="Open All Gardens"/>');
		$(".wall_form").children().eq(1).append('<input id="next" class="inputsubmit" style="border:1px outset #007f00;background-color:#007f00;padding-top: 4px" type=button value="Next"/>');
		if (settings.persistentsessions) {
			document.getElementById ("openall").addEventListener ("click", openurlspersist, false);
				document.getElementById('sessionclear').addEventListener('click', function() {
					chrome.storage.local.set({persistentsessionslist: []});
					updatetotals(0);
				});
		} else {
			document.getElementById ("openall").addEventListener ("click", openurls, false);
		}
		document.getElementById ("next").addEventListener ("click", next, false);
		} else {
			$('<input id="next" class="inputsubmit" style="border:1px outset #007f00;background-color:#007f00" type=button value="Next"/>').insertAfter($(".mike_error"));
			$('<input id="openall" class="inputsubmit" style="border:1px outset #007f00;background-color:#007f00" type=button value="Open All Gardens"/>').insertAfter($(".mike_error"));
			if (settings.persistentsessions) {
				document.getElementById ("openall").addEventListener ("click", openurlspersist, false);
				document.getElementById('sessionclear').addEventListener('click', function() {
					chrome.storage.local.set({persistentsessionslist: []});
					updatetotals(0);
				});
			} else {
				document.getElementById ("openall").addEventListener ("click", openurls, false);
			}
			document.getElementById ("next").addEventListener ("click", next, false);
		}
		blockhandler(settings, wildlifesettings);
}
