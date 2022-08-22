import './render-films';
import text from '../partials/dictionary.json';

///////////////////////////////////////////////////////
/////Задаю по умолчанию язык
export const locale = {
  lang: 'en-US',
};

////////////////////////////////////////////////////////////////
let currentLanguage;

export const getcurrentLanguage = () => {
  return currentLanguage;
};

const refs = {
  //Мои кнопочки переключения языка
  localizationForm: document.querySelector('.header-localization'),
  localeEn: document.querySelector('.header-localization__english'),
  localeRu: document.querySelector('.header-localization__russian'),
  localeUa: document.querySelector('.header-localization__ukrainian'),
  //Placeholder  нашего сайта
  placeholderLabel: document.querySelector('.search-form__input'),
  placeholderSignInPassword: document.querySelector('.signin-input__psw'),
  placeholderRegistrationName: document.querySelector('.reg-input__email'),
  placeholderRegistrationEmail: document.querySelectorAll('.reg-input__email')[1],
  placeholderRegistrationCreatePassord: document.querySelector('.reg-input__psw'),
  placeholderRegistrationRepeatPassord: document.querySelectorAll('.reg-input__psw')[1],
  xxx: document.querySelector('.sort-form__select__title'),
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
  localStorage.setItem('LOCALE', locale.lang);
  location.reload();
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
export function translateElement(element) {
  const key = element.getAttribute('data-locale');
  const translation = text[locale.lang][key];

  element.innerText = translation;
  refs.placeholderLabel.setAttribute('placeholder', text[locale.lang].searchingPlaceHolder);
  refs.placeholderSignInPassword.setAttribute('placeholder', text[locale.lang].password);
  refs.placeholderRegistrationName.setAttribute('placeholder', text[locale.lang].enterName);
  refs.placeholderRegistrationEmail.setAttribute('placeholder', text[locale.lang].enterEmail);
  refs.placeholderRegistrationCreatePassord.setAttribute(
    'placeholder',
    text[locale.lang].createPassword,
  );
  refs.placeholderRegistrationRepeatPassord.setAttribute(
    'placeholder',
    text[locale.lang].repeatPassword,
  );
}
