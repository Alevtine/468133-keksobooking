'use strict';
var map = document.querySelector('.map');

var ROOMS_QUANTITY = 5;
var GUESTS_QUANTITY = 50;
var PRICE_MINIMUM = 1000;
var PRICE_MAXIMUM = 1000000;
var X_MINIMUM = 300;
var X_MAXIMUM = 900;
var Y_MINIMUM = 150;
var Y_MAXIMUM = 500;
var ADVERTS_QUANTITY = 8;

var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var pinsBlock = document.querySelector('.map__pins');
var cardTemplate = document.querySelector('template').content.querySelector('.map__card');


var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var shuffle = function (array) {
  for (var i = 0; i < array.length; i++) {
    var swapIdx = Math.floor(Math.random() * array.length);
    var tmp = array[swapIdx];
    array[swapIdx] = array[i];
    array[i] = tmp;
  }
  return array;
};

var generateAdverts = function () {
  var adverts = [];

  for (var i = 0; i < ADVERTS_QUANTITY; i++) {
    var addressX = getRandomNumber(X_MINIMUM, X_MAXIMUM);
    var addressY = getRandomNumber(Y_MINIMUM, Y_MAXIMUM);
    var addressCoordinates = addressX + ', ' + addressY;

    var advert = {
      author: {
        avatar: AVATARS[i]
      },
      offer: {
        title: TITLES[getRandomNumber(0, TITLES.length - 1)],
        address: addressCoordinates,
        price: getRandomNumber(PRICE_MINIMUM, PRICE_MAXIMUM),
        type: TYPES[getRandomNumber(0, TYPES.length - 1)],
        rooms: getRandomNumber(1, ROOMS_QUANTITY),
        guests: getRandomNumber(1, GUESTS_QUANTITY),
        checkin: CHECK_TIMES[getRandomNumber(0, CHECK_TIMES.length - 1)],
        checkout: CHECK_TIMES[getRandomNumber(0, CHECK_TIMES.length - 1)],
        features: shuffle(FEATURES).slice(getRandomNumber(0, FEATURES.length - 1)),
        description: ' ',
        photos: shuffle(PHOTOS)
      },
      location: {
        x: addressX,
        y: addressY
      }
    };
    adverts.push(advert);
  }
  return adverts;
};


var addPin = function (pin, index) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';
  var imgPin = pinElement.getElementsByTagName('img');
  imgPin[0].src = pin.author.avatar;
  imgPin[0].alt = pin.offer.title;
  pinElement.setAttribute('data-id', index);
  return pinElement;
};

var drawPins = function (adverts) {
  var pinFragment = document.createDocumentFragment();
  for (var j = 0; j < adverts.length; j++) {
    pinFragment.appendChild(addPin(adverts[j], j));
  }
  return pinsBlock.appendChild(pinFragment);
};


var addPhotosInCard = function (cardElement, photos) {
  var photosList = cardElement.querySelector('.popup__photos');
  var photoElement = photosList.querySelector('img');
  for (var j = 0; j < photos.length; j++) {
    photoElement = photoElement.cloneNode(true);
    photoElement.src = photos[j];
    photosList.appendChild(photoElement);
  }
  photosList.firstElementChild.remove(photosList);
  return photosList;
};

var addFeaturesInCard = function (cardElement, features) {
  var featuresList = cardElement.querySelector('.popup__features');
  featuresList.innerHTML = '';
  var featureTemplate = document.querySelector('template').content.querySelector('.popup__feature');
  for (var a = 0; a < features.length; a++) {
    var featureElement = featureTemplate.cloneNode(true);
    featureElement.className = 'popup__feature popup__feature--' + features[a];
    featuresList.appendChild(featureElement);
  }
};

var apartmentType = function (type) {
  switch (type) {
    case 'flat': return 'Квартира';
    case 'bungalo': return 'Бунгало';
    case 'house': return 'Дом';
    default: return 'Дворец';
  }
};


var drawCard = function (advert) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = advert.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = apartmentType(advert.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', ' + 'выезд до ' + advert.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = advert.offer.description;

  addFeaturesInCard(cardElement, advert.offer.features);
  addPhotosInCard(cardElement, PHOTOS);

  cardElement.querySelector('img').src = advert.author.avatar;
  document.querySelector('.map__filters-container').insertAdjacentElement('beforeBegin', cardElement);
};

var adverts = generateAdverts();
drawPins(adverts);
// drawCard(adverts[0]);

// module4-task1
// Обработчик события mouseup должен вызывать функцию,
// которая будет отменять изменения DOM-элементов, описанные в пункте «Неактивное состояние» технического задания.

var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
for (var i = 0; i < pins.length; i++) {
  pins[i].className = 'map__pin' + ' hidden';
}

var fields = document.querySelector('.ad-form').querySelectorAll('fieldset');
for (var j = 0; j < fields.length; j++) {
  fields[j].disabled = 'disabled';
}

var pinMain = document.querySelector('.map__pin--main');
document.querySelector('#address').value = getCoords(pinMain).top + ', ' + getCoords(pinMain).left;

var turnActive = function () {
  map.classList.remove('map--faded');
  for (var t = 0; t < fields.length; t++) {
    fields[t].disabled = '';
  }

  for (var a = 0; a < pins.length; a++) {
    pins[a].classList.remove('hidden');
  }

  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  document.querySelector('#address').value = getCoords(pinMain).top + ', ' + getCoords(pinMain).left;

};

pinMain.addEventListener('mouseup', turnActive);


// var cards = map.querySelectorAll('.map__card');

var onClickCloseCard = function (evt) {
  var target = evt.target;
  while (!target.classList.contains('map__card')) {
    target = target.parentNode;
  }
  target.parentNode.removeChild(target);
  evt.stopPropagation();
};

map.addEventListener('click', function (evt) {
  var target = evt.target;
  while (!target.classList.contains('map')) {
    if (target.classList.contains('map__pin') && !target.classList.contains('map__pin--main')) {
      var mapPopupCard = map.querySelector('.map__card');
      if (mapPopupCard) {
        mapPopupCard.parentNode.removeChild(mapPopupCard);
      }
      var index = target.dataset.id;
      drawCard(adverts[index]);
      var cardCloseBlock = map.querySelector('.popup__close');
      cardCloseBlock.addEventListener('click', onClickCloseCard);
      return;
    }
    target = target.parentNode;
  }
});


function getCoords(element) {
  var box = element.getBoundingClientRect();
  return {
    left: Math.floor(box.left + pageXOffset),
    top: Math.floor(box.top + pageYOffset)
  };
}

// m4-t2. валид.полей

document.querySelector('#address').setAttribute('readonly', true);

document.querySelector('#title').setAttribute('required', true);
document.querySelector('#title').setAttribute('minlength', '30');
document.querySelector('#title').setAttribute('maxlength', '100');

document.querySelector('#price').setAttribute('required', true);
document.querySelector('#price').setAttribute('max', '1000000');

document.querySelector('form').action = 'https://js.dump.academy/keksobooking';

var priceInput = document.querySelector('#price');
var typeInput = document.querySelector('#type');

typeInput.addEventListener('change', function (evt) {
  var typeValue = evt.target.value;
  var minValue = 0;
  switch (typeValue) {
    case 'palace': minValue = 10000; break;
    case 'house': minValue = 5000; break;
    case 'flat': minValue = 1000; break;
    case 'bungalo': minValue = 0; break;
  }
  priceInput.setAttribute('min', minValue);
  priceInput.setAttribute('placeholder', minValue);
});

var checkInInput = document.querySelector('#timein');
var checkOutInput = document.querySelector('#timeout');

checkInInput.addEventListener('change', function (evt) {
  checkOutInput.value = evt.target.value;
  checkOutInput.value = evt.target.value;
});

checkOutInput.addEventListener('change', function (evt) {
  checkInInput.value = evt.target.value;
  checkInInput.value = evt.target.value;
});

/*
вводятся ограничения на допустимые варианты выбора количества гостей:
1 комната — «для 1 гостя»;
2 комнаты — «для 2 гостей» или «для 1 гостя»;
3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
100 комнат — «не для гостей»;
*/

var roomsInput = document.querySelector('#room_number');
var guestsInput = document.querySelector('#capacity');

roomsInput.addEventListener('change', function (evt) {
  var guests = guestsInput.querySelectorAll('option');
  for (var b = 0; b < guests.length; b++) {
    guests[b].disabled = 'disabled';
  }

  if (evt.target.value === '1') {
    guestsInput.querySelector('option:nth-child(3)').removeAttribute('disabled');
  } else if (evt.target.value === '2') {
    guestsInput.querySelector('option:nth-child(2)').removeAttribute('disabled');
    guestsInput.querySelector('option:nth-child(3)').removeAttribute('disabled');
  } else if (evt.target.value === '3') {
    guestsInput.querySelector('option:nth-child(1)').removeAttribute('disabled');
    guestsInput.querySelector('option:nth-child(2)').removeAttribute('disabled');
    guestsInput.querySelector('option:nth-child(3)').removeAttribute('disabled');
  } else if (evt.target.value === '100') {
    guestsInput.querySelector('option:nth-child(4)').removeAttribute('disabled');
  }
});


// пров. перед отпр. фор.
// setCustomValidity()
