// інформація вище футера розкрити/закрити

function infoBottom() {
	// ================= information show more ==================== //
	if (document.querySelector(".information")) {
		const infoShowMoreBtn = document.querySelector(".information .show-more");

		infoShowMoreBtn.addEventListener("click", function () {
			var hidc = document.querySelector(".information__wrapper");
			var hidcChildElements = hidc.children;
			var childrenHeight = 0;

			for (var i = 0; i < hidcChildElements.length; i++) {
				var child = hidcChildElements[i];
				var childStyles = window.getComputedStyle(child);
				childrenHeight += child.clientHeight + parseFloat(childStyles.marginTop) + parseFloat(childStyles.marginBottom);
			}

			// console.log(childrenHeight);

			this.closest(".information").classList.toggle("information--show");

			if (this.closest(".information").classList.contains("information--show")) {
				this.querySelector(".text-button").textContent = "Згорнути";

				this.closest(".information").querySelector(".information__wrapper").style.height = childrenHeight + "px";
			} else {
				this.querySelector(".text-button").textContent = "Розгорнути";
				this.closest(".information").querySelector(".information__wrapper").removeAttribute("style");
			}
		});
	}
}

infoBottom();
