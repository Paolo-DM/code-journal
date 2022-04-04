/* global data */
/* exported data */
var $photoUrl = document.querySelector('#photo-url');
var $photo = document.querySelector('.photo');

$photoUrl.addEventListener('input', function () {
  $photo.setAttribute('src', $photoUrl.value);
});
