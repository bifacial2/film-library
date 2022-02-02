import { createFilmoteka } from "./render-films";

const findFilmForm = document.querySelector('.search-form');
const gallery = document.querySelector('#gallery');
const searchResultMessage = document.querySelector('.search-result-message');

console.log(findFilmForm.searchQuery);

class FilmApiService {
    constructor() {
        this.searchName = '';
        this.page = 1;
    }
    fetchFilm() {
        console.log(this);

        const URL = `https://api.themoviedb.org/3/search/movie?api_key=92e9d2ddc265e58dd6d39fa8f044cca9&language=en-US&query=${this.searchName}`
        return fetch(URL)
            .then(response => response.json())
            // .then(data => {
            //     console.log(data.results);
            //     return data.results;  
            // })
        
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

    console.log(event.currentTarget.searchQuery.value);
    filmApiService.query = event.currentTarget.elements.searchQuery.value;
    filmApiService.fetchFilm()
        .then(data => {
            console.log(data.results);
            console.log(data.results.length);
            if (data.results.length === 0) {
                searchResultMessage.innerHTML = 'Search result not successful. Enter the correct movie name.'
                console.log('Search result not successful. Enter the correct movie name.');
                return;
            }
            searchResultMessage.innerHTML = '';
            createFilmoteka(data.results);
        });
    clearContainer();
}

function clearContainer() {
    gallery.innerHTML = '';
}

