HTMLElement.prototype.slideToggle = function (duration, callback) {
	if (this.clientHeight === 0) {
		_s(this, duration, callback, true);
	} else {
		_s(this, duration, callback);
	}
};

HTMLElement.prototype.slideUp = function (duration, callback) {
	_s(this, duration, callback);
};

HTMLElement.prototype.slideDown = function (duration, callback) {
	_s(this, duration, callback, true);
};

function _s(el, duration, callback, isDown) {
	if (typeof duration === "undefined") duration = 400;
	if (typeof isDown === "undefined") isDown = false;

	el.style.overflow = "hidden";
	if (isDown) el.style.display = "block";

	var elStyles = window.getComputedStyle(el);

	var elHeight = parseFloat(elStyles.getPropertyValue("height"));
	var elPaddingTop = parseFloat(elStyles.getPropertyValue("padding-top"));
	var elPaddingBottom = parseFloat(elStyles.getPropertyValue("padding-bottom"));
	var elMarginTop = parseFloat(elStyles.getPropertyValue("margin-top"));
	var elMarginBottom = parseFloat(elStyles.getPropertyValue("margin-bottom"));

	var stepHeight = elHeight / duration;
	var stepPaddingTop = elPaddingTop / duration;
	var stepPaddingBottom = elPaddingBottom / duration;
	var stepMarginTop = elMarginTop / duration;
	var stepMarginBottom = elMarginBottom / duration;

	var start;

	function step(timestamp) {
		if (start === undefined) start = timestamp;

		var elapsed = timestamp - start;

		if (isDown) {
			el.style.height = stepHeight * elapsed + "px";
			el.style.paddingTop = stepPaddingTop * elapsed + "px";
			el.style.paddingBottom = stepPaddingBottom * elapsed + "px";
			el.style.marginTop = stepMarginTop * elapsed + "px";
			el.style.marginBottom = stepMarginBottom * elapsed + "px";
		} else {
			el.style.height = elHeight - stepHeight * elapsed + "px";
			el.style.paddingTop = elPaddingTop - stepPaddingTop * elapsed + "px";
			el.style.paddingBottom = elPaddingBottom - stepPaddingBottom * elapsed + "px";
			el.style.marginTop = elMarginTop - stepMarginTop * elapsed + "px";
			el.style.marginBottom = elMarginBottom - stepMarginBottom * elapsed + "px";
		}

		if (elapsed >= duration) {
			el.style.height = "";
			el.style.paddingTop = "";
			el.style.paddingBottom = "";
			el.style.marginTop = "";
			el.style.marginBottom = "";
			el.style.overflow = "";
			if (!isDown) el.style.display = "none";
			if (typeof callback === "function") callback();
		} else {
			window.requestAnimationFrame(step);
		}
	}

	window.requestAnimationFrame(step);
}

document.addEventListener("DOMContentLoaded", function () {
	const appGroups = document.querySelectorAll(".app__group");
	const appGroups2 = document.querySelectorAll(".app__group2");
	const appScreens = document.querySelector(".app__screens");

	const search = document.querySelector(".search");
	const searchOverlay = document.querySelector(".search__overlay");
	const searchBody = document.querySelector(".search__body");
	const searchInput = document.getElementById("search-input");
	const searchClearBtn = document.getElementById("clear-btn");
	const searchCancelBtn = document.querySelector(".search__cancel");

	const body = document.querySelector("body");

	const share = document.querySelector(".share");
	const shareOverlay = document.querySelector(".share__overlay");
	const shareBody = document.querySelector(".share__body");
	const shareClose = document.querySelector(".share__close");

	const navBottom = document.querySelector(".nav-bottom");

	if (appGroups) {
		appGroups.forEach((group, index) => {
			const swiperContainer = group.querySelector(".swiper");
			// const prevButton = group.querySelector(".app__item-prev");
			// const nextButton = group.querySelector(".app__item-next");

			new Swiper(swiperContainer, {
				slidesPerView: "auto",
				spaceBetween: 10,
				grabCursor: true,
				grid: {
					rows: 3,
					fill: "columns",
				},

				on: {
					init: function () {
						const rows = this.params.grid.rows; // Кількість рядків
						const slides = this.slides; // Усі слайди
						const totalSlides = slides.length; // Загальна кількість слайдів

						// Визначаємо реальну кількість заповнених рядків
						const columns = Math.ceil(totalSlides / rows); // Кількість колонок
						const actualRows = Math.ceil(totalSlides / columns); // Реальна кількість рядків

						// Спочатку знімаємо старий клас
						slides.forEach((slide) => slide.classList.remove("last-row"));

						// Визначаємо слайди, які потрапляють у останній рядок
						for (let i = (actualRows - 1) * columns; i < totalSlides; i++) {
							slides[i].classList.add("last-row");
						}
					},
				},
			});
		});
	}

	if (appGroups2) {
		appGroups2.forEach((group, index) => {
			const swiperContainer = group.querySelector(".swiper");
			// const prevButton = group.querySelector(".app__item-prev");
			// const nextButton = group.querySelector(".app__item-next");

			new Swiper(swiperContainer, {
				slidesPerView: "auto",
				spaceBetween: 29.5,
				grabCursor: true,

				breakpoints: {
					0: {
						spaceBetween: 10,
					},
					1024: {
						spaceBetween: 29.5,
					},
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

	if (document.querySelector(".header__top h1 span")) {
		insertCurrentDate(document.querySelector(".header__top h1 span"));
	}

	// Відкрити пошук
	function openSearch() {
		body.classList.add("lock");
		navBottom.classList.add("fix");
		search.classList.add("search--active");
		setTimeout(() => {
			searchOverlay.classList.add("search__overlay--visible");
		}, 10);

		setTimeout(() => {
			searchBody.classList.add("search__body--visible");
		}, 20);
	}

	// Закрити пошук
	function closeSearch() {
		searchInput.value = ""; // Очищення поля вводу
		searchBody.classList.remove("search__body--visible");

		setTimeout(() => {
			searchOverlay.classList.remove("search__overlay--visible");
		}, 100);

		setTimeout(() => {
			search.classList.remove("search--active");
			body.classList.remove("lock");
			navBottom.classList.remove("fix");
		}, 250);
	}

	// Очищення поля пошуку
	searchClearBtn.addEventListener("click", () => {
		searchInput.value = "";
	});

	// Клік на оверлей або кнопку Cancel
	searchOverlay.addEventListener("click", closeSearch);
	searchCancelBtn.addEventListener("click", (e) => {
		e.preventDefault();
		closeSearch();
	});

	if (document.getElementById("search-btn")) {
		document.getElementById("search-btn").addEventListener("click", function (e) {
			e.preventDefault();
			openSearch();
		});
	}

	if (document.getElementById("navbar-search-btn")) {
		document.getElementById("navbar-search-btn").addEventListener("click", function (e) {
			e.preventDefault();
			openSearch();
		});
	}

	// Відкрити share
	function openShare() {
		body.classList.add("lock");
		navBottom.classList.add("fix");
		share.classList.add("share--active");
		setTimeout(() => {
			shareOverlay.classList.add("share__overlay--visible");
		}, 10);

		setTimeout(() => {
			shareBody.classList.add("share__body--visible");
		}, 20);
	}

	// Закрити share
	function closeShare() {
		shareBody.classList.remove("share__body--visible");

		setTimeout(() => {
			shareOverlay.classList.remove("share__overlay--visible");
		}, 100);

		setTimeout(() => {
			share.classList.remove("share--active");
			body.classList.remove("lock");
			navBottom.classList.remove("fix");
		}, 250);
	}

	shareOverlay.addEventListener("click", closeShare);
	shareClose.addEventListener("click", closeShare);

	if (document.querySelector(".app__header-share")) {
		document.querySelector(".app__header-share").addEventListener("click", function (e) {
			e.preventDefault();
			openShare();
		});
	}

	const copyContainers = document.querySelectorAll(".copy-link");

	copyContainers.forEach((container) => {
		const input = container.querySelector("input");
		const copyButton = container.querySelector("button");

		copyButton.addEventListener("click", function () {
			const textToCopy = input.value;

			navigator.clipboard
				.writeText(textToCopy)
				.then(() => {
					const originalText = container.querySelector("p").textContent;
					const textContainer = container.querySelector("p");

					textContainer.textContent = "Copied!";

					setTimeout(() => {
						textContainer.textContent = originalText;
					}, 2000);
				})
				.catch((err) => {
					console.error("Error: ", err);
					alert("Can`t copied!");
				});
		});
	});

	const btnMoreShowAll = document.querySelectorAll(".btn-text-more");

	btnMoreShowAll.forEach((button) => {
		// const originalBtnText = button.textContent;
		button.addEventListener("click", function () {
			const hiddenTextEl = this.parentNode.querySelector(".app__block-text--more-hidden");
			const height = calculateBlockHeight(hiddenTextEl);

			if (hiddenTextEl.style.height === "") {
				hiddenTextEl.style.height = height + "px";
				// this.textContent = "hide";
				this.remove();
			} else {
				// hiddenTextEl.style.height = "";
				// this.textContent = originalBtnText;
			}
		});
	});

	const appInfos = document.querySelectorAll(".info-title.has-content");

	appInfos.forEach((item) => {
		const content = item.parentNode.querySelector(".info-content");

		item.addEventListener("click", (e) => {
			e.preventDefault();
			item.classList.toggle("active");
			content.slideToggle(200);
		});
	});
});

function insertCurrentDate(targetElement) {
	// Отримати посилання на елемент
	const element = typeof targetElement === "string" ? document.querySelector(targetElement) : targetElement;

	// Перевірити, чи існує елемент
	if (!element) {
		console.error("Елемент не знайдено.");
		return;
	}

	// Отримати поточну дату
	const today = new Date();
	const day = today.getDate();
	const month = today.toLocaleString("en-US", { month: "long" });

	// Вставити дату
	element.textContent = `${day} ${month}`;
}

// Функція для точного визначення висоти блоку
function calculateBlockHeight(containerElement) {
	// Отримуємо всі дочірні елементи
	const children = containerElement.children;

	// Сумарна висота дочірніх елементів
	const childrenHeight = Array.from(children).reduce((total, child) => {
		return total + child.offsetHeight;
	}, 0);

	// Додаємо проміжки між елементами
	const gap = parseInt(getComputedStyle(containerElement).gap) || 0;
	const totalGapHeight = (children.length - 1) * gap;

	// Загальна висота з урахуванням проміжків
	const totalHeight = childrenHeight + totalGapHeight;

	return totalHeight;
}
