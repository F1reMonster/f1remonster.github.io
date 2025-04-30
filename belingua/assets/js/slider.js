let tick
const sliderInfo = new Swiper('.slider__info', {
    direction: 'vertical',
    containerModifierClass: 'slider__info',
    wrapperClass: 'info-wrapper',
    slideClass: 'slider__info_item',
    slidesPerView: 3,
    slideToClickedSlide: true,
    spaceBetween: 32,
    allowTouchMove: false,
});

const sliderContent = new Swiper('.slider__content', {
    direction: 'horizontal',
    containerModifierClass: 'slider__content',
    wrapperClass: 'content-wrapper',
    slideClass: 'slider__content_item',
    slidesPerView: 1,
    loop: true,
    autoHeight: true,
    thumbs: {
        swiper: sliderInfo,
        slideThumbActiveClass: 'active'
    },
    grabCursor: true,
    on: {
        slideChangeTransitionStart: function () {
            let activeElem = this.thumbs.swiper.el
            timerSlider(activeElem)
        }
    }
});
const sliderGallery = new Swiper('.portfolio-gallery', {
    direction: 'horizontal',
    slideClass: 'gallery_slide',
    spaceBetween: 8,
    slidesPerView: 'auto',
    loop: false,
    freeMode: true,
    grabCursor: true,
    navigation: {
        nextEl: '.gallery-button-next',
        prevEl: '.gallery-button-prev',
    },

});

function timerSlider(elem) {
    let progress = elem.querySelector('.slider__info_item.active .slider__progress')
    let time = .1;
    let percentTime = 0
    elem.querySelectorAll('.slider__progress').forEach(item => item.style.height = "")
    clearInterval(tick)
    tick = setInterval(() => {
        if (percentTime <= 100) {
            progress ? progress.style.height = percentTime + '%' : ''
            percentTime += 1 / (time + 5);
        } else {
            percentTime = 0
            clearInterval(tick)
            progress ? progress.style.height = 0 + '%' : ''
            sliderContent.slideNext()
        }
    }, 10);
}
