"use strict";

var windowWidth = $(window).outerWidth();

if (windowWidth < 768) {
  $(".btn__filled--subscribe").text("Go");
  $(".footer__menu-title").click(function () {
    var styleNone = $(this).next(".footer__menu-list").css("display");

    if (styleNone === "none") {
      $(".footer__menu-list").slideUp();
      $(".footer__menu-plus").show();
      $(".footer__menu-minus").hide();
      $(this).next(".footer__menu-list").slideDown();
      $(this).find(".footer__menu-plus").hide();
      $(this).find(".footer__menu-minus").show();
    } else {
      $(".footer__menu-list").slideUp();
      $(".footer__menu-plus").show();
      $(".footer__menu-minus").hide();
      $(this).next(".footer__menu-list").slideUp();
    }
  });
} else {
  $(".btn__filled--subscribe").text("Subscribe");
}

$(".header__menu").removeClass("header__menu--open");
$(".header__burger").on("click", function () {
  $(".header__menu").addClass("header__menu--open");
  $("body").addClass("locked");
  $(".overlay").addClass("overlay--show");
});
$(document).mouseup(function (e) {
  if ($(e.target).closest(".header__menu.header__menu--open").length === 0) {
    $(".header__menu").removeClass("header__menu--open");
    $("body").removeClass("locked");
    $(".overlay").removeClass("overlay--show");
  }
});
var recipesSlider = new Swiper(".recipes-slider", {
  slidesPerView: "auto",
  spaceBetween: 24,
  navigation: {
    nextEl: ".recipes-next",
    prevEl: ".recipes-prev"
  },
  pagination: {
    el: ".block__recipes-pagination",
    type: "bullets",
    clickable: true
  }
});
var instaSlider = new Swiper(".insta-slider", {
  slidesPerView: 4,
  spaceBetween: 20,
  breakpoints: {
    320: {
      slidesPerView: "auto"
    },
    1024: {
      slidesPerView: 4
    }
  }
});
$(".faq__item-content").hide();
var click = false;
$(".faq__item-title").on("click", function () {
  var styleNone = $(this).next(".faq__item-content").css("display");

  if (styleNone === "none") {
    $(".faq__item-content").slideUp();
    $(this).next(".faq__item-content").slideDown();
  } else {
    $(".faq__item-content").slideUp();
    $(this).next(".faq__item-content").slideUp();
  }
});
$(".block__subscribe-input input").blur(function () {
  var label = $(this).parent().find("label");
  $(this).val().length > 0 ? label.addClass("active") : label.removeClass("active");
});
$(window).resize(function () {
  var windowWidth = $(window).outerWidth();

  if (windowWidth < 768) {
    $(".btn__filled--subscribe").text("Go");
    $(".footer__menu-list").hide();
    $(".footer__menu-plus").show();
    $(".footer__menu-minus").hide();
  } else {
    $(".btn__filled--subscribe").text("Subscribe");
    $(".footer__menu-list").show();
    $(".footer__menu-plus").hide();
    $(".footer__menu-minus").hide();
  }
});
$(".btn__rounded--top").click(function () {
  $("html, body").animate({
    scrollTop: $(".block__achivements").offset().top - 56
  }, 500);
}); // $('.block__insta-slider-item').each(function (index) {
// 	const id = $(this).attr('id');
// 	const likeValue = parseInt($(this).find('span').text());
// 	console.log(id, likeValue);
// 	localStorage.setItem(id, likeValue);
// })

$('.image-overlay').click(function () {
  var instLikeValue = parseInt($(this).find('span').text());
  $(this).parent().parent().toggleClass('active');

  if ($(this).parent().parent().hasClass('active')) {
    instLikeValue = instLikeValue + 1;
    $(this).find('span').text(instLikeValue);
  } else {
    instLikeValue = instLikeValue - 1;
    $(this).find('span').text(instLikeValue);
  }
});