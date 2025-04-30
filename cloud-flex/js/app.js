"use strict";

if (localStorage.cloudFlex) {
  $('.cookies').remove();
}

$('.block__btn--cookies').click(function (e) {
  e.preventDefault();
  $('.cookies').remove();
  localStorage.setItem('cloudFlex', '1');
});

if ($('.testimonials__slider').length > 0) {
  var sliderSelector = '.testimonials__slider',
      sliderOptions = {
    init: false,
    slidesPerView: 1,
    // spaceBetween: 30,
    navigation: {
      nextEl: ".testimonials__btn--next",
      prevEl: ".testimonials__btn--prev"
    },
    pagination: {
      el: ".testimonials__bullets"
    },
    breakpoints: {
      320: {
        slidesPerView: 1 // spaceBetween: 30,

      },
      1025: {
        // loop: true,
        slidesPerView: "auto",
        // spaceBetween: 170,
        centeredSlides: true
      }
    }
  };
  var tSlider = new Swiper(sliderSelector, sliderOptions);
  tSlider.init();
}