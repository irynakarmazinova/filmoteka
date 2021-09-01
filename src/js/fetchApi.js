import { API_KEY, BASE_URL } from './constants';

async function fetchMovie() {
  const url = ` ${BASE_URL}trending/all/day?&api_key=${API_KEY}`;
  const response = await fetch(url);
  const films = await response.json();
  return films;
}
export default { fetchMovie };
