import { modalSignIn, modalRegistration } from './refs';
import { closeAuthModalMsg } from './pnotify';

//functions for opening and closing registration and sing in modals
function openSignInModal() {
  modalSignIn.classList.remove('backdrop__is-hidden');
  window.addEventListener('click', handleBackdropClick);
  window.addEventListener('keydown', handleEscPress);
}

function closeSignInModal() {
  document.getElementById('searchQuery').value = '';
  modalSignIn.classList.add('backdrop__is-hidden');
  window.removeEventListener('click', handleBackdropClick);
  window.removeEventListener('keydown', handleEscPress);
}

function openRegistrationModal() {
  modalRegistration.classList.remove('backdrop__is-hidden');
  modalSignIn.classList.add('backdrop__is-hidden');
  window.addEventListener('click', handleBackdropClick);
  window.addEventListener('keydown', handleEscPress);
}

function closeRegistrationModal() {
  document.getElementById('searchQuery').value = '';
  modalRegistration.classList.add('backdrop__is-hidden');
  window.removeEventListener('click', handleBackdropClick);
  window.removeEventListener('keydown', handleEscPress);
}

//function for closing modal on escape button press
function handleEscPress(e) {
  if (e.code !== 'Escape') {
    return;
  }
  if (modalSignIn.classList.contains('backdrop__is-hidden')) {
    closeRegistrationModal();
  } else {
    closeSignInModal();
  }
  closeAuthModalMsg();
}

//function for closing modal on backdrop click
function handleBackdropClick(e) {
  if (
    e.target.classList.contains('backdrop') &&
    !modalSignIn.classList.contains('backdrop__is-hidden')
  ) {
    closeSignInModal();
    setTimeout(() => {
      closeAuthModalMsg();
    }, 0);
  }

  if (
    e.target.classList.contains('backdrop') &&
    !modalRegistration.classList.contains('backdrop__is-hidden')
  ) {
    closeRegistrationModal();
    setTimeout(() => {
      closeAuthModalMsg();
    }, 0);
  }
}

export { closeRegistrationModal, openRegistrationModal, openSignInModal, closeSignInModal };
