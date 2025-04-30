// compare widget toggler handler

(function() {
	const toggler = document.querySelector(".compare-widget-toggler");
	const compareWidget = document.querySelector(".compare-widget");

	if (compareWidget !== null) {
		const viewport = window.visualViewport;
		const height = window.visualViewport;

		window.visualViewport.addEventListener("resize", resizeHandler);

		function resizeHandler() {
			compareWidget.style.bottom = `${height - viewport.height}px`;
		}
	}

	if (toggler !== null) {
		const parent = toggler.closest(".compare-widget");

		toggler.addEventListener("click", () => {
			parent.classList.toggle("compare-widget-active");
			watchWidgetHeight(parent);
		});

		window.addEventListener("resize", () => {
			watchWidgetHeight(parent);
		});
	}

	function watchWidgetHeight(parent) {
		const widgetList = document.querySelector(".compare-widget-start");
		const widgetListHeight = document.querySelector(".compare-widget-list").offsetHeight + 2 + "px";

		if (parent.classList.contains("compare-widget-active")) {
			widgetList.style.height = widgetListHeight;
		} else {
			widgetList.setAttribute("style", "");
		}
	}
})();