var mainNavButton = document.querySelector('.main-nav__button');
var pageHeaderTop = document.querySelector('.page-header__top');
var mainNavList = document.querySelector('.main-nav__list');

mainNavButton.addEventListener("click", function (e) {

    if(mainNavButton.classList.contains('main-nav__button--close')) {
        mainNavButton.classList.remove('main-nav__button--close');
        pageHeaderTop.classList.remove('page-header__top--menu-active');
        mainNavList.classList.remove('main-nav__list--menu-active');
    }else {
        mainNavButton.classList.add('main-nav__button--close');
        pageHeaderTop.classList.add('page-header__top--menu-active');
        mainNavList.classList.add('main-nav__list--menu-active');
    }
});
window.addEventListener('resize', function(){
    if(mainNavButton.classList.contains('main-nav__button--close')) {
        mainNavButton.classList.remove('main-nav__button--close');
        pageHeaderTop.classList.remove('page-header__top--menu-active');
        mainNavList.classList.remove('main-nav__list--menu-active');
    }
});