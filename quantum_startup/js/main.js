$('.nav').hide();

var $status = $('.slider__paging');
var $slickElement = $('.slider');

$slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
  //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
  if (!slick.$dots) {
    return;
  }
  
  let currSlide = (currentSlide ? currentSlide : 0) + 1;
  let totalSlides = (slick.$dots[0].children.length);


  if (currSlide < 10) {
    currSlide = '0' + currSlide;
  }

  if (totalSlides < 10) {
    totalSlides = '0' + totalSlides;
  }
  
  $status.html(currSlide + '<span class="slider__total">&nbsp;/&nbsp;' + totalSlides + '</span>');

});


$('.slider').slick({
    dots: true,
    nextArrow: '<div class="arrow-right"></div>',
    prevArrow: '<div class="arrow-left"></div>',
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1
});
  
$('.header__menu').on('click', function () {

  $('.header__menu span').toggleClass('active');
  $('.nav').slideToggle();

});


