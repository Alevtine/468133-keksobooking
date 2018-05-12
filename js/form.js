'use strict';

(function () {
  var MIN_PRICE_PALACE = 10000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_BUNGALO = 0;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var AVATAR_SIZE = 70;
  var PHOTO_SIZE = '100%';
  var priceInput = document.querySelector('#price');
  var typeInput = document.querySelector('#type');
  var roomsInput = document.querySelector('#room_number');
  var guestsInput = document.querySelector('#capacity');
  var checkInInput = document.querySelector('#timein');
  var checkOutInput = document.querySelector('#timeout');
  var formAd = document.querySelector('.ad-form');
  var fields = formAd.querySelectorAll('fieldset');
  var avatarImg = document.querySelector('.ad-form-header__preview').querySelector('img');
  var avatarChooser = document.querySelector('#avatar');
  var uploadedPhotoBlock = document.querySelector('.ad-form__photo');
  var photosChooser = document.querySelector('#images');
  var photosContainer = document.querySelector('.ad-form__photo-container');

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

  var fileChooser = function (chooser, pic) {
    var file = chooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        pic.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  avatarChooser.addEventListener('change', function () {
    fileChooser(avatarChooser, avatarImg);
    avatarImg.setAttribute('width', AVATAR_SIZE);
    avatarImg.setAttribute('height', AVATAR_SIZE);
    avatarImg.parentNode.style.padding = '0'
  });

  photosChooser.addEventListener('change', function () {
    var img = avatarImg.cloneNode(true);
    img.style.width = PHOTO_SIZE;
    img.style.height = PHOTO_SIZE;
    var uploadedPhoto = uploadedPhotoBlock.cloneNode(true);
    uploadedPhotoBlock.remove();
    fileChooser(photosChooser, img);
    uploadedPhoto.appendChild(img);
    photosContainer.appendChild(uploadedPhoto);
  });


// dr'n'drop
// var dropArea = document.querySelector('.ad-form__upload');
// var dragged;


  window.deleteUploads = function () {
    avatarImg.src = 'img/muffin-grey.svg';
    Array.from(document.querySelectorAll('.ad-form__photo')).forEach(function (it) {
      it.remove();
    });
  };

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
