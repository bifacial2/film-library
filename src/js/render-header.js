
const refs = {
    header: document.querySelector('header'),
// Autorithazation
    signInBtns: document.querySelectorAll('[data-name="signIn"]'),
    signUpBtns: document.querySelectorAll('[data-name="signUp"]'),
// Sign In form
    modalIn: document.querySelector('[data-modal="auth-in"]'),
    modalReg: document.querySelector('[data-modal="auth-reg"]'),
    modalInClose: document.querySelector('.modal-close'),
    modalRegClose: document.querySelector('[data-regFormClose]'),
    
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

    body: document.body,

};

const headerContent = refs.contentBox.childNodes;

addEventListenerForArray(refs.signInBtns,'click', onSignInBtnClick);
addEventListenerForArray(refs.signUpBtns,'click', onSignUpBtnClick);
refs.modalInClose.addEventListener('click', onModalInCloseClick);
refs.modalRegClose.addEventListener('click', onModalRegCloseClick);



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

function addEventListenerForArray(array, event, func) {
    // array.map(element => element.addEventListener(event, func));
    for (let i = 0; i < array.length; i += 1) {
        array[i].addEventListener(event, func);
    };
}

function removeClassList(element, classList) {
    element.classList.remove(classList);
};

function addClassList(element, classList) {
    element.classList.add(classList);
};

function onSignInBtnClick(event) {
    event.preventDefault();

    refs.body.classList.add('no-scroll');

    addClassList(refs.modalReg, 'is-hidden');
    removeClassList(refs.modalIn, 'is-hidden');

    closeModal(refs.modalIn);
};

function onSignUpBtnClick(event) {
    event.preventDefault();

    refs.body.classList.add('no-scroll');

    addClassList(refs.modalIn, 'is-hidden');
    removeClassList(refs.modalReg, 'is-hidden');

    closeModal(refs.modalReg);
};

function onModalInCloseClick(event) {
    // addClassList(refs.modalIn, 'is-hidden');

}

function onModalRegCloseClick() {
    // addClassList(refs.modalReg, 'is-hidden');

};

function closeModal(elementName) {

    const element = elementName;
    
    document.addEventListener('click', onClickEvent);

    function onClickEvent(event) {
        console.log(event, 'document click')

        if (console.log('work')) { };

        // ! Огромный костыль, пока не знаю как решить
        if (event.path[0] === element
            || event.path[0] === refs.modalInClose
            || event.path[1] === refs.modalInClose
            || event.path[2] === refs.modalInClose
                || event.path[0] === refs.modalRegClose
                || event.path[1] === refs.modalRegClose
                || event.path[2] === refs.modalRegClose) {
            addClassList(element, 'is-hidden');
            document.removeEventListener('click', onClickEvent);
            document.removeEventListener('keydown', onEscPress);
            refs.body.classList.remove('no-scroll');
        }
    }

    document.addEventListener('keydown', onEscPress);

    function onEscPress(e) {
        console.log('key press');

        if (e.keyCode == 27) {
            addClassList(element, 'is-hidden');
            document.removeEventListener('click', onClickEvent);
            document.removeEventListener('keydown', onEscPress);
            refs.body.classList.remove('no-scroll');
        }

    }
    
};




