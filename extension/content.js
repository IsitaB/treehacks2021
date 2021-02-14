
// capture all text
let fabrics = document.getElementById("feature-bullets").getElementsByTagName("UL")[0].getElementsByTagName("LI")[0].innerText;
// let dims = document.getElementById("detailBullets_feature_div").getElementsByTagName("UL")[0].innerText;

// summarize and send back
const api_url = 'https://us-central1-test1-304600.cloudfunctions.net/test_firestore';

let pass = {
  fabrics,
  dims
}

fetch(api_url, {
  method: 'POST',
  body: JSON.stringify(pass),
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    // alert("here1");
    
    return response.json()
    //return 'done1'
  })
  .then(res => {
    // alert("here2")
    console.log(res)
    chrome.runtime.sendMessage(
      res
    );
  })



  
  // Listen for messages from the popup.
  chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // First, validate the message's structure.
    // if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    //   // Collect the necessary data. 
    //   // (For your specific requirements `document.querySelectorAll(...)`
    //   //  should be equivalent to jquery's `$(...)`.)
    //   var domInfo = {
    //     total: document.querySelectorAll('*').length,
    //     inputs: document.querySelectorAll('input').length,
    //     buttons: document.querySelectorAll('button').length,
    //   };
  
    //   // Directly respond to the sender (popup), 
    //   // through the specified callback.
    //   response(domInfo);
    // }
    // chrome.tabs.query({
    //   active: true,
    //   currentWindow: true
    // }, tabs => {
    //   // ...and send a request for the DOM info...
    //   chrome.tabs.sendMessage(
    //       tabs[0].id,
    //       {from: 'popup', subject: 'DOMInfo'},
    //       setDOMInfo);
    // });
  });
