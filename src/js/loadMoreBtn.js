import API from './fetchApi';
import LoadMoreBtn from './loadMoreBtnClass';
import renderMovieCard from './fetchFilms';

const api = new API();

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

loadMoreBtn.refs.button.addEventListener('click', onClick);

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
