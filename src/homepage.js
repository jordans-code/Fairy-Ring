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
	var typeformatted = "#homepage"+type
	var linkq = $(typeformatted).find('a')
	
	var mygardenid = $("div[style='position:absolute;left:344px;top:2px;width:70px;height:18px;cursor:pointer']").eq(0).children()[0];
	
	if (mygardenid == undefined) {
		var mygardenid = $("div[style='position: absolute; left: 344px; top: 2px; width: 70px; height: 18px; cursor: pointer; border-bottom: none;']").eq(0).children()[0]
	}
	for (i = 0; i < linkq.length; i++) {
		if (linkq.eq(i).is(":visible") & !(mygardenid.href == linkq[i].href)) {
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
	$("div[style='color:#333;font-size:14px;font-weight:bold;width:220px;padding:2px;border-radius:5px']").eq(0).after('<input id="openallfriends" class="inputsubmit" style="width:194px;border:1px outset #0a2d0a;background-color:#007f00;padding-top: 8px;padding-bottom: 8px;" type=button value="Open All"/>')
	$('div[style="color:#333;font-size:14px;font-weight:bold;width:220px;padding:2px;border-radius:5px"]').eq(0).parent().attr("id","homepagefriends");

	$("div[style='color:#333;font-size:14px;font-weight:bold;width:220px;padding:2px;border-radius:5px']").eq(1).after('<input id="openallfavorites" class="inputsubmit" style="width:194px;border:1px outset #0a2d0a;background-color:#007f00;padding-top: 8px;padding-bottom: 8px;" type=button value="Open All"/>')
	$('div[style="color:#333;font-size:14px;font-weight:bold;width:220px;padding:2px;border-radius:5px"]').eq(1).parent().attr("id","homepagefavorites");

	$("div[style='color:#333;font-size:14px;font-weight:bold;width:220px;padding:2px;border-radius:5px']").eq(2).after('<input id="openallrandoms" class="inputsubmit" style="width:194px;border:1px outset #0a2d0a;background-color:#007f00;padding-top: 8px;padding-bottom: 8px;" type=button value="Open All"/>')
	$('div[style="color:#333;font-size:14px;font-weight:bold;width:220px;padding:2px;border-radius:5px"]').eq(2).parent().attr("id","homepagerandoms");

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