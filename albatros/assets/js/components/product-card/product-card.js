function productCard() {
	let commonGallerySelector = document.querySelector(".product-card__gallery");
	let commonGalleryModalSelector = document.querySelector(".modal--p-gallery");
	let galleryCommonWrapper = document.querySelector(".product-card__gallery-common-wrapper");
	let allVideo = document.querySelectorAll("video");
	let iframeYoutube = document.querySelectorAll("iframe");

	if (commonGallerySelector) {
		const thumbsGallery = new Swiper(".product-card__gallery-thumbs .swiper", {
			slidesPerView: "auto",
			freMode: true,
			watchSlidesProgress: true,
			spaceBetween: 10,
			direction: "vertical",
			navigation: {
				nextEl: ".product-card__gallery-thumbs-wrapper .btn-next",
				prevEl: ".product-card__gallery-thumbs-wrapper .btn-prev",
			},
		});

		const commonGallery = new Swiper(".product-card__gallery-common .swiper", {
			spaceBetween: 10,
			slidesPerView: 1,
			navigation: {
				nextEl: ".product-card__gallery-common-wrapper .btn-next",
				prevEl: ".product-card__gallery-common-wrapper .btn-prev",
			},
			pagination: {
				el: ".product-card__gallery-common-wrapper .swiper-pagination",
				clickable: true,
			},

			thumbs: {
				swiper: thumbsGallery,
			},
			on: {
				transitionEnd: function () {
					if (allVideo) {
						allVideo.forEach((el) => {
							el.pause();
						});
					}
				},
			},
		});

		// modal gallery
		let totalCommonSlides = document.querySelectorAll(".modal__p-gallery-common-item").length;
		document.querySelector(".modal__p-gallery-common-qty .total").textContent = totalCommonSlides;

		const thumbsModalGallery = new Swiper(".modal__p-gallery-thumbs .swiper", {
			slidesPerView: "auto",
			freMode: true,
			watchSlidesProgress: true,
			spaceBetween: 10,
			direction: "vertical",
			scrollbar: {
				el: ".modal__p-gallery-thumbs .swiper-scrollbar",
			},
		});

		const commonModalGallery = new Swiper(".modal__p-gallery-common .swiper", {
			spaceBetween: 10,
			slidesPerView: 1,
			navigation: {
				nextEl: ".modal__p-gallery-common .btn-next",
				prevEl: ".modal__p-gallery-common .btn-prev",
			},
			pagination: {
				el: ".modal__p-gallery-common-pagination .swiper-pagination",
				clickable: true,
			},

			thumbs: {
				swiper: thumbsModalGallery,
			},
			on: {
				transitionEnd: function () {
					document.querySelector(".modal__p-gallery-common-qty .current").textContent = this.activeIndex + 1;

					if (allVideo) {
						allVideo.forEach((el) => {
							el.pause();
						});
					}
				},
			},
		});

		// galleryCommonWrapper.addEventListener("click", function () {
		// 	commonModalGallery.slideTo(commonGallery.activeIndex);
		// });

		UIkit.util.on("#gallery", "beforeshow", function () {
			commonModalGallery.slideTo(commonGallery.activeIndex);
			if (allVideo) {
				allVideo.forEach((el) => {
					el.pause();
				});
			}
		});

		UIkit.util.on("#gallery", "beforehide", function () {
			commonGallery.slideTo(commonModalGallery.activeIndex);

			if (allVideo) {
				allVideo.forEach((el) => {
					el.pause();
				});
			}
		});
	}

	

	// Додаємо обробник подій для кожного посилання в навігаційному меню
	function smoothScrollToAnchors(containerId) {
		var container = document.getElementById(containerId);
		if (!container) return; // Перевірка, чи існує контейнер

		var links = container.querySelectorAll('a[href^="#"]');
		if (links.length === 0) return; // Перевірка, чи є якорні посилання в контейнері

		for (var i = 0; i < links.length; i++) {
			links[i].addEventListener("click", function (event) {
				event.preventDefault(); // Відміна стандартної дії кліку на посилання

				// Видаляємо клас "active" у всіх посилань
				for (var j = 0; j < links.length; j++) {
					links[j].classList.remove("active");
				}

				// Додаємо клас "active" до вибраного посилання
				this.classList.add("active");

				var targetId = this.getAttribute("href").substring(1);
				var targetElement = document.getElementById(targetId);
				if (!targetElement) return; // Перевірка, чи існує цільовий елемент

				// Здійснення плавного скролу
				window.scrollTo({
					top: targetElement.offsetTop - 10,
					behavior: "smooth",
				});
			});
		}
	}

	smoothScrollToAnchors("buyBarNav");
	smoothScrollToAnchors("cardNav");

	window.addEventListener("scroll", function () {
		var targetElement = document.querySelector(".product-card__info .product-card__info-buy");
		if (isElementNotInViewport(targetElement)) {
			document.querySelector(".product-card__buy-bar").classList.add("active");
		} else {
			document.querySelector(".product-card__buy-bar").classList.remove("active");
		}
	});
}

productCard();
