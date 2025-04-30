"use strict";

var sliders = {
  materialList: {
    slidesPerView: "auto",
    // simulateTouch: false,
    spaceBetween: 30,
    watchSlidesProgress: true,
    // allowTouchMove: false,

    navigation: {
      nextEl: ".materials-next",
      prevEl: ".materials-prev"
    },
    pagination: {
      el: ".materials-pagination",
      clickable: true
    }
  },
  printerFeatures: {
    slidesPerView: 1,
    effect: "fade",
    autoHeight: true,
    navigation: {
      nextEl: ".printer-features-next",
      prevEl: ".printer-features-prev"
    }
  },
  popularPrinters: {
    slidesPerView: 2,
    spaceBetween: 30,
    watchSlidesProgress: true,
    loop: true,
    navigation: {
      nextEl: ".printer-next",
      prevEl: ".printer-prev"
    },
    breakpoints: {
      0: {
        slidesPerView: 1
      },
      576: {
        slidesPerView: 2
      }
    }
  },
  productCardPropsMore4: {
    slidesPerView: "auto",
    spaceBetween: 30,
    speed: 3500,
    // watchSlidesProgress: true,
    autoplay: {
      delay: 1
      // disableOnInteraction: true,
    },

    loop: true,
    // allowTouchMove: false,

    breakpoints: {
      0: {
        spaceBetween: 15
      },
      576: {
        spaceBetween: 30
      }
    },
    pagination: {
      el: ".product-props-pagination",
      clickable: true
    }
  }
};
$(document).ready(function () {
  // select2
  $('.js-select').each(function () {
    $(this).select2({});
  });
  // ===================================================
  // faq accordeon
  $(".block__title--faq").click(function () {
    $(".block__faq-content").not($(this).next()).slideUp();
    $(".block__faq-item").not($(this).parent()).removeClass("active");
    $(this).parent().toggleClass("active");
    $(this).next().slideToggle();
  });

  // header submenu
  $(".sub-menu--custom li").click(function () {
    if (!$(this).hasClass("active")) {
      $(this).parent().parent().find("li").removeClass("active");
      $(this).addClass("active");
      $(this).parent().parent().find(".sub-menu-item").removeClass("active");
      if ($(this).parent().parent().find(".sub-menu-item").eq($(this).index()).length > 0) {
        $(this).parent().parent().find(".sub-menu-item-error").removeClass("active");
        $(this).parent().parent().find(".sub-menu-item").eq($(this).index()).addClass("active");
      } else {
        $(this).parent().parent().find(".sub-menu-item-error").addClass("active");
      }
    }
  });
  $(".sub-menu--custom2 li").click(function () {
    if (!$(this).hasClass("active")) {
      $(this).parent().parent().parent().find("li").removeClass("active");
      $(this).addClass("active");
      $(this).parent().parent().parent().find(".sub-menu-item").removeClass("active");
      if ($(this).parent().parent().parent().find("[data-content=" + $(this).attr("data-tab") + "]").length > 0) {
        $(this).parent().parent().parent().find(".sub-menu-item-error").removeClass("active");
        $(this).parent().parent().parent().find("[data-content=" + $(this).attr("data-tab") + "]").addClass("active");
      } else {
        $(this).parent().parent().parent().find(".sub-menu-item-error").addClass("active");
      }
    }
  });

  // burger

  $(".header__burger").click(function () {
    $(this).toggleClass("active");
    $(".header__basket").toggleClass("hide");
    $(".header__lang").toggleClass("active");
    $(".header__mobile-nav").toggleClass("active");
    $("body").toggleClass("lock");
  });

  // header__mobile-nav open submenu

  $(".header__mobile-nav .menu-item-has-children").click(function () {
    if (!$(this).hasClass("active")) {
      $(".header__mobile-nav .menu-item-has-children").removeClass("active");
      $(".header__mobile-nav .menu-item-has-children .sub-menu").slideUp();
      $(this).addClass("active");
      $(this).find(".sub-menu").slideDown();
    } else {
      $(this).removeClass("active");
      $(this).find(".sub-menu").slideUp();
    }
  });

  // materials basket counts

  $(".material__basket-count-button-minus").on("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    var target = this;
    var input = $(target).siblings(".material__basket-count-input")[0];
    var inputValue = parseInt(input.getAttribute("value") - 1);
    if (inputValue <= 0) {
      inputValue = 1;
    }
    input.setAttribute("value", inputValue);
    input.value = parseInt(input.getAttribute("value"));
    $(input).trigger("change");
  });
  $(".material__basket-count-button-plus").on("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    var target = this;
    var input = $(target).siblings(".material__basket-count-input")[0];
    var inputValue = parseInt(input.getAttribute("value")) + 1;
    if (!inputValue) {
      inputValue = 1;
    }
    input.setAttribute("value", inputValue);
    input.value = parseInt(input.getAttribute("value"));
    $(input).trigger("change");
  });
  $(".material__basket-count-input").on("keydown", function (event) {
    var codes = [46, 8, 9, 27, 13, 110, 190];
    if (codes.indexOf(event.keyCode) !== -1 || event.keyCode === 65 && (event.ctrlKey === true || event.metaKey === true) || event.keyCode >= 35 && event.keyCode <= 40) {
      return;
    }
    if ((event.shiftKey || event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
      event.preventDefault();
    }
  });
  $(".material__basket-count-input").on("keyup", function (event) {
    var target = event.target;
    target.setAttribute("value", target.value);
  });
  $(".material__basket-count-input").on("focusout", function (event) {
    var input = this;
    var inputValue = parseInt(input.getAttribute("value"));
    if (!inputValue) $(input).val(1);
  });

  // materials counts ... end;

  // sliders

  var materialList = new Swiper(".block__materials-list-slider .swiper", sliders.materialList);
  var printerFeatures = new Swiper(".block__printer-features .swiper", sliders.printerFeatures);
  var popularPrinters = new Swiper(".block__printer-models .swiper", sliders.popularPrinters);
  var materialsSliderNoFilter = new Swiper(".block__materials-list-slider-no-filter .swiper", sliders.materialList);
  var productCardPropsSlider = new Swiper(".block__props2-list-product-card .swiper", sliders.productCardPropsMore4);

  // gallery sliders
  var modalGalleryPhotoThumbs = new Swiper(".modal__gallery .thumbs-slider .swiper", {
    spaceBetween: 10,
    slidesPerView: "auto",
    freeMode: true,
    watchSlidesProgress: true
  });
  var modalGalleryPhoto = new Swiper(".modal__gallery .main-slider .swiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    // autoHeight: true,
    speed: 500,
    navigation: {
      nextEl: ".button-photo-next",
      prevEl: ".button-photo-prev"
    },
    thumbs: {
      swiper: modalGalleryPhotoThumbs
    },
    on: {
      init: function init() {
        // var activeIndex = this.activeIndex + 1;
        // var totalSlides = this.slides.length;
        // var totalSlides = $(".main-slider .modal__gallery-item").length;
        // updateSlideCounter(activeIndex, totalSlides);
      },
      slideChange: function slideChange() {
        // var activeIndex = this.activeIndex + 1;
        // var totalSlides = $(".main-slider .modal__gallery-item").length;
        // updateSlideCounter(activeIndex, totalSlides);
      }
    }
  });
  var modalGalleryVideoThumbs = new Swiper(".modal__gallery .thumbs-video-slider .swiper", {
    spaceBetween: 10,
    slidesPerView: "auto",
    freeMode: true,
    watchSlidesProgress: true
  });
  var modalGalleryVideo = new Swiper(".modal__gallery .main-video-slider .swiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    // autoHeight: true,
    speed: 500,
    navigation: {
      nextEl: ".button-video-next",
      prevEl: ".button-video-prev"
    },
    thumbs: {
      swiper: modalGalleryVideoThumbs
    },
    on: {
      init: function init() {
        var activeIndex = this.activeIndex + 1;
        // var totalSlides = this.slides.length;
        // var totalSlides = $(".main-video-slider .modal__gallery-item").length;
        // updateVideoSlideCounter(activeIndex, totalSlides);
      },

      slideChange: function slideChange() {
        // var activeIndex = this.activeIndex + 1;
        // var totalSlides = $(".main-video-slider .modal__gallery-item").length;
        // updateVideoSlideCounter(activeIndex, totalSlides);

        $(".modal__gallery .main-video-slider .modal__gallery-item video").each(function () {
          $(this)[0].pause();
        });
        $(".main-video-slider .swiper-slide").each(function () {
          var youtubePlayer = $(this).find("iframe").get(0);
          if (youtubePlayer) {
            youtubePlayer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
          }
        });
      }
    }
  });

  // function updateSlideCounter(currentSlide, totalSlides) {
  // 	$(".main-slider-counter").html("<span>" + currentSlide + "</span><span>/</span><span>" + totalSlides + "</span>");
  // }

  // function updateVideoSlideCounter(currentSlide, totalSlides) {
  // 	$(".main-video-slider-counter").html("<span>" + currentSlide + "</span><span>/</span><span>" + totalSlides + "</span>");
  // }

  // Зупинка прокрутки при наведенні миші
  $(".block__props2-list-product-card .swiper").on("mouseenter", function () {
    productCardPropsSlider.autoplay.stop();
  });

  // Продовження прокрутки при відведенні миші
  $(".block__props2-list-product-card .swiper").on("mouseleave", function () {
    productCardPropsSlider.autoplay.start();
  });

  //block__materials-filter

  if ($(".block__materials-filter").length > 0) {
    if (!$(".block__materials-filter .btn").eq(0).hasClass("active")) {
      $(".block__materials-filter .btn").removeClass("active");
      $(".block__materials-filter .btn").eq(0).addClass("active");
      var category = $(".block__materials-filter .btn").eq(0).data("category");

      // Перебираємо всі слайди та ховаємо/показуємо їх залежно від категорії
      $(".block__materials-list-slider .swiper-slide").each(function () {
        var slideCategory = $(this).data("category");
        if (category === "all" || category === slideCategory) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });

      // Перезавантажуємо Swiper, щоб показати/приховати відповідні слайди
      materialList.update();

      // Знаходимо перший видимий слайд
      var visibleSlideIndex = $(".block__materials-list .swiper-slide:visible").first().index();

      // Перевіряємо, чи індекс видимого слайда є допустимим
      if (visibleSlideIndex >= 0 && visibleSlideIndex < materialList.slides.length) {
        // Переключаємося на перший видимий слайд
        materialList.slideTo(0);
      } else {
        // Якщо немає видимих слайдів, переключаємося на перший слайд
        materialList.slideTo(visibleSlideIndex);
      }
    }
  }
  $(".block__materials-filter .btn").click(function (e) {
    // e.preventDefault()
    e.stopPropagation();
    if (!$(this).hasClass("active")) {
      $(".block__materials-filter .btn").removeClass("active");
      $(this).addClass("active");
      var category = $(this).data("category");

      // Перебираємо всі слайди та ховаємо/показуємо їх залежно від категорії
      $(".block__materials-list-slider .swiper-slide").each(function () {
        var slideCategory = $(this).data("category");
        if (category === "all" || category === slideCategory) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });

      // Перезавантажуємо Swiper, щоб показати/приховати відповідні слайди
      materialList.update();

      // Знаходимо перший видимий слайд
      var visibleSlideIndex = $(".block__materials-list .swiper-slide:visible").first().index();

      // Перевіряємо, чи індекс видимого слайда є допустимим
      if (visibleSlideIndex >= 0 && visibleSlideIndex < materialList.slides.length) {
        // Переключаємося на перший видимий слайд
        materialList.slideTo(0);
      } else {
        // Якщо немає видимих слайдів, переключаємося на перший слайд
        materialList.slideTo(visibleSlideIndex);
      }
    }
  });
  $("#gallery-filter-photo").click(function () {
    if (!$(this).hasClass("active")) {
      $(".block__gallery-filter .btn").removeClass("active");
      $(this).addClass("active");
      $(".gallery .gallery-item").hide();
      $(".gallery .gallery-item.photo").show();
    }
  });

  // Обробник події для кнопки фільтрації "Відео"
  $("#gallery-filter-video").click(function () {
    if (!$(this).hasClass("active")) {
      $(".block__gallery-filter .btn").removeClass("active");
      $(this).addClass("active");
      $(".gallery .gallery-item").hide();
      $(".gallery .gallery-item.video").show();
    }
  });

  // Обробник події для кнопки фільтрації "За замовчуванням"
  $("#gallery-filter-default").click(function () {
    if (!$(this).hasClass("active")) {
      $(".block__gallery-filter .btn").removeClass("active");
      $(this).addClass("active");
      $(".gallery .gallery-item").show();
    }
  });
  $("[data-modal]").click(function (e) {
    e.preventDefault();
    var modalName = $(this).attr("data-modal");
    if (modalName === "modalGalleryPhoto") {
      var slideIndex = parseInt($(this).attr("data-slide"));
      modalGalleryVideo.init();
      modalGalleryPhoto.slideTo(slideIndex - 1);
    }
    if (modalName === "modalGalleryVideo") {
      var slideIndex = parseInt($(this).attr("data-slide"));
      var sdf = setTimeout(function () {
        modalGalleryVideo.slideTo(slideIndex - 1); // console.log(slideIndex);
        // console.log(slideIndex);
      }, 500);
    }
    $.fancybox.open({
      src: "#" + modalName,
      type: "inline",
      video: {
        autoStart: false
      },
      touch: false,
      btnTpl: {
        smallBtn: '<div data-fancybox-close class="fancybox-close-small modal-close"><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M27.3798 0.641425C27.1833 0.444543 26.95 0.288344 26.693 0.18177C26.4361 0.0751957 26.1607 0.020338 25.8825 0.020338C25.6044 0.020338 25.329 0.0751957 25.0721 0.18177C24.8151 0.288344 24.5818 0.444543 24.3853 0.641425L14 11.0055L3.61472 0.620187C3.41809 0.423563 3.18467 0.267593 2.92777 0.161181C2.67087 0.0547689 2.39552 2.07177e-09 2.11745 0C1.83938 -2.07177e-09 1.56404 0.054769 1.30714 0.161181C1.05024 0.267593 0.816811 0.423563 0.620187 0.620187C0.423563 0.816811 0.267593 1.05024 0.161181 1.30714C0.054769 1.56404 -2.07177e-09 1.83938 0 2.11745C2.07177e-09 2.39552 0.0547689 2.67087 0.161181 2.92777C0.267593 3.18467 0.423563 3.41809 0.620187 3.61472L11.0055 14L0.620187 24.3853C0.423563 24.5819 0.267593 24.8153 0.161181 25.0722C0.054769 25.3291 0 25.6045 0 25.8825C0 26.1606 0.054769 26.436 0.161181 26.6929C0.267593 26.9498 0.423563 27.1832 0.620187 27.3798C0.816811 27.5764 1.05024 27.7324 1.30714 27.8388C1.56404 27.9452 1.83938 28 2.11745 28C2.39552 28 2.67087 27.9452 2.92777 27.8388C3.18467 27.7324 3.41809 27.5764 3.61472 27.3798L14 16.9945L24.3853 27.3798C24.5819 27.5764 24.8153 27.7324 25.0722 27.8388C25.3291 27.9452 25.6045 28 25.8825 28C26.1606 28 26.436 27.9452 26.6929 27.8388C26.9498 27.7324 27.1832 27.5764 27.3798 27.3798C27.5764 27.1832 27.7324 26.9498 27.8388 26.6929C27.9452 26.436 28 26.1606 28 25.8825C28 25.6045 27.9452 25.3291 27.8388 25.0722C27.7324 24.8153 27.5764 24.5819 27.3798 24.3853L16.9945 14L27.3798 3.61472C28.1868 2.80768 28.1868 1.44846 27.3798 0.641425Z" fill="#000080"/></svg></div>'
      },
      afterShow: function afterShow() {}
    });
  });
});
$(window).on("resize", function () {
  if ($(".header__burger, .header__lang, .header__mobile-nav").hasClass("active")) {
    $(".header__burger, .header__lang, .header__mobile-nav").removeClass("active");
  }
  if ($(".header__basket").hasClass("hide")) {
    $(".header__basket").removeClass("hide");
  }
  $(".header__mobile-nav .menu-item-has-children").removeClass("active");
  $(".header__mobile-nav .menu-item-has-children .sub-menu").slideUp();
  if ($("body").hasClass("lock")) {
    $("body").removeClass("lock");
  }
});
$(document).scroll(function () {
  var windowPosition = $(window).scrollTop();
  if (windowPosition > $(".header").innerHeight() + 200) {
    $(".header").addClass("fixed");
    $(".header").next().css("margin-top", $(".header").innerHeight());
  } else {
    $(".header").removeClass("fixed");
    $(".header").next().css("margin-top", "0");
  }
});
$(window).on("load", function () {
  // $('.preloader').remove();
});