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

function onHomeBtnClick(e) {
  e.preventDefault();
  btnContainerLibrary.classList.add('visually-hidden');
  searchForm.classList.remove('visually-hidden');
  header.classList.remove('header-library');

  homeBtn.classList.add('current');
  myLibraryBtn.classList.remove('current');
}

function onLibraryBtnClick(e) {
  e.preventDefault();
  searchForm.classList.add('visually-hidden');
  btnContainerLibrary.classList.remove('visually-hidden');
  header.classList.add('header-library');

  homeBtn.classList.remove('current');
  myLibraryBtn.classList.add('current');
}

function onLogoClick(e) {
  e.preventDefault();
  btnContainerLibrary.classList.add('visually-hidden');
  searchForm.classList.remove('visually-hidden');
  header.classList.remove('header-library');

  homeBtn.classList.add('current');
  myLibraryBtn.classList.remove('current');
}

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
  btnWatched.classList.add('accent-color');
  btnQueue.classList.remove('accent-color');
}

function onSubmitQueue(e) {
  e.preventDefault();
  btnQueue.classList.add('accent-color');
  btnWatched.classList.remove('accent-color');
}
