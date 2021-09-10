import { success, error, info, notice } from '@pnotify/core';

export {
  successfulRegistrationMsg,
  authErrorMsg,
  signOutMsg,
  successfulSignInMsg,
  errorMsg,
  emptyLibraryMsg,
  registrationErrorMsg, notEnterSearchQuery, wrongRequest
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
    text: `There are no movies in this library!`,
    delay: 2000,
  });
}

function authErrorMsg() {
  error({
    text: 'Invalid e-mail or password.',
    delay: 2000,
  });
}

function registrationErrorMsg(error) {
  error({
    text: `${error}!`,
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
    text: 'Please enter your request parameters!',
    delay: 2000,
  });
}


function wrongRequest() {
  error({
    text: 'Invalid request. Try again!',
    delay: 2000,
  });
}
