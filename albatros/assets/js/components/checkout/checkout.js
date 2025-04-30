function checkout() {
	let checkboxAnotherContact = document.querySelector(".form__checkbox--another-contact .form__checkbox-input");
	let anotherContactWrapper = checkboxAnotherContact.closest(".form__checkbox--another-contact").nextElementSibling;

	checkboxAnotherContact.addEventListener("change", function () {
		anotherContactWrapper.slideToggle(200);
	});

	// delivery show/hide

	let deliveryCheckboxs = document.querySelectorAll(".delivery__item .form__checkbox-input");
	let deliveryItems = document.querySelectorAll(".delivery__item");

	deliveryCheckboxs.forEach((el) => {
		el.addEventListener("change", function () {
			let deliveryItem = el.closest(".delivery__item");
			let deliveryTitle = deliveryItem.querySelector(".delivery__item-title");
			let deliveryContentWrapper = deliveryItem.querySelector(".delivery__item-content-wrapper");

			if (!deliveryItem.classList.contains("delivery__item--active")) {
				deliveryItems.forEach((el) => {
					if (el.classList.contains("delivery__item--active")) {
						el.classList.remove("delivery__item--active");
						// slideUp(el.querySelector(".delivery__item-content-wrapper"), speedAnimation);

						el.querySelector(".delivery__item-content-wrapper").slideUp(200);
					}
				});

				deliveryContentWrapper.slideDown(200);
				deliveryItem.classList.add('delivery__item--active')
			}
		});
	});
}

checkout();
