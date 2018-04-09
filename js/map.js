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
      title: offerTitles[makeRandomFromRange(1, offerTitles.length)],
      address: addressCoordinates,
      price: makeRandomFromRange(PRICE_MINIMUM, PRICE_MAXIMUM),
      type: offerTypes[makeRandomFromRange(1, offerTypes.length)],
      rooms: makeRandomFromRange(1, ROOMS_QUANTITY),
      guests: makeRandomFromRange(1, GUESTS_QUANTITY),
      checkin: checkTimes[makeRandomFromRange(1, checkTimes.length)],
      checkout: checkTimes[makeRandomFromRange(1, checkTimes.length)],
      features: shuffle(offerFeatures).slice(makeRandomFromRange(0, offerFeatures.length - 1)),
      description: ' ',
      photos: shuffle(offerPhotos)
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


var addPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';
  var imgPin = pinElement.getElementsByTagName('img');
  imgPin[0].src = pin.author.avatar;
  imgPin[0].alt = pin.offer.title;
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

var addCard = function (pin) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = pin.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = pin.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = pin.offer.type;
  if (pin.offer.type === 'flat') {
    cardElement.querySelector('.popup__type').textContent = 'Квартира';
  } else if (pin.offer.type === 'bungalo') {
    cardElement.querySelector('.popup__type').textContent = 'Бунгало';
  } else if (pin.offer.type === 'house') {
    cardElement.querySelector('.popup__type').textContent = 'Дом';
  } else {
    cardElement.querySelector('.popup__type').textContent = 'Дворец';
  }
  cardElement.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', ' + 'выезд до ' + pin.offer.checkout;

  cardElement.querySelector('.popup__description').textContent = pin.offer.description;

// поменять
  var featuresList = cardElement.querySelector('.popup__features');
  var featureElement = featuresList.querySelector('li');
  for (var i=0; i<offerFeatures.length; i++) {
  featureElement.className = 'popup__feature popup__feature--' + offerFeatures[makeRandomFromRange(0,offerFeatures.length)];
  }

  var addPhotosInCard = function (photosArr) {
    var photosList = cardElement.querySelector('.popup__photos');
    var photoElement = photosList.querySelector('img');
    for (var i = 0; i < photosArr.length; i++) {
      photoElement = photoElement.cloneNode(true);
      photoElement.src = photosArr[i];
      photosList.appendChild(photoElement);
    }
    photosList.firstElementChild.remove(photosList);
    return photosList;
  };
    addPhotosInCard(offerPhotos);

  cardElement.querySelector('img').setAttribute('src', pin.author.avatar);


  document.querySelector('.map__filters-container').insertAdjacentElement('beforeBegin', cardElement);
  return cardElement;
};

addCard(adverts[0]);
