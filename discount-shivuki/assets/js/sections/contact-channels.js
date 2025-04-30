// list channel show/hide
(function () {
	let showMoreBtnContactChannel = document.querySelector(".show-more-btn--contact-channels .show-more");
	let showMoreText = document.querySelector(".show-more-btn--contact-channels p");
	let listContactChannel = document.querySelector(".list-chevron-bullet-content--contact-channels");
	let pageHtml = document.querySelector("html");
	if (showMoreBtnContactChannel) {
		showMoreBtnContactChannel.addEventListener("click", function () {
			if (!this.classList.contains("active")) {
				this.classList.add("active");

				/** Slide up. */
				if (!listContactChannel.classList.contains("active")) {
					listContactChannel.classList.add("active");
					listContactChannel.style.height = "auto";
					var height = listContactChannel.clientHeight + "px";
					listContactChannel.style.height = "0px";
					setTimeout(() => {
						listContactChannel.style.height = height;
					}, 0);
				}
				/** End Slide up */

				if (pageHtml.lang === "he") {
					showMoreText.innerHTML = "פחות";
				} else {
					showMoreText.innerHTML = "Less";
				}
			} else {
				this.classList.remove("active");

				/** Slide down. */
				listContactChannel.style.height = "0px";
				listContactChannel.addEventListener(
					"transitionend",
					function () {
						listContactChannel.classList.remove("active");
					},
					{
						once: true,
					}
				);
				/** End Slide down */

				if (pageHtml.lang === "he") {
					showMoreText.innerHTML = "עוד";
				} else {
					showMoreText.innerHTML = "More";
				}
			}
		});

		if (pageHtml.lang === "he") {
			showMoreText.innerHTML = "עוד";
		} else {
			showMoreText.innerHTML = "More";
		}

		addEventListener("resize", function () {
			if (listContactChannel.classList.contains("active")) {
				listContactChannel.style.height = "auto";
				var height = listContactChannel.clientHeight + "px";
				listContactChannel.style.height = height;
			}
		});
	}
})();
