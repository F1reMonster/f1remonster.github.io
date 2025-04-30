// catagory menu

function categoryMenu() {
	// ================ category menu - desktop ================ //

	if (document.querySelector(".category--desktop")) {
		const homeHeroWrapper = document.querySelector(".home-hero__wrapper");
		const container = document.querySelector(".container");

		const categoryDesktop = document.querySelector(".category--desktop");
		const categoryList = document.querySelector(".category--desktop .category__list");
		const categoryListToShow = categoryList.getAttribute("data-show");
		const categoryListItem = categoryList.querySelectorAll(".category--desktop  .category__item");
		const categoryMenu = document.querySelector(".category--desktop .category__menu");
		const categoryShowMore = document.querySelector(".category--desktop .category__show-more");
		const categorySubmenu = document.querySelectorAll(".category--desktop .category__item--has-submenu .category__submenu");
		const categoryItemLink = document.querySelectorAll(".category--desktop .category__item .category__item-link");

		let categorySubmenuWidth = 0;

		if (categoryListItem.length < 12) {
			categorySubmenu.forEach((el) => {
				el.style.height = categoryDesktop.offsetHeight + "px";
			});

			categoryShowMore.classList.add('hide')
		}

		if (homeHeroWrapper) {
			categorySubmenuWidth = homeHeroWrapper.offsetWidth - categoryDesktop.offsetWidth;
			categoryDesktop.style.height = homeHeroWrapper.offsetHeight + "px";
		} else {
			let containerStyles = window.getComputedStyle(container);

			categorySubmenuWidth = container.offsetWidth - categoryDesktop.offsetWidth - parseFloat(containerStyles.paddingRight) - parseFloat(containerStyles.paddingLeft);
			categoryDesktop.style.left = container.offsetLeft + parseFloat(containerStyles.paddingRight) + "px";
		}

		categorySubmenu.forEach(function (item) {
			item.style.width = categorySubmenuWidth + "px";
		});

		categoryListItem.forEach(function (item, index) {
			if (index > categoryListToShow - 1) {
				item.style.display = "none";
			}
		});

		categoryMenu.addEventListener("mouseenter", function () {
			categoryListItem.forEach(function (item, index) {
				item.removeAttribute("style");
			});
			categoryShowMore.style.opacity = "0";

			if (homeHeroWrapper) {
				let overlayDiv = document.createElement("div");
				let body = document.querySelector("body");
				overlayDiv.classList.add("category__overlay");
				body.appendChild(overlayDiv);

				let categoryOverlay = document.querySelector(".category__overlay");
				setTimeout(function () {
					categoryOverlay.classList.add("active");
				}, 200);

				categoryDesktop.removeAttribute("style");
			} else {
				categoryDesktop.style.height = "auto";
			}

			categoryDesktop.classList.add("active");
		});

		categoryMenu.addEventListener("mouseleave", function () {
			categoryListItem.forEach(function (item, index) {
				if (index > categoryListToShow - 1) {
					item.style.display = "none";
				}

				categoryShowMore.removeAttribute("style");

				let categoryOverlay = document.querySelector(".category__overlay");

				if (homeHeroWrapper) {
					categoryDesktop.style.height = homeHeroWrapper.offsetHeight + "px";
					if (categoryOverlay) {
						categoryOverlay.classList.remove("active");

						setTimeout(() => {
							categoryOverlay.remove();
						}, 200);
					}
				} else {
					categoryDesktop.classList.remove("category--common-active");

					if (categoryOverlay) {
						categoryOverlay.classList.remove("active");

						setTimeout(() => {
							categoryOverlay.remove();
						}, 250);
					}
				}
			});

			categoryDesktop.classList.remove("active");
		});

		categoryDesktop.addEventListener("mouseleave", function () {
			categorySubmenu.forEach((el) => {
				el.classList.remove("active");
			});
			categoryListItem.forEach((el) => {
				el.classList.remove("active");
			});
		});

		categoryItemLink.forEach(function (item) {
			item.addEventListener("mouseenter", function () {
				const categoryItem = item.closest(".category__item");
				const subMenu = item.nextElementSibling;

				if (categoryItem.classList.contains("category__item--has-submenu")) {
					categorySubmenu.forEach((el) => {
						el.classList.remove("active");
					});

					categoryListItem.forEach((el) => {
						el.classList.remove("active");
					});

					subMenu.classList.add("active");
					categoryItem.classList.add("active");
				} else {
					categorySubmenu.forEach((el) => {
						el.classList.remove("active");
					});

					categoryListItem.forEach((el) => {
						el.classList.remove("active");
					});

					categoryItem.classList.add("active");
				}
			});
		});

		// меню категорій для декстопа для вих інших сторінок окрім головної

		if (document.querySelector(".btn--category")) {
			document.querySelector(".btn--category").addEventListener("mouseenter", function () {
				let overlayDiv = document.createElement("div");
				let body = document.querySelector("body");
				let main = document.querySelector("main");
				let mainOffsetTop = main.firstElementChild.offsetTop;
				overlayDiv.classList.add("category__overlay");
				body.appendChild(overlayDiv);

				let categoryOverlay = document.querySelector(".category__overlay");
				setTimeout(function () {
					categoryOverlay.classList.add("active");
				}, 0);

				categoryDesktop.style.transform = "translateY(" + mainOffsetTop + "px)";
				categoryDesktop.classList.add("category--common-active");

				if (categoryOverlay) {
					categoryOverlay.addEventListener("click", function () {
						categoryDesktop.classList.remove("category--common-active");
						categoryOverlay.classList.remove("active");

						setTimeout(function () {
							categoryOverlay.remove();
						}, 200);
					});
				}
			});
		}
	}
}

categoryMenu();
