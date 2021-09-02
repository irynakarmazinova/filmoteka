import API from './fetchApi';
import movieTmpl from '../templates/movie-card.hbs';
import getRefs from './refs';
const refs = getRefs();
const api = new API();

refs.searchForm.addEventListener('submit',  onSearch )
function renderMovieCard(movie) {
   refs.gallery.insertAdjacentHTML('beforeend', movieTmpl(movie))
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
    refs.gallery.innerHTML = '';

}