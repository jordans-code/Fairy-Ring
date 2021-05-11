function removeobj(obj) {
	$('.gardeninfobox').eq(obj).remove();
}


function hidenofood() {
	var objects = $('.gardeninfobox')
	var wilting = "-48px 0px";
	var food = "-160px 0px";
	var frozen = "160px 0px"
	for (var i = objects.length - 1; i > -1; i--) {
		var iconlist = objects.eq(i).children().eq(0).children().eq(1).children().eq(1).children().eq(0).children();
		if (iconlist.eq(0).css("background-position") == frozen) {
			removeobj(i);
			continue;
		}
		
		if (iconlist.length == 1) {
			removeobj(i);
			continue;
		} else if (iconlist.length == 2) {
			if (iconlist.eq(1).css("background-position") == food) {
				continue;
			} else {
				removeobj(i);
				continue;
			}
		} else if (iconlist.length == 3) {
			if (iconlist.eq(2).css("background-position") == food) {
				continue;
			} else {
				removeobj(i);
				continue;
			}
		}
	}
}

function gethomepagelinks(type){
	var links = []
	var typeformatted = "#homepage"+type
	var linkq = $(typeformatted).find('a')
	/*
	var mygardenid = $("div[style='position:absolute;left:344px;top:2px;width:70px;height:18px;cursor:pointer']").eq(0).children()[0];
	
	if (mygardenid == undefined) {
		var mygardenid = $("div[style='position: absolute; left: 344px; top: 2px; width: 70px; height: 18px; cursor: pointer; border-bottom: none;']").eq(0).children()[0]
	}
	for (i = 0; i < linkq.length; i++) {
		if (linkq.eq(i).is(":visible") & !(mygardenid.href == linkq[i].href)) {
			links.push(linkq[i].href)
		}
	}
	*/
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
function gardensearchreorder() {
	var gardeninfoboxes = $('.gardeninfobox')
	$('.gardeninfobox').eq(gardeninfoboxes.length-1).appendTo('#searchgardendiv')
	$('#searchgardendiv').eq(0).insertAfter('#openallrandoms')
}



function addmainpagebuttons() {
	$("div[style='color:#333;font-size:14px;font-weight:bold;width:220px;padding:2px;border-radius:5px']").eq(0).after('<input id="openallfriends" class="inputsubmit" style="width:194px;border:1px outset #0a2d0a;background-color:#007f00;padding-top: 8px;padding-bottom: 8px;" type=button value="Open All"/>')
	$('div[style="color:#333;font-size:14px;font-weight:bold;width:220px;padding:2px;border-radius:5px"]').eq(0).parent().attr("id","homepagefriends");

	$("div[style='color:#333;font-size:14px;font-weight:bold;width:220px;padding:2px;border-radius:5px']").eq(1).after('<input id="openallfavorites" class="inputsubmit" style="width:194px;border:1px outset #0a2d0a;background-color:#007f00;padding-top: 8px;padding-bottom: 8px;" type=button value="Open All"/>')
	$('div[style="color:#333;font-size:14px;font-weight:bold;width:220px;padding:2px;border-radius:5px"]').eq(1).parent().attr("id","homepagefavorites");

	$("div[style='color:#333;font-size:14px;font-weight:bold;width:220px;padding:2px;border-radius:5px']").eq(2).after('<input id="openallrandoms" class="inputsubmit" style="width:194px;border:1px outset #0a2d0a;background-color:#007f00;padding-top: 8px;padding-bottom: 8px;" type=button value="Open All"/>')
	//$('div[style="color:#333;font-size:14px;font-weight:bold;width:220px;padding:2px;border-radius:5px"]').eq(2).parent().attr("id","homepagerandoms");

	document.getElementById ("openallfriends").addEventListener ("click", openhomepageurls.bind(this, "friends"));
	if(document.getElementById ("openallfavorites")) {
	document.getElementById ("openallfavorites").addEventListener ("click", openhomepageurls.bind(this, "favorites"));
	document.getElementById ("openallrandoms").addEventListener ("click", openhomepageurls.bind(this, "randoms"));
	}
}

function mainpage(settings) {
	if (settings.hidenofood) {
		hidenofood();
	}
	var path = window.location.pathname + window.location.search
	if (path != "/fbfairy/index.php?mode=wilt" && path != "/fbfairy/index.php?mode=new") {
		$('div[style="color:#333;font-size:14px;font-weight:bold;width:220px;padding:2px;border-radius:5px"]').eq(2).parent().attr("id","homepagerandoms");
		$('div[style="color:#333;font-size:14px;font-weight:bold;width:220px;padding:2px;border-radius:5px"]').last().attr("id","searchgardendiv");
	}
	if (settings.homepageExtraBtns) {
		addmainpagebuttons();
	}
	if (path != "/fbfairy/index.php?mode=wilt" && path != "/fbfairy/index.php?mode=new") {
		if (settings.homepageReorderSearch) {
			gardensearchreorder();
		}
	}
}