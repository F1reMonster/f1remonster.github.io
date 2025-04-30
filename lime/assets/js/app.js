let $device_width = $(window).width();
let $windowPosition = $(window).scrollTop();

// function detect is element present in viewport
$.fn.isInViewport = function () {
	var elementTop = $(this).offset().top;
	var elementBottom = elementTop + $(this).outerHeight();
	var viewportTop = $(window).scrollTop();
	var viewportBottom = viewportTop + $(window).height();
	return elementBottom > viewportTop && elementTop < viewportBottom;
};

// fix mobile browsers
// add to css
// height: 100vh; /* Use vh as a fallback for browsers that do not support Custom Properties */
// height: calc(var(--vh, 1vh) * 100);
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

$(document).ready(function () {
	$device_width = $(window).width();

	// ========= MENU ========= //
	// desktop menu open/close
	$(".menu__button").on("click", function () {
		if ($device_width < 1023) {
			$(".menu").toggleClass("open");
			$(".menu__body").toggleClass("open");
			$("body").toggleClass("lock");
		} else {
			$("body").removeClass("lock");
			$(".menu").toggleClass("open");
			$(".menu__body").toggleClass("open");
		}
	});

	// anchor click 
	$('a[href*="#"]').on("click", function () {
		if ($(".menu").hasClass("open")) {
			$(".menu").removeClass("open");
			$(".menu__body").removeClass("open");
			$("body").removeClass("lock");
		}
	});


	// $("a").on("click", function (event) {
	// 	if (this.hash !== "") {
	// 		event.preventDefault();

	// 		var hash = this.hash;
	// 		var $scrollTop = $(hash).offset().top;

	// 		if ($(".menu").hasClass("open")) {
	// 			$(".menu").removeClass("open");
	// 			$(".menu__body").removeClass("open");
	// 			$("body").removeClass("lock");
	// 		}

	// 		if ($device_width < 1024) {
	// 			$scrollTop = $(hash).offset().top - 60;
	// 		} else {
	// 			$scrollTop = $(hash).offset().top - 120;
	// 		}

	// 		$("html, body").animate(
	// 			{
	// 				scrollTop: $scrollTop,
	// 			},
	// 			800,
	// 			function () {
	// 				window.location.hash = hash;
	// 			}
	// 		);
	// 	}
	// });

	// reviews slider
	const reviewsSlider = new Swiper(".block__reviews-slider .swiper", {
		spaceBetween: 60,
		slidesPerView: 3,
		speed: 600,
		grid: {
			rows: 2,
			fill: "columns",
		},
		pagination: {
			el: ".block__reviews-slider .bullets-pagination",
			clickable: true,
		},
		navigation: {
			nextEl: ".block__reviews-slider-actions .btn-next",
			prevEl: ".block__reviews-slider-actions .btn-prev",
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				grid: {
					rows: 1,
					fill: "rows",
				},
			},
			575: {
				slidesPerView: 2,
				grid: {
					rows: 2,
					fill: "columns",
				},
			},
			767: {
				slidesPerView: 3,
				grid: {
					rows: 2,
					fill: "columns",
				},
			},
		},
	});

	// show full reviews
	$(".block__reviews-item-link a").on("click", function (e) {
		e.preventDefault();
		let $reviewText = '<div class="block__reviews-show-content">' + $(this).closest(".block__reviews-item").find(".block__reviews-item-text").text() + "</div>";
		$("#reviewContent").html('<button class="btn btn--modal btn-close-modal"><span class="icon icon--close"></span></button>' + $reviewText);

		$.fancybox.open({
			src: "#reviewContent",
			type: "inline",
			opts: {
				closeButton: false,
				touch: false,
				infobar: false,
				toolbar: false,
				smallBtn: false,
				// clickOutside: false,
				// clickSlide: false
				beforeLoad: function (instance, slide) {
					$device_width = $(window).width();
					$device_width > 1023 ? $(".menu").addClass("hide") : "";
				},
				afterClose: function () {
					$device_width = $(window).width();
					if ($device_width > 1023) {
						setTimeout(() => {
							$(".menu").removeClass("hide");
						}, 500);
					}
				},
			},
		});
	});

	// ========= MODALS ========= //
	$("[data-modal]").click(function () {
		$btn = $(this);
		let $modalName = $btn.data("modal");
		$.fancybox.open({
			src: "#" + $modalName,
			type: "inline",
			opts: {
				closeButton: false,
				touch: false,
				infobar: false,
				toolbar: false,
				smallBtn: false,
				// clickOutside: false,
				// clickSlide: false
			},
		});
	});

	// modal close
	$(document).on("click", ".modal .btn-close-modal", function () {
		let $modalName = $(this).closest(".fancybox-content").attr("id");

		$.fancybox.close({
			src: "#" + $modalName,
		});
	});

	// footer up button
	$(".arrow-up").each(function () {
		$(this).click(function (e) {
			e.preventDefault();
			e.stopPropagation();
			// var winHeight = $(document).height();
			// var step = 12;
			// var timeToScroll = winHeight / step;
			$("html, body").animate(
				{
					scrollTop: 0,
				},
				
			);
		});
	});
});

$(window).resize(function () {
	$device_width = $(window).width();
	vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", `${vh}px`);

	if ($device_width < 1024) {
		$(".menu").removeClass("open");
		$(".menu__body").removeClass("open");
		$(".menu").removeAttr("style");
		$(".menu__body").removeAttr("style");

		$("body").removeClass("lock");
	}

	if ($device_width > 1024) {
		$(".header").removeClass("fixed");
		$(".menu").removeClass("fixed");
		$(".header").next().css("margin-top", "0");
	}
});

$(window).scroll(function () {
	$windowPosition = $(window).scrollTop();
	// if ($(".footer").length > 0) {
	// 	if ($device_width > 1023) {
	// 		if ($(".footer").isInViewport()) {
	// 			$(".menu").css({ bottom: $(".footer").innerHeight() + 24 + "px" });
	// 			$(".menu__body").css({ bottom: $(".footer").innerHeight() + 24 - $(".menu__body").innerHeight() + $(".menu__button").innerHeight() + "px", "transform-origin": "top right" });
	// 		} else {
	// 			$(".menu").removeAttr("style");
	// 			$(".menu__body").removeAttr("style");
	// 		}
	// 	}
	// }

	$(".menu").removeClass("open");
	$(".menu__body").removeClass("open");

	//  menu  fixed
	if ($windowPosition > $(".header").innerHeight()) {
		$(".header").addClass("fixed");
		$(".menu").addClass("fixed");
		$(".menu__body").addClass("fixed");
		$(".header").next().css("margin-top", $(".header").innerHeight());
	} else {
		$(".header").removeClass("fixed");
		$(".menu").removeClass("fixed");
		$(".menu__body").removeClass("fixed");
		$(".header").next().css("margin-top", "0");
	}
});

$(document).mouseup(function (e) {
	var menu = $(".menu");
	var menuBody = $(".menu__body");

	// Перевіряємо, чи клік відбувся поза .menu та .menu__body
	if (!menu.is(e.target) && menu.has(e.target).length === 0 && !menuBody.is(e.target) && menuBody.has(e.target).length === 0) {
		// Якщо так, прибираємо клас open
		menu.removeClass("open");
		menuBody.removeClass("open");
	}
});

$(window).on("load", function () {
	// $('.preloader').remove();
});
