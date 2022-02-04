import axios from 'axios';
import { makeGenres } from './makeGenres';
import Notiflix from 'notiflix';
import { lazyLoad } from './lazyLoad';
import './localization';
import { locale } from './localization';
import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.min.css';
import * as withLoader from './spinner';

let page = 1;
let totalPages = 0;
locale.lang = localStorage.getItem('LOCALE');

const container = document.getElementById('pagination');
const films = document.querySelector(`#gallery`);
const paginationBtn = document.querySelector('#pagination');
const KEY_API = '2fb1d0d80e47a8e85cd92412e3bfc617';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

// Pagination ...........................................

const options = {
  totalItems: 1000,
  visiblePages: '',
  centerAlign: true,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};
mediaPagination();
const paginationTrend = new Pagination(container, options);

paginationTrend.on('afterMove', ({ page, totalPages }) => {
  page = paginationTrend.getCurrentPage();
  reset(page);
  mediaPagination();
  withLoader.addLoader();
  paginationBtn.classList.add('invisible');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => {
    return getFilms(page, totalPages)
      .then(({ data }) => {
        createFilmoteka(data.results);
        // console.log(data.results)
      })
      .then(withLoader.removeLoader())
      .then(paginationBtn.classList.remove('invisible'))
      .catch(error => console.log(error));
  }, 2000);
});

function mediaPagination() {
  if (window.innerWidth <= 480) {
    options.visiblePages = 4;
  } else {
    options.visiblePages = 7;
  }
}
// ........................................................
createData({ page, totalPages });
export async function getFilms(page) {
  try {
    const { data } = await axios.get(
      `discover/movie?api_key=${KEY_API}&language=${locale.lang}&page=${page}`,
    );
    totalPages = data.total_pages;

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
export function createData(page, totalPages) {
  reset();
  mediaPagination();
  withLoader.addLoader();
  paginationBtn.classList.add('invisible');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => {
    return getFilms(page, totalPages)
      .then(({ data }) => {
        createFilmoteka(data.results);
        // console.log(data.results)
      })
      .then(withLoader.removeLoader())
      .then(paginationBtn.classList.remove('invisible'))
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
        <p class="film_genre">${makeGenres(genre_ids)} | <span>${release_date.substr(
          0,
          4,
        )}</span></p>
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
