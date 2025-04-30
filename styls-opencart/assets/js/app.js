$(document).ready(function () {
	// menu burger
	$(".header__burger").click(function () {
		if ($(this).hasClass("open")) {
			$(this).removeClass("open");
			$("body").removeClass("lock");
			$(".header__menu-mobile").removeClass("open");
			$(".menu-overlay").removeClass("show");
		} else {
			$(this).addClass("open");
			$("body").addClass("lock");
			$(".header__menu-mobile").addClass("open");
			$(".menu-overlay").addClass("show");
		}
	});

	// ===================================================
	// faq accordeon
	$(".block__title--faq").click(function () {
		$(".block__faq-content").not($(this).next()).slideUp();
		$(".block__faq-item").not($(this).parent()).removeClass("active");
		$(this).parent().toggleClass("active");
		$(this).next().slideToggle();
	});

	// scroll top
	$(".arrow-top").on("click", function (e) {
		e.preventDefault();
		e.stopPropagation();
		var winHeight = $(document).height();
		var step = 12;
		var timeToScroll = winHeight / step;
		$("html, body").stop().animate(
			{
				scrollTop: 0,
			},
			timeToScroll
		);
	});

	// hero slider
	if ($(".hero__slider").length > 0) {
		let heroSlider = new Swiper(".hero__slider .swiper", {
			spaceBetween: 10,
			slidesPerView: 1,
			loop: true,
			// autoplay: true,
			speed: 1000,
			pagination: {
				el: ".hero__slider-pagination",
			},
		});
	}

	//sidebar2 show items
	$(".sidebar2__show-more").click(function () {
		$(this).toggleClass("showed");
		if ($(this).hasClass("showed")) {
			$(this).text("Сховати");
		} else {
			$(this).text("Дивитись всі");
		}
		$(this).closest(".sidebar2__content").find(".sidebar2__hide-items").slideToggle();
	});

	// sidebar2 hide/show content
	$(".sidebar2__title").click(function () {
		$(this).toggleClass("content-hided");
		$(this).closest(".sidebar2").find(".sidebar2__content").slideToggle();
	});

	// product sliders
	if ($(".product__image-slider").length > 0) {
		const prodGenImgThumbs = new Swiper(".product__general-thumbs-image .swiper", {
			spaceBetween: 10,
			slidesPerView: 3,
			freMode: true,
			watchSlidesProgress: true,
			breakpoints: {
				0: {
					spaceBetween: 3,
					direction: "vertical",
				},
				576: {
					spaceBetween: 9.5,
					direction: "horizontal",
				},
			},
		});
		const prodGenImg = new Swiper(".product__general-image .swiper", {
			spaceBetween: 10,
			slidesPerView: 1,

			thumbs: {
				swiper: prodGenImgThumbs,
			},
		});
	}

	// quantity plus/minus

	$(".quantity-count-button-minus").on("click", function () {
		var _currentInput = $(this).parent().find(".quantity-input");
		var _number = parseInt(_currentInput.val());
		if (_number > 1) {
			_number = _number - 1;
		}
		_currentInput.val(_number);
	});
	$(".quantity-count-button-plus").on("click", function () {
		var _currentInput = $(this).parent().find(".quantity-input");
		var _number = parseInt(_currentInput.val());
		if (_number >= 0) {
			_number = _number + 1;
		}
		_currentInput.val(_number);
	});

	// cart button
	$("._cart-button").click(function () {
		$("body").append('<div class="overlay fade"></div>');
		setTimeout(function () {
			$(".overlay").addClass("show");
		}, 200);
		setTimeout(function () {
			$(".cart").addClass("open");
		}, 250);
		$("body").addClass("lock");
	});

	// cart close
	$(".cart__close").click(function () {
		$(".cart").removeClass("open");
		$("body").removeClass("lock");
		$(".overlay").removeClass("show");
		setTimeout(function () {
			$(".overlay").remove();
		}, 200);
	});

	// show password
	$(".btn-show-pwd").click(function (e) {
		e.preventDefault();
		$parent = $(this).parent();
		$inputPwd = $parent.find(".form__input");

		if ($parent.hasClass("showed")) {
			$parent.removeClass("showed");
			$inputPwd.attr("type", "password");
		} else {
			$parent.addClass("showed");
			$inputPwd.attr("type", "text");
		}
	});
});

$(window).resize(function () {
	if ($(".header__burger").hasClass("open")) {
		$(".header__burger").removeClass("open");
		$("body").removeClass("lock");
		$(".header__menu-mobile").removeClass("open");
		$(".menu-overlay").removeClass("show");
	}

	if ($(".cart").hasClass("open")) {
		$(".cart").removeClass("open");
		$("body").removeClass("lock");
		$(".overlay").removeClass("show");
		setTimeout(function () {
			$(".overlay").remove();
		}, 200);
	}
});

$(document).scroll(function () {});

$(window).on("load", function () {
	// $('.preloader').remove();
});

;

$(document).mouseup(function (e) {
	var menuMob = $(".header__menu-mobile");
	var headerBurger = $(".header__burger")

	// Перевіряємо, чи клік відбувся поза .menu та .menu__body
	if (!menuMob.is(e.target) && menuMob.has(e.target).length === 0 && !headerBurger.is(e.target) && headerBurger.has(e.target).length === 0) {
		// Якщо так, прибираємо клас open
		$(".header__burger").removeClass("open")
		$("body").removeClass("lock");
		$(".header__menu-mobile").removeClass("open");
		$(".menu-overlay").removeClass("show");
		
	}
});