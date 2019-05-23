function main() {
	chrome.storage.sync.get(defaults, function(items) {
		if (items.debug) {console.log(items);}
		var path = window.location.pathname;
		if (path == "/fbfairy/fairygarden.php") {
			garden(items, false, false);
		} else if (path == "/fbfairy/wildlifewall.php") {
			wallhandler();
		} else if (path == "/fbfairy/") {
			mainpage(items);
		} else if (path == "/fbfairy/alchemy.php") {
			alchemy(items);
		} else if (path == "/fbfairy/alchemyresult.php") {
			alchemyresult(items);
		}
	});

}

main(); // start
