import modalFilmCard from '../templates/modal-card.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const KEY_API = '2fb1d0d80e47a8e85cd92412e3bfc617';
const card = document.querySelector('#gallery');

card.addEventListener('click', openModal);


function fetchOneMovieInfo(movie_id) {
     return  fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${KEY_API}`)
     .then(response => response.json())
    .then(data => ({
      ...data,
      popularity: data.popularity.toFixed(1),
    }));
}
function openModal(e) {
  e.preventDefault();
  fetchOneMovieInfo(e.target.id)
    .then(data => {
      if (e.target.nodeName !== 'IMG') return;

      const markup = modalFilmCard(data);
      const modal = basicLightbox.create(markup);

      modal.show();

      const closeBtn = document.querySelector('.modal-close-btn');
      closeBtn.addEventListener('click', closeModal);

      window.addEventListener('keydown', closeModalHandler);

      function closeModalHandler(e) {
        if (e.code === 'Escape') {
          modal.close();
          window.removeEventListener('keydown', closeModalHandler);
        }
      }

      function closeModal(e) {
        modal.close();
        window.removeEventListener('keydown', closeModalHandler);
      }

      initStorageBtns(data);
    })
    .then(data => {})
    .catch(error => {
      console.log('oops!');
    });
}

function initStorageBtns(data) {
  const watchedButton = document.getElementById('js-WatchedButton');

console.log(watchedButton);

watchedButton.addEventListener('click', onWatchedBtnClick)

function onWatchedBtnClick(event) {
    event.preventDefault;
  console.log(data.title);
  localStorage.setItem('id', data.id);
}
};