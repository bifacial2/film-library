import Notiflix from 'notiflix';
import { ref, set, child, get } from 'firebase/database';
import { db } from './firebase.functions';
import { onModalInCloseClick, onModalRegCloseClick } from './render-header';
import {
  validation,
  currentUser,
  changeBtnHeader,
  passComplexityIndictor,
  clearLogInput,
  clearRegInput,
} from './layout-reg-auth';

import text from '../partials/dictionary.json';
import { locale } from './localization';

locale.lang = localStorage.getItem('LOCALE') ? localStorage.getItem('LOCALE') : 'en-US';

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
  if (!validation()) {
    return;
  }
  const dbRefReg = ref(db);

  get(child(dbRefReg, 'UsersList/' + name.value)).then(snapshot => {
    if (snapshot.exists()) {
      Notiflix.Notify.failure(text[locale.lang].accountAlreadyExist);
    } else {
      set(ref(db, 'UsersList/' + name.value), {
        name: name.value,
        email: email.value,
        password: encPass(),
      })
        .then(() => {
          Notiflix.Notify.success(text[locale.lang].userAddedSuccesfully);
          clearRegInput();
          onModalRegCloseClick();
        })
        .catch(error => {
          Notiflix.Notify.failure('error' + error);
        });
    }
  });
}

// -----------------ENCRIPTION----------------

function encPass() {
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

  if (logPass.value === '' || logUser.value === '') {
    return Notiflix.Notify.info(text[locale.lang].passwordOrEmailIsEmpty);
  }

  get(child(dbRefLog, 'UsersList/' + logUser.value)).then(snapshot => {
    if (snapshot.exists()) {
      let dbPass = decPass(snapshot.val().password);
      let dbUser = snapshot.val().name;

      if (dbPass === logPass.value && dbUser === logUser.value) {
        Notiflix.Notify.success(text[locale.lang].youAreLoggedIn);
        clearLogInput();
        onModalInCloseClick();
        changeBtnHeader();
        currentUser.textContent = `${dbUser}`;
      } else {
        Notiflix.Notify.failure(text[locale.lang].userDoesNotExist);
      }
    } else {
      Notiflix.Notify.failure(text[locale.lang].emailOrPasswordIsInvalid);
    }
  });
}

// -----------------DECRIPTION----------------

function decPass(dbPass) {
  let pass13 = CryptoJS.AES.decrypt(dbPass, logPass.value);
  return pass13.toString(CryptoJS.enc.Utf8);
}

// -----------------LOGIN EVENT----------------

logBtn.addEventListener('click', authenticateUsers);
