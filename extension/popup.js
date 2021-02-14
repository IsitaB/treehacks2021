function summarize() {
	chrome.tabs.executeScript(null, { file: "jquery-2.2.js" }, function() {
	    chrome.tabs.executeScript(null, { file: "content.js" });
	});
}
document.getElementById('clickme').addEventListener('click', summarize);

const setDOMInfo = set => {
	let info = {carbon: '', water: '', land: '', methane:''};
	console.log("please maam")

	//TODO: fetch 

  document.getElementById('carbon').textContent = info.carbon;
  document.getElementById('water').textContent = info.water;
  document.getElementById('land').textContent = info.land;
	document.getElementById('methane').textContent = info.methane;
};

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', () => {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        setDOMInfo);
  });
});
