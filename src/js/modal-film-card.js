import modalFilmCard from '../templates/modal-card.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { initStorageBtns } from './watched-films';
import { getFilmFromFirebase } from './firebase.functions';
import './localization';
import { locale } from './localization';
import { translateElement } from './localization';
import { fetchWatchedMovies } from './watched-films';


let filmArray = JSON.parse(localStorage.getItem('filmArray')) || [];
const KEY_API = '2fb1d0d80e47a8e85cd92412e3bfc617';
const card = document.querySelector('#gallery');
const body = document.querySelector('body');
card.addEventListener('click', openModal);

locale.lang = localStorage.getItem('LOCALE');

function fetchOneMovieInfo(movie_id) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${KEY_API}&language=${locale.lang}`,
  )
    .then(response => response.json())
    .then(data => ({
      ...data,
      popularity: data.popularity.toFixed(1),
    }));
}
function openModal(e) {
  e.preventDefault();
  body.classList.add('fixed');

  fetchOneMovieInfo(e.target.id).then(data => {
    if (e.target.nodeName !== 'IMG') return;

    const markup = modalFilmCard(data);

    const modal = basicLightbox.create(markup);

    modal.show();
    getFilmFromFirebase(data);


    initStorageBtns(data);
    document
      // Find all elements that have the key attribute
      .querySelectorAll('[data-locale]')
      .forEach(translateElement);

    const closeBtn = document.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeModalHandler);
    function closeModalHandler(e) {
      if (e.code === 'Escape') {
        modal.close();
        window.removeEventListener('keydown', closeModalHandler);
        body.classList.remove('fixed');
      }
    }

    function closeModal(e) {
      modal.close();
      window.removeEventListener('keydown', closeModalHandler);
      body.classList.remove('fixed');
    }
    if (modal.close) {
      body.classList.remove('fixed');
    }
  });
}
