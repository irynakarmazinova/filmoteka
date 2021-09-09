import API from './fetchApi';
import movieTmpl from '../templates/movie-card.hbs';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getMoviesFromDB, clearGallery } from './database';
import {
  gallery,
  signInForm,
  registrationForm,
  queuedBtn,
  watchedBtn,
  homeBtn,
  signOutBtn,
  myLibraryBtn,
  modalSignInClose,
  goToRegistrationBtn,
  modalRegistrationOpen,
  modalRegistrationClose,
} from './refs';
import {
  successfulRegistrationMsg,
  authErrorMsg,
  signOutMsg,
  successfulSignInMsg,
  registrationErrorMsg,
  errorMsg,
} from './pontify';
import { markupMyLibrary, markupHome } from './header';
import {
  closeRegistrationModal,
  openSignInModal,
  openRegistrationModal,
  closeSignInModal,
} from './modalAuth';
import { startAt } from '@firebase/database';

const api = new API();
const auth = getAuth();
handleAuthStateChange();

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

async function handleSignIn(e) {
  e.preventDefault();
  const email = e.currentTarget.elements.email.value;
  const password = e.currentTarget.elements.password.value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    markupMyLibrary();
    successfulSignInMsg();
    closeSignInModal();
  } catch {
    authErrorMsg();
  }
}

async function handleSignOut() {
  try {
    await signOut(auth, user => {
      const userId = user.uid;
    });
    signOutMsg();
    disableBtns();
  } catch {
    errorMsg();
  }
}

async function handleAuthStateChange() {
  try {
    onAuthStateChanged(auth, user => {
      if (user) {
        const userId = user.uid;
        watchedBtn.addEventListener('click', async e => {
          await getMoviesFromDB(userId, 'watchedMovies');
        });
        queuedBtn.addEventListener('click', async e => {
          await getMoviesFromDB(userId, 'queuedMovies');
        });
        manageLogInEvents();
      } else {
        goToHomePage();
        manageLogOutEvents();
      }
    });
  } catch {
    errorMsg();
  }
}

//functions for managing event listeners as user  is logged in and logged out
function manageLogInEvents() {
  myLibraryBtn.addEventListener('click', markupMyLibrary);
  homeBtn.addEventListener('click', goToHomePage);
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
  myLibraryBtn.removeEventListener('click', markupMyLibrary);
  homeBtn.removeEventListener('click', goToHomePage);
  registrationForm.addEventListener('submit', handleRegistration);
  signInForm.addEventListener('submit', handleSignIn);
  signOutBtn.removeEventListener('click', handleSignOut);
  myLibraryBtn.addEventListener('click', openSignInModal);
  modalSignInClose.addEventListener('click', closeSignInModal);
  modalRegistrationOpen.addEventListener('click', openRegistrationModal);
  modalRegistrationClose.addEventListener('click', closeRegistrationModal);
  goToRegistrationBtn.addEventListener('click', openRegistrationModal);
}

function renderMovieCard(movie) {
  gallery.innerHTML = movieTmpl(movie);
}

async function goToHomePage() {
  markupHome();
  try {
    const data = await api.fetchMovie();
    const movie = renderMovieCard(data);
  } catch {
    errorMsg();
  }
}

function disableBtns() {
  if (watchedBtn.classList.contains('accent-color')) {
    watchedBtn.classList.remove('accent-color');
  }
  if (queuedBtn.classList.contains('accent-color')) {
    queuedBtn.classList.remove('accent-color');
  }
}
