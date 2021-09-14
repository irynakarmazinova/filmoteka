import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  push,
  get,
  orderByKey,
  limitToFirst,
  startAfter,
  query,
  orderByChild,
  equalTo,
  remove,
} from 'firebase/database';
import { gallery } from './refs';
import { emptyLibraryMsg, errorMsg } from './pnotify';
import movieTmpl from '../templates/movie-card-my-library.hbs';
import LoadMoreBtn from './loadMoreBtnClass';

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

//creating load more button for my library
const loadMoreBtnMyLib = new LoadMoreBtn({
  selector: '[data-action="load-more-mylib"]',
  hidden: true,
});

//fetching and rendering movies from db (watched/queued)

async function getMoviesFromDB(userId, movieListType) {
  try {
    const snapshot = await get(
      query(ref(database, `users/${userId}/${movieListType}`), orderByKey(), limitToFirst(9)),
    );

    if (!snapshot.exists()) {
      emptyLibraryMsg();
      clearGallery();
      loadMoreBtnMyLib.hide();
    } else {
      loadMoreBtnMyLib.show();

      const movies = getMoviesArr(snapshot);
      renderMovies(movies);

      if (movies.length === 9) {
        let startMovieId = Object.keys(snapshot.val())[8];
        let nextMovies = await areThereMoreMovies(startMovieId, userId, movieListType);
        if (!nextMovies) {
          loadMoreBtnMyLib.hide();
        }
        return startMovieId;
      } else {
        loadMoreBtnMyLib.hide();
      }
    }
  } catch (err) {
    errorMsg();
  }
}

async function showMoreMovies(userId, movieListType, startId) {
  try {
    loadMoreBtnMyLib.disable();
    let startMovieId = '';
    const snapshot = await get(
      query(
        ref(database, `users/${userId}/${movieListType}`),
        orderByKey(),
        startAfter(startId),
        limitToFirst(9),
      ),
    );

    if (!snapshot.exists()) {
      loadMoreBtnMyLib.enable();
      loadMoreBtnMyLib.hide();
    } else {
      const movies = getMoviesArr(snapshot);
      gallery.insertAdjacentHTML('beforeend', movieTmpl(movies));
      if (movies.length !== 9) {
        startMovieId = '';
        loadMoreBtnMyLib.hide();
      } else {
        startMovieId = Object.keys(snapshot.val())[8];
        let nextMovies = await areThereMoreMovies(startMovieId, userId, movieListType);
        if (!nextMovies) {
          loadMoreBtnMyLib.hide();
        }
      }
      loadMoreBtnMyLib.enable();
      return startMovieId;
    }
  } catch (err) {
    console.log(err);
    errorMsg();
  }
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

//util functions
function getMoviesArr(snapshot) {
  const movies = [...Object.values(snapshot.val())];
  const moviesArr = movies.reduce((acc, movie) => {
    if (movie.genres) {
      movie.genres = movie.genres.slice(0, 2);
    }
    acc.push(movie);
    return acc;
  }, []);

  return moviesArr;
}

async function areThereMoreMovies(lastMovieKey, userId, movieListType) {
  try {
    const snapshot = await get(
      query(
        ref(database, `users/${userId}/${movieListType}`),
        orderByKey(),
        startAfter(lastMovieKey),
      ),
    );
    if (snapshot.exists()) {
      return true;
    } else {
      return false;
    }
  } catch {
    errorMsg();
  }
}

function clearGallery() {
  gallery.innerHTML = '';
}

function renderMovies(data) {
  gallery.innerHTML = movieTmpl(data);
}

export {
  getMoviesFromDB,
  addMovieToDB,
  removeMovieFromDB,
  isMovieInDB,
  clearGallery,
  loadMoreBtnMyLib,
  showMoreMovies,
};
