// import { lazyLoad } from './lazyLoad';


const watchBtn = document.querySelector('.library-btns--watch');
// const homeBtn = document / querySelector('.');
// const filmsGallery = document.querySelector('#gallery');
import { createFilmoteka } from "./render-films";
import { clearContainer } from './find-film';

let filmArray = [];

export function initStorageBtns(data) {
  const addToWatchedButton = document.getElementById('js-WatchedButton');

// console.log(watchedButton);

addToWatchedButton.addEventListener('click', onAddToWatchedBtnClick)

function onAddToWatchedBtnClick(event) {
    event.preventDefault;
    // console.log(data.title);
    if (!filmArray.includes(data.id)) {
        filmArray.push(data.id);
    }
    localStorage.setItem('filmArray', JSON.stringify(filmArray));
}
};

// function randerWatchedFilms(filmArray) {
//     const watchedFilms = JSON.parse(localStorage.getItem(filmArray));
//     console.log(watchedFilms);
// }

// randerWatchedFilms(filmArray);

watchBtn.addEventListener('click', onWatchedBtnClick)
const watchedFilmsArr = [];

function onWatchedBtnClick(event) {
    // event.preventDefault;
   
    watchBtn.disabled = true; 

    const watchedFilms = JSON.parse(localStorage.getItem('filmArray'));
    console.log(watchedFilms);
    clearContainer();
    watchedFilms.map(filmId => {
        fetchWatchedMovies(filmId);
         createFilmoteka(watchedFilmsArr);
    }) 
    
   
    
}

function fetchWatchedMovies(filmId) {
     fetch(`https://api.themoviedb.org/3/movie/${filmId}?api_key=92e9d2ddc265e58dd6d39fa8f044cca9`)
         .then(response => response.json())
         .then((data) => {
             console.log(watchedFilmsArr);
             watchedFilmsArr.push(data);
         })
        // .catch(error => console.log(error));
   
}
