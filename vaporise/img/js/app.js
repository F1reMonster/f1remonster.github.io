"use strict";

// new WOW({
// 	animateClass: "animate__animated",
// }).init();
$(document).ready(function () {
  var $windowWidth = $(window).innerWidth();

  if ($windowWidth > 1023) {
    $(".header__bottom .menu").removeClass("opened");
    $("body").removeClass("lock");
  }

  $(".select").click(function () {
    $(this).addClass("select--open");
  });
  $(".has-menugroup").click(function (e) {
    e.stopPropagation();
    var idxMenu = $(this).index(".has-menugroup");

    if (!$(this).hasClass("menugroup-opened")) {
      $(".has-menugroup").removeClass("menugroup-opened");
      $(this).addClass("menugroup-opened");
      $(".menu-group").removeClass("opened");
      $(".menu-group").eq(idxMenu).addClass("opened");
    } else {
      $(this).removeClass("menugroup-opened");
      $(".menu-group").removeClass("opened");
    } // $(".menu-group").each(function (el) {
    // 	if (el === idxMenu) {
    // 		console.log($(this));
    // 		if ($(this).hasClass("opened").length === 0) {
    // 			$(".menu-group").removeClass("opened");
    // 			$(this).addClass("opened");
    // 		} else {
    // 			$(this).removeClass("opened");
    // 		}
    // 	}
    // });

  });
  $(".menu-group-close").click(function () {
    $(this).parent().removeClass("opened");
    $(".has-menugroup").removeClass("menugroup-opened");
  });
  $(".dropdown__item").click(function (e) {
    e.stopPropagation();
    $(this).parent().parent().removeClass("select--open");
    var dropdownItem = $(this).html();
    $(this).parent().parent().find(".select__placeholder").html(dropdownItem);
    $(this).parent().find(".dropdown__item").removeClass("dropdown__item--active");
    $(this).addClass("dropdown__item--active");
  });
  $(".header__group--menu").click(function () {
    $(".header__bottom .menu").addClass("opened");
    var $windowWidth = $(window).innerWidth();

    if ($windowWidth < 1023) {
      $("body").addClass("lock");
    }
  });
  $(".menu__item--close").click(function () {
    $(this).parent().removeClass("opened");
    $("body").removeClass("lock");
  });
  var mainSlider = new Swiper(".main-slider", {
    slidesPerView: 1,
    speed: 600,
    navigation: {
      nextEl: ".main-slider-btn-next",
      prevEl: ".main-slider-btn-prev"
    },
    pagination: {
      el: ".main-slider-pagination",
      type: "bullets",
      clickable: true
    }
  });
  var newestGoods = new Swiper(".newest-goods", {
    slidesPerView: 4,
    spaceBetween: 30,
    speed: 600,
    navigation: {
      nextEl: ".newest-btn-next",
      prevEl: ".newest-btn-prev"
    }
  });
  var popularGoods = new Swiper(".popular-goods", {
    slidesPerView: 4,
    speed: 600,
    spaceBetween: 30,
    navigation: {
      nextEl: ".popular-btn-next",
      prevEl: ".popular-btn-prev"
    }
  }); // $(".block__main-slider").css("height", "calc(100vh - " + $("header").outerHeight() + "px)");
});
$(document).scroll(function () {});
$(document).on("click", function (e) {
  var $windowWidth = $(window).innerWidth();

  if ($windowWidth > 1023) {
    // if (!$(e.target).is(".menu-group") && $(".menu-group").hasClass("opened")) {
    // 	$(".menu-group").removeClass("opened");
    // 	$(".has-menugroup").removeClass("menugroup-opened");
    // }
    if ($(e.target).closest(".menu-group, .menu-group__list, .menu-group__item, .menu-group__link").length === 0) {
      $(".menu-group").removeClass("opened");
      $(".has-menugroup").removeClass("menugroup-opened");
    }
  }
});
$(window).resize(function () {
  var $windowWidth = $(window).innerWidth();

  if ($windowWidth > 1023) {
    $(".header__bottom .menu").removeClass("opened");
    $("body").removeClass("lock");
  } // $(".block__main-slider").css("height", "calc(100vh - " + $("header").outerHeight() + "px)");

});