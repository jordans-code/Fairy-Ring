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
		links.push(linkz);
	}
	Final = [...new Set(links)]; // checks for duplicates
	return Final;
}


function next() { // next page button
	if ($("span.link")[0].innerHTML == "Older Posts &gt;") {
		$("span.link").eq(0).click();
	} else {
		$("span.link").eq(1).click();
	}
}

function wallhandler() { // handles wildlife page buttons
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
}
