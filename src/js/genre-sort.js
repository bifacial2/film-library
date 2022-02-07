
import axios from "axios";
import { ref, onValue } from "firebase/database";
import { db } from './firebase.functions';
import { fetchWatchedMovies } from "./watched-films";
import { clearContainer } from "./find-film";
import { watchedFilmsMarkup } from "./watched-films";
import { addNewFilmToSort } from "./firebase.functions";

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
    gallery: document.querySelector('#gallery'),
    // Buttons Watched and Queue to get the info about current page
    watchedBtn: document.querySelector('[data-locale="watch"]'),
    queueBtn: document.querySelector('[data-locale="queue"]'), 
}

// To get value of the selected option to sort
const genreInput = document.querySelector('[data-sort="genere"]');
let genreValue = parseInt(genreInput.getAttribute('data-value'));
const yearInput = document.querySelector('[data-sort="year"]');
let yearValue = parseInt(yearInput.getAttribute('data-value'));
const ratingInput = document.querySelector('[data-sort="rating"]');
let ratingValue = parseInt(ratingInput.getAttribute('data-value'));

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

        genreValue = parseInt(genreInput.getAttribute('data-value'));
        yearValue = parseInt(yearInput.getAttribute('data-value'));
        ratingValue = parseInt(ratingInput.getAttribute('data-value'));

        console.log(genreValue, yearValue, ratingValue);
        
        startSort(genreValue, yearValue);

    } 
}

function onResetEvent() {
   
    const array = refs.formTitles;
    // console.log(array);
    for (let i = 0; i < array.length; i += 1) {
        array[i].textContent = array[i].getAttribute('data-default');
    }

    genreValue = genreInput.setAttribute('data-value','');
    yearValue = yearInput.setAttribute('data-value','');
    ratingValue = ratingInput.setAttribute('data-value','');

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


function startSort(genre, year, rating) {
    const getWatchedFilms = ref(db, `users/watched`);
    // console.log(getWatchedFilms);
    onValue(getWatchedFilms, (films) => {
        const data = films.val();
    
        const filmIdArray = Object.keys(data);
        // console.log(filmIdArray);
        
        sortMovie(filmIdArray);
        // console.log(sortedByuGenre);
        //  const sortedByYear = sortMovieByYear(sortedByuGenre, year)

    });
      
};

// ============ Sort Movies ============


function sortMovie(array) {

    for (let i = 0; i < array.length; i += 1) {
       
        const filmId = array[i];

        axios.get(`movie/${filmId}?api_key=${KEY_API}`)
            .then(r => { return sortMovieByGenre(r) })
            .then(r => { return sortMovieByYear(r) })
            .then(r => { return sortMovieByRating(r) })
            .then(r => (console.log(r.data.id)));
       
    } 
};

function sortMovieByYear(r) {
         
    console.log(r.data.release_date);
             
    //  ========= Year sort ============

    //  Check if there is value of genre, if no selected genre render all the films
    if (!Number.isInteger(yearValue)) {
        console.log('sort in. Year is not defined')
        return r;
    };
    
    return r;
       
};

function sortMovieByRating(r) {
             
    console.log(r.data.vote_average);
             
    //  ========= Year sort ============
    //  Check if there is value of genre, if no selected genre render all the films
    if (!Number.isInteger(ratingValue)) {
         console.log('sort in. Rating is not defined')
            return r;
    };
    
    return r;
}

function sortMovieByGenre(result) { 
    
     //  ========= Genre sort ============
            let genreIdArray = [];
            // create array with genre id of the fetched movie
            for (let genre of Object.values(result.data.genres)) {
                genreIdArray.push(genre.id);
            }

            //  Check if there is value of genre, if no selected genre render all the films
            if (!Number.isInteger(genreValue)) {
                console.log('sort in. Genre is undefined')
                return result;
            }

            //  If genre has selected value, either render film if contain the genre or
            //  return if no matching
            if (genreIdArray.includes(genreValue)) {
                console.log('OK - genre is matched - sort in')
                
                return result;

            } else {
                 console.log('genre not matched - sort out');
            }
};



// Логика:
// При нажатии на reset проверка на current page (home, library (watched, quee))
// Какая из кнопока активная, тот фетч и делаем

// Делаем fetch сразу из просмотренных или очереди, но при функции сортировка берем
// все 3 значения (genre, year, rating), если значения нет, значит нет фильтра
// Таким образом решаеться проблема общей сортировки

// При нажатии на кнопку сортировки:
// - идет запрос на получения всего списка из промотренных или очереди(в зависимости
// какая кнопка активная)
//     - прогоняется через 3 фильтра фильтр 
//     - рендериться что осталось

//     Если нажать еще раз на кнопку сортировки по любой
//     - фетч 
//     - сортировка по всем типам

// Что нужно сделать:
// 1. Сделать 2 функции сортировки,
//     2. Вставить все в 1 функцию и прогонять их последовательно
// 3. Привязать fetch к активной кнопке(елси активна - fetch по этой теме)
// 4. Сделать ограничение по списку в 10 строк и добавить скролл
// 5. Сделать для мобильной версии в столбик
// 6. сделать возможность скрыть меню кнопкой фильтр




