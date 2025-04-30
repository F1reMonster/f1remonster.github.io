// sd-3 filter toggle

(function() {
	const depositFilterList = document.querySelectorAll('.deposits-filter-list');
	const card_canvases = __arrElements(".deposits-filter-list canvas");
	
	if (card_canvases.length > 0) {
			drawCardsWithDentAlt('.deposits-filter-list canvas');
			drawCardsWithDentAltHover('.deposits-filter-list .card-btn');
	}

	if (depositFilterList.length) {
		depositFilterList.forEach(list => {
			togglerHandler();
			checkboxHandler();

			window.addEventListener("resize", () => {
				if (window.innerWidth > 767) {
					const container = list.querySelector(".deposits-filter-container");
					const toggler = list.querySelector(".deposits-filter-toggler");
					const overlay = list.querySelector(".deposits-filter-overlay");

					if (toggler !== null && overlay !== null && overlay !== null) {
						toggler.classList.remove("deposits-filter-toggler-active");
						container.setAttribute("style", "");
						overlay.style.display = "none";
					}
				}
			});

			function togglerHandler() {
				const toggler = list.querySelector(".deposits-filter-toggler-area");
				const togglerArrow = list.querySelector(".deposits-filter-toggler");
				const overlay = list.querySelector(".deposits-filter-overlay");

				if (toggler !== null) {
					toggler.addEventListener("click", () => {
						const container = list.querySelector(".deposits-filter-container");

						togglerArrow.classList.toggle("deposits-filter-toggler-active");

						if (togglerArrow.classList.contains("deposits-filter-toggler-active")) {
							const height = container.scrollHeight + "px";

							container.style.height = height;
							overlay.style.display = "block";
						} else {
							container.setAttribute("style", "");
							overlay.style.display = "none";
						}
					});
				}

				if (overlay !== null) {
					overlay.addEventListener("click", () => {
						toggler.click();
					});
				}
			}

			function closeConditionHandler() {
				const field = list.querySelectorAll(".deposits-filter-field");
				let shouldClose = false;

				field.forEach((item) => {
					const checkbox = item.querySelectorAll('input[type="checkbox"]');
					item.setAttribute("data-checked", false);

					checkbox.forEach((input) => {
						if (input.checked) {
							item.setAttribute("data-checked", true);
						}
					});
				});

				for (let i = 0; i < field.length; i++) {
					if (field[i].getAttribute("data-checked") !== "true") {
						shouldClose = false;
						break;
					} else {
						shouldClose = true;
					}
				}

				return shouldClose;
			}

			function checkboxHandler() {
				const checkbox = list.querySelectorAll('.deposits-filter-checkbox > input[type="checkbox"]');
				const toggler = list.querySelector(".deposits-filter-toggler");

				checkbox.forEach((item) => {
					item.addEventListener("change", () => {
						if (window.innerWidth < 768) {
							if (closeConditionHandler()) {
								toggler.click();
							}
						}
					});
				});
			}
		});
	}
})();