'use strict';
(function () {
  var AVATAR_SIZE = 70;
  var PHOTO_SIZE = '100%';
  var avatarImg = document.querySelector('.ad-form-header__preview').querySelector('img');
  var avatarChooser = document.querySelector('#avatar');
  var avatarDropArea = document.querySelector('.ad-form__field');
  var photoDropZone = document.querySelector('.ad-form__upload');
  var photosChooser = document.querySelector('#images');
  var uploadedPhotoBlock = document.querySelector('.ad-form__photo');
  var photosContainer = document.querySelector('.ad-form__photo-container');
  var dragged;

  var avatarStyle = function () {
    avatarImg.setAttribute('width', AVATAR_SIZE);
    avatarImg.setAttribute('height', AVATAR_SIZE);
    avatarImg.parentNode.style.padding = '0';
  };

  avatarChooser.addEventListener('change', function () {
    window.data.fileChooser(avatarChooser.files[0], avatarImg);
    avatarStyle();
  });

  avatarDropArea.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
  });

  avatarDropArea.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });


  avatarDropArea.addEventListener('drop', function (evt) {
    evt.preventDefault();
    window.data.fileChooser(evt.dataTransfer.files[0], avatarImg);
    avatarStyle();
  });

  var uploadPhoto = function (chooser) {
    var img = avatarImg.cloneNode(true);
    img.style.width = PHOTO_SIZE;
    img.style.height = PHOTO_SIZE;
    var uploadedPhoto = uploadedPhotoBlock.cloneNode(true);
    uploadedPhotoBlock.remove();
    window.data.fileChooser(chooser, img);
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

  photosChooser.addEventListener('change', function () {
    for (var i = 0; i < photosChooser.files.length; i++) {
      uploadPhoto(photosChooser.files[i]);
    }
  });

  photoDropZone.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
  });

  photoDropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  photoDropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();
    for (var i = 0; i < evt.dataTransfer.files.length; i++) {
      uploadPhoto(evt.dataTransfer.files[i]);
    }
  });

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
    document.addEventListener(eventName, preventDefaults);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  window.deleteUploads = function () {
    avatarImg.src = 'img/muffin-grey.svg';
    Array.from(document.querySelectorAll('.ad-form__photo')).forEach(function (it) {
      it.remove();
    });
  };
})();
