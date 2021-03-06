function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    
    testWebP(function (support) {
    
    if (support == true) {
    document.querySelector('body').classList.add('webp');
    }
    });

$('.clients__slider').slick({
    prevArrow: '<button type="button" class="slick-btn slick-prev"><img src="img/arrow-left.svg"></button>',
    nextArrow: '<button type="button" class="slick-btn slick-next"><img src="img/arrow-right.svg"></button>',
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {

                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            }
            
    ]
});



$('.faq__item-title').click(function () {

    $(this).parent().find('.faq__item-title').toggleClass('closed');
    $(this).parent().find('.faq__item-text').toggleClass('hide');

});

$('.burger').click(function () {
    $('.burger').toggleClass('burger-active');
    $('.menu__list').toggleClass('menu-open');
})

