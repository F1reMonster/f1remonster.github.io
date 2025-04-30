
// anchor list handler
(function() {
	const anchorItems = document.querySelectorAll("[data-anchor-target]");
	const anchorSwiper = document.querySelector(".anchor-list .swiper");

	if (anchorSwiper !== null) {
		document.querySelector("html[lang='he']") ? anchorSwiper.setAttribute("dir", "rtl") : anchorSwiper.setAttribute("dir", "ltr");
		initAnchorSwiper(anchorSwiper);
	}

	if (anchorItems !== null && anchorItems.length > 0) {
		const anchorLinks = document.querySelectorAll(".anchor-list .top-menu-items a");
		acnhorListStatusHandler();
		watchAnchorHeigh();

		window.addEventListener("scroll", () => {
			acnhorListStatusHandler();

			anchorItems.forEach((item) => {
				const anchorListTop = document.querySelector(".anchor-list-top-wr");
				const anchorListBot = document.querySelector(".anchor-list-wr");
				const anchorListHeight = anchorListTop.offsetHeight + anchorListBot.offsetHeight;
				const bcr = item.getBoundingClientRect();
				const top = bcr.top;
				const bot = bcr.bottom;
				const id = item.getAttribute("id");
				if (top <= anchorListHeight + 5 && bot >= 0) {
					setActiveAnchor(document.querySelector('.anchor-list .top-menu-items .swiper-slide[data-id="' + id + '"]'));
				}
			});
		});

		window.addEventListener("resize", () => {
			watchAnchorHeigh();
		});

		anchorLinks.forEach((item) => {
			item.addEventListener("click", (e) => {
				e.preventDefault();
				const anchorListTop = document.querySelector(".anchor-list-top-wr");
				const anchorListBot = document.querySelector(".anchor-list-wr");
				const anchorListHeight = anchorListTop.offsetHeight + anchorListBot.offsetHeight;
				const target = document.querySelector("#" + item.closest("[data-id]").getAttribute("data-id"));
				const targetBCR = target.getBoundingClientRect();
				const targetTop = targetBCR.top - document.body.getBoundingClientRect().top;

				window.scrollTo({
					top: targetTop - anchorListHeight,
					behavior: "smooth",
				});
			});
		});
	}

	function acnhorListStatusHandler() {
		const anchors = document.querySelector(".anchor-list");
		const anchorsBCR = anchors.getBoundingClientRect();
		const anchorsTop = anchorsBCR.top;
		const anchorsMenu = document.querySelector(".anchor-list .anchor-list-content");

		if (anchors !== null) {
			if (anchorsMenu !== null) {
				if (anchorsTop < 0) {
					anchorsMenu.classList.add("active");
				} else {
					anchorsMenu.classList.remove("active");
				}
			}
		}
	}

	function watchAnchorHeigh() {
		const anchors = document.querySelector(".anchor-list");
		const anchorsMenu = document.querySelector(".anchor-list .anchor-list-wr");
		const anchorMenuHeight = anchorsMenu.offsetHeight + "px";

		anchors.style.height = anchorMenuHeight;
	}

	function setActiveAnchor(query) {
		const oasWorkMenuItems = document.querySelectorAll(".anchor-list .top-menu-items .swiper-slide");

		if (oasWorkMenuItems !== null) {
			for (let i = 0; i < oasWorkMenuItems.length; i++) {
				oasWorkMenuItems[i].classList.remove("selected");
			}

			if (query !== null) {
				query.classList.add("selected");
			}
		}
	}

	function initAnchorSwiper(query) {
		const breakpoint = window.matchMedia("(min-width:768px)");
		let mySwiper;

		const breakpointChecker = function() {
			// if larger viewport and multi-row layout needed
			if (breakpoint.matches === true) {
				// clean up old instances and inline styles when available
				if (mySwiper !== undefined) mySwiper.destroy(true, true);

				// or/and do nothing
				return;

				// else if a small viewport and single column layout needed
			} else if (breakpoint.matches === false) {
				// fire small viewport version of swiper
				return enableSwiper();
			}
		};

		const enableSwiper = function() {
			mySwiper = new Swiper(query, {
				freeMode: true,
				slidesPerView: "auto",
				spaceBetween: 30,
				rewind: true,
				a11y: false,
				navigation: {
					nextEl: query.closest(".top-menu-items").querySelector(".swiper-button-next"),
					prevEl: query.closest(".top-menu-items").querySelector(".swiper-button-prev"),
				},
			});
		};

		// keep an eye on viewport size changes
		breakpoint.addListener(breakpointChecker);

		// kickstart
		breakpointChecker();
	}

	// works menu handler end
})();
