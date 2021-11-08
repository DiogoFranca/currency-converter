const inputValue = document.querySelector('#value');
let selectFrom = document.querySelector('.select-from');
const exchangeImg = document.querySelector('.exchange-img');
let selectFor = document.querySelector('.select-for');
const btnConvert = document.querySelector('.btn-convert');
const container = document.querySelector('.container');

exchangeImg.addEventListener('click', () => {
  exchangeCoins(selectFrom, selectFor);
});

btnConvert.addEventListener('click', () => {
  const url = `https://economia.awesomeapi.com.br/last/${selectFrom.value}-${selectFor.value}`;
  let obj = [];

  fetch(url)
  .then(response => response.json())
  .then( objJson => {

    if(objJson.status === 404) {
      alert('Conversion currently unavailable! Try another coin combination.')
      return;
    };

    for(obj in objJson) {
      console.log(objJson[obj])
      calculate(inputValue.value, objJson[obj].ask, objJson[obj].code, objJson[obj].codein, objJson[obj].name);
    }

  });
});

function exchangeCoins(selectFrom, selectFor) {
  const valueFrom = selectFrom.value;
  const valueFor = selectFor.value;

  selectFrom.value = valueFor;
  selectFor.value = valueFrom;
}

function calculate(money, exchangeRate, currencyAcronymFrom, currencyAcronymFor, currencyFullName) {
  const moneyAfterExchange = money * exchangeRate;
  console.log(exchangeRate);
  
  showOnScreen(money, moneyAfterExchange, currencyAcronymFrom, currencyAcronymFor, currencyFullName);
}

function createDiv() {
  const div = document.createElement('div');
  return div;
}

function createImg() {
  const img = document.createElement('img');
  return img;
}

function showOnScreen(money, moneyAfterExchange, currencyAcronymFrom, currencyAcronymFor, currencyFullName) {
  const div = createDiv();
  const icon = createImg();
  const [currencyNameFrom, currencyNameFor] = currencyFullName.split('/');

  div.setAttribute('class', 'box-result');
  icon.setAttribute('class', 'close-icon');
  icon.setAttribute('src', 'assets/images/close-icon.png');

  div.innerHTML = `<p>${money} ${currencyNameFrom}(${currencyAcronymFrom}) = ${moneyAfterExchange.toFixed(2)} ${currencyNameFor}(${currencyAcronymFor})</p>`;
  div.appendChild(icon);
  container.appendChild(div);
  removeBoxResult();
}

function removeBoxResult() {
  const closeIcon = container.querySelector('.close-icon');

  closeIcon.addEventListener('click', e => {
    const el = e.target;
    el.parentElement.remove();
  });
}


