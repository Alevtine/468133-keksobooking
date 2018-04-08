'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var ROOMS_QUANTITY = 5;
var GUESTS_QUANTITY = 50;
var PRICE_MINIMUM = 1000;
var PRICE_MAXIMUM = 1000000;
var X_MINIMUM = 300;
var X_MAXIMUM = 900;
var Y_MINIMUM = 150;
var Y_MAXIMUM = 500;
var advertsQuantity = 8;

var offerTitles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var offerAvatars = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

var checkTimes = ['12:00', '13:00', '14:00'];
var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];


var makeRandom = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var makeRandomFromRange = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min));
};

var makeRandomNumber = function (number) {
  return Math.ceil(Math.random() * number);
};


var shuffle = function (array) {
  for (var i = 0; i < array.length; i++) {
    var swapIdx = Math.round(Math.random() * array.length);
    var tmp = array[swapIdx];
    array[swapIdx] = array[i];
    array[i] = tmp;
  }
  return array;
};

var shuffleLength = function (array) {
  for (var i = 0; i < array.length; i++) {
    var swapIdx = Math.trunc(Math.random() * array.length);
    var tmp = array[swapIdx];
    array[swapIdx] = array[i];
    array[i] = tmp;
  }
  array.length = Math.trunc(Math.random() * array.length + 1);
  return array;
};

var addressX = makeRandomFromRange(X_MINIMUM, X_MAXIMUM);
var addressY = makeRandomFromRange(Y_MINIMUM, Y_MAXIMUM);
var addressCoordinates = addressX + ', ' + addressY;


var adverts = [];

for (var i = 0; i < advertsQuantity; i++) {
  var advert = {
    author: {
      avatar: makeRandom(offerAvatars)
    },
    offer: {
      title: makeRandom(offerTitles),
      address: addressCoordinates,
      price: makeRandomFromRange(PRICE_MINIMUM, PRICE_MAXIMUM),
      type: makeRandom(offerTypes),
      rooms: makeRandomNumber(ROOMS_QUANTITY),
      guests: makeRandomNumber(GUESTS_QUANTITY),
      checkin: makeRandom(checkTimes),
      checkout: makeRandom(checkTimes),
      features: shuffleLength(offerFeatures),
      description: ' ',
      photos: shuffle(offerPhotos)
    },
    location: {
      x: addressX,
      y: addressY
    }
  };
  adverts[i] = advert;
}


var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var pinsBlock = document.querySelector('.map__pins');


var addPin = function () {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = addressX + 'px';
  pinElement.style.top = addressY + 'px';
  var imgPin = pinElement.getElementsByTagName('img');
  imgPin.src = advert.author.avatar;
  imgPin.alt = advert.offer.title;
  return pinElement;
};

var drawPin = function () {
  var pinFragment = document.createDocumentFragment();
  for (var j = 0; j < adverts.length; j++) {
    pinFragment.appendChild(addPin(adverts[j]));
  }
  return pinsBlock.appendChild(pinFragment);
};

drawPin(addPin);

var cardTemplate = document.querySelector('template').content.querySelector('.map__card');

var addCard = function () {
  var cardElement = cardTemplate.cloneNode(true);

  var cardTitle = document.getElementsByClassName('.popup__title');
  cardTitle = advert.offer.title;
  var cardAddress = document.getElementsByClassName('.popup__text--address');
  cardAddress = advert.offer.address;
  var cardPrice = document.getElementsByClassName('.popup__text--price');
  cardPrice = advert.offer.price + '₽/ночь';
  var cardType = document.getElementsByClassName('.popup__type');
  if (advert.offer.type === 'flat') {
    cardType = 'Квартира';
  } else if (advert.offer.type === 'bungalo') {
    cardType = 'Бунгало';
  } else if (advert.offer.type === 'house') {
    cardType = 'Дом';
  } else {
    cardType = 'Дворец';
  }
  var cardVolumes = document.getElementsByClassName('.popup__text--capacity');
  cardVolumes = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  var cardTimes = document.getElementsByClassName('popup__text--time');
  cardTimes = 'Заезд после ' + advert.offer.checkin + ', ' + 'выезд до ' + advert.offer.checkout;
  var cardFeatures = document.getElementsByClassName('.popup__features');
  cardFeatures = advert.offer.features;
  var cardDescription = document.getElementsByClassName('.popup__description');
  cardDescription = advert.offer.description;
  var cardPhotos = document.getElementsByClassName('.popup__photos');
  var userPic = document.getElementsByClassName('.popup__avatar');
  userPic.src = advert.author.avatar;

  document.querySelector('.map__filters-container').insertAdjacentElement('beforeBegin', cardElement);

  return cardElement;
};

var drawCard = function () {
  var cardFragment = document.createDocumentFragment();
  var cardsBlock = document.querySelector('.map');
  for (var i = 0; i < adverts.length; i++) {
    cardFragment.appendChild(addCard(adverts[i]));
  }
  return cardsBlock.appendChild(cardFragment);
};

drawCard(addCard);
