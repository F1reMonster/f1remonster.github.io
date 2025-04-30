function filter() {
	// ============ expanded / collapsed filter items ============== //

	if (document.querySelector(".category-filter")) {
		const filterItem = document.querySelectorAll(".category-filter__item");

		filterItem.forEach((el) => {
			if (el.querySelector(".btn-item-action")) {
				const collapseBtn = el.querySelector(".btn-item-action");

				collapseBtn.addEventListener("click", () => {
					let filterItem = collapseBtn.closest(".category-filter__item");
					let targetSlide = filterItem.querySelector(".item-wrapper");
					filterItem.classList.toggle("category-filter__item--expanded");
					filterItem.classList.toggle("category-filter__item--collapsed");

					targetSlide.slideToggle(200);
				});
			}
		});
	}

	// ================= filter range slider ==================== //
	// desktop

	if (document.querySelector(".category-filter__item--price-desktop")) {
		let priceSliderDesktop = document.querySelector(".category-filter__item--price-desktop");
		let priceSlider = priceSliderDesktop.querySelector(".filter__price-range");
		let inputFrom = priceSliderDesktop.querySelector(".filter__price-input-from");
		let inputTo = priceSliderDesktop.querySelector(".filter__price-input-to");
		let inputs = [inputFrom, inputTo];
		let tmpStartValue = 0; 
		let tmpEndValue = 1000;

		if (inputFrom.getAttribute('data-tmp-start-value')) {
			tmpStartValue = parseInt(inputFrom.getAttribute('data-tmp-start-value'))
		} 

		if (inputFrom.getAttribute('data-tmp-start-value')) {
			tmpEndValue = parseInt(inputTo.getAttribute('data-tmp-end-value'))
		}
		
		

		noUiSlider.create(priceSlider, {
			start: [tmpStartValue, tmpEndValue],
			connect: true,
			step: 1,

			range: {
				min: 0,
				max: 2000,
			},
		});

		priceSlider.noUiSlider.on("update", function (values, handle) {
			let Format = wNumb({
				decimals: 0,
				thousand: " ",
				suffix: " ₴",
			});
			inputs[handle].value = Format.to(Number.parseInt(values[handle]));
		});

		// Listen to keydown events on the input field.
		inputs.forEach(function (input, handle) {
			input.addEventListener("change", function () {
				priceSlider.noUiSlider.setHandle(handle, this.value);
			});

			input.addEventListener("keydown", function (e) {
				var values = priceSlider.noUiSlider.get();
				var value = Number(values[handle]);

				// [[handle0_down, handle0_up], [handle1_down, handle1_up]]
				var steps = priceSlider.noUiSlider.steps();

				// [down, up]
				var step = steps[handle];

				var position;

				// 13 is enter,
				// 38 is key up,
				// 40 is key down.
				switch (e.which) {
					case 13:
						priceSlider.noUiSlider.setHandle(handle, this.value);
						break;

					case 38:
						// Get step to go increase slider value (up)
						position = step[1];

						// false = no step is set
						if (position === false) {
							position = 1;
						}

						// null = edge of slider
						if (position !== null) {
							priceSlider.noUiSlider.setHandle(handle, value + position);
						}

						break;

					case 40:
						position = step[0];

						if (position === false) {
							position = 1;
						}

						if (position !== null) {
							priceSlider.noUiSlider.setHandle(handle, value - position);
						}

						break;
				}
			});
		});
	}

	// mobile
	if (document.querySelector(".category-filter__item--price-mobile")) {
		let priceSliderMobile = document.querySelector(".category-filter__item--price-mobile");
		let priceSlider = priceSliderMobile.querySelector(".filter__price-range");
		let inputFrom = priceSliderMobile.querySelector(".filter__price-input-from");
		let inputTo = priceSliderMobile.querySelector(".filter__price-input-to");
		let inputs = [inputFrom, inputTo];
		let tmpStartValue = parseInt(inputFrom.getAttribute('data-tmp-start-value'))
		let tmpEndValue = parseInt(inputTo.getAttribute('data-tmp-end-value'))

		noUiSlider.create(priceSlider, {
			start: [tmpStartValue, tmpEndValue],
			connect: true,
			step: 1,

			range: {
				min: 0,
				max: 2000,
			},
		});

		priceSlider.noUiSlider.on("update", function (values, handle) {
			let Format = wNumb({
				decimals: 0,
				thousand: " ",
				suffix: " ₴",
			});
			inputs[handle].value = Format.to(Number.parseInt(values[handle]));
		});

		// Listen to keydown events on the input field.
		inputs.forEach(function (input, handle) {
			input.addEventListener("change", function () {
				priceSlider.noUiSlider.setHandle(handle, this.value);
			});

			input.addEventListener("keydown", function (e) {
				var values = priceSlider.noUiSlider.get();
				var value = Number(values[handle]);

				// [[handle0_down, handle0_up], [handle1_down, handle1_up]]
				var steps = priceSlider.noUiSlider.steps();

				// [down, up]
				var step = steps[handle];

				var position;

				// 13 is enter,
				// 38 is key up,
				// 40 is key down.
				switch (e.which) {
					case 13:
						priceSlider.noUiSlider.setHandle(handle, this.value);
						break;

					case 38:
						// Get step to go increase slider value (up)
						position = step[1];

						// false = no step is set
						if (position === false) {
							position = 1;
						}

						// null = edge of slider
						if (position !== null) {
							priceSlider.noUiSlider.setHandle(handle, value + position);
						}

						break;

					case 40:
						position = step[0];

						if (position === false) {
							position = 1;
						}

						if (position !== null) {
							priceSlider.noUiSlider.setHandle(handle, value - position);
						}

						break;
				}
			});
		});
	}
}

filter();