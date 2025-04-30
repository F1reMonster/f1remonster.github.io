if ($(".catalogue-cards-reg-api").length > 0) {
	if (window.matchMedia("(max-width: 767px)").matches) {
		$(".catalogue-cards-reg-api .typical-card").each(function (item) {
			if (item > 2) {
				$(".catalogue-cards-reg-api .typical-card").eq(item).hide();
			}
		});
	}

	$(".catalogue-cards-reg-api .catalogue-cards__footer .primary-btn").on("click", function (e) {
		e.preventDefault();
		$(this).remove();

		$(".catalogue-cards-reg-api .typical-card").each(function (item) {
			if (item > 2) {
				$(".catalogue-cards-reg-api .typical-card").eq(item).show();
			}
		});
	});

	$(window).resize(function () {
		let $windowWidth = $(window).innerWidth();

		if ($windowWidth < 768) {
			$(".catalogue-cards-reg-api .typical-card").each(function (item) {
				if (item > 2) {
					$(".catalogue-cards-reg-api .typical-card").eq(item).hide();
				}
			});
		} else {
			$(".catalogue-cards-reg-api .typical-card").removeAttr("style");
		}
	});
}

if ($(".catalogue-cards-store-api").length > 0) {
	$(".catalogue-cards-store-api .typical-card").each(function (item) {
		if (item > 7) {
			$(".catalogue-cards-store-api .typical-card").eq(item).hide();
		}
	});

	$(".catalogue-cards-store-api .catalogue-cards__footer .primary-btn").on("click", function (e) {
		e.preventDefault();
		$(this).remove();

		$(".catalogue-cards-store-api .typical-card").each(function (item) {
			if (item > 7) {
				$(".catalogue-cards-store-api .typical-card").eq(item).show();
			}
		});
	});

	// $(window).resize(function () {
	// 	let $windowWidth = $(window).innerWidth();

	// 	if ($windowWidth < 768) {
	// 		$(".catalogue-cards-store-api .typical-card").each(function (item) {
	// 			if (item > 7) {
	// 				$(".catalogue-cards-store-api .typical-card").eq(item).hide();
	// 			}
	// 		});
	// 	} else {
	// 		$(".catalogue-cards-store-api .typical-card").removeAttr("style");
	// 	}
	// });
}
