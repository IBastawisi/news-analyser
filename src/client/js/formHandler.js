function handleSubmit(event) {
    event.preventDefault()
    let url = event.target.url.value
    fetch('/api/analyse?url=' + url)
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = JSON.stringify(res)
    })
}

export { handleSubmit }
