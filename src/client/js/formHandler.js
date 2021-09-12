import { checkURL } from "./urlChecker"

function handleSubmit(event) {
  event.preventDefault()
  const url = event.target.url.value
  const btn = event.target.querySelector("button[type=submit]")
  const results = document.getElementById('results')

  const validationResult = checkURL(url);
  if (!validationResult) return renderError({ message: "Invallid URL" })

  btn.disabled = true
  btn.textContent = "Processing.."
  results.innerHTML = '<h3>Running Sentiment Analysis</h3>'

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
    card.insertAdjacentHTML('beforeend', `<div class='result-row'><p>Agreement</p><span>${result.agreement}</span></div>`)

    card.insertAdjacentHTML('beforeend', `<div class='result-row'><p>Confidence</p><span>${result.confidence}%</span></div>`)

    card.insertAdjacentHTML('beforeend', `<div class='result-row'><p>Irony</p><span>${result.irony}</span></div>`)

    card.insertAdjacentHTML('beforeend', `<div class='result-row'><p>Score Tag</p><span>${result.score_tag}</span></div>`)

    card.insertAdjacentHTML('beforeend', `<hr>`)

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
