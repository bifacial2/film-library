import { createFilmoteka } from './render-films';
import { createData } from './render-films';
import { locale } from './localization';
import text from '../partials/dictionary.json';

if (localStorage.getItem('LOCALE') === null) {
  locale.lang = 'en-US';
} else locale.lang = localStorage.getItem('LOCALE');

const findFilmForm = document.querySelector('.search-form');
const SearchFormSubmitBtn = document.querySelector('.search-form__submit');
const gallery = document.querySelector('#gallery');
const searchResultMessage = document.querySelector('.search-result-message');
// const filmSearchFormInput = document.querySelector('.search-form__input');
const homeButton = document.querySelector('[data-name="home"]');
const paginationBtn = document.querySelector('#pagination');

// console.log(homeButton);

class FilmApiService {
  constructor() {
    this.searchName = '';
    this.page = 1;
  }
  fetchFilm() {
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=92e9d2ddc265e58dd6d39fa8f044cca9&language=${locale.lang}&query=${this.searchName}`;

    return fetch(URL).then(response => response.json());
  }

  get query() {
    return this.searchName;
  }

  set query(newQuery) {
    this.searchName = newQuery;
  }
}

const filmApiService = new FilmApiService();

findFilmForm.addEventListener('submit', onSearch);

SearchFormSubmitBtn.disabled = true;
findFilmForm.addEventListener('input', onFindFormInput);

function onFindFormInput(event) {
  event.preventDefault();
  // console.log(event.currentTarget.searchQuery.value.length);
  if (event.currentTarget.searchQuery.value.length === 0) {
    SearchFormSubmitBtn.disabled = true;
  }
  SearchFormSubmitBtn.disabled = false;
}

function onSearch(event) {
  event.preventDefault();

  filmApiService.query = event.currentTarget.elements.searchQuery.value;
  // console.log(filmApiService.query.length);

  if (filmApiService.query.length === 0) {
    searchResultMessage.innerHTML = '';
    clearContainer();
    createData();
    return;
  }

  filmApiService
    .fetchFilm()
    .then(data => {
      if (data.results.length === 0) {
        findFilmForm.reset();
        searchResultMessage.innerHTML = text[locale.lang].searchResultMessage;
        /* searchResultMessage.innerHTML =
              'Search result not successful. Enter the correct movie name.'; */
        /* Вместо жёстко заданного сообщения система выдаст текст из нашего словарика 
        в зависимости от выбранного языка */
        createData();
        return;
      }
      clearContainer();
      searchResultMessage.innerHTML = '';
      createFilmoteka(data.results);
      paginationBtn.classList.add('invisible');
      // console.log(data.results);
    })
    .catch(error => {
      console.log(error);
      // createData();
    });
}

export function clearContainer() {
  gallery.innerHTML = '';
}

// ===============Home Button====================

homeButton.addEventListener('click', onHomeBtnClick);

function onHomeBtnClick(event) {
  createData();
}
