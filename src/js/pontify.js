import { success, error, info, notice } from '@pnotify/core';

export {
  successfulRegistrationMsg,
  authErrorMsg,
  signOutMsg,
  successfulSignInMsg,
  errorMsg,
  emptyLibraryMsg,
  registrationErrorMsg,
  emptyMovie,
  wrongRequest,
};

function successfulRegistrationMsg() {
  notice({
    text: 'Thank you for joining Filmoteka!',
    delay: 2000,
  });
}

function successfulSignInMsg() {
  notice({
    text: 'Welcome to Filmoteka',
    delay: 2000,
  });
}

function signOutMsg() {
  notice({
    text: 'Goodbye!',
    delay: 2000,
  });
}

function emptyLibraryMsg() {
  info({
    text: `There are no movies in your library!`,
    delay: 2000,
  });
}

function authErrorMsg() {
  error({
    text: 'Invalid e-mail or password.',
    delay: 2000,
  });
}

function registrationErrorMsg(errorMsg) {
  error({
    text: `${errorMsg}!`,
    delay: 2000,
  });
}

function errorMsg() {
  error({
    text: 'Ooops, something went wrong...',
    delay: 2000,
  });
}

function emptyMovie() {
  error({
    text: 'Enter the correct movie name!',
    delay: 2000,
  });
}

function wrongRequest() {
  error({
    text: 'Search result not successful. Enter the correct movie name!',
    delay: 2000,
  });
}
