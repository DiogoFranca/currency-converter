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

const dataCurrency = [
  {
    symbol: 'USD',
    currencyName: 'Dólar Americano - USD'
  },
  {
    symbol: 'BRL',
    currencyName: 'Real Brasileiro - BRL'
  },
  {
    symbol: 'EUR',
    currencyName: 'Euro - EUR'
  },
  {
    symbol: 'JPY',
    currencyName: 'Iene - JPY'
  },
  {
    symbol: 'CAD',
    currencyName: 'Dólar Canadense - CAD'
  },
  {
    symbol: 'ARS',
    currencyName: 'Peso Argentino - ARS'
  },
  {
    symbol: 'CHF',
    currencyName: 'Franco Suíço - CHF'
  },
  {
    symbol: 'AUD',
    currencyName: 'Dólar Australiano - AUD'
  }
];

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
      calculate(inputValue.value, objJson[obj].ask, objJson[obj].code, objJson[obj].codein, objJson[obj].name);
    }

  });
});

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


