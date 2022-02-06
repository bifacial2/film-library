export const spinner = document.querySelector('.spinner');


// console.log(spinner);
export function addLoader() {
    
    spinner.classList.add('visible');
    spinner.classList.remove('invisible');
}

export function removeLoader() {
    spinner.classList.add('invisible');
    spinner.classList.remove('visible');
}