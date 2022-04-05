/* global data */
/* exported data */
var $photoUrl = document.querySelector('#photo-url');
var $photo = document.querySelector('.photo');
var $form = document.querySelector('form');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $ul = document.querySelector('.ul-list');
var $noEntries = document.querySelector('.no-entries');
var $newFormBtn = document.querySelector('.new-btn');
var $modal = document.querySelector('.modal');
var $entries = document.querySelector('.entries');
var $newEntry = document.querySelector('.new-entry');

$photoUrl.addEventListener('input', function () {
  $photo.setAttribute('src', $photoUrl.value);
});

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
  $modal.classList.add('hidden');
  $ul.prepend(renderEntry(entryValues));
  $entries.classList.remove('hidden');
}

function renderEntry(entry) {
  $noEntries.classList.add('hidden');

  var $li = document.createElement('li');
  $li.setAttribute('class', 'row');
  var $photoEl = document.createElement('img');
  $photoEl.setAttribute('class', 'column-half');
  $photoEl.setAttribute('src', entry.photoUrl);
  var $colHalfDiv = document.createElement('div');
  $colHalfDiv.setAttribute('class', 'column-half');
  var $divSpcBtwn = document.createElement('div');
  $divSpcBtwn.setAttribute('class', 'space-between');
  var $h2Title = document.createElement('h2');
  $h2Title.textContent = entry.title;
  var $editIcon = document.createElement('i');
  $editIcon.setAttribute('class', 'fas fa-pen');
  var $pNotes = document.createElement('p');
  $pNotes.textContent = entry.notes;

  $li.appendChild($photoEl);
  $li.appendChild($colHalfDiv);
  $colHalfDiv.appendChild($divSpcBtwn);
  $divSpcBtwn.appendChild($h2Title);
  $divSpcBtwn.appendChild($editIcon);
  $colHalfDiv.appendChild($pNotes);

  return $li;
}

function createDomTree() {
  if (data.entries.length) {
    for (var entry of data.entries) {
      var $ulEntry = renderEntry(entry);
      $ul.appendChild($ulEntry);
    }
  }
}

$ul.addEventListener('click', function (event) {
  if (event.target.matches('i')) {
    $entries.classList.add('hidden');
    $newEntry.textContent = 'Edit Entry';
    $modal.classList.remove('hidden');
    data.editing = event.target;
  }
});

window.addEventListener('DOMContentLoaded', createDomTree);

$newFormBtn.addEventListener('click', function (event) {
  $entries.classList.add('hidden');
  $modal.classList.remove('hidden');
});
