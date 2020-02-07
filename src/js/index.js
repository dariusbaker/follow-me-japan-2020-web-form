const _SELECTORS = {
  BOOKING_FORM: '#tour-booking-form',
  PASSENGER_TEMPLATE: '#passenger-form-template',
  ADD_PASSENGER_BTN: '#add-passenger-btn',
  REMOVE_PASSENGER_BTN: '.form__remove-btn',
  PASSENGER_FIELDSET: '.form__passenger',
  PASSENGER_FIELDSET_TITLE: '.form__passenger__title'
};

const _DATA_ATTR = {
  PASSENGER_FORM_ID: 'data-id',
};

const ordinal = (n) => {
  let res = '';
  if (n === 0) return res = String(n)

  switch (n % 10) {
    case 1:
      if (n === 11) return res = `${n}th`;
      res = `${n}st`;
      break;
    case 2:
      if (n === 12) return res = `${n}th`;
      res = `${n}nd`;
      break;
    case 3:
      if (n === 13) return res = `${n}th`;
      res = `${n}rd`;
      break;
    default:
      res = `${n}th`;
      break;
  }
  return res
};

const _bookingFormElem = document.querySelector(_SELECTORS.BOOKING_FORM);
const _addPassengerBtnElem = document.querySelector(_SELECTORS.ADD_PASSENGER_BTN);
const _passengerFormTemplate = document.querySelector(_SELECTORS.PASSENGER_TEMPLATE);

const _removeBtnEventsListener = {};
const _baseStartingIndex = 3;
let _runningIds = 2;
let _additionalPassengerStartIdx = _baseStartingIndex;

const addPassenger = () => {
  const template = _passengerFormTemplate.content.cloneNode(true);

  const fieldsetId = `${_runningIds}-passenger-fieldset`;

  const fieldset = template.querySelector(_SELECTORS.PASSENGER_FIELDSET);
  fieldset.setAttribute('id', fieldsetId);

  const title = fieldset.querySelector(_SELECTORS.PASSENGER_FIELDSET_TITLE);
  title.innerText = `${ordinal(_additionalPassengerStartIdx)} Passenger`;

  const removeBtn = fieldset.querySelector(_SELECTORS.REMOVE_PASSENGER_BTN);
  removeBtn.setAttribute(_DATA_ATTR.PASSENGER_FORM_ID, fieldsetId);

  // store event listener
  _removeBtnEventsListener[fieldsetId] = removePassenger;
  removeBtn.addEventListener('click', _removeBtnEventsListener[fieldsetId]);

  _runningIds = _runningIds + 1;
  _additionalPassengerStartIdx = _additionalPassengerStartIdx + 1;

  _bookingFormElem.appendChild(fieldset);
};

const removePassenger = (e) => {
  const elem = e.target;
  const id = elem.getAttribute(_DATA_ATTR.PASSENGER_FORM_ID);
  const passengerForm = document.getElementById(id);

  if (!passengerForm) {
    return;
  }

  // unbind remove passenger button click
  const removeBtn = passengerForm.querySelector(_SELECTORS.REMOVE_PASSENGER_BTN);
  removeBtn.removeEventListener('click', _removeBtnEventsListener[id]);

  delete _removeBtnEventsListener[id];

  _bookingFormElem.removeChild(passengerForm);

  _additionalPassengerStartIdx = _additionalPassengerStartIdx - 1;

  refreshAdditionalPassengerTitle();
};

const refreshAdditionalPassengerTitle = () => {
  const additionalPassenger = document.querySelectorAll(`${_SELECTORS.PASSENGER_FIELDSET}[data-removable="true"]`);

  if (additionalPassenger && additionalPassenger.length) {
    additionalPassenger.forEach((elem, i) => {
      const title = elem.querySelector(_SELECTORS.PASSENGER_FIELDSET_TITLE);
      title.innerText = `${ordinal(i + _baseStartingIndex)} Passenger`;
    });
  }
};

const init = () => {
  document.body.classList.remove('not-ready');
  _addPassengerBtnElem.addEventListener('click', addPassenger);
};

init();
