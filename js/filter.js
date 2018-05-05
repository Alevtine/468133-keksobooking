'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features').querySelectorAll('.map__checkbox');

  var onTypeFilter = function (advert) {
    if (housingType[housingType.selectedIndex].value === 'any') {
      return advert;
    }
    return advert.offer.type === housingType[housingType.selectedIndex].value;
  };

  var onPriceFilter = function (advert) {
    switch (housingPrice[housingPrice.selectedIndex].value) {
      case 'low': return advert.offer.price <= 10000;
      case 'middle': return advert.offer.price >= 10000 && advert.offer.price <= 50000;
      case 'high': return advert.offer.price >= 50000;
      default: return advert;
    }
  };

  var onRoomsFilter = function (advert) {
    if (housingRooms[housingRooms.selectedIndex].value === 'any') {
      return advert;
    }
    return advert.offer.rooms === parseFloat(housingRooms[housingRooms.selectedIndex].value);
  };

  var onGuestsFilter = function (advert) {
    if (housingGuests[housingGuests.selectedIndex].value === 'any') {
      return advert;
    }
    return advert.offer.guests === parseFloat(housingGuests[housingGuests.selectedIndex].value);
  };

  var onFeaturesFilter = function (advert) {
    for (var i = 0; i < housingFeatures.length; i++) {
      if (housingFeatures[i].checked && advert.offer.features.indexOf(housingFeatures[i].value) === -1) {
        return false;
      }
    }
    return true;
  };

  var updateAdverts = function () {
    var filteredAdverts = window.adverts
        .filter(onTypeFilter)
        .filter(onPriceFilter)
        .filter(onRoomsFilter)
        .filter(onGuestsFilter)
        .filter(onFeaturesFilter)
        .slice(0, 5);
    window.filteredAdverts = filteredAdverts;
    window.removeCard();
    window.pins.removePins();
    window.pins.drawPins(filteredAdverts);
  };


  filters.addEventListener('change', function () {
    window.debounce(updateAdverts);
  });

})();
