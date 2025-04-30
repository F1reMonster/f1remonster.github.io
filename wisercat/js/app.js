"use strict";

function counterUp() {
  $(".block__benefits-item-score").each(function () {
    var $this = $(this),
        countTo = $this.attr("data-count");
    $({
      countNum: $this.find("span").text()
    }).animate({
      countNum: countTo
    }, {
      duration: 5000,
      easing: "linear",
      step: function step() {
        $this.find("span").text(Math.floor(this.countNum));
      },
      complete: function complete() {
        $this.find("span").text(this.countNum); //alert('finished');
      }
    });
  });
}

$(document).scroll(function () {
  var benefitsOffsetTop = $(".block__benefits-list").offset().top,
      windowScrollPosition = $(window).scrollTop() + $(window).height();

  if (benefitsOffsetTop < windowScrollPosition) {
    counterUp();
  }
});
$(document).ready(function () {
  $(".header__burger").click(function () {
    $(".header__nav").addClass("menu-opened");
  });
  $(".menu__close").click(function () {
    $(".header__nav").removeClass("menu-opened");
  }); // text-slider

  if ($(".text-slider").length) {
    var $textSliderItem = $(".text-slider-item");
    var u = 0;
    setInterval(function () {
      $textSliderItem.eq(u % $textSliderItem.length).removeClass("is-visible").addClass("is-hidden");
      u++;
      $textSliderItem.eq(u % $textSliderItem.length).removeClass("is-hidden").addClass("is-visible");
    }, 2500);
  }

  var partnersLogo = new Swiper(".block__partners-list", {
    spaceBetween: 60,
    speed: 2000,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    loop: true,
    slidesPerView: "auto",
    centeredSlides: true
  });
});
$(document).mouseup(function (e) {
  // const submenu = $(".submenu");
  var menu = $(".header__nav"); // const select = $(".select");
  // if (!submenu.is(e.target) && submenu.has(e.target).length === 0) {
  // 	$(".has-submenu").removeClass("submenu-opened");
  // }

  if (!menu.is(e.target) && menu.has(e.target).length === 0) {
    menu.removeClass("menu-opened");
  } // if (!select.is(e.target) && select.has(e.target).length === 0) {
  // 	select.removeClass("select--open");
  // }

});