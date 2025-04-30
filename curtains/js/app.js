"use strict";

function preloader() {
  $(function () {
    setInterval(function () {
      var p = $(".preloader");
      p.css("opacity", 0);
      setInterval(function () {
        return p.remove();
      });
    }, 1000);
  });
}

function preloaderAdd() {
  $("body").append("\n\t\t\t<div class=\"preloader\">\n\t\t\t\t<div class=\"preloader-content\">\n\t\t\t\t\t<span></span>\n\t\t\t\t\t<span></span>\n\t\t\t\t\t<span></span>\n\t\t\t\t\t<span></span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t");
}

function arrowUpVisible() {
  var arrow = $(".arrow-up");
  var windowHeight = $(window).outerHeight();
  var opacityVision = pageYOffset / windowHeight;
  arrow.css("opacity", opacityVision);
  arrow.on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var winHeight = $(document).height();
    var step = 12;
    var timeToScroll = winHeight / step;
    $("html, body").stop().animate({
      scrollTop: 0
    }, timeToScroll);
  });
}

function onScroll() {
  if ($(window).scrollTop() === 0) {
    $(".header").removeClass("fixed");
    $(".block__top").css("padding-top", "0");
    $(".block__wide-background--top").css("top", "0");
  }

  if ($(window).scrollTop() > 0) {
    $(".header").addClass("fixed");
    $(".block__top").css("padding-top", $(".header").height());
    $(".block__wide-background--top").css("top", $(".header").height());
  }
}

$(document).ready(function () {
  // preloader();
  var windowWidth = $(window).outerWidth();
  onScroll();
  $(".menu__title").click(function () {
    $(".header__menu").toggleClass("menu-open");
    $(".has-submenu").removeClass("submenu-opened"); // $('.overlay').toggleClass('open');

    $("html").toggleClass("no-scroll");
  });
  $(".has-submenu span").click(function (e) {
    // e.preventDefault();
    // $(".has-submenu").removeClass("submenu-opened");
    if ($(this).parent().hasClass("submenu-opened")) {
      $(this).parent().removeClass("submenu-opened");
    } else {
      $(".has-submenu").removeClass("submenu-opened");
      $(this).parent().addClass("submenu-opened");
    } // $(this).toggleClass("submenu-opened");

  });

  if ($(".block__top-slider")) {
    var mainTopSlider = new Swiper(".block__top-slider", {
      pagination: {
        el: ".fraction-top",
        type: "fraction",
        formatFractionCurrent: function formatFractionCurrent(number) {
          if (number < 10) {
            return "0" + number;
          } else {
            return number;
          }
        },
        formatFractionTotal: function formatFractionTotal(number) {
          if (number < 10) {
            return "0" + number;
          } else {
            return number;
          }
        }
      },
      navigation: {
        nextEl: ".btn-top-next",
        prevEl: ".btn-top-prev"
      }
    });
  }

  if ($(".block__services-slider")) {
    var servicesSlider = new Swiper(".block__services-slider", {
      spaceBetween: 10,
      pagination: {
        el: ".fraction-services",
        type: "fraction",
        formatFractionCurrent: function formatFractionCurrent(number) {
          if (number < 10) {
            return "0" + number;
          } else {
            return number;
          }
        },
        formatFractionTotal: function formatFractionTotal(number) {
          if (number < 10) {
            return "0" + number;
          } else {
            return number;
          }
        }
      },
      navigation: {
        nextEl: ".btn-services-next",
        prevEl: ".btn-services-prev"
      }
    });
  }

  if ($(".testimonials__slider")) {
    $(".testimonials__slider .testimonials__item").each(function (el) {
      var firstNameFirstLetter = $(this).find(".first-name").text().split("")[0];
      var surnameFirstLetter = $(this).find(".surname").text().split("")[0];
      $(this).find(".testimonials__image").append("<span>" + firstNameFirstLetter + surnameFirstLetter + "</span>");
    });
    $(".testimonials__thumbs .testimonials__item").each(function (el) {
      var firstNameFirstLetter = $(this).find(".first-name").text().split("")[0]; // var surnameFirstLetter = $(this).find('.surname').text().split('')[0];

      $(this).find(".testimonials__image").append("<span>" + firstNameFirstLetter + "</span>");
    });
    var testimonialsThumbs = new Swiper(".testimonials__thumbs", {
      direction: "vertical",
      spaceBetween: 10,
      slidesPerView: 2,
      loop: true,
      loopedSlides: 5,
      enabled: false,
      controller: {
        control: testimonialsSlider
      }
    });
    var testimonialsSlider = new Swiper(".testimonials__slider", {
      spaceBetween: 30,
      loop: true,
      loopedSlides: 5,
      pagination: {
        el: ".fraction-testimonials",
        type: "fraction",
        formatFractionCurrent: function formatFractionCurrent(number) {
          if (number < 10) {
            return "0" + number;
          } else {
            return number;
          }
        },
        formatFractionTotal: function formatFractionTotal(number) {
          if (number < 10) {
            return "0" + number;
          } else {
            return number;
          }
        }
      },
      navigation: {
        nextEl: ".btn-testimonials-next",
        prevEl: ".btn-testimonials-prev"
      },
      controller: {
        control: testimonialsThumbs
      } // thumbs: {
      // 	swiper: testimonialsThumbs
      // },
      // on: {
      // 	init: function () {
      // 		testimonialsThumbs.slideTo(testimonialsThumbs.activeIndex + 1, 0);
      // 	},
      // 	slideChange: function () {
      // 		testimonialsThumbs.slideTo(testimonialsThumbs.activeIndex + 1, 0);
      // 	}
      // }

    });
  }

  if ($(".testimonials__thumbs")) {}

  if ($(".block__gallery-mobile")) {
    var servicesSlider = new Swiper(".block__gallery-mobile", {
      spaceBetween: 10,
      slidesPerView: "auto"
    });
  }

  if ($(".block__blog-slider")) {
    var blogSlider = new Swiper(".block__blog-slider", {
      spaceBetween: 30,
      slidesPerView: 3,
      pagination: {
        el: ".fraction-blog",
        type: "fraction",
        formatFractionCurrent: function formatFractionCurrent(number) {
          if (number < 10) {
            return "0" + number;
          } else {
            return number;
          }
        },
        formatFractionTotal: function formatFractionTotal(number) {
          if (number < 10) {
            return "0" + number;
          } else {
            return number;
          }
        }
      },
      navigation: {
        nextEl: ".btn-blog-next",
        prevEl: ".btn-blog-prev"
      },
      breakpoints: {
        200: {
          spaceBetween: 30,
          slidesPerView: "auto"
        },
        767: {
          spaceBetween: 31,
          slidesPerView: 3
        }
      }
    });
  }

  $("input[name=phone]").inputmask("+375 ( 99 ) 999 - 99 - 99");

  if ($(".order__step--1 .order__input-checkbox").prop("checked")) {
    $(".order__step--1 .order__button--next").removeClass("disabled");
  }

  $(".order__step--1 .order__input-checkbox").click(function () {
    $(this).each(function () {
      if ($(".order__step--1 .order__input-checkbox").is(":checked")) {
        $(".order__step--1 .order__button--next").removeClass("disabled");
      } else {
        $(".order__step--1 .order__button--next").addClass("disabled");
      }
    });
  });
  $(".order__step--2 .order__input-checkbox").click(function () {
    $(this).each(function () {
      if ($(".order__step--2 .order__input-checkbox").is(":checked")) {
        $(".order__step--2 .order__button--next").removeClass("disabled");
      } else {
        $(".order__step--2 .order__button--next").addClass("disabled");
      }
    });
  });
  $(".order__step--3 .order__input-checkbox").click(function () {
    $(this).each(function () {
      if ($(".order__step--3 .order__input-checkbox").is(":checked")) {
        $(".order__step--3 .order__button--next").removeClass("disabled");
      } else {
        $(".order__step--3 .order__button--next").addClass("disabled");
      }
    });
  });
  $(".order__step--4 .order__input-checkbox").click(function () {
    $(this).each(function () {
      if ($(".order__step--4 .order__input-checkbox").is(":checked")) {
        $(".order__step--4 .order__button--next").removeClass("disabled");
      } else {
        $(".order__step--4 .order__button--next").addClass("disabled");
      }
    });
  });
  $(".order__step--1 .order__button--next").on("click", function () {
    if (!$(this).hasClass("disabled")) {
      $(".order__step--1").hide();
      $(".order__step--2").show();
      $(".order__list-item").removeClass("active");
      $(".order__list-step-2").addClass("active");
    }
  });
  $(".order__step--2 .order__button--next").on("click", function () {
    if (!$(this).hasClass("disabled")) {
      $(".order__step--2").hide();
      $(".order__step--3").show();
      $(".order__list-item").removeClass("active");
      $(".order__list-step-3").addClass("active");
    }
  });
  $(".order__step--2 .order__button--prev").on("click", function () {
    $(".order__step--2").hide();
    $(".order__step--1").show();
    $(".order__list-item").removeClass("active");
    $(".order__list-step-1").addClass("active");
  });
  $(".order__step--3 .order__button--next").on("click", function () {
    if (!$(this).hasClass("disabled")) {
      $(".order__step--3").hide();
      $(".order__step--4").show();
      $(".order__list-item").removeClass("active");
      $(".order__list-step-4").addClass("active");
    }
  });
  $(".order__step--3 .order__button--prev").on("click", function () {
    $(".order__step--3").hide();
    $(".order__step--2").show();
    $(".order__list-item").removeClass("active");
    $(".order__list-step-2").addClass("active");
  });
  $(".order__step--4 .order__button--next").on("click", function () {
    if (!$(this).hasClass("disabled")) {
      $(".order__step--4").hide();
      $(".order__step--5").show();
      $(".order__list").hide();
    }
  });
  $(".order__step--4 .order__button--prev").on("click", function () {
    $(".order__step--4").hide();
    $(".order__step--3").show();
    $(".order__list-item").removeClass("active");
    $(".order__list-step-3").addClass("active");
  }); // modals actions

  $(".order__form").submit(function (e) {
    e.preventDefault();
    $.fancybox.open({
      src: "#order-submit",
      type: "inline"
    });
    $(".order__step--5").hide();
    $(".order__list").show();
    $(".order__step--1").show();
    $(".order__list-item").removeClass("active");
    $(".order__list-step-1").addClass("active");
    $(".order__step .order__button--next").addClass("disabled");
    $(".order__input-checkbox").prop("checked", false);
    $('input[name="phone"]').val("");
    $('textarea[name="comments"]').val("");
    $(".order__file-container").html("");
  });
  $(".block__form-form").submit(function (e) {
    e.preventDefault();
    $.fancybox.open({
      src: "#order-submit",
      type: "inline"
    });
    $(".block__input--form-bottom input").val("");
  });
  $(".btn-consult").click(function (e) {
    e.preventDefault();
    $.fancybox.open({
      src: "#form-consult",
      type: "inline"
    });
  });
  $(".btn-testimonials").click(function (e) {
    e.preventDefault();
    $.fancybox.open({
      src: "#form-testimonials",
      type: "inline",
      touch: false
    });
  });
  $("#form-consults").submit(function (e) {
    e.preventDefault();
    $.fancybox.close({
      src: "#form-consult"
    });
    $(".block__input--form-consult input").val("");
    $.fancybox.open({
      src: "#order-submit",
      type: "inline"
    });
  });
  $("#form-testimonial").submit(function (e) {
    e.preventDefault();
    $.fancybox.close({
      src: "#form-testimonials"
    });
    $.fancybox.open({
      src: "#testimonial-submit",
      type: "inline"
    });
    $(".block__input--form-testimonial input").val("");
    $(".block__input--captcha input").val("");
    $(".block__textarea--form-testimonial textarea").val("");
    $(".form__testimonial-file-container").html();
  });
  $(".order__file svg, .order__file span").dropzone({
    url: "/upload-doc",
    previewsContainer: ".order__file-container",
    acceptedFiles: "image/*,application/pdf",
    previewTemplate: '<div class="dz-preview dz-file-preview">\n  <div class="dz-image"><span class="dz-delete" data-dz-remove></span><div class="dz-container"><img data-dz-thumbnail /></div></div>\n  <div class="dz-details">\n    <div class="dz-size"><span data-dz-size></span></div>\n    <div class="dz-filename"><span data-dz-name></span></div>\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n  <div class="dz-success-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n      <title>Check</title>\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF"></path>\n      </g>\n    </svg>\n  </div>\n  <div class="dz-error-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n      <title>Error</title>\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475">\n          <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>'
  });
  $(".form__testimonial-file svg, .form__testimonial-file span").dropzone({
    url: "/upload-doc",
    maxFiles: 1,
    previewsContainer: ".form__testimonial-file-container",
    acceptedFiles: "image/*,application/pdf",
    previewTemplate: '<div class="dz-preview dz-file-preview">\n  <div class="dz-image"><span class="dz-delete" data-dz-remove></span><div class="dz-container"><img data-dz-thumbnail /></div></div>\n  <div class="dz-details">\n    <div class="dz-size"><span data-dz-size></span></div>\n    <div class="dz-filename"><span data-dz-name></span></div>\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n  <div class="dz-success-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n      <title>Check</title>\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF"></path>\n      </g>\n    </svg>\n  </div>\n  <div class="dz-error-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n      <title>Error</title>\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475">\n          <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>',
    init: function init() {
      this.on("addedfile", function (file) {
        if (this.files.length > 1) {
          this.removeFile(this.files[0]);
        }
      });
    }
  });
  $(".btn-form-order").click(function (e) {
    e.preventDefault();
    $.fancybox.open({
      src: "#form-order-modal",
      type: "inline",
      touch: false
    });
  });
  $("#form-order").submit(function (e) {
    e.preventDefault();
    $.fancybox.close({
      src: "#form-order-modal"
    });
    $(".block__input--form-order").val("");
    $.fancybox.open({
      src: "#order-submit",
      type: "inline",
      touch: false
    });
  }); // end of modals actions

  $('[data-fancybox="gallery"], [data-fancybox="gallery-mobile"]').fancybox({
    buttons: ["zoom", "fullScreen", "close"],
    afterShow: function afterShow() {
      $(".header").css("opacity", "0");
    },
    afterClose: function afterClose() {
      $(".header").css("opacity", "1");
    }
  });

  if (windowWidth < 768) {
    if ($(".testimonials__slider")) {
      $(".testimonials__slider .testimonials__item").each(function (el) {
        $(this).find(".testimonials__image span").remove();
        var firstNameFirstLetter = $(this).find(".first-name").text().split("")[0];
        $(this).find(".testimonials__image").append("<span>" + firstNameFirstLetter + "</span>");
      });
    }

    if ($(".product__image").length > 0) {
      $(".product__image").fotorama({
        navwidth: 244,
        nav: "thumbs",
        margin: 10,
        maxwidth: "100%",
        thumbmargin: 5,
        thumbwidth: 58,
        thumbheight: 53,
        allowfullscreen: false,
        click: false,
        keyboard: {
          space: true
        },
        shadows: false,
        fit: "cover"
      });
    }
  }

  if (windowWidth > 767) {
    if ($(".testimonials__slider")) {
      $(".testimonials__slider .testimonials__item").each(function (el) {
        $(this).find(".testimonials__image span").remove();
        var firstNameFirstLetter = $(this).find(".first-name").text().split("")[0];
        var surnameFirstLetter = $(this).find(".surname").text().split("")[0];
        $(this).find(".testimonials__image").append("<span>" + firstNameFirstLetter + surnameFirstLetter + "</span>");
      });
    }

    $(".product__image").fotorama({
      navwidth: 432,
      nav: "thumbs",
      margin: 10,
      maxwidth: "100%",
      thumbmargin: 10,
      thumbwidth: 100,
      thumbheight: 95,
      allowfullscreen: false,
      click: false,
      keyboard: {
        space: true
      },
      shadows: false,
      fit: "cover"
    });
  }

  $(".select").click(function () {
    $(this).addClass("select--open");
  });
  $(".dropdown__item").click(function (e) {
    e.stopPropagation();
    $(this).parent().parent().removeClass("select--open");
    var dropdownItem = $(this).html();
    $(this).parent().parent().find(".select__placeholder").html(dropdownItem);
    $(this).parent().find(".dropdown__item").removeClass("dropdown__item--active");
    $(this).addClass("dropdown__item--active");
  }); // quantity +/

  var formatMeters = wNumb({
    mark: ".",
    decimals: 1,
    suffix: " м"
  });
  $(".quantity input").each(function () {
    var value = formatMeters.to(parseFloat($(this).val()));
    $(this).val(value);
  });
  $(".btn--add").click(function () {
    var value = formatMeters.from($(this).prev().val());

    if (value < 100) {
      var value = value + 0.5;
      $(this).prev().val(formatMeters.to(value));
    }
  });
  $(".btn--sub").click(function () {
    var value = formatMeters.from($(this).next().val());

    if (value > 0.5) {
      var value = value - 0.5;
      $(this).next().val(formatMeters.to(value));
    }
  }); // btn--types

  $(".btn--types").click(function () {
    $(".btn--types").removeClass("btn--types-active");
    $(this).addClass("btn--types-active");
    var sortType = $(this).attr("data-sort");
    $(".block__catalogue .col-1").each(function () {
      var prodType = $(this).attr("data-type");

      if (sortType === prodType) {
        $(this).css("display", "block");
      } else {
        $(this).css("display", "none");
      }

      if (sortType === "all") {
        $(this).css("display", "block");
      }
    });
  }); // filter

  $(".filter__item--close .filter__item-content").hide();
  $(".filter__item-title").click(function (e) {
    var $this = $(this);

    if (!$this.parent().hasClass("filter__item--not-close")) {
      $this.parent().toggleClass("filter__item--close");
      $this.next().slideToggle();
      setTimeout(function () {
        if ($this.parent().find(".filter__more").length) {
          $this.parent().find(".filter__more").show();
          $this.parent().find(".filter__more").next().hide();
        }
      }, 300);
    }
  });
  $(".filter__more").click(function () {
    $(this).hide();
    $(this).next().show();
  });
  $(".filter__price-input").blur(function () {
    var label = $(this).parent().find("label");
    $(this).val().length > 0 ? label.addClass("active") : label.removeClass("active");
  });
  $(".btn--filter-reset").click(function () {
    $(".filter__checkbox-input, .filter__radio-input").prop("checked", false);
    $(".filter__price-input").val("");
    $(".filter__price-input").parent().find("label").removeClass("active");
  });
  $(".block__title--filter-mobile-title").click(function () {
    $(".filter").addClass("filter--mobile");
    $("html").addClass("no-scroll");
  });
  $(".filter__close").click(function () {
    $(".filter").removeClass("filter--mobile");
    $("html").removeClass("no-scroll");
    $(".filter__body").scrollTop(0);
  });
  $(".filter__radio-input").click(function () {
    $(".filter__price-input").val("");
    $(".filter__price-input").parent().find("label").removeClass("active");
  });
  $(".filter__price-input").click(function () {
    $(".filter__radio-input").each(function () {
      $(this).prop("checked", false);
    });
  });
  $(".btn--filter-reset").click(function () {
    $(".filter__rules-item").remove();
  });
  $(".filter__rules-remove").click(function () {
    $(this).parent().remove();
  }); // end filter
  // pruduct page
  // product image
  // $(function () {
  // 	var $fotoramaDiv = $(".fotorama").fotorama();
  // 	var fotorama = $fotoramaDiv.data("fotorama");
  // 	var imagArr = fotorama.data;
  // 	var srcArr = [];
  // 	for (var i = 0; i < imagArr.length; i++) {
  // 		var src = {};
  // 		src.src = imagArr[i].img;
  // 		srcArr.push(src);
  // 	}
  // 	$(".fotorama__img").click(function () {
  // 		$.fancybox.open(srcArr, {
  // 			buttons: ["zoom", "fullScreen", "close"],
  // 			loop: false,
  // 			thumbs: true,
  // 			afterShow: function () {
  // 				$(".header").css("opacity", "0");
  // 			},
  // 			afterClose: function () {
  // 				$(".header").css("opacity", "1");
  // 			},
  // 		});
  // 	});
  // });
  // $('[data-fancybox="gallery"], [data-fancybox="gallery-mobile"]').fancybox({
  // 	buttons: ["zoom", "fullScreen", "close"],
  // 	afterShow: function () {
  // 		$(".header").css("opacity", "0");
  // 	},
  // 	afterClose: function () {
  // 		$(".header").css("opacity", "1");
  // 	},
  // });
  // product options slider

  var productOptions = new Swiper(".product-options", {
    slidesPerView: 3,
    navigation: {
      nextEl: ".product-options-next",
      prevEl: ".product-options-prev"
    },
    breakpoints: {
      768: {
        slidesPerView: 3
      },
      300: {
        slidesPerView: 1
      }
    }
  }); // product tabs

  if ($(".product__tabs-content").length) {
    $(".product__tab-content").hide();
    $(".product__tab-content").eq(0).show();
  }

  $(".product__tab-caption").click(function () {
    if (!$(this).hasClass("product__tab-caption--active")) {
      var $index = $(this).index();
      $(".product__tab-caption").removeClass("product__tab-caption--active");
      $(this).addClass("product__tab-caption--active");
      $(".product__tab-content").hide();
      $(".product__tab-content").eq($index).show();
    }
  }); // products slider bottom

  var productsFavorites = new Swiper(".products-favorites", {
    slidesPerView: 4,
    spaceBetween: 30,
    navigation: {
      nextEl: ".products-favorites-next",
      prevEl: ".products-favorites-prev"
    },
    breakpoints: {
      1200: {
        slidesPerView: 4
      },
      1024: {
        slidesPerView: 3
      },
      568: {
        slidesPerView: 2
      },
      300: {
        slidesPerView: "auto",
        spaceBetween: 15
      }
    }
  });
  var productsRecentlyViewed = new Swiper(".products-recently-viewed", {
    slidesPerView: 4,
    spaceBetween: 10,
    navigation: {
      nextEl: ".products-recently-viewed-next",
      prevEl: ".products-recently-viewed-prev"
    },
    breakpoints: {
      1200: {
        slidesPerView: 4
      },
      1024: {
        slidesPerView: 3
      },
      568: {
        slidesPerView: 2
      },
      300: {
        slidesPerView: "auto",
        spaceBetween: 15
      }
    }
  }); // let mouseenterToCard = false;
  // card hover unbind after click
  // $(".card").mouseenter(function () {
  // 	$(".card").removeClass("active");
  // 	$(this).addClass("active");
  // });
  // $(".card").mouseleave(function () {
  // 	$(this).removeClass("active");
  // });
  // let clickToCard = 0;
});
$(document).mouseup(function (e) {
  var submenu = $(".submenu");
  var menu = $(".header__menu");
  var select = $(".select"); // if (!submenu.is(e.target) && submenu.has(e.target).length === 0) {
  // 	$(".has-submenu").removeClass("submenu-opened");
  // }

  if (!menu.is(e.target) && menu.has(e.target).length === 0) {
    menu.removeClass("menu-open");
  }

  if (!select.is(e.target) && select.has(e.target).length === 0) {
    select.removeClass("select--open");
  }
});
$(window).scroll(function () {
  arrowUpVisible();
  onScroll();
});
$(window).resize(function () {
  var windowWidth = $(window).outerWidth();

  if (windowWidth < 768) {
    if ($(".testimonials__slider")) {
      $(".testimonials__slider .testimonials__item").each(function (el) {
        $(this).find(".testimonials__image span").remove();
        var firstNameFirstLetter = $(this).find(".first-name").text().split("")[0];
        $(this).find(".testimonials__image").append("<span>" + firstNameFirstLetter + "</span>");
      });
    }

    if ($(".product__image")) {
      $(".product__image").fotorama({
        navwidth: 244,
        nav: "thumbs",
        margin: 10,
        thumbmargin: 5,
        thumbwidth: 58,
        thumbheight: 53
      });
    }
  }

  if (windowWidth > 767) {
    if ($(".testimonials__slider")) {
      $(".testimonials__slider .testimonials__item").each(function (el) {
        $(this).find(".testimonials__image span").remove();
        var firstNameFirstLetter = $(this).find(".first-name").text().split("")[0];
        var surnameFirstLetter = $(this).find(".surname").text().split("")[0];
        $(this).find(".testimonials__image").append("<span>" + firstNameFirstLetter + surnameFirstLetter + "</span>");
      });
    }

    if ($("html").hasClass("no-scroll")) {
      $("html").removeClass("no-scroll");
      $(".filter").removeClass("filter--mobile");
    }

    if ($(".product__image")) {
      $(".product__image").fotorama({
        navwidth: 432,
        nav: "thumbs",
        thumbmargin: 10,
        thumbwidth: 100,
        thumbheight: 95
      });
    }
  }
});