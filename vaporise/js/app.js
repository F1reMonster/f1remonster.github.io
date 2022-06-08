"use strict";

new WOW({
  animateClass: "animate__animated"
}).init();
$(document).ready(function () {
  var $windowWidth = $(window).innerWidth();

  if ($windowWidth > 1023) {
    $(".header__bottom .menu").removeClass("opened");
  }

  $(".select").click(function () {
    $(this).addClass("select--open");
  });
  $(".has-menugroup").click(function (e) {
    e.stopPropagation();
    var idxMenu = $(this).index(".has-menugroup");

    if (!$(this).hasClass("menugroup-opened")) {
      $(".has-menugroup").removeClass("menugroup-opened");
      $(this).addClass("menugroup-opened");
    } else {
      $(this).removeClass("menugroup-opened");
    }

    $(".menu-group").each(function (el) {
      if (el === idxMenu) {
        console.log(idxMenu);

        if (!$(this).hasClass("opened")) {
          $(".menu-group").removeClass("opened");
          $(this).addClass("opened");
        } else {
          $(this).removeClass("opened");
        }
      }
    });
  });
  $(".dropdown__item").click(function (e) {
    e.stopPropagation();
    $(this).parent().parent().removeClass("select--open");
    var dropdownItem = $(this).html();
    $(this).parent().parent().find(".select__placeholder").html(dropdownItem);
    $(this).parent().find(".dropdown__item").removeClass("dropdown__item--active");
    $(this).addClass("dropdown__item--active");
  });
  $(".header__group--menu").click(function () {
    $(".header__bottom .menu").addClass("opened");
  });
  $(".menu__item--close").click(function () {
    $(this).parent().removeClass("opened");
  });
});
$(document).scroll(function () {});
$(document).on("click", function (e) {
  if (!$(e.target).is(".menu-group") && $('.menu-group').hasClass('opened')) {
    $(".menu-group").removeClass("opened");
    $(".has-menugroup").removeClass("menugroup-opened");
  }
});
$(window).resize(function () {
  var $windowWidth = $(window).innerWidth();

  if ($windowWidth > 1023) {
    $(".header__bottom .menu").removeClass("opened");
  }
});