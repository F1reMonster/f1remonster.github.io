function cart() {
	window.addEventListener("scroll", function () {
		var targetElement = document.querySelector(".cart__column--aside");
		if (isElementNotInViewport(targetElement)) {
			document.querySelector(".cart__tab").classList.add("cart__tab--active");
		} else {
			document.querySelector(".cart__tab").classList.remove("cart__tab--active");
		}
	});
}

cart();
