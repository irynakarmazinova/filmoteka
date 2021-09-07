import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getMoviesFromDB, addUserToDB } from './database';
import { registrationForm, signInForm, queuedBtn, watchedBtn, signOutBtn } from './refs';
import {
  successfulRegistrationMsg,
  authErrorMsg,
  signOutMsg,
  successfulSignInMsg,
  registrationErrorMsg,
  errorMsg,
} from './pontify';

const auth = getAuth();
handleAuthStateChange();

// registrationForm.addEventListener('submit', handleRegistration);
// signInForm.addEventListener('submit', handleSignIn);

function handleRegistration(e) {
  e.preventDefault();
  const email = e.currentTarget.elements.email.value;
  const password = e.currentTarget.elements.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      addUserToDB(user.uid);
      successfulRegistrationMsg();
    })
    .catch(error => {
      const errorCode = error.code;
      registrationErrorMsg(errorCode.slice(5).replace(/-/g, ' '));
    });
}

function handleSignIn(e) {
  e.preventDefault();
  const email = e.currentTarget.elements.email.value;
  const password = e.currentTarget.elements.password.value;
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      successfulSignInMsg();
      const user = userCredential.user;
      getMoviesFromDB(user.uid, 'watchedMovies');
    })
    .catch(authErrorMsg);
}

function handleSignOut() {
  signOut(auth)
    .then(() => {
      signOutMsg();
      refs.signOutBtn.removeEventListener('click', handleSignOut);
      refs.watchedBtn.removeEventListener('click', e => {
        renderMoviesFromDB(userId, 'watchedMovies');
      });
      refs.queuedBtn.removeEventListener('click', e => {
        renderMoviesFromDB(userId, 'queuedMovies');
      });
    })
    .catch(error => {
      errorMsg;
    });
}

function handleAuthStateChange() {
  onAuthStateChanged(auth, user => {
    if (user) {
      const userId = user.uid;
      watchedBtn.addEventListener('click', e => {
        getMoviesFromDB(userId, 'watchedMovies');
      });
      signOutBtn.addEventListener('click', handleSignOut);
      queuedBtn.addEventListener('click', e => {
        getMoviesFromDB(userId, 'queuedMovies');
      });
      registrationForm.removeEventListener('submit', handleRegistration);
      signInForm.removeEventListener('submit', handleSignIn);
    } else {
      registrationForm.addEventListener('submit', handleRegistration);
      signInForm.addEventListener('submit', handleSignIn);
    }
  });
}
