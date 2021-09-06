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
import { markupMyLibrary, markupHome, onLibraryBtnClick } from './header';
import { closeRegistrationModal, toggleSignInModal, openRegistrationModal } from './modalAuth';
import { getDatabase } from 'firebase/database';
const database = getDatabase();
const auth = getAuth();
handleAuthStateChange();

function handleRegistration(e) {
  e.preventDefault();
  markupMyLibrary();
  const email = e.currentTarget.elements.email.value;
  const password = e.currentTarget.elements.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      successfulRegistrationMsg();
      closeRegistrationModal();
    })
    .catch(error => {
      const errorCode = error.code;
      registrationErrorMsg(errorCode.slice(5).replace(/-/g, ' '));
    });
}

function handleSignIn(e) {
  e.preventDefault();
  markupMyLibrary();
  const email = e.currentTarget.elements.email.value;
  const password = e.currentTarget.elements.password.value;
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      successfulSignInMsg();
      toggleSignInModal();
    })
    .catch(authErrorMsg);
}

function handleSignOut() {
  console.log('not active');
  signOut(auth, user => {
    const userId = user.uid;
    watchedBtn.removeEventListener('click', e => {
      getMoviesFromDB(userId, 'watchedMovies');
    });
    queuedBtn.removeEventListener('click', e => {
      getMoviesFromDB(userId, 'queuedMovies');
    });
  })
    .then(() => {
      signOutMsg();
    })
    .catch(error => {
      errorMsg;
    });
}

function handleAuthStateChange() {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log('active');
      const userId = user.uid;
      myLibraryBtn.addEventListener('click', onLibraryBtnClick);
      watchedBtn.addEventListener('click', e => {
        getMoviesFromDB(userId, 'watchedMovies');
      });
      queuedBtn.addEventListener('click', e => {
        getMoviesFromDB(userId, 'queuedMovies');
      });
      signInForm.removeEventListener('submit', handleSignIn);
      myLibraryBtn.removeEventListener('click', toggleSignInModal);
      registrationForm.removeEventListener('submit', handleRegistration);
      modalSignInClose.removeEventListener('click', toggleSignInModal);
      modalRegistrationOpen.removeEventListener('click', openRegistrationModal);
      modalRegistrationClose.removeEventListener('click', closeRegistrationModal);
      goToRegistrationBtn.removeEventListener('click', openRegistrationModal);
      signOutBtn.addEventListener('click', handleSignOut);
    } else {
      markupHome();
      registrationForm.addEventListener('submit', handleRegistration);
      signInForm.addEventListener('submit', handleSignIn);
      signOutBtn.removeEventListener('click', handleSignOut);
      myLibraryBtn.addEventListener('click', toggleSignInModal);
      modalSignInClose.addEventListener('click', toggleSignInModal);
      modalRegistrationOpen.addEventListener('click', openRegistrationModal);
      modalRegistrationClose.addEventListener('click', closeRegistrationModal);
      goToRegistrationBtn.addEventListener('click', openRegistrationModal);
      myLibraryBtn.removeEventListener('click', onLibraryBtnClick);
    }
  });
}
