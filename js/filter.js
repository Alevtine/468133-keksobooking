'use strict';

(function () {
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
}

var onGuestsFilter = function (advert) {
  if (housingGuests[housingGuests.selectedIndex].value === 'any') {
    return advert;
  }
  return advert.offer.guests === parseFloat(housingGuests[housingGuests.selectedIndex].value);
}


var onFeaturesFilter = function (advert) {
  for (var i = 0; i < housingFeatures.length; i++) {
    if (housingFeatures[i].checked && advert.offer.features.indexOf(housingFeatures[i].value) === -1) {
      return false;
    }
  }
  return true;
};

  var updateAdverts = function (evt) {
    var filteredAdverts = adverts.filter(onTypeFilter).filter(onPriceFilter).filter(onRoomsFilter).filter(onGuestsFilter).filter(onFeaturesFilter);
    window.removeCard();
    window.pins.removePins();
    window.pins.drawPins(filteredAdverts);

  };



  housingType.addEventListener('change', updateAdverts);
  housingPrice.addEventListener('change', updateAdverts);
  housingRooms.addEventListener('change', updateAdverts);
  housingGuests.addEventListener('change', updateAdverts);
  document.querySelector('#housing-features').addEventListener('change', updateAdverts);

})();
