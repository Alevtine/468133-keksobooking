'use strict';

(function () {
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var pinsBlock = document.querySelector('.map__pins');

  var addPin = function (pin, index) {

    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = pin.location.x + 'px';
    pinElement.style.top = pin.location.y + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;
    pinElement.setAttribute('data-id', index);
    return pinElement;

  };


  window.pins = {
    draw: function (adverts) {
      var pinFragment = document.createDocumentFragment();
      for (var j = 0; j < adverts.length; j++) {
        pinFragment.appendChild(addPin(adverts[j], j));
      }
      pinsBlock.appendChild(pinFragment);
    },

    removeAll: function () {
      var allPins = document.querySelectorAll('.map__pin[data-id]');
      allPins.forEach(function (elem) {
        elem.parentNode.removeChild(elem);
      });
    }
  };


})();
