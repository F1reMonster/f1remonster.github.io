// jQuery version to console
var $ = $.noConflict();
// const styles = ["color: hsl(276deg, 100%, 50%)", "font-family: monospace", "font-weigth: 700", "font-size: 14px"].join(";");
// console.log("%cjQuery ver." + $().jquery, styles);

const checkExchangeArchiveForm = (inp, val) => {
	const endDate = $("#endDate").val();
	const startDate = $("#startDate").val();
	const autoCompleteArchive = $("#autoCompleteArchive").val();

	if (endDate && startDate && autoCompleteArchive) {
		$(".exchange-archive__btn .typical-btn-bigger").removeAttr("disabled");
	} else {
		$(".exchange-archive__btn .typical-btn-bigger").attr("disabled", "disabled");
	}
};

const checkExchangeCalcForm = (inp, val) => {
	const calcExchangeSum = $("#calcExchangeSum").val();
	const autoCompleteCurrencyFrom = $("#autoCompleteCurrencyFrom").val();
	const autoCompleteCurrencyTo = $("#autoCompleteCurrencyTo").val();

	if (calcExchangeSum && autoCompleteCurrencyFrom && autoCompleteCurrencyTo) {
		$("#calcBtn").removeAttr("disabled");
	} else {
		$("#calcBtn").attr("disabled", "disabled");
	}
};

// ============================
// rates-interest mobile table row
(function () {
	let tableRowGroupHead = document.querySelector(".rates-interest .table--mobile");
	if (tableRowGroupHead) {
		new MyAccordeon(tableRowGroupHead);
	}
})();

// exchange-archive mobile table row
(function () {
	let tableRowGroupHead = document.querySelector(".exchange-archive .table--mobile");
	if (tableRowGroupHead) {
		new MyAccordeon(tableRowGroupHead);
	}
})();

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

// selects dropdown
(function () {
	// let navigationSelect = document.querySelector(".filter--select .select");
	let navigationSelectAll = document.querySelectorAll(".select");

	navigationSelectAll.forEach(function (item) {
		let selectPlaceholder = item.querySelector(".select__placeholder");
		let selectDropdownItems = item.querySelectorAll(".select__dropdown-item");

		selectPlaceholder.addEventListener("click", function (e) {
			item.classList.add("select--open");
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

// credit-card-lobby-2 slider
(function () {
	const ccLobby2Swiper = document.querySelector(".cc-lobby-2-slider .swiper");
	const ccLobby2ThumbsSwiper = document.querySelector(".cc-lobby-2-slider__thumbs .swiper");

	function find_prev_prev_item(swiper) {
		let prev_slide_ind = -2;
		swiper.slides.forEach((item, ind) => {
			if (item.classList.contains("prev-prev")) {
				item.classList.remove("prev-prev");
			}
			if (item.classList.contains("swiper-slide-prev")) {
				prev_slide_ind = ind;
			}
		});
		if (prev_slide_ind === 0) {
			prev_slide_ind = swiper.slides.length;
		}
		let pre_prev_item = swiper.slides[prev_slide_ind - 1];
		pre_prev_item.classList.add("prev-prev");
	}

	if (ccLobby2Swiper !== null) {
		document.querySelector("html[lang='he']") ? ccLobby2Swiper.setAttribute("dir", "rtl") : ccLobby2Swiper.setAttribute("dir", "ltr");
		document.querySelector("html[lang='he']") ? ccLobby2ThumbsSwiper.setAttribute("dir", "rtl") : ccLobby2ThumbsSwiper.setAttribute("dir", "ltr");
		ccLobby2Swiper.init;

		// init cc-lobby-2-thumbs as thumbs to cc-lobby-2-slider
		var ccLobby2Thumbs = new Swiper(ccLobby2ThumbsSwiper, {
			effect: "fade",
			autoHeight: true,
			speed: 0,
			loop: true,
			watchSlidesProgress: true,
			allowTouchMove: false,
			on: {
				"slideChangeTransitionEnd onInit": function () {
					drawIconButtonShape("#thumbs-wrapper canvas", "#thumbs-wrapper .more", "#thumbs-wrapper .icon");
				},
			},
		});

		// init cc-lobby-2-slider
		const ccLobby2 = new Swiper(".cc-lobby-2-slider .slider", {
			loop: true,
			speed: 500,
			slidesPerView: 3,
			centeredSlides: true,
			slideToClickedSlide: true,
			breakpoints: {
				1525: {
					slidesPerView: 5,
				},
			},
			on: {
				init: function (swiper) {
					find_prev_prev_item(swiper);
				},
				"slideChangeTransitionStart onInit": function (swiper) {
					find_prev_prev_item(swiper);
				},
			},
			navigation: {
				nextEl: ".cc-lobby-2-slider .next",
				prevEl: ".cc-lobby-2-slider .prev",
			},
			thumbs: {
				swiper: ccLobby2Thumbs,
			},
		});
	}
})();

// ==== draw cards in cc-lobby-2-thumbs === //

if (document.getElementById("thumbs-wrapper")) {
	drawIconButtonShape("#thumbs-wrapper canvas", "#thumbs-wrapper .more", "#thumbs-wrapper .icon");
}
// ==== End of draw cards in cc-lobby-2-thumbs === //

// truncade all press release card text
// use clamp.js
// https://github.com/josephschmitt/Clamp.js

(function () {
	let pressReleasesCardTextAll = document.querySelectorAll(".press-releases__card-item .text");

	if (pressReleasesCardTextAll) {
		pressReleasesCardTextAll.forEach(function (item) {
			$clamp(item, { clamp: 3 });
		});

		addEventListener("resize", function () {
			pressReleasesCardTextAll.forEach(function (item) {
				$clamp(item, { clamp: 3 });
			});
		});
	}
})();

const html = document.querySelector("html");
const documentLanguage = html.attributes.lang.value;

let data = {};

let placeHolder = "";

const resultsList = {
	element(list, data) {
		if (!data.results.length) {
			// Create "No Results" message list element
			const message = document.createElement("div");
			message.setAttribute("class", "no_result");
			// Add message text content
			message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
			// Add message list element to the list
			list.prepend(message);
		}
	},
	noResults: true,
};

const resultItem = {
	highlight: true,
};

if (documentLanguage === "he") {
	data = {
		src: ["דולר אמריקאי", "יוֹרוֹ", "פאונד בריטי", "ין יפני", "פזו ארגנטינאי", "דולר אוסטרלי", "לב בולגרי", "ריאל ברזילאי"],
	};
	placeHolder = "תבחר מדינה";
} else {
	data = {
		src: ["US Dollar", "Euro", "British pound", "Japanese yen", "Argentine Peso", "Australian Dollar", "Bulgarian Lev", "Brazilian Real"],
	};
	placeHolder = "Select currency";
}

// currency exchange calculator
(function () {
	if (!document.querySelector(".exchange-calculator")) {
		return;
	}

	const calcCurrencyFrom = new autoComplete({
		selector: "#autoCompleteCurrencyFrom",
		placeHolder,
		data,
		threshold: 0,
		resultsList: {
			maxResults: undefined,
		},
		resultItem: {
			highlight: true,
		},
		events: {
			input: {
				focus(event) {
					calcCurrencyFrom.input.value = "";
					calcCurrencyFrom.start();
				},
				selection(event) {
					const selection = event.detail.selection.value;
					calcCurrencyFrom.input.value = selection;
					checkExchangeCalcForm("calcCurrencyFrom", selection);
				},
			},
		},
	});

	const calcCurrencyTo = new autoComplete({
		selector: "#autoCompleteCurrencyTo",
		placeHolder,
		data,
		threshold: 0,
		resultsList: {
			maxResults: undefined,
		},
		resultItem: {
			highlight: true,
		},
		events: {
			input: {
				focus(event) {
					calcCurrencyTo.input.value = "";
					calcCurrencyTo.start();
				},
				selection(event) {
					const selection = event.detail.selection.value;
					calcCurrencyTo.input.value = selection;
					checkExchangeCalcForm("calcCurrencyTo", selection);
				},
			},
		},
	});
})();

// datepicker
(function () {
	const currencyArchive = document.querySelector(".exchange-archive");

	if (currencyArchive) {
		const archiveCurrency = new autoComplete({
			selector: "#autoCompleteArchive",
			placeHolder,
			data,
			threshold: 0,
			resultsList: {
				maxResults: undefined,
			},
			resultItem,
			events: {
				input: {
					focus(event) {
						archiveCurrency.input.value = "";
						archiveCurrency.start();
						// console.log(archiveCurrency.input.nextSibling);
						// new PerfectScrollbar(archiveCurrency.input.nextSibling)
					},
					selection(event) {
						const selection = event.detail.selection.value;
						archiveCurrency.input.value = selection;
						checkExchangeArchiveForm("archiveCurrency", selection);
					},
				},
			},
		});

		// jQuery datepicker

		$.datepicker.regional["he"] = {
			closeText: "סגור",
			prevText: "הקודם",
			nextText: "הבא",
			currentText: "היום",
			monthNames: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
			monthNamesShort: ["ינו", "פבר", "מרץ", "אפר", "מאי", "יוני", "יולי", "אוג", "ספט", "אוק", "נוב", "דצמ"],
			dayNames: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
			dayNamesShort: ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "שבת"],
			dayNamesMin: ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "שבת"],
			weekHeader: "Wk",
			dateFormat: "dd/mm/yy",
			firstDay: 0,
			isRTL: true,
			showMonthAfterYear: false,
			yearSuffix: "",
		};

		$.datepicker.regional["en"] = {
			closeText: "Done",
			prevText: "Prev",
			nextText: "Next",
			currentText: "Today",
			monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			weekHeader: "Wk",
			dateFormat: "dd/mm/yy",
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: "",
		};

		console.log(documentLanguage);
		$.datepicker.setDefaults($.datepicker.regional["he"]);

		if (documentLanguage === "en") {
			$.datepicker.setDefaults($.datepicker.regional["en"]);
		} 

		



		$.datepicker._updateDatepicker_original = $.datepicker._updateDatepicker;
		$.datepicker._updateDatepicker = function (inst) {
			$.datepicker._updateDatepicker_original(inst);
			var afterShow = this._get(inst, "afterShow");
			if (afterShow) afterShow.apply(inst.input ? inst.input[0] : null); // trigger custom callback
		};

		if ($("#startDate")) {
			$("#startDate").datepicker({
				changeMonth: true,
				changeYear: true,
				dateFormat: "dd/mm/y",
				beforeShow: function (input, inst) {
					setTimeout(function () {
						inst.dpDiv.css({
							top: $("#startDate").offset().top + 35,
							left: $("#startDate").offset().left,
						});
					}, 0);
				},
				afterShow: function () {
					$(".ui-datepicker-calendar").wrapAll('<div class="ui-datepicker-calendar-wrapper"</div>');
				},
				onSelect: function (dateText) {
					checkExchangeArchiveForm("startDate", this.value);
				},
			}).mask("99/99/99");

			$("#startDate").on("focus", function () {
				$("html, body").animate({ scrollTop: $(this).offset().top - 100 }, 10);
			});
		}
		if ($("#endDate")) {
			
			$("#endDate").datepicker({
					changeMonth: true,
					changeYear: true,
					dateFormat: "dd/mm/y",
					beforeShow: function (input, inst) {
						setTimeout(function () {
							inst.dpDiv.css({
								top: $("#endDate").offset().top + 35,
								left: $("#endDate").offset().left,
							});
						}, 0);
					},
					afterShow: function () {
						$(".ui-datepicker-calendar").wrapAll('<div class="ui-datepicker-calendar-wrapper"</div>');
					},
					onSelect: function (dateText) {
						checkExchangeArchiveForm("endDate", this.value);
					},
				}).mask("99/99/99")

			$("#endDate").on("focus", function () {
				$("html, body").animate({ scrollTop: $(this).offset().top - 100 }, 10);
			});
		}
	}
})();

// perfect-scrollbar

const allInputAutocomplete = document.querySelectorAll(".input-with-autocomplete ul");

const allDropdowns = document.querySelectorAll(".select__dropdown");

if (allInputAutocomplete) {
	allInputAutocomplete.forEach(function (item) {
		const ps = new PerfectScrollbar(item, {
			wheelSpeed: 2,
			wheelPropagation: true,
			maxScrollbarLength: 83,
		});
		ps.update();
	});
}

if (allDropdowns) {
	allDropdowns.forEach(function (item) {
		const ps = new PerfectScrollbar(item, {
			wheelSpeed: 2,
			wheelPropagation: true,
			maxScrollbarLength: 83,
		});
		ps.update();
	});
}
