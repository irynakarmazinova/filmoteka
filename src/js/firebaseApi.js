import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { gallery } from './refs';
import movieTmpl from '../templates/movie-card.hbs';

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

function renderMoviesFromDB(userId, movieListType) {
  const starCountRef = ref(database, `users/${userId}/${movieListType}`);
  onValue(starCountRef, snapshot => {
    if (snapshot.val() === null) {
      console.log('no movies');
      return;
    }
    const data = snapshot.val();
    const movies = Object.values(data);
    movies.forEach(renderMovieCard);
  });
}

function addUserToDB(userId) {
  push(ref(database, `users/${userId}`), null);
}

// function renderMovieCard(movie) {
//   console.log(gallery);
//   gallery.insertAdjacentHTML('beforeend', movieTmpl(movie));
// }

function addMovieToDB(userId, movieListType, movie) {
  push(ref(database, `users/${userId}/${movieListType}`), 'movie');
}

export { addUserToDB, renderMoviesFromDB, addMovieToDB };
