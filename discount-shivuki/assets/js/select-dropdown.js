// selects dropdown
(function () {
	let navigationSelectAll = document.querySelectorAll(".select");

	if (!navigationSelectAll) {
		return;
	}

	navigationSelectAll.forEach(function (item) {
		let selectPlaceholder = item.querySelector(".select__placeholder");
		let selectDropdownItems = item.querySelectorAll(".select__dropdown-item");

		selectPlaceholder.addEventListener("click", function (e) {
			if (!item.classList.contains("select--open")) {
				item.classList.add("select--open");
			} else {
				item.classList.remove("select--open");
			}
		});

		selectDropdownItems.forEach(function (currentElement) {
			currentElement.addEventListener("click", function () {
				selectDropdownItems.forEach((item) => {
					item.classList.remove("select__dropdown-item--active");
				});
				currentElement.classList.add("select__dropdown-item--active");
				selectPlaceholder.textContent = currentElement.textContent;
				item.classList.remove("select--open");
			});
		});
	});

	// const allDropdowns = document.querySelectorAll(".select__dropdown");

	// if (allDropdowns) {
	// 	allDropdowns.forEach(function (item) {
	// 		const ps = new PerfectScrollbar(item, {
	// 			wheelSpeed: 2,
	// 			wheelPropagation: true,
	// 			maxScrollbarLength: 83,
	// 		});
	// 		ps.update();
	// 	});
	// }

	// close select when clickin outside
	window.addEventListener("mouseup", function (event) {
		let select = document.querySelectorAll(".select");
		select.forEach(function (el) {
			if (event.target != el && event.target.parentNode != el) {
				el.classList.remove("select--open");
			}
		});
	});
})();
