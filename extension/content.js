alert("Generating summary highlights. This may take up to 30 seconds depending on length of article.");

function unicodeToChar(text) {
	return text.replace(/\\u[\dA-F]{4}/gi, 
	      function (match) {
	           return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
	      });
}

// capture all text
var textToSend = document.body.innerText;

// summarize and send back
const api_url = 'https://us-central1-test1-304600.cloudfunctions.net/generate_summary';

alert("about to fetch");
alert(textToSend);

fetch(api_url, {
  method: 'POST',
  body: JSON.stringify(textToSend),
  headers:{
    'Content-Type': 'application/json'
  } })
.then(response => console.log(response.json()))
.then(data => console.log(data));

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


