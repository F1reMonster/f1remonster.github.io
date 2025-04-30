"use strict";

$(document).ready(function () {
  // ===================================================
  // burger
  $(".header__burger").click(function () {
    $("body").addClass("lock");
    $(".header__menu-mobile").addClass("opened");
  });
  $(".header__burger-close").click(function () {
    $(".header__menu-mobile").removeClass("opened");
    $("body").removeClass("lock");
  }); // sliders

  var productImageThumbs = new Swiper(".product-slider-thumbs", {
    spaceBetween: 20,
    slidesPerView: 3,
    watchSlidesProgress: true,
    freeMode: true,
    speed: 800,
    navigation: {
      nextEl: ".product__next",
      prevEl: ".product__prev"
    },
    breakpoints: {
      0: {
        slidesPerView: "auto"
      },
      768: {
        slidesPerView: 3
      }
    }
  });
  var productImage = new Swiper(".product-slider", {
    spaceBetween: 16,
    slidesPerView: 1,
    speed: 800,
    lazy: true,
    thumbs: {
      swiper: productImageThumbs
    },
    pagination: {
      el: ".product__pagination"
    },
    allowTouchMove: false
  });
  productImage.on('slideChange', function () {
    if (productImage.realIndex + 1 < 10) {
      $('.current-slide').text("0" + (productImage.realIndex + 1));
    } else {
      $('.current-slide').text(productImage.realIndex + 1);
    }
  });
  $(".product__navigation .total-slides").text($(".product-slider .product__image").length);
});