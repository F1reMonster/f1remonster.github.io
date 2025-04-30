let $device_width = $(window).width();
let servicesSliderInit = false;
let servicesSlider;

// home page service slider function
function servicesSliderEnable() {
	if ($device_width > 575) {
		if (!servicesSliderInit) {
			servicesSliderInit = true;
			$(".block__services-slider .swiper-wrapper").css({ display: "flex" });
			servicesSlider = new Swiper(".block__services-slider .swiper", {
				slidesPerView: 1,
				speed: 2000,
				parallax: true,
				pagination: {
					el: ".block__services-slider-action .pagination",
					clickable: true,
				},
				navigation: {
					nextEl: ".block__services-slider-action .btn-next",
					prevEl: ".block__services-slider-action .btn-prev",
				},
			});
		}
	} else if (servicesSliderInit) {
		servicesSlider.destroy(true, true);
		servicesSliderInit = false;
		$(".block__services-item-image").removeAttr("style");
		$(".block__services-item .block__title").removeAttr("style");
		$(".block__services-slider .swiper-wrapper").css({ display: "block" });
	} else {
		$(".block__services-slider .swiper-wrapper").css({ display: "block" });
	}
}

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
		if ($(".menu").hasClass("open")) {
			$(".menu__body .menu-item").removeClass("active");
			$(".menu__body .submenu").removeClass("open");
			$(".menu__body .submenu-error").remove();
			$(".menu__wrapper").removeClass("open");
			// tlMenuMain.reverse();
			$(".menu").removeClass("open");
			setTimeout(function () {
				$("body").removeClass("lock");
			}, 650);

			// less 1023 px
			$(".menu__list").removeClass("close");
			$(".submenu-close").removeClass("show");
			$(".menu__list-submenu._level-1 .submenu").removeClass("open");
			$(".menu__list-submenu._level-1 .submenu .menu-item").removeClass("active");
			$(".menu__list-submenu._level-1").removeClass("show");
			$(".menu__list-submenu._level-2 .submenu").removeClass("open");
			$(".menu__list-submenu._level-2").removeClass("show");
		} else {
			$("body").addClass("lock");

			setTimeout(function () {
				$(".menu").addClass("open");
			}, 350);
			$(".menu__wrapper").addClass("open");

			// tlMenuMain.play();
		}

		if ($(".block__menu-search-wrapper").hasClass("open")) {
			$(".block__menu-search-wrapper").removeClass("open");
			$(".menu").removeClass("search-open");
		}

		// smoother.paused(!smoother.paused()); // toggle
	});

	// main desktop menu
	$(".menu__list._main-level .menu-item a").mouseenter(function () {
		let $currentItem = $(this);

		$(".menu__list._main-level .menu-item").removeClass("active");
		$currentItem.closest(".menu-item").addClass("active");
		$(".menu__list-submenu .submenu").removeClass("open");
		$(".menu__list-submenu .menu-item").removeClass("active");

		if ($(".menu__list-submenu._level-1 .submenu-error").length > 0) {
			$(".menu__list-submenu._level-1 .submenu-error").remove();
		}

		if ($(".menu__list-submenu._level-2 .submenu-error").length > 0) {
			$(".menu__list-submenu._level-2 .submenu-error").remove();
		}

		if ($currentItem.closest(".menu-item").hasClass("has-children") && $currentItem.closest(".menu-item").hasClass("active")) {
			let $subMenuLevel1 = $currentItem.closest(".menu-item").data("submenu-level1");

			if ($subMenuLevel1) {
				$(".menu__list-submenu .submenu[data-submenu-level1=" + $subMenuLevel1 + "]").addClass("open");
			} else {
				$(".menu__list-submenu._level-1").append('<div class="submenu-error" style="color: red; font-size: 1.5rem;">Немає елементів!</div>');
			}
		}
	});

	$(".menu__list-submenu._level-1 .menu-item a").mouseenter(function () {
		let $currentItem = $(this);

		if ($(".menu__list-submenu._level-2 .submenu-error").length > 0) {
			$(".menu__list-submenu._level-2 .submenu-error").remove();
		}

		$(".menu__list-submenu._level-1 .menu-item").removeClass("active");
		$currentItem.closest(".menu-item").addClass("active");
		$(".menu__list-submenu._level-2 .submenu").removeClass("open");

		if ($currentItem.closest(".menu-item").hasClass("has-children") && $currentItem.closest(".menu-item").hasClass("active")) {
			let $subMenuLevel2 = $currentItem.closest(".menu-item").data("submenu-level2");

			if ($subMenuLevel2) {
				$(".menu__list-submenu .submenu[data-submenu-level2=" + $subMenuLevel2 + "]").addClass("open");
			} else {
				$(".menu__list-submenu._level-2").append('<div class="submenu-error" style="color: red; font-size: 1.5rem;">Немає елементів!</div>');
			}
		}
	});

	// mobile menu/submenu

	$(".submenu-mobile-show").on("click", function (e) {
		e.preventDefault();
		if ($(this).closest(".menu__list").length > 0) {
			$(this).closest(".menu__list").addClass("close");
			let $subMenuLevel1 = $(this).closest(".menu-item").data("submenu-level1");

			$(".menu__list-submenu._level-1").addClass("show");

			if ($subMenuLevel1) {
				$(".menu__list-submenu [data-submenu-level1=" + $subMenuLevel1 + "]").addClass("open");
			} else {
				$(".menu__list-submenu._level-1").append('<div class="submenu-error" style="color: red; font-size: 1.5rem;">Немає елементів!</div>');
			}

			$(".submenu-close").addClass("show");
		}

		if ($(this).closest(".menu__list-submenu").length > 0) {
			$(this).closest(".menu__list-submenu").removeClass("show");

			let $subMenuLevel2 = $(this).closest(".menu-item").data("submenu-level2");

			$(".menu__list-submenu._level-2").addClass("show");

			if ($subMenuLevel2) {
				$(".menu__list-submenu [data-submenu-level2=" + $subMenuLevel2 + "]").addClass("open");
			} else {
				$(".menu__list-submenu._level-2").append('<div class="submenu-error" style="color: red; font-size: 1.5rem;">Немає елементів!</div>');
			}
		}
	});

	$(".submenu-close").on("click", function () {
		if ($(".menu__list-submenu._level-2").hasClass("show")) {
			$(".menu__list-submenu._level-2 .submenu").removeClass("open");
			$(".menu__list-submenu._level-2").removeClass("show");
			$(".menu__list-submenu._level-1").addClass("show");
			$(".menu__list-submenu._level-1 .menu-item").removeClass("active");
		} else {
			if ($(".menu__list-submenu._level-1").hasClass("show")) {
				$(".menu__list-submenu._level-1").removeClass("show");
				$(".menu__list-submenu._level-1 .submenu").removeClass("open");
				$(".menu__list").removeClass("close");
				$(".menu__list .menu-item").removeClass("active");
				$(".submenu-close").removeClass("show");
			}
		}
	});

	// search menu button
	$(".btn--icon-search").on("click", function () {
		if ($(".menu").hasClass("open")) {
			$(".menu__body .menu-item").removeClass("active");
			$(".menu__body .submenu").removeClass("open");
			$(".menu__body .submenu-error").remove();
			$(".menu__wrapper").removeClass("open");
			$(".menu").removeClass("open");
			// setTimeout(function () {
			// 	$("body").removeClass("lock");
			// }, 650);
		}

		if ($(".block__menu-search-wrapper").hasClass("open")) {
			$("body").removeClass("lock");
			$(".block__menu-search-wrapper").removeClass("open");
			$(".menu").removeClass("search-open");
		} else {
			$("body").addClass("lock");
			$(".block__menu-search-wrapper").addClass("open");
			setTimeout(function () {
				$(".menu").addClass("search-open");
			}, 650);
		}
	});

	// home page sliders
	if ($(".block__hero-slider .swiper").length > 0) {
		const heroSlider = new Swiper(".block__hero-slider .swiper", {
			slidesPerView: 1,
			// spaceBetween: 16,
			speed: 2000,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: ".block__hero-slider-pagination .pagination",
				clickable: true,
			},
		});
	}

	// services slider
	if ($(".block__services-slider .swiper").length > 0) {
		servicesSliderEnable();
	}

	// marquee
	if ($(".block__marquee .swiper").length > 0) {
		const homePageMarquee = new Swiper(".block__marquee .swiper", {
			spaceBetween: 20,
			centeredSlides: true,
			speed: 6000,
			autoplay: {
				delay: 1,
			},
			loop: true,
			slidesPerView: "auto",
			allowTouchMove: false,
			disableOnInteraction: true,
		});
	}

	// reviews slider
	if ($(".block__reviews").closest(".block__reviews-page").length > 0) {
		if ($(".block__reviews-slider .swiper").length > 0) {
			const reviewsSlider = new Swiper(".block__reviews-slider .swiper", {
				spaceBetween: 60,
				slidesPerView: 2,
				grid: {
					rows: 2,
					fill: "columns",
				},
				speed: 1000,
				pagination: {
					el: ".block__reviews-slider-action .pagination",
					clickable: true,
				},
				navigation: {
					nextEl: ".block__reviews-slider-action .btn-next",
					prevEl: ".block__reviews-slider-action .btn-prev",
				},
				breakpoints: {
					0: {
						slidesPerView: 1,
						spaceBetween: 20,
						grid: {
							rows: 2,
							fill: "columns",
						},
					},
					576: {
						slidesPerView: 2,
						spaceBetween: 60,
						grid: {
							rows: 2,
							fill: "columns",
						},
					},
				},
				on: {
					transitionStart: function () {
						$(".reviews-read-more .btn").removeClass("opened");
						$(".block__reviews-item .reviews-body").removeClass("read-more");
					},
				},
			});
		}
	} else {
		if ($(".block__reviews-slider .swiper").length > 0) {
			const reviewsSlider = new Swiper(".block__reviews-slider .swiper", {
				spaceBetween: 60,
				slidesPerView: 2,
				speed: 1000,
				pagination: {
					el: ".block__reviews-slider-action .pagination",
					clickable: true,
				},
				navigation: {
					nextEl: ".block__reviews-slider-action .btn-next",
					prevEl: ".block__reviews-slider-action .btn-prev",
				},
				breakpoints: {
					0: {
						slidesPerView: 1,
						spaceBetween: 20,
					},
					576: {
						slidesPerView: 2,
						spaceBetween: 60,
					},
				},
				on: {
					transitionStart: function () {
						$(".reviews-read-more .btn").removeClass("opened");
						$(".block__reviews-item .reviews-body").removeClass("read-more");
					},
				},
			});
		}
	}

	// reviews-body read all
	$(".reviews-read-more .btn").click(function () {
		$(this).parent().parent().find(".reviews-body").toggleClass("read-more");
		$(this).toggleClass("opened");
	});

	// doctor slider awards
	if ($(".block__doctor-awards-slider .swiper").length > 0) {
		const doctorAwards = new Swiper(".block__doctor-awards-slider .swiper", {
			slidesPerView: "auto",
			spaceBetween: 18,
			centeredSlides: true,
			// loop: true,

			pagination: {
				el: ".block__doctor-awards-slider-action .pagination",
				clickable: true,
			},
			navigation: {
				nextEl: ".block__doctor-awards-slider-action .btn-next",
				prevEl: ".block__doctor-awards-slider-action .btn-prev",
			},
		});

		// upd: 20240307
		// Відкриття fancybox галереї при кліку на зображення слайдера
		$(".block__doctor-awards-slider .swiper-slide a").click(function (e) {
			e.preventDefault();
			var slideIndex = $(this).closest(".swiper-slide").index();
			
			$.fancybox.open(
				$('[data-gallery="doctor-awards"]'),
				{
					loop: true,
					startIndex: slideIndex,
					// Починаємо зображення галереї з того ж індексу, що і активний слайдер
					// Після закриття галереї повертаємося на цей самий слайдер
					beforeShow: function (instance, current) {
						doctorAwards.slideTo(slideIndex);
					},
					afterClose: function () {
						doctorAwards.slideTo(slideIndex);
					},
					
				}, slideIndex
			);
		});
	}

	// slider of works
	if ($(".block__doctor-works-slider .swiper").length > 0) {
		const worksSlider = new Swiper(".block__doctor-works-slider .swiper", {
			slidesPerView: 2,
			spaceBetween: 45,
			allowTouchMove: false,
			// autoHeight: true,
			pagination: {
				el: ".block__doctor-works-slider-action .pagination",
				clickable: true,
			},
			navigation: {
				nextEl: ".block__doctor-works-slider-action .btn-next",
				prevEl: ".block__doctor-works-slider-action .btn-prev",
			},
			breakpoints: {
				0: {
					slidesPerView: "auto",
					spaceBetween: 20,
				},
				1300: {
					slidesPerView: 2,
					spaceBetween: 45,
				},
			},
		});
	}

	// comparison of images
	// If the comparison slider is present on the page lets initialise it, this is good you will include this in the main js to prevent the code from running when not needed
	if ($(".comparison-slider")[0]) {
		let compSlider = $(".comparison-slider");

		//let's loop through the sliders and initialise each of them
		compSlider.each(function () {
			let compSliderWidth = $(this).width() + "px";
			$(this).find(".resize img").css({ width: compSliderWidth });
			drags($(this).find(".divider"), $(this).find(".resize"), $(this));
		});

		//if the user resizes the windows lets update our variables and resize our images
		$(window).on("resize", function () {
			let compSliderWidth = compSlider.width() + "px";
			compSlider.find(".resize img").css({ width: compSliderWidth });
		});
	}
	// ======end comparison ============ //

	// prices show/hide
	$(".block__prices-item-title").click(function () {
		$(".block__prices-item-wrapper").not($(this).next()).slideUp();
		$(".block__prices-item").not($(this).parent()).removeClass("opened");
		$(this).parent().toggleClass("opened");
		$(this).next().slideToggle();
	});

	// services page hide/show
	$(".block__services-item-title-wrapper").click(function () {
		$(".block__services-item-body-wrapper").not($(this).next()).slideUp();
		$(".block__services-item").not($(this).parent()).removeClass("opened");
		$(this).parent().toggleClass("opened");
		$(this).next().slideToggle();
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
	$(".modal .btn--icon-close").click(function () {
		let $modalName = $(this).closest("fancybox-content").attr("id");

		$.fancybox.close({
			src: "#" + $modalName,
		});
	});

	// open success modal
	$(".modal form").submit(function (e) {
		e.preventDefault();
		// find modal name
		let modalName = $(this).closest(".modal").attr("id");

		// close modal
		$.fancybox.close({
			src: "#" + modalName,
		});

		// clear inputs
		$(this).find(".form__input").val("");

		$.fancybox.open({
			src: "#modal-thanks",
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
	// ======== END MODALS ========== //

	// actions list
	if ($(".block__actions-list-wrapper .swiper").length > 0) {
		const reviewsSlider = new Swiper(".block__actions-list-wrapper .swiper", {
			spaceBetween: 25,
			slidesPerView: "auto",
			speed: 1000,
			pagination: {
				el: ".block__actions-list-slider-action .pagination",
				clickable: true,
			},
			navigation: {
				nextEl: ".block__actions-list-slider-action .btn-next",
				prevEl: ".block__actions-list-slider-action .btn-prev",
			},
		});
	}

	// page single slider , can add many on page in this constuction
	if ($(".block__page-slider-wrapper .swiper").length > 0) {
		$(".block__page-slider-wrapper .swiper").each(function (index) {
			$(this).addClass("page-slider-" + index);
			$(this)
				.closest(".block__page-slider")
				.find(".block__page-slider-action .btn-next")
				.addClass("btn-next-" + index);
			$(this)
				.closest(".block__page-slider")
				.find(".block__page-slider-action .btn-prev")
				.addClass("btn-prev-" + index);
			$(this)
				.closest(".block__page-slider")
				.find(".block__page-slider-action .pagination")
				.addClass("pagination-" + index);

			new Swiper(".page-slider-" + index, {
				spaceBetween: 25,
				slidesPerView: 1,
				speed: 1000,
				pagination: {
					el: ".pagination-" + index,
					clickable: true,
				},
				navigation: {
					nextEl: ".btn-next-" + index,
					prevEl: ".btn-prev-" + index,
				},
			});
		});
	}

	// articles list
	if ($(".block__articles-list-slider .swiper").length > 0) {
		const reviewsSlider = new Swiper(".block__articles-list-slider .swiper", {
			spaceBetween: 25,
			slidesPerView: "auto",
			speed: 1000,
			pagination: {
				el: ".block__articles-list-slider-action .pagination",
				clickable: true,
			},
			navigation: {
				nextEl: ".block__articles-list-slider-action .btn-next",
				prevEl: ".block__articles-list-slider-action .btn-prev",
			},
		});
	}

	// ========= FOOTER ========= //
	// footer items mobile show/hide
	$(".footer__item-title").click(function () {
		if ($device_width < 576) {
			if ($(this).hasClass("active")) {
				$(this).next(".footer__item-wrapper").slideUp();
				$(this).removeClass("active");
			} else {
				$(this).next(".footer__item-wrapper").slideDown();
				$(this).addClass("active");
				$(".footer__item-title").not(this).removeClass("active");
				$(".footer__item-wrapper").not($(this).next(".footer__item-wrapper")).slideUp();
			}
		}
	});
	// ========================== //

	// contacts page
	//map
	if ($("#mapid").length > 0) {
		let map = L.map("mapid").setView([48.4596414, 35.0652022], 17);

		map.scrollWheelZoom.disable();
		L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
			maxZoom: 20,
			subdomains: ["mt0", "mt1", "mt2", "mt3"],
		}).addTo(map);

		let marker1 = L.marker([48.4596414, 35.0652022]).addTo(map);
		let marker2 = L.marker([48.5086135, 35.0851237]).addTo(map);
		marker1.bindPopup("<div class='map-popup-head'>Kurtova Dental Cliniс</div><div class='map-popup-addr'>пл. Соборна, 7а</div>").openPopup();
		marker2.bindPopup("<div class='map-popup-head'>Kurtova Dental Cliniс</div><div class='map-popup-addr'>вул. Квітки Цісик, 10</div>");

		//change map pin
		$(".leaflet-marker-pane img").attr("src", "assets/img/svg/location.svg");

		$(".block__contacts-info-address .btn").click(function () {
			$attr = $(this).attr("data-address");
			$(".block__contacts-info-address .btn").closest(".block__contacts-info-address").removeClass("active");
			$(this).closest(".block__contacts-info-address").addClass("active");
			$(".block__contacts-info-image img").removeClass("active");

			$(".block__contacts-info-image img[data-address=" + $attr + "]").addClass("active");
			$(".block__contacts-info .operation-time-wrapper ul").removeClass("active");
			$(".block__contacts-info .operation-time-wrapper ul").removeClass("show");
			$(".block__contacts-info .operation-time-wrapper ul[data-address=" + $attr + "]").addClass("show");
			setTimeout(function () {
				$(".block__contacts-info .operation-time-wrapper ul.show").addClass("active");
			}, 200);
			switch ($attr) {
				case "address1":
					map.flyTo([48.4596414, 35.0652022], 17);
					marker1.openPopup();
					marker2.closePopup();
					break;

				case "address2":
					map.flyTo([48.5086135, 35.0851237], 17);
					marker1.closePopup();
					marker2.openPopup();
					break;
			}
		});
	}

	// =========================== //

	// footer up button
	$(".btn--icon-arrow-up").each(function () {
		$(this).click(function (e) {
			e.preventDefault();
			e.stopPropagation();
			var winHeight = $(document).height();
			var step = 12;
			var timeToScroll = winHeight / step;
			$("html, body").stop().animate(
				{
					scrollTop: 0,
				},
				1000
			);
		});
	});
});

$(window).resize(function () {
	$device_width = $(window).width();
	vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", `${vh}px`);
	// action menu
	$(".menu__body .menu-item").removeClass("active");
	$(".menu__body .submenu").removeClass("open");
	$(".menu__body .submenu-error").remove();
	// $(".menu__wrapper").removeClass("open");
	// $(".menu").removeClass("open");
	// $(".menu").removeClass("search-open");
	// $(".block__menu-search-wrapper").removeClass("open");
	// $("body").removeClass("lock");

	// less 1023 px
	
	
	$(".menu__list").removeClass("close");
	$(".submenu-close").removeClass("show");
	$(".menu__list-submenu._level-1 .submenu").removeClass("open");
	$(".menu__list-submenu._level-1 .submenu .menu-item").removeClass("active");
	$(".menu__list-submenu._level-1").removeClass("show");
	$(".menu__list-submenu._level-2 .submenu").removeClass("open");
	$(".menu__list-submenu._level-2").removeClass("show");

	if ($device_width > 578) {
		$(".footer__item-title").removeClass("active");
		$(".footer__item-wrapper").removeAttr("style");
	}

	if ($(".block__services-slider .swiper").length > 0) {
		servicesSliderEnable();
	}

	if ($(".footer__socials").length > 0) {
		if ($(".footer__socials").isInViewport()) {
			$(".menu__socials").css({ opacity: 0 });
		} else {
			$(".menu__socials").css({ opacity: 1 });
		}
	}
});

$(window).scroll(function (e) {
	if ($(".footer__socials").length > 0) {
		if ($(".footer__socials").isInViewport()) {
			$(".menu__socials").css({ opacity: 0, "pointer-events": "none" });
		} else {
			$(".menu__socials").removeAttr("style");
		}
	}
});

$(window).on("load", function () {
	// $('.preloader').remove();
});

$(document).mouseup(function (e) {
	
	var menu = $(".menu");
	var menuBtn = $(".menu__button");
	var menuBody = $(".menu__wrapper");

	// Перевіряємо, чи клік відбувся поза .menu__wrapper
	if (!menuBtn.is(e.target) && menuBtn.has(e.target).length === 0 && !menuBody.is(e.target) && menuBody.has(e.target).length === 0) {
		// Якщо так, прибираємо клас open
		menu.removeClass("open");
		menuBody.removeClass("open");
		$("body").removeClass("lock");
	}
});

// This is where all the magic happens
// This is a modified version of the pen from Ege Görgülü - https://codepen.io/bamf/pen/jEpxOX - and you should check it out too.
function drags(dragElement, resizeElement, container) {
	// This creates a variable that detects if the user is using touch input insted of the mouse.
	let touched = false;
	window.addEventListener("touchstart", function () {
		touched = true;
	});
	window.addEventListener("touchend", function () {
		touched = false;
	});

	// clicp the image and move the slider on interaction with the mouse or the touch input
	dragElement
		.on("mousedown touchstart", function (e) {
			//add classes to the emelents - good for css animations if you need it to
			dragElement.addClass("draggable");
			resizeElement.addClass("resizable");
			//create vars
			let startX = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;
			// let startX = e.pageX;
			// console.log(e.originalEvent.touches[0].pageX);
			let dragWidth = dragElement.outerWidth();
			let posX = dragElement.offset().left + dragWidth - startX;
			let containerOffset = container.offset().left;
			let containerWidth = container.outerWidth();
			let minLeft = containerOffset + 30;
			let maxLeft = containerOffset + containerWidth - dragWidth - 30;

			//add event listner on the divider emelent
			dragElement
				.parents()
				.on("mousemove touchmove", function (e) {
					// if the user is not using touch input let do preventDefault to prevent the user from slecting the images as he moves the silder arround.
					if (touched === false) {
						e.preventDefault();
					}

					let moveX = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;
					// let moveX = e.pageX;
					let leftValue = moveX + posX - dragWidth;

					// stop the divider from going over the limits of the container
					if (leftValue < minLeft) {
						leftValue = minLeft;
					} else if (leftValue > maxLeft) {
						leftValue = maxLeft;
					}

					let widthValue = ((leftValue + dragWidth / 2 - containerOffset) * 100) / containerWidth + "%";

					$(".draggable")
						.css("left", widthValue)
						.on("mouseup touchend touchcancel", function () {
							$(this).removeClass("draggable");
							resizeElement.removeClass("resizable");
						});

					$(".resizable").css("width", widthValue);
				})
				.on("mouseup touchend touchcancel", function () {
					dragElement.removeClass("draggable");
					resizeElement.removeClass("resizable");
				});
		})
		.on("mouseup touchend touchcancel", function (e) {
			// stop clicping the image and move the slider
			dragElement.removeClass("draggable");
			resizeElement.removeClass("resizable");
		});
}
