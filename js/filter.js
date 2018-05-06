'use strict';

(function () {
  var ANY_VALUE = 'any';
  var PIN_SHOWED_QTTY = 5;
  var filters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features').querySelectorAll('.map__checkbox');

  var FILTER_PRICES = {
    low: 10000,
    middle: 50000
  };

  var onTypeFilter = function (advert) {
    if (housingType[housingType.selectedIndex].value === ANY_VALUE) {
      return advert;
    }
    return advert.offer.type === housingType[housingType.selectedIndex].value;
  };

  var onPriceFilter = function (advert) {
    switch (housingPrice[housingPrice.selectedIndex].value) {
      case 'low': return advert.offer.price <= FILTER_PRICES.low;
      case 'middle': return advert.offer.price >= FILTER_PRICES.low && advert.offer.price <= FILTER_PRICES.middle;
      case 'high': return advert.offer.price >= FILTER_PRICES.middle;
      default: return advert;
    }
  };

  var onRoomsFilter = function (advert) {
    if (housingRooms[housingRooms.selectedIndex].value === ANY_VALUE) {
      return advert;
    }
    return advert.offer.rooms === parseFloat(housingRooms[housingRooms.selectedIndex].value);
  };

  var onGuestsFilter = function (advert) {
    if (housingGuests[housingGuests.selectedIndex].value === ANY_VALUE) {
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
        .slice(0, PIN_SHOWED_QTTY);
    window.filteredAdverts = filteredAdverts;
    window.card.remove();
    window.pins.removeAll();
    window.pins.draw(filteredAdverts);
  };


  filters.addEventListener('change', function () {
    window.debounce(updateAdverts);
  });

})();
