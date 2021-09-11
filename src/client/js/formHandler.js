function handleSubmit(event) {
  event.preventDefault()
  const url = event.target.url.value
  const btn = event.target.querySelector("button[type=submit]")

  btn.disabled = true
  btn.textContent = "Processing.."

  fetchAnalysis(url, renderResult, renderError);
}

const fetchAnalysis = async (url, handleSuccess, handleError) => {
  try {
    const response = await fetch('/api/analyse?url=' + url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    handleSuccess(result);
  } catch (error) {
    handleError(error);
  }
}

const renderResult = result => {
  const btn = document.querySelector("form button[type=submit]")
  const results = document.getElementById('results')

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

  results.innerHTML = '<h3>Results</h3>'
  document.getElementById('results').appendChild(card)

}

const renderError = error => {
  const btn = document.querySelector("form button[type=submit]")
  const results = document.getElementById('results')

  btn.textContent = "Submit"
  btn.disabled = false

  const card = document.createElement('div');
  card.className = 'card';

  card.insertAdjacentHTML('beforeend', `<h3>${error.message}</h3>`)

  results.innerHTML = '<h3>Results</h3>'
  document.getElementById('results').appendChild(card)

}
export { handleSubmit }
