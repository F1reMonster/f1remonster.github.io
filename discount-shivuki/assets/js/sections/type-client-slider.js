// slider on the page "You wanted more"
(function() {
	if (!window.Swiper) {
		return;
	}

	//add class 'prev-prev' to the slide before the slide with class 'swiper-slide-prev'
	//in order to target it with css.
	function find_prev_prev_item(swiper) {
		let prev_slide_ind = -2;
		swiper.slides.forEach((item, ind) => {
			if (item.classList.contains("prev-prev")) {
				item.classList.remove("prev-prev");
			}
			if (item.classList.contains("swiper-slide-prev")) {
				prev_slide_ind = ind;
			}
		});
		if (prev_slide_ind === 0) {
			prev_slide_ind = swiper.slides.length;
		}
		let pre_prev_item = swiper.slides[prev_slide_ind - 1];
		pre_prev_item.classList.add("prev-prev");
	}

	const swiper = new Swiper(".type-client-slider .slider", {
		autoplay: {
			delay: 50000,
		},
		loop: true,
		slidesPerView: 3,
		centeredSlides: true,
		slideToClickedSlide: true,
		breakpoints: {
			1525: {
				slidesPerView: 5,
			},
		},
		on: {
			init: function(swiper) {
				find_prev_prev_item(swiper);
			},
			"slideChangeTransitionStart onInit": function(swiper) {
				find_prev_prev_item(swiper);
			},
		},
		navigation: {
			nextEl: ".type-client-slider .next",
			prevEl: ".type-client-slider .prev",
		},
	});
})();
