"use strict";

// new WOW({
// 	animateClass: "animate__animated",
// }).init();
// =========================================================================
// smooth scroll init
// var scroll = new SmoothScroll("[data-scroll]", {
// 	speed: 500,
// 	speedAsDuration: true,
// });
// =========================================================================
// gsap
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin); // =========================================================================
// sliders

var sliders = {
  educators: {
    spaceBetween: 16,
    slidesPerView: 3,
    watchSlidesProgress: true,
    speed: 800,
    // loop: true,
    navigation: {
      nextEl: ".educators-next",
      prevEl: ".educators-prev"
    },
    breakpoints: {
      0: {
        slidesPerView: "auto",
        spaceBetween: 8,
        freeMode: true
      },
      767: {
        slidesPerView: 3,
        spaceBetween: 8
      },
      1269: {
        slidesPerView: 3
      }
    }
  },
  themes: {
    spaceBetween: 16,
    slidesPerView: 4,
    watchSlidesProgress: true,
    speed: 800,
    // loop: true,
    navigation: {
      nextEl: ".themes-next",
      prevEl: ".themes-prev"
    },
    breakpoints: {
      0: {
        slidesPerView: "auto",
        freeMode: true
      },
      767: {
        slidesPerView: 4,
        spaceBetween: 8
      },
      1024: {
        slidesPerView: 3
      },
      1269: {
        slidesPerView: 4
      }
    }
  },
  programm: {
    spaceBetween: 16,
    speed: 800,
    slidesPerView: "auto",
    freeMode: true
  },
  thestimonials: {
    spaceBetween: 16,
    slidesPerView: 3,
    watchSlidesProgress: true,
    speed: 800,
    breakpoints: {
      0: {
        slidesPerView: "auto",
        freeMode: true
      },
      767: {
        slidesPerView: 3
      }
    }
  },
  subscriptions: {
    spaceBetween: 16,
    slidesPerView: 4,
    watchSlidesProgress: true,
    speed: 800,
    // loop: true,
    navigation: {
      nextEl: ".subs-next",
      prevEl: ".subs-prev"
    },
    breakpoints: {
      0: {
        slidesPerView: "auto",
        freeMode: true
      },
      767: {
        slidesPerView: 4,
        spaceBetween: 8
      },
      1024: {
        slidesPerView: 3
      },
      1269: {
        slidesPerView: 4
      }
    }
  }
}; // =========================================================================
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
} // =========================================================================
// паралакс елементів при наприклад при ховері


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
}; // ====================================================
// scroll anchor


function scrollAnchor(selector) {
  selector.on("click", "a", function () {
    if ($(".header__menu-mobile").hasClass("open")) {
      $(".header__burger").removeClass("opened");
      $(".header__menu-mobile").removeClass("open");
      $("body").removeClass("lock");
      $(".overlay").removeClass("open");
    }

    var $this = $(this),
        href = $this.attr("href"),
        topY = $(href).offset().top - $(".header").innerHeight(),
        idx = $(href).index(),
        duration = $("section").length / 3; // $("html, body").animate(
    // 	{
    // 		scrollTop: topY,
    // 	},
    // 	500
    // );

    gsap.to($(window), {
      duration: duration,
      scrollTo: {
        y: topY,
        autoKill: true
      },
      ease: Power3.easeOut
    });
    return false;
  });
} //select
// $(".select").click(function () {
// 	$(this).addClass("select--open");
// });
// $(".select__dropdown-item").click(function (e) {
// 	e.stopPropagation();
// 	$(this).parent().parent().removeClass("select--open");
// 	const dropdownItem = $(this).html();
// 	$(this).parent().parent().find(".select__placeholder").html(dropdownItem);
// 	$(this)
// 		.parent()
// 		.find(".select__dropdown-item")
// 		.removeClass("select__dropdown-item--active");
// 	$(this).addClass("select__dropdown-item--active");
// });
// preloaderAdd();


$(window).on("load", function () {
  $(".preloader").remove();
});
$(document).ready(function () {
  var educatorsSlider = new Swiper(".block__educators-list", sliders.educators);
  var themesSlider = new Swiper(".block__themes-list", sliders.themes);
  var programmslider = new Swiper(".programm-slider", sliders.programm);
  var testimonialSlider = new Swiper(".block__testimonials-list", sliders.thestimonials);
  var subscriptionsSlider = new Swiper(".block__subscription-list", sliders.subscriptions);
  $(".header__menu-mobile").removeClass("open");
  $(".header__burger").click(function () {
    $(this).toggleClass("opened");
    $(".header__menu-mobile").toggleClass("open");
    $("body").toggleClass("lock");
    $(".overlay").toggleClass("open");
  });
  $(".header__menu-mobile-close").click(function () {
    $(".header__menu-mobile").removeClass("open");
    $("body").removeClass("lock");
  }); // ===================================================
  // tabs

  $(".tab-title").click(function () {
    if (window.matchMedia("(min-width: 768px)").matches) {
      if (!$(this).hasClass("active")) {
        $(".tab-title").removeClass("active");
        $(".tab-content").removeClass("active");
        $(this).addClass("active");
        $(".tab-content").eq($(this).index()).addClass("active");
      }
    } else {
      return;
    }
  }); // ===================================================
  // faq accordeon

  $(".block__title--faq").click(function () {
    $(".block__faq-content").not($(this).next()).slideUp();
    $(".block__faq-item").not($(this).parent()).removeClass("active");
    $(this).parent().toggleClass("active");
    $(this).next().slideToggle();
  }); //=================================================
  // scroll anchor links

  var menu = $(".header__menu-list"),
      menuMobile = $(".header__menu-mobile");
  scrollAnchor(menu);
  scrollAnchor(menuMobile); // ===================================================
  // animation

  if (window.matchMedia("(min-width: 768px)").matches) {
    if ($(".block__hero--main").length > 0) {
      gsap.timeline().from(".block__title--hero", {
        opacity: 0,
        x: -350
      }).from(".block__subtitle--hero", {
        opacity: 0,
        x: -350
      }).from(".block__hero .badge", {
        opacity: 0,
        x: -350,
        rotate: 360
      }).from(".block__hero .btn-primary", {
        scale: 0
      });
      gsap.timeline().from(".block__hero .hero-image", {
        opacity: 0,
        x: 350
      }).from(".block__hero .hero-icon", {
        scale: 0
      }).from(".block__hero .vector-1", {
        scale: 0
      });
    } // ============================================
    // .block__hero-programm


    if ($(".block__hero--programm").length > 0) {
      gsap.timeline().from(".block__title--hero", {
        opacity: 0,
        x: -350
      }).from(".block__subtitle--hero", {
        opacity: 0,
        x: -350
      }).from(".block__hero .badge", {
        opacity: 0,
        x: -350,
        rotate: 360
      }).from(".block__hero .block__rating", {
        scale: 0
      }).from(".according-link", {
        scale: 0
      }).from(".block__hero .btn-primary", {
        scale: 0
      });
      gsap.from(".hero-image", {
        opacity: 0,
        x: 350
      });
    } // ============================================
    // .block__advantages


    if ($(".block__advantages").length > 0) {
      gsap.from(".block__advantages-item", {
        duration: 0.5,
        scrollTrigger: {
          trigger: ".block__advantages",
          start: "top bottom",
          end: "bottom -100%"
        },
        x: 300,
        opacity: 0,
        stagger: 0.2
      });
    } // ============================================
    // .block__strengths


    if ($(".block__strengths").length > 0) {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".block__strengths",
          start: "top bottom",
          end: "bottom -100%"
        }
      }).from(".block__strengths .tab-title", {
        x: -250,
        opacity: 0,
        stagger: 0.2
      }).from(".block__strengths .btn-primary", {
        opacity: 0,
        scale: 0
      });
      gsap.timeline({
        scrollTrigger: {
          trigger: ".block__strengths",
          start: "top bottom",
          end: "bottom -100%"
        }
      }).from(".block__strengths .tab-content", {
        x: 350
      });
    } // ============================================
    // .block__educators


    if ($(".block__educators").length > 0) {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".block__educators",
          start: "top bottom",
          end: "bottom -100%"
        }
      }).from(".block__educators .block__title", {
        opacity: 0,
        scale: 0
      }).from(".card__educator", {
        x: 250,
        opacity: 0,
        stagger: 0.2
      });
    } // ============================================
    // .block__testimonisal


    if ($(".block__testimonials").length > 0) {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".block__testimonials",
          start: "top bottom",
          end: "bottom -100%"
        }
      }).from(".block__testimonials .block__title", {
        opacity: 0,
        scale: 0
      }).from(".block__testimonials-item", {
        y: 250,
        opacity: 0,
        stagger: 0.2
      });
    } // ============================================
    // .block__subscription


    if ($(".block__subscriptions").length > 0) {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".block__subscriptions",
          start: "top bottom",
          end: "bottom -100%"
        }
      }).from(".block__subscriptions .block__title", {
        opacity: 0,
        scale: 0
      }).from(".card__subscription", {
        x: 250,
        opacity: 0,
        stagger: 0.2
      }).from(".block__subscriptions-bottom .item", {
        y: 50,
        opacity: 0,
        stagger: 0.2
      });
    } // ============================================
    // .block__programm


    if ($(".block__programs").length > 0) {
      gsap.from(".block__programs .block__programs-item", {
        duration: 0.3,
        scrollTrigger: {
          trigger: ".block__programs",
          start: "top bottom",
          end: "bottom -100%"
        },
        x: 250,
        opacity: 0,
        stagger: 0.2
      });
    } // ============================================
    // .block__faq


    if ($(".block__faq").length > 0) {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".block__faq",
          start: "top bottom",
          end: "bottom -100%"
        }
      }).from("#faqTitle", {
        opacity: 0,
        scale: 0
      }).from(".block__title--faq", {
        x: -250,
        opacity: 0,
        stagger: 0.2
      });
    } // ============================================
    // .block__themes


    if ($(".block__themes").length > 0) {
      gsap.from(".block__themes .card__themes", {
        duration: 0.3,
        scrollTrigger: {
          trigger: ".block__themes",
          start: "top bottom",
          end: "bottom -100%"
        },
        y: 50,
        opacity: 0,
        stagger: 0.2
      });
    } // ============================================
    // .block__milastones


    if ($(".block__milestones").length > 0) {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".block__milestones",
          start: "top bottom",
          end: "bottom -100%"
        }
      }).from(".block__milestones .block__title", {
        opacity: 0,
        scale: 0
      }).from(".block__milestones .block__milestones-line", {
        opacity: 0,
        x: -350
      }).from(".block__milestones .card__milestone", {
        x: 350,
        opacity: 0,
        stagger: 0.2
      });
    } // ============================================
    // .block__contact-us


    if ($(".block__contact-us").length > 0) {
      gsap.from(".block__contact-us", {
        duration: 0.3,
        scrollTrigger: {
          trigger: ".block__contact-us",
          start: "top bottom",
          end: "bottom -100%"
        },
        y: 250,
        opacity: 0
      });
    }
  }

  new carouselInlineWidget("reviewsio-carousel-widget", {
    /*Your REVIEWS.io account ID:*/
    store: "kiddio.io",
    sku: "",
    lang: "en",
    carousel_type: "default",
    styles_carousel: "CarouselWidget--sideHeader--withcards",

    /*Widget settings:*/
    options: {
      general: {
        /*What reviews should the widget display? Available options: company, product, third_party. You can choose one type or multiple separated by comma.*/
        review_type: "company, product, third_party",

        /*Minimum number of reviews required for widget to be displayed*/
        min_reviews: "1",

        /*Maximum number of reviews to include in the carousel widget.*/
        max_reviews: "20",
        address_format: "CITY, COUNTRY",

        /*Carousel auto-scrolling speed. 3000 = 3 seconds. If you want to disable auto-scroll, set this value to false.*/
        enable_auto_scroll: false
      },
      header: {
        /*Show overall rating stars*/
        enable_overall_stars: false,
        rating_decimal_places: 2
      },
      reviews: {
        /*Show customer name*/
        enable_customer_name: true,

        /*Show customer location*/
        enable_customer_location: true,

        /*Show "verified review" badge*/
        enable_verified_badge: false,

        /*Show "I recommend this product" badge (Only for product reviews)*/
        enable_recommends_badge: false,

        /*Show photos attached to reviews*/
        enable_photos: false,

        /*Show videos attached to reviews*/
        enable_videos: true,

        /*Show when review was written*/
        enable_review_date: false,

        /*Hide reviews written by the same customer (This may occur when customer reviews multiple products)*/
        disable_same_customer: true,

        /*Minimum star rating*/
        min_review_percent: 4,

        /*Show 3rd party review source*/
        third_party_source: true,

        /*Hide reviews without comments (still shows if review has a photo)*/
        hide_empty_reviews: true,

        /*Show product name*/
        enable_product_name: true,

        /*Show only reviews which have specific tags (multiple semicolon separated tags allowed i.e tag1;tag2)*/
        tags: "",

        /*Show branch, only one input*/
        branch: "",
        enable_branch_name: false
      },
      popups: {
        /*Make review items clickable (When they are clicked, a popup appears with more information about a customer and review)*/
        enable_review_popups: false,

        /*Show "was this review helpful" buttons*/
        enable_helpful_buttons: true,

        /*Show how many times review was upvoted as helpful*/
        enable_helpful_count: true,

        /*Show share buttons*/
        enable_share_buttons: true
      }
    },
    translations: {
      verified_customer: "Verified Customer"
    },
    styles: {
      /*Base font size is a reference size for all text elements. When base value gets changed, all TextHeading and TexBody elements get proportionally adjusted.*/
      "--base-font-size": "16px",
      "--base-maxwidth": "100%",

      /*Logo styles:*/
      "--reviewsio-logo-style": "var(--logo-inverted)",

      /*Star styles:*/
      "--common-star-color": "#23226B",
      "--common-star-disabled-color": " rgba(0,0,0,0.25)",
      "--medium-star-size": "112px",
      "--small-star-size": "19px"
      /*Modal*/
      ,
      "--x-small-star-size": "16px",
      "--x-small-star-display": "inline-flex",

      /*Header styles:*/
      "--header-order": "1",
      "--header-width": "280px",
      "--header-bg-start-color": "#0E1311",
      "--header-bg-end-color": "#0E1311",
      "--header-gradient-direction": "135deg",
      "--header-padding": "1.5em",
      "--header-border-width": "0px",
      "--header-border-color": "rgba(0,0,0,0.1)",
      "--header-border-radius": "0px",
      "--header-shadow-size": "0",
      "--header-shadow-color": "rgba(0, 0, 0, 0.05)",

      /*Header content styles:*/
      "--header-star-color": "#ffffff",
      "--header-disabled-star-color": "inherit",
      "--header-heading-text-color": "#ffffff",
      "--header-heading-font-size": "inherit",
      "--header-heading-font-weight": "inherit",
      "--header-heading-line-height": "inherit",
      "--header-heading-text-transform": "inherit",
      "--header-subheading-text-color": "#ffffff",
      "--header-subheading-font-size": "inherit",
      "--header-subheading-font-weight": "300",
      "--header-subheading-line-height": "inherit",
      "--header-subheading-text-transform": "inherit",

      /*Review item styles:*/
      "--item-maximum-columns": "5"
      /*Must be 3 or larger*/
      ,
      "--item-background-start-color": "#FFF0F0",
      "--item-background-end-color": "#FFF0F0",
      "--item-gradient-direction": "135deg",
      "--item-padding": "1.5em",
      "--item-border-width": "0px",
      "--item-border-color": "rgba(0,0,0,0.1)",
      "--item-border-radius": "0px",
      "--item-shadow-size": "10px",
      "--item-shadow-color": "rgba(0,0,0,0)",

      /*Heading styles:*/
      "--heading-text-color": " #0E1311",
      "--heading-text-font-weight": "700",
      "--heading-text-font-family": "Montserrat",
      "--heading-text-line-height": "1.4",
      "--heading-text-letter-spacing": "0",
      "--heading-text-transform": "none",

      /*Body text styles:*/
      "--body-text-color": " #0E1311",
      "--body-text-font-weight": "400",
      "--body-text-font-family": "Montserrat",
      "--body-text-line-height": " 1.4",
      "--body-text-letter-spacing": "0",
      "--body-text-transform": "none",

      /*Scroll button styles:*/
      "--scroll-button-icon-color": "#23226B",
      "--scroll-button-icon-size": "24px",
      "--scroll-button-bg-color": "transparent",
      "--scroll-button-border-width": "0px",
      "--scroll-button-border-color": "rgba(0,0,0,0.1)",
      "--scroll-button-border-radius": "60px",
      "--scroll-button-shadow-size": "0px",
      "--scroll-button-shadow-color": "rgba(0,0,0,0.1)",
      "--scroll-button-horizontal-position": "3px",
      "--scroll-button-vertical-position": "0px",

      /*Badge styles:*/
      "--badge-icon-color": "#0E1311",
      "--badge-icon-font-size": "15px",
      "--badge-text-color": "#0E1311",
      "--badge-text-font-size": "inherit",
      "--badge-text-letter-spacing": "inherit",
      "--badge-text-transform": "inherit",

      /*Author styles:*/
      "--author-font-size": "Montserrat",
      "--author-font-weight": "Montserrat",
      "--author-text-transform": "inherit",

      /*Product photo or review photo styles:*/
      "--photo-video-thumbnail-size": "60px",
      "--photo-video-thumbnail-border-radius": "0px",

      /*Popup styles:*/
      "--popup-backdrop-color": "rgba(0,0,0,0.75)",
      "--popup-color": "#ffffff",
      "--popup-star-color": "inherit",
      "--popup-disabled-star-color": "inherit",
      "--popup-heading-text-color": "inherit",
      "--popup-body-text-color": "inherit",
      "--popup-badge-icon-color": "inherit",
      "--popup-badge-icon-font-size": "19px",
      "--popup-badge-text-color": "inherit",
      "--popup-badge-text-font-size": "14px",
      "--popup-border-width": "0px",
      "--popup-border-color": "rgba(0,0,0,0.1)",
      "--popup-border-radius": "0px",
      "--popup-shadow-size": "0px",
      "--popup-shadow-color": "rgba(0,0,0,0.1)",
      "--popup-icon-color": "#0E1311",

      /*Tooltip styles:*/
      "--tooltip-bg-color": "#0E1311",
      "--tooltip-text-color": "#ffffff"
    }
  });
});
$(window).scroll(function () {
  if ($(this).scrollTop() > 0) {
    $(".header").addClass("fixed");
    $(".header").next().css("margin-top", $(".header").innerHeight());
  } else {
    $(".header").removeClass("fixed");
    $(".header").next().css("margin-top", 0);
  }
});
$(window).resize(function () {
  var $windowWidth = $(window).innerWidth();

  if ($windowWidth > 1023) {
    $(".header__menu-mobile").removeClass("open");
    $("body").removeClass("lock");
  }

  $(".tab-title").click(function () {
    if (window.matchMedia("(min-width: 768px)").matches) {
      if (!$(this).hasClass("active")) {
        $(".tab-title").removeClass("active");
        $(".tab-content").removeClass("active");
        $(this).addClass("active");
        $(".tab-content").eq($(this).index()).addClass("active");
      }
    } else {
      return;
    }
  });
});
$(document).mouseup(function (e) {
  var select = $(".select");

  if (!select.is(e.target) && select.has(e.target).length === 0) {
    select.removeClass("select--open");
  }
});