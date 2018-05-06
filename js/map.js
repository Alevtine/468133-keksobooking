'use strict';

(function () {
  var PIN_MAIN_SIZE = 65;
  var PIN_MAIN_TAIL = 22;
  var PIN_SHOWED_QTTY = 5;
  var MAP_BORDER_X_LIMITS = [0, 1135];
  var MAP_BORDER_Y_LIMITS = [150, 625];
  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var clearFormButton = document.querySelector('.ad-form__reset');

  window.form.off();

  window.map = {

    pinMainCoords: {
      x: Math.floor(pinMain.offsetLeft + PIN_MAIN_SIZE / 2),
      y: pinMain.offsetTop + PIN_MAIN_SIZE + PIN_MAIN_TAIL
    },

    turnOff: function () {
      window.card.remove();
      document.querySelector('.map').classList.add('map--faded');
      window.form.off();
      window.pins.removeAll();
      window.data.filterReset();
      pinMain.addEventListener('mouseup', window.map.turnActive);
      pinMain.style.left = window.map.pinMainCoords.x + 'px';
      pinMain.style.top = window.map.pinMainCoords.y + 'px';
      document.querySelector('#address').value = window.map.pinMainCoords.x + ', ' + window.map.pinMainCoords.y;
    },

    turnActive: function () {
      map.classList.remove('map--faded');
      window.backend.getData(function (ads) {
        window.data.shuffle(ads);
        window.adverts = ads;
        window.filteredAdverts = ads.slice(0, PIN_SHOWED_QTTY);
        window.pins.draw(window.filteredAdverts);
      },
      function () {});
      window.form.on();
      pinMain.removeEventListener('mouseup', window.map.turnActive);
    }

  };

  pinMain.style.left = window.map.pinMainCoords.x + 'px';
  pinMain.style.top = window.map.pinMainCoords.y + 'px';
  document.querySelector('#address').value = window.map.pinMainCoords.x + ', ' + window.map.pinMainCoords.y;

  pinMain.addEventListener('mouseup', window.map.turnActive);

  var onPinMainMousedown = function (evt) {

    window.beginCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    map.addEventListener('mousemove', onPinMainMousemove);
    map.addEventListener('mouseup', onPinMainMouseup);
  };


  var onPinMainMousemove = function (evt) {

    var shift = {
      x: window.beginCoords.x - evt.clientX,
      y: window.beginCoords.y - evt.clientY
    };

    window.beginCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var pinMainEndCoord = {
      x: pinMain.offsetLeft - shift.x,
      y: pinMain.offsetTop - shift.y
    };


    if (pinMainEndCoord.y < MAP_BORDER_Y_LIMITS[0]) {
      pinMainEndCoord.y = MAP_BORDER_Y_LIMITS[0];
    } else if (pinMainEndCoord.y > MAP_BORDER_Y_LIMITS[1]) {
      pinMainEndCoord.y = MAP_BORDER_Y_LIMITS[1];
    }

    if (pinMainEndCoord.x < MAP_BORDER_X_LIMITS[0]) {
      pinMainEndCoord.x = MAP_BORDER_X_LIMITS[0];
    } else if (pinMainEndCoord.x > MAP_BORDER_X_LIMITS[1]) {
      pinMainEndCoord.x = MAP_BORDER_X_LIMITS[1];
    }

    pinMain.style.left = pinMainEndCoord.x + 'px';
    pinMain.style.top = pinMainEndCoord.y + 'px';

    document.querySelector('#address').value = (Math.floor(pinMainEndCoord.x + PIN_MAIN_SIZE / 2)) + ', ' + (pinMainEndCoord.y + PIN_MAIN_SIZE + PIN_MAIN_TAIL);

  };

  var onPinMainMouseup = function () {
    map.removeEventListener('mousemove', onPinMainMousemove);
    map.removeEventListener('mouseup', onPinMainMouseup);
  };


  pinMain.addEventListener('mousedown', onPinMainMousedown);


  var closeCard = function (evt) {
    var target = evt.target;
    while (!target.classList.contains('map__card')) {
      target = target.parentNode;
    }
    target.parentNode.removeChild(target);
    evt.stopPropagation();
  };


  var onPinsClickCardPopup = function (evt) {
    var target = evt.target;

    while (!target.classList.contains('map')) {
      if (target.classList.contains('map__pin') && !target.classList.contains('map__pin--main')) {
        window.card.remove();
        var index = target.dataset.id;
        window.card.draw(window.filteredAdverts[index]);
        var cardCloseBlock = map.querySelector('.popup__close');
        cardCloseBlock.addEventListener('click', closeCard);
        return;
      }
      target = target.parentNode;
    }
  };

  map.addEventListener('click', onPinsClickCardPopup);

  document.addEventListener('keydown', function (evt) {
    window.data.isEscPress(evt, window.card.remove);
    evt.stopPropagation();
  });

  clearFormButton.addEventListener('click', function () {
    window.map.turnOff();
  });

})();
