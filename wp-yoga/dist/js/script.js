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

$('.slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,

}); 

$('.block3__slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    prevArrow: '<button type="button" class="slick-btn slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-btn slick-next"></button>',
    responsive: [
        {
            breakpoint: 1325,
            settings: {
                centerMode: true,
                centerPadding: '10px',
                slidesToShow: 3
                }
        },
        {
            breakpoint: 950,
            settings: {
                centerMode: true,
                centerPadding: '10px',
                slidesToShow: 2
            }
        },
        {
            breakpoint: 640,
            settings: {
                centerMode: true,
                centerPadding: '10px',
                slidesToShow: 1
            }
        },
        {
            breakpoint: 440,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '5px',
                slidesToShow: 1
            }
        }
    ]
}); 


$('.details__video-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    prevArrow: '<button type="button" class="slick-btn slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-btn slick-next"></button>',
    // responsive: [
    //     {
    //         breakpoint: 950,
    //         settings: {
    //             centerMode: true,
    //             centerPadding: '10px',
    //             slidesToShow: 2
    //         }
    //     },
    //     {
    //         breakpoint: 640,
    //         settings: {
    //             centerMode: true,
    //             centerPadding: '10px',
    //             slidesToShow: 1
    //         }
    //     },
    //     {
    //         breakpoint: 440,
    //         settings: {
    //             arrows: false,
    //             centerMode: true,
    //             centerPadding: '5px',
    //             slidesToShow: 1
    //         }
    //     }
    // ]
}); 


// Проверяем, можно ли использовать Webp формат
function canUseWebp() {
    // Создаем элемент canvas
    let elem = document.createElement('canvas');
    // Приводим элемент к булеву типу
    if (!!(elem.getContext && elem.getContext('2d'))) {
        // Создаем изображение в формате webp, возвращаем индекс искомого элемента и сразу же проверяем его
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }
    // Иначе Webp не используем
    return false;
}

window.onload = function () {
    // Получаем все элементы с дата-атрибутом data-bg
    let images = document.querySelectorAll('[data-bg]');
    // Проходимся по каждому
    for (let i = 0; i < images.length; i++) {
        // Получаем значение каждого дата-атрибута
        let image = images[i].getAttribute('data-bg');
        // Каждому найденному элементу задаем свойство background-image с изображение формата jpg
        images[i].style.backgroundImage = 'url(' + image + ')';
    }

    // Проверяем, является ли браузер посетителя сайта Firefox и получаем его версию
    let isitFirefox = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./);
    let firefoxVer = isitFirefox ? parseInt(isitFirefox[1]) : 0;

    // Если есть поддержка Webp или браузер Firefox версии больше или равно 65
    if (canUseWebp() || firefoxVer >= 65) {
        // Делаем все то же самое что и для jpg, но уже для изображений формата Webp
        let imagesWebp = document.querySelectorAll('[data-bg-webp]');
        for (let i = 0; i < imagesWebp.length; i++) {
            let imageWebp = imagesWebp[i].getAttribute('data-bg-webp');
            imagesWebp[i].style.backgroundImage = 'url(' + imageWebp + ')';
        }
    }


    const linkFilter = $('.filter__link');
    
    if (linkFilter.length > 0) {
        for (let i = 0; i < linkFilter.length; i++) {
            const openedFilter = $(linkFilter[i]).hasClass('font-b');
            if (!openedFilter) {
                $(linkFilter[i]).next().addClass('filter-close');
            }
        }
    }
    
    

};
    

new WOW().init();

$('.range__slider').ionRangeSlider({
    type: "double",
    min: 0,
    max: 115,
    from: 15,
    to: 60,
    step: 5,
    hide_min_max: true,
});

$('.burger').on('click', function (e) {
    e.preventDefault();
    $('.burger').toggleClass('burger-active');
    $('.header__menu-list').toggleClass('active-menu');
});




$('.filter__link').on('click', function (e) {
    e.preventDefault();
    //$(this).toggleClass('font-b').next().slideToggle(300);
    const openedFilter = $(this).hasClass('font-b');
    if (openedFilter) {

        $(this).removeClass('font-b').next().slideToggle(300);
    } else {
        $(this).addClass('font-b').next().slideToggle(300);
    }
    
});

$('a.filter__title').on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('filter-open');
    $('.filter__body').toggleClass('filter-open').slideToggle(300);
})


