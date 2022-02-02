
import { createFilmoteka } from "./render-films";
import { createData } from "./render-films";


const findFilmForm = document.querySelector('.search-form');
const SearchFormSubmitBtn = document.querySelector('.search-form__submit');
const gallery = document.querySelector('#gallery');
const searchResultMessage = document.querySelector('.search-result-message');

// console.log(findFilmForm.searchQuery);

class FilmApiService {
    constructor() {
        this.searchName = '';
        this.page = 1;
    }
    fetchFilm() {
        console.log(this.searchName.length);

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

SearchFormSubmitBtn.disabled = true;
findFilmForm.addEventListener('input', onFindFormInput)

function onFindFormInput(event) {
    event.preventDefault;
    console.log(event.currentTarget.searchQuery.value.length);
    if (event.currentTarget.searchQuery.value.length === 0) {
        SearchFormSubmitBtn.disabled = true
    };
    SearchFormSubmitBtn.disabled = false
}

function onSearch(event) {
    event.preventDefault();

    filmApiService.query = event.currentTarget.elements.searchQuery.value;
    
    filmApiService.fetchFilm()
        .then(data => {
           
           if (data.results.length === 0) {
                searchResultMessage.innerHTML = 'Search result not successful. Enter the correct movie name.'
                createData();
                return;
            }
            
            searchResultMessage.innerHTML = '';
            createFilmoteka(data.results);
            console.log(filmApiService.query.length);
        })
        .catch(error => {
            // console.log(error);
        createData();
    }) 
    
    clearContainer();
}

export function clearContainer() {
    gallery.innerHTML = '';
}

