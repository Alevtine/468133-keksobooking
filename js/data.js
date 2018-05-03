'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var errBlock = document.createElement('div');

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

    onErrorShow: function () {
      errBlock.style = 'z-index: 1; background-color: pink;';
      errBlock.style.position = 'absolute';
      errBlock.style.top = '30%';
      errBlock.style.left = '40%';
      errBlock.style.fontSize = '40px';
      errBlock.textContent = 'some error';
      document.body.insertAdjacentElement('afterbegin', errBlock);

      errBlock.addEventListener('click', function () {
        errBlock.parentNode.removeChild(errBlock);
      });
    }
  };

})();
