
$(".slider").slick({
    dots: true,
    dotsClass: 'slider__dots',
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: '<button type="button" class="slider__btn prev"><svg><use xlink:href="img/sprite.svg#slider-prev-arrow"></use></svg></button>',
    nextArrow: '<button type="button" class="slider__btn next"><svg><use xlink:href="img/sprite.svg#slider-next-arrow"></use></svg></button>',
});
    

const tabs = $('.main__tab-item');
const tabsContent = $('.main__tab-content');
const tabsSlider = $('.main__slider-hits, .main__slider-action, .main__slider-newest');


tabs.on('click', function(){
    let tabName = $(this).attr('data-tab');

    tabsSlider.slick('refresh');

    tabs.removeClass('active');
    tabsContent.removeClass('active');

    $(this).addClass('active');
    $("#"+tabName).addClass('active');
});

tabsSlider.slick({
    infinite: false,
    slidesToScroll: 1,
    slidesToShow: 5,
    
    prevArrow: '<button type="button" class="slider__btn prev tab"><svg><use xlink:href="img/sprite.svg#slider-prev-arrow"></use></svg></button>',
    nextArrow: '<button type="button" class="slider__btn next tab"><svg><use xlink:href="img/sprite.svg#slider-next-arrow"></use></svg></button>',
    responsive: [
        {
            breakpoint: 1368,
            settings: {
                slidesToScroll: 1,
                slidesToShow: 4,
            }
        },
        {
            breakpoint: 1100,
            settings: {
                slidesToScroll: 1,
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 865,
            settings: {
                slidesToScroll: 1,
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 710,
            settings: {
                dots: true,
                dotsClass: 'slider__dots',
                slidesToScroll: 1,
                slidesToShow: 5,
            }
        },
        {
            breakpoint: 610,
            settings: {
                dots: true,
                dotsClass: 'slider__dots',
                slidesToScroll: 1,
                slidesToShow: 4,
            }
        },
        {
            breakpoint: 515,
            settings: {
                dots: true,
                dotsClass: 'slider__dots',
                slidesToScroll: 1,
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 374,
            settings: {
                dots: true,
                dotsClass: 'slider__dots',
                slidesToScroll: 1,
                slidesToShow: 2,
            }
        }

    ]
});
