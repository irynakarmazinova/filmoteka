import { gallery } from './refs';
import movieTmpl from '../templates/movie-card.hbs';
import LoadMoreBtn from './loadMoreBtnClass';
import { notEnterSearchQuery, wrongRequest } from './pnotify';
import { markupHome } from './header';

import { API_KEY, BASE_URL } from './constants';

let varInputValue = '';
let page = 1;

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: false,
});

createMarkupFilms();

loadMoreBtn.refs.button.addEventListener('click', onClick);

// ================== Функция для создания URL ==================
function createUrl(inputValue, pageNumber) {
  let urlTrendingFilm = `${BASE_URL}trending/all/day?&api_key=${API_KEY}&page=${pageNumber}`;
  let urlSearchFilm = `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${inputValue}&page=${pageNumber}&include_adult=false`;
  return inputValue === '' ? urlTrendingFilm : urlSearchFilm;
}

// ================== Функция для запроса на сервер ==================
async function fetchFn(url) {
  const response = await fetch(url);
  const responseObj = await response.json();
  return responseObj;
}

// ================== Функция для преобразования объекта который пришёл от сервера в массив с фильмами ==================
async function getFilmsObj() {
  const filmsObj = await fetchFn(createUrl(varInputValue, page));
  const { results } = filmsObj;

  if (results.length === 0) {
    wrongRequest();
    loadMoreBtn.hide();
  } else {
    loadMoreBtn.show();
  }

  return results;
}

// ================== Функция для преобразования объекта который прищёл от сервера в массив с жанрами ==================
async function getGenresObj() {
  const urlGenre = `${BASE_URL}/genre/movie/list?&api_key=${API_KEY}`;
  const { genres } = await fetchFn(urlGenre);
  return genres;
}

// ================== Функция для создания обьекта с фильмами и жанрами(словами) ==================
function parseGenres(array, genres) {
  return array.map(el => ({
    ...el,
    genre_ids: el.genre_ids.length
      ? [
          ...genres.reduce(
            (acc, { id, name }) => (el.genre_ids.includes(+id) ? [...acc, name] : acc),
            [],
          ),
        ]
      : ['Жанры отсутствуют'],
  }));
}

// ================== Функция для создания разметки ==================
function renderMovieCard(movie) {
  gallery.insertAdjacentHTML('beforeend', movieTmpl(movie));
}

// ================== Создаём разметку на основе полученного объекта с фильмами ==================
function createMarkupFilms() {
  getFilmsObj().then(films =>
    getGenresObj()
      .then(genres => parseGenres(films, genres))
      .then(film => {
        film.map(fil => {
          if (fil.release_date) {
            fil.release_date = fil.release_date.slice(0, 4);
          }
        });
        film.map(fil => {
          if (fil.genre_ids) {
            return (fil.genre_ids = fil.genre_ids.slice(0, 2));
          }
        });

        if (film.length === 0) {
          gallery.innerHTML = `<div class="notice">
          <span>Search result not successful. Enter the correct movie name!</span>
          <img class="img-smile" src="https://i.pinimg.com/474x/f4/b7/f7/f4b7f707d9750650763e42ad4a5156b9.jpg" alt="smile">
          </div>`;
        }

        if (film.length) loadMoreBtn.enable();

        renderMovieCard(film);
      }),
  );
}

// ================== Функция запроса по submit формы ==================
function onSearch(e) {
  e.preventDefault();
  clearMovieCard();

  varInputValue = e.currentTarget.elements.query.value.trim();
  page = 1;

  if (varInputValue === '') {
    notEnterSearchQuery();
    loadMoreBtn.hide();
    gallery.innerHTML = `<div class="notice"><span>You haven't entered anything. Please enter your search request!</span>
    <img class="img-smile" src="https://i.pinimg.com/736x/27/2f/13/272f1363f910dbcd1bc274b38a650407--smiley-faces-emoji.jpg" alt="smile"
    </div>`;
    return;
  }

  createMarkupFilms();
  e.currentTarget.elements.query.value = '';
}

// ================== Функция очистки поля с  карточками ==================
function clearMovieCard() {
  gallery.innerHTML = '';
}

// ================== Функция загрузить ещё ==================
function onClick(e) {
  e.preventDefault();
  page += 1;
  loadMoreBtn.disable();

  createMarkupFilms();
}

// ================== Функция обработчик для возвращения на домашнюю страницу ==================
function onHomeClick(e) {
  e.preventDefault();
  markupHome();
  clearMovieCard();

  varInputValue = '';
  createMarkupFilms();
}

// ================== Функция получения и отрисовки трейлера к фильму ==================
function getTrailerLink(idFilm) {
  const urlKeyTrailer = `${BASE_URL}movie/${idFilm}/videos?&api_key=${API_KEY}`;

  return fetchFn(urlKeyTrailer).then(({ results }) => {
    const keyArrFilms = results.map(({ key }) => key);
    return `https://www.youtube.com/embed/${keyArrFilms[0]}`;
  });
}

export { getTrailerLink, createMarkupFilms, loadMoreBtn, onHomeClick, clearMovieCard, onSearch };
