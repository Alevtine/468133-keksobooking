'use strict';

(function () {

  var urlToGET = 'https://js.dump.academy/keksobooking/data';
  var urlToPOST = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;

  var dataLoad = function (method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Получен ответ:  ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка  ' + xhr.status);
    });

    xhr.addEventListener('timeout', function () {
      onError('запрос не выполнился за  ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    getData: function (onLoad, onError) {
      dataLoad('GET', urlToGET, onLoad, onError);
    },

    sendData: function (data, onLoad, onError) {
      dataLoad('POST', urlToPOST, onLoad, onError, data);
    }
  };


})();
