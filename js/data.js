'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;
  var errBlock = document.createElement('div');
  var successMessage = document.querySelector('.success');

  window.debounce = function (action) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(action, DEBOUNCE_INTERVAL);
  };


  window.data = {

    isEscPress: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    isEnterPress: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },

    onError: function (errorMessage) {
      errBlock.style.position = 'fixed';
      errBlock.style.top = '20%';
      errBlock.style.left = '40%';
      errBlock.style.zIndex = '10';
      errBlock.style.maxWidth = '600px';
      errBlock.style.backgroundColor = '#e4e4de';
      errBlock.style.borderRadius = '5px';
      errBlock.style.border = '4px solid #ffaa99';
      errBlock.textContent = errorMessage;
      errBlock.style.padding = '20px 70px';
      document.body.insertAdjacentElement('afterbegin', errBlock);
      document.body.insertAdjacentElement('afterbegin', errBlock);
      errBlock.addEventListener('click', window.data.hideError);
      setTimeout(window.data.hideError, 5000);
    },

    hideError: function () {
      if (document.contains(errBlock)) {
        errBlock.parentNode.removeChild(errBlock);
      }
    },

    onSuccess: function () {
      successMessage.classList.remove('hidden');
      successMessage.addEventListener('click', window.data.removeSuccess);
      setTimeout(window.data.removeSuccess, 5000);
    },

    removeSuccess: function () {
      if (successMessage) {
        successMessage.classList.add('hidden');
      }
      window.map.turnOff();
    },

    filterReset: function () {
      document.querySelector('.map__filters').reset();
    },

    shuffle: function (array) {
      for (var i = 0; i < array.length; i++) {
        var swapIdx = Math.floor(Math.random() * array.length);
        var tmp = array[swapIdx];
        array[swapIdx] = array[i];
        array[i] = tmp;
      }
      return array;
    }
  };

})();
