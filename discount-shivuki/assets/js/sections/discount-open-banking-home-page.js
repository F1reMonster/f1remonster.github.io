const swiper = new Swiper(".marketing-items-section--discount .swiper", {
	slidesPerView: 1.5,
	allowTouchMove: false,
	loop: true,
	navigation: {
		nextEl: "#home-next-slide",
		prevEl: "#home-prev-slide",
	},
	slidesPerView: 1,
	centeredSlides: true,
	breakpoints: {
		575: {
			slidesPerView: 1.5,
		},
		768: {
			slidesPerView: 2.5,
			// centeredSlides: false,
		},
		992: {
			slidesPerView: 3,
			// centeredSlides: false,
		},
	},
});
