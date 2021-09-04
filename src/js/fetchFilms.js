import API from './fetchApi';
import movieTmpl from '../templates/movie-card.hbs';
import { /*searchForm,*/ gallery /*, loadBtn, container*/ } from './refs';

const api = new API();

// loadBtn.addEventListener('click', onClick);

api
  .fetchMovie()
  .then(renderMovieCard)
  .catch(error => console.log(error));

export default function renderMovieCard(movie) {
  gallery.insertAdjacentHTML('beforeend', movieTmpl(movie));
}

// function onClick(e) {
//   e.preventDefault();
//   api
//     .fetchMovie()
//     .then(data => {
//       renderMovieCard(data);
//     //   scrollEnd();
//     })
//     .catch(error => console.log(error));
// }

// function scrollEnd() {
//   setTimeout(() => {
//     container.scrollIntoView({
//       behavior: 'smooth',
//       block: 'end',
//     });
//   }, 800);
// }
