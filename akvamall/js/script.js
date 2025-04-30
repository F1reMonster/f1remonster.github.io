"use strict";

// 2022-05-15
function truncate_with_ellipsis(s, maxLength) {
  if (s.length > maxLength) {
    return s.substring(0, maxLength) + "...";
  }

  return s;
} // DOM дерево готово


$(document).ready(function () {
  var headerBottomOffset = $(".header__bottom").offset().top;
  var headerBottomHeight = $(".header__bottom").outerHeight();
  var windowWidth = $(window).outerWidth();
  $(window).scroll(function () {
    if (window.pageYOffset > headerBottomOffset) {
      $(".header__bottom").addClass("fixed");
      $(".first-block").css("margin-top", headerBottomHeight);
    } else {
      $(".header__bottom").removeClass("fixed");
      $(".first-block").css("margin-top", "0");
    }
  }); // video popup

  var playButon = $("#play-button");
  playButon.magnificPopup({
    // type: "inline",
    removalDelay: 500,
    type: "iframe",
    iframe: {
      markup: '<div class="mfp-iframe-scaler">' + '<div class="mfp-close"></div>' + '<iframe class="mfp-iframe mfp-with-anim" frameborder="0" src="../videos/video2.mp4" frameborder="0" allowfullscreen allow="autoplay"></iframe>' + "</div>"
    },
    callbacks: {
      beforeOpen: function beforeOpen() {
        this.st.mainClass = this.st.el.attr("data-effect");
      }
    }
  });
  $(".testimonials__content").each(function () {
    var testimonialsContent = $(this).text();
    var contentTrunced = truncate_with_ellipsis(testimonialsContent, 290);
    $(this).html(contentTrunced);
  });
  $(".btn-order").magnificPopup({
    type: "inline",
    removalDelay: 500,
    callbacks: {
      beforeOpen: function beforeOpen() {
        this.st.mainClass = this.st.el.attr("data-effect");
      }
    },
    midClick: true
  });
  $(".btn-compliant").magnificPopup({
    type: "inline",
    removalDelay: 500,
    callbacks: {
      beforeOpen: function beforeOpen() {
        this.st.mainClass = this.st.el.attr("data-effect");
      }
    },
    midClick: true
  });
  $(".button--order").click(function (e) {
    e.preventDefault();
    $("#orderForm").submit();
    $.magnificPopup.close();
  });
  $(".button--compliant").click(function (e) {
    e.preventDefault();
    $("#compliantForm").submit();
    $.magnificPopup.close();
  });
  $(".header__location .dropdown__item").click(function () {
    $.magnificPopup.open({
      items: {
        src: "#notify"
      },
      type: "inline"
    });
  });
  $(".btn-close").click(function () {
    $.magnificPopup.close();
  });
  $(".select").click(function () {
    if (!$(this).hasClass("select--open")) {
      $(this).addClass("select--open");
    } else {
      $(this).removeClass("select--open");
    }
  });
  $(".dropdown__item").click(function (e) {
    e.stopPropagation();

    if (!$(this).parent().parent().parent().hasClass("header__contacts-mobile")) {
      $(this).parent().parent().removeClass("select--open");
      var dropdownItem = $(this).html();
      $(this).parent().parent().find(".select__placeholder").html(dropdownItem);
      $(this).parent().find(".dropdown__item").removeClass("dropdown__item--active");
      $(this).addClass("dropdown__item--active");
    } else {
      $(this).parent().parent().removeClass("select--open");
    }
  });
  $(".burger").click(function () {
    $(this).toggleClass("burger-opened");
    $(".menu__list").toggleClass("menu-opened");
    $("body").toggleClass("locked");

    if ($(".store__menu").hasClass("store__menu--opened")) {
      $(".store__menu").removeClass("store__menu--opened");
    }
  }); // sliders

  var topSlider = new Swiper(".set-slider", {
    loop: true,
    speed: 600,
    // autoplay: {
    // 	delay: 3000,
    // 	disableOnInteraction: false,
    // 	pauseOnMouseEnter: true
    // },
    pagination: {
      el: ".set-pagination",
      clickable: true
    },
    on: {
      slideChange: function slideChange() {
        var currentSlide = this.realIndex + 1; // console.log("currentSlide is:" + currentSlide);

        document.querySelector(".current-slide").innerHTML = currentSlide;
      },
      beforeInit: function beforeInit() {
        var numOfSlides = this.wrapperEl.querySelectorAll(".swiper-slide").length;
        document.querySelector(".total-slides").innerHTML = numOfSlides;
      }
    }
  });
  var innerSlider = new Swiper(".slider-inner", {
    loop: true,
    speed: 600,
    // autoplay: {
    // 	delay: 3000,
    // 	disableOnInteraction: false,
    // 	pauseOnMouseEnter: true
    // },
    slidesPerView: 1,
    spaceBetween: 50,
    pagination: {
      el: ".slider-inner-pagination",
      clickable: true
    }
  });
  var gallerySlider = new Swiper(".production__gallery", {
    loop: true,
    // autoplay: {
    // 	delay: 3000,
    // 	disableOnInteraction: false,
    // },
    slidesPerView: 1,
    spaceBetween: 50,
    pagination: {
      el: ".gallery-pagination",
      clickable: true
    }
  });
  var productOfWeek = new Swiper(".product__list", {
    slidesPerView: 2,
    pagination: {
      el: ".product-pagination",
      clickable: true
    },
    breakpoints: {
      200: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 2
      }
    }
  });
  var testimonialsSlider = new Swiper(".testimonials__list", {
    slidesPerView: 4,
    spaceBetween: 10,
    pagination: {
      el: ".testominials-pagination",
      clickable: true
    },
    scrollbar: {
      el: ".testimonials-scrollbar",
      draggable: true,
      dragSize: 220
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        grid: {
          fill: "row",
          rows: 2
        }
      },
      768: {
        slidesPerView: 2
      },
      930: {
        slidesPerView: 3
      },
      1440: {
        slidesPerView: 4
      }
    }
  });
  var newsSlider = new Swiper(".news__list", {
    slidesPerView: 4,
    pagination: {
      el: ".news-pagination",
      clickable: true
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        grid: {
          fill: "row",
          rows: 2
        }
      },
      768: {
        slidesPerView: 2
      },
      930: {
        slidesPerView: 3
      },
      1440: {
        slidesPerView: 4
      }
    }
  });
  var news2Slider = new Swiper(".news__list--2row", {
    slidesPerView: 4,
    pagination: {
      el: ".news-2row-pagination",
      renderBullet: function renderBullet(index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
      clickable: true
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        grid: {
          fill: "row",
          rows: 2
        }
      },
      768: {
        slidesPerView: 2,
        grid: {
          fill: "row",
          rows: 2
        }
      },
      930: {
        slidesPerView: 3,
        grid: {
          fill: "row",
          rows: 2
        }
      },
      1440: {
        slidesPerView: 4,
        grid: {
          fill: "row",
          rows: 2
        }
      }
    }
  }); //map

  if ($("#mapId").length != 0) {
    var map = L.map("mapId").setView([49.973875, 36.3076281], 15);
    map.scrollWheelZoom.disable();
    L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"]
    }).addTo(map);
    var markerKharkiv = L.marker([49.973875, 36.3076281]).addTo(map);
    var markerLviv = L.marker([49.8547139, 24.035843]).addTo(map);
    $(".adress-city-lviv").click(function () {
      map.flyTo([49.8547139, 24.035843], 15);
    });
    $(".adress-city-kharkiv").click(function () {
      map.flyTo([49.973875, 36.3076281], 15);
    });
    $(".leaflet-marker-pane img").css({
      width: "25px",
      height: "33px",
      "margin-top": "-34px"
    });
  } // water prices calculate
  // init price


  if ($(".water-prices__form")) {
    $(".water-prices__form").each(function () {
      var price = $(this).find("input").attr("data-price");
      var value = $(this).find("input").val();
      var total = price * value;
      $(this).find(".product-price").find("span").html(total);
    });
    $(".btn-plus").click(function (e) {
      e.preventDefault();
      var parentForm = $(this).closest(".water-prices__form");
      var totalPriceBlock = parentForm.find(".product-price").find("span");
      var currentPrice = parentForm.find("input").attr("data-price");

      if (parentForm.find("input").val() < 1999) {
        var value = Number(parentForm.find("input").val()) + 1;
        parentForm.find("input").val(value);
        var currentValue = Number(parentForm.find("input").val());
        var totalPrice = currentPrice * value;
        totalPriceBlock.text(totalPrice);
      }
    });
    $(".btn-minus").click(function (e) {
      e.preventDefault();
      var parentForm = $(this).closest(".water-prices__form");
      var totalPriceBlock = parentForm.find(".product-price").find("span");
      var currentPrice = parentForm.find("input").attr("data-price");

      if (parentForm.find("input").val() != 1) {
        var value = Number(parentForm.find("input").val()) - 1;
        parentForm.find("input").val(value);
        var currentValue = Number(parentForm.find("input").val());
        var totalPrice = currentPrice * value;
        totalPriceBlock.text(totalPrice);
      }
    });
    $(".water-prices__form input").on("input", function () {
      var value = Number($(this).val());
      var price = $(this).attr("data-price");
      var totalPrice = value * price;
      $(this).closest(".water-prices__form").find(".product-price").find("span").text(totalPrice);
    });
  } // catalogue


  $(".store__menu-mobile").click(function () {
    $(".store__menu").addClass("store__menu--opened");
  });
  $(".store__menu-close").click(function () {
    $(".store__menu").removeClass("store__menu--opened");
  });

  if ($(".store-submenu")) {
    $(".store-submenu").hide();
  }

  if ($(".store-menu-item.has-submenu").hasClass("active")) {
    $(".store-menu-item.has-submenu.active").find(".store-submenu").show(); // $('.store-menu-item.has-submenu.active').find('span').css('font-weight', '600');
  }

  $(".store-menu-item-link").click(function (e) {
    if ($(this).parent().hasClass("has-submenu")) {
      e.preventDefault();
      $(this).next(".store-submenu").slideToggle();
      $(this).closest(".has-submenu").toggleClass("active");
    }
  });

  if (window.matchMedia("(max-width: 1365px)").matches) {
    $(".menu-group li").find("ul").parent().addClass("has-submenu");

    if ($(".menu-group .has-submenu")) {
      $(".menu-group .has-submenu").each(function () {
        $(this).find('a').eq(0).addClass("has-submenu-link");
      });
    }
  } else {
    $(".menu-group li").find("ul").parent().removeClass("has-submenu");
    $(".menu-group li").find("ul").parent().removeClass("show-submenu");
    $(".menu-group a").removeClass("has-submenu-link");
  }

  $(".has-submenu-link").click(function (e) {
    e.preventDefault();

    if (!$(this).parent().hasClass("show-submenu")) {
      $(this).parent().addClass("show-submenu");
    } else {
      $(this).parent().removeClass("show-submenu");
    }
  });
});
$(window).resize(function () {
  if (window.matchMedia("(max-width: 1365px)").matches) {
    $(".menu-group li").find("ul").parent().addClass("has-submenu");

    if ($(".menu-group .has-submenu")) {
      $(".menu-group .has-submenu").each(function () {
        $(this).find('a').eq(0).addClass("has-submenu-link");
      });
    }
  } else {
    $(".menu-group li").find("ul").parent().removeClass("has-submenu");
    $(".menu-group li").find("ul").parent().removeClass("show-submenu");
    $(".menu-group a").removeClass("has-submenu-link");
  }
});
$(document).mouseup(function (e) {
  var select = $(".select");

  if (!select.is(e.target) && select.has(e.target).length === 0) {
    select.removeClass("select--open");
  }
});