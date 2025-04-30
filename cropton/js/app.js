"use strict";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin); // ====================================================
// scroll anchor

function scrollAnchor(selector) {
  selector.on("click", "a", function () {
    if ($(".header__group--mobile-menu").hasClass("opened")) {
      // $(".header__burger").removeClass("opened");
      $(".header__group--mobile-menu").removeClass("opened");
      $("body").removeClass("lock");
    }

    var $this = $(this),
        href = $this.attr("href"),
        // topY = $(href).offset().top - $(".header").innerHeight(),
    topY = $(href).offset().top,
        idx = $(href).index(),
        duration = $("section").length / 3;
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
}

function cardHeight() {
  $(".card-percent").css({
    height: "auto"
  });
  var cardDesc = $(".plan-item.active").find($(".card-title"));
  var cardPerc = $(".plan-item.active").find($(".card-percent"));
  cardPerc.css({
    height: cardDesc.innerHeight()
  });
}

$(document).ready(function () {
  cardHeight();

  if (localStorage.getItem(window.location.host) === "theme-dark") {
    $(".switcher").addClass("active");
    $("html").addClass("theme__dark");
    $(".block__hiw-content-img").attr("src", "img/hiw-dark.png");
  } else {
    $(".switcher").removeClass("active");
    $("html").removeClass("theme__dark");
    $(".block__hiw-content-img").attr("src", "img/hiw-light.png");
  }

  if (localStorage.getItem("cookie") === "true") {
    $('.block__cookies').remove();
  } // ===================================================
  // faq accordeon


  $(".block__title--faq-item").click(function () {
    $(".block__faq-content").not($(this).next()).slideUp();
    $(".block__faq-item").not($(this).parent()).removeClass("active");
    $(this).parent().toggleClass("active");
    $(this).next().slideToggle();
  }); // ====================================================
  //  burger menu

  $(".header__burger").click(function () {
    $(".header__group--mobile-menu").addClass("opened");
    $("body").addClass("lock");
  });
  $(".header__menu-mobile-close").click(function () {
    $(".header__group--mobile-menu").removeClass("opened");
    $("body").removeClass("lock");
  }); // =====================================================
  //  theme

  $(".dark").click(function () {
    $(".switcher").addClass("active");
    $("html").addClass("theme__dark");
    $(".block__hiw-content-img").attr("src", "img/hiw-dark.png");
    localStorage.setItem(window.location.host, "theme-dark");
  });
  $(".light").click(function () {
    $(".switcher").removeClass("active");
    $("html").removeClass("theme__dark");
    $(".block__hiw-content-img").attr("src", "img/hiw-light.png");
    localStorage.removeItem(window.location.host);
  });
  var menu = $(".header__menu"),
      menuMobile = $(".header__group--mobile-menu");
  scrollAnchor(menu);
  scrollAnchor(menuMobile);
  $(".col .btn-plan").click(function () {
    if (!$(this).hasClass("active")) {
      $(".btn-plan").removeClass("active");
      $(this).addClass("active");
      $(".range").attr("data-plan", $(this).attr("data-plan"));
      $(".plan-item").removeClass("active");
      $(".plan-item[data-plan=" + $(this).attr("data-plan") + "]").addClass("active");
      cardHeight();
    } else {
      return;
    }
  });
  $(".log-in").click(function (e) {
    e.preventDefault();
    $.fancybox.open({
      src: "#form-modal-login",
      type: "inline",
      touch: false
    });
  });
  $(".sing-up").click(function (e) {
    e.preventDefault();
    $.fancybox.open({
      src: "#form-modal-singup",
      type: "inline",
      touch: false
    });
  });
  $(".btn-create-account").click(function (e) {
    e.preventDefault();
    $.fancybox.close();
    $.fancybox.open({
      src: "#form-modal-singup",
      type: "inline",
      touch: false
    });
  });
  $(".forgot-pwd").click(function (e) {
    e.preventDefault();
    $.fancybox.close();
    $.fancybox.open({
      src: "#form-modal-forgot-pwd",
      type: "inline",
      touch: false
    });
  });
  $('.form-forgot-pwd').submit(function (e) {
    e.preventDefault();
    $.fancybox.close();
    $.fancybox.open({
      src: "#form-modal-sent-pwd",
      type: "inline",
      touch: false
    });
  }); // show/hide password

  $(".form__control-icon--password").click(function (e) {
    if ($(this).parent().find(".form__control--password").attr("type") == "password") {
      $(this).parent().find(".form__control--password").attr("type", "text");
      $(this).addClass("show-pass");
    } else {
      $(this).parent().find(".form__control--password").attr("type", "password");
      $(this).removeClass("show-pass");
    }
  }); // cookies block close

  $('.cookies-close').click(function (e) {
    e.preventDefault();
    $('.block__cookies').remove();
  }); // cookies accept

  $('.cookies-accept').click(function (e) {
    e.preventDefault();
    localStorage.setItem("cookie", "true");
    $('.block__cookies').remove();
  });
});
$(window).on("resize", function () {
  cardHeight();
});
$(window).on("load", function () {
  $(".preloader").remove();
});