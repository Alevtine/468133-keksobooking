'use strict';

(function () {
  var priceInput = document.querySelector('#price');
  var typeInput = document.querySelector('#type');
  var roomsInput = document.querySelector('#room_number');
  var guestsInput = document.querySelector('#capacity');
  var guests = guestsInput.querySelectorAll('option');
  var checkInInput = document.querySelector('#timein');
  var checkOutInput = document.querySelector('#timeout');
  var formAd = document.querySelector('.ad-form');
  var fields = formAd.querySelectorAll('fieldset');

  var CHANGE_ROOMS_RULES = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  window.form = {

    off: function () {
      formAd.classList.add('ad-form--disabled');
      for (var j = 0; j < fields.length; j++) {
        fields[j].disabled = 'disabled';
      }
      formAd.reset();
    },

    on: function () {
      formAd.classList.remove('ad-form--disabled');
      for (var t = 0; t < fields.length; t++) {
        fields[t].disabled = '';
      }
    }
  };

  for (var b = 0; b < guests.length; b++) {
    if (guests[b] !== guests[2]) {
      guests[b].disabled = 'disabled';
    }
  }

  typeInput.addEventListener('change', function (evt) {
    var typeValue = evt.target.value;
    var minValue = 0;
    switch (typeValue) {
      case 'palace': minValue = 10000; break;
      case 'house': minValue = 5000; break;
      case 'flat': minValue = 1000; break;
      case 'bungalo': minValue = 0; break;
    }
    priceInput.setAttribute('min', minValue);
    priceInput.setAttribute('placeholder', minValue);
  });


  checkInInput.addEventListener('change', function (evt) {
    checkOutInput.value = evt.target.value;
  });

  checkOutInput.addEventListener('change', function (evt) {
    checkInInput.value = evt.target.value;
  });


  roomsInput.addEventListener('change', function (evt) {
    var currentValue = evt.target.value;
    for (var i = 0; i < guestsInput.options.length; i++) {
      if (CHANGE_ROOMS_RULES[currentValue].indexOf(guestsInput.options[i].value) === -1) {
        guestsInput.options[i].disabled = 'disabled';
      } else {
        guestsInput.options[i].removeAttribute('disabled');
      }
    }
    if (CHANGE_ROOMS_RULES[currentValue].indexOf(guestsInput.value) === -1) {
      guestsInput.value = CHANGE_ROOMS_RULES[currentValue][0];
    }
  });

  formAd.addEventListener('submit', function (evt) {
    window.backend.sendData(new FormData(formAd),
        function () {
          window.data.onSuccess();
        },
        function (errorMesssage) {
          window.data.onErrorShow(errorMesssage);
        });

    evt.preventDefault();
  });

})();
