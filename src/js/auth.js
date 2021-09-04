import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { renderMoviesFromDB, addUserToDB, addMovieToDB } from './firebaseApi';

const auth = getAuth();
handleAuthStateChange();

const refs = {
  registrationForm: document.getElementById('registration-form-js'),
  signInForm: document.getElementById('signin-form-js'),
  queuedBtn: document.querySelector('.queue-btn-js'),
  watchedBtn: document.querySelector('.watched-btn-js'),
  signOutBtn: document.querySelector('.signout-btn-js'),
};

refs.registrationForm.addEventListener('submit', handleRegistration);
refs.signInForm.addEventListener('submit', handleSignIn);

function handleRegistration(e) {
  e.preventDefault();
  const email = e.currentTarget.elements.email.value;
  const password = e.currentTarget.elements.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      addUserToDB(user.uid);
      //thank you for registration msg
    })
    .catch(error => {
      const errorCode = error.code;
      console.log(errorCode);
      ///show message err pontify
    });
}

function handleSignIn(e) {
  e.preventDefault();
  const email = e.currentTarget.elements.email.value;
  const password = e.currentTarget.elements.password.value;
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      renderMoviesFromDB(user.uid, 'watchedMovies');
    })
    .catch(error => {
      console.log('errrrrrrooooor');
      // error msg
    });
}

function handleSignOut() {
  signOut(auth)
    .then(() => {
      console.log('goodbye');
      //goodbye msg
    })
    .catch(error => {
      console.log('an error happened');
    });
}

function handleAuthStateChange() {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log('hello msg');
      addEventListeners();
      //   const userId = user.uid;
    } else {
      removeEventListeners();
    }
  });
}

function addEventListeners() {
  refs.signOutBtn.addEventListener('click', handleSignOut);
  refs.watchedBtn.addEventListener('click', e => {
    renderMoviesFromDB(userId, 'watchedMovies');
  });
  refs.queuedBtn.addEventListener('click', e => {
    renderMoviesFromDB(userId, 'queuedMovies');
  });
}

function removeEventListeners() {
  refs.watchedBtn.removeEventListener('click', e => {
    renderMoviesFromDB(userId, 'watchedMovies');
  });
  refs.queuedBtn.removeEventListener('click', e => {
    renderMoviesFromDB(userId, 'queuedMovies');
  });
  refs.signOutBtn.removeEventListener('click', handleSignOut);
}
