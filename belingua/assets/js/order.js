const stepSlider = new Swiper('.step__content', {
    direction: 'horizontal',
    containerModifierClass: 'step__content',
    wrapperClass: 'step__wrapper',
    slideClass: 'step__item',
    slidesPerView: 1,
    allowTouchMove: false,
    on: {
        slideChangeTransitionStart: function (){
            $('.swiper-slide-active').find('.form-step__tab').first().click()
        }
    },
    hashNavigation: {
        replaceState: true,
        watchState: true,
    },
})
const tabs = $('.form-step__tab')
const content = $('.form-step__content')

$('.step-element__btn > .next').on('click', function () {
    stepSlider.slideNext()
    $('html, body').animate({scrollTop: 0},500);
})

$('.step-element__btn > .prev').on('click', function () {
    stepSlider.slidePrev()
    $('html, body').animate({scrollTop: 0},500);
})

tabs.on('click', toggleTab)

function toggleTab() {
    tabs.removeClass('active')
    $(this).addClass('active')
    let contentIdx = content[tabs.index(this)]
    content.hide()
    $(contentIdx).show()
}

$('.time-group > input').on('input', function (){
    $(this).val($(this).val().replace(/[^\d]/g, ''))
})
