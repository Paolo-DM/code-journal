/* global data */
/* exported data */
var $photoUrl = document.querySelector('#photo-url');
var $photo = document.querySelector('.photo');
var $form = document.querySelector('form');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $ul = document.querySelector('.ul-list');

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
}

/*
<ul class="row">
        <li>
          <img class="column-half" src="images/placeholder-image-square.jpg">
          <div class="column-half">
            <h2>Ada Lovelace</h2>
            <p>Augusta Ada King, Countess of Lovelace (née Byron; 10 December
              1815 – 27 November 1852) was an English mathematician and
              writer, chiefly known for her work on Charles Babbage's proposed
              mechanical general-purpose computer, the Analyticaler.</p>
          </div>
        </li>
      </ul>
*/

function renderEntry(entry) {
  var $li = document.createElement('li');
  var $photoEl = document.createElement('img');
  $photoEl.setAttribute('class', 'column-half');
  $photoEl.setAttribute('src', entry.photoUrl);
  var $colHalfDiv = document.createElement('div');
  $colHalfDiv.setAttribute('class', 'column-half');
  var $h2Title = document.createElement('h2');
  $h2Title.textContent = entry.title;
  var $pNotes = document.createElement('p');
  $pNotes.textContent = entry.notes;

  $ul.appendChild($li);
  $li.appendChild($photoEl);
  $li.appendChild($colHalfDiv);
  $colHalfDiv.appendChild($h2Title);
  $colHalfDiv.appendChild($pNotes);
}

function createDomTree() {
  for (var entry of data.entries) {
    renderEntry(entry);
  }
}

window.addEventListener('DOMContentLoaded', createDomTree);
