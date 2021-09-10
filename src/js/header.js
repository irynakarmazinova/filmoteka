import API from './fetchApi';
import movieTmpl from '../templates/movie-card.hbs';
import { notEnterSearchQuery, wrongRequest } from './pontify';
import {
  searchForm,
  gallery,
  loadBtn,
  container,
  registrationForm,
  signInForm,
  logo,
  logoImg,
  homeBtn,
  myLibraryBtn,
  header,
  watchedBtn,
  queuedBtn,
  btnContainerLibrary,
  signOutBtn,
  signOutContainer,
  errorText,
} from './refs';
import { emptyMovie } from './pontify';
import { createMarkupFilms, onHomeClick } from './fn';

const api = new API();

homeBtn.addEventListener('click', onHomeBtnClick);
homeBtn.addEventListener('click', onHomeClick);
logo.addEventListener('click', onHomeClick);
logoImg.addEventListener('click', onHomeClick);

watchedBtn.addEventListener('submit', onSubmitWatched);
watchedBtn.addEventListener('click', onSubmitWatched);

queuedBtn.addEventListener('submit', onSubmitQueue);
queuedBtn.addEventListener('click', onSubmitQueue);

// Функции вызова отрисовки разметки по нажатию на кнопки
function onHomeBtnClick(e) {
  e.preventDefault();
  markupHome();

  fetchFilmsDefault();
}

function onLibraryBtnClick(e) {
  e.preventDefault();
  markupMyLibrary();
  errorText.textContent = '';
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
  watchedBtn.classList.add('accent-color');
  queuedBtn.classList.remove('accent-color');
}

function addBtnQueueAccentColor() {
  queuedBtn.classList.add('accent-color');
  watchedBtn.classList.remove('accent-color');
}

export {
  markupMyLibrary,
  markupHome,
  onLibraryBtnClick,
  addBtnQueueAccentColor,
  addBtnWatchedAccentColor,
};
