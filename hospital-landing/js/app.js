"use strict";

AOS.init();
$(document).ready(function () {
  // anchor moving
  $('a[href^="#"]').click(function (event) {
    // $(this).parent().removeClass("active");
    // $(this).parent().addClass("active");
    var id = $(this).attr("href");
    console.log(id);
    console.log($(id).offset().top); // if (window.matchMedia("(max-width: 991.98px)").matches) {
    // 	var offset = 0;
    // } else {
    // 	var offset = 70;
    // }

    var target = $(id).offset().top;
    $("html, body").animate({
      scrollTop: target
    }, 500);
    event.preventDefault();
  });
  var plannedSlider = new Swiper(".block__planned-slider .swiper", {
    slidesPerView: "auto",
    spaceBetween: 12,
    // centeredSlides: true,
    // loop: true,
    navigation: {
      nextEl: ".planned-btn-next",
      prevEl: ".planned-btn-prev"
    }
  });
  var testimonialsSlider = new Swiper(".block__testimonials-list .swiper", {
    slidesPerView: "auto",
    spaceBetween: 40,
    // autoHeight: true,
    // centeredSlides: true,
    // loop: true,
    navigation: {
      nextEl: ".testimonial-btn-next",
      prevEl: ".testimonial-btn-prev"
    }
  }); // breakpoint where swiper will be destroyed

  var breakpoint = window.matchMedia("(max-width:413.98px)");
  var advantagesSlider;

  var breakpointChecker = function breakpointChecker() {
    if (breakpoint.matches === true) {
      if (advantagesSlider !== undefined) advantagesSlider.destroy(true, true);
      return;
    } else if (breakpoint.matches === false) {
      return enableSwiper();
    }
  };

  var enableSwiper = function enableSwiper() {
    advantagesSlider = new Swiper(".block__advantages-list .swiper", {
      // loop: true,
      slidesPerView: "auto",
      // centeredSlides: true,
      a11y: true,
      keyboardControl: true,
      grabCursor: true // autoHeight: true,

    });
  };

  breakpoint.addListener(breakpointChecker);
  breakpointChecker(); // load more testimonials

  var testimonials = [{
    comment: "<p>Врач все очень подробно и доступно обьяснила, ответила на все вопросы. Спасибо!</p>",
    author: "Артем Кравченко"
  }, {
    comment: "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora asperiores exercitationem quo laborum deserunt aliquam dolore ullam sit et minus.</p><p>Lorem ipsum dolor sit amet.</p>",
    author: "Jane Smith"
  }, {
    comment: "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p><p>Tempora asperiores exercitationem quo laborum deserunt aliquam dolore ullam sit et minus.</p>",
    author: "Bob Johnson"
  }];
  var currentIndex = 0;
  var numTestimonials = testimonials.length;
  var moreComments = $(".block__testimonials-mobile .btn-secondary");
  var wrapper = $(".wrapper");
  moreComments.click(function () {
    if (currentIndex < numTestimonials) {
      var comment = testimonials[currentIndex].comment;
      var author = testimonials[currentIndex].author;
      var html = "\n        <div class=\"block__testimonials-item\" style=\"display: none;\">\n          <div class=\"testimonial\">\n            ".concat(comment, "\n          </div>\n          <div class=\"author\">").concat(author, "</div>\n        </div>\n      ");
      wrapper.append(html);
      var newTestimonial = $(".block__testimonials-item").last();
      newTestimonial.slideDown(500);
      currentIndex++;
    }

    if (currentIndex === numTestimonials) {
      moreComments.hide();
    }
  });
});
$(window).on("load", function () {
  $(".preloader").remove();
});