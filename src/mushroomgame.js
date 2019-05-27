
function mushroomhandler(settings) {
	if (settings.automushroom && settings.mushroomgameamount > 0) {
		var newamount = settings.mushroomgameamount - 1;
		
		chrome.storage.sync.set({mushroomgameamount: newamount});
		$('#playbutton').click();
	} else {
		$('#objData').append("<center><br><br><div style=''>Did you know that Fairy Ring can automatically do this for you? If you are seeing this, you either need to turn on the feature in the 'games' tab, or you need to set the amount of games that you want to complete in the tab!</div></center>");
	}
}

function mushroomgame(settings) {
	// hardcoded 1000 ms timeout before you can call collect(), this must wait a minimum of 1 second for each game or else the game is wasted.
	if (settings.automushroom) {
		$('#objData').prepend('<center><br><br><div id="playbutton2" class="inputsubmit" style="cursor:pointer;width:200px;font-weight:bold;padding:3px" onclick="pick(1);pick(2);pick(3);setTimeout(function() {collect();}, 1010);">Autopick (Fairy Ring)</div></center>');
		$('#playbutton2').click();
	}
}

