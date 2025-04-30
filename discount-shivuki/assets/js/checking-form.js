const MAX_INPUT_LENGTH = 1; // максимальна довжина вводу
const submitButton = document.getElementById("submitChekingForm");

// отримати всі елементи input з дата-атрибутом tabindex
const inputs = document.querySelectorAll(".checking-form input[data-tabindex]");

// забезпечити, що всі input мають числовий тип
inputs.forEach((item) => (item.value = ""));
inputs.forEach((item) => (item.type = "number"));

// встановити перший input активним, а всі інші вимкненими
inputs.forEach((item, index) => {
	if (index === 0) {
		item.removeAttribute("disabled");
		item.focus();
	} else {
		item.setAttribute("disabled", true);
	}
});

// додати обробник подій вводу для всіх input
inputs.forEach((item, index) => {
	item.addEventListener("input", () => {
		const currentValue = item.value;

		if (currentValue.length === MAX_INPUT_LENGTH) {
			// якщо максимальна довжина досягнута
			if (index < inputs.length - 1) {
				// якщо є ще input, який потрібно активувати
				inputs[index + 1].removeAttribute("disabled");
				inputs[index + 1].focus();
			} else {
				submitButton.disabled = false;
				submitButton.focus();
				document.querySelector(".form-inputs-image img").src = "./assets/img/blank1.jpg";
			}
		}
	});

	// мінємо зображення при заповненні групи
	item.addEventListener("focus", () => {
		document.querySelector(".form-inputs-image img").src = inputs[index].parentNode.dataset.image;
	});

	// валідація вводу тільки цифри + додаткова клавіатура
	item.addEventListener("keydown", (event) => {
		var charCode = typeof event.which == "undefined" ? event.keyCode : event.which;
		// var charStr = String.fromCharCode(charCode);
		// if (!charStr.match(/^[0-9]+$/)) event.preventDefault();
		console.log(charCode);

		if ((charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105)) {
			// console.log('true');
		} else {
			event.preventDefault();
		}

		// add backspace
		if (charCode === 8) {
			// console.log(index);
			if (index > 0) {
				inputs[index].setAttribute("disabled", "true");
				inputs[index].value = "";
				inputs[index - 1].focus();
				inputs[index - 1].value = "";
				submitButton.setAttribute("disabled", "true");
			}
		}
	});
});
