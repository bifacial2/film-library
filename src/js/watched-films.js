import { ref, onValue, remove } from 'firebase/database';

import { addNewFilmToWatched } from './firebase.functions';
import { addFilmToQueue } from './firebase.functions';
import { db } from './firebase.functions';
import { clearContainer } from './find-film';
import './localization';
import { locale } from './localization';
import text from '../partials/dictionary.json';
import { resetSortParam } from './genre-sort';


if (localStorage.getItem('LOCALE') === undefined) {
  locale.lang = 'en-US';
} else locale.lang = localStorage.getItem('LOCALE');

const watchBtn = document.querySelector('.library-btns--watch');
const queueBtn = document.querySelector('.library-btns--queue');
const filmsGallery = document.querySelector('#gallery');
const paginationBtn = document.querySelector('#pagination');


// =====================Buttons on Film Info Card================

export function initStorageBtns(data) {
    const addToWatchedButton = document.getElementById('js-WatchedButton');
    const addToQueueButton = document.getElementById('js-QueueButton');

    // ==============='Add to Watched' Button==========================
    
    addToWatchedButton.addEventListener('click', onAddToWatchedBtnClick)

    function onAddToWatchedBtnClick(event) {
        event.preventDefault();
            
        addToWatchedButton.classList.toggle('active');
        if(addToWatchedButton.classList.contains('active')) {
          addNewFilmToWatched(data.id, data.poster_path, data.title, data.release_date, data.genres, data.vote_average);
          addToQueueButton.classList.remove('active');
          remove(ref(db, `users/queue/${data.id}`));
        } else {
            remove(ref(db, `users/watched/${data.id}`));
      }
      
    }
        
    // =================='Add to Queue' Button=========================

    addToQueueButton.addEventListener('click', onAddToQueueBtnClick)

    function onAddToQueueBtnClick(event) {
        event.preventDefault();
        addToQueueButton.classList.toggle('active');
        if (addToQueueButton.classList.contains('active')) {
          addFilmToQueue(data.id, data.poster_path, data.title, data.release_date, data.genres, data.vote_average);
          remove(ref(db, `users/watched/${data.id}`));
          addToWatchedButton.classList.remove('active');
          // addToQueueButton.innerHTML = 'Add to queue';
        } else {
          remove(ref(db, `users/queue/${data.id}`));
            // addToQueueButton.innerHTML = 'Add to queue';
        }
    }
  }


// ===========Header Buttons==============

const myLibraryBtn = document.querySelector('[data-name="myLibrary"]');
const emptyFolderMessageTemplate = `<p></p>
          <p style="text-align: center;"> ${text[locale.lang].emptyFolderMessage} </p>`;
myLibraryBtn.addEventListener('click', onWatchedBtnClick);

watchBtn.addEventListener('click', onWatchedBtnClick);

// =================WATCHED=====================
function onWatchedBtnClick(event) {
  event.preventDefault();
  queueBtn.setAttribute('data-status', '');
  watchBtn.setAttribute('data-status', 'active');

  watchBtn.classList.add('accent-btn');
  queueBtn.classList.remove('accent-btn');
  watchBtn.disabled = true;
  queueBtn.disabled = false;
  // To clear filter params
  resetSortParam();

  // ===========With Firebase Database====

    const getWatchedFilms = ref(db, `users/watched`);
    onValue(getWatchedFilms, (films) => {
        const data = films.val();
      // console.log(data);
        if (!data) {
            // console.log('Sorry!');
            clearContainer();
          filmsGallery.innerHTML = emptyFolderMessageTemplate;
            
        } else {
            const watchedFilmsArr = Object.keys(data);
            // console.log(watchedFilmsArr);
            watchedFilmsArr.map(oneFilm => fetchWatchedMovies(oneFilm))
        }
    })
  
    paginationBtn.classList.add('invisible');
}

export function fetchWatchedMovies(filmId) {
  fetch(
    `https://api.themoviedb.org/3/movie/${filmId}?api_key=92e9d2ddc265e58dd6d39fa8f044cca9&language=${locale.lang}`,
  )
    .then(response => response.json())
    .then(film => {
      watchedFilmsMarkup(film);
    })
    .catch(error => console.log(error));
  clearContainer();
}

// ====================QUEUE=======================
queueBtn.addEventListener('click', onQueueBtnClick);

function onQueueBtnClick(event) {
  event.preventDefault();
  watchBtn.setAttribute('data-status', '');
  queueBtn.setAttribute('data-status', 'active');
  watchBtn.classList.remove('accent-btn');
  queueBtn.classList.add('accent-btn');
  watchBtn.disabled = false;
  queueBtn.disabled = true;
  // To clear filter params
  resetSortParam();

  // ============Firebase Database===========
  const getQueueFilms = ref(db, `users/queue`);
  onValue(getQueueFilms, films => {
    const data = films.val();
    // console.log(data);
        if (!data) {
            // console.log('Sorry!');
            clearContainer();
          filmsGallery.innerHTML = emptyFolderMessageTemplate;      
        } else {
          const queueKeysArr = Object.keys(data);
            queueKeysArr.map(oneFilm => fetchWatchedMovies(oneFilm))
        }
    })
}

//================== Markup function for saved movies ====================

function ganresNames(ganres) {
  const ganreQuantity = ganres.map(ganre => ganre.name);
  // console.log(ganreQuantity);
  if (ganreQuantity.length >= 3) {
    const prune = ganreQuantity.slice(0, 2);
    const newGenres = [...prune, `${text[locale.lang].genreToMany}`];
    return newGenres.join(', ');
  } else {
    return ganreQuantity.join(', ');
  }
}

export function watchedFilmsMarkup(film) {
  const createMarkup = `<li id="galleryModal" class="hero__gallery_el list">
  <a href="#" class='card-links link'>
    <img class="hero__gallery_img" id="${film.id}" src="https://image.tmdb.org/t/p/w500${
    film.poster_path
  }" 
    data-lazy="${film.poster_path}" loading="lazy" alt="${film.title}">
         
      <div class="hero__title-genre_wrapper">
      <h2 class="film_title">${film.title}</h2><span class="hero__vote_span">${
    film.vote_average
  }</span>
      </div>
      <p class="film_genre">${ganresNames(film.genres)} | <span>${film.release_date.substr(
    0,
    4,
  )}</span></p>
      </a>
    </li>`;

  filmsGallery.insertAdjacentHTML('beforeend', createMarkup);
}
