"use strict";

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
}

AOS.init();
$(document).ready(function () {
  // cases slider
  var casesSlider = new Swiper(".block__cases-list .swiper", {
    slidesPerView: "auto",
    spaceBetween: 50,
    // speed: 600,
    navigation: {
      nextEl: ".cases-btn-next",
      prevEl: ".cases-btn-prev"
    },
    breakpoints: {
      0: {
        spaceBetween: 20
      },
      1200: {
        spaceBetween: 50
      }
    }
  });
  var logosSlider = new Swiper(".block__press-logos .swiper", {
    slidesPerView: "auto",
    spaceBetween: 30,
    // speed: 1000,
    navigation: {
      nextEl: ".logos-btn-next",
      prevEl: ".logos-btn-prev"
    }
  }); // tariffs tabs

  $(".btn-tariff").click(function () {
    if (!$(this).hasClass("active")) {
      $(".btn-tariff").removeClass("active");
      $(".block__tariffs-list").removeClass("active");
      $(this).addClass("active");
      $(".block__tariffs-list").eq($(this).index()).addClass("active");
    }
  }); // faq acoordeon

  $(".block__title--faq").on("click", function () {
    console.log("click");
    $(".block__faq-content").not($(this).next()).slideUp();
    $(".block__faq-item").not($(this).parent()).removeClass("active");
    $(this).parent().toggleClass("active");
    $(this).next().slideToggle();
  }); // anchor moving

  $('.nav li a[href^="#"]').click(function (event) {
    $(".nav li").removeClass("active");
    $(this).parent().addClass("active");
    var id = $(this).attr("href");

    if (window.matchMedia("(max-width: 991.98px)").matches) {
      var offset = 0;
    } else {
      var offset = 70;
    }

    var target = $(id).offset().top + offset;
    $("html, body").animate({
      scrollTop: target
    }, 500);
    event.preventDefault();
  }); // modals, use fancybox plugin

  $('[data-modal="askQuestion"]').click(function (e) {
    e.preventDefault();
    $.fancybox.open({
      src: "#askQuestion",
      type: "inline",
      touch: false,
      btnTpl: {
        smallBtn: '<div data-fancybox-close class="fancybox-close-small modal-close"><svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg"><rect opacity="0.6" x="0.994141" y="0.149414" width="43" height="44" rx="12" fill="url(#paint0_linear_537112_463)"/><path d="M14.2904 13.7561L30.6978 30.5427" stroke="#6188A9"/><path d="M30.6978 13.7561L14.2905 30.5427" stroke="#6188A9"/><defs><linearGradient id="paint0_linear_537112_463" x1="10.7741" y1="7.71938" x2="40.0011" y2="9.41" gradientUnits="userSpaceOnUse"><stop stop-color="#E4EEF5"/><stop offset="1" stop-color="#D7EEFF"/></linearGradient></defs></svg></div>'
      }
    });
  });
  $('[data-modal="moreIncident"]').click(function (e) {
    e.preventDefault();
    $.fancybox.open({
      src: "#moreIncident",
      type: "inline",
      touch: false,
      btnTpl: {
        smallBtn: '<div data-fancybox-close class="fancybox-close-small modal-close"><svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg"><rect opacity="0.6" x="0.994141" y="0.149414" width="43" height="44" rx="12" fill="url(#paint0_linear_537112_463)"/><path d="M14.2904 13.7561L30.6978 30.5427" stroke="#6188A9"/><path d="M30.6978 13.7561L14.2905 30.5427" stroke="#6188A9"/><defs><linearGradient id="paint0_linear_537112_463" x1="10.7741" y1="7.71938" x2="40.0011" y2="9.41" gradientUnits="userSpaceOnUse"><stop stop-color="#E4EEF5"/><stop offset="1" stop-color="#D7EEFF"/></linearGradient></defs></svg></div>'
      }
    });
  });
  $(".modal form").submit(function (e) {
    e.preventDefault(); // find modal name

    var modalName = $(this).parent().parent().attr("id"); // close modal

    $.fancybox.close({
      src: "#" + modalName
    }); // clear inputs

    $(this).find(".form__control").val("");
    var currentTime = new Date();
    var currentHour = currentTime.getHours();
    var currentDay = currentTime.getDay();

    if (currentHour >= 8 && currentHour < 17 && currentDay != 0 && currentDay != 6) {
      // Якщо зараз робочий час
      $.fancybox.open({
        src: "#successSending",
        type: "inline",
        touch: false,
        btnTpl: {
          smallBtn: '<div data-fancybox-close class="fancybox-close-small modal-close"><div class="btn btn-green">Закрити</div></div></div>'
        }
      });
    } else {
      // Якщо зараз не робочий час
      $.fancybox.open({
        src: "#notWorkTime",
        type: "inline",
        touch: false,
        btnTpl: {
          smallBtn: '<div data-fancybox-close class="fancybox-close-small modal-close"><div class="btn btn-boticelli">Закрити</div></div></div>'
        }
      });
    }
  });
});
$(window).on("load", function () {
  $(".preloader").remove();
});