function handleSubmit(event) {
  event.preventDefault()
  const url = event.target.url.value
  let btn = event.target.querySelector("button[type=submit]")
  btn.disabled = true
  btn.textContent = "Processing.."
  fetch('/api/analyse?url=' + url)
    .then(res => res.json())
    .then(function (result) {
      btn.textContent = "Submit"
      btn.disabled = false

      const card = document.createElement('div');
      card.className = 'card';

      if (result.status.code === "0") {
        card.insertAdjacentHTML('beforeend', '<h3>Concept List</h3>')
        result.sentimented_concept_list.forEach(({ form }) => card.insertAdjacentHTML('beforeend', `<span>${form}</span>`))

        card.insertAdjacentHTML('beforeend', '<h3>Entity List</h3>')
        result.sentimented_entity_list.forEach(({ form }) => card.insertAdjacentHTML('beforeend', `<span>${form}</span>`))
      } else {
        card.insertAdjacentHTML('beforeend', `<h3>${result.status.msg}</h3>`)
      }


      document.getElementById('results').lastElementChild.replaceWith(card)
    }).catch(error => {
      btn.textContent = "Submit"
      btn.disabled = false

      const card = document.createElement('div');
      card.className = 'card';

      card.insertAdjacentHTML('beforeend', `<h3>${error.message}</h3>`)

      document.getElementById('results').lastElementChild.replaceWith(card)

    })
}

export { handleSubmit }
