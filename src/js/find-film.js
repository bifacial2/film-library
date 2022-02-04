
import { createFilmoteka } from "./render-films";
import { createData } from "./render-films";


const findFilmForm = document.querySelector('.search-form');
// const SearchFormSubmitBtn = document.querySelector('.search-form__submit');
const gallery = document.querySelector('#gallery');
const searchResultMessage = document.querySelector('.search-result-message');
const homeButton = document.querySelector('[data-name="home"]');




class FilmApiService {
    constructor() {
        this.searchName = '';
        this.page = 1;
    }
    fetchFilm() {
        // console.log(this.searchName.length);
        const URL = `https://api.themoviedb.org/3/search/movie?api_key=92e9d2ddc265e58dd6d39fa8f044cca9&language=en-US&query=${this.searchName}`
   
        return fetch(URL)
            .then(response => response.json())  
    }

    get query() {
        return this.searchName;
    }

    set query(newQuery) {
        this.searchName = newQuery;
    }
}

const filmApiService = new FilmApiService();

findFilmForm.addEventListener('submit', onSearch)

function onSearch(event) {
    event.preventDefault();

    filmApiService.query = event.currentTarget.elements.searchQuery.value;
    // console.log(filmApiService.query.length);

    if (filmApiService.query.length !== 0) {
        filmApiService.fetchFilm()
        .then(data => {
           
            if (data.results.length === 0) {
                findFilmForm.reset();
                searchResultMessage.innerHTML = 'Search result not successful. Enter the correct movie name.'
                createData();
                return;
            }
            
            searchResultMessage.innerHTML = '';
            createFilmoteka(data.results);
            // console.log(data.results);
        })
        .catch(error => {
            console.log(error);
        // createData();
    }) 
    }
    //  createData();
    
    clearContainer();
}

export function clearContainer() {
    gallery.innerHTML = '';
}

// ===============Home Button====================

homeButton.addEventListener('click', onHomeBtnClick)

function onHomeBtnClick(event) {
    createData();
}