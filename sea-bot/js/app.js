"use strict";

// паралакс елементів при наприклад при ховері
function parallax() {
  var amountMovedX = e.clientX * -0.3 / 8;
  var amountMovedY = e.clientY * -0.3 / 8;
  $(this).css("transform", "translate(" + amountMovedX + "px," + amountMovedY + "px)");
} // scroll anchor


function scrollAnchor(selector) {
  selector.on("click", "a", function (e) {
    e.preventDefault();

    if ($(".header__menu").hasClass("open")) {
      $(".header__menu").removeClass("open");
      $("body").removeClass("lock");
    }

    var $this = $(this),
        href = $this.attr("href");
    var topY = $(href).offset().top - $(".header").innerHeight() - 80;
    $("html, body").animate({
      scrollTop: topY
    }, 500);
  });
} // showing arrow up after scrolling


function arrowUpVisible() {
  var arrow = $(".btn-arrow-up");
  var windowHeight = $(window).outerHeight();
  var opacityVision = pageYOffset / windowHeight / 4; // console.log("pageYOffset " + pageYOffset + '\n' + "windowHeight " + windowHeight + "\n" + "opacity " + opacityVision);

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
} // windows on load


$(window).on("load", function () {
  $(".preloader").remove();
});
$(document).ready(function () {
  // ===================================================
  // header anchor
  var headerMenu = $(".header__menu");
  var footerMenu = $(".footer__menu");
  scrollAnchor(headerMenu);
  scrollAnchor(footerMenu); // faq accordeon

  $(".block__title--faq").click(function () {
    $(".block__faq-content").not($(this).next()).slideUp();
    $(".block__faq-item").not($(this).parent()).removeClass("active");
    $(this).parent().toggleClass("active");
    $(this).next().slideToggle();
  }); // $(".block__hero").on("mousemove", function (e) {
  // 	let amountMovedX = (e.clientX * -0.3) / 8;
  // 	let amountMovedY = (e.clientY * -0.3) / 8;
  // 	$(".parallaxed").css("transform", "translate(" + amountMovedX + "px," + amountMovedY + "px)");
  // });
  // advantages tabs

  $(".block__advantages .tab-title").click(function () {
    if (!$(this).hasClass("active")) {
      $(".block__advantages .tab-title").removeClass("active");
      $(".block__advantages .tab-content").removeClass("active");
      $(this).addClass("active");
      $(".block__advantages .tab-content").eq($(this).index()).addClass("active");
    }
  }); // advantages tab content perfectScrollbar

  var allTabContent = document.querySelectorAll(".block__advantages-tab-contents .tab-content p");
  allTabContent.forEach(function (item) {
    var ps = new PerfectScrollbar(item);
    ps.update();
  }); // card info perfectscrollbar

  var cardInfo = document.querySelectorAll(".card__info");
  cardInfo.forEach(function (item) {
    var ps = new PerfectScrollbar(item);
    ps.update();
  }); // cardUsersContent

  var cardUsersContent = document.querySelectorAll(".card-users__info-content");
  cardUsersContent.forEach(function (item) {
    var ps = new PerfectScrollbar(item);
    ps.update();
  }); // open modal

  $("[data-modal]").click(function (e) {
    e.preventDefault();
    var modalName = $(this).attr("data-modal"); // $(this).parent().parent().find('.row').css({ height: "auto" });
    // $(this).parent().parent().find('.row-bottom').css({ opacity: 0, zIndex: -1})

    if ($("#" + modalName).hasClass("modal--tariff")) {
      $("#".concat(modalName, " .row")).css({
        height: "460px"
      });
      $("#".concat(modalName, " .row-bottom")).css({
        opacity: 1,
        zIndex: 1
      });

      if ($(".show-all").hasClass("showed")) {
        $(".show-all").html("show all");
        $(".show-all").removeClass("showed");
      }
    }

    $.fancybox.open({
      src: "#" + modalName,
      type: "inline",
      video: {
        autoStart: false
      },
      touch: false,
      btnTpl: {
        smallBtn: '<div data-fancybox-close class="fancybox-close-small modal-close"><svg width="35" height="28" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.9869 14.7805C12.4774 3.87008 3.63487 6.38294 3.26 6.49837C2.96533 6.55794 2.68635 6.47766 2.47875 6.27355C2.27115 6.06944 2.15019 5.75651 2.14002 5.3972C2.12984 5.0379 2.2312 4.65866 2.42386 4.33515C2.61652 4.01165 2.88631 3.76768 3.17939 3.65193C5.22386 3.12731 7.24817 3.10665 9.13472 3.59116C10.3133 3.87422 11.4279 4.35203 12.4525 5.0135C14.6109 6.40299 16.7791 8.86903 18.1812 13.2202C21.6907 24.1307 30.5333 21.6178 30.9081 21.5024C31.2028 21.4428 31.4818 21.5231 31.6894 21.7272C31.897 21.9313 32.0179 22.2443 32.0281 22.6036C32.0383 22.9629 31.9369 23.3421 31.7443 23.6656C31.5516 23.9891 31.2818 24.2331 30.9887 24.3488C28.9443 24.8735 26.92 24.8941 25.0334 24.4096C22.0823 23.699 18.1342 21.4249 15.9869 14.7805Z" stroke="#072E5C" stroke-width="3"/><path d="M18.1811 14.7805C21.6906 3.87008 30.5331 6.38294 30.908 6.49837C31.2026 6.55794 31.4816 6.47766 31.6892 6.27355C31.8968 6.06944 32.0178 5.75651 32.028 5.3972C32.0381 5.0379 31.9368 4.65866 31.7441 4.33515C31.5515 4.01165 31.2817 3.76768 30.9886 3.65193C28.9441 3.12731 26.9198 3.10665 25.0332 3.59116C23.8546 3.87422 22.7401 4.35203 21.7155 5.0135C19.557 6.40299 17.3888 8.86903 15.9867 13.2202C12.4772 24.1307 3.63472 21.6178 3.25985 21.5024C2.96517 21.4428 2.6862 21.5231 2.4786 21.7272C2.27099 21.9313 2.15004 22.2443 2.13986 22.6036C2.12969 22.9629 2.23104 23.3421 2.4237 23.6656C2.61636 23.9891 2.88615 24.2331 3.17924 24.3488C5.2237 24.8735 7.24802 24.8941 9.13457 24.4096C12.0857 23.699 16.0338 21.4249 18.1811 14.7805Z" stroke="#072E5C" stroke-width="3"/></svg></div>'
      }
    });
  }); // modal form submit

  $(".modal form").submit(function () {
    e.preventDefault(); // find modal name

    var modalName = $(this).parent().parent().attr("id"); // close modal

    $.fancybox.close({
      src: "#" + modalName
    }); // clear inputs

    $(this).find(".form__control").val("");
  }); // header menu

  $(".header-menu").click(function (e) {
    e.preventDefault();
    $(".header__menu").addClass("open");

    if (window.matchMedia("(max-width: 991.98px)").matches) {
      $("body").addClass("lock");
    }
  }); // header menu close

  $(".header__menu-close").click(function () {
    $(".header__menu").removeClass("open");

    if (window.matchMedia("(max-width: 991.98px)").matches) {
      $("body").removeClass("lock");
    }
  }); // video playback

  $(".video-btn").click(function () {
    var video = $("#" + $(this).attr("data-video"));

    if (video.get(0).paused) {
      video.get(0).play();
      $(this).css("display", "none");
    } else {
      video.get(0).pause();
    }
  });
  $("video").click(function () {
    var video = $(this);

    if (video.get(0).paused) {
      video.get(0).play();
    } else {
      video.get(0).pause();
      $("button[data-video=" + $(this).attr("id") + "]").css("display", "block");
    }
  }); // fullscreen

  $(".video-fullscreen").click(function () {
    $("#" + $(this).attr("data-video")).get(0).requestFullscreen();
  }); // modal tariffs show all content

  $(".show-all").click(function (e) {
    e.preventDefault();

    if (!$(this).hasClass("showed")) {
      $(this).parent().parent().find(".row").css({
        height: "auto"
      });
      $(this).parent().parent().find(".row-bottom").css({
        opacity: 0,
        zIndex: -1
      });
      $(this).addClass("showed");
      $(this).html("hide all");
    } else {
      $(this).parent().parent().find(".row").css({
        height: "460"
      });
      $(this).parent().parent().find(".row-bottom").css({
        opacity: 1,
        zIndex: 1
      });
      $(this).removeClass("showed");
      $(this).html("show all");
    }
  }); // guide navigation
  // open groups

  $(".block__guide-navigation-group h6").click(function () {
    // $(".block__guide-navigation-group ul").not($(this).next()).slideUp();
    // $(".block__guide-navigation-group h6").not($(this)).removeClass("opened");
    $(this).toggleClass("opened");
    $(this).next().slideToggle();
  }); // guide navigation
  // item scroll to page anchor

  $(".block__guide-navigation-group li").click(function () {
    if (!$(this).hasClass("active")) {
      var groupNumber = $(this).parent().parent().index();
      var itemNumber = $(this).index();
      $(".block__guide-navigation-group li").removeClass("active");
      $(this).addClass("active");
      var topY = $(".block__guide-group").eq(groupNumber).find("h6").eq(itemNumber).offset().top - $(".header").innerHeight() - 20;
      $("html, body").animate({
        scrollTop: topY
      }, 500);

      if (window.matchMedia("(max-width: 991.98px)").matches) {
        $('.block__guide-navigation').removeClass('active');
      }
    } else {
      var _groupNumber = $(this).parent().parent().index();

      var _itemNumber = $(this).index();

      var _topY = $(".block__guide-group").eq(_groupNumber).find("h6").eq(_itemNumber).offset().top - $(".header").innerHeight() - 20;

      $("html, body").animate({
        scrollTop: _topY
      }, 500);

      if (window.matchMedia("(max-width: 991.98px)").matches) {
        $('.block__guide-navigation').removeClass('active');
      }
    }
  }); // guide navigation mobile

  $('.block__guide-navigation-mobile').click(function () {
    $('.block__guide-navigation').addClass('active');
  });
});
$(window).scroll(function () {
  if ($(window).scrollTop() > 0) {
    $(".header").addClass("fixed");
    $(".header").next().css("margin-top", $(".header").innerHeight());
  } else {
    $(".header").removeClass("fixed");
    $(".header").next().css("margin-top", 0);
  }

  arrowUpVisible();
});
$(document).mouseup(function (e) {
  var menu = $(".header__menu");
  var guideNavigation = $('.block__guide-navigation');

  if (!menu.is(e.target) && menu.has(e.target).length === 0) {
    menu.removeClass("open");
    $("body").removeClass("lock");
  }

  if (window.matchMedia("(max-width: 991.98px)").matches) {
    if (!guideNavigation.is(e.target) && guideNavigation.has(e.target).length === 0) {
      guideNavigation.removeClass("active");
    }
  }
});