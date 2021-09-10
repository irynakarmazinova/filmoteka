import API from './fetchApi';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getMoviesFromDB } from './database';
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

//user sign in function
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

//user sign out function
async function handleSignOut() {
  try {
    await signOut(auth, user => {
      const userId = user.uid;
    });
    signOutMsg();
    disableBtns();
    markupHome();
  } catch {
    errorMsg();
  }
}

//managing actions when the user is logged in function
async function handleAuthStateChange() {
  try {
    onAuthStateChanged(auth, user => {
      if (user) {
        const userId = user.uid;
        signOutIcon.classList.remove('visually-hidden');
        watchedBtn.addEventListener('click', e => {
          getMoviesFromDB(userId, 'watchedMovies');
        });
        queuedBtn.addEventListener('click', e => {
          getMoviesFromDB(userId, 'queuedMovies');
        });
        manageLogInEvents();
      } else {
        manageLogOutEvents();
        signOutIcon.classList.add('visually-hidden');
      }
    });
  } catch {
    errorMsg();
  }
}

//functions for managing event listeners as user  is logged in and logged out
function manageLogInEvents() {
  myLibraryBtn.addEventListener('click', markupMyLibrary);
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
  myLibraryBtn.removeEventListener('click', markupMyLibrary);
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
  if (watchedBtn.classList.contains('accent-color')) {
    watchedBtn.classList.remove('accent-color');
  }
  if (queuedBtn.classList.contains('accent-color')) {
    queuedBtn.classList.remove('accent-color');
  }
}
