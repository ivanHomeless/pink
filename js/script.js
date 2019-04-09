var mainNavButton   =   document.querySelector('.main-nav__button');
var pageHeaderTop   =   document.querySelector('.page-header__top');
var mainNavList     =   document.querySelector('.main-nav__list');

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


var sliderToggles   =   document.querySelectorAll('.slider__toggle');
var sliderButtons   =   document.querySelectorAll('.slide-button');
var sliderItems     =   document.querySelectorAll('.slider__item');

for(var i = 0; i < sliderButtons.length; i++) {
    sliderButtons[i].addEventListener('click', function(e) {
        var slidesNumber = this.dataset.slide;
        clearClass(sliderButtons, 'slide-button--acitve');
        clearClass(sliderItems, 'slider__item--active');
        this.classList.add('slide-button--acitve');
        sliderItems[slidesNumber].classList.add('slider__item--active');
    });
}

for(var i = 0; i < sliderToggles.length; i++) {
    sliderToggles[i].addEventListener('click', function(e) {
        var activSlide  =   document.querySelector('.slider__item--active');
        var slideLiist   =   document.querySelector('.slider__list');
        var translate   =   getTranslet(slideLiist);
        var newTranslate = 0;
        console.log(translate);
        if(this.classList.contains('slider__toggle--left')) {
            newTranslate = translate * 1 - 940;
            if(translate <= 0){
                newTranslate = 1880;
            }
        }else {
            newTranslate = translate * 1 + 940;
            if(translate >= 1880) {
                newTranslate = 0;
            }
        }
        slideLiist.style.transform = 'translateX(-' + newTranslate + 'px)';
    });
}

function clearClass (elements, className) {
    for (var i = 0; i < elements.length; i++) {
        if(elements[i].classList.contains(className)){
            elements[i].classList.remove(className);
        }
    }
}

function getTranslet(el) {
    var st = el.style.transform;
    var translate = st.replace(/\D+/g,"");
    return translate;
}