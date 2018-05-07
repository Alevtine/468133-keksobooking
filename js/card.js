'use strict';

(function () {
  var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var fragment = document.createDocumentFragment();

  var addPhotosInCard = function (cardElement, photos) {
    var photosList = cardElement.querySelector('.popup__photos');
    var photoImg = photosList.querySelector('img');
    photos.forEach(function (elem, index) {
      elem = photoImg.cloneNode(true);
      elem.src = photos[index];
      fragment.appendChild(elem);
    });
    photosList.firstElementChild.remove(photosList);
    cardElement.appendChild(fragment);
  };

  var addFeaturesInCard = function (cardElement, features) {
    var featuresList = cardElement.querySelector('.popup__features');
    featuresList.innerHTML = '';
    features.forEach(function (elem, index) {
      elem = document.createElement('li');
      elem.className = 'popup__feature popup__feature--' + features[index];
      fragment.appendChild(elem);
    });
    featuresList.appendChild(fragment);
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

    draw: function (advert) {
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
    },

    remove: function () {
      var mapPopupCard = document.querySelector('.map__card');
      if (mapPopupCard) {
        mapPopupCard.parentNode.removeChild(mapPopupCard);
      }
    }
  };

})();
