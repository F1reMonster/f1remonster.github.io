// marketing short campaign functionality
(function() {
    const form = document.getElementById("marketing-short-campaign-form");
    if (!form) {
        return;
    }
    let inputs = [...form.querySelectorAll(":scope .field-wrap")];
    inputs.forEach((input_container) => {
        let custom_input = new CustomInput(input_container);
        custom_input.Init();
    });
})();
