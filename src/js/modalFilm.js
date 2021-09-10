import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import ApiService from './fetchApi';
import movieModalTpl from '../templates/movie-modal';
import { gallery, cardSectionLoader, myLibraryBtn } from './refs';
import { getAuth } from 'firebase/auth';
import { addMovieToDB, removeMovieFromDB, isMovieInDB, getMoviesFromDB } from './database';
import { openSignInModal } from './modalAuth';
import createTrailerModal from './createTrailerModal';

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

        switch (button.dataset.action) {
          case 'add':
            if (!auth.currentUser) {
              instance.close();
              openSignInModal();
              return;
            }
            await addMovieToDB(auth.currentUser.uid, button.dataset.type, movie);
            button.dataset.action = 'remove';
            button.textContent = button.textContent.replace('add to', 'remove from');
            button.classList.add('movie-modal__btn--active');
            if (myLibraryBtn.classList.contains('current')) {
              getMoviesFromDB(auth.currentUser.uid, button.dataset.type);
            }
            break;
          case 'remove':
            if (!auth.currentUser) {
              instance.close();
              openSignInModal();
              return;
            }
            await removeMovieFromDB(auth.currentUser.uid, button.dataset.type, movie);
            button.dataset.action = 'add';
            button.textContent = button.textContent.replace('remove from', 'add to');
            button.classList.remove('movie-modal__btn--active');
            if (myLibraryBtn.classList.contains('current')) {
              getMoviesFromDB(auth.currentUser.uid, button.dataset.type);
            }
            break;
        }
      });
    },
    onClose: instance => {
      document.body.style.overflow = 'visible';
    },
  });

  return movieModal;
};

// import { getAndShowFilmTrailer } from './fn';

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
    movieDetails.isWatched = await isMovieInDB(auth.currentUser.uid, 'watchedMovies', movieDetails);
    movieDetails.isQueued = await isMovieInDB(auth.currentUser.uid, 'queuedMovies', movieDetails);
  }

  const movieModalMarkup = movieModalTpl(movieDetails);

  const movieModal = createMovieModal(movieModalMarkup, movieDetails);
  movieModal.show();

  const showTrailerBtnRef = document.querySelector('[data-action="show-trailer"]');
  showTrailerBtnRef.addEventListener('click', e => {
    createTrailerModal(movieId);
    movieModal.close();
  });

  cardSectionLoader.classList.add('is-hidden');
};

gallery.addEventListener('click', onGalleryImgClick);
