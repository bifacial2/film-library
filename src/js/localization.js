//https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
// 'ru-RU'  'uk-UA'

import { createData } from './render-films';
import './render-films';
import { textContent } from './dictionary';
import text from '../partials/dictionary.json';
export const locale = {
  lang: 'en-EN',
};

let currentLanguage;
let page = 1;
let totalPages = 0;

export const getcurrentLanguage = () => {
  return currentLanguage;
};

const refs = {
  //Мои кнопочки переключения языка
  localizationForm: document.querySelector('.header-localization'),
  localeEn: document.querySelector('.header-localization__english'),
  localeRu: document.querySelector('.header-localization__russian'),
  localeUa: document.querySelector('.header-localization__ukrainian'),
};

const chooseLocaleHandler = event => {
  //Слушатель события нажатия на кнопке смены языка
  if (event.target === refs.localeEn) {
    currentLanguage = 'en-US';
  } else if (event.target === refs.localeRu) {
    currentLanguage = 'ru-RU';
  } else if (event.target === refs.localeUa) {
    currentLanguage = 'uk-UA';
  } else return;
  locale.lang = currentLanguage;
  //Записываю параметр локали в локальное хранилище для того, чтобы у пользователя не сбивались настройки языка
  localStorage.setItem('LOCALE', currentLanguage);
  createData({ page, totalPages });
};
refs.localizationForm.addEventListener('click', chooseLocaleHandler);

//Локализация из словаря
document.addEventListener('DOMContentLoaded', () => {
  document
    // Find all elements that have the key attribute
    .querySelectorAll('[data-locale]')
    .forEach(translateElement);
});
// Replace the inner text of the given HTML element
// with the translation in the active locale,
// corresponding to the element's data-i18n-key
function translateElement(element) {
  const key = element.getAttribute('data-locale');
  const translation = text[locale.lang][key];
  element.innerText = translation;
}
