var prev = '';
var curr = '';
var adding = false;

const numberButtons = document.querySelectorAll('[data-number]');
const clearButton = document.querySelector('[data-clear]');
const clearEntryButton = document.querySelector('[data-clear-entry]');
const addButton = document.querySelector('[data-add]');
const digitalRootButton = document.querySelector('[data-dr]');

const prevElem = document.querySelector('[data-prev]');
const currElem = document.querySelector('[data-curr]');

// FUNCTIONS
function clear() {
  prev = '';
  curr = '';
}

function clearEntry() {
  curr = '';
}

function appendToCurr(num) {
  if (curr === '0')
    curr = num.toString();
  else
    curr = curr + num.toString();
}

function add() {
  if (curr === '')
    return;

  if (prev !== '') {
    const prevInt = parseInt(prev);
    const currInt = parseInt(curr);
    let value = prevInt + currInt;
    prev = value.toString();
  } else {
    prev = curr;
  }

  curr = '';
}

function digitalRoot() {
  const prevInt = parseInt(prev);
  const currInt = parseInt(curr);
  let value;

  if (isNaN(currInt)) {
    if (isNaN(prevInt))
      return;
    value = prevInt;
  } else {
    if (isNaN(prevInt)) {
      value = currInt;
    } else {
      value = prevInt + currInt;
    }
  }

  value = value % 9;
  if (value === 0)
    value = 9;

  prev = '';
  curr = value.toString();
}

function update() {
  let prevInner = display(prev);

  if (prev !== '')
    prevInner = prevInner + ' +';

  prevElem.innerText = prevInner;
  currElem.innerText = display(curr);
}

function display(num) {
  if (num === '')
    return '';

  const numInt = parseInt(num);
  return numInt.toLocaleString('en');
}

// EVENT LISTENERS
numberButtons.forEach(number => {
  number.addEventListener('click', () => {
    appendToCurr(number.innerHTML);
    update();
  });
});

clearButton.addEventListener('click', () => {
  clear();
  update();
});

clearEntryButton.addEventListener('click', () => {
  clearEntry();
  update();
});

addButton.addEventListener('click', () => {
  add();
  update();
});

digitalRootButton.addEventListener('click', () => {
  digitalRoot();
  update();
});
