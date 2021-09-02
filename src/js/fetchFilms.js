import API from './fetchApi';
import movieTmpl from '../templates/movie-card.hbs';
import getRefs from './refs';
const refs = getRefs();
const api = new API();
refs.loadBtn.addEventListener('click', onClick);

function renderMovieCard(movie) {
   refs.gallery.insertAdjacentHTML('beforeend', movieTmpl(movie))
}

api.fetchMovie().then(renderMovieCard).catch(error => console.log(error));

function onClick(e) {
     e.preventDefault();
  api.fetchMovie().then(data => {
    renderMovieCard(data);
   scrollEnd()
  }).catch(error => console.log(error))
}

function scrollEnd() {
    setTimeout(() => {
        refs.container.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        })
    }, 800)
}