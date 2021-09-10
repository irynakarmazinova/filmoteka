import { searchForm, gallery } from './refs';
import movieTmpl from '../templates/movie-card.hbs';
import LoadMoreBtn from './loadMoreBtnClass';

import { API_KEY, BASE_URL } from './constants';

let varInputValue = '';
let page = 1;

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
        loadMoreBtn.enable();
        renderMovieCard(film);
      }),
  );
}

createMarkupFilms();

// ================== Функция запроса по submit формы ==================
function onSearch(e) {
  e.preventDefault();
  clearMovieCard();

  varInputValue = e.currentTarget.elements.query.value.trim();
  page = 1;

  createMarkupFilms();
  e.currentTarget.elements.query.value = '';
}

searchForm.addEventListener('submit', onSearch);

// ================== Функция очистки поля с  карточками ==================
function clearMovieCard() {
  gallery.innerHTML = '';
}

// ================== Функция загрузить ещё ==================
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: false,
});

loadMoreBtn.refs.button.addEventListener('click', onClick);

function onClick(e) {
  e.preventDefault();
  page += 1;
  loadMoreBtn.disable();

  createMarkupFilms();
}

// ================== Функция получения и отрисовки трейлера к фильму ==================
const idFilm = 385128;
function getAndShowFilmTrailer(idFilm) {
  const urlKeyTrailer = `${BASE_URL}movie/${idFilm}/videos?&api_key=${API_KEY}`;

  fetchFn(urlKeyTrailer).then(({ results }) => {
    const keyArrFilms = results.map(({ key }) => key);
    console.log(keyArrFilms[0]);
    // iframe.src = `https://www.youtube.com/embed/${keyArrFilms[0]}`;
  });
}

/* <iframe
  id="iframe"
  width="560"
  height="315"
  src="https://www.youtube.com/embed/Cl2Z_iog0cM"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>; */

export { getAndShowFilmTrailer, loadMoreBtn };
