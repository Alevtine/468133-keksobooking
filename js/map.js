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

var makeRandom = function (massive) {
  var randomValue = massive[Math.trunc(Math.random() * massive.length)];
  return randomValue;
};

var makeRandomFromRange = function (min, max) {
  var randomPrice = min + Math.random() * (max + 1 - min);
  randomPrice = Math.floor(randomPrice);
  return randomPrice;
};

var makeRandomNumber = function (number) {
  return Math.ceil(Math.random() * number);
};

var shuffle = function (deck) {
  for (var i = 0; i < deck.length; i++) {
    var swapIdx = Math.trunc(Math.random() * deck.length);
    var tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp;
  }
  return deck;
};

var shuffleLength = function (deck) {
  for (var i = 0; i < deck.length; i++) {
    var swapIdx = Math.trunc(Math.random() * deck.length);
    var tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp;
  }
  deck.length = Math.trunc(Math.random() * deck.length + 1);
  return deck;
};

var addressX = makeRandomFromRange(X_MINIMUM, X_MAXIMUM);
var addressY = makeRandomFromRange(Y_MINIMUM, Y_MAXIMUM);

var addressCoordinates = addressX + ', ' + addressY;

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
/*
Итоговую разметку метки .map__pin можно взять из шаблона .map__card.

У метки должны быть следующие данные:
Координаты:style="left: {{location.x}}px; top: {{location.y}}px;"
src="{{author.avatar}}"
alt="{{заголовок объявления}}"
*/

var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var pinElement = pinTemplate.cloneNode(true);

var imgPin = pinElement.getElementsByTagName('img');
imgPin.src = advert.author.avatar;

pinElement.style.left = addressX;
pinElement.style.top = addressY;

// pinElement.src = advert.author.avatar;
// pinElement.alt = advert.offer.title;

var pinsBlock = document.querySelector('.map__pins');
pinsBlock.appendChild(pinElement);
