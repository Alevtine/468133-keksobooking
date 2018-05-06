'use strict';

(function () {
  var cardTemplate = document.querySelector('template').content.querySelector('.map__card');

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


  window.card = {

    drawCard: function (advert) {
      var cardElement = cardTemplate.cloneNode(true);
      cardElement.querySelector('.popup__title').textContent = advert.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
      cardElement.querySelector('.popup__type').textContent = apartmentType(advert.offer.type);
      cardElement.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', ' + 'выезд до ' + advert.offer.checkout;
      cardElement.querySelector('.popup__description').textContent = advert.offer.description;

      addFeaturesInCard(cardElement, advert.offer.features);
      addPhotosInCard(cardElement, advert.offer.photos);

      cardElement.querySelector('img').src = advert.author.avatar;
      document.querySelector('.map__filters-container').insertAdjacentElement('beforeBegin', cardElement);
    }
  };

})();
