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


var addPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';
  var imgPin = pinElement.getElementsByTagName('img');
  imgPin[0].src = pin.author.avatar;
  imgPin[0].alt = pin.offer.title;
  return pinElement;
};

var drawPins = function (adverts) {
  var pinFragment = document.createDocumentFragment();
  for (var j = 0; j < adverts.length; j++) {
    pinFragment.appendChild(addPin(adverts[j]));
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
  cardElement.classList.add('hidden');
};

var adverts = generateAdverts();
drawPins(adverts);
drawCard(adverts[0]);



// module4-task1
// Обработчик события mouseup должен вызывать функцию,
// которая будет отменять изменения DOM-элементов, описанные в пункте «Неактивное состояние» технического задания.

var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
for (var i = 0; i < pins.length; i++) {
  pins[i].className = 'map__pin' + ' hidden';
}

var fields = document.querySelector('.ad-form').querySelectorAll('fieldset');
for (var i = 0; i < fields.length; i++) {
  fields[i].disabled = 'disabled';
}

var pinMain = document.querySelector('.map__pin--main');
document.querySelector('#address').value = getCoords(pinMain).top + ', ' + getCoords(pinMain).left;

var turnActive = function() {
  map.classList.remove('map--faded');
  for (var i = 0; i < fields.length; i++) {
    fields[i].disabled = '';
  }

  for (var i = 0; i < pins.length; i++) {
    pins[i].classList.remove('hidden');
  }

  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  document.querySelector('#address').value = getCoords(pinMain).top + ', ' + getCoords(pinMain).left;

}

pinMain.addEventListener('mouseup', turnActive);

var cards = map.querySelectorAll('.map__card');


for (var i = 0; i < pins.length; i++) {
var onPinClickShowCard = function () {
  for (var i = 0; i < cards.length; i++) {
    cards[i].classList.remove('hidden');
  }
}
pins[i].addEventListener('click', onPinClickShowCard);
}

var cardCloseBlock = map.querySelector('.popup__close');
var onClickCloseCard = function() {
for (var i = 0; i < cards.length; i++) {
  cards[i].classList.add('hidden');
}
}
cardCloseBlock.addEventListener('click', onClickCloseCard);



function getCoords(element) {
  var box = element.getBoundingClientRect();
  return {
    left: Math.floor(box.left + pageXOffset),
    top: Math.floor(box.top + pageYOffset)
  };
}
