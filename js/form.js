'use strict';

(function () {
  var MIN_PRICE_PALACE = 10000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_BUNGALO = 0;
  var priceInput = document.querySelector('#price');
  var typeInput = document.querySelector('#type');
  var roomsInput = document.querySelector('#room_number');
  var guestsInput = document.querySelector('#capacity');
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


  typeInput.addEventListener('change', function (evt) {
    var typeValue = evt.target.value;
    var minValue = 0;
    switch (typeValue) {
      case 'palace': minValue = MIN_PRICE_PALACE; break;
      case 'house': minValue = MIN_PRICE_HOUSE; break;
      case 'flat': minValue = MIN_PRICE_FLAT; break;
      case 'bungalo': minValue = MIN_PRICE_BUNGALO; break;
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
    guestsInput.querySelectorAll('option').forEach(function (elem) {
      if (CHANGE_ROOMS_RULES[currentValue].indexOf(elem.value) === -1) {
        elem.disabled = 'disabled';
      } else {
        elem.removeAttribute('disabled');
      }
    });
    if (CHANGE_ROOMS_RULES[currentValue].indexOf(guestsInput.value) === -1) {
      guestsInput.value = CHANGE_ROOMS_RULES[currentValue][0];
    }
  });

  priceInput.addEventListener('input', function (evt) {
    if (typeInput.value === 'flat' && evt.target.value < MIN_PRICE_FLAT) {
      priceInput.setCustomValidity('Цена не может быть меньше ' + MIN_PRICE_FLAT);
    } else if (typeInput.value === 'palace' && evt.target.value < MIN_PRICE_PALACE) {
      priceInput.setCustomValidity('Цена не может быть меньше ' + MIN_PRICE_PALACE);
    } else if (typeInput.value === 'house' && evt.target.value < MIN_PRICE_HOUSE) {
      priceInput.setCustomValidity('Цена не может быть меньше ' + MIN_PRICE_HOUSE);
    } else {
      priceInput.setCustomValidity('');
    }
  });


  formAd.addEventListener('submit', function (evt) {
    window.backend.sendData(new FormData(formAd),
        function () {
          window.data.onSuccess();
        },
        function (errorMesssage) {
          window.data.onError(errorMesssage);
        });

    evt.preventDefault();
  });


  window.form = {

    off: function () {
      formAd.classList.add('ad-form--disabled');
      fields.forEach(function (elem) {
        elem.disabled = 'disabled';
      });
      formAd.reset();
    },

    on: function () {
      formAd.classList.remove('ad-form--disabled');
      fields.forEach(function (elem) {
        elem.disabled = '';
      });
    }

  };


})();
