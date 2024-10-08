const siteHeader = document.getElementById('header');

function scrollHeaderStyle() {
    if (window.scrollY > 50) {
        siteHeader.classList.add('backdrop-blur-lg', 'bg-white', 'pb-10')
    } else {
        siteHeader.classList.remove('backdrop-blur-lg', 'bg-white', 'pb-10')
    };
}

window.addEventListener('scroll', scrollHeaderStyle);