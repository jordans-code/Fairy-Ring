function main() {
	chrome.storage.sync.get(defaults, function(items) {
		updatehandler(items);
		if (items.debug) {console.log(items);}
		var path = window.location.pathname;
		if (path == "/fbfairy/fairygarden.php") {
			garden(items, false, false, true);
		} else if (path == "/fbfairy/wildlifewall.php") {
			if (items.persistentsessions) {
				chrome.storage.local.get(wildlifedefaults, function(wildlifeitems) {
					wallhandler(items, wildlifeitems);
				});
			} else {
				wallhandler(items, false);
			}
		} else if (path == "/fbfairy/" || path == "/fbfairy/index.php") {
			mainpage(items);
			customstorebuy();
		} else if (path == "/fbfairy/alchemy.php") {
			alchemy(items);
		} else if (path == "/fbfairy/alchemyresult.php") {
			alchemyresult(items);
		} else if (path == "/fbfairy/herbalism.php") {
			customstorebuy();
		} else if (path == "/fbfairy/mushroom.php") {
			mushroomgame(items);
		} else if (path == "/fbfairy/mushroomsplash.php") {
			mushroomhandler(items);
		}
	});

}

function updatehandler(items) {
	if (!items.seen) { // change icon
		chrome.runtime.sendMessage({
			action: 'updateIcon', 
			value: true
	});
	}
	function onInstall() {
		console.log("Extension Installed");
	  }

	function onUpdate(currVersion) {
		console.log("Extension Updated to version " + currVersion);
		showupdate(currVersion);
		
	  }

	function showupdate(version) {
	const successNotification = window.createNotification({
		theme: 'success',
		showDuration: 0
		});
	  
	// Invoke success notification
	successNotification({ 
	  // close on click
	  //closeOnClick: true,

	  // displays close button
	  //displayCloseButton: true,

	  // nfc-top-left
	  // nfc-bottom-right
	  // nfc-bottom-left
	  positionClass: 'nfc-top-right',

	  // callback
	  onclick: false,
	  
	  // timeout in milliseconds
	  showDuration: 0,

	  // success, info, warning, error, and none
	  theme: 'success',
	  
	  message: 'Fairy Ring has been updated to version ' + version + '. View the changelog in the "About" tab to see what has changed!'
	});
	}

	function getVersion() {
		var details = chrome.runtime.getManifest();
		return details.version;
	  }

	  // Check if the version has changed.
	var currVersion = getVersion();
	var prevVersion = localStorage['version'];
	if (currVersion != prevVersion){
		// Check if we just installed this extension.
		if (typeof prevVersion == 'undefined') {
		  onInstall();
		} else {
		  onUpdate(currVersion);
		  chrome.storage.sync.set({seen: false});
		}
		localStorage['version'] = currVersion;
	}
}

if(document.readyState === "complete") {
    // Fully loaded!
	main();
}
else if(document.readyState === "interactive") {
    // DOM ready! Images, frames, and other subresources are still downloading.
	main();
}
else {
    // Loading still in progress.
    // To wait for it to complete, add "DOMContentLoaded" or "load" listeners.

    window.addEventListener("DOMContentLoaded", () => {
        // DOM ready! Images, frames, and other subresources are still downloading.
		main();
    });

    window.addEventListener("load", () => {
        // Fully loaded!
    });
}

