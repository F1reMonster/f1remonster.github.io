// filter on help page show/hide
(function () {
	let filterV1 = document.querySelector(".filter--v1");
	if (filterV1) {
		if (window.innerWidth < 767) {
			let filterItems = document.querySelectorAll(".filter--v1 .filter__item");

			// hiden all items more 5
			filterItems.forEach((item, index) => {
				if (index > 4) {
					item.classList.add("hidden");
				}
			});

			let filterItemsHidden = document.querySelectorAll(".filter--v1 .filter__item.hidden");
			let filterItemsCountHidden = filterItemsHidden.length;
			let filterMoreBtn = document.querySelector(".filter--v1 .filter__more");
			filterMoreBtn.innerHTML = filterItemsCountHidden + "+";

			// click buttom show more
			filterMoreBtn.addEventListener("click", function () {
				if (!filterMoreBtn.classList.contains("active")) {
					filterItemsHidden.forEach(function (item) {
						item.classList.remove("hidden");
					});
					filterMoreBtn.innerHTML = ">";
					filterMoreBtn.classList.add("active");
				} else {
					filterItems.forEach(function (item, index) {
						if (index > 4) {
							item.classList.add("hidden");
						}
					});
					filterMoreBtn.innerHTML = filterItemsCountHidden + "+";
					filterMoreBtn.classList.remove("active");
				}
			});
		}

		addEventListener("resize", function () {
			let filterItems = document.querySelectorAll(".filter--v1 .filter__item");
			if (window.innerWidth < 767) {
				filterItems.forEach(function (item, index) {
					if (index > 4) {
						item.classList.add("hidden");
					}
				});

				let filterItemsHidden = document.querySelectorAll(".filter--v1 .filter__item.hidden");
				let filterItemsCountHidden = filterItemsHidden.length;
				let filterMoreBtn = document.querySelector(".filter--v1 .filter__more");
				filterMoreBtn.innerHTML = filterItemsCountHidden + "+";
				filterMoreBtn.classList.remove("active");
			}

			if (window.innerWidth > 767) {
				filterItems.forEach(function (item) {
					item.classList.remove("hidden");
				});
			}
		});
	}
})();