function theme() {
    const toggleTheme = document.querySelector('.toggle-theme')
    console.log(toggleTheme)
    let el = document.documentElement;
    console.log(el)

    toggleTheme.addEventListener('click', () => {  
        if (el.hasAttribute('data-theme')) {
            el.removeAttribute('data-theme')  
            localStorage.removeItem('theme')
        } else {
            el.setAttribute('data-theme', 'dark')
            localStorage.setItem('theme', 'dark')
        }
    })

    if (localStorage.getItem('theme') !== null) {
         el.setAttribute('data-theme', 'dark')
    }
}
// theme()

// New script created to work with toggle switch ==============

 const checkbox = document.querySelector('input[type="checkbox"]');
    
    let el = document.documentElement;

document.addEventListener('DOMContentLoaded', function () {

  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
        el.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');

        console.log('Checked');
        
    } else {
        console.log('Not checked');

        el.removeAttribute('data-theme');
        localStorage.removeItem('theme');
    }

  });
});

 if (localStorage.getItem('theme') !== null) {
         el.setAttribute('data-theme', 'dark')
         console.log('нужно задать темную тему')
        checkbox.checked = true;
    };