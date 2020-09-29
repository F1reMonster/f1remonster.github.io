
$(".slider").slick({
    dots: true,
    dotsClass: 'slider__dots',
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    prevArrow: '<button type="button" class="slider__btn prev"><svg><use xlink:href="img/sprite.svg#slider-prev-arrow"></use></svg></button>',
    nextArrow: '<button type="button" class="slider__btn next"><svg><use xlink:href="img/sprite.svg#slider-next-arrow"></use></svg></button>',
});
    

const tabs = $('.main__tab-item');
const tabsContent = $('.main__tab-content');
const sliderHits = $(".main__slider-hits");
const sliderActions = $(".main__slider-action");

tabs.on('click', function(){
    let tabName = $(this).attr('data-tab');
    sliderHits.slick('refresh');
    sliderActions.slick('refresh');

    tabs.removeClass('active');
    tabsContent.removeClass('active');

    $(this).addClass('active');
    $("#"+tabName).addClass('active');
});

sliderHits.slick({
    infinite: false,
    arrows: false,
    slidesToScroll: 1,
    slidesToShow: 5
});
sliderActions.slick({
    infinite: false,
    arrows: false,
    slidesToScroll: 1,
    slidesToShow: 5
});
    
    
    

    


