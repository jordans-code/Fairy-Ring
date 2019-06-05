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

function mainpage(settings) {
	if (settings.hidenofood) {
		hidenofood();
	}
}