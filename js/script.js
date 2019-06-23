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

if(sliderItems.length) {

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


var tariffButton = document.querySelectorAll('.tariff-button');
var tariffTable = document.querySelector('.tariff__list');

for (var i = tariffButton.length - 1; i >= 0; i--) {
    tariffButton[i].addEventListener('click', function(e) {
        var indexButton = this.dataset.slide;
        clearClass (tariffButton, 'tariff-button--acitve');
        this.classList.add('tariff-button--acitve');
        if(tariffTable.classList.contains('tariff__list--center')) {
            tariffTable.classList.remove('tariff__list--center');
        }
        if(tariffTable.classList.contains('tariff__list--left')) {
            tariffTable.classList.remove('tariff__list--left');
        }
        if(tariffTable.classList.contains('tariff__list--right')) {
            tariffTable.classList.remove('tariff__list--right');
        }

        var classTable = 'tariff__list--center';

        if(indexButton == 0) {classTable = 'tariff__list--left';}
        if(indexButton == 1) {classTable = 'tariff__list--center';}
        if(indexButton == 2) {classTable = 'tariff__list--right';}

        tariffTable.classList.add(classTable);
    });
}


let submitBtn = document.querySelector(".main-form__button--submit");
let closeBtn = document.querySelectorAll(".main-form__button--close");

if(submitBtn) {
    for (i = 0; i < closeBtn.length; i++) {
        closeBtn[i].addEventListener("click", function (e) {
            e.preventDefault();
            let sowPopup = document.querySelector(".form-popup--show");
            if(sowPopup) {
                sowPopup.classList.remove("form-popup--show");
            }
        });
    }

    submitBtn.addEventListener("click", function (e) {
        e.preventDefault();
        let random = Math.floor( Math.random() * 10);
        let classPopup = ".form-popup--success";

        if(random > 7) {
            classPopup = ".form-popup--failure";
        }

        let popup = document.querySelector(classPopup);

        if(!popup.classList.contains("form-popup--show")) {
            popup.classList.add("form-popup--show");
        }

    });
}

let photoControlBtn = document.querySelectorAll(".photo-control__btn");

if(photoControlBtn.length) {
    photoControlBtn.forEach(function(el, i) {
        el.addEventListener("click", function (e) {
            if(!el.classList.contains("photo-control__btn--active")){
                photoControlBtn.forEach(function(e) {
                    e.classList.remove("photo-control__btn--active");
                });
                el.classList.add("photo-control__btn--active");
                let photoControlWrapper = document.querySelectorAll(".photo-control__wrapper");
                photoControlWrapper.forEach(function(elem, k) {
                    if(k == i) {
                        elem.classList.add("photo-control__wrapper--active");
                    }else {
                        elem.classList.remove("photo-control__wrapper--active");
                    }
                });
            }
        });
    });
}


let photoControlSlideBtn = document.querySelectorAll(".photo-control__slide-btn");

if(photoControlSlideBtn.length) {
    photoControlSlideBtn.forEach(function(el, i) {
        el.onmousedown = function  (e) {
            document.onmousemove = function (e) {
                move(e, el);
            }
            document.onmouseup = function(e) {
                document.onmousemove = null;
            }
        }
        el.ontouchstart  = function  (e) {
            document.ontouchmove = function (e) {
                move(e, el);
            }
            document.ontouchend = function(e) {
                document.ontouchmove = null;
            }
        }
    });
}

function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}

function move(e, el) {
    let sledeBar = el.parentNode;
    let coordsBar = getCoords(sledeBar);
    let barLeft = Math.round(coordsBar.left);
    let min = 0;
    let max = sledeBar.offsetWidth - 14;
    let left = Math.round(e.pageX - barLeft);

    if(e.touches[0].pageX) {
        left = Math.round(e.touches[0].pageX - barLeft);
    }

    if(left < 0 ) {
        left = min;
    }
    if(left > max) {
        left = max;
    }
    el.style.left = left + "px";
}