alert("Generating summary highlights. This may take up to 30 seconds depending on length of article.");

// function unicodeToChar(text) {
// 	return text.replace(/\\u[\dA-F]{4}/gi, 
// 	      function (match) {
// 	           return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
// 	      });
// }

// capture all text
var textToSend = document.body.innerText;

// summarize and send back
const api_url = 'https://us-central1-test1-304600.cloudfunctions.net/test_firestore';

alert("about to fetch");
alert(textToSend);

// let response = fetch(api_url);

// if(response.ok){
// 	alert("worksssssss");
// } else {
// 	alert("status: "+response.status);
// }

fetch(api_url, {
  method: 'POST',
  body: JSON.stringify(textToSend),
  headers:{
    'Content-Type': 'application/json'
  } })
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
// .then(data => {
// 	alert(data.json());
// 	return 'done2'
// });

// let response = fetch(api_url, {
//   method: 'POST',
//   body: JSON.stringify(textToSend),
//   headers:{
//     'Content-Type': 'application/json'
//   } });

// if(response.ok){
// 	alert("worksssssss");
// } else {
// 	alert("status: "+response.status);
// }


// fetch(api_url, {
//   method: 'POST',
//   body: JSON.stringify(textToSend),
//   headers:{
//     'Content-Type': 'application/json'
//   } })
// .then(data => { return data.json() })
// .then(res => { 
// 	$.each(res, function( index, value ) {
// 		value = unicodeToChar(value).replace(/\\n/g, '');
// 		document.body.innerHTML = document.body.innerHTML.split(value).join('<span style="background-color: #fff799;">' + value + '</span>');
// 	});
//  })
// .catch(error => console.error('Error:', error));


