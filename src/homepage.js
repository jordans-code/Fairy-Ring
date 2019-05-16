function hidenofood() { // hides gardens on home page with no food
	var objects = $('.backgroundgreen')
	for (var i = objects.length - 1; i > -1; i--) {
		var pos = $('.backgroundgreen').eq(i).children().eq(1).children().eq(2).children().eq(1).children().eq(1).css("background-position");
		if (pos == "-160px 0px") {
			continue;
		}
		
		var pos2 = $('.backgroundgreen').eq(i).children().eq(1).children().eq(2).children().eq(1).children().eq(2).css("background-position");
		if (pos2 == "-160px 0px") {
			continue;
		} else if ($('.backgroundgreen')[i].innerText.split(" ")[1].indexOf("Gardens") != -1){
			continue;
		} else {
			$('.backgroundgreen').eq(i).remove();
		}
	}
}

function mainpage(settings) {
	if (settings.hidenofood) {
		hidenofood();
	}
}