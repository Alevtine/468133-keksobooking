'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var errBlock = document.createElement('div');
  var successMessage = document.querySelector('.success');

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

    onErrorShow: function (errorMessage) {
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
      setTimeout(window.data.removeErrBlock, 5000);
      errBlock.addEventListener('click', window.data.removeErrBlock);
    },

    removeErrBlock: function () {
      if (errBlock) {
        errBlock.parentNode.removeChild(errBlock);
      }
    },

    onSuccess: function () {
      successMessage.classList.remove('hidden');
      successMessage.addEventListener('click', window.data.removeSuccess);
      setTimeout(window.data.removeSuccess, 10000);
    },

    removeSuccess: function () {
      if (successMessage) {
        successMessage.classList.add('hidden');
      }
      window.map.turnOff();
    }

  };

})();
