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


var makeRandomFromRange = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min));
};

/*
var func = function() {
  return Math.random() * 2 - 1
}*/

var adverts = [];

for (var i = 0; i < advertsQuantity; i++) {
  var addressX = makeRandomFromRange(X_MINIMUM, X_MAXIMUM);
  var addressY = makeRandomFromRange(Y_MINIMUM, Y_MAXIMUM);
  var addressCoordinates = addressX + ', ' + addressY;

  var advert = {
    author: {
      avatar: offerAvatars[i]
    },
    offer: {
      title: offerTitles[makeRandomFromRange(1,offerTitles.length)],
      address: addressCoordinates,
      price: makeRandomFromRange(PRICE_MINIMUM, PRICE_MAXIMUM),
      type: offerTypes[makeRandomFromRange(1,offerTypes.length)],
      rooms: makeRandomFromRange(1,ROOMS_QUANTITY),
      guests: makeRandomFromRange(1,GUESTS_QUANTITY),
      checkin: checkTimes[makeRandomFromRange(1,checkTimes.length)],
      checkout: checkTimes[makeRandomFromRange(1,checkTimes.length)],
      features: offerFeatures.slice(makeRandomFromRange(0,offerFeatures.length-1)),
      description: ' ',
      photos: offerPhotos.sort(() => Math.random() * 2 - 1),
    },
    location: {
      x: addressX,
      y: addressY
    }
  };
  adverts.push(advert);
}


var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var pinsBlock = document.querySelector('.map__pins');


var addPin = function (advert) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = advert.location.x + 'px';
  pinElement.style.top = advert.location.y + 'px';
  var imgPin = pinElement.getElementsByTagName('img');
  imgPin[0].src = advert.author.avatar;
  imgPin[0].alt = advert.offer.title;
  return pinElement;
};

var drawPin = function () {
  var pinFragment = document.createDocumentFragment();
  for (var j = 0; j < adverts.length; j++) {
    pinFragment.appendChild(addPin(adverts[j]));
  }
  return pinsBlock.appendChild(pinFragment);
};

drawPin();

var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
var cardsBlock = document.querySelector('.map');
//var cardFragment = document.createDocumentFragment();

var addCard = function (advert) {
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
  //cardsBlock.appendChild(cardElement);
  //document.querySelector('.map__pins').insertAdjacentElement('afterEnd', cardElement);
  //document.querySelector('.map__pins').after(cardElement);
  //document.querySelector('.map__filters-container').before(cardElement);
  return cardElement;
};

addCard(adverts[0]);
