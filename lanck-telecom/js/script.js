$(document).ready(function () {
	// if support webp
	webP(function (support) {
		if (support == true) {
			$("body").addClass("webp");
		}
	});

	$('.header__burger').click(function() {
		$('.header__menu').addClass('open');
	});

	$('.header__burger-close').click(function() {
		$('.header__menu').removeClass('open');
	})
});

function webP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src =
		"data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
