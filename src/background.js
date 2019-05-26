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

