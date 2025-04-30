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
let lang = documentLanguage;
let select2PlaceholderYear = "";
let select2PlaceholderQuarter = "";
let btnName = '';

if (documentLanguage === "he") {
	lang = "he";
	select2PlaceholderYear = "בחר שנה";
	select2PlaceholderQuarter = "בחר רבעון";
	btnName = 'עדכן'
} else {
	lang = "en";
	select2PlaceholderYear = "Select year";
	select2PlaceholderQuarter = "Select quarter";
	btnName = 'Update'
}


// year multiselect
(function () {
	$(".js-select2-year").select2({
		language: lang,
		closeOnSelect: false,
		placeholder: select2PlaceholderYear,
		allowHtml: true,
		allowClear: true,
		// tags: true,
		// tokenSeparators: [',', ' ']
		// maximumSelectionLength: maxtItems,
	}).on("change", function (e) {
		let select2Id = $(this).next().attr('data-select2-id');
		let counter = $("[data-select2-id="+ select2Id +"] .select2-selection__choice").length;
	
		if (counter > 3) {
			$("[data-select2-id="+ select2Id +"] .select2-selection__rendered li:not(.select2-search--inline)").hide();
			if ($("[data-select2-id="+ select2Id +"] .select2-rendered")) {
				$("[data-select2-id="+ select2Id +"] .select2-rendered").remove();
				$("[data-select2-id="+ select2Id +"] .select2-selection__rendered").after('<span class="select2-rendered"><span class="select2-items">'+ $('[data-select2-id='+ select2Id +'] .select2-selection__choice').eq(0).html() + ', ' + $('[data-select2-id='+ select2Id +'] .select2-selection__choice').eq(1).html() + ', ' + $('[data-select2-id='+ select2Id +'] .select2-selection__choice').eq(2).html() +'</span><span class="select2-counter">&nbsp;(' + counter + ')</span></span> ');
			} 
		} else {
			$("[data-select2-id="+ select2Id +"] .select2-rendered").remove();
			$("[data-select2-id="+ select2Id +"] .select2-selection__rendered li:not(.select2-search--inline)").show();
		}
	});

	$(".js-select2-year").on("select2:open", function (e) {
		var $searchfield = $(this).parent().find(".select2-search__field");
		$searchfield.prop("disabled", true);

		$(".select2-dropdown").append('<a class="typical-btn btn-select">' + btnName + '</a>');


		$(".btn-select").on("click", function () {
			$(".js-select2-year").select2("close");
		});
	});

	$(".js-select2-year").on("select2:closing", function (e) {
		$(".btn-select").remove();
	});
})();

// quarter multiselect
(function () {
	$(".js-select2-quarter").select2({
		language: lang,
		closeOnSelect: false,
		placeholder: select2PlaceholderQuarter,
		allowHtml: true,
		allowClear: true,
	}).on("change", function (e) {
		let select2Id = $(this).next().attr('data-select2-id');
		let counter = $("[data-select2-id="+ select2Id +"] .select2-selection__choice").length;
	
		if (counter > 3) {
			$("[data-select2-id="+ select2Id +"] .select2-selection__rendered li:not(.select2-search--inline)").hide();
			if ($("[data-select2-id="+ select2Id +"] .select2-rendered")) {
				$("[data-select2-id="+ select2Id +"] .select2-rendered").remove();
				$("[data-select2-id="+ select2Id +"] .select2-selection__rendered").after('<span class="select2-rendered"><span class="select2-items">'+ $('[data-select2-id='+ select2Id +'] .select2-selection__choice').eq(0).html() + ', ' + $('[data-select2-id='+ select2Id +'] .select2-selection__choice').eq(1).html() + ', ' + $('[data-select2-id='+ select2Id +'] .select2-selection__choice').eq(2).html() +'</span><span class="select2-counter">&nbsp;(' + counter + ')</span></span> ');
			} 
		} else {
			$("[data-select2-id="+ select2Id +"] .select2-rendered").remove();
			$("[data-select2-id="+ select2Id +"] .select2-selection__rendered li:not(.select2-search--inline)").show();
		}
	});

	$(".js-select2-quarter").on("select2:open", function (e) {
		var $searchfield = $(this).parent().find(".select2-search__field");
		$searchfield.prop("disabled", true);

		$(".select2-dropdown").append('<a class="typical-btn btn-select">' + btnName + '</a>');

		$(".btn-select").on("click", function () {
			$(".js-select2-quarter").select2("close");
		});
	});

	$(".js-select2-quarter").on("select2:closing", function (e) {
		$(".btn-select").remove();
	});
})();
