import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import ApiService from './fetchApi';
import movieModalTpl from '../templates/movie-modal';
import { gallery, cardSectionLoader } from './refs';
import { getAuth } from 'firebase/auth';
import { addMovieToDB, removeMovieFromDB, isMovieInDB } from './database';

const Api = new ApiService();
const auth = getAuth();

const createMovieModal = (markup, movie) => {
  const movieModal = basicLightbox.create(markup, {
    onShow: instance => {
      document.body.style.overflow = 'hidden';

      const modal = instance.element();
      const modalCloseBtn = modal.querySelector('.js-modal-close');

      modalCloseBtn.addEventListener('click', instance.close);
      window.addEventListener('keydown', e => {
        if (e.code !== 'Escape') {
          return;
        }

        instance.close();
      });

      // handle buttons
      modal.addEventListener('click', async event => {
        if (!event.target.classList.contains('movie-modal__btn')) {
          return;
        }

        const button = event.target;

        if (button.dataset.action === 'add') {
          await addMovieToDB(auth.currentUser.uid, button.dataset.type, movie);
          button.dataset.action = 'remove';
          button.textContent = button.textContent.replace('add to', 'remove from');
        } else {
          await removeMovieFromDB(auth.currentUser.uid, button.dataset.type, movie);
          button.dataset.action = 'add';
          button.textContent = button.textContent.replace('remove from', 'add to');
        }
      });
    },
    onClose: instance => {
      document.body.style.overflow = 'visible';
    },
  });

  return movieModal;
};

const onGalleryImgClick = async e => {
  const target = e.target;

  if (target.nodeName !== 'IMG') {
    return;
  }

  const movieId = target.dataset.source;

  cardSectionLoader.classList.remove('is-hidden');

  const movieDetails = await Api.fetchMovieDetail(movieId);
  movieDetails.isWatched = false;
  movieDetails.isQueued = false;

  if (auth.currentUser) {
    movieDetails.isWatched = await isMovieInDB(auth.currentUser.uid, 'queueMovies', movieDetails);
    movieDetails.isQueued = await isMovieInDB(auth.currentUser.uid, 'watchedMovies', movieDetails);
  }

  const movieModalMarkup = movieModalTpl(movieDetails);

  const movieModal = createMovieModal(movieModalMarkup, movieDetails);
  movieModal.show();
  cardSectionLoader.classList.add('is-hidden');
};

gallery.addEventListener('click', onGalleryImgClick);
