$(document).ready(function () {
	// sliders
	//  buyer-favorites.html

	if ($("[data-filter-name='price']").length > 0) {
		filterPriceLoadDefault();
	}

	if ($(".swiper2").length > 0) {
		const swiper2 = new Swiper(".swiper2", {
			slidesPerView: "auto",
			spaceBetween: 22,

			navigation: {
				nextEl: ".btn-next",
				prevEl: ".btn-prev",
			},
			breakpoints: {
				0: {
					spaceBetween: 10,
				},
				1024: {
					spaceBetween: 22,
				},
			},
		});
	}

	if ($(".swiper3").length > 0) {
		const swiper3 = new Swiper(".swiper3", {
			slidesPerView: "auto",
			spaceBetween: 22,

			navigation: {
				nextEl: ".btn-next1",
				prevEl: ".btn-prev1",
			},
			breakpoints: {
				0: {
					spaceBetween: 10,
				},
				1024: {
					spaceBetween: 22,
				},
			},
		});
	}

	//
	if ($(".swiper4").length > 0) {
		const swiper4 = new Swiper(".swiper4", {
			slidesPerView: "auto",
			spaceBetween: 22,

			navigation: {
				nextEl: ".btn-next",
				prevEl: ".btn-prev",
			},
			breakpoints: {
				0: {
					spaceBetween: 10,
				},
				1024: {
					spaceBetween: 22,
				},
			},
		});
	}

	// banner-slider
	if ($(".banner-slider").length > 0) {
		let $speed = 5000,
			$delay = 1000;

		if ($(".banner-slider").data("speed") !== undefined) {
			$speed = parseInt($(".banner-slider").data("speed"));
		}

		if ($(".banner-slider").data("delay") !== undefined) {
			$delay = parseInt($(".banner-slider").data("delay"));
		}

		const bannerSlider = new Swiper(".banner-slider", {
			speed: $speed, // Встановлюємо швидкість
			autoplay: {
				delay: $delay, // Затримка перед автоматичним переключенням слайдів (мілісекунди)
			},
			loop: true,
			spaceBetween: 22,
			effect: "fade",
			navigation: {
				nextEl: ".btn-banner-slider-next",
				prevEl: ".btn-banner-slider-prev",
			},
			pagination: {
				el: ".banner-slider-pagination",
			},
		});
	}

	// home page shos slider
	const sliderShops = new Swiper(".shops-slider", {
		// speed: 1000,
		// autoplay: {
		// 	delay: 3000, // Затримка перед автоматичним переключенням слайдів (мілісекунди)
		// },
		// loop: true,
		spaceBetween: 13,
		slidesPerView: 4,
		navigation: {
			nextEl: ".btn-slider-shops-next",
			prevEl: ".btn-slider-shops-prev",
		},
		breakpoints: {
			0: {
				slidesPerView: "auto",
			},
			1440: {
				slidesPerView: 4,
			},
		},
	});

	// home page slider adv
	if ($(".slider-adv").length > 0) {
		let $speed = 5000,
			$delay = 1000;

		if ($(".banner-slider").data("speed") !== undefined) {
			$speed = parseInt($(".banner-slider").data("speed"));
		}

		if ($(".banner-slider").data("delay") !== undefined) {
			$delay = parseInt($(".banner-slider").data("delay"));
		}

		const sliderAdv = new Swiper(".slider-adv", {
			speed: $speed, // Встановлюємо швидкість
			// autoplay: {
			// 	delay: $delay, // Затримка перед автоматичним переключенням слайдів (мілісекунди)
			// },
			loop: true,
			slidesPerView: 4,
			spaceBetween: 12,
			navigation: {
				nextEl: ".btn-slider-adv-next",
				prevEl: ".btn-slider-adv-prev",
			},
			pagination: {
				el: ".slider-adv-pagination",
			},
			breakpoints: {
				0: {
					slidesPerView: "auto",
					spaceBetween: 15,
				},
				1440: {
					slidesPerView: 4,
					spaceBetween: 32,
				},
			},
		});
	}

	// cards slider
	$(".card-image-slider").each(function (index, element) {
		var sliderId = "card-slider-" + index;
		var nextButtonId = "swiper-button-next-" + index;
		var prevButtonId = "swiper-button-prev-" + index;

		$(element).attr("id", sliderId);
		$(element).parent().find(".btn-card-image-next").attr("id", nextButtonId);
		$(element).parent().find(".btn-card-image-prev").attr("id", prevButtonId);

		var swiper = new Swiper("#" + sliderId, {
			slidersPerView: 1,
			navigation: {
				nextEl: "#" + nextButtonId,
				prevEl: "#" + prevButtonId,
			},
		});
	});

	// слайдер в карточці товару
	if ($(".product-card-image").length > 0) {
		let $speed = 800;
		if ($(".product-card-image").data("speed") !== undefined) {
			$speed = parseInt($(".product-card-image").data("speed"));
		}
		// thumbs
		const productCardImageThumbs = new Swiper(".product-card-image-thumbs", {
			speed: $speed,
			slidesPerView: "auto",
			spaceBetween: 20,
			freeMode: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			scrollbar: {
				el: ".product-card-image-thumbs-scrollbar",
				draggable: true,
			},
		});

		const productCardImage = new Swiper(".product-card-image", {
			speed: $speed,
			slidersPerView: 1,
			navigation: {
				nextEl: ".btn-product-card-next",
				prevEl: ".btn-product-card-prev",
			},
			pagination: {
				el: ".product-card-slider-pagination",
			},
			thumbs: {
				swiper: productCardImageThumbs,
			},
		});

		// productCardImage.controller.contol = productCardImageThumbs;
		// productCardImageThumbs.controller.controller = productCardImage;
	}

	// сладера в карточці товару
	if ($(".slider").length > 0) {
		$(".slider").each(function (index) {
			$(this)
				.find(".btn-next")
				.addClass("btn-next-" + index);
			$(this)
				.find(".btn-prev")
				.addClass("btn-prev-" + index);
			$(this)
				.find(".swiper-goods")
				.addClass("swiper-goods-" + index);

			let $speed = 800;
			if ($(this).find(".swiper-goods").data("speed") !== undefined) {
				$speed = parseInt($(this).find(".swiper-goods").data("speed"));
			}

			new Swiper(".swiper-goods-" + index, {
				speed: $speed, // Встановлюємо швидкість
				slidesPerView: 5,
				spaceBetween: 22,
				navigation: {
					nextEl: ".btn-next-" + index,
					prevEl: ".btn-prev-" + index,
				},
				breakpoints: {
					0: {
						slidesPerView: "auto",
						spaceBetween: 8,
					},
					1440: {
						slidesPerView: 5,
					},
				},
			});
		});

		// $('.slider').each(function (index) {
		// 	let sliderName = ".swiper-" + index;

		// 	console.log(sliderName);
		// })
	}

	// desktop-category
	$(".btn-category-desktop").click(function () {
		$(".category-desktop").removeClass("hidden");
		$(".category-arrow-down").addClass("rotate-x-180");
		$("body").addClass("lock");
	});

	$(".category-desktop-close").click(function () {
		$(".category-desktop").addClass("hidden");
		$(".category-arrow-down").removeClass("rotate-x-180");
		$("body").removeClass("lock");
		$(".category__item").removeClass("active");
		$(".category__submenu-item").removeClass("active");
		$("[data-category-level-2]").addClass("hidden");
		$("[data-category-level-3]").addClass("hidden");
		$(".category__submenu-item").find("svg").remove();
	});

	$(".category__item").mouseenter(function () {
		if (!$(this).hasClass("active")) {
			$(".category__item").removeClass("active");
			$(".category__submenu-item").removeClass("active");
			$("[data-category-level-2]").addClass("hidden");
			$("[data-category-level-3]").addClass("hidden");
			$(".category__submenu-item").find("svg").remove();

			$(this).addClass("active");
			$catID = $(this).data("category");
			$("[data-category-level-2]").each(function () {
				if ($(this).data("category-level-2") === $catID) {
					$(this).removeClass("hidden");
				}
			});
		}
	});

	$(".category__submenu-item").mouseenter(function () {
		if (!$(this).hasClass("active")) {
			$currentItem = $(this);
			$(".category__submenu-item").removeClass("active");
			$(".category__submenu-item").find("svg").remove();
			$("[data-category-level-3]").addClass("hidden");
			$currentItem.addClass("active");
			$catID = $currentItem.data("submenu");
			$("[data-category-level-3]").each(function () {
				if ($(this).data("category-level-3") === $catID) {
					$currentItem.find("a").append('<svg class="lx:-right-3.5 absolute -right-2 top-1/2 h-2.5 w-2.5 -translate-y-1/2 xl:h-3.5 xl:w-3.5"><use xlink:href="img/svg/sprites/sprite-icons.svg#chevron-right"></use></svg>');
					$(this).removeClass("hidden");
				}
			});
		}
	});

	// category mobile
	$(".btn-category-mobile").click(function () {
		$(this).addClass("active");
		$(".category-mobile").removeClass("hidden");
		$("body").addClass("lock-mobile");
	});

	$(".category-mobile__item").click(function (e) {
		$currentItem = $(this);
		$catID = $currentItem.data("mobile-category");
		$("[data-mobile-subctg-level-2]").each(function () {
			if ($(this).data("mobile-subctg-level-2") === $catID) {
				e.preventDefault();
				$(".category-mobile-main").addClass("hidden");
				$(".subcategory-mobile-level-1").removeClass("hidden");
				$(this).removeClass("hidden");
			}
		});
	});

	$(".category-mobile__submenu-item").click(function (e) {
		$currentItem = $(this);
		$catID = $currentItem.data("mobile-submenu");
		console.log($catID);
		$("[data-mobile-subctg-level-3]").each(function () {
			if ($(this).data("mobile-subctg-level-3") === $catID) {
				e.preventDefault();
				$(".subcategory-mobile-level-1").addClass("hidden");
				$(".subcategory-mobile-level-2").removeClass("hidden");
				$("[data-mobile-subctg-level-2]").addClass("hidden");
				$(this).removeClass("hidden");
			}
		});
	});

	$(".category-mobile-close").click(function () {
		$(".category-mobile").addClass("hidden");
		$(".category-mobile-main").removeClass("hidden");
		$(".subcategory-mobile-level-1").addClass("hidden");
		$(".subcategory-mobile-level-2").addClass("hidden");
		$("[data-mobile-subctg-level-2]").addClass("hidden");
		$("[data-mobile-subctg-level-3]").addClass("hidden");
		$("body").removeClass("lock-mobile");
	});

	// modal
	$("[data-modal]").click(function () {
		$btn = $(this);
		$modalName = $btn.data("modal");
		Fancybox.show([
			{
				src: "#" + $modalName,
				closeButton: false,
				backdropClick: false,
				clickOutside: false,
				type: "inline",
			},
		]);
	});

	// modal close
	$(".modal-close").click(function () {
		Fancybox.close();
	});

	// faq accordeon
	$(".faq-btn").click(function () {
		$(".faq-content").not($(this).next()).slideUp();
		$(".faq-item").not($(this).parent()).removeClass("active");
		$(".faq-item").not($(this).parent()).find("svg").removeClass("rotate-x-180");
		$(this).parent().toggleClass("active");
		$(this).next().slideToggle();
		$(this).find("svg").toggleClass("rotate-x-180");
	});

	// autocomplete search
	$(".search-field").each(function () {
		$(this)
			.autocomplete({
				appendTo: $(this).next(),
				minLength: 3,
				source: function (request, response) {
					if (request.term.length >= 3) {
						// Відправка AJAX-запиту до сервера для завантаження даних
						$.ajax({
							url: "./files/search-data.json",
							dataType: "json",
							success: function (data) {
								var filteredData = data.filter(function (item) {
									// Фільтрація даних за текстом введеного запиту
									return item.text.toLowerCase().indexOf(request.term.toLowerCase()) !== -1;
								});

								// Створення посилань з тексту
								var results = filteredData.map(function (item) {
									return {
										label: item.text,
										value: item.link,
									};
								});

								response(results); // Передача результатів до компоненту автозаповнення
							},
							error: function () {
								// Обробка помилок
								console.log("Помилка при завантаженні даних");
								response([]); // Повернення порожнього масиву у випадку помилки
							},
						});
					} else {
						response([]); // Повернення порожнього масиву, коли менше трьох символів
					}
				},
				select: function (event, ui) {
					$(this).val(ui.item.label);
					return false;
				},
			})
			.autocomplete("instance")._renderItem = function (ul, item) {
			// Перевірка, чи є введена фраза
			var term = this.term || "";
			var regexp = new RegExp("(" + $.ui.autocomplete.escapeRegex(term) + ")", "gi");

			// Виділення фрази у тексті результату
			var highlightedText = item.label.replace(regexp, '<span class="highlighted">$1</span>');

			// Створення пункту списку з виділеним текстом
			return $("<li class='py-1.5 px-2.5 text-sm'>")
				.append("<a class='autocomplete__item' href='" + item.value + "'><div class='autocomplete__item-name'><span>" + highlightedText + "</span></div></a>")
				.appendTo(ul);
		};
	});

	// footer mobile open menus
	$(".footer-btn-menu").click(function () {
		$("ul").not($(this).parent().next()).slideUp();
		$("svg").not($(this)).removeClass("rotate-x-180");
		$(this).parent().next().slideToggle();
		$(this).find("svg").toggleClass("rotate-x-180");
	});

	// footer up button
	$(".scroll-up").each(function () {
		$(this).click(function (e) {
			e.preventDefault();
			e.stopPropagation();
			var winHeight = $(document).height();
			var step = 12;
			var timeToScroll = winHeight / step;
			$("html, body").stop().animate(
				{
					scrollTop: 0,
				},
				500
			);
		});
	});

	// account menu

	$(".account-btn").each(function () {
		$(this).click(function (e) {
			e.preventDefault();

			$(".account-menu").toggleClass("hidden");

			if (window.matchMedia("(max-width: 63.9988em)").matches) {
				$("body").toggleClass("lock-mobile");
			}
		});
	});

	$(".buyer-btn").click(function () {
		if ($(".buyer-menu").hasClass("hidden")) {
			$(".seller-menu").addClass("hidden");
			$(".buyer-menu").removeClass("hidden");
			$(".btn-panel").attr("href", $(this).data("link-panel"));
		}
	});

	$(".seller-btn").click(function () {
		if ($(".seller-menu").hasClass("hidden")) {
			$(".buyer-menu").addClass("hidden");
			$(".seller-menu").removeClass("hidden");
			$(".btn-panel").attr("href", $(this).data("link-panel"));
		}
	});

	$(".account-menu-close").on("click", function () {
		$(".account-menu").addClass("hidden");

		if (window.matchMedia("(max-width: 63.9988em)").matches) {
			$("body").removeClass("lock-mobile");
		}
	});

	// info-banner
	$(".info-banner-close").click(() => {
		if ($(".info-banner").parent().hasClass("mt-7.5 xl:hidden")) {
			$(".info-banner").parent().remove();
		}

		if ($(".info-banner").parent().hasClass("mb-6 hidden lg:block")) {
			$(".info-banner").parent().remove();
		} else {
			$(".info-banner").remove();
		}
	});

	//filters desktop

	(function () {
		$(".filter-btn").click(function () {
			if ($(this).closest(".filter-item").find(".filter-dropdown").hasClass("hidden")) {
				$(".filter-dropdown").addClass("hidden");
				$(this).closest(".filter-item").find(".filter-dropdown").removeClass("hidden");
				$(this).find(".filter-btn-arrow-down").addClass("rotate-x-180");
			} else {
				$(this).closest(".filter-item").find(".filter-dropdown").addClass("hidden");
				$(this).find(".filter-btn-arrow-down").removeClass("rotate-x-180");
			}
		});

		$(".filter-dropdown ul li").click(function (e) {
			let $multiselect = $(this).closest(".filter-dropdown").data("filter-multiselect");
			let $filterName = $(this).closest(".filter-dropdown").data("filter-name");

			if (!$multiselect) {
				let $btnText = $(this).closest(".filter-item").find(".filter-btn .selected-placeholder");
				let $filterSelectedItem = $(this).text();
				let $filterOption = $(this).data("filter-option");
				$btnText.text($filterSelectedItem);
				$(this).parent().find("li").removeClass("selected");

				// $('.filter-static[data-filter-name="' + $filterName + '"] li').removeClass("selected");

				// якщо є типу радіо кнопка, обробляємо
				if ($(this).parent().find("li .filter-radio").length > 0) {
					$(this).parent().find("li .filter-radio span").removeClass("opacity-100");
					$(this).parent().find("li .filter-radio span").addClass("opacity-0");
				}

				$(this).addClass("selected");

				// $('.filter-static[data-filter-name="' + $filterName + '"]')
				// 	.find('[data-filter-option="' + $filterOption + '"]')
				// 	.addClass("selected");

				// якщо є типу радіо кнопка, обробляємо
				if ($(this).find(".filter-radio").length > 0) {
					$(this).find(".filter-radio span").removeClass("opacity-0");
					$(this).find(".filter-radio span").addClass("opacity-100");
				}

				$(this).closest(".filter-dropdown").addClass("hidden");
				$(this).closest(".filter-item").find(".filter-btn .filter-btn-arrow-down").removeClass("rotate-x-180");

				if ($(".filter-selected-options-body").hasClass("hidden")) {
					$(".filter-selected-options-body").removeClass("hidden");

					$(".filter-selected-options").prepend('<div class="flex h-6 items-center gap-4 rounded-lge bg-dusty-gray/[0.08] px-2 text-shark lg:px-4" data-filter-btn-name="' + $filterName + '" data-filter-option="' + $filterOption + '"><div class="text-sm">' + $filterSelectedItem + '</div><button class="btn-filter-delete relative h-3.5 w-3.5 rounded-full bg-dusty-gray" aria-label="Видалити фільтр"><svg class="absolute left-1/2 top-1/2 h-2 w-2 stroke-white -translate-x-1/2 -translate-y-1/2"><use xlink:href="img/svg/sprites/sprite-icons.svg#close"></use></svg></button></div>');
				} else {
					$("[data-filter-btn-name=" + $filterName + "]").remove();

					$(".filter-selected-options").prepend('<div class="flex h-6 items-center gap-4 rounded-lge bg-dusty-gray/[0.08] px-2 text-shark lg:px-4" data-filter-btn-name="' + $filterName + '" data-filter-option="' + $filterOption + '"><div class="text-sm">' + $filterSelectedItem + '</div><button class="btn-filter-delete relative h-3.5 w-3.5 rounded-full bg-dusty-gray" aria-label="Видалити фільтр"><svg class="absolute left-1/2 top-1/2 h-2 w-2 stroke-white -translate-x-1/2 -translate-y-1/2"><use xlink:href="img/svg/sprites/sprite-icons.svg#close"></use></svg></button></div>');
				}

				if (!$filterName === 'lang') {
					filterData();
				} else {
					let lang = [];
					lang.push($filterOption)
					console.log(lang);
					
				}

			} else {
				$(this).toggleClass("selected");
				$(this).find(".check-icon").toggleClass("opacity-0");
				$(this).find(".check-icon").toggleClass("opacity-100");

				// рахуємо кількість вибраних елементів
				let $counter = 0;
				let $counterSelectedElement = $(this).closest(".filter-item").find(".counter-selected");
				$counter = $(this).closest(".filter-dropdown").find(".selected").length;

				// показуємо кількість вибраних елементів
				if ($counter > 0) {
					$counterSelectedElement.removeClass("hidden");
					$counterSelectedElement.find("span").text($counter);
				} else {
					$counterSelectedElement.addClass("hidden");
				}
			}
		});

		$(".btn-filter-apply").click(function () {
			let $currentDropDownFilter = $(this).closest(".filter-dropdown");
			let $filterName = $(this).closest(".filter-dropdown").data("filter-name");
			let $selectedItems = $currentDropDownFilter.find("li.selected").get().reverse();
			let $countSelectedItems = $currentDropDownFilter.find("li.selected").length;

			$currentDropDownFilter.addClass("hidden");

			if ($countSelectedItems > 0) {
				if ($(".filter-selected-options-body").hasClass("hidden")) {
					$(".filter-selected-options-body").removeClass("hidden");
					$.each($selectedItems, function () {
						let $filterSelectedItem = $(this).find(".filter-option-name").text();
						let $filterOption = $(this).data("filter-option");
						$(".filter-selected-options").prepend('<div class="flex h-6 items-center gap-4 rounded-lge bg-dusty-gray/[0.08] px-2 text-shark lg:px-4" data-filter-btn-name="' + $filterName + '" data-filter-option="' + $filterOption + '"><div class="text-sm">' + $filterSelectedItem + '</div><button class="btn-filter-delete relative h-3.5 w-3.5 rounded-full bg-dusty-gray" aria-label="Видалити фільтр"><svg class="absolute left-1/2 top-1/2 h-2 w-2 stroke-white -translate-x-1/2 -translate-y-1/2"><use xlink:href="img/svg/sprites/sprite-icons.svg#close"></use></svg></button></div>');
					});
				} else {
					$("[data-filter-btn-name=" + $filterName + "]").remove();
					$.each($selectedItems, function () {
						let $filterSelectedItem = $(this).find(".filter-option-name").text();
						let $filterOption = $(this).data("filter-option");
						$(".filter-selected-options").prepend('<div class="flex h-6 items-center gap-4 rounded-lge bg-dusty-gray/[0.08] px-2 text-shark lg:px-4" data-filter-btn-name="' + $filterName + '" data-filter-option="' + $filterOption + '"><div class="text-sm">' + $filterSelectedItem + '</div><button class="btn-filter-delete relative h-3.5 w-3.5 rounded-full bg-dusty-gray" aria-label="Видалити фільтр"><svg class="absolute left-1/2 top-1/2 h-2 w-2 stroke-white -translate-x-1/2 -translate-y-1/2"><use xlink:href="img/svg/sprites/sprite-icons.svg#close"></use></svg></button></div>');
					});
				}

				filterData();
			}

			$(this).closest(".filter-item").find(".filter-btn-arrow-down").removeClass("rotate-x-180");

			// $(this).closest(".filter-dropdown").find('.filter-input-search').val('');
			// $(this).closest(".filter-dropdown").find('li').show();
		});

		$(".filter-selected-options").on("click", ".btn-filter-delete", function () {
			let $filterName = $(this).parent().data("filter-btn-name");
			let $filterOption = $(this).parent().data("filter-option");
			let $multiselect = $('[data-filter-name="' + $filterName + '"]').data("filter-multiselect");

			if ($multiselect !== undefined) {
				console.log("multiselect");
				// для мультіселекта
				$('[data-filter-name="' + $filterName + '"]')
					.find('[data-filter-option="' + $filterOption + '"]')
					.removeClass("selected");
				$('[data-filter-name="' + $filterName + '"]')
					.find('[data-filter-option="' + $filterOption + '"] .check-icon')
					.removeClass("opacity-100");
				$('[data-filter-name="' + $filterName + '"]')
					.find('[data-filter-option="' + $filterOption + '"] .check-icon')
					.addClass("opacity-0");

				let $counterSelectedElement = $('[data-filter-name="' + $filterName + '"]')
					.closest(".filter-item")
					.find(".counter-selected");
				let $counter = $('[data-filter-name="' + $filterName + '"]').find(".selected").length;

				if ($counter > 0) {
					$counterSelectedElement.removeClass("hidden");
					$counterSelectedElement.find("span").text($counter);
				} else {
					$counterSelectedElement.addClass("hidden");
				}
			} else {
				// ставипо значення фільтру за замовчуванням
				// знаходимо значення за замовчуванням
				$filterDefaultStateElement = $('[data-filter-name="' + $filterName + '"]')
					.parent()
					.find(".filter-btn .default-placeholder");

				// змінюємо значення
				$filterDefaultStateElement.next().text($filterDefaultStateElement.text());

				// видалаємо клас selected у фільтрі
				$('[data-filter-name="' + $filterName + '"]')
					.find("li")
					.removeClass("selected");

				if ($('[data-filter-name="' + $filterName + '"]').find("li .filter-radio").length > 0) {
					$('[data-filter-name="' + $filterName + '"]')
						.find("li .filter-radio span")
						.removeClass("opacity-100");
					$('[data-filter-name="' + $filterName + '"]')
						.find("li .filter-radio span")
						.addClass("opacity-0");
				}
			}

			$(this).parent().remove();
			filterData();

			if ($(".filter-selected-options .btn-filter-delete").length < 1) {
				$(".filter-selected-options-body").addClass("hidden");
			}
		});

		// видаляємо всі фільтри
		$(".btn-filter-all-remove").click(function () {
			clearDesktopFilter();
			filterData();
		});

		// пошук у фільтрі, в якому є пошук, мін. 3 символа
		$(".filter-input-search").each(function () {
			$(this).on("input", function () {
				const searchTerm = $(this).val().trim().toLowerCase();
				$(this).closest(".filter-with-search").find(".not-found").addClass("hidden");
				let found = false;

				// Перевіряємо, чи введено хоча б три літери для пошуку
				if (searchTerm.length >= 3) {
					// Перебираємо всі елементи списку

					$(this)
						.parent()
						.next()
						.find("li")
						.each(function () {
							const filterOptionName = $(this).find(".filter-option-name");

							// Оригінальний текст елемента
							const originalText = filterOptionName.text();

							// Перевіряємо, чи знайдено збіг
							if (originalText.toLowerCase().includes(searchTerm)) {
								// Замінюємо текст елемента з виділенням знайденого тексту та першої великої літери
								const highlightedText = originalText.replace(new RegExp(`(${searchTerm})`, "gi"), '<span class="highlight">$1</span>');
								filterOptionName.html(highlightedText.charAt(0).toUpperCase() + highlightedText.slice(1));

								$(this).show(); // Показуємо знайдений елемент
								found = true;
							} else {
								$(this).hide(); // Ховаємо елемент, якщо немає збігу
							}
						});
					// Відображаємо або приховуємо повідомлення про "Не знайдено"
					if (found) {
						$(this).closest(".filter-with-search").find(".not-found").addClass("hidden");
					} else {
						$(this).closest(".filter-with-search").find(".not-found").removeClass("hidden");
					}
				} else {
					// Якщо введено менше трьох літер, показуємо всі елементи і прибираємо виділення
					$(this).parent().next().find("li").show();
					$(this)
						.parent()
						.next()
						.find("li .highlight")
						.each(function () {
							$(this).replaceWith($(this).text());
						});

					$(this).closest(".filter-with-search").find(".not-found").addClass("hidden");
				}
			});
		});

		// приховуємо елементи фільтрів якщо є атрибут data-show-items та кнопка btn-show-all
		$("[data-show-items]").each(function () {
			let $elements = $(this).find("li");
			let $numForShow = parseInt($(this).data("show-items"));

			$elements.each(function (index) {
				if (index > $numForShow - 1) {
					$(this).hide();
				}
			});
		});

		// показуємо/ховаємо елементи
		$(".btn-filter-show-all").click(function () {
			if (!$(this).hasClass("active")) {
				$(this).closest(".filter-dropdown").find("li").show(); // основний фільтр desktop
				$(this).closest(".filter-static-item").find(".filter-static li").show(); // filters-all
				$(this).addClass("active");
				$(this).text("Приховати");
			} else {
				$(this).removeClass("active");
				$(this).text("Показати все");

				if ($(this).closest(".filter-dropdown").find("li").length > 0) {
					let $elements = $(this).closest(".filter-dropdown").find("li");
					let $numForShow = parseInt($(this).closest(".filter-dropdown").data("show-items"));

					$elements.each(function (index) {
						if (index > $numForShow - 1) {
							$(this).hide();
						}
					});
				}

				if ($(this).closest(".filter-static-item").find(".filter-static li").length > 0) {
					let $elements = $(this).closest(".filter-static-item").find(".filter-static li");
					let $numForShow = parseInt($(this).closest(".filter-static-item").find(".filter-static").data("show-items"));

					$elements.each(function (index) {
						if (index > $numForShow - 1) {
							$(this).hide();
						}
					});
				}
			}
		});

		// filter price
		$('[data-filter-name="price"] input').each(function () {
			// $(this).on("focus", function () {
			// 	$(this).val("");
			// });

			$(this).on("input", function () {
				// Вилучаємо будь-які символи, які не є цифрами
				let inputValue = $(this)
					.val()
					.replace(/[^0-9]/g, "");
				$(this).val(inputValue);
			});
		});

		$('[data-filter-name="price"] .filter-price-from').each(function () {
			$(this).on("input", function () {
				let priceFrom = $(this).val();
				let priceTo = $(this).closest(".filter-inputs-wrapper").find(".filter-price-to").val();

				if (priceFrom !== "" && priceTo !== "" && parseFloat(priceFrom) > parseFloat(priceTo)) {
					$("[data-filter-name='price'] .btn-filter-apply").prop("disabled", true);
					$(".filters-all .btn-filters-all-show").prop("disabled", true);
				} else {
					$("[data-filter-name='price'] .btn-filter-apply").prop("disabled", false);
					$(".filters-all .btn-filters-all-show").prop("disabled", false);
				}
			});
		});

		$('[data-filter-name="price"] .filter-price-to').each(function () {
			$(this).on("input", function () {
				let priceFrom = $(this).closest(".filter-inputs-wrapper").find(".filter-price-from").val();
				let priceTo = $(this).val();

				// Перевірка, чи обидва поля заповнені і ціна від менше або дорівнює ціні до

				if (priceFrom !== "" && priceTo !== "" && parseFloat(priceFrom) > parseFloat(priceTo)) {
					$("[data-filter-name='price'] .btn-filter-apply").prop("disabled", true);
					$(".filters-all .btn-filters-all-show").prop("disabled", true);
				} else {
					$("[data-filter-name='price'] .btn-filter-apply").prop("disabled", false);
					$(".filters-all .btn-filters-all-show").prop("disabled", false);
				}
			});
		});

		$('[data-filter-name="price"] .btn-filter-apply').click(function () {
			let filterPlaceholder = "";
			let priceFrom = parseInt($("[data-filter-name='price'] .filter-price-from").val());
			let priceTo = parseInt($("[data-filter-name='price'] .filter-price-to").val());

			if (priceFrom === 0 && priceTo === 0) {
				filterPlaceholder = "Ціна не вказана";
			}

			if (priceFrom === 0 && isNaN(priceTo)) {
				filterPlaceholder = "Ціна не вказана";
			}

			if (isNaN(priceFrom) && priceTo === 0) {
				filterPlaceholder = "Ціна не вказана";
			}

			if (isNaN(priceFrom) && isNaN(priceTo)) {
				filterPlaceholder = "Ціна не вказана";
			}

			if (priceFrom > 0 && isNaN(priceTo)) {
				filterPlaceholder = ">" + priceFrom + "грн";
			}

			if (isNaN(priceFrom) && priceTo > 0) {
				filterPlaceholder = "<" + priceTo + "грн";
			}

			if (priceFrom > 0 && priceTo > 0) {
				filterPlaceholder = priceFrom + "грн - " + priceTo + "грн";
			}

			if (priceFrom === 0 && priceTo > 0) {
				filterPlaceholder = "<" + priceTo + "грн";
			}

			isNaN(priceFrom) ? (priceFrom = "") : "";
			isNaN(priceTo) ? (priceTo = "") : "";
			$(this).closest(".filter-item").find(".selected-placeholder").text(filterPlaceholder);

			// $(this).closest(".filter-dropdown").attr("data-filter-option-pricefrom", priceFrom);
			// $(this).closest(".filter-dropdown").attr("data-filter-option-priceto", priceTo);

			$("[data-filter-btn-name='price']").remove();
			if ($(".filter-selected-options-body").hasClass("hidden")) {
				$(".filter-selected-options-body").removeClass("hidden");
				$(".filter-selected-options").prepend('<div class="flex h-6 items-center gap-4 rounded-lge bg-dusty-gray/[0.08] px-2 text-shark lg:px-4" data-filter-btn-name="price" data-filter-option-pricefrom="' + priceFrom + '" data-filter-option-priceto="' + priceTo + '"><div class="text-sm line-clamp-1 text-ellipsis">' + filterPlaceholder + '</div><button class="btn-filter-delete relative h-3.5 w-3.5 rounded-full bg-dusty-gray" aria-label="Видалити фільтр"><svg class="absolute left-1/2 top-1/2 h-2 w-2 stroke-white -translate-x-1/2 -translate-y-1/2"><use xlink:href="img/svg/sprites/sprite-icons.svg#close"></use></svg></button></div>');
			} else {
				$(".filter-selected-options").prepend('<div class="flex h-6 items-center gap-4 rounded-lge bg-dusty-gray/[0.08] px-2 text-shark lg:px-4" data-filter-btn-name="price" data-filter-option-pricefrom="' + priceFrom + '" data-filter-option-priceto="' + priceTo + '"><div class="text-sm line-clamp-1 text-ellipsis">' + filterPlaceholder + '</div><button class="btn-filter-delete relative h-3.5 w-3.5 rounded-full bg-dusty-gray" aria-label="Видалити фільтр"><svg class="absolute left-1/2 top-1/2 h-2 w-2 stroke-white -translate-x-1/2 -translate-y-1/2"><use xlink:href="img/svg/sprites/sprite-icons.svg#close"></use></svg></button></div>');
			}

			filterData();
		});
	})();

	// all filters
	(function () {
		$(".btn-filters-all").click(function () {
			$(".filters-all").removeClass("hidden");
			$("body").addClass("lock");
			clearDesktopFilter();
			filterPriceLoadDefault();
		});

		$(".filters-all-close").click(function () {
			$(".filters-all").addClass("hidden");
			if ($(".filters-all").hasClass("open-from-mobile")) {
				$(".filters-all").removeClass("open-from-mobile");
			}
			$("body").removeClass("lock");
			filterPriceLoadDefault();
		});

		$(".btn-filters-all-show").click(function () {
			$(".filters-all").addClass("hidden");
			$("body").removeClass("lock");

			// для виведення тегів вибраних фільтрів, робимо реверс, щоб виведення було із початку
			reverseElements = $(".filter-static").get().reverse();

			$.each(reverseElements, function () {
				let $filterName = $(this).data("filter-name");

				if ($(this).data("filter-multiselect")) {
					let $selectedItems = $(this).find(".selected").get().reverse();

					// рахуємо кількість вибраних елементів
					let $counter = 0;
					let $counterSelectedMainFilterElement = $('.filter-dropdown[data-filter-name="' + $filterName + '"]')
						.closest(".filter-item")
						.find(".counter-selected");
					$counter = $(this).find(".selected").length;

					// показуємо кількість вибраних елементів
					if ($counter > 0) {
						$counterSelectedMainFilterElement.removeClass("hidden");
						$counterSelectedMainFilterElement.find("span").text($counter);
					} else {
						$counterSelectedMainFilterElement.addClass("hidden");
					}

					$.each($selectedItems, function () {
						let $filterOption = $(this).data("filter-option");
						let $filterSelectedItem = $(this).find(".filter-option-name").text();
						$('.filter-dropdown[data-filter-name="' + $filterName + '"]')
							.find('li[data-filter-option="' + $filterOption + '"]')
							.addClass("selected");
						$('.filter-dropdown[data-filter-name="' + $filterName + '"]')
							.find('li[data-filter-option="' + $filterOption + '"] .check-icon')
							.removeClass("opacity-0");
						$('.filter-dropdown[data-filter-name="' + $filterName + '"]')
							.find('li[data-filter-option="' + $filterOption + '"] .check-icon')
							.addClass("opacity-100");

						if ($(".filter-selected-options-body").hasClass("hidden")) {
							$(".filter-selected-options-body").removeClass("hidden");

							$(".filter-selected-options").prepend('<div class="flex h-6 items-center gap-4 rounded-lge bg-dusty-gray/[0.08] px-2 text-shark lg:px-4" data-filter-btn-name="' + $filterName + '" data-filter-option="' + $filterOption + '"><div class="text-sm line-clamp-1 text-ellipsis">' + $filterSelectedItem + '</div><button class="btn-filter-delete relative h-3.5 w-3.5 rounded-full bg-dusty-gray" aria-label="Видалити фільтр"><svg class="absolute left-1/2 top-1/2 h-2 w-2 stroke-white -translate-x-1/2 -translate-y-1/2"><use xlink:href="img/svg/sprites/sprite-icons.svg#close"></use></svg></button></div>');
						} else {
							$(".filter-selected-options").prepend('<div class="flex h-6 items-center gap-4 rounded-lge bg-dusty-gray/[0.08] px-2 text-shark lg:px-4" data-filter-btn-name="' + $filterName + '" data-filter-option="' + $filterOption + '"><div class="text-sm line-clamp-1 text-ellipsis">' + $filterSelectedItem + '</div><button class="btn-filter-delete relative h-3.5 w-3.5 rounded-full bg-dusty-gray" aria-label="Видалити фільтр"><svg class="absolute left-1/2 top-1/2 h-2 w-2 stroke-white -translate-x-1/2 -translate-y-1/2"><use xlink:href="img/svg/sprites/sprite-icons.svg#close"></use></svg></button></div>');
						}
					});
				} else {
					if ($(this).find(".selected").length > 0) {
						let $filterOption = $(this).find(".selected").data("filter-option");
						let $filterSelectedItem = $(this).find(".selected").text();

						// змінюємо стан вибраних елементів після закриття в основному фільтрі
						$('.filter-dropdown[data-filter-name="' + $filterName + '"]')
							.find('[data-filter-option="' + $filterOption + '"]')
							.addClass("selected");
						// змінюємо стан плейсхолдера в основному фільтрі
						$('.filter-dropdown[data-filter-name="' + $filterName + '"]')
							.closest(".filter-item")
							.find(".selected-placeholder")
							.text($filterSelectedItem);

						if ($(this).find(".filter-radio").length > 0) {
							$('.filter-dropdown[data-filter-name="' + $filterName + '"]')
								.find('[data-filter-option="' + $filterOption + '"] .filter-radio span')
								.removeClass("opacity-0");
							$('.filter-dropdown[data-filter-name="' + $filterName + '"]')
								.find('[data-filter-option="' + $filterOption + '"] .filter-radio span')
								.addClass("opacity-100");
						}

						if ($(".filter-selected-options-body").hasClass("hidden")) {
							$(".filter-selected-options-body").removeClass("hidden");

							$(".filter-selected-options").prepend('<div class="flex h-6 items-center gap-4 rounded-lge bg-dusty-gray/[0.08] px-2 text-shark lg:px-4" data-filter-btn-name="' + $filterName + '" data-filter-option="' + $filterOption + '"><div class="text-sm line-clamp-1 text-ellipsis">' + $filterSelectedItem + '</div><button class="btn-filter-delete relative h-3.5 w-3.5 rounded-full bg-dusty-gray" aria-label="Видалити фільтр"><svg class="absolute left-1/2 top-1/2 h-2 w-2 stroke-white -translate-x-1/2 -translate-y-1/2"><use xlink:href="img/svg/sprites/sprite-icons.svg#close"></use></svg></button></div>');
						} else {
							$("[data-filter-btn-name=" + $filterName + "]").remove();

							$(".filter-selected-options").prepend('<div class="flex h-6 items-center gap-4 rounded-lge bg-dusty-gray/[0.08] px-2 text-shark lg:px-4" data-filter-btn-name="' + $filterName + '" data-filter-option="' + $filterOption + '"><div class="text-sm line-clamp-1 text-ellipsis">' + $filterSelectedItem + '</div><button class="btn-filter-delete relative h-3.5 w-3.5 rounded-full bg-dusty-gray" aria-label="Видалити фільтр"><svg class="absolute left-1/2 top-1/2 h-2 w-2 stroke-white -translate-x-1/2 -translate-y-1/2"><use xlink:href="img/svg/sprites/sprite-icons.svg#close"></use></svg></button></div>');
						}
					}
				}
			});

			let filterPlaceholder = "";
			let priceFrom = parseInt($(".filters-all").find("[data-filter-name='price'] .filter-price-from").val());
			let priceTo = parseInt($(".filters-all").find("[data-filter-name='price'] .filter-price-to").val());

			if (priceFrom === 0 && priceTo === 0) {
				filterPlaceholder = "Ціна не вказана";
			}

			if (priceFrom === 0 && isNaN(priceTo)) {
				filterPlaceholder = "Ціна не вказана";
			}

			if (isNaN(priceFrom) && priceTo === 0) {
				filterPlaceholder = "Ціна не вказана";
			}

			if (isNaN(priceFrom) && isNaN(priceTo)) {
				filterPlaceholder = "Ціна не вказана";
			}

			if (priceFrom > 0 && isNaN(priceTo)) {
				filterPlaceholder = ">" + priceFrom + "грн";
			}

			if (isNaN(priceFrom) && priceTo > 0) {
				filterPlaceholder = "<" + priceTo + "грн";
			}

			if (priceFrom > 0 && priceTo > 0) {
				filterPlaceholder = priceFrom + "грн - " + priceTo + "грн";
			}

			if (priceFrom === 0 && priceTo > 0) {
				filterPlaceholder = "<" + priceTo + "грн";
			}

			$('.filter-dropdown[data-filter-name="price"]').closest(".filter-item").find(".selected-placeholder").text(filterPlaceholder);

			isNaN(priceFrom) ? (priceFrom = "") : "";
			isNaN(priceTo) ? (priceTo = "") : "";
			// $('.filter-dropdown[data-filter-name="price"]').find(".filter-price-from").val(priceFrom);
			// $('.filter-dropdown[data-filter-name="price"]').find(".filter-price-to").val(priceTo);

			// $(this).closest(".filter-dropdown").attr("data-filter-option-pricefrom", priceFrom);
			// $(this).closest(".filter-dropdown").attr("data-filter-option-priceto", priceTo);

			$("[data-filter-btn-name='price']").remove();
			if ($(".filter-selected-options-body").hasClass("hidden")) {
				$(".filter-selected-options-body").removeClass("hidden");
				$(".filter-selected-options").prepend('<div class="flex h-6 items-center gap-4 rounded-lge bg-dusty-gray/[0.08] px-2 text-shark lg:px-4" data-filter-btn-name="price" data-filter-option-pricefrom="' + priceFrom + '" data-filter-option-priceto="' + priceTo + '"><div class="text-sm">' + filterPlaceholder + '</div><button class="btn-filter-delete relative h-3.5 w-3.5 rounded-full bg-dusty-gray" aria-label="Видалити фільтр"><svg class="absolute left-1/2 top-1/2 h-2 w-2 stroke-white -translate-x-1/2 -translate-y-1/2"><use xlink:href="img/svg/sprites/sprite-icons.svg#close"></use></svg></button></div>');
			} else {
				$(".filter-selected-options").prepend('<div class="flex h-6 items-center gap-4 rounded-lge bg-dusty-gray/[0.08] px-2 text-shark lg:px-4" data-filter-btn-name="price" data-filter-option-pricefrom="' + priceFrom + '" data-filter-option-priceto="' + priceTo + '"><div class="text-sm">' + filterPlaceholder + '</div><button class="btn-filter-delete relative h-3.5 w-3.5 rounded-full bg-dusty-gray" aria-label="Видалити фільтр"><svg class="absolute left-1/2 top-1/2 h-2 w-2 stroke-white -translate-x-1/2 -translate-y-1/2"><use xlink:href="img/svg/sprites/sprite-icons.svg#close"></use></svg></button></div>');
			}

			filterData();
		});

		$(".filter-static li").click(function (e) {
			let $filterStaticName = $(this).parent().data("filter-name");
			let $filterStaticOption = $(this).data("filter-option");
			let $multiselect = $(this).parent().data("filter-multiselect");

			if (!$multiselect) {
				$(this).parent().find("li").removeClass("selected");
				$(this).addClass("selected");

				// якщо є типу радіо кнопка, обробляємо
				if ($(this).find(".filter-radio").length > 0) {
					$(this).parent().find(".filter-radio span").removeClass("opacity-100");
					$(this).parent().find(".filter-radio span").addClass("opacity-0");
					$(this).find(".filter-radio span").removeClass("opacity-0");
					$(this).find(".filter-radio span").addClass("opacity-100");
				}
			} else {
				$(this).toggleClass("selected");
				$(this).find(".check-icon").toggleClass("opacity-0");
				$(this).find(".check-icon").toggleClass("opacity-100");
			}
		});
	})();

	// mobile filter
	(function () {
		$(".filters-mobile-btn").click(function () {
			$(".filters-all").removeClass("hidden");
			$(".filters-all").addClass("open-from-mobile");
			$("body").addClass("lock");
		});

		// $(".filters-mobile-btn-close").click(function () {
		// 	$(".filters-mobile-all").addClass("hidden");
		// 	$('body').removeClass('lock-mobile')
		// });
	})();
});

// дані фільтра формуємо в об'єкт
function filterData() {
	let filterData = {};
	$(".filter-selected-options [data-filter-btn-name]").each(function () {
		let nameFilter = $(this).data("filter-btn-name");
		let option = $(this).data("filter-option");

		// Перевіряємо, чи фільтр має імена "price"
		if (nameFilter === "price") {
			var priceFrom = $(this).data("filter-option-pricefrom");
			var priceTo = $(this).data("filter-option-priceto");

			// Перевіряємо, чи існує об'єкт для фільтра "price"
			if (!filterData[nameFilter]) {
				filterData[nameFilter] = {
					options: [],
				};
			}

			// Додаємо дані до об'єкта filterData для фільтра "price"
			filterData[nameFilter].options.push({ priceFrom });
			filterData[nameFilter].options.push({ priceTo });
		} else {
			// Перевірка для інших фільтрів, які не мають "price" в назві
			if (!filterData[nameFilter]) {
				filterData[nameFilter] = {
					options: [],
				};
			}

			filterData[nameFilter].options.push({ option });
		}
	});

	console.log(filterData);
}

// clear filter
function clearDesktopFilter() {
	// очищаємо блок із доданими фільтрами
	$(".filter-selected-options").children().not(":last").remove();
	// видалаємо клас selected у всих фільтрах
	$("[data-filter-name]").find("li").removeClass("selected");
	$("[data-filter-name]").find("li .check-icon").removeClass("opacity-100");
	$("[data-filter-name]").find("li .check-icon").addClass("opacity-0");
	$("[data-filter-name]").find("li .filter-radio span").removeClass("opacity-100");
	$("[data-filter-name]").find("li .filter-radio span").addClass("opacity-0");
	// ставимо дефолтні значення фільрів
	$("[data-filter-name]").each(function () {
		$filterDefaultStateElement = $(this).parent().find(".filter-btn .default-placeholder");
		$filterDefaultStateElement.next().text($filterDefaultStateElement.text());
	});
	// закриваємо блок для вибраних фільрів
	$(".filter-selected-options-body").addClass("hidden");
	$(".counter-selected").addClass("hidden");
	$(".counter-selected").find("span").text("");
}

// price default
function filterPriceLoadDefault() {
	$(".filter-price-from").each(function () {
		$defaultValue = $(this).data("default-value");
		$(this).val($defaultValue);
	});

	$(".filter-price-to").each(function () {
		$defaultValue = $(this).data("default-value");
		$(this).val($defaultValue);
	});

	$('[data-filter-name="price"]').find(".btn-filter-apply").prop("disabled", false);
	$('[data-filter-name="price"]').closest(".filters-all").find(".btn-filters-all-show").prop("disabled", false);
}

$(window).on("resize", function () {
	// mobile chrome fix for sticky bottom-0
	// We listen to the resize event
	// We execute the same script as before
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", `${vh}px`);
	// ===============================================================//

	clearDesktopFilter();

	if (!$(".category-desktop").hasClass("hidden")) {
		$(".category-desktop").addClass("hidden");
	}

	if (!$(".category-mobile").hasClass("hidden")) {
		$(".category-mobile").addClass("hidden");
	}

	if ($(".btn-category-mobile").hasClass("active")) {
		$(".btn-category-mobile").removeClass("active");
		$(".category-mobile-main").removeClass("hidden");
		$(".subcategory-mobile-level-1").addClass("hidden");
		$(".subcategory-mobile-level-2").addClass("hidden");
	}

	if ($("body").hasClass("lock")) {
		$("body").removeClass("lock");
	}

	if ($("body").hasClass("lock-mobile")) {
		$("body").removeClass("lock-mobile");
	}

	if (!$(".filters-all").hasClass("open-from-mobile")) {
		$(".filters-all").addClass("hidden");
	}

	if (!$(".account-menu").addClass("hidden")) {
		$(".account-menu").addClass("hidden");
	}

	$("footer ul").removeAttr("style");
	$(".footer-btn-menu").find("svg").removeClass("rotate-x-180");
});

$(document).mouseup(function (e) {
	if (!$(".category-desktop").hasClass("hidden")) {
		if (!$(".category-desktop-body").is(e.target) && $(".category-desktop-body").has(e.target).length === 0) {
			$(".category-desktop").addClass("hidden");
			$(".category-arrow-down").removeClass("rotate-x-180");
			$("body").removeClass("lock");
			$(".category__item").removeClass("active");
			$(".category__submenu-item").removeClass("active");
			$("[data-category-level-2]").addClass("hidden");
			$("[data-category-level-3]").addClass("hidden");
			$(".category__submenu-item").find("svg").remove();
		}
	}

	if (!$(".account-menu").hasClass("hidden")) {
		if (!$(".account-menu-body").is(e.target) && $(".account-menu-body").has(e.target).length === 0 && !$(".account-btn").is(e.target) && $(".account-btn").has(e.target).length === 0) {
			$(".account-menu").addClass("hidden");
			$("body").removeClass("lock-mobile");
		}
	}

	if (!$(".filter-dropdown").is(e.target) && $(".filter-dropdown").has(e.target).length === 0 && !$(".filter-btn").is(e.target) && $(".filter-btn").has(e.target).length === 0) {
		$(".filter-dropdown").addClass("hidden");
		$(".filter-btn-arrow-down").removeClass("rotate-x-180");
	}

	if (!$(".filters-all-body ").is(e.target) && $(".filters-all-body ").has(e.target).length === 0) {
		$(".filters-all").addClass("hidden");
		$("body").removeClass("lock");
	}
});
