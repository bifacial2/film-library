import { initializeApp } from 'firebase/app';
import { getDatabase, ref, remove, set, onValue, child, get, query, orderByChild } from "firebase/database";

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
        // console.log(key); 
    }   
})
} 




// const dbRef = ref(db);
// function getFilmsForWatchedRender(userId) {
//   get(child(dbRef, `users/queue/${userId}`)).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });  
// }

// getFilmsForWatchedRender(524434);
// ==================Change Buttons Title========================


export function getFilmFromFirebase(data) {
    const addToWatchedButton = document.querySelector('#js-WatchedButton');
    const addToQueueButton = document.getElementById('js-QueueButton');
    let watchedKeys = [];
    let queueKeys = [];    
    const getWatchedFilms = ref(db, `users/watched`);
        onValue(getWatchedFilms, (films) => {
            watchedKeys = Object.keys(films.val());
            if (watchedKeys.includes(String(data.id))) {
                addToWatchedButton.classList.add('active');
                addToWatchedButton.innerHTML = 'Remove from watched';
                // console.log("yes watched");
            }
        })
        
    const getQueueFilms = ref(db, '/users/queue');
        onValue(getQueueFilms, (films) => {
            queueKeys = Object.keys(films.val());
            if (queueKeys.includes(String(data.id))) {
                addToQueueButton.classList.add('active');
                addToQueueButton.innerHTML = 'Remove from queue';
                // console.log("yes queue");
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
