"use strict";

// new WOW({
// 	animateClass: "animate__animated",
// }).init();
// smooth scroll init
//var scroll = new SmoothScroll('[data-scroll]', {
//	speed: 500,
//	speedAsDuration: true
//});
// паралакс зображень при скролі
function parallaxImages() {
  var w_p = $(window).scrollTop() - 50;
  var w_h = $(window).height();

  if ($(".parallax-image").length) {
    $(".parallax-image").each(function () {
      var p_p = $(this).offset().top;
      var p_h = $(this).outerHeight();
      var y_bg_pos = (-(w_p + w_h / 2) + (p_p + 300 / 2)) * (300 / (w_h * 6)) + 50 + "%";
      $(this).animate({
        "background-position-x": "50%",
        "background-position-y": y_bg_pos
      }, 0);
    });
  }
} // паралакс елементів при наприклад при ховері


function parallax() {
  var amountMovedX = e.clientX * -0.3 / 8;
  var amountMovedY = e.clientY * -0.3 / 8;
  $(this).css("transform", "translate(" + amountMovedX + "px," + amountMovedY + "px)");
} // умови повинен у сладері встановлена опція watchSlidesProgress: true,
// доддає для всих слайдів які не мають клас swiper-slide-visible клас swiper-slide-invisible
// додати у налаштуваннях слайдера так
// on: {
//			"init slideChange": addInvisibleSlidesClass,
//		},


var addInvisibleSlidesClass = function addInvisibleSlidesClass() {
  var idx = this.activeIndex;
  var s = this.slides;
  s.forEach(function (el) {
    if (!el.classList.contains("swiper-slide-visible")) {
      el.classList.add("swiper-slide-invisible");
    } else {
      el.classList.remove("swiper-slide-invisible");
    }
  });
}; // умови повинен у сладері встановлена опція watchSlidesProgress: true,
// дана функція - додає клас swiper-slide-invisible для 1-го слайду перед і після видимого слайда який містить клас swiper-slide-visible


var addInvisibleSlidesClass2 = function addInvisibleSlidesClass2() {
  var t = this.slides.filter(function (el) {
    return !el.classList.contains("swiper-slide-visible");
  }),
      i = this.activeIndex,
      n = this.slides.filter(function (el) {
    return el.classList.contains("swiper-slide-invisible");
  });
  n.forEach(function (el) {
    el.classList.remove("swiper-slide-invisible");
  });
  var r = t[i - 1],
      s = t[i];
  null == r || r.classList.add("swiper-slide-invisible"), null == s || s.classList.add("swiper-slide-invisible");
}; //select


$(".select").click(function () {
  $(this).addClass("select--open");
});
$(".select__dropdown-item").click(function (e) {
  e.stopPropagation();
  $(this).parent().parent().removeClass("select--open");
  var dropdownItem = $(this).html();
  $(this).parent().parent().find(".select__placeholder").html(dropdownItem);
  $(this).parent().find(".select__dropdown-item").removeClass("select__dropdown-item--active");
  $(this).addClass("select__dropdown-item--active");
});
$(document).ready(function () {
  // ===================================================
  // faq accordeon
  $(".block__title--faq").click(function () {
    $(".block__faq-content").not($(this).next()).slideUp();
    $(".block__faq-item").not($(this).parent()).removeClass("active");
    $(this).parent().toggleClass("active");
    $(this).next().slideToggle();
  }); // burger menu open

  $('.header__burger').click(function () {
    $('.header__mobile-menu').addClass('open');
    $('body').addClass('lock');
  }); // burger menu close

  $('.header__mobile-menu-close').click(function () {
    $('.header__mobile-menu').removeClass('open');
    $('body').removeClass('lock');
  });
});
$(document).scroll(function () {});
$(document).mouseup(function (e) {
  var select = $(".select");

  if (!select.is(e.target) && select.has(e.target).length === 0) {
    select.removeClass("select--open");
  }
});
$(window).on("load", function () {
  $('.preloader').remove();
});