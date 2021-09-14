import { API_KEY, BASE_URL } from './constants';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchSearch() {
    const url = `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.searchQuery}&page=1&include_adult=false`;
    const response = await fetch(url);
    const films = await response.json();
    this.increment();
    return films;
  }

  // async fetchMovie() {
  //   const url = `${BASE_URL}trending/all/day?&api_key=${API_KEY}&page=${this.page}`;
  //   const response = await fetch(url);
  //   const films = await response.json();
  //   this.increment();
  //   return films;
  // }

  async fetchMovieDetail(id) {
    const url = `${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`;
    const response = await fetch(url);
    const film = await response.json();
    return film;
  }

  async fetchVideo(id) {
    const url = `${BASE_URL}movie/${id}/videos?api_key=${API_KEY}&language=en-US`;
    const response = await fetch(url);
    const film = await response.json();
    return film.results;
  }

  increment() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
