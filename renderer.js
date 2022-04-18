document.addEventListener('DOMContentLoaded', function () {
  const baseCoinInput = document.querySelector('#base-coin')
  const firstBetInput = document.querySelector('#first-bet')
  const betStepInput = document.querySelector('#bet-step')
  const betCountTextEl = document.querySelector('#bet-count-txt')
  const resultSectionEl = document.querySelector('section#result')
  const submitBtn = document.querySelector('button#submit')
  const resetBtn = document.querySelector('button#reset')

  betCountTextEl.style.display = 'none'
  resultSectionEl.style.display = 'none'

  function countBet(baseCoin = 0, betStep = 1, firstBet = 0) {
    if (isNaN(baseCoin)) return NaN
    if (isNaN(betStep)) return NaN
    if (isNaN(firstBet)) return NaN

    if (baseCoin === 0) return 0
    if (betStep === 0 || firstBet === 0) return NaN
    if (firstBet > baseCoin) return 0
    if (firstBet === baseCoin) return 1

    let count = 1
    let currentBet = firstBet
    let totalBet = currentBet
    let stepper = [{ currentBet, totalBet, count }]

    while (totalBet < baseCoin) {
      currentBet *= betStep
      currentBet = currentBet.toFixed(2) * 1
      totalBet += currentBet
      totalBet = totalBet.toFixed(2) * 1
      count++
      stepper.push({ currentBet, totalBet, count })
    }

    return { stepper, count }
  }

  function getValue(el) {
    return el.value * 1
  }

  function renderResult() {
    let [baseCoin = 0, betStep = 1, firstBet = 0] = [
      getValue(baseCoinInput),
      getValue(betStepInput),
      getValue(firstBetInput),
    ]

    const { stepper, count } = countBet(baseCoin, betStep, firstBet)

    betCountTextEl.style.display = 'block'

    if (isNaN(count)) {
      betCountTextEl.innerHTML = `<div class="alert alert-danger d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
        <div >
          Không thể tính toán!
        </div>
      </div>`
    } else {
      betCountTextEl.innerHTML = `<div class="alert alert-success d-flex align-items-center" role="alert">
        <svg
          class="bi flex-shrink-0 me-2"
          width="24"
          height="24"
          role="img"
          aria-label="Success:"
        >
          <use xlink:href="#check-circle-fill" />
        </svg>
        <div>
          Bạn có thể bet <span class="fw-bold" id="bet-count">${count}</span> lần
        </div>
      </div>`
    }

    if (!isNaN(count)) renderStepper(stepper)
  }

  function renderStepper(stepper) {
    const table = document.querySelector('#stepper')
    if (table) document.body.removeChild(table)

    function renderRow({ currentBet, totalBet, count }) {
      const trEl = document.createElement('tr')
      const currentBetTd = document.createElement('td')
      const totalBetTd = document.createElement('td')
      const countBetTd = document.createElement('td')
      const checkboxTd = document.createElement('td')
      const checkboxContainer = document.createElement('div')
      checkboxContainer.classList.add('form-check');
      const checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      checkbox.role = "switch"
      checkbox.ariaLabel = '...'
      checkbox.classList.add('form-check-input')

      checkboxTd.appendChild(checkboxContainer);

      currentBetTd.scope = 'row'
      currentBetTd.textContent = currentBet
      totalBetTd.textContent = totalBet
      countBetTd.textContent = count
      checkboxContainer.appendChild(checkbox)

      trEl.append(checkboxTd, countBetTd, currentBetTd, totalBetTd)

      return trEl
    }

    const tableEl = document.createElement('table')
    const theadEl = document.createElement('thead')
    const tbodyEl = document.createElement('tbody')
    const countTh = document.createElement('th')
    const currentBetTh = document.createElement('th')
    const totalBetTh = document.createElement('th')
    const checkboxTh = document.createElement('th')

    countTh.textContent = '#'
    countTh.scope = 'col'
    currentBetTh.textContent = 'Số coin'
    currentBetTh.scope = 'col'
    totalBetTh.textContent = 'Tổng coin đã đặt'
    totalBetTh.scope = 'col'
    tableEl.id = 'stepper'
    tableEl.classList.add('table')
    checkboxTh.textContent = 'Check'

    theadEl.append(checkboxTh, countTh, currentBetTh, totalBetTh)
    tableEl.appendChild(theadEl)
    tableEl.appendChild(tbodyEl)

    for (const id in stepper) {
      tbodyEl.append(renderRow(stepper[id]))
    }

    document.body.appendChild(tableEl)
  }

  submitBtn.onclick = () => {
    resultSectionEl.style.display = 'block'
    renderResult()
  }
  resetBtn.onclick = () => {
    resultSectionEl.style.display = 'none'
    const table = document.querySelector('#stepper')
    if (table) document.body.removeChild(table)
  }
})
