import { modalSignIn, modalRegistration } from './refs';
import { closeAuthModalMsg } from './pnotify';

//functions for opening and closing registration and sing in modals
function openSignInModal() {
  modalSignIn.classList.remove('auth__backdrop-is-hidden');
  window.addEventListener('click', handleBackdropClick);
  window.addEventListener('keydown', handleEscPress);
}

function closeSignInModal() {
  document.getElementById('searchQuery').value = '';
  modalSignIn.classList.add('auth__backdrop-is-hidden');
  window.removeEventListener('click', handleBackdropClick);
  window.removeEventListener('keydown', handleEscPress);
}

function openRegistrationModal() {
  modalRegistration.classList.remove('auth__backdrop-is-hidden');
  modalSignIn.classList.add('auth__backdrop-is-hidden');
  window.addEventListener('click', handleBackdropClick);
  window.addEventListener('keydown', handleEscPress);
}

function closeRegistrationModal() {
  document.getElementById('searchQuery').value = '';
  modalRegistration.classList.add('auth__backdrop-is-hidden');
  window.removeEventListener('click', handleBackdropClick);
  window.removeEventListener('keydown', handleEscPress);
}

//function for closing modal on escape button press
function handleEscPress(e) {
  if (e.code !== 'Escape') {
    return;
  }
  if (modalSignIn.classList.contains('auth__backdrop-is-hidden')) {
    closeRegistrationModal();
  } else {
    closeSignInModal();
  }
  closeAuthModalMsg();
}

//function for closing modal on backdrop click
function handleBackdropClick(e) {
  if (
    e.target.classList.contains('auth__backdrop') &&
    !modalSignIn.classList.contains('auth__backdrop-is-hidden')
  ) {
    closeSignInModal();
    setTimeout(() => {
      closeAuthModalMsg();
    }, 0);
  }

  if (
    e.target.classList.contains('auth__backdrop') &&
    !modalRegistration.classList.contains('auth__backdrop-is-hidden')
  ) {
    closeRegistrationModal();
    setTimeout(() => {
      closeAuthModalMsg();
    }, 0);
  }
}

export { closeRegistrationModal, openRegistrationModal, openSignInModal, closeSignInModal };
