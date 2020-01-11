chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
	do_something(tab);
});

function do_something(tab) {
	var tabUrl = tab.url;
	chrome.storage.sync.get(function(items) {
		if (items.darkmode) {
			chrome.tabs.insertCSS(tab.id, {
				runAt: "document_start",
				file: "css/dark-mode.css"
			});
		}
	});	
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
	if (msg.action === "updateIcon") {
		if (msg.value) {
			chrome.browserAction.setIcon({
				path: { "16": "icons/mushroom16notify.png"}
			});
			} else {
			chrome.browserAction.setIcon({
				path: { "16": "icons/mushroom16.png"}
			});
			}
	}
	
});

