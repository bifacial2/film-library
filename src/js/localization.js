//https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
// 'ru-RU'  'uk-UA'

import { createData } from './render-films';
import './render-films';
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
  } else {
    currentLanguage = 'uk-UA';
  }
  locale.lang = currentLanguage;
  createData({ page, totalPages });
};
refs.localizationForm.addEventListener('click', chooseLocaleHandler);

//Наши ключевые слова для локализации
const textValue = {
  en: {
    home: 'Home',
    myLibrary: 'My Library',
    saerchingPlaceHolder: 'Movie Search...',
    watch: 'Watch',
    queue: 'Queue',
    rights: '© 2022 | All Rights Reserved | Developed with',
    by: 'by',
    ourTeam: 'GoIT Students',
    lastPageMessage: "We're sorry, but you've reached the end of search results.",
  },
  ru: {},
  ua: {},
};
