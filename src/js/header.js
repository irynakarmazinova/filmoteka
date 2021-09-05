import API from './fetchApi';
import movieTmpl from '../templates/movie-card.hbs';
import {
  searchForm,
  gallery,
  loadBtn,
  container,
  logo,
  homeBtn,
  myLibraryBtn,
  header,
  btnWatched,
  btnQueue,
  btnContainerLibrary,
} from './refs';

const api = new API();

homeBtn.addEventListener('click', onHomeBtnClick);
myLibraryBtn.addEventListener('click', onLibraryBtnClick);
logo.addEventListener('click', onLogoClick);
searchForm.addEventListener('submit', onSearch);

btnWatched.addEventListener('submit', onSubmitWatched);
btnWatched.addEventListener('click', onSubmitWatched);

btnQueue.addEventListener('submit', onSubmitQueue);
btnQueue.addEventListener('click', onSubmitQueue);

// Функции вызова отрисовки разметки по нажатию на кнопки
function onHomeBtnClick(e) {
  e.preventDefault();
  markupHome();
}

function onLibraryBtnClick(e) {
  e.preventDefault();
  markupMyLibrary();
}

function onLogoClick(e) {
  e.preventDefault();
  markupHome();
}

// Запрос на сервер и отрисовка
function renderMovieCard(movie) {
  gallery.insertAdjacentHTML('beforeend', movieTmpl(movie));
}


function onSearch(e) {
  e.preventDefault();
  clearMovieCard();
  api.query = e.currentTarget.elements.query.value;
  api.resetPage();
  api
    .fetchSearch()
    .then(renderMovieCard)
    .catch(error => console.log(error));
  e.currentTarget.elements.query.value = '';
}

function clearMovieCard() {
  gallery.innerHTML = '';
}

function onSubmitWatched(e) {
  e.preventDefault();
  addBtnWatchedAccentColor();
}

function onSubmitQueue(e) {
  e.preventDefault();
  addBtnQueueAccentColor();
}

// отрисовка разметки и стилей хэдэра
function markupHome() {
  btnContainerLibrary.classList.add('visually-hidden');
  searchForm.classList.remove('visually-hidden');
  header.classList.remove('header-library');

  homeBtn.classList.add('current');
  myLibraryBtn.classList.remove('current');
}

function markupMyLibrary() {
  searchForm.classList.add('visually-hidden');
  btnContainerLibrary.classList.remove('visually-hidden');
  header.classList.add('header-library');

  homeBtn.classList.remove('current');
  myLibraryBtn.classList.add('current');
}

function addBtnWatchedAccentColor() {
  btnWatched.classList.add('accent-color');
  btnQueue.classList.remove('accent-color');
}

function addBtnQueueAccentColor() {
  btnQueue.classList.add('accent-color');
    btnWatched.classList.remove('accent-color');
}
