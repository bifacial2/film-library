import Notiflix from 'notiflix';
import { pass, logUser, logPass, passRep, name, email } from './auth-registr';

import text from '../partials/dictionary.json';
import { locale } from './localization';

locale.lang = localStorage.getItem('LOCALE') ? localStorage.getItem('LOCALE') : 'en-US';

// -----------------VALIDATION----------------

function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

export function validation() {
  let nameregex = /^[a-zA-Z0-9]{5,}$/;
  let emailregex = /^[a-zA-Z0-9.]+@(gmail|yahoo|outlook)\.com$/;

  if (isEmptyOrSpaces(name.value) || isEmptyOrSpaces(email.value) || isEmptyOrSpaces(pass.value)) {
    Notiflix.Notify.info(text[locale.lang].YouCanntLeftFieldsEmpty);
    return false;
  }

  if (!nameregex.test(name.value)) {
    Notiflix.Notify.info(
      '-username name can only be alphanumeric\n-username must be aleast must be 5 charaters\n-username cannot contain spaces',
    );
    return false;
  }

  if (!emailregex.test(email.value)) {
    Notiflix.Notify.info('enter a valid email!');
    return false;
  }

  if (passRep.value !== pass.value) {
    Notiflix.Notify.info('passwords are different!');
    return false;
  }
  return true;
}

// -----------------PASSWORD COMPLEXITY INDICATOR----------------

export function passComplexityIndictor() {
  let s_letters = 'qwertyuiopasdfghjklzxcvbnm';
  let b_letters = 'QWERTYUIOPLKJHGFDSAZXCVBNM';
  let digits = '0123456789';
  let specials = '!@#$%^&*()_-+=|/.,:;[]{}';

  let input_test = document.getElementById('reg-pwd');
  let block_check = document.getElementById('block_check');

  input_test.addEventListener('keyup', function (evt) {
    let input_test_val = input_test.value;

    let is_s = false;
    let is_b = false;
    let is_d = false;
    let is_sp = false;

    for (var i = 0; i < input_test_val.length; i++) {
      if (!is_s && s_letters.indexOf(input_test_val[i]) != -1) {
        is_s = true;
      } else if (!is_b && b_letters.indexOf(input_test_val[i]) != -1) {
        is_b = true;
      } else if (!is_d && digits.indexOf(input_test_val[i]) != -1) {
        is_d = true;
      } else if (!is_sp && specials.indexOf(input_test_val[i]) != -1) {
        is_sp = true;
      }
    }

    let rating = 0;
    if (is_s) rating++;
    if (is_b) rating++;
    if (is_d) rating++;
    if (is_sp) rating++;

    if (input_test_val.length < 6 && rating < 3) {
      block_check.style.width = '10%';
      block_check.style.backgroundColor = '#e7140d';
    } else if (input_test_val.length < 6 && rating >= 3) {
      block_check.style.width = '50%';
      block_check.style.backgroundColor = '#ffdb00';
    } else if (input_test_val.length >= 8 && rating < 3) {
      block_check.style.width = '50%';
      block_check.style.backgroundColor = '#ffdb00';
    } else if (input_test_val.length >= 8 && rating >= 3) {
      block_check.style.width = '100%';
      block_check.style.backgroundColor = '#61ac27';
    } else if (input_test_val.length >= 6 && rating == 1) {
      block_check.style.width = '10%';
      block_check.style.backgroundColor = '#e7140d';
    } else if (input_test_val.length >= 6 && rating > 1 && rating < 4) {
      block_check.style.width = '50%';
      block_check.style.backgroundColor = '#ffdb00';
    } else if (input_test_val.length >= 6 && rating == 4) {
      block_check.style.width = '100%';
      block_check.style.backgroundColor = '#61ac27';
    }
  });
}

// -----------------HIDDEN BUTTONS----------------

const homeLibraryBtn = document.getElementById('js-nav');
homeLibraryBtn.style.visibility = 'hidden';

let delSignInBtn = document.querySelector('.del-btn__signin');
let delSignUpBtn = document.querySelector('.del-btn__signup');
export let currentUser = document.querySelector('.current-user');
let signOutBtn = document.querySelector('.sign-out-btn');

currentUser.style.display = 'none';
signOutBtn.style.display = 'none';

export function changeBtnHeader() {
  homeLibraryBtn.style.visibility = 'visible';
  delSignInBtn.style.display = 'none';
  delSignUpBtn.style.display = 'none';
  currentUser.style.display = 'block';
  signOutBtn.style.display = 'block';
}

signOutBtn.addEventListener('click', signOut);

function signOut() {
    homeLibraryBtn.style.visibility = 'hidden';
    delSignInBtn.style.display = 'block';
    delSignUpBtn.style.display = 'block';
    currentUser.style.display = 'none';
    signOutBtn.style.display = 'none';
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
    localStorage.removeItem('keepLogIn');

  Notiflix.Notify.info('you are logged out');
}

// -----------------CLEAR LOG/REG INPUT----------------

export function clearLogInput() {
  logUser.value = '';
  logPass.value = '';
}

export function clearRegInput() {
  name.value = '';
  email.value = '';
  pass.value = '';
  passRep.value = '';
}
