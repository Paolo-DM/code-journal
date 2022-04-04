/* global data */
/* exported data */
var $photoUrl = document.querySelector('#photo-url');
var $photo = document.querySelector('.photo');
var $form = document.querySelector('form');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');

$photoUrl.addEventListener('input', function () {
  $photo.setAttribute('src', $photoUrl.value);
});

$form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  var entryValues = {
    title: $title.value,
    photoUrl: $photoUrl.value,
    notes: $notes.value,
    nextEntryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(entryValues);
  $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}
