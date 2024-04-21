chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
	if (tab.url?.startsWith("https://www.fairylandgame.com/")) { 
		apply_DarkModeSettings(tab);
	}
});

function apply_DarkModeSettings(tab) {
	var tabUrl = tab.url;
	chrome.storage.sync.get(function(items) {
		if (items.darkmode) {
			chrome.scripting.insertCSS({
				target: { tabId: tab.id },
				files: ['css/dark-mode.css'],
			});
		}
	});	
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
	if (msg.action === "updateIcon") {
		if (msg.value) {
			chrome.action.setIcon({
				path: { "16": "/icons/mushroom16notify.png"}
			}).catch(error => {
				console.error("Error setting icon:", error);
			});
		} else {
			chrome.action.setIcon({
				path: { "16": "/icons/mushroom16.png"}
			}).catch(error => {
				console.error("Error setting icon:", error);
			});
		}
	}
});

