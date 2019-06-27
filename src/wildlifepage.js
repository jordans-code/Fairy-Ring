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

function blockhandler(settings) {
	var blocklist = getblocklist(settings);
	if (settings.debug) {console.log(blocklist);}
	chrome.storage.sync.set({blocktotal: blocklist.length, blockid: blocklist.reverse().join(", ")});
}

function openurls() { // handles "open all" button on wildlife page
	links = getlinks();
	for (i = 0; i < links.length; i++) {
		window.open(links[i]);
	}
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
				if (window.sessionStorage.getItem("flid")) {
					updatetotals(openedlinks.length - 1);
				} else {
					updatetotals(openedlinks.length);
				}
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
	} else {
		$("span.link").eq(1).click();
	}
}

function initialhtml() {
	$('.wildlifetype').parent().eq(0).append("<div id='totals' style='width: 370px; background-color: #ddeedd; border: 1px solid #aabbaa; margin-left: 10px; margin-right: 10px;'><span id='totalsspan'>You have opened 0 gardens for this creature during this session.</span><br><br>Note: This only keeps track of gardens opened through the <b>open all</b> button, the button will also ignore gardens which have already been opened this session. To reset it, simply refresh this page.<br><br>If the open all button does not respond, it is because you have already opened all of the gardens on that page during this session.</div>");
}

function updatetotals(total) {
	$('#totalsspan')[0].innerText = `You have opened ${total} gardens for this creature during this session.`;
}

function wallhandler(settings) { // handles wildlife page buttons
		initialhtml();
		if (settings.flid.length != 0) {
			window.sessionStorage.setItem("flid", true);
		}
		window.sessionStorage.setItem("openedlinks", JSON.stringify([settings.flid]));
		if ($(".mike_error").length == 0) { // If user is not on advert cooldown
		$(".wall_form").children().eq(1).append('<input id="openall" class="inputsubmit" style="border:1px outset #007f00;background-color:#007f00;padding-top: 4px" type=button value="Open All Gardens"/>');
		$(".wall_form").children().eq(1).append('<input id="next" class="inputsubmit" style="border:1px outset #007f00;background-color:#007f00;padding-top: 4px" type=button value="Next"/>');
		document.getElementById ("openall").addEventListener ("click", openurls, false);
		document.getElementById ("next").addEventListener ("click", next, false);
		} else {
			$('<input id="next" class="inputsubmit" style="border:1px outset #007f00;background-color:#007f00" type=button value="Next"/>').insertAfter($(".mike_error"));
			$('<input id="openall" class="inputsubmit" style="border:1px outset #007f00;background-color:#007f00" type=button value="Open All Gardens"/>').insertAfter($(".mike_error"));
			document.getElementById ("openall").addEventListener ("click", openurls, false);
			document.getElementById ("next").addEventListener ("click", next, false);
		}
		blockhandler(settings);
}
