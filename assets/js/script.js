import { dataCurrency } from "./dataCurrency.js";

const inputValue = document.querySelector('#value');
const selectFrom = document.querySelector('.select-from');
const exchangeImg = document.querySelector('.exchange-img');
const selectFor = document.querySelector('.select-for');
const btnConvert = document.querySelector('.btn-convert');
const container = document.querySelector('.container');
const result = document.querySelector('#result');
const selectOne = document.querySelector('.value-from-for.select-from.select-from-for');
const selectTwo = document.querySelector('.value-from-for.select-for.select-from-for')
const selectOption = document.querySelector('.select-option');

dataCurrency.map(option => {
  const cloneOption = selectOption.cloneNode(true);
  const cloneOptionTwo = selectOption.cloneNode(true);

  cloneOption.value = option.symbol;
  cloneOption.innerText = option.currencyName;

  cloneOptionTwo.value = option.symbol;
  cloneOptionTwo.innerText = option.currencyName;
  
  selectOne.appendChild(cloneOption);
  selectTwo.appendChild(cloneOptionTwo);
});


btnConvert.addEventListener('click', () => {
    getData();
});

async function getData() {
  try {
    const url = `https://economia.awesomeapi.com.br/last/${selectFrom.value}-${selectFor.value}`;
    let obj = [];

    let objJson = await axios(url)

    if(objJson.status === 404) throw new Error('Conversion currently unavailable! Try another coin combination.')

    for(obj in objJson.data) {
      calculate(inputValue.value, objJson.data[obj].ask, objJson.data[obj].code, objJson.data[obj].codein, objJson.data[obj].name);
    }
  } catch(e) {
    alert(e);
  }
  
}

exchangeImg.addEventListener('click', () => {
  exchangeCoins(selectFrom, selectFor);
});

function exchangeCoins(selectFrom, selectFor) {
  const valueFrom = selectFrom.value;
  const valueFor = selectFor.value;

  selectFrom.value = valueFor;
  selectFor.value = valueFrom;
}

function calculate(money, exchangeRate, currencyAcronymFrom, currencyAcronymFor, currencyFullName) {
  const moneyAfterExchange = money * exchangeRate;
  
  showOnScreen(money, moneyAfterExchange, currencyAcronymFrom, currencyAcronymFor, currencyFullName);
}

function createImg() {
  const img = document.createElement('img');
  return img;
}

function showOnScreen(money, moneyAfterExchange, currencyAcronymFrom, currencyAcronymFor, currencyFullName) {
  const icon = createImg();
  const [currencyNameFrom, currencyNameFor] = currencyFullName.split('/');

  result.setAttribute('class', 'box-result');
  icon.setAttribute('class', 'close-icon');
  icon.setAttribute('src', './assets/images/close-icon.png');

  result.innerHTML = `<p>${money} ${currencyNameFrom}(${currencyAcronymFrom}) = ${moneyAfterExchange.toFixed(2)} ${currencyNameFor}(${currencyAcronymFor})</p>`;
  result.appendChild(icon);
  container.appendChild(result);
  removeResult();
}

function removeResult() {
  const closeIcon = container.querySelector('.close-icon');

  closeIcon.addEventListener('click', e => {
    const el = e.target;
    el.parentElement.remove();
  });
}


