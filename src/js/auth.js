import API from './fetchApi';

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { getMoviesFromDB, loadMoreBtnMyLib, showMoreMovies } from './database';

import {
  signInForm,
  registrationForm,
  queuedBtn,
  watchedBtn,
  homeBtn,
  signOutBtn,
  signOutIcon,
  myLibraryBtn,
  modalSignInClose,
  goToRegistrationBtn,
  modalRegistrationOpen,
  modalRegistrationClose,
  myLibNavButtons,
} from './refs';

import {
  successfulRegistrationMsg,
  authErrorMsg,
  signOutMsg,
  successfulSignInMsg,
  registrationErrorMsg,
  errorMsg,
} from './pnotify';

import { markupMyLibrary, markupHome, addBtnWatchedAccentColor } from './header';

import {
  closeRegistrationModal,
  openSignInModal,
  openRegistrationModal,
  closeSignInModal,
} from './modalAuth';

import { loadMoreBtn, createMarkupFilms, clearMovieCard } from './fn';

const api = new API();
const auth = getAuth();
handleAuthStateChange();
let startMovieId = '';

//user registration function
async function handleRegistration(e) {
  e.preventDefault();
  const email = e.currentTarget.elements.email.value;
  const password = e.currentTarget.elements.password.value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    markupMyLibrary();
    successfulRegistrationMsg();
    closeRegistrationModal();
  } catch (error) {
    const errorCode = error.code;
    registrationErrorMsg(errorCode.slice(5).replace(/-/g, ' '));
  }
}

//user sign in function
async function handleSignIn(e) {
  e.preventDefault();
  const email = e.currentTarget.elements.email.value;
  const password = e.currentTarget.elements.password.value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const userId = auth.currentUser.uid;
    startMovieId = await getMoviesFromDB(userId, 'watchedMovies');
    loadMoreBtn.hide();
    addBtnWatchedAccentColor();
    markupMyLibrary();
    successfulSignInMsg();
    closeSignInModal();
  } catch {
    authErrorMsg();
  }
}

//user sign out function
async function handleSignOut() {
  try {
    await signOut(auth);
    handleSignOutEvents();
    signOutMsg();
  } catch {
    errorMsg();
  }
}

//managing actions when the user is logged in function

async function handleAuthStateChange() {
  try {
    onAuthStateChanged(auth, user => {
      if (user) {
        let currentMovieLibrary = 'watchedMovies';
        const userId = user.uid;

        showSignOutIcon();
        manageLogInEvents();

        myLibraryBtn.addEventListener('click', async e => {
          startMovieId = await openMyLib(userId, 'watchedMovies');
        });

        myLibNavButtons.addEventListener('click', async e => {
          loadMoreBtn.hide();
          if (e.target.nodeName !== 'BUTTON') {
            return;
          }
          startMovieId = await getMoviesFromDB(userId, `${e.target.dataset.type}Movies`);
          currentMovieLibrary = `${e.target.dataset.type}Movies`;
        });

        loadMoreBtnMyLib.refs.button.addEventListener('click', async e => {
          startMovieId = await showMoreMovies(userId, currentMovieLibrary, startMovieId);
        });
      } else {
        manageLogOutEvents();
        hideSignOutIcon();
      }
    });
  } catch {
    errorMsg();
  }
}

//functions for managing event listeners as user  is logged in and logged out
function manageLogInEvents() {
  homeBtn.addEventListener('click', disableBtns);
  signInForm.removeEventListener('submit', handleSignIn);
  myLibraryBtn.removeEventListener('click', openSignInModal);
  registrationForm.removeEventListener('submit', handleRegistration);
  modalSignInClose.removeEventListener('click', closeSignInModal);
  modalRegistrationOpen.removeEventListener('click', openRegistrationModal);
  modalRegistrationClose.removeEventListener('click', closeRegistrationModal);
  goToRegistrationBtn.removeEventListener('click', openRegistrationModal);
  signOutBtn.addEventListener('click', handleSignOut);
}

function manageLogOutEvents() {
  homeBtn.removeEventListener('click', disableBtns);
  registrationForm.addEventListener('submit', handleRegistration);
  signInForm.addEventListener('submit', handleSignIn);
  signOutBtn.removeEventListener('click', handleSignOut);
  myLibraryBtn.addEventListener('click', openSignInModal);
  modalSignInClose.addEventListener('click', closeSignInModal);
  modalRegistrationOpen.addEventListener('click', openRegistrationModal);
  modalRegistrationClose.addEventListener('click', closeRegistrationModal);
  goToRegistrationBtn.addEventListener('click', openRegistrationModal);
}

function disableBtns() {
  loadMoreBtnMyLib.hide();
  if (watchedBtn.classList.contains('accent-color')) {
    watchedBtn.classList.remove('accent-color');
  }
  if (queuedBtn.classList.contains('accent-color')) {
    queuedBtn.classList.remove('accent-color');
  }
}

function hideSignOutIcon() {
  signOutIcon.classList.add('visually-hidden');
}

function showSignOutIcon() {
  signOutIcon.classList.remove('visually-hidden');
}

async function openMyLib(id, movieListType) {
  if (signOutIcon.classList.contains('visually-hidden')) {
    return;
  }
  let startId = await getMoviesFromDB(id, movieListType);
  document.getElementById('searchQuery').value = '';
  loadMoreBtn.hide();
  markupMyLibrary();
  addBtnWatchedAccentColor();
  return startId;
}

function handleSignOutEvents() {
  clearMovieCard();
  createMarkupFilms();
  disableBtns();
  markupHome();
}
