const html = document.querySelector("html");
const documentLanguage = html.attributes.lang.value;
let data = {};
let placeHolder = "";


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

