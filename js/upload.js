'use strict';
(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var AVATAR_SIZE = 70;
  var PHOTO_SIZE = '100%';
  var avatarImg = document.querySelector('.ad-form-header__preview').querySelector('img');
  var avatarChooser = document.querySelector('#avatar');
  var photosChooser = document.querySelector('#images');

  var fileChooser = function (chooser, upload) {
    var file = chooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        upload.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  avatarChooser.addEventListener('change', function () {
    fileChooser(avatarChooser, avatarImg);
    avatarImg.setAttribute('width', AVATAR_SIZE);
    avatarImg.setAttribute('height', AVATAR_SIZE);
    avatarImg.parentNode.style.padding = '0';
  });

  // переделать нормально без повторов
  var uploadedPhotoBlock = document.querySelector('.ad-form__photo');
  var photosContainer = document.querySelector('.ad-form__photo-container');
  var dragged;

  var uploadPhoto = function () {
    var img = avatarImg.cloneNode(true);
    img.style.width = PHOTO_SIZE;
    img.style.height = PHOTO_SIZE;
    var uploadedPhoto = uploadedPhotoBlock.cloneNode(true);
    uploadedPhotoBlock.remove();
    fileChooser(photosChooser, img);
    uploadedPhoto.appendChild(img);
    photosContainer.appendChild(uploadedPhoto);

    uploadedPhoto.addEventListener('dragstart', function (evt) {
      dragged = evt.target;
      evt.dataTransfer.dropEffect = 'move';
    });

    uploadedPhoto.addEventListener('dragover', function (evt) {
      evt.preventDefault();
      uploadedPhoto.style.border = '4px dashed rgb(255, 109, 81)';
      return false;
    });

    uploadedPhoto.addEventListener('dragenter', function (evt) {
      evt.preventDefault();
    });

    uploadedPhoto.addEventListener('dragleave', function (evt) {
      evt.preventDefault();
      uploadedPhoto.style.border = '';
    });

    uploadedPhoto.addEventListener('dragend', function (evt) {
      evt.preventDefault();
      uploadedPhoto.style.border = '';
    });

    uploadedPhoto.addEventListener('drop', function (evt) {
      var targetParent = evt.target.parentNode;
      var dragParent = dragged.parentNode;
      targetParent.removeChild(evt.target);
      targetParent.appendChild(dragged);
      dragParent.appendChild(evt.target);
      evt.preventDefault();
    });

    photosContainer.insertAdjacentElement('beforeend', uploadedPhoto);
  };

  photosChooser.addEventListener('change', uploadPhoto);

  var dropZone = document.querySelector('.ad-form__upload');

  dropZone.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
  });

  dropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  dropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();
    var dropped = evt.dataTransfer.files[0];
    var fileName = dropped.name.toLowerCase();
    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        dropped.src = reader.result;
      });
      reader.readAsDataURL(dropped);
    }
    dropped = avatarImg.cloneNode(true);
    dropped.style.width = PHOTO_SIZE;
    dropped.style.height = PHOTO_SIZE;
    var droppedPhoto = uploadedPhotoBlock.cloneNode(true);
    uploadedPhotoBlock.remove();
    droppedPhoto.appendChild(dropped);
    photosContainer.appendChild(droppedPhoto);
  });

  document.addEventListener('drop', function (evt) {
    evt.preventDefault();
  });

  window.deleteUploads = function () {
    avatarImg.src = 'img/muffin-grey.svg';
    Array.from(document.querySelectorAll('.ad-form__photo')).forEach(function (it) {
      it.remove();
    });
  };

})();
