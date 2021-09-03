import API from './fetchApi';
import LoadMoreBtn from './loadMoreBtnClass';
import movieTmpl from '../templates/movie-card.hbs';
import { gallery } from './refs';

const api = new API();

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

loadMoreBtn.refs.button.addEventListener('click', onClick);

function renderMovieCard(movie) {
  gallery.insertAdjacentHTML('beforeend', movieTmpl(movie));
}

function onClick(e) {
  e.preventDefault();
  loadMoreBtn.disable();
  api
    .fetchMovie()
    .then(data => {
      renderMovieCard(data);
      loadMoreBtn.enable();
    })
    .catch(error => console.log(error));
}
