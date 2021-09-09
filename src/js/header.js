import API from './fetchApi';
import movieTmpl from '../templates/movie-card.hbs';
import { wrongRequest } from './pontify';
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
  errorText
} from './refs';
import { emptyMovie } from './pontify';
import { createMarkupFilms } from './fn';

import { createMarkupFilms } from './fn';

const api = new API();

homeBtn.addEventListener('click', onHomeBtnClick);
myLibraryBtn.addEventListener('click', onLibraryBtnClick);
logo.addEventListener('click', onLogoClick);

logoImg.addEventListener('click', onLogoImgClick);
// searchForm.addEventListener('submit', onSearch);

watchedBtn.addEventListener('submit', onSubmitWatched);
watchedBtn.addEventListener('click', onSubmitWatched);

queuedBtn.addEventListener('submit', onSubmitQueue);
queuedBtn.addEventListener('click', onSubmitQueue);

// Функции вызова отрисовки разметки по нажатию на кнопки
function onHomeBtnClick(e) {
  e.preventDefault();
  markupHome();
  // fetchFilmsDefault();
}

function onLibraryBtnClick(e) {
  e.preventDefault();
  markupMyLibrary();
}

function onLogoClick(e) {
  e.preventDefault();
  markupHome();

  createMarkupFilms();
  // fetchFilmsDefault();
  // createMarkupFilms();
}

function onLogoImgClick(e) {
  e.preventDefault();
  markupHome();
  // fetchFilmsDefault();
  // createMarkupFilms();
}

// Запрос на сервер и отрисовка

// function renderMovieCard(movie) {
//   gallery.insertAdjacentHTML('beforeend', movieTmpl(movie));
// }


// function onSearch(e) {
//   e.preventDefault();
//   clearMovieCard();
//   api.query = e.currentTarget.elements.query.value.trim();
//   if (api.query === '') {
//     loadBtn.classList.add('not-found');
//     return;
//   }
//   api.resetPage();
//   api
//     .fetchSearch()
//     .then(films => {
//       renderMovieCard(films);
//       if (films.total_results === 0) {
//         loadBtn.classList.add('not-found');
//         return;
//       }

//       if (!loadBtn.classList.contains('not-found')) {
//         return;
//       }

//       loadBtn.classList.remove('not-found');
//     })
//     .catch(error => console.log(error));
//   e.currentTarget.elements.query.value = '';
// }
=======
// function onSearch(e) {
//   e.preventDefault();
//   clearMovieCard();
//   api.query = e.currentTarget.elements.query.value.trim();
//   if (api.query === '') {
//     loadBtn.classList.add('not-found');
//     return;
//   }
//   api.resetPage();
//   api
//     .fetchSearch()
//     .then(films => {
//       renderMovieCard(films);
//       if (films.total_results === 0) {
//         loadBtn.classList.add('not-found');
//         return
       
//       }

//       if (!loadBtn.classList.contains('not-found')) {
//         return;
//       }

//       loadBtn.classList.remove('not-found');
//     })
//     .catch(error => console.log(error));
//   e.currentTarget.elements.query.value = '';
// }


// function renderMovieCard(movie) {
//   gallery.insertAdjacentHTML('beforeend', movieTmpl(movie));
// }

// function onSearch(e) {
//   e.preventDefault();
//   clearMovieCard();
//   api.query = e.currentTarget.elements.query.value;
//   api.resetPage();
//   api
//     .fetchSearch()
//     .then(films => {
//       renderMovieCard(films);

//       if (films.total_results === 0) {
//         loadBtn.classList.add('not-found');
//         return;
//       }

//       if (!loadBtn.classList.contains('not-found')) {
//         return;
//       }

//       loadBtn.classList.remove('not-found');
//     })
//     .catch(error => console.log(error));
//   e.currentTarget.elements.query.value = '';
// }

// function clearMovieCard() {
//   gallery.innerHTML = '';
// }

// function renderMovieCard(movie) {
//   gallery.insertAdjacentHTML('beforeend', movieTmpl(movie));
// }

// function onSearch(e) {
//   e.preventDefault();
//   clearMovieCard();
//   api.query = e.currentTarget.elements.query.value;

//   if (api.query === ' ') {
//     emptyMovie();
//     loadBtn.classList.add('not-found');
//     return;
//   }

//   api.resetPage();
//   api
//     .fetchSearch()
//     .then(films => {
//       renderMovieCard(films);

//       if (films.total_results === 0) {
//         wrongRequest();
//         loadBtn.classList.add('not-found');
//         return;
//       }

//       if (!loadBtn.classList.contains('not-found')) {
//         return;
//       }

//       loadBtn.classList.remove('not-found');
//     })
//     .catch(error => console.log(error));
//   e.currentTarget.elements.query.value = '';
// }

// function clearMovieCard() {
//   gallery.innerHTML = '';
// }


// function fetchFilmsDefault() {
//   api.resetPage();
//   api.fetchMovie()
//  .then((films) => {
//   clearMovieCard();
//   renderMovieCard(films);
//  })
//  .catch(error => console.log(error));

// }

//   createMarkupFilms();
// }


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
