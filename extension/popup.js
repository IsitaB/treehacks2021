function summarize() {
	chrome.tabs.executeScript(null, { file: "jquery-2.2.js" }, function() {
	    chrome.tabs.executeScript(null, { file: "content.js" });
	});
}
document.getElementById('clickme').addEventListener('click', summarize);

const setDOMInfo = set => {
	console.log(set)

	let info = {carbon: '', water: '', land: '', methane:''};
	console.log("please maam")

	//TODO: fetch 


  document.getElementById('carbon').textContent = set.CarbonEmission;
  document.getElementById('water').textContent = set.WaterUsage;
  document.getElementById('land').textContent = set.LandUsage;
	document.getElementById('methane').textContent = set.MethaneEmission;
};

// Once the DOM is ready...
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	console.log("in popup listener")
	setDOMInfo(message);
});
