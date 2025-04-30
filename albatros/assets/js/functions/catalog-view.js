// відображення каталогу сітка / рядок

function catalogView() {
	if (document.querySelector(".category-page-common__products-catalog")) {
		const btnRow = document.querySelectorAll(".category-page-common__products-catalog .category-controls__actions .btn--view-row");
		const btnGrid = document.querySelectorAll(".category-page-common__products-catalog .category-controls__actions .btn--view-grid");
		
		const prodCat = document.querySelectorAll(".category-page-common__products-catalog .products-catalog");

		btnRow.forEach((el) => {
			el.addEventListener("click", function () {
				if (!el.classList.contains("active")) {
					btnRow.forEach((el) => {
						el.classList.add("active");
					});
					prodCat.forEach((el) => {
						el.classList.remove("products-catalog--view-grid");
						el.classList.add("products-catalog--view-row");
					});
					btnGrid.forEach((el) => {
						el.classList.remove("active");
					});
				}
			});
		});

		btnGrid.forEach((el) => {
			el.addEventListener("click", function () {
				if (!el.classList.contains("active")) {
					btnGrid.forEach((el) => {
						el.classList.add("active");
					});
					prodCat.forEach((el) => {
						el.classList.remove("products-catalog--view-row");
						el.classList.add("products-catalog--view-grid");
					});
					btnRow.forEach((el) => {
						el.classList.remove("active");
					});
				}
			});
		});

		
	}
}

catalogView()