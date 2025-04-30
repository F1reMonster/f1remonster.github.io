// makes footer menus behave as accordeon.
(function() {
	let footer_items_wrap = document.querySelector("footer.footer .wrap");
	if (footer_items_wrap) {
		new MyAccordeon(footer_items_wrap);
	}
})();
