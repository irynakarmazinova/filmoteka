import { modalSignIn, modalRegistration } from './refs';

//functions for opening and closing registration and sing in modals
function openSignInModal() {
  modalSignIn.classList.remove('auth__backdrop-is-hidden');
  window.addEventListener('click', e => {
    if (e.target.classList.contains('auth__backdrop')) {
      closeSignInModal();
    }
  });
}
function closeSignInModal() {
  modalSignIn.classList.add('auth__backdrop-is-hidden');
  window.removeEventListener('click', e => {
    if (e.target.classList.contains('auth__backdrop')) {
      closeSignInModal();
    }
  });
}

function openRegistrationModal() {
  modalRegistration.classList.remove('auth__backdrop-is-hidden');
  modalSignIn.classList.add('backdrop-is-hidden');
  window.addEventListener('click', e => {
    if (e.target.classList.contains('auth__backdrop')) {
      closeRegistrationModal();
    }
  });
}
function closeRegistrationModal() {
  modalRegistration.classList.add('auth__backdrop-is-hidden');
  window.removeEventListener('click', e => {
    if (e.target.classList.contains('auth__backdrop')) {
      closeRegistrationModal();
    }
  });
}

export { closeRegistrationModal, openRegistrationModal, openSignInModal, closeSignInModal };
