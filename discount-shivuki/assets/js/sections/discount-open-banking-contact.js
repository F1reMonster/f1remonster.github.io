// marketing short campaign functionality
(function () {
	const form = document.getElementById("discount-open-banking-contact");
	if (!form) {
		return;
	}
	let inputs = [...form.querySelectorAll(":scope .field-wrap")];
	inputs.forEach((input_container) => {
		let custom_input = new CustomInput(input_container);
		custom_input.Init();
	});
})();


$(".textarea").on("keyup", function () {
	let $len = $(this).val().length;
	var $text = $(this).val();

	if ($len >= 501) {
		$(this).val($text.substring(0, 500));
	} else {
		if ($len > 490) {
			$(this).next().find("span").css("color", "red");
		} else {
			$(this).next().find("span").css("color", "black");
		}

		$(this)
			.next()
			.find("span")
			.text(500 - $len);
	}
});