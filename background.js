chrome.tabs.onUpdated.addListener(sendMessage);

function sendMessage(tabId, changeInfo, tabInfo) {
	console.log(changeInfo);

	console.log(tabInfo);
	if (changeInfo.status == "complete") {
		chrome.tabs.sendMessage(tabId, "pageUpdated");
		console.log(tabId);
	}
}

chrome.runtime.onMessage.addListener(getMessage);

function getMessage(message, sender, sendResponse) {
	if (message.type == 'openOptionsPage') {
		chrome.runtime.openOptionsPage();
	} else if (message.type == 'trackEvent') {
		trackEvent(message.name, message.reaction, message.videoName);
	}
}

chrome.runtime.onInstalled.addListener(function (object) {
	chrome.storage.sync.set({
		'whenReactInPercent': 0.80
	});
	chrome.tabs.create({
		url: 'http://yourautoliker.com/#use'
	});
});

chrome.runtime.setUninstallURL('http://yourautoliker.com/saiba-mais#contato');


var _AnalyticsCode = 'UA-134153603-1';
var _gaq = _gaq || [];
_gaq.push(['_setAccount', _AnalyticsCode]);
_gaq.push(['_trackPageview']);

(function () {
	var ga = document.createElement('script');
	ga.type = 'text/javascript';
	ga.async = true;
	ga.src = 'https://ssl.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(ga, s);
})();

function trackEvent(name, event, label) {
	_gaq.push(['_trackEvent', name, event, label]);
}