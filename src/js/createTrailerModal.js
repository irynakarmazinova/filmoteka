import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import trailerModalTpl from '../templates/trailer-modal';
import { getTrailerLink } from './fn';

export default async function (movieId) {
   const trailerLink = await getTrailerLink(movieId);
   const trailerModalMarkup = trailerModalTpl({trailerLink});

   const trailerModal = basicLightbox.create(trailerModalMarkup, {
      onShow:  instance => {
         const modal = instance.element();
         const modalCloseBtnRef = modal.querySelector('.js-modal-close');


         modalCloseBtnRef.addEventListener('click', () => {
            instance.close();
         });

         window.addEventListener('keydown', e => {
            if (e.code !== 'Escape') {
              return;
            }
    
            instance.close();
          });
      }
   });
   trailerModal.show();
}
