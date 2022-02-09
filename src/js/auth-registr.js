import Notiflix from 'notiflix';
import { ref, set, child, get } from "firebase/database";
import {db} from "./firebase.functions";
import {onModalInCloseClick, onModalRegCloseClick} from './render-header';
import {validation, currentUser, changeBtnHeader, passComplexityIndictor, clearLogInput, clearRegInput} from './layout-reg-auth';

Notiflix.Notify.init({
    width: '280px',
    position: 'center-top',
    distance: '10px',
    opacity: 1,
  });
// -------------------REFERENCE--------------

export const name = document.getElementById('reg-name');
export const email = document.getElementById('reg-email');
export const pass = document.getElementById('reg-pwd');
export const passRep = document.getElementById('reg-repeat-pwd');
export const registBtn = document.getElementById('form-btn__reg');
export const logUser = document.getElementById('signin-email');
export const logPass = document.getElementById('signin-pwd');
export const logBtn = document.getElementById('form-btn__log');


// -----------------REGISTER USER TO FIREBASE----------------

function registerUser(e) {
    e.preventDefault();
    if(!validation()) {
        return;
    };
    const dbRefReg = ref(db);

    get(child(dbRefReg, "UsersList/"+ name.value)).then((snapshot) => {
        
        if(snapshot.exists()) {
            Notiflix.Notify.failure("account already exist!");
        }

        else {
            set(ref(db, "UsersList/"+ name.value),
            {
                name: name.value,
                email: email.value,
                password: encPass(),
            })
            .then(() => {
                Notiflix.Notify.success("user added successfully");
                clearRegInput();
                onModalRegCloseClick();
            })
            .catch((error) => {
                Notiflix.Notify.failure("error" + error);
            })
        }
    });
}

// -----------------ENCRIPTION----------------

function encPass(){
    let pass12 = CryptoJS.AES.encrypt(pass.value, pass.value);
    return pass12.toString();
}

// -----------------ASSIGN THE EVENTS----------------

registBtn.addEventListener('click', registerUser); 
pass.addEventListener('input', passComplexityIndictor);

// -----------------AUTHENTICATION PROCESS----------------


function authenticateUsers(e) {
    e.preventDefault();
    const dbRefLog = ref(db);
    let regexName = /^[a-zA-Z0-9]{5,}$/;

    if(logPass.value === '' || logUser.value === '') {
        return Notiflix.Notify.info('password or email not entered');
    }
    if(!regexName.test(logUser.value)) {
        return Notiflix.Notify.info("-username name can only be alphanumeric\n-username must be aleast must be 5 charaters\n-username cannot contain spaces");
    }

    get(child(dbRefLog, "UsersList/"+ logUser.value)).then((snapshot) => {
        
        if(snapshot.exists()) {
            let dbPass = decPass(snapshot.val().password);
            let dbUser = snapshot.val().name;
            
            if(dbPass === logPass.value && dbUser === logUser.value) {
                Notiflix.Notify.success('you are logged in');
                clearLogInput();
                onModalInCloseClick();
                changeBtnHeader();
                currentUser.textContent =`${dbUser}`;
                logInUser(snapshot.val());
            }
            else {
                Notiflix.Notify.failure('user does not exist');
            }
        }
        else {
            Notiflix.Notify.failure('email or password is invalid');
        }
    });
    
}

// -----------------DECRIPTION----------------

function decPass(dbPass){
    let pass13 = CryptoJS.AES.decrypt(dbPass, logPass.value);
    return pass13.toString(CryptoJS.enc.Utf8);
}

// -----------------LOGIN EVENT----------------

logBtn.addEventListener('click', authenticateUsers); 

function logInUser(user) {
    let keepLogIn = document.getElementById('checkbox').checked;

    if(!keepLogIn) {
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    else {
        localStorage.setItem('keepLogIn', 'yes');
        localStorage.setItem('user', JSON.stringify(user));
    }
}

function getUsername() {
    let onlineUser = null;
    let getItemLogIn = localStorage.getItem('keepLogIn');

    if(getItemLogIn === 'yes') {
        onlineUser = JSON.parse(localStorage.getItem('user'));
        currentUser.textContent =`${onlineUser.name}`;
        changeBtnHeader();
    }

    else {
        onlineUser = JSON.parse(sessionStorage.getItem('user'));
    }
}

export function verifyLocalStorage() {
    if(localStorage.getItem('keepLogIn') === null) {
        return hiddenCardBtns.style.visibility = 'hidden';
      }
}

// -----------------SIGN OUT EVENT----------------


window.onload = function() {
    getUsername();
}