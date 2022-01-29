
const refs = {
    header: document.querySelector('header'),
    libraryButtons: document.querySelector('.library-buttons'),
    homeButton: document.querySelector('[data-name="home"]'),
    libraryButton: document.querySelector('[data-name="myLibrary"]'),
    navButtons: document.querySelectorAll('.nav-button'),
    searchForm: document.querySelector('.search-form'),
    formWrapper: document.querySelector('.form-wrapper'),
    navList: document.querySelector('#js-nav'),
    contentBox: document.querySelector('.js-content-box'),
    

};

console.log(refs.header);

const headerContent = refs.contentBox.childNodes;


refs.homeButton.addEventListener('click', onHomeButtonClick);
refs.libraryButton.addEventListener('click', onLibraryButtonClick);

function onHomeButtonClick(event) {

    removeClassListFromAll(refs.navButtons, "current-page");
    addClassList(refs.homeButton, "current-page");
   
    addClassListForAll(headerContent, 'is-hidden');
    removeClassList(refs.formWrapper, 'is-hidden');

};

function onLibraryButtonClick(event) {

    removeClassListFromAll(refs.navButtons, "current-page");
    addClassList(refs.libraryButton, "current-page");

    addClassListForAll(headerContent, 'is-hidden');
    removeClassList(refs.libraryButtons, 'is-hidden');

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





