function removeobj(obj) {
	$('.backgroundgreen').eq(obj).remove();
}

function hidenofood() { // hides gardens on home page with no food
	var objects = $('.backgroundgreen')
	for (var i = objects.length - 1; i > -1; i--) {
		var wilting = "-48px 0px";
		var food = "-160px 0px";
		var frozen = "-96px 0px"
		var stat = $('.backgroundgreen').eq(i).children().eq(1).children().eq(2).children().eq(1).children().eq(0).css("background-position");
		if (stat == wilting) {
			continue;
		}
		if (stat == frozen) { // frozen
			removeobj(i);
			continue;
		}
		var totalobjs = $('.backgroundgreen').eq(i).children().eq(1).children().eq(2).children().eq(1).children().length;
		if (totalobjs == 0) {
			continue;
		}
		
		if (totalobjs == 1) {
			removeobj(i);
		} else if (totalobjs == 2) {
			var pos = $('.backgroundgreen').eq(i).children().eq(1).children().eq(2).children().eq(1).children().eq(1).css("background-position");
			if (pos == food) { // food in 2nd array
				continue;
			} else {
				removeobj(i);
				continue;
			}
			
		} else if (totalobjs == 3) { 
			var pos2 = $('.backgroundgreen').eq(i).children().eq(1).children().eq(2).children().eq(1).children().eq(2).css("background-position");
			if (pos2 == food) { // food in 3rd array
				continue;
			} else {
				removeobj(i);
				continue;
			}
		} else {
			continue;
		}
		
	}
}

function gethomepagelinks(type){
	var links = []
	if (type == "friends") {
		var linkq = $("#mainright div[style='width:196px;float:left'] a[style='color:#000']")
	} else if (type == "favorites") {
		var linkq = $("#mainright div[style='margin-left:8px;width:196px;float:left;overflow:hidden;float:left'] a[style='color:#000']")
	} else if (type == "randoms") {
		var linkq = $("#mainright div[style='margin-left:8px;margin-top:0px;width:196px;float:left;overflow:hidden;float:left'] a[style='color:#000']")
	} else {
		console.log("Error in types of gethomepagelinks")
	}
	console.log(linkq)
	for (i = 0; i < linkq.length; i++) {
		if (linkq.eq(i).is(":visible")) {
			links.push(linkq[i].href)
		}
	}
	return links;
}

function openhomepageurls(type) { // handles "open all" button on wildlife page
	links = gethomepagelinks(type);
	for (i = 0; i < links.length; i++) {
		window.open(links[i]);
	}
}

function addmainpagebuttons() {
	
	$("div[style='width:196px;overflow:hidden;float:left']").children(":first").after('<input id="openallfriends" class="inputsubmit" style="float:right;width:196px;border:1px outset #007f00;background-color:#007f00;padding-top: 4px" type=button value="Open All"/>')
	$("div[style='margin-left:8px;width:196px;float:left;overflow:hidden;float:left']").children(":first").after('<input id="openallfavorites" class="inputsubmit" style="float:right;width:196px;border:1px outset #007f00;background-color:#007f00;padding-top: 4px" type=button value="Open All"/>')
	$("div[style='margin-left:8px;margin-top:0px;width:196px;float:left;overflow:hidden;float:left'] div[style='background-color:#007f00;color:#ffffff;font-weight:bold;width:190px;padding:2px']").eq(1).after('<input id="openallrandoms" class="inputsubmit" style="float:right;width:196px;border:1px outset #007f00;background-color:#007f00;padding-top: 4px" type=button value="Open All"/>')
	document.getElementById ("openallfriends").addEventListener ("click", openhomepageurls.bind(this, "friends"));
	document.getElementById ("openallfavorites").addEventListener ("click", openhomepageurls.bind(this, "favorites"));
	document.getElementById ("openallrandoms").addEventListener ("click", openhomepageurls.bind(this, "randoms"));
}

function mainpage(settings) {
	if (settings.hidenofood) {
		hidenofood();
	}
	if (settings.homepageExtraBtns) {
		addmainpagebuttons();
	}
}