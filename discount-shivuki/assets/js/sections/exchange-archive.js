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

// ============================
// exchange-archive mobile table row
(function () {
	let tableRowExA = document.querySelector(".exchange-archive .table--mobile");
	if (tableRowExA) {
		new MyAccordeon(tableRowExA);
	}
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
				$("html, body").animate({ scrollTop: $(this).offset().top - 110 }, 10);
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
				$("html, body").animate({ scrollTop: $(this).offset().top - 110 }, 10);
			});
		}
	}
})();

