import axios from 'axios';
import { makeGenres } from './makeGenres';
import Notiflix from 'notiflix';
import { lazyLoad } from './lazyLoad';

let page = 1;
let totalPages = 0;

const films = document.querySelector(`#gallery`);

const KEY_API = '2fb1d0d80e47a8e85cd92412e3bfc617';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

createData({ page, totalPages });
async function getFilms(page) {
  try {
    const { data } = await axios.get(`trending/movie/week?api_key=${KEY_API}&language=uk-UA`);
    totalPages = data.total_pages;
    console.log(data);
    if (page === totalPages) {
      Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`, {
        timeout: 1000,
      });
    }
    return {
      data,
      totalPages,
    };
  } catch (error) {
    error => console.log(error);
  }
}
function createData(page, totalPages) {
  reset();

  setTimeout(() => {
    return getFilms(page, totalPages)
      .then(({ data }) => {
        createFilmoteka(data.results);
      })

      .catch(error => console.log(error));
  }, 2000);
}

export function createFilmoteka(data) {
  const createFilmoteka = data
    .map(
      ({ poster_path, title, release_date, genre_ids, id, vote_average }) =>
        `<li id="galleryModal" class="hero__gallery_el list">
  <a href="#" class='card-links link'>
     ${
       poster_path
         ? `<img class="hero__gallery_img" id="${id}" src="" data-lazy="https://image.tmdb.org/t/p/w500${poster_path}" loading="lazy" alt="${title}"`
         : `<img class="hero__gallery_img" id="${id}" src="" data-lazy="${poster_path}" loading="lazy" alt="Poster is missing"`
     }>
      <div class="hero__title-genre_wrapper">
      <h2 class="film_title">${title}</h2><span class="hero__vote_span">${vote_average}</span>
      </div>
      <p class="film_genre">${makeGenres(genre_ids)} | <span>${release_date.substr(0, 4)}</span></p>
      </a>
    </li>`,
    )
    .join('');
  films.insertAdjacentHTML('beforeend', createFilmoteka);

  const img = document.querySelectorAll('#gallery img');
  lazyLoad(img);
}

function reset() {
  return (films.innerHTML = '');
}
