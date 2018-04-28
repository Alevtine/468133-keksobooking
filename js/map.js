'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var pinMainSize = 65;
  var pinMainTail = 22;

  var pinMainCoords = {
    x: Math.floor(pinMain.offsetLeft + pinMainSize / 2),
    y: pinMain.offsetTop + pinMainSize + pinMainTail
  };

  document.querySelector('#address').value = pinMainCoords.x + ', ' + pinMainCoords.y;

  window.form.off();

  var turnActive = function () {
    map.classList.remove('map--faded');
    window.pins.drawPins(adverts);
    window.form.on();
    pinMain.removeEventListener('mouseup', turnActive);
  };

  var adverts = window.card.generateAdverts();

  var onPinMainDrag = function (mdevt) {
    mdevt.preventDefault();

    var beginCoords = {
      x: mdevt.clientX,
      y: mdevt.clientY
    };

    var onPinMainMousemove = function (moveevt) {
      moveevt.preventDefault();

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

      pinMain.style.left = pinMainEndCoord.x + 'px';
      pinMain.style.top = pinMainEndCoord.y + 'px';


      if (pinMain.offsetTop < 0) {
        pinMain.style.top = 0 + 'px';
      }

      if (pinMain.offsetTop + pinMainSize + pinMainTail > map.offsetHeight) {
        pinMain.style.top = map.offsetHeight - pinMainSize - pinMainTail + 'px';
      }

      if (pinMain.offsetLeft + pinMainSize / 2 < 0) {
        pinMain.style.left = 0 - pinMainSize / 2 + 'px';
      }

      if (pinMain.offsetLeft + pinMainSize / 2 > map.offsetWidth) {
        pinMain.style.left = map.offsetWidth - pinMainSize / 2 + 'px';
      }


      document.querySelector('#address').value = (Math.floor(pinMainEndCoord.x + pinMainSize / 2)) + ', ' + pinMainEndCoord.y;
    };

    var onPinMainMouseup = function (mupevt) {
      mupevt.preventDefault();
      turnActive();
      document.removeEventListener('mousemove', onPinMainMousemove);
      document.removeEventListener('mouseup', onPinMainMouseup);
    };

    document.addEventListener('mousemove', onPinMainMousemove);
    document.addEventListener('mouseup', onPinMainMouseup);
  };


  pinMain.addEventListener('mouseup', onPinMainDrag);
  pinMain.addEventListener('mousedown', onPinMainDrag);


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
        var mapPopupCard = map.querySelector('.map__card');
        if (mapPopupCard) {
          mapPopupCard.parentNode.removeChild(mapPopupCard);
        }
        var index = target.dataset.id;
        window.card.drawCard(adverts[index]);
        var cardCloseBlock = map.querySelector('.popup__close');
        cardCloseBlock.addEventListener('click', closeCard);
        return;
      }
      target = target.parentNode;
    }
  };

  map.addEventListener('click', onPinsClickCardPopup);


})();
