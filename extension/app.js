function main() {
  console.log(document.body)
  var title = document.createElement('div')
  title.innerHTML = document.title
  document.body.appendChild(title)
}

main()