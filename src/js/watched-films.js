import { lazyLoad } from './lazyLoad';

import { ref, onValue } from 'firebase/database';

import { addNewFilmToWatched } from './firebase.functions';
import { addFilmToQueue } from './firebase.functions';
import { deleteFilmFromWatched } from './firebase.functions';
import { deleteFilmFromQueue } from './firebase.functions';
import { db } from './firebase.functions';
import './localization';
import { locale } from './localization';
import text from '../partials/dictionary.json';

if (localStorage.getItem('LOCALE') === undefined) {
  locale.lang = 'en-EN';
} else locale.lang = localStorage.getItem('LOCALE');

const watchBtn = document.querySelector('.library-btns--watch');
const queueBtn = document.querySelector('.library-btns--queue');
const filmsGallery = document.querySelector('#gallery');
const paginationBtn = document.querySelector('#pagination');

import { clearContainer } from './find-film';

let filmArray = JSON.parse(localStorage.getItem('filmArray')) || [];
let queueFilmArray = JSON.parse(localStorage.getItem('queueFilmArray')) || [];

// =====================Buttons on Film Info Card================

export function initStorageBtns(data) {
  const addToWatchedButton = document.getElementById('js-WatchedButton');
  const addToQueueButton = document.getElementById('js-QueueButton');

  // ==============='Add to Watched' Button==========================

  addToWatchedButton.addEventListener('click', onAddToWatchedBtnClick);
  for (const films of filmArray) {
    if (films === data.id) {
      addToWatchedButton.classList.add('active');
      if (addToWatchedButton.classList.contains('active')) {
        console.log(locale.lang);
        addToWatchedButton.innerHTML = `${text[locale.lang].removeFromWatched}`;
      }
    }
  }

  function onAddToWatchedBtnClick(event) {
    event.preventDefault;

    // addToWatchedButton.innerHTML = 'Added to watched';
    addToWatchedButton.classList.toggle('active');
    if (addToWatchedButton.classList.contains('active')) {
      addToWatchedButton.innerHTML = `${text[locale.lang].removeFromWatched}`;
    } else {
      addToWatchedButton.innerHTML = `${text[locale.lang].addedToWatched}`;
    }
    if (!filmArray.includes(data.id)) {
      filmArray.push(data.id);
    }

    // ========FIREBASE============
    addNewFilmToWatched(
      data.id,
      data.poster_path,
      data.title,
      data.release_date,
      data.genres,
      data.vote_average,
    );
    deleteFilmFromQueue(data.id);

    // =======delete from queue Local Storage===============================

    //     const dataIndex = queueFilmArray.indexOf(data.id);

    //     if (dataIndex !== -1) {
    //         localStorage.setItem('queueFilmArray', JSON.stringify(queueFilmArray.splice(dataIndex, 1)));
    //     }

    //     localStorage.setItem('filmArray', JSON.stringify(filmArray));
  }

  // =================='Add to Queue' Button=========================

  addToQueueButton.addEventListener('click', onAddToQueueBtnClick);
  for (const queuefilms of queueFilmArray) {
    if (queuefilms === data.id) {
      addToQueueButton.classList.add('active');
      if (addToQueueButton.classList.contains('active')) {
        addToQueueButton.innerHTML = `${text[locale.lang].removeFromQueue}`;
      }
    }
  }

  function onAddToQueueBtnClick(event) {
    event.preveventDefault;
    // addToQueueButton.innerHTML = 'Added to queue';
    addToQueueButton.classList.toggle('active');
    if (addToQueueButton.classList.contains('active')) {
      addToQueueButton.innerHTML = `${text[locale.lang].removeFromQueue}`;
    } else {
      addToQueueButton.innerHTML = `${text[locale.lang].addedToQueue}`;
    }
    if (!queueFilmArray.includes(data.id)) {
      queueFilmArray.push(data.id);
    }

    // ========FIREBASE============

    addFilmToQueue(
      data.id,
      data.poster_path,
      data.title,
      data.release_date,
      data.genres,
      data.vote_average,
    );
    deleteFilmFromWatched(data.id);

    // ========delete from watched Local Storage=========================

    // const queueIndex = filmArray.indexOf(data.id);

    // if (queueIndex !== -1) {
    //     console.log(filmArray);
    //     localStorage.setItem('filmArray', JSON.stringify(filmArray.splice(queueIndex, 1)));
    // }

    // localStorage.setItem('queueFilmArray', JSON.stringify(queueFilmArray));
  }
  // ========delete from watched========
  // const queueIndex = filmArray.indexOf(data.id);

  // if (queueIndex !== -1) {
  //     console.log(filmArray);
  //     localStorage.setItem('filmArray', JSON.stringify(filmArray.splice(queueIndex, 1)));
  // }

  localStorage.setItem('queueFilmArray', JSON.stringify(queueFilmArray));
}

// ===========Header Buttons==============

const myLibraryBtn = document.querySelector('[data-name="myLibrary"]');

myLibraryBtn.addEventListener('click', onWatchedBtnClick);

watchBtn.addEventListener('click', onWatchedBtnClick);

// =================WATCH=====================
function onWatchedBtnClick(event) {
  event.preventDefault;

  watchBtn.classList.add('accent-btn');
  queueBtn.classList.remove('accent-btn');
  watchBtn.disabled = true;
  queueBtn.disabled = false;

  // ===========With Firebase Database====

  const getWatchedFilms = ref(db, `users/watched`);
  onValue(getWatchedFilms, films => {
    const data = films.val();
    // console.log(data);
    for (const key in data) {
      // console.log(key);
      fetchWatchedMovies(key);
    }
  });

  // ===========With Local Storage============================

  // try {
  //    JSON.parse(localStorage.getItem('filmArray')).map(filmId => {
  //        fetchWatchedMovies(filmId);

  // })
  // } catch (error) {
  //     console.log('Nope');
  //     filmsGallery.innerHTML = '';
  // }

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
  event.preventDefault;

  watchBtn.classList.remove('accent-btn');
  queueBtn.classList.add('accent-btn');
  watchBtn.disabled = false;
  queueBtn.disabled = true;

  // ============Firebase Database===========
  const getQueueFilms = ref(db, `users/queue`);
  onValue(getQueueFilms, films => {
    const data = films.val();
    // console.log(data);
    for (const key in data) {
      // console.log(key);
      fetchWatchedMovies(key);
    }
  });

  // ===========With Local Storage==================================

  // try {
  //     queueFilmArray.map(filmId => {
  //     fetchWatchedMovies(filmId);
  // })
  // } catch (error) {
  //     console.log('Nope');
  //     filmsGallery.innerHTML = '';
  // }
  // paginationBtn.classList.add('invisible');
}

//================== Markup function for saved movies ====================

function ganresNames(ganres) {
  const ganreQuantity = ganres.map(ganre => ganre.name);
  if (ganreQuantity.length >= 3) {
    const prune = ganreQuantity.slice(0, 2);
    const newGenres = [...prune, `${text[locale.lang].genreToMany}`];
    return newGenres.join(', ');
  } else {
    return ganreQuantity.join(', ');
  }
}

function watchedFilmsMarkup(film) {
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
