import { modalSignIn, modalRegistration } from './refs';

//functions for opening and closing registration and sing in modals
function openSignInModal() {
  modalSignIn.classList.remove('backdrop-is-hidden');
  window.addEventListener('click', e => {
    if (e.target.classList.contains('backdrop')) {
      closeSignInModal();
    }
  });
}
function closeSignInModal() {
  modalSignIn.classList.add('backdrop-is-hidden');
  window.removeEventListener('click', e => {
    if (e.target.classList.contains('backdrop')) {
      closeSignInModal();
    }
  });
}

function openRegistrationModal() {
  modalRegistration.classList.remove('backdrop-is-hidden');
  modalSignIn.classList.add('backdrop-is-hidden');
  window.addEventListener('click', e => {
    if (e.target.classList.contains('backdrop')) {
      closeRegistrationModal();
    }
  });
}
function closeRegistrationModal() {
  modalRegistration.classList.add('backdrop-is-hidden');
  window.removeEventListener('click', e => {
    if (e.target.classList.contains('backdrop')) {
      closeRegistrationModal();
    }
  });
}

export { closeRegistrationModal, openRegistrationModal, openSignInModal, closeSignInModal };
