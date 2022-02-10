import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue } from "firebase/database";
import './localization';
import { locale } from './localization';
import text from '../partials/dictionary.json';
import { translateElement } from './localization';

export const firebaseConfig = {
    apiKey: "AIzaSyBdEwkYD1_puUIBjlQvF88qB9Fc8QioMiw",
    authDomain: "login-with-firebase-6434f.firebaseapp.com",
    databaseURL: "https://login-with-firebase-6434f-default-rtdb.firebaseio.com",
    projectId: "login-with-firebase-6434f",
    storageBucket: "login-with-firebase-6434f.appspot.com",
    messagingSenderId: "414426325677",
    appId: "1:414426325677:web:e4a3a5184c8ec227ff1c24"
  };



// ===============Initialize Firebase
export const app = initializeApp(firebaseConfig);

// ================Firebase Functions==============
export const db = getDatabase(app);

// =================Add film==================
export function addNewFilmToWatched(id, poster_path, title, release_date, genres, vote_average) {
    set(ref(db, 'users/watched/' + id), {
        poster_path: poster_path,
        title: title,
        release_date: release_date,
        genres: genres,
        vote_average: vote_average,
    });
}



export function addFilmToQueue(id, poster_path, title, release_date, genres, vote_average) {
    set(ref(db, 'users/queue/' + id), {
        poster_path: poster_path,
        title: title,
        release_date: release_date,
        genres: genres,
        vote_average: vote_average,
    });
}


// ==================Change Buttons Title========================


export function getFilmFromFirebase(data) {
    const addToWatchedButton = document.querySelector('#js-WatchedButton');
    const addToQueueButton = document.getElementById('js-QueueButton');
    document
        // Find all elements that have the key attribute
        .querySelectorAll('[data-locale]')
        .forEach(translateElement);
}
// const auth = getAuth();

// const myUserId = auth.users.queue.id;
// console.log(myUserId);
// const topUserPostsRef = query(ref(db, 'users/watched'), orderByChild('vote_average'));
// console.log(topUserPostsRef);




// const dbRef = ref(db);
// function getFilmsForWatchedRender() {
//   get(child(dbRef, `users/queue/`)).then((film) => {
//   if (film.exists()) {
//       console.log(film.val());
//       const topUserPostsRef = query(ref(db, 'users/queue'), orderByChild('vote_average'));
//       console.log(topUserPostsRef);
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });
// }

// getFilmsForWatchedRender(524434);
// ==================Change Buttons Title========================


function getFilmFromFirebase(data) {
    const addToWatchedButton = document.querySelector('#js-WatchedButton');
    const addToQueueButton = document.getElementById('js-QueueButton');
    document
        // Find all elements that have the key attribute
        .querySelectorAll('[data-locale]')
        .forEach(translateElement);
}
// const auth = getAuth();

// const myUserId = auth.users.queue.id;
// console.log(myUserId);
// const topUserPostsRef = query(ref(db, 'users/watched'), orderByChild('vote_average'));
// console.log(topUserPostsRef);




// const dbRef = ref(db);
// function getFilmsForWatchedRender() {
//   get(child(dbRef, `users/queue/`)).then((film) => {
//   if (film.exists()) {
//       console.log(film.val());
//       const topUserPostsRef = query(ref(db, 'users/queue'), orderByChild('vote_average'));
//       console.log(topUserPostsRef);
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });
// }

// getFilmsForWatchedRender(524434);
// ==================Change Buttons Title========================


function getFilmFromFirebase(data) {
    const addToWatchedButton = document.querySelector('#js-WatchedButton');
    const addToQueueButton = document.getElementById('js-QueueButton');
    let watchedKeys = [];
    let queueKeys = [];    
    const getWatchedFilms = ref(db, `users/watched`);
    onValue(getWatchedFilms, (films) => {
        if (films.val()) {
              watchedKeys = Object.keys(films.val());
            if (watchedKeys.includes(String(data.id))) {
                addToWatchedButton.classList.add('active');
                addToWatchedButton.innerHTML = text[locale.lang].removeFromWatched;
            } else {
                addToWatchedButton.innerHTML = text[locale.lang].addToWatched;
            }
            }
        })
        
    const getQueueFilms = ref(db, '/users/queue');
    onValue(getQueueFilms, (films) => {
        if (films.val()) {
              queueKeys = Object.keys(films.val());
                if (queueKeys.includes(String(data.id))) {
                    addToQueueButton.classList.add('active');
                    addToQueueButton.innerHTML = text[locale.lang].removeFromQueue;
                    
                } else {
                    addToQueueButton.innerHTML = text[locale.lang].addToQueue;      
            }
            
            }
            
        })
} 