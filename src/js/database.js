import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  push,
  get,
  child,
  query,
  orderByChild,
  equalTo,
  remove,
} from 'firebase/database';
import { gallery } from './refs';
import { emptyLibraryMsg, errorMsg } from './pontify';
import movieTmpl from '../templates/movie-card.hbs';

//database settings
const firebaseConfig = {
  apiKey: 'AIzaSyD9DuVbKdLwDtku8FtOtjPod4nIuWT1gZ0',
  authDomain: 'filmoteka-7c398.firebaseapp.com',
  databaseURL: 'https://filmoteka-7c398-default-rtdb.firebaseio.com',
  projectId: 'filmoteka-7c398',
  storageBucket: 'filmoteka-7c398.appspot.com',
  messagingSenderId: '42520390111',
  appId: '1:42520390111:web:39d4659fdec16f67bcbc6a',
  measurementId: 'G-RLEDXZFF39',
};
const app = initializeApp(firebaseConfig);
const database = getDatabase();

//rendering movies from watched and queue libraries
// function getMoviesFromDB(userId, movieListType) {
//   const dbRef = ref(getDatabase());
//   get(child(dbRef, `users/${userId}/${movieListType}/`))
//     .then(snapshot => {
//       if (!snapshot.exists()) {
//         emptyLibraryMsg();
//       } else {
//         const movies = {
//           results: [...Object.values(snapshot.val())],
//         };
//         renderMovies(movies);
//       }
//     })
//     .catch(error => errorMsg);
// }

async function getMoviesFromDB(userId, movieListType) {
  const dbRef = ref(getDatabase());
  try {
    const snapshot = await get(child(dbRef, `users/${userId}/${movieListType}/`));

    if (!snapshot.exists()) {
      emptyLibraryMsg();
    } else {
      const movies = {
        results: [...Object.values(snapshot.val())],
      };
      renderMovies(movies);
    }
  } catch {
    errorMsg;
  }
}

function renderMovies(data) {
  gallery.innerHTML = movieTmpl(data);
}

async function addMovieToDB(userId, movieListType, movie) {
  await push(ref(database, `users/${userId}/${movieListType}`), movie);
}

async function removeMovieFromDB(userId, movieListType, movie) {
  const snapshot = await get(
    query(ref(database, `users/${userId}/${movieListType}`), orderByChild('id'), equalTo(movie.id)),
  );

  snapshot.forEach(async movieRecord => {
    await remove(ref(database, `users/${userId}/${movieListType}/${movieRecord.key}`));
  });
}

async function isMovieInDB(userId, movieListType, movie) {
  const snapshot = await get(
    query(ref(database, `users/${userId}/${movieListType}`), orderByChild('id'), equalTo(movie.id)),
  );

  return snapshot.size;
}

export { getMoviesFromDB, addMovieToDB, removeMovieFromDB, isMovieInDB };
