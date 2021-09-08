import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import ApiService from './fetchApi';
import movieModalTpl from '../templates/movie-modal';
import { gallery, cardSectionLoader } from './refs';

const Api = new ApiService();

const createMovieModal = markup => {
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

  // console.log(movieId);

  // getAndShowFilmTrailer(movieId);

  cardSectionLoader.classList.remove('is-hidden');

  const movieDetails = await Api.fetchMovieDetail(movieId);

  const movieModalMarkup = movieModalTpl(movieDetails);

  const movieModal = createMovieModal(movieModalMarkup);
  movieModal.show();
  cardSectionLoader.classList.add('is-hidden');
};

gallery.addEventListener('click', onGalleryImgClick);
