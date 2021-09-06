import { modalSignIn, modalRegistration } from './refs';

function toggleSignInModal() {
  modalSignIn.classList.toggle('backdrop-is-hidden');
}
function openRegistrationModal() {
  modalSignIn.classList.add('backdrop-is-hidden');
  modalRegistration.classList.remove('backdrop-is-hidden');
}
function closeRegistrationModal() {
  modalRegistration.classList.toggle('backdrop-is-hidden');
}

export { closeRegistrationModal, openRegistrationModal, toggleSignInModal };
