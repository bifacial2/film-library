
const watchBtn = document.querySelector('.library-btns--watch');
const queueBtn = document.querySelector('.library-btns--queue');
const filmsGallery = document.querySelector('#gallery');

import { clearContainer } from './find-film';

let filmArray = [];
let queueFilmArray = [];

// =====================Buttons on Film Info Card================

export function initStorageBtns(data) {
    const addToWatchedButton = document.getElementById('js-WatchedButton');
    const addToQueueButton = document.getElementById('js-QueueButton');

    // ===============Watch Button==========================
    
    addToWatchedButton.addEventListener('click', onAddToWatchedBtnClick)

    function onAddToWatchedBtnClick(event) {
        event.preventDefault;
            
        addToWatchedButton.innerHTML = 'Added to watched';
        if (!filmArray.includes(data.id)) {
            filmArray.push(data.id);
        }
        
        localStorage.setItem('filmArray', JSON.stringify(filmArray));
    }
    
    // ==================Queue Button=========================

    addToQueueButton.addEventListener('click', onAddToQueueBtnClick)

    function onAddToQueueBtnClick(event) {
        event.preveventDefault;
        addToQueueButton.innerHTML = 'Added to queue';

        if (!queueFilmArray.includes(data.id)) {
            queueFilmArray.push(data.id);
        }
        localStorage.setItem('queueFilmArray', JSON.stringify(queueFilmArray));
    }

};

// ===========Header Buttons==============

const myLibraryBtn = document.querySelector('[data-name="myLibrary"]')

myLibraryBtn.addEventListener('click', onWatchedBtnClick)

watchBtn.addEventListener('click', onWatchedBtnClick)

// =================WATCH=====================
function onWatchedBtnClick(event) {
    event.preventDefault;

    watchBtn.classList.add('accent-btn');
    queueBtn.classList.remove('accent-btn');
    watchBtn.disabled = true;
    queueBtn.disabled = false;
  
    JSON.parse(localStorage.getItem('filmArray')).map(filmId => {
        fetchWatchedMovies(filmId);
    })  
}

function fetchWatchedMovies(filmId) {
     fetch(`https://api.themoviedb.org/3/movie/${filmId}?api_key=92e9d2ddc265e58dd6d39fa8f044cca9`)
         .then(response => response.json())
         .then((film) => {
              
             watchedFilmsMarkup(film);
         })
        .catch(error => console.log(error));
    clearContainer();
}

// ====================QUEUE=======================
queueBtn.addEventListener('click', onQueueBtnClick)

function onQueueBtnClick(event) {
    event.preventDefault;

    watchBtn.classList.remove('accent-btn');
    queueBtn.classList.add('accent-btn');
    watchBtn.disabled = false;
    queueBtn.disabled = true;
   
    const queuedFilms = JSON.parse(localStorage.getItem('queueFilmArray'));
  
    queuedFilms.map(filmId => {
        fetchWatchedMovies(filmId);
    })   
}

//================== Markup function for saved movies ====================

function watchedFilmsMarkup(film) {
    const createMarkup = 
      
        `<li id="galleryModal" class="hero__gallery_el list">
  <a href="#" class='card-links link'>
    <img class="hero__gallery_img" id="${film.id}" src="https://image.tmdb.org/t/p/w500${film.poster_path}" 
    data-lazy="${film.poster_path}" loading="lazy" alt="${film.title}">
         
      <div class="hero__title-genre_wrapper">
      <h2 class="film_title">${film.title}</h2><span class="hero__vote_span">${film.vote_average}</span>
      </div>
      <p class="film_genre">${film.genres.name} | <span>${film.release_date.substr(0, 4)}</span></p>
      </a>
    </li>`
    
        
    filmsGallery.insertAdjacentHTML('beforeend', createMarkup);
}
