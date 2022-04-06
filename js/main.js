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
    entryId: data.nextEntryId
  };

  if (data.editing === null) {
    data.nextEntryId++;
    data.entries.unshift(entryValues);
    $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
    $ul.prepend(renderEntry(entryValues));
  } else {
    data.editing.title = $form.elements.title.value;
    data.editing.photoUrl = $form.elements['photo-url'].value;
    data.editing.notes = $form.notes.value;

    var $liEntries = document.querySelectorAll('li');
    for (var li of $liEntries) {
      var liEntryId = Number(li.getAttribute('data-entry-id'));
      if (data.editing.entryId === liEntryId) {
        li.replaceWith(renderEntry(data.editing));
      }
    }
    data.editing = null;
  }
  showEntries();
  hideModal();
  $form.reset();
}

function renderEntry(entry) {
  $noEntries.classList.add('hidden');

  var $li = document.createElement('li');
  $li.setAttribute('class', 'row');
  $li.setAttribute('data-entry-id', entry.entryId);

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
      var $liEntry = renderEntry(entry);
      $ul.appendChild($liEntry);
    }
  }
}

window.addEventListener('DOMContentLoaded', createDomTree);

$ul.addEventListener('click', editEntry);

$newFormBtn.addEventListener('click', function (event) {
  hideEntries();
  showModal();
});

function editEntry(event) {
  if (event.target.matches('i')) {
    var closestLi = event.target.closest('li');
    var currentIndex = Number(closestLi.getAttribute('data-entry-id'));

    hideEntries();
    showModal();
    $newEntry.textContent = 'Edit Entry';

    for (var entry of data.entries) {
      if (currentIndex === Number(entry.entryId)) {
        data.editing = entry;
      }
    }

    $form.elements.title.value = data.editing.title;
    $photo.setAttribute('src', data.editing.photoUrl);
    $form.elements['photo-url'].value = data.editing.photoUrl;
    $form.notes.value = data.editing.notes;
  }
}

function showModal() {
  $modal.classList.remove('hidden');
}

function hideModal() {
  $modal.classList.add('hidden');
}

function hideEntries() {
  $entries.classList.add('hidden');
}

function showEntries() {
  $entries.classList.remove('hidden');
}
