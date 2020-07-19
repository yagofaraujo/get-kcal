const form = document.getElementById('form')

form.addEventListener('submit', handleSubmit)

function handleSubmit(event) {
  event.preventDefault()

  const gender = getSelectedValue('gender')
  const age = getInputNumberValue('age')
  const weight = getInputNumberValue('weight')
  const height = getInputNumberValue('height')
  const activityLevel = getSelectedValue('activity_level')

  const tmb = calculateTMB(gender, weight, height, age)

  const maintenance = Math.round(tmb * Number(activityLevel))
  const loseWeight = maintenance - 450
  const gainWeight = maintenance + 450

  if (validateRequiredFields(gender, age, weight, height, activityLevel)) {
    insertResult(tmb, maintenance, loseWeight, gainWeight)
  }
}

function validateRequiredFields(gender, age, weight, height, activityLevel) {
  if (gender === 'default') {
    alert('Selecione um sexo válido!')
    setFocus('gender')
  } else if (age <= 0) {
    alert('Digite uma idade válida!')
    setFocus('age')
  } else if (weight <= 0) {
    alert('Digite um peso válido!')
    setFocus('weight')
  } else if (height <= 0) {
    alert('Digite uma altura válida!')
    setFocus('height')
  } else if (activityLevel === 'default') {
    alert('Selecione um nível de atividade física válido!')
    setFocus('activity_level')
  } else {
    return true
  }
}

function calculateTMB(gender, weight, height, age) {
  let tmbValue = 0

  if (gender === 'female') {
    tmbValue = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age)
  } else {
    tmbValue = 66 + (13.7 * weight) + (5 * height) - (6.8 * age)
  }

  return Math.round(tmbValue)
}

function insertResult(tmb, maintenance, loseWeight, gainWeight) {
  const layout = `
    <h2>Aqui está o resultado:</h2>

    <div class="result-content">
      <ul>
        <li>
          Seu metabolismo basal é de <strong>${tmb} calorias</strong>.
        </li>
        <li>
          Para manter o seu peso você precisa consumir em média <strong>
          ${maintenance} calorias</strong>.
        </li>
        <li>
          Para perder peso você precisa consumir em média <strong>
          ${loseWeight} calorias</strong>.
        </li>
        <li>
          Para ganhar peso você precisa consumir em média <strong>
          ${gainWeight} calorias</strong>.
        </li>
      </ul>
    </div>
  `

  const result = document.getElementById('result')

  result.innerHTML = layout
}

function getSelectedValue(id) {
  const select = document.getElementById(id)
  return select.options[select.selectedIndex].value
}

function getInputNumberValue(id) {
  return Number(document.getElementById(id).value)
}

function setFocus(id) {
  const select = document.getElementById(id)
  select.focus()
}