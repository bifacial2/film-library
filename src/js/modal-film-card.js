import modalFilmCard from '../templates/modal-card.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { initStorageBtns } from './watched-films';

const KEY_API = '2fb1d0d80e47a8e85cd92412e3bfc617';
const card = document.querySelector('#gallery');
const body = document.querySelector('body');
card.addEventListener('click', openModal);

function fetchOneMovieInfo(movie_id) {
  return fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${KEY_API}`)
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
    initStorageBtns(data);

    modal.show();
    initStorageBtns(data);

    const closeBtn = document.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', closeModal);

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
  });
}
