import API from './fetchApi';
import movieTmpl from '../templates/movie-card.hbs';
import { searchForm, gallery, loadBtn, container} from './refs';

const api = new API();

searchForm.addEventListener('submit', onSearch)



function renderMovieCard(movie) {
   gallery.insertAdjacentHTML('beforeend', movieTmpl(movie))
}



function onSearch(e) {
  e.preventDefault();
 clearMovieCard();
  api.query = e.currentTarget.elements.query.value;
  api.resetPage();
   api.fetchSearch()
        .then(renderMovieCard)
        .catch(error => console.log(error))
  e.currentTarget.elements.query.value = '';
}



function clearMovieCard() {
    gallery.innerHTML = '';

}