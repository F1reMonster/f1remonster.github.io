(function () {
	const form = document.getElementById("user-login");
	if (!form) {
		return;
	}
	let inputs = [...form.querySelectorAll(":scope .field-wrap")];
	inputs.forEach((input_container) => {
		let custom_input = new CustomInput(input_container);
		custom_input.Init();
	});
})();
