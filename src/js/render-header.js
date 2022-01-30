
const refs = {
    header: document.querySelector('header'),
// Autorithazation
    signInBtn: document.querySelector('[data-name="signIn"]'),
    signUpBtn: document.querySelector('[data-name="signUp"]'),
// Sign In form
    modal: document.querySelector('[data-modal="auth"]'),
    modalClose: document.querySelector('.modal-close'),
// Navigation
    navList: document.querySelector('#js-nav'),
    navButtons: document.querySelectorAll('.js-nav-btn'),
    homeButton: document.querySelector('[data-name="home"]'),
    libraryButton: document.querySelector('[data-name="myLibrary"]'),
// Area for dynamicly changing content 
    contentBox: document.querySelector('.js-content-box'),
// Search form
    searchForm: document.querySelector('form[name="search-form"]'),
    formWrapper: document.querySelector('.search-form__wrapper'),
// Library buttons - Watched and Queue
    libraryButtons: document.querySelector('.js-library-btns'),

};

const headerContent = refs.contentBox.childNodes;

refs.signInBtn.addEventListener('click', onSignInBtnClick);
refs.modalClose.addEventListener('click', onModalCloseClick);

refs.homeButton.addEventListener('click', onHomeButtonClick);
refs.libraryButton.addEventListener('click', onLibraryButtonClick);

function onHomeButtonClick(event) {

    removeClassListFromAll(refs.navButtons, "current-page");
    addClassList(refs.homeButton, "current-page");
   
    addClassListForAll(headerContent, 'is-hidden');
    removeClassList(refs.formWrapper, 'is-hidden');

    removeClassList(refs.header, 'header-library');
    addClassList(refs.header, 'header-home');

};

function onLibraryButtonClick(event) {

    removeClassListFromAll(refs.navButtons, "current-page");
    addClassList(refs.libraryButton, "current-page");

    addClassListForAll(headerContent, 'is-hidden');
    removeClassList(refs.libraryButtons, 'is-hidden');

    removeClassList(refs.header, 'header-home');
    addClassList(refs.header, 'header-library');

};

function removeClassListFromAll(array, className) {
    for (let i = 0; i < array.length; i += 1) {
        array[i].classList.remove(className);
    }
};

function addClassListForAll(array, className) {
    for (let i = 0; i < array.length; i += 1) {

        if (array[i].nodeType !== 1) {
            
        } else {
            array[i].classList.add(className);
        }
    }
};

function removeClassList(element, classList) {
    element.classList.remove(classList);
}

function addClassList(element, classList) {
    element.classList.add(classList);
}

function onSignInBtnClick(event) {
    removeClassList(refs.modal, 'is-hidden');
};

function onModalCloseClick(event) {
    addClassList(refs.modal, 'is-hidden');
}





