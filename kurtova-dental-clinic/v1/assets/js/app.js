// gsap register plugin
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

function mousemoveHandler(e) {
	try {
		const target = e.target;

		let tl = gsap.timeline({
			defaults: {
				x: e.clientX,
				y: e.clientY,
			},
		});

		// Main Cursor Moving
		tl.to(".cursor", {
			ease: "power2.out",
		});
	} catch (error) {
		console.log(error);
	}

	$("a, button, .swiper-pagination-clickable .swiper-pagination-bullet").mouseenter(function () {
		$(".cursor").addClass("hover-link");
	});

	$("a, button, .swiper-pagination-clickable .swiper-pagination-bullet").mouseleave(function () {
		$(".cursor").removeClass("hover-link");
	});
}

document.addEventListener("mousemove", mousemoveHandler);

// page scroll
// const smoother = ScrollSmoother.create({
// 	content: ".body-wrapper",
// 	smooth: 2,
// 	normalizeScroll: true,
// 	ignoreMobileResize: true,
// 	effects: true,
// 	// preventDefault: true,
// 	// ease: 'power4.out',
// 	// smoothTouch: 0.1,

// });

$(document).ready(function () {
	if ($(".card__hero-list").length > 0) {
		const heroSlider = new Swiper(".card__hero-list .swiper", {
			slidesPerView: 4,
			spaceBetween: 12,
			loop: true,
			speed: 600,
			pagination: {
				el: ".card__hero-pagination",
				clickable: true,
			},
			navigation: {
				nextEl: ".card__hero-next",
				prevEl: ".card__hero-prev",
			},
			breakpoints: {
				320: {
					slidesPerView: "auto",
				},
				1200: {
					slidesPerView: 4,
				},
			},
		});
	}

	if ($(".block__home-services-list").length > 0) {
		const homeServicesSlider = new Swiper(".block__home-services-list .swiper", {
			slidesPerView: "auto",
			// centeredSlides: true,
			spaceBetween: 24,
			// loop: true,
			speed: 600,
			pagination: {
				el: ".block__home-services-pagination",
				clickable: true,
			},
		});
	}

	// desktop menu open/close
	$(".menu__button").on("click", function () {
		$(".menu").addClass("open");
		tlMenuMain.play();
		$("body").addClass("lock");
	});

	$(".menu__close").on("click", function () {
		$(".menu__main-item-list li").removeClass("active");
		$(".menu__sub-list .submenu").removeClass("opened");
		tlMenuMain.reverse();

		setTimeout(function () {
			$("body").removeClass("lock");
		}, 1500);
	});

	// menu desktop submenu open/close
	$(".menu__main-item-list li").on("mouseenter", function () {
		$(".menu__main-item-list li").removeClass("active");
		$(".menu__sub-list .submenu").removeClass("opened");

		$(this).addClass("active");

		if ($(this).hasClass("has-children")) {
			$(".menu__sub-list .submenu").eq($(this).index(".has-children")).addClass("opened");
		}
	});

	// Abstract Images parallax
	gsap.utils.toArray(".abstract-figure").forEach((container) => {
		const img = container.querySelector("img");

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".block__section",
				scrub: true,
				pin: false,
			},
		});

		tl.fromTo(
			img,
			{
				yPercent: 20,
				ease: "none",
			},
			{
				yPercent: -20,
				ease: "none",
			}
		);
	});

	const tlMenuMain = gsap.timeline({ paused: true });
	tlMenuMain
		.to(".menu", {
			x: 0,
			ease: Power4.out,
		})
		.to(".menu__main-item-list li", {
			x: 0,
			stagger: 0.1,
			duration: 0.3,
			opacity: 1,
			ease: Power4.out,
		});
});

$(".menu__panel").css({ left: $(".container").offset().left - $(".menu__panel").innerWidth() });

$(window).resize(function () {
	if (window.matchMedia("(max-width: 75rem)").matches === true) {
		$(".menu__panel").hide();
	} else {
		$(".menu__panel").show();
		$(".menu__panel").css({ left: $(".container").offset().left - $(".menu__panel").innerWidth() });
	}
});

$(document).scroll(function () {});

$(window).on("load", function () {
	// $('.preloader').remove();
});
