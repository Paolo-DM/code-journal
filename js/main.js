/* eslint-disable no-global-assign */
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
var $modalDelContent = document.querySelector('.modal-del-content');
var $modalDelete = document.querySelector('.modal-delete');
var $entries = document.querySelector('.entries');
var $navEntries = document.querySelector('.nav-entries');
var $newEntry = document.querySelector('.new-entry');
var $divDeleteSave = document.querySelector('.delete-save');
var $confirmDeleteBtn = document.querySelector('.confirm-btn');
var $cancelDeleteBtn = document.querySelector('.cancel-btn');
var $anchorDeleteEntry = document.createElement('a');

$navEntries.addEventListener('click', goToEntries);

$confirmDeleteBtn.addEventListener('click', function (event) {
  removeEntry(event);
  hideDeleteModal();
  hideModal();
  showEntries();
});

$photoUrl.addEventListener('input', function () {
  $photo.setAttribute('src', $photoUrl.value);
});

$form.addEventListener('submit', handleSubmit);

window.addEventListener('DOMContentLoaded', createDomTree);

$ul.addEventListener('click', editEntry);

$newFormBtn.addEventListener('click', function (event) {
  hideEntries();
  showModal();
});

$cancelDeleteBtn.addEventListener('click', function () {
  hideDeleteModal();
});

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

    replaceInDom();
    data.editing = null;
  }
  goToEntries();
  $form.reset();
}

function renderEntry(entry) {
  hideNoEntriesMsg();

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

function editEntry(event) {
  if (!$anchorDeleteEntry.classList.contains('class')) {
    renderDeleteEntry();
  }

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

function removeEntry(entry) {
  for (var i = 0; i < data.entries.length; i++) {
    if (isEquivalent(data.entries[i], data.editing)) {
      data.entries.splice(i, 1);
    }
  }
  removeFromDom();
  goToEntries();
}

function renderDeleteEntry() {
  $anchorDeleteEntry.setAttribute('class', 'delete-entry');
  $anchorDeleteEntry.setAttribute('href', '#');
  $anchorDeleteEntry.innerText = 'Delete Entry';

  $divDeleteSave.prepend($anchorDeleteEntry);

  $anchorDeleteEntry.addEventListener('click', function () {
    showDeleteModal();
  });
}

function goToEntries(event) {
  hideModal();
  showEntries();
  if (data.entries < 1) {
    showNoEntriesMsg();
  }
  data.editing = null;
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

function showDeleteModal() {
  $modalDelete.classList.remove('hidden');
  $modalDelContent.classList.remove('hidden');
}

function hideDeleteModal() {
  $modalDelete.classList.add('hidden');
  $modalDelContent.classList.add('hidden');
}

function showNoEntriesMsg() {
  $noEntries.classList.remove('hidden');
}

function hideNoEntriesMsg() {
  $noEntries.classList.add('hidden');
}

function isEquivalent(a, b) {
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  if (aProps.length !== bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];
    if (a[propName] !== b[propName]) {
      return false;
    }
  }
  return true;
}

function replaceInDom() {
  var $liEntries = document.querySelectorAll('li');
  for (var li of $liEntries) {
    var liEntryId = Number(li.getAttribute('data-entry-id'));
    if (data.editing.entryId === liEntryId) {
      li.replaceWith(renderEntry(data.editing));
    }
  }
}

function removeFromDom() {
  var $liEntries = document.querySelectorAll('li');
  for (var li of $liEntries) {
    var liEntryId = Number(li.getAttribute('data-entry-id'));
    if (data.editing.entryId === liEntryId) {
      li.remove();
    }
  }
}
