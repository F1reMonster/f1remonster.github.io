"use strict";

var body = $("body");
var burger = $(".header__burger");
var mobileMenu = $(".header__nav-mobile");
var mobileMenuClose = $(".header__nav-mobile-close");
var mobileMenuOverlay = $(".header__nav-mobile-overlay");
var mobileMenuItems = $(".header__nav-mobile .nav__item");

function scrollAnchor(selector) {
  selector.on("click", "a", function (e) {
    e.preventDefault();
    var $this = $(this),
        href = $this.attr("href");
    console.log(href);
    var topY = $(href).offset().top - $(".header").innerHeight() + 40;
    $("html, body").animate({
      scrollTop: topY
    }, 500);
  });
} // showing arrow up after scrolling


var addInvisibleSlidesClass = function addInvisibleSlidesClass() {
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
};

$(document).ready(function () {
  // open mobile menu
  if (burger) {
    burger.click(function () {
      body.addClass("lock");
      mobileMenu.addClass("opened");
      setTimeout(function () {
        mobileMenuOverlay.css({
          backgroundColor: "rgba(0, 0, 0, 0.0)",
          zIndex: 50
        });
      }, 200);
    });
    mobileMenuClose.click(function () {
      mobileMenuOverlay.css({
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        zIndex: -1
      });
      setTimeout(function () {
        body.removeClass("lock");
        mobileMenu.removeClass("opened");
      }, 200);
      mobileMenuItems.removeClass("active");
    });
    mobileMenuItems.click(function () {
      if (!$(this).hasClass("active")) {
        mobileMenuItems.removeClass("active");
        $(this).addClass("active");
        $('.header__nav-mobile-body').scrollTop($('.header__nav-mobile-body').position().top - 70);
      } else {
        mobileMenuItems.removeClass("active");
      }
    });
  } // ===============
  // slider hero logos


  var heroLogos = new Swiper(".block__hero-logos .slider-top .swiper", {
    slidesPerView: "auto",
    watchSlidesProgress: true,
    speed: 4000,
    allowTouchMove: false,
    disableOnInteraction: true,
    centeredSlides: true,
    spaceBetween: 40,
    autoplay: {
      delay: 1
    },
    loop: true
  });
  var heroLogosBottom = new Swiper(".block__hero-logos .slider-bottom .swiper", {
    slidesPerView: "auto",
    watchSlidesProgress: true,
    speed: 3500,
    autoplay: {
      delay: 1
    },
    allowTouchMove: false,
    disableOnInteraction: true,
    spaceBetween: 40,
    centeredSlides: true,
    loop: true
  }); // slider our models

  var modelsSlider = new Swiper(".block__models-slider .swiper", {
    slidesPerView: 1,
    allowTouchMove: false,
    autoHeight: true,
    speed: 500,
    spaceBetween: 40,
    effect: "fade",
    // freeMode: true,
    loop: true,
    navigation: {
      nextEl: ".model-next",
      prevEl: ".model-prev"
    }
  });

  if ($(".block__model-experience-slider").length > 0) {
    var expModel = new Swiper(".block__model-experience-slider .swiper", {
      slidesPerView: 1,
      allowTouchMove: false,
      speed: 500,
      loop: true,
      navigation: {
        nextEl: ".model-exp-next",
        prevEl: ".model-exp-prev"
      }
    });
  } // reviews slider


  var reviewsSlider = new Swiper(".block__reviews-slider .swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 500,
    effect: "fade",
    autoHeight: true,
    // loop: true,
    navigation: {
      nextEl: ".reviews-next",
      prevEl: ".reviews-prev"
    }
  }); // gallery slider

  var gallerySlider = new Swiper(".block__gallery-slider .swiper", {
    slidesPerView: 1,
    effect: "fade",
    speed: 500,
    allowTouchMove: false,
    loop: true,
    navigation: {
      nextEl: ".gallery-next",
      prevEl: ".gallery-prev"
    }
  });
  var galleryMobileSlider = new Swiper(".block__gallery-slider-mobile .swiper", {
    slidesPerView: 1,
    speed: 500,
    effect: "fade",
    loop: true,
    navigation: {
      nextEl: ".gallery-mobile-next",
      prevEl: ".gallery-mobile-prev"
    }
  }); // article slider

  var articleSlider = new Swiper(".block__article-slider .swiper", {
    slidesPerView: 1,
    speed: 500,
    effect: "fade",
    loop: true,
    navigation: {
      nextEl: ".block__article-btn--next",
      prevEl: ".block__article-btn--prev"
    }
  });
  $("[data-modal]").click(function (e) {
    e.preventDefault();
    var modalName = $(this).attr("data-modal");
    $.fancybox.open({
      src: "#" + modalName,
      type: "inline",
      video: {
        autoStart: false
      },
      touch: false,
      btnTpl: {
        smallBtn: '<div data-fancybox-close class="fancybox-close-small modal-close"><svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.76556 0H0.336984L7.1227 17H9.55127L2.76556 0Z" fill="black"/><path d="M6.78571 0H9.21429L2.42857 17H0L6.78571 0Z" fill="black"/></svg></div>'
      }
    });
  }); // modal form submit

  $(".modal form").submit(function (e) {
    e.preventDefault(); // find modal name

    var modalName = $(this).parent().parent().attr("id"); // close modal

    $.fancybox.close({
      src: "#" + modalName
    }); // clear inputs

    $(this).find(".form__control").val("");

    if (modalName) {
      var modalMess = "";

      switch (modalName) {
        case "modalFreeQuote":
          modalMess = "#thanksFreeQuote";
          break;

        case "modalRequest":
          modalMess = "#submitRequest";
          break;

        default:
          modalMess = "#thanksFreeQuote";
          break;
      }

      $.fancybox.open({
        src: modalMess,
        type: "inline",
        touch: false,
        btnTpl: {
          smallBtn: '<div data-fancybox-close class="fancybox-close-small modal-close"><svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.76556 0H0.336984L7.1227 17H9.55127L2.76556 0Z" fill="black"/><path d="M6.78571 0H9.21429L2.42857 17H0L6.78571 0Z" fill="black"/></svg></div>'
        }
      });
    }
  }); // hover block__reviews-item

  $(".block__reviews-item").mouseenter(function () {
    $(".block__reviews-item").removeClass("active");
    $(this).addClass("active");
  });

  if ($(".block__services .block__services-title").length > 0 && $(".block__models .block__models-header-actions").length > 0) {
    $(".block__services .block__services-title").css({
      right: "unset"
    });
    $(".block__services .block__services-title").css({
      left: $(".block__models .block__models-header-actions").offset().left
    });
  }

  if ($(".block__services .block__services-title") && !$(".block__models .block__models-header-actions")) {
    if (window.matchMedia("(min-width: 1920px)").matches) {
      $(".block__services .block__services-title").css({
        right: "380px"
      });
    }
  } // auto margin-top equals height block__title + 35px


  var $fontHeight = parseFloat($(".block__service-hero .block__title").css("line-height"));
  var $heroTitleHeight = $(".block__service-hero .block__title").height();

  if (parseInt($fontHeight) === parseInt($heroTitleHeight)) {
    $(".block__service-hero-content").css({
      "margin-top": $heroTitleHeight + 90
    });
  } else if (parseInt($fontHeight * 2) === parseInt($heroTitleHeight)) {
    $(".block__service-hero-content").css({
      "margin-top": $heroTitleHeight + 70
    });
  } else if (parseInt($fontHeight * 3) === parseInt($heroTitleHeight)) {
    $(".block__service-hero-content").css({
      "margin-top": $heroTitleHeight + 35
    });
  } else {
    $(".block__service-hero-content").css({
      "margin-top": $heroTitleHeight + 35
    });
  }

  if (window.matchMedia("(max-width: 992px)").matches) {
    $(".block__service-hero-content").css({
      "margin-top": 0
    });
  }

  if (window.matchMedia("(max-width: 568px)").matches) {
    $(".block__service-hero-content").css({
      "margin-top": 20
    });
  } // form footer validate


  jQuery.validator.methods.matches = function (value, element, params) {
    var re = new RegExp(params);
    return this.optional(element) || re.test(value);
  };

  $("#formRequest").validate({
    errorClass: "is-invalid",
    rules: {
      first_name: {
        required: true,
        matches: "^[a-zA-Zа-яА-ЯіїьЬІЇ]+$",
        minlength: 2
      },
      last_name: {
        required: true,
        matches: "^[a-zA-Zа-яА-ЯіїьЬІЇ]+$",
        minlength: 2
      },
      email: {
        required: true,
        email: true
      },
      message: {
        required: true,
        minlength: 2
      },
      phone: {
        required: true,
        matches: "^(\\d|\\s)+$",
        minlength: 10,
        maxlength: 20
      }
    },
    messages: {
      first_name: {
        matches: "First name must be only letters!"
      },
      last_name: {
        matches: "Last name must be only letters!"
      },
      phone: {
        matches: "Phone number must be only digits!"
      }
    }
  }); // faq accordeon

  $(".block__faq-title").on("click", function () {
    console.log("click");
    $(".block__faq-content").not($(this).next()).slideUp();
    $(".block__faq-item").not($(this).parent()).removeClass("active");
    $(this).parent().toggleClass("active");
    $(this).next().slideToggle();
  }); // faq slider

  var faqSlider = new Swiper(".block__faq-slider .swiper", {
    slidesPerView: 1,
    allowTouchMove: false,
    // loop: true,
    speed: 500,
    effect: "fade",
    navigation: {
      nextEl: ".faq-next",
      prevEl: ".faq-prev"
    },
    on: {
      slideChangeTransitionStart: function slideChangeTransitionStart() {
        $(".block__faq-item.active").find(".block__faq-content").slideUp();
        $(".block__faq-item").removeClass("active");
        $(".block__faq-title").off("click");
      },
      slideChangeTransitionEnd: function slideChangeTransitionEnd() {
        $(".block__faq-title").on("click", function () {
          $(".block__faq-content").not($(this).next()).slideUp();
          $(".block__faq-item").not($(this).parent()).removeClass("active");
          $(this).parent().toggleClass("active");
          $(this).next().slideToggle();
        });
      }
    }
  });

  if ($(".faq-prev").hasClass("swiper-button-disabled") && $(".faq-next").hasClass("swiper-button-disabled")) {
    $(".block__faq-item--nav").hide();
  } // attach files


  $('.form__file-body input[type="file"]').each(function () {
    var input = $(this);
    var parent = input.parent().parent();
    input.on("change", function () {
      var file = this.files[0];
      var fileName = file.name;
      console.log(file.name);

      if (fileName.length > 10) {
        var fileNameStart = fileName.slice(0, 5); // перші 4 символи імені файлу

        var fileNameEnd = fileName.slice(-8); // останні 4 символи імені файлу

        fileName = fileNameStart + "..." + fileNameEnd; // заміна середньої частини на "..."
      }

      if (file) {
        if (file.size <= 5 * 1024 * 1024) {
          // Check if file is smaller than 5MB
          parent.find(".form__file-error").text("");
          parent.find(".form__file-body-content").hide();
          parent.find(".filename").html(fileName);
          parent.find(".form__file-attached").css({
            display: "flex"
          });
          $(this).hide();
        } else {
          parent.addClass("error");
          parent.find(".form__file-error").html("<p>File size should be less than 5MB</p><p>Click for try again!</p>");
          $(this).val("");
          parent.find(".form__file-body-content").hide();
          parent.find(".form__file-attached").hide();
        }
      }
    });
    parent.find(".form__file-btn").on("click", function () {
      parent.find('input[type="file"]').val("");
      parent.find('input[type="file"]').show();
      parent.find(".form__file-error").text("");
      parent.find(".form__file-body-content").show();
      parent.find(".filename").text("");
      parent.find(".form__file-attached").hide();
    });
  }); // oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'

  $(".autosize-textarea").on("keyup input", function () {
    $(this).css("height", "").css("height", this.scrollHeight + (this.offsetHeight - this.clientHeight));
  });
});
var readFaq = $(".block__service-hero--faq");
scrollAnchor(readFaq);
$(document).scroll(function () {
  var windowPosition = $(window).scrollTop() + 116;

  if (windowPosition > 200) {
    $(".header").addClass("fixed");
    $(".header").next().css("margin-top", $(".header").innerHeight());
  } else {
    $(".header").removeClass("fixed");
    $(".header").next().css("margin-top", "0");
  }
});
$(document).mouseup(function (e) {
  var hireModelsSearch = $(".item-search input");

  if (!hireModelsSearch.is(e.target) && hireModelsSearch.has(e.target).length === 0) {
    hireModelsSearch.closest(".autoComplete_wrapper").removeClass("active");
  }
});
$(window).on("load", function () {
  $(".preloader").remove();
});
$(window).resize(function () {
  if ($(".block__services .block__services-title").length > 0 && $(".block__models .block__models-header-actions").length > 0) {
    $(".block__services .block__services-title").css({
      right: "unset"
    });
    $(".block__services .block__services-title").css({
      left: $(".block__models .block__models-header-actions").offset().left
    });

    if (window.matchMedia("(max-width: 1040px)").matches) {
      $(".block__services .block__services-title").removeAttr("style");
    }
  } // font height


  var $fontHeight = parseFloat($(".block__service-hero .block__title").css("line-height"));
  var $heroTitleHeight = $(".block__service-hero .block__title").height();

  if (parseInt($fontHeight) === parseInt($heroTitleHeight)) {
    $(".block__service-hero-content").css({
      "margin-top": $heroTitleHeight + 90
    });
  } else if (parseInt($fontHeight * 2) === parseInt($heroTitleHeight)) {
    $(".block__service-hero-content").css({
      "margin-top": $heroTitleHeight + 70
    });
  } else if (parseInt($fontHeight * 3) === parseInt($heroTitleHeight)) {
    $(".block__service-hero-content").css({
      "margin-top": $heroTitleHeight + 35
    });
  } else {
    $(".block__service-hero-content").css({
      "margin-top": $heroTitleHeight + 35
    });
  }

  if (window.matchMedia("(max-width: 992px)").matches) {
    $(".block__service-hero-content").css({
      "margin-top": 0
    });
  }

  if (window.matchMedia("(max-width: 568px)").matches) {
    $(".block__service-hero-content").css({
      "margin-top": 20
    });
  }
});
$(function () {
  var models = [{
    label: "Jessica H",
    photoJPG: "img/models/model-01_.jpg",
    photoWEBp: "img/models/model-01_.webp",
    link: "#link-to-model-Jessica"
  }, {
    label: "Amber",
    photoJPG: "img/models/model-06.jpg",
    photoWEBp: "img/models/model-06.webp",
    link: "#link-to-model-Amber"
  }, {
    label: "Nelson",
    photoJPG: "img/models/model-07.jpg",
    photoWEBp: "img/models/model-07.webp",
    link: "#link-to-model-Nelson"
  }, {
    label: "Casey",
    photoJPG: "img/models/model-08.jpg",
    photoWEBp: "img/models/model-08.webp",
    link: "#link-to-model-Casey"
  }, {
    label: "Annamarie",
    photoJPG: "img/models/model-09.jpg",
    photoWEBp: "img/models/model-09.webp",
    link: "#link-to-model-Annamarie"
  }, {
    label: "Michael",
    photoJPG: "img/models/model-10.jpg",
    photoWEBp: "img/models/model-10.webp",
    link: "#link-to-model-Michael"
  }, {
    label: "Christina",
    photoJPG: "img/models/model-05.jpg",
    photoWEBp: "img/models/model-05.webp",
    link: "#link-to-model-christina"
  }, {
    label: "Chris",
    photoJPG: "img/models/model-11.jpg",
    photoWEBp: "img/models/model-11.webp",
    link: "#link-to-model-chris"
  }, {
    label: "Michael",
    photoJPG: "img/models/model-10.jpg",
    photoWEBp: "img/models/model-10.webp",
    link: "#link-to-model-Michael"
  }, {
    label: "Christina",
    photoJPG: "img/models/model-05.jpg",
    photoWEBp: "img/models/model-05.webp",
    link: "#link-to-model-christina"
  }, {
    label: "Chris",
    photoJPG: "img/models/model-11.jpg",
    photoWEBp: "img/models/model-11.webp",
    link: "#link-to-model-chris"
  }, {
    label: "Anna Mria",
    photoJPG: "img/models/model-10.jpg",
    photoWEBp: "img/models/model-10.webp",
    link: "#link-to-model-Michael"
  }, {
    label: "Kianna",
    photoJPG: "img/models/model-05.jpg",
    photoWEBp: "img/models/model-05.webp",
    link: "#link-to-model-christina"
  }, {
    label: "Chribris",
    photoJPG: "img/models/model-11.jpg",
    photoWEBp: "img/models/model-11.webp",
    link: "#link-to-model-chris"
  }, {
    label: "Brianna",
    photoJPG: "img/models/model-11.jpg",
    photoWEBp: "img/models/model-11.webp",
    link: "#link-to-model-chris"
  }];

  if ($("#hireModelsSearch").length > 0) {
    $("#hireModelsSearch").autocomplete({
      appendTo: $("#hireModelsSearch").next(),
      minLength: 3,
      source: function source(request, response) {
        // пошук по початкових літерах
        var matches = models.filter(function (model) {
          return model.label.toLowerCase().startsWith(request.term.toLowerCase());
        });
        response(matches);
      },
      focus: function focus(event, ui) {
        $("#hireModelsSearch").val(ui.item.label);
        return false;
      },
      select: function select(event, ui) {
        $("#hireModelsSearch").val(ui.item.label);
        return false;
      }
    }).autocomplete("instance")._renderItem = function (ul, item) {
      return $("<li>").append("<a class='autocomplete__item' href='" + item.link + "'><div class='autocomplete__item-img'><img src='" + item.photoJPG + "'></div><div class='autocomplete__item-name'><span>" + item.label + "</span></div></a>").appendTo(ul);
    };
  }
});