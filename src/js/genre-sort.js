
import axios from "axios";
import { ref, onValue } from "firebase/database";
import { db } from './firebase.functions';

const KEY_API = '2fb1d0d80e47a8e85cd92412e3bfc617';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const refs = {
    form: document.querySelector('.sort-form'),
    formTitles: document.querySelectorAll('.sort-form__select__title'),
    selectField: document.querySelector('.sort-form__select'),
    resetBtn: document.querySelector('.sort-form__reset'),
    genreList: document.querySelector('.js-genre-list'),
    yearList: document.querySelector('.js-year-list'),
    ratingList: document.querySelector('.js-rating-list'),
}

// ========= Sort markup function of the drop down menu

// Toggle menu
refs.form.addEventListener('click', onClickEvent);

// Close when click to option

refs.form.addEventListener('click', onSelectEvent);

// Reset title

refs.resetBtn.addEventListener('click', onResetEvent);


function onClickEvent(event) {
    // console.dir(event.target);
    
    if (event.target.classList.contains('sort-form__select__title')) {
        console.dir(event.target.parentNode)
        
        if ('active' === event.target.parentNode.getAttribute('data-state')) {
            console.log('atribute remove');
             event.target.parentNode.setAttribute('data-state', '');
        } else {
                console.log('atribute add');
             event.target.parentNode.setAttribute('data-state', 'active');
        }
    }
}

function onSelectEvent(event) {
    // console.log(event.target);

    if (event.target.classList.contains('sort-form__select__label')) {
        // console.dir(event.target);
        event.target.parentNode.previousElementSibling.textContent = event.target.textContent;
        
        const dataValue = event.target.getAttribute('data-value');
        console.log(dataValue);

        event.target.parentNode.previousElementSibling.setAttribute('data-value', dataValue );
        event.target.parentNode.offsetParent.setAttribute('data-state', '');

    } 
}

function onResetEvent(event) {
   
    const array = refs.formTitles;
    // console.log(array);
    for (let i = 0; i < array.length; i += 1) {
        array[i].textContent = array[i].getAttribute('data-default');
    }

}

// ============== Render markup content for sort-menu =============

// Genre list 
axios.get(`genre/movie/list?api_key=${KEY_API}&language=en-US`).then(r => {

    const array = r.data.genres;
    // console.dir(array);

    for (let i = 0; i < array.length; i += 1) {
        // console.log(array[i]);

        const genreId = array[i].id;
        const genreName = array[i].name;

        renderGenres(genreId, genreName);
    }
})

function renderGenres(id, name) {

refs.genreList.insertAdjacentHTML("beforeend", 

`<input id="${name}" class="sort-form__select__input" type="radio" name="genre${name}" />
<label for="${name}" class="sort-form__select__label" data-value="${id}">${name}</label>`

)}

// Year list
renderYear();

function renderYear() {
    const date = new Date();
    const currentYear = date.getFullYear();
    const startYear = 2000;
    const yearNumber = currentYear - startYear;
    // console.log(yearNumber)

    for (let i = 1; i <= yearNumber; i += 1) {

        const year = startYear + i;
        
        refs.yearList.insertAdjacentHTML("afterbegin", 
        `<input id="year${year}" class="sort-form__select__input" type="radio" name="year${year}"  />
        <label for="year${year}" class="sort-form__select__label"data-value="${year}" >${year}</label>`

        )}
}

// Raitng
renderRaiting();

function renderRaiting() {

    for (let i = 0; i < 9; i += 1) {

        let rating = 1;
        rating = rating + i;
    
        refs.ratingList.insertAdjacentHTML('beforeend', 
    
        ` <input id="rating${rating}" class="sort-form__select__input" type="radio" name="rating${rating}"  />
    <label for="rating${rating}" class="sort-form__select__label" data-value="${rating}" >${rating}.0 and up</label>`

        )}
}

// =============== Get the movie list ==================


 const getWatchedFilms = ref(db, `users/watched`);
    onValue(getWatchedFilms, (films) => {
    const data = films.val();
    console.log(data);
    
    })

















const movieGanresIds = [];
let genre = 14;

axios.get(`discover/movie?api_key=${KEY_API}`).then(r => {
    // console.log(r.data.results);

    const movieArray = r.data.results;

    // console.log(r.data.results)
    movieArray.map(movie => {
        movie.genre_ids
        movie.id
        // console.log(movie)

        movieGanresIds.push({
            movieId: movie.id,
            genresIds: movie.genre_ids,
        });
    });

    movieGanresIds.map(movieObject => {
        
        const genresArray = movieObject.genresIds;
        // console.log(genresArray);

        if (genresArray.includes(genre)) {
            // console.log(movieObject.movieId,'есть такой жанр');
        }

    })

    // console.log(movieGanresIds[0].genresIds)
  
});

// axios.get(`discover/movie?api_key=${KEY_API}&with_genres=35`)

// axios.get(`/genre/movie/list?api_key=${KEY_API}&language=en-US`).then(r => {
//     console.log(r.data.genres);
// })

let filmArray = JSON.parse(localStorage.getItem('filmArray'));
// let queueFilmArray = JSON.parse(localStorage.getItem('queueFilmArray'))  [];

// console.log(filmArray);


