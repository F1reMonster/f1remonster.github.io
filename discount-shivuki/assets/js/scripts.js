function __throttle(func, ms) {
	let isThrottled = false,
		savedArgs,
		savedThis;

	function wrapper() {
		if (isThrottled) {
			// (2)
			savedArgs = arguments;
			savedThis = this;
			return;
		}

		func.apply(this, arguments); // (1)

		isThrottled = true;

		setTimeout(function() {
			isThrottled = false; // (3)
			if (savedArgs) {
				wrapper.apply(savedThis, savedArgs);
				savedArgs = savedThis = null;
			}
		}, ms);
	}

	return wrapper;
}


(function() {
	let card_canvases = __arrElements(" .deposits canvas, .deposits-filter-list canvas, .section-cards-with-dent-and-list canvas");

	// draw border and shadow for custrom card with dent
	function drawCardsWithDentAlt() {
		let proportion_coef = FontChangeSubscriber.getInstance().proportion_coef;
		card_canvases.forEach(function(canvas) {
			let is_background_image = canvas.classList.contains("back-img");
			let strokeStyle = "rgba(60,63,69,0.2)";
			let fillStyle;
			if (is_background_image) {
				fillStyle = "rgba(60,63,69,0.2)";
			} else {
				fillStyle = "#fff";
			}

			let lineWidth = 1;
			let params = { canvas, is_background_image, strokeStyle, fillStyle, lineWidth };
			drawCardWithDentAlt(params);
		});
	}
	if (card_canvases.length > 0) {
		drawCardsWithDentAlt();
		let first_item = card_canvases[0];
		first_item = first_item.parentElement;
		let font_change_subscriber = FontChangeSubscriber.getInstance();
		font_change_subscriber.add(first_item);

		first_item.addEventListener("fontchange", drawCardsWithDentAlt);

		window.addEventListener("resize", __throttle(drawCardsWithDentAlt), 80);
	}
})();

// hover on the card with dent on the "Credit Card Lobby" page
(function() {
	const card_with_dents_btns = __arrElements(".section-cards-with-dent-and-list .card-btn");

	card_with_dents_btns.forEach(function(btn) {
		btn.addEventListener("mouseenter", function() {
			let par = btn.closest("article");
			let canvas = par.querySelector(":scope .card-canvas");
			let is_background_image = false;
			let strokeStyle = "#00A661";
			let fillStyle = "#fff";
			let lineWidth = 2;
			let params = { canvas, is_background_image, strokeStyle, fillStyle, lineWidth };
			drawCardWithDentAlt(params);
		});
		btn.addEventListener("mouseleave", function() {
			let par = btn.closest("article");
			let params = {
				canvas: par.querySelector(":scope .card-canvas"),
				is_background_image: false,
				strokeStyle: "rgba(60,63,69,0.2)",
				fillStyle: "#fff",
				lineWidth: 1,
			};
			drawCardWithDentAlt(params);
		});
	});
})();

// fliped card handler

(function() {
	const cards = document.querySelectorAll(".flip-cards-item");

	if (cards.length > 0) {
		cards.forEach((item) => {
			const toggler = item.querySelector(".flip-cards-toggler");
			const close = item.querySelector(".flip-cards-item-back-close");
			const addToCompareBtn = item.querySelector('.flip-cards-compare');
			const removeFromCompare = item.querySelector('.flip-cards-compare-active');

			watchFlipHeight(item);

			toggler.addEventListener("click", (e) => {
				e.preventDefault();

				item.classList.add("flip-cards-item-fliped");
			});

			close.addEventListener("click", (e) => {
				e.preventDefault();

				item.classList.remove("flip-cards-item-fliped");
			});

			addToCompareBtn.addEventListener('click', e => {
				e.preventDefault();
				item.classList.add('flip-cards-item-active');
			});

			removeFromCompare.addEventListener('click', e => {
				e.preventDefault();
				item.classList.remove('flip-cards-item-active');
			});
		});

		window.addEventListener("resize", () => {
			cards.forEach((item) => {
				watchFlipHeight(item);
			});
		});

		function watchFlipHeight(item) {
			const front = item.querySelector(".flip-cards-item-front");
			const frontHeight = front.offsetHeight + "px";

			item.style.height = frontHeight;
		}
	}
})();

// sd-3 filter toggle

(function() {
	const depositFilterList = document.querySelectorAll('.deposits-filter-list');

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

// compare widget toggler handler

(function() {
	const toggler = document.querySelector(".compare-widget-toggler");
	const compareWidget = document.querySelector(".compare-widget");

	if (compareWidget !== null) {
		const viewport = window.visualViewport;
		const height = window.visualViewport;

		window.visualViewport.addEventListener("resize", resizeHandler);

		function resizeHandler() {
			compareWidget.style.bottom = `${height - viewport.height}px`;
		}
	}

	if (toggler !== null) {
		const parent = toggler.closest(".compare-widget");

		toggler.addEventListener("click", () => {
			parent.classList.toggle("compare-widget-active");
			watchWidgetHeight(parent);
		});

		window.addEventListener("resize", () => {
			watchWidgetHeight(parent);
		});
	}

	function watchWidgetHeight(parent) {
		const widgetList = document.querySelector(".compare-widget-start");
		const widgetListHeight = document.querySelector(".compare-widget-list").offsetHeight + 2 + "px";

		if (parent.classList.contains("compare-widget-active")) {
			widgetList.style.height = widgetListHeight;
		} else {
			widgetList.setAttribute("style", "");
		}
	}
})();

