import { defaultModules, error, info, notice } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

export {
  successfulRegistrationMsg,
  authErrorMsg,
  signOutMsg,
  successfulSignInMsg,
  errorMsg,
  emptyLibraryMsg,
  notEnterSearchQuery,
  registrationErrorMsg,
  emptyMovie,
  wrongRequest,
  closeAuthModalMsg,
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

function notEnterSearchQuery() {
  notice({
    text: 'Please enter your search request!',
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

function closeAuthModalMsg() {
  notice({
    text: 'Please SIGN IN or REGISTER to use the Movie Library!',
    delay: 2000,
  });
}
