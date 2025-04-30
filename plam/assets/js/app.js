let $device_width = $(window).width();
let $windowPosition = $(window).scrollTop();
let $device_width_on_load = $device_width;

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

	// ========== MENU ========== //
	// ========= slide menu ===== //
	if ($device_width > 1150) {
		$(".menu__list > .menu-item").on("mouseenter", function () {
			var $pos = $(this).position();
			var $width = $(this).outerWidth();
			$(".menu__wrapper .menu__marker").css({
				opacity: 1,
				left: +$pos.left,
				width: $width,
			});

			if ($(this).hasClass("has-children")) {
				if ($pos.left > $(".menu__wrapper").outerWidth() / 2) {
					var $submenuWidth = $pos.left + $width;
					$(this).find(".submenu").css({
						left: "unset",
						right: 0,
						width: $submenuWidth,
					});
				} else {
					var $submenuWidth = $(".menu__wrapper").outerWidth() - $pos.left;

					$(this).find(".submenu").css({
						width: $submenuWidth,
					});
				}
			}
		});

		$(".menu__list").on("mouseleave", function () {
			$(".menu__wrapper .menu__marker").css({
				opacity: 0,
			});

			// setTimeout(function () {
			// 	$(".menu__wrapper .menu__marker").removeAttr("style");
			// 	$(".submenu").removeAttr("style");
			// }, 200);
		});
	}

	if ($device_width < 1150) {
		$(".menu__burger").on("click", function () {
			if (!$(this).hasClass("active")) {
				$(this).addClass("active");
				$(".menu__overlay").addClass("active");
				$(".menu__list").addClass("active");
			} else {
				$(this).removeClass("active");
				$(".menu__overlay").removeClass("active");
				$(".menu__list").removeClass("active");
			}
		});

		$(".btn-submenu").on("click", function () {
			let $btnSubmenu = $(this);

			if (!$btnSubmenu.closest(".has-children").hasClass("active")) {
				// let $menuListPosX = $(".menu__list").position().left;
				let $menuListPosY = $(".menu__list").position().top;
				let $menuListHeight = $(".menu__list").outerHeight();

				let $menuHasSubmenuPosY = $btnSubmenu.closest(".has-children").position().top;

				$(".has-children").removeClass("active");
				// $(".submenu").removeAttr("style");

				$btnSubmenu
					.closest(".has-children")
					.find(".submenu")
					.css({
						top: $menuListPosY - $menuHasSubmenuPosY,
						height: $menuListHeight,
						transform: "translateX(-20px)",
					});

				setTimeout(() => {
					$btnSubmenu.closest(".has-children").addClass("active");
					$btnSubmenu.closest(".has-children").find(".submenu").css({
						transform: "translateX(0)",
					});
				}, 200);
			} else {
				$btnSubmenu.closest(".has-children").removeClass("active");
				$btnSubmenu.closest(".has-children").find(".submenu").css({
					transform: "translateX(-20px)",
				});
				setTimeout(() => {
					$btnSubmenu.closest(".has-children").find(".submenu").removeAttr("style");
				}, 200);
			}
		});

		$(".menu__overlay").on("click", function () {
			if ($(this).hasClass("active")) {
				$(this).removeClass("active");
				$(".menu__burger").removeClass("active");
				$(".menu__list").removeClass("active");
				$(".has-children").removeClass("active");
			}
		});
	}

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
	$(document).on("click", ".modal .btn--close-modal", function () {
		let $modalName = $(this).closest(".fancybox-content").attr("id");

		$.fancybox.close({
			src: "#" + $modalName,
		});
	});

	// ========== SLIDERS ========== //

	if ($(".block__hero-slider").length > 0) {
		const heroSlider = new Swiper(".block__hero-slider .swiper", {
			slidesPerView: 1,
			spaceBetween: 30,
			// autoHeight: true,
			speed: 500,
			pagination: {
				el: ".block__hero_slider-pagination",
				clickable: true,
			},
		});
	}

	// ========== CARD EXPERTS SHOW ========== //

	$(".card--expert .card__read-more").on("click", function () {
		$(".card--expert").not($(this).parent().parent()).removeClass("active");
		let $pos = $(this).parent().parent().offset().top;
		$(this).parent().parent().toggleClass("active");

		$("html, body").animate(
			{
				scrollTop: $pos - 24,
			},
			500
		);
	});

	// =========== block__new-single ============ //
	if ($(".block__news-single").length > 0) {
		let $imgPosTop = $(".block__news-single h1").outerHeight() + $(".block__news-single-info").outerHeight() + 48;
		$(".block__news-single .news-img-js").css({
			transform: "translateY(" + $imgPosTop + "px)",
		});
	}

	// ============ intltelinput ================ //
	const input = document.querySelector("#intltelinput");
	window.intlTelInput(input, {
		// initialCountry: "auto",
		// geoIpLookup: (callback) => {
		// 	fetch("https://ipapi.co/json")
		// 		.then((res) => res.json())
		// 		.then((data) => callback(data.country_code))
		// 		.catch(() => callback("us"));
		// },
		initialCountry: "ua",
		showSelectedDialCode: true,
		
		utilsScript: "assets/js/vendors/intlTelInput.utils.min.js",
	});
});

$(window).resize(function () {
	$device_width = $(window).width();

	vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", `${vh}px`);

	if ($device_width < 1150) {
		if ($device_width_on_load > $device_width || $device_width_on_load < $device_width) {
			$(".menu__burger").removeClass("active");
			$(".menu__list").removeClass("active");
			$(".has-children").removeClass("active");
			$(".menu__overlay").removeClass("active");
		}
	}

	if ($device_width > 1150) {
		if ($(".block__news-single").length > 0) {
			let $imgPosTop = $(".block__news-single h1").outerHeight() + $(".block__news-single-info").outerHeight() + 48;
			$(".block__news-single .news-img-js").css({
				transform: "translateY(" + $imgPosTop + "px)",
			});
		}
	} else {
		$(".block__news-single .news-img-js").removeAttr("style");
	}
});

$(window).scroll(function () {});

$(document).mouseup(function (e) {
	var menuList = $(".menu__list");

	if (!menuList.is(e.target) && menuList.has(e.target).length === 0) {
		// menuList.removeClass("active");
		// $(".menu__overlay").removeClass("active");
		// $(".menu__burger").removeClass("active");
	}
});

$(window).on("load", function () {
	// $('.preloader').remove();
});
