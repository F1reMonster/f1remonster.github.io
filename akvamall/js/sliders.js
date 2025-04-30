"use strict";

// slider
// DOM дерево готово
$(document).ready(function () {
  // слайдер стартовый пакет
  var setSlider = $(".set-slider");
  var dotsPlace = $(".set");
  var slidesCounter = $(".slider-counter span:first-child");
  var slidesTotal = $(".slider-counter span:last-child");
  var numOfSLides = null;
  var current = 1;
  setSlider.on("init reInit afterChange", function (event, slick, currentSlide, nextSlide) {
    if (event.type != "init") {
      current = currentSlide + 1;
    }

    slidesCounter.text(current);
    numOfSLides = slick.slideCount;
    slidesTotal.text(numOfSLides); // console.log(numOfSLides)
    // console.log(current)
  }); // setSlider.on('beforeChange', function (slick, currentSlide, nextSlide) {
  // })

  setSlider.slick({
    arrows: false,
    dots: true,
    infinite: true,
    speed: 300,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    appendDots: dotsPlace
  });
  $(".testimonials__list").slick({
    arrows: false,
    dots: false,
    infinite: false,
    slidesToShow: 4,
    speed: 300,
    responsive: [{
      breakpoint: 1440,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 1075,
      settings: {
        rows: 2,
        slidesToShow: 2
      }
    }, {
      breakpoint: 767,
      settings: {
        rows: 2,
        slidesToShow: 1
      }
    }]
  });
  $(".news__list").slick({
    arrows: false,
    dots: false,
    infinite: false,
    slidesToShow: 4,
    speed: 300,
    responsive: [{
      breakpoint: 1440,
      settings: {
        dots: true,
        slidesToShow: 3
      }
    }, {
      breakpoint: 1075,
      settings: {
        dots: true,
        rows: 2,
        slidesToShow: 2
      }
    }, {
      breakpoint: 767,
      settings: {
        dots: true,
        rows: 2,
        slidesToShow: 1
      }
    }]
  });
  $(".product__list").slick({
    arrows: false,
    dots: false,
    infinite: false,
    slidesToShow: 2,
    speed: 300,
    responsive: [{
      breakpoint: 768,
      settings: {
        dots: true,
        slidesToShow: 1
      }
    }]
  });
});