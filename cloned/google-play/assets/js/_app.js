document.addEventListener("DOMContentLoaded", function () {
	const appGroups = document.querySelectorAll(".app__group");
	const appScreens = document.querySelector(".app__screens");

	if (appGroups) {
		appGroups.forEach((group, index) => {
			const swiperContainer = group.querySelector(".swiper");
			const prevButton = group.querySelector(".app__item-prev");
			const nextButton = group.querySelector(".app__item-next");

			new Swiper(swiperContainer, {
				slidesPerView: "auto",
				spaceBetween: 16,
				grabCursor: true,

				navigation: {
					prevEl: prevButton,
					nextEl: nextButton,
				},

				// Accessibility
				a11y: {
					enabled: true,
					prevSlideMessage: "Previous slide",
					nextSlideMessage: "Next slide",
				},
			});
		});
	}

	if (appScreens) {
		const swiperContainer = appScreens.querySelector(".swiper");
		const prevButton = appScreens.querySelector(".app__screen-prev");
		const nextButton = appScreens.querySelector(".app__screen-next");

		new Swiper(swiperContainer, {
			slidesPerView: "auto",
			spaceBetween: 16,
			grabCursor: true,

			navigation: {
				prevEl: prevButton,
				nextEl: nextButton,
			},

			// Accessibility
			a11y: {
				enabled: true,
				prevSlideMessage: "Previous slide",
				nextSlideMessage: "Next slide",
			},
		});
	}
});
