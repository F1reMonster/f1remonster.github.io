// contact form functionality.
(function() {
    // angular material design inputs.
    let custom_inputs = __arrElements(".contact-form .field-wrap.pure");
    if (custom_inputs.length === 0) {
        return;
    }
    custom_inputs.forEach(function(container) {
        let custom_input = new CustomInput(container);
        custom_input.Init();
    });

    let client_checkbox_wrap = document.querySelector(".contact-form .wrap-custom-field");
    if (client_checkbox_wrap) {
        let label = client_checkbox_wrap.querySelector(":scope label");
        let clicable_items = __arrElements(client_checkbox_wrap.querySelectorAll(":scope .yes, :scope .no, :scope .switcher"));
        clicable_items.forEach(function(item) {
            item.addEventListener("click", function() {
                label.click();
            });

            if (!item.classList.contains("switcher")) {
                item.addEventListener("keydown", function(e) {
                    if (e.key == "Enter") {
                        e.preventDefault();
                        label.click();
                    }
                });
            }
        });
    }

    // if there is no town input on the page then get out of here.
    let town_input = document.querySelector(".autocomplete-input");
    if (!town_input) {
        return;
    }
    let options = ["London", "Bristol", "Birmingham", "Leeds", "Sheffield", "Bradford", "Manchester", "Oslo", 'Bremen', 'Odesa', 'Kharkiv', 'Poltava', 'Amsterdam', 'aab', 'aan', 'att', 'arr'];
    let input_autocomplete = new CustomInputAutocomplete(".contact-form .autocomplete-input", options);
    input_autocomplete.Init();
})();
