// credit-card-lobby-2 slider
(function () {
	const ccLobby2Swiper = document.querySelector(".cc-lobby-2-slider .swiper");
	const ccLobby2ThumbsSwiper = document.querySelector(".cc-lobby-2-slider__thumbs .swiper");
	const ccLobby2Swiper2 = document.querySelector(".cc-lobby-2-slider-2 .swiper");
	const ccLobby2ThumbsSwiper2 = document.querySelector(".cc-lobby-2-slider-2__thumbs .swiper");

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

	function addLink() {
		let ccLobby2SwiperActiveSlide = document.querySelector(".cc-lobby-2-slider .swiper .swiper-slide-active");
		let link = ccLobby2SwiperActiveSlide.dataset.link;
		let ccLobby2ThumbsLink = document.querySelector(".cc-lobby-2-slider__thumbs .more");
		ccLobby2ThumbsLink.href = link;
	}

	function addLink2() {
		let ccLobby2SwiperActiveSlide = document.querySelector(".cc-lobby-2-slider-2 .swiper .swiper-slide-active");
		let link = ccLobby2SwiperActiveSlide.dataset.link;
		let ccLobby2ThumbsLink = document.querySelector(".cc-lobby-2-slider-2__thumbs .more");
		ccLobby2ThumbsLink.href = link;
	}

	if (ccLobby2Swiper !== null) {
		document.querySelector("html[lang='he']") ? ccLobby2Swiper.setAttribute("dir", "rtl") : ccLobby2Swiper.setAttribute("dir", "ltr");
		document.querySelector("html[lang='he']") ? ccLobby2ThumbsSwiper.setAttribute("dir", "rtl") : ccLobby2ThumbsSwiper.setAttribute("dir", "ltr");
		ccLobby2Swiper.init;

		// init cc-lobby-2-thumbs as thumbs to cc-lobby-2-slider
		var ccLobby2Thumbs = new Swiper(ccLobby2ThumbsSwiper, {
			effect: "fade",
			autoHeight: true,
			speed: 0,
			loop: true,
			watchSlidesProgress: true,
			allowTouchMove: false,
			on: {
				"slideChangeTransitionEnd onInit": function () {
					drawIconButtonShape("#thumbs-wrapper canvas", "#thumbs-wrapper .more", "#thumbs-wrapper .icon");
				},
			},
		});

		// init cc-lobby-2-slider
		const ccLobby2 = new Swiper(".cc-lobby-2-slider .slider", {
			loop: true,
			speed: 500,
			slidesPerView: 3,
			centeredSlides: true,
			slideToClickedSlide: true,
			breakpoints: {
				1525: {
					slidesPerView: 5,
				},
			},
			on: {
				init: function (swiper) {
					find_prev_prev_item(swiper);
				},
				"slideChangeTransitionStart onInit": function (swiper) {
					find_prev_prev_item(swiper);
					addLink();
				},
			},
			navigation: {
				nextEl: ".cc-lobby-2-slider .next",
				prevEl: ".cc-lobby-2-slider .prev",
			},
			thumbs: {
				swiper: ccLobby2Thumbs,
			},
		});
	}

	
	if (ccLobby2Swiper2 !== null) {
		document.querySelector("html[lang='he']") ? ccLobby2Swiper2.setAttribute("dir", "rtl") : ccLobby2Swiper2.setAttribute("dir", "ltr");
		document.querySelector("html[lang='he']") ? ccLobby2ThumbsSwiper2.setAttribute("dir", "rtl") : ccLobby2ThumbsSwiper2.setAttribute("dir", "ltr");
		ccLobby2Swiper.init;

		// init cc-lobby-2-thumbs as thumbs to cc-lobby-2-slider
		var ccLobby2Thumbs2 = new Swiper(ccLobby2ThumbsSwiper2, {
			effect: "fade",
			autoHeight: true,
			speed: 0,
			loop: true,
			watchSlidesProgress: true,
			allowTouchMove: false,
			on: {
				"slideChangeTransitionEnd onInit": function () {
					drawIconButtonShape("#thumbs-wrapper-2 canvas", "#thumbs-wrapper-2 .more", "#thumbs-wrapper-2 .icon");
				},
			},
		});

		// init cc-lobby-2-slider
		const ccLobby2_2 = new Swiper(".cc-lobby-2-slider-2 .slider", {
			loop: true,
			speed: 500,
			slidesPerView: 3,
			centeredSlides: true,
			slideToClickedSlide: true,
			breakpoints: {
				1525: {
					slidesPerView: 3,
				},
			},
			on: {
				init: function (swiper) {
					find_prev_prev_item(swiper);
				},
				"slideChangeTransitionStart onInit": function (swiper) {
					find_prev_prev_item(swiper);
					addLink2();
				},
			},
			navigation: {
				nextEl: ".cc-lobby-2-slider-2 .next",
				prevEl: ".cc-lobby-2-slider-2 .prev",
			},
			thumbs: {
				swiper: ccLobby2Thumbs2,
			},
		});
	}
})();

// ==== draw cards in cc-lobby-2-thumbs === //

if (document.getElementById("thumbs-wrapper")) {
	drawIconButtonShape("#thumbs-wrapper canvas", "#thumbs-wrapper .more", "#thumbs-wrapper .icon");
}

if (document.getElementById("thumbs-wrapper-2")) {
	drawIconButtonShape("#thumbs-wrapper-2 canvas", "#thumbs-wrapper-2 .more", "#thumbs-wrapper-2 .icon");
}
// ==== End of draw cards in cc-lobby-2-thumbs === //