document.addEventListener("DOMContentLoaded", function () {
	const appGroups = document.querySelectorAll(".app__group");
	const appScreens = document.querySelector(".app__screens");
	const shareBtn = document.querySelector(".btn--share");
	const closeModalBtns = document.querySelectorAll(".btn--close-modal");
	const body = document.querySelector("body");

	const menu = document.querySelector(".menu");
	const menuOverlay = document.querySelector(".menu__overlay");
	const menuBody = document.querySelector(".menu__body");
	const menuClose = document.querySelector(".menu__close");
	const navBottom = document.querySelector(".nav-bottom");

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

	if (shareBtn) {
		shareBtn.addEventListener("click", () => {
			navBottom.classList.add("fix");
			Fancybox.show([
				{
					src: "#share-modal",
					type: "inline",
					closeButton: false,
				},
			]);
		});
	}

	closeModalBtns.forEach((button) => {
		button.addEventListener("click", function (event) {
			event.preventDefault();
			Fancybox.close();
			
		});
	});

	// Знаходимо всі контейнери з класом 'copy'
	const copyContainers = document.querySelectorAll(".copy");

	copyContainers.forEach((container) => {
		const input = container.querySelector("input");
		const copyButton = container.querySelector(".btn");

		copyButton.addEventListener("click", function () {
			const textToCopy = input.value;

			navigator.clipboard
				.writeText(textToCopy)
				.then(() => {
					const originalText = copyButton.querySelector("span:first-child");
					originalText.textContent = "Copied";

					setTimeout(() => {
						originalText.textContent = "Copy";
					}, 2000);
				})
				.catch((err) => {
					console.error("Error: ", err);
					alert("Can`t copied!");
				});
		});
	});

	// Знаходимо всі блоки review-action
	const reviewActionBlocks = document.querySelectorAll(".review-action");

	reviewActionBlocks.forEach((block) => {
		// Знаходимо пов'язаний блок review-info
		const reviewInfoBlock = block.previousElementSibling;
		const counterSpan = reviewInfoBlock.querySelector("span");

		// Знаходимо кнопки "Yes" та "No"
		const yesButton = block.querySelector(".btn.yes");
		const noButton = block.querySelector(".btn.no");

		// Додаємо змінну для відстеження стану
		let isVoted = false;

		// Обробник кліку на кнопку "Yes"
		yesButton.addEventListener("click", function () {
			// Перевіряємо, чи не голосував раніше
			if (!isVoted) {
				// Отримуємо поточне значення та збільшуємо
				let currentCount = parseInt(counterSpan.textContent);
				currentCount++;

				// Оновлюємо текст
				counterSpan.textContent = currentCount;

				// Позначаємо, що проголосовано
				isVoted = true;

				// Деактивуємо обидві кнопки після голосування
				yesButton.disabled = true;
				noButton.disabled = true;

				// Додаємо класи для стилізації
				yesButton.classList.add("voted");
				noButton.classList.add("disabled");
			}
		});

		// Обробник кліку на кнопку "No"
		noButton.addEventListener("click", function () {
			// Перевіряємо, чи не голосував раніше
			if (!isVoted) {
				// Деактивуємо обидві кнопки після голосування
				yesButton.disabled = true;
				noButton.disabled = true;

				// Додаємо класи для стилізації
				yesButton.classList.add("disabled");
				noButton.classList.add("voted");

				// Позначаємо, що проголосовано
				isVoted = true;
			}
		});
	});

	// Відкрити menu
	function openMenu() {
		body.classList.add("lock");
		navBottom.classList.add("fix");
		menu.classList.add("menu--active");
		setTimeout(() => {
			menuOverlay.classList.add("menu__overlay--visible");
		}, 10);

		setTimeout(() => {
			menuBody.classList.add("menu__body--visible");
		}, 20);
	}

	// Закрити menu
	function closeMenu() {
		menuBody.classList.remove("menu__body--visible");

		setTimeout(() => {
			menuOverlay.classList.remove("menu__overlay--visible");
		}, 100);

		setTimeout(() => {
			menu.classList.remove("menu--active");
			body.classList.remove("lock");
			navBottom.classList.remove("fix");
		}, 250);
	}

	menuOverlay.addEventListener("click", closeMenu);
	menuClose.addEventListener("click", closeMenu);

	if (document.querySelector(".btn--burger-button")) {
		document.querySelector(".btn--burger-button").addEventListener("click", function (e) {
			e.preventDefault();
			openMenu();
		});
	}
});
