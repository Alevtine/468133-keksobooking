'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var pinMainSize = 65;
  var pinMainTail = 22;
  var PIN_SHOWED_QTTY = 5;
  var mapBorderXlimit = [0, 1135];
  var mapBorderYlimit = [150, 625];
  var clearFormButton = document.querySelector('.ad-form__reset');

  window.form.off();

  window.map = {

    pinMainCoords: {
      x: Math.floor(pinMain.offsetLeft + pinMainSize / 2),
      y: pinMain.offsetTop + pinMainSize + pinMainTail
    },

    turnOff: function () {
      window.removeCard();
      document.querySelector('.map').classList.add('map--faded');
      window.form.off();
      window.pins.removePins();
      window.data.filterReset();
      pinMain.addEventListener('mouseup', window.map.turnActive);
      document.querySelector('.map__pin--main').style.left = window.map.pinMainCoords.x + 'px';
      document.querySelector('.map__pin--main').style.top = window.map.pinMainCoords.y + 'px';
      document.querySelector('#address').value = window.map.pinMainCoords.x + ', ' + window.map.pinMainCoords.y;
    },

    turnActive: function () {
      map.classList.remove('map--faded');
      window.backend.getData(function (ads) {
        window.data.shuffle(ads);
        window.adverts = ads;
        window.filteredAdverts = ads.slice(0, PIN_SHOWED_QTTY);
        window.pins.drawPins(window.filteredAdverts);
      },
      function () {});
      window.form.on();
      pinMain.removeEventListener('mouseup', window.map.turnActive);
    }

  };

  document.querySelector('#address').value = window.map.pinMainCoords.x + ', ' + window.map.pinMainCoords.y;

  pinMain.addEventListener('mouseup', window.map.turnActive);

  var onPinMainMousedown = function (mdevt) {

    var beginCoords = {
      x: mdevt.clientX,
      y: mdevt.clientY
    };

    var onPinMainMousemove = function (moveevt) {

      var shift = {
        x: beginCoords.x - moveevt.clientX,
        y: beginCoords.y - moveevt.clientY
      };

      beginCoords = {
        x: moveevt.clientX,
        y: moveevt.clientY
      };

      var pinMainEndCoord = {
        x: pinMain.offsetLeft - shift.x,
        y: pinMain.offsetTop - shift.y
      };


      if (pinMainEndCoord.y < mapBorderYlimit[0]) {
        pinMainEndCoord.y = mapBorderYlimit[0];
      } else if (pinMainEndCoord.y > mapBorderYlimit[1]) {
        pinMainEndCoord.y = mapBorderYlimit[1];
      }

      if (pinMainEndCoord.x < mapBorderXlimit[0]) {
        pinMainEndCoord.x = mapBorderXlimit[0];
      } else if (pinMainEndCoord.x > mapBorderXlimit[1]) {
        pinMainEndCoord.x = mapBorderXlimit[1];
      }

      pinMain.style.left = pinMainEndCoord.x + 'px';
      pinMain.style.top = pinMainEndCoord.y + 'px';

      document.querySelector('#address').value = (Math.floor(pinMainEndCoord.x + pinMainSize / 2)) + ', ' + (pinMainEndCoord.y + pinMainSize + pinMainTail);

    };

    var onPinMainMouseup = function () {
      map.removeEventListener('mousemove', onPinMainMousemove);
      map.removeEventListener('mouseup', onPinMainMouseup);
    };

    map.addEventListener('mousemove', onPinMainMousemove);
    map.addEventListener('mouseup', onPinMainMouseup);
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


  window.removeCard = function () {
    var mapPopupCard = map.querySelector('.map__card');
    if (mapPopupCard) {
      mapPopupCard.parentNode.removeChild(mapPopupCard);
    }
  };

  var onPinsClickCardPopup = function (evt) {
    var target = evt.target;

    while (!target.classList.contains('map')) {
      if (target.classList.contains('map__pin') && !target.classList.contains('map__pin--main')) {
        window.removeCard();
        var index = target.dataset.id;
        window.card.drawCard(window.filteredAdverts[index]);
        var cardCloseBlock = map.querySelector('.popup__close');
        cardCloseBlock.addEventListener('click', closeCard);
        return;
      }
      target = target.parentNode;
    }
  };

  map.addEventListener('click', onPinsClickCardPopup);

  document.addEventListener('keydown', function (evt) {
    window.data.isEscPress(evt, window.removeCard);
    evt.stopPropagation();
  });

  clearFormButton.addEventListener('click', window.map.turnOff);


})();
