// flip card handler

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