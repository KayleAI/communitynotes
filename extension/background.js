// Create context menu items for creating and requesting notes
chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: "create-note",
		title: "Create Community Note",
		contexts: ["selection"],
	});

	chrome.contextMenus.create({
		id: "request-note",
		title: "Request Community Note",
		contexts: ["selection"],
	});
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "create-note" || info.menuItemId === "request-note") {
		chrome.action.openPopup();
	}
});
