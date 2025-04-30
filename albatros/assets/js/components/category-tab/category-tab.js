function categoryTab() {
	const categoryTab = document.querySelector('.categories-tab .swiper');

	if (categoryTab) {
		const categoryTabSlider = new Swiper(categoryTab, {
			slidesPerView: "auto",
			spaceBetween: 0.9,
		})
	}

}

categoryTab();