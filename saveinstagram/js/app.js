"use strict";

//select
$(".select").click(function () {
  $(this).toggleClass("select--open");
});
$(".select__dropdown-item").click(function (e) {
  e.stopPropagation();
  $(this).parent().parent().removeClass("select--open");
  var dropdownItem = $(this).html();
  $(this).parent().parent().find(".select__placeholder").html(dropdownItem);
  $(this).parent().find(".select__dropdown-item").removeClass("select__dropdown-item--active");
  $(this).addClass("select__dropdown-item--active");
});
$(window).on("load", function () {
  $(".preloader").remove();
});
$(document).ready(function () {
  $(".header__burger").click(function () {
    // $(".header__menu").toggleClass('opened');
    $(".header__menu").slideToggle();
    $(".header__menu").toggleClass("opened");
    $("body").toggleClass("lock");
  });
  $(".form__control").on("focus blur keyup", function (e) {
    e.preventDefault();

    if ($(this).val().length) {
      $(".search").addClass("clear");
    } else {
      $(".search").removeClass("clear");
    }
  });
  $(".clear").click(function (e) {
    e.preventDefault();
    $(".form__control").val("");
    $(".search").removeClass("clear");
  });
  $(".paste").click(function (e) {
    e.preventDefault();
    $(".form__control").focus();
    navigator.clipboard.readText().then(function (clipText) {
      return $(".form__control").val(clipText);
    });
    $(".search").addClass("clear");
  }); // progress

  var numElement = $(".num");
  var num = parseInt(numElement.text());
  var count = 0;
  var time = 2000 / num;
  var progressBar = $(".progress-bar");
  setInterval(function () {
    if (count == num) {
      clearInterval();
    } else {
      count += 1;
      numElement.text(count);
    }
  }, time);
  progressBar.css('stroke-dashoffset', 870 - 870 * (num / 100)); // ===================================================
  // tabs

  $(".tab-title").click(function () {
    if (!$(this).hasClass("active")) {
      $(".tab-title").removeClass("active");
      $(".tab-content").removeClass("active");
      $(this).addClass("active");
      $(".tab-content").eq($(this).index()).addClass("active");
    }
  });
});
$(window).resize(function () {
  var windowWidth = $(window).innerWidth();

  if (windowWidth > 1023) {
    $(".header__menu").show();
  }

  if (windowWidth < 1024) {
    $(".header__menu").hide();

    if ($(".header__menu").hasClass("opened")) {
      $(".header__menu").removeClass("opened");
      $(".header__menu").css("display", "none");
      $("body").removeClass("lock");
    }
  }
});
$(document).scroll(function () {});
$(document).mouseup(function (e) {
  var select = $(".select");

  if (!select.is(e.target) && select.has(e.target).length === 0) {
    select.removeClass("select--open");
  }
});