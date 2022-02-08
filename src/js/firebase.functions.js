import { initializeApp } from 'firebase/app';
import { getDatabase, ref, remove, set, onValue, child, get, query, orderByChild } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyDgBm2k5y_4SyLWQOsTxh9eRMzn9ICjP-4",
  authDomain: "filmoteka-522c4.firebaseapp.com",
  databaseURL: "https://filmoteka-522c4-default-rtdb.firebaseio.com",
  projectId: "filmoteka-522c4",
  storageBucket: "filmoteka-522c4.appspot.com",
  messagingSenderId: "252879014461",
  appId: "1:252879014461:web:c1616f0e2250b40cdcb854"

};

// ===============Initialize Firebase
const app = initializeApp(firebaseConfig);

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

// ============Delete Film=================

export function deleteFilmFromWatched(id) {
    const getChosenFilm = ref(db, `users/watched/${id}`);
    remove(getChosenFilm, (film) => {
    const data = film.val();
});
}

export function deleteFilmFromQueue(id) {
  const getChosenFilm = ref(db, `users/queue/${id}`);
    remove(getChosenFilm, (film) => {
    const data = film.val();
});  
}

// ============Get Films For Render=================

function getFilmForWatchedRender() {
    const getWatchedFilms = ref(db, `users/watched`);
onValue(getWatchedFilms, (films) => {
    const data = films.val();
    // console.log(data);
    for (const key in data) {
        console.log(key); 
    }   
})
} 


// ==================Change Buttons Title========================


export function getFilmFromFirebase(data) {
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
                addToWatchedButton.innerHTML = 'Remove from watched';
            }  
            }
        })
        
    const getQueueFilms = ref(db, '/users/queue');
    onValue(getQueueFilms, (films) => {
        if (films.val()) {
              queueKeys = Object.keys(films.val());
                if (queueKeys.includes(String(data.id))) {
                    addToQueueButton.classList.add('active');
                    addToQueueButton.innerHTML = 'Remove from queue';
                }  
            }
            
        })
} 



// const dbRef = ref(db, 'user/watched/id');

// onValue(dbRef, (film) => {
//   film.forEach((filmId) => {
//     const childKey = filmId.key;
//       const childData = filmId.val();
//       console.log(childData);
    
//   });
// });