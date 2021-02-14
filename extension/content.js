// alert("Generating summary highlights. This may take up to 30 seconds depending on length of article.");

// function unicodeToChar(text) {
// 	return text.replace(/\\u[\dA-F]{4}/gi, 
// 	      function (match) {
// 	           return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
// 	      });
// }

// capture all text
let fabrics = document.getElementById("feature-bullets").getElementsByTagName("UL")[0].getElementsByTagName("LI")[0].innerText;
let dims = document.getElementById("detailBullets_feature_div").getElementsByTagName("UL")[0].innerText;

// summarize and send back
const api_url = 'https://us-central1-test1-304600.cloudfunctions.net/test_firestore';

let pass = {
  fabrics,
  dims
}

alert(JSON.stringify(pass))

fetch(api_url, {
  method: 'POST',
  body: JSON.stringify(pass),
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    alert("here1");
    // console.log(response.json());
    return response.json()
    //return 'done1'
  })
  .then(res => {
    alert("here2")
    console.log(res)
  })

  chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction',
  });
  
  // Listen for messages from the popup.
  chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // First, validate the message's structure.
    if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
      // Collect the necessary data. 
      // (For your specific requirements `document.querySelectorAll(...)`
      //  should be equivalent to jquery's `$(...)`.)
      var domInfo = {
        total: document.querySelectorAll('*').length,
        inputs: document.querySelectorAll('input').length,
        buttons: document.querySelectorAll('button').length,
      };
  
      // Directly respond to the sender (popup), 
      // through the specified callback.
      response(domInfo);
    }
  });
