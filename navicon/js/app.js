var headerWhite = true;

var timestamp = function() {
	var timeIndex = 0;
	var shifts = [35, 60, 60 * 3, 60 * 60 * 2, 60 * 60 * 25, 60 * 60 * 24 * 4, 60 * 60 * 24 * 10];

	var now = new Date();
	var shift = shifts[timeIndex++] || 0;
	var date = new Date(now - shift * 1000);

	return date.getTime() / 1000;
};

function onScroll() {
	var _headerWhite = false;

	if ($(".bg-white").length > 0) {
		$(".bg-white").each(function () {
			let bgWhiteTop = $(this).offset().top;
			let bgWhiteHeight = $(this).outerHeight();
			let headerOffset = $(".header").offset().top;

			if (
				headerOffset > bgWhiteTop &&
				headerOffset < bgWhiteTop + bgWhiteHeight
			) {
				_headerWhite = true;
			}
		});
	}

	if ($(".header").offset().top === 0) {
		$(".header").removeClass("fixed");
		headerWhite = true;
	} else {
		if (headerWhite !== _headerWhite) {
			headerWhite = _headerWhite;
			if (headerWhite) {
				$(".header").removeClass("fixed");
				$(".header").addClass("fixed-white");
			} else {
				$(".header").addClass("fixed");
				$(".header").removeClass("fixed-white");
			}
		}
	}
}

function random(min, max) {
	let num = Math.floor(Math.random() * (max - min + 1)) + min;
	return num;
}

function createLine(dot1, dot2, num) {
	let dot1Bound = dot1.dotHTML.getBoundingClientRect(),
		dot2Bound = dot2.dotHTML.getBoundingClientRect();

	let x1 = dot1.x + +dot1Bound.width * 0.5,
		y1 = dot1.y + +dot1Bound.height * 0.5,
		x2 = dot2.x + +dot2Bound.width * 0.5,
		y2 = dot2.y + +dot2Bound.height * 0.5;

	let colorDot1,
		colorDot2,
		strokeColor = `url(#Gradient${num})`,
		coordinates = ` x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"`;

	if (x1 <= x2) {
		colorDot1 = getComputedStyle(dot1.dotHTML).backgroundColor;
		colorDot2 = getComputedStyle(dot2.dotHTML).backgroundColor;
	} else {
		colorDot1 = getComputedStyle(dot2.dotHTML).backgroundColor;
		colorDot2 = getComputedStyle(dot1.dotHTML).backgroundColor;
	}

	if (x1 === x2 || y1 === y2) {
		strokeColor = "#CD40FF";
	}

	return `
		 <defs><linearGradient id="Gradient${num}">
			  <stop offset="0%" stop-color="${colorDot1}"/>
			  <stop offset="100%" stop-color="${colorDot2}"/>
		 </linearGradient></defs>
		 <line  filter="drop-shadow(0 0 25px ${colorDot2})" stroke="${strokeColor}" ${coordinates} />`;
}

class Dot {
	constructor(movingDot, x, y, velX, velY) {
		this.dotHTML = movingDot;
		this.x = x;
		this.y = y;
		this.velX = velX;
		this.velY = velY;
		this.dotHTML.style.animation = `${random(
			5,
			20
		)}s ease-in-out infinite changeColor both, ${random(
			10,
			20
		)}s ease-in-out infinite changeSize both`;
	}

	update(boundRectTop, boundRectBottom, boundRectLeft, boundRectRight) {
		let dotBound = this.dotHTML.getBoundingClientRect();
		if (
			dotBound.left + dotBound.width >= boundRectRight - dotBound.width ||
			dotBound.left < boundRectLeft + dotBound.width
		) {
			this.velX = -this.velX;
		}

		if (
			dotBound.top + dotBound.width >= boundRectBottom - dotBound.width ||
			dotBound.top < boundRectTop + dotBound.width
		) {
			this.velY = -this.velY;
		}
		this.x += this.velX;
		this.y += this.velY;
		this.dotHTML.style.left = this.x + "px";
		this.dotHTML.style.top = this.y + "px";
		this.dotHTML.style.boxShadow = `0 0 25px ${
			getComputedStyle(this.dotHTML).backgroundColor
		}`;
	}
}

class Tetrahedron {
	constructor(movingElement) {
		this.dots = [];
		this.boundElement = movingElement;
		this.boundRect = movingElement.getBoundingClientRect();

		movingElement
			.querySelectorAll(".moving-element__dot")
			.forEach((currentDot) => {
				let currentDotRect = currentDot.getBoundingClientRect(),
					dot = new Dot(
						currentDot,
						random(
							currentDotRect.width,
							this.boundRect.width - 25 - currentDotRect.width
						),
						random(
							currentDotRect.height,
							this.boundRect.height - 25 - currentDotRect.height
						),
						random(-1, 1),
						random(-1, 1)
					);

				this.dots.push(dot);
			});

		movingElement.querySelectorAll(".moving-element__line").forEach((line) => {
			line.innerHTML = `<svg viewbox=" 0 0 ${this.boundRect.width} ${this.boundRect.height}"></svg>`;
		});
	}

	updateLines() {
		let allLines = this.boundElement.querySelectorAll(
			".moving-element__line svg"
		);

		allLines[0].innerHTML = createLine(this.dots[0], this.dots[1], 1);
		allLines[1].innerHTML = createLine(this.dots[0], this.dots[2], 2);
		allLines[2].innerHTML = createLine(this.dots[0], this.dots[3], 3);
		allLines[3].innerHTML = createLine(this.dots[1], this.dots[2], 4);
		allLines[4].innerHTML = createLine(this.dots[1], this.dots[3], 5);
		allLines[5].innerHTML = createLine(this.dots[2], this.dots[3], 6);
	}

	update() {
		this.dots.forEach((dot) => {
			dot.update(
				this.boundRect.top,
				this.boundRect.bottom,
				this.boundRect.left,
				this.boundRect.right
			);
		});

		this.updateLines();
	}
}

function addAnimateTetrahedrons() {
	let allTetrahedrons = [];
	document
		.querySelectorAll(".moving-element__triangle")
		.forEach((tetrahedron) => {
			if (getComputedStyle(tetrahedron).display !== "none") {
				allTetrahedrons.push(new Tetrahedron(tetrahedron));
			}
		});

	function loop() {
		allTetrahedrons.forEach((tetrahedron) => {
			let tetrahedronBound = tetrahedron.boundElement.getBoundingClientRect();
			if (tetrahedronBound.bottom > 0 && tetrahedronBound.top < innerHeight) {
				tetrahedron.update();
			}
		});
		requestAnimationFrame(loop);
	}

	loop();
}

function addWritingTextHandler() {
	if (document.querySelector(".writing-text-block") !== null) {
		let allWritingTexts = document.querySelectorAll(".writing-text-list p"),
			changeLine = document
				.querySelector(".writing-text-block")
				.querySelector(".writing-text-block__change-part");

		let text = "",
			counter = 0,
			lineCounter = 0,
			result = "";

		function typeLine() {
			if (counter >= text.length) {
				setTimeout(deleteLine, 1500);
				return true;
			}
			result += `<span>${text[counter]}</span>`;
			changeLine.innerHTML = `${result}<span class="writing-text-block__cursor"></span>`;
			counter++;
			setTimeout(function () {
				requestAnimationFrame(typeLine);
			}, 80);
		}

		function deleteLine() {
			if (counter === 0) {
				setTimeout(startNewLine, 1000);
				return true;
			}
			result = result.slice(0, -14);
			changeLine.innerHTML = `${result}<span class="writing-text-block__cursor"></span>`;
			counter--;
			setTimeout(function () {
				requestAnimationFrame(deleteLine);
			}, 50);
		}

		function startNewLine() {
			text = allWritingTexts[lineCounter].textContent;
			lineCounter++;
			if (lineCounter >= allWritingTexts.length) {
				lineCounter = 0;
			}
			setTimeout(function () {
				requestAnimationFrame(typeLine);
			}, 1000);
		}

		startNewLine();
	}
}

function adaptiveHeightBlocks() {
	if (document.querySelector(".our-services__list") !== null) {
		let allLists = document
			.querySelector(".our-services__list")
			.querySelectorAll(".our-services__list-item-text-blocks");

		if (!window.matchMedia("(max-width: 767px)").matches) {
			resize();
			window.addEventListener("resize", resize);
		}

		function resize() {
			allLists.forEach((currentList) => {
				let maxHeight = 0;
				currentList
					.querySelectorAll(".our-services__list-item-text-title")
					.forEach((currentTitle) => {
						let titleHeight = +getComputedStyle(currentTitle).height.replace(
							"px",
							""
						);
						if (titleHeight > maxHeight) {
							maxHeight = titleHeight;
						}
					});
				currentList
					.querySelectorAll(".our-services__list-item-text-title")
					.forEach((currentTitle) => {
						currentTitle.style.height = maxHeight + "px";
					});
			});
		}
	}
}

$(".chart-doughnut").css({ width: "130px", height: "130px" });

if ($(window).outerWidth() <= 1024) {
	$(".chart-doughnut").css({ width: "85px", height: "85px" });
}

$(document).ready(function () {
	// show top menu
	$(".header__menu").click(function () {
		$(".header__burger").toggleClass("open");
		$(".menu").toggleClass("open");
	});

	// arrow scroll up

	$(window).scroll(function () {
		if ($(window).scrollTop() > 300) {
			$(".arrow-up").addClass("show");
		} else {
			$(".arrow-up").removeClass("show");
		}
	});

	$(".arrow-up").click(function () {
		$("html, body").animate({ scrollTop: 0 }, 1000);
	});

	// adress tabs

	$(".footer__point").click(function () {
		$(".footer__point").removeClass("active");
		$(".adress").removeClass("active");
		$(this).addClass("active");
		$(".adress[data-city=" + $(this).attr("data-city") + "]").addClass(
			"active"
		);
	});

	// video playback
	$(".video-btn").click(function () {
		let video = $("#" + $(this).attr("data-video"));

		if (video.get(0).paused) {
			video.get(0).play();
			$(this).html('<img src="img/svg/pause.svg" alt="pause">');
		} else {
			video.get(0).pause();
			$(this).html('<img src="img/svg/play.svg" alt="play">');
		}
	});

	$("video").click(function () {
		let video = $(this);
		console.log("clock");

		if (video.get(0).paused) {
			video.get(0).play();

			$("button[data-video=" + $(this).attr("id") + "]").html(
				'<img src="img/svg/pause.svg" alt="pause">'
			);
		} else {
			video.get(0).pause();

			$("button[data-video=" + $(this).attr("id") + "]").html(
				'<img src="img/svg/play.svg" alt="play">'
			);
		}
	});

	//header bg show on scroll

	if ($(".header").offset().top > 0) {
		$(".header").addClass("fixed");
	}

	onScroll();
	$(document).scroll(function () {
		onScroll();
	});

	// accorderon on width 414px

	$(window).on("resize", function () {
		if ($(window).outerWidth() <= 414) {
			$(".project-complex__item .acc-content").hide();
		} else {
			$(".project-complex__item .acc-content").show();
		}

		if ($(window).outerWidth() <= 1024) {
			$(".chart-doughnut").css({ width: "85px", height: "85px" });
		} else {
			$(".chart-doughnut").css({ width: "130px", height: "130px" });
		}

		if ($(window).outerWidth() <= 767) {
			$(".circle-acc-content-title").removeClass("active");
			$(".circle-acc-content-item").removeClass("active");
		}

		if ($(window).outerWidth() >= 768) {
			$(
				".circle-acc-content-item[data-item=" +
					$(".circle-acc-title.active").attr("data-item") +
					"]"
			).addClass("active");
			// console.log($(".circle-acc-title.active").attr('data-item'));
		}

		if ($(window).outerWidth() < 1365) {
			$(".acc-content-item").removeClass("active");
			$(".acc-content-item-title").removeClass("active");
			$(".acc-content-item-body").removeClass("active");
		}

		if ($(window).outerWidth() > 1365) {
			$(".acc-content-item").removeClass("active");
			$(".acc-content-item-title").removeClass("active");
			$(".acc-content-item-body").removeClass("active");
			$('.acc-list__item[data-curr="item-2"]').addClass("active");
			$(".acc-content-item").removeClass("active");
			$(
				".acc-content-item[data-prod=" +
					$('.acc-list__item[data-curr="item-2"]').attr("data-prod") +
					"]"
			).addClass("active");
		}

		$(".accordion__title--tech-partners").on("click", function () {
			if ($(window).outerWidth() >= 1026) {
				if (!$(this).hasClass("active")) {
					$(".accordion__title--tech-partners").removeClass("active");
					$(".accordion__content--tech-partners").removeClass("active");
					$('.accordion__title--tech-partners[data-title="' + $(this).attr("data-title") + '"]').addClass("active");
					$(".accordion__content--tech-partners[data-content=" + $(this).attr("data-title") + "]").addClass("active");

					var destination = $(this).offset().top - $(".header").outerHeight();
					$("html, body").animate({ scrollTop: destination }, 1000); // Скорость прокрутки
				}
			}

			if ($(window).outerWidth() <= 1025) {
				$('.accordion__title--tech-partners[data-title="' + $(this).attr("data-title") + '"]').toggleClass("active");
				$(".accordion__content--tech-partners[data-content=" + $(this).attr("data-title") + "]").toggleClass("active");

				var destination = $(this).offset().top - $(".header").outerHeight();
				$("html, body").animate({ scrollTop: destination }, 1000); // Скорость прокрутки
			}
		});
	});

	if ($(window).outerWidth() < 1365) {
		$(".acc-content-item").removeClass("active");
	}

	if ($(window).outerWidth() > 1365) {
		$(".acc-content-item").removeClass("active");
		$(".acc-content-item-title").removeClass("active");
		$('.acc-list__item[data-curr="item-2"]').addClass("active");
		$(".acc-content-item").removeClass("active");
		$(
			".acc-content-item[data-prod=" +
				$('.acc-list__item[data-curr="item-2"]').attr("data-prod") +
				"]"
		).addClass("active");
	}

	if ($(window).outerWidth() <= 414) {
		$(".project-complex__item .acc-content").hide();
		$(".project-complex__item .acc-title").click(function () {
			$(this).next().slideToggle();
			//console.log("click");
		});
	}

	if ($(window).outerWidth() <= 767) {
		$(".circle-acc-content-title").removeClass("active");
		$(".circle-acc-content-item").removeClass("active");

		$(".circle-acc-content-title").on("click", function () {
			//$(".circle-acc-content-title").removeClass("active");
			$(this).toggleClass("active");
			$(this).next().toggleClass("active");
			console.log("click");

			var destination = $(this).offset().top - $(".header").outerHeight();
			$("html, body").animate({ scrollTop: destination }, 1000);
		});
	}

	// $(".circle-acc-content-title").on("click", function () {
	// 	if (!$(this).hasClass("active")) {
	// 		$(".circle-acc-content-title").removeClass("active");
	// 		$(".circle-acc-content-item").removeClass("active");
	// 		$(this).addClass("active");
	// 		$(this).next().addClass("active");

	// 		var destination = $(this).offset().top - $(".header").outerHeight();

	// 		$("html, body").animate({ scrollTop: destination }, 1000);
	// 	}
	// });

	// get current page
	let currentPage = window.location.pathname.substr(
		window.location.pathname.lastIndexOf("/") + 1
	);
	//console.log(currentPage);

	if (
		currentPage === "vendor-ms.html" ||
		currentPage === "vendor-creatio.html" ||
		currentPage === "vendor-sf.html"
	) {
		$(".header__text span").text(
			"Ведущий партнер по customer excellence решениям"
		);
		$(".header__brand").remove();
	}

	if (currentPage === "case.html") {
		$(".header__text span").remove();
		$(".header__brand").remove();
	}

	// main brand slider
	if ($(".brand-slider").length > 0) {
		const brandSlider = new Swiper(".brand-slider", {
			// observer: true,
			// observeParents: true,
			//loop: true,
			// slidesPerView: 5,
			// spaceBetween: 30,
			navigation: {
				nextEl: ".brand-slider-next",
				prevEl: ".brand-slider-prev",
			},
			pagination: {
				el: ".brand-slider-pagination",
				clickable: true,
			},

			breakpoints: {
				320: {
					slidesPerView: 2,
					slidesPerColumn: 2,
					slidesPerColumnFill: "row",
					spaceBetween: 30,
				},

				1024: {
					slidesPerView: 5,
					spaceBetween: 30,
				},
			},
		});
	}

	if ($(".reach-slider").length > 0) {
		const reachSlider = new Swiper(".reach-slider", {
			slidesPerView: 1,
			spaceBetween: 20,
			navigation: {
				nextEl: ".reach-slider-btn-next",
				prevEl: ".reach-slider-btn-prev",
			},
			pagination: {
				el: ".reach-slider-pagination",
				clickable: true,
			},
		});
	}

	if ($(".history__gallery").length > 0) {
		const reachSlider = new Swiper(".history__gallery", {
			slidesPerView: "auto",
			spaceBetween: 20,
			freeMode: true,
			loop: true,
			speed: 10000,
			autoplay: {
				delay: 0.1,
				disableOnInteraction: false,
				autoplayDisableOnInteraction: false,
			},
		});

		$(".history__gallery.swiper-container").mouseenter(function () {
			//console.log("mouse over");
			reachSlider.autoplay.stop();
			$(this).find(".swiper-wrapper").css("transition-duration", "0ms");
			$(this)
				.find(".swiper-wrapper")
				.css(
					"transform",
					"translate3d(" + reachSlider.getTranslate() + "px, 0px, 0px)"
				);
		});

		$(".history__gallery.swiper-container").mouseleave(function () {
			// console.log("mouse leave");
			$(this)
				.find(".swiper-wrapper")
				.css("transition-duration", reachSlider.params.speed + "ms");
			reachSlider.update();
			reachSlider.autoplay.start();
		});
	}

	if ($(".vendor-ms__slider").length > 0) {
		const vendorMs = new Swiper(".vendor-ms__slider", {
			slidesPerView: "auto",
			spaceBetween: 40,
			navigation: {
				nextEl: ".vendor-ms__slider-btn-next",
				prevEl: ".vendor-ms__slider-btn-prev",
			},
		});
	}

	if ($(".vendors-ms__awards-slider-wrapper").length > 0) {
		const vendorAward = new Swiper(".vendors-ms__awards-slider-wrapper", {
			slidesPerView: 1,
			spaceBetween: 20,
			navigation: {
				nextEl: ".vendor-ms__awards-slider-btn-next",
				prevEl: ".vendor-ms__awards-slider-btn-prev",
			},
			pagination: {
				el: ".vendor-ms__awards-slider-pagination",
				clickable: true,
			},
		});
	}

	// vendor microsoft accordion

	$(".acc-list-nav .arr-prev").on("click", function () {
		console.log("click prev");
		$(".acc-list__item").removeClass("active");

		$(".acc-list__item").each(function (el) {
			let itemNumber = $(this)
				.attr("data-curr")
				.substr($(this).attr("data-curr").lastIndexOf("-") + 1);

			let newItem = Math.trunc(itemNumber) - 1;
			if (newItem < 1) {
				newItem = 4;
			}
			$(this).attr("data-curr", "item-" + newItem);
			$(this).removeClass("item-" + itemNumber);
			$(this).addClass("item-" + newItem);
		});

		$('.acc-list__item[data-curr="item-2"]').addClass("active");
		$(".acc-content-item").removeClass("active");
		$(
			".acc-content-item[data-prod=" +
				$('.acc-list__item[data-curr="item-2"]').attr("data-prod") +
				"]"
		).addClass("active");
	});

	$(".acc-list-nav .arr-next").on("click", function () {
		console.log("click next");
		$(".acc-list__item").removeClass("active");

		$(".acc-list__item").each(function (el) {
			let itemNumber = $(this)
				.attr("data-curr")
				.substr($(this).attr("data-curr").lastIndexOf("-") + 1);

			let newItem = Math.trunc(itemNumber) + 1;
			if (newItem > 4) {
				newItem = 1;
			}
			$(this).attr("data-curr", "item-" + newItem);
			$(this).removeClass("item-" + itemNumber);
			$(this).addClass("item-" + newItem);
		});
		$('.acc-list__item[data-curr="item-2"]').addClass("active");
		$(".acc-content-item").removeClass("active");
		$(
			".acc-content-item[data-prod=" +
				$('.acc-list__item[data-curr="item-2"]').attr("data-prod") +
				"]"
		).addClass("active");
	});

	// $(".acc-list .acc-list__item").click(function () {
	// 	$(".acc-list .acc-list__item").removeClass("active");
	// 	$(".acc-content-item").removeClass("active");

	// 	let dataProd = $(this).attr("data-prod");
	// 	$(this).addClass("active");
	// 	$(".acc-content-item[data-prod=" + dataProd + "]").addClass("active");
	// });

	$(".acc-content-item-title").click(function () {
		if ($(this).hasClass("active")) {
			$(this).removeClass("active");
			$(this).next(".acc-content-item-body").removeClass("active");
		} else {
			$(".acc-content-item-title").removeClass("active");
			$(".acc-content-item-body").removeClass("active");
			$(this).addClass("active");
			$(this).next(".acc-content-item-body").addClass("active");
		}
	});

	// team slider

	if ($(".team__slider").length > 0) {
		const teamSlider = new Swiper(".team__slider", {
			loop: true,
			centeredSlides: true,
			slidesPerView: "auto",
			grabCursor: true,
			speed: 800,
			effect: "coverflow",
			coverflowEffect: {
				rotate: 3,
				stretch: 380,
				depth: 100,
				modifier: 1.8,
				slideShadows: false,
			},
			breakpoints: {
				320: {
					coverflowEffect: {
						rotate: 3,
						stretch: 300,
						depth: 100,
						modifier: 1.8,
						slideShadows: false,
					},
				},
				768: {
					coverflowEffect: {
						rotate: 3,
						stretch: 380,
						depth: 100,
						modifier: 1.8,
						slideShadows: false,
					},
				},
			},
			navigation: {
				nextEl: ".team__slider-btn-next",
				prevEl: ".team__slider-btn-prev",
			},
		});

		teamSlider.on("transitionEnd", function () {
			let teamContactEmail = $(
				".swiper-slide-active .team__slider-item .team-item-descr .email"
			).text();
			$(".team__contacts").html(
				'<a class="link-lipstick" href="mailto:' +
					teamContactEmail +
					'">Связаться с этим членом команды</a>'
			);
		});
	}

	let teamContactEmail = $(
		".swiper-slide-active .team__slider-item .team-item-descr .email"
	).text();
	$(".team__contacts").html(
		'<a class="link-lipstick" href="mailto:' +
			teamContactEmail +
			'">Связаться с этим членом команды</a>'
	);

	if ($(".superpower-list").length > 0) {
		var superPower = new Swiper(".superpower-list", {
			observer: true,
			observeParents: true,
			slidesPerView: 4,
			//spaceBetween: 25,
			pagination: {
				el: ".superpower-pagination",
				clickable: true,
			},
			breakpoints: {
				320: {
					slidesPerView: "auto",
					spaceBetween: 10,
				},
				768: {
					slidesPerView: 2,
					slidesPerColumn: 2,
					slidesPerColumnFill: "row",
					spaceBetween: 25,
				},

				1200: {
					slidesPerView: 4,
					spaceBetween: 25,
				},
			},
		});
	}

	if ($(".event__list").length > 0) {
		var evetSlider = new Swiper(".event__list", {
			// observer: true,
			// observeParents: true,
			slidesPerColumn: 2,
			slidesPerView: 10,

			// spaceBetween: 30,
			pagination: {
				el: ".event-pagination",
				clickable: true,
			},
			breakpoints: {
				320: {
					slidesPerView: "auto",
					slidesPerColumnFill: "row",
					slidesPerColumn: 1,
					spaceBetween: 30,
				},
				// 768: {
				// 	slidesPerView: 4,
				// 	slidesPerColumn: 2,
				// 	slidesPerColumnFill: "row",
				// 	spaceBetween: 30,
				// },
				1500: {
					slidesPerColumn: 2,
					slidesPerView: 5,
					slidesPerColumnFill: "row",
					spaceBetween: 30,
				},
			},
		});
	}

	// range sliders

	//  quantity specialits

	if ($(".calc-spec").length > 0) {
		let calcSpec = document.querySelector(".calc-spec");

		noUiSlider.create(calcSpec, {
			start: 12,
			connect: true,
			step: 1,
			tooltips: wNumb({ decimals: 0 }),
			// pips: {
			// 	mode: "positions",
			// 	values: [0, 100],
			// },
			range: {
				min: 1,
				max: 20,
			},
		});

		calcSpec.noUiSlider.on("update", function () {
			var specSum = $(".calc-checkbox-input:checked").val();
			var specTotal = $(".calc-spec .noUi-handle").attr("aria-valuenow");
			var specPercTotal = $(".calc-perc .noUi-handle").attr("aria-valuenow");
			var totalPrice = Math.round(
				specSum * specTotal * 160 * (specPercTotal / 100)
			);
			var moneyFormat = wNumb({ thousand: " " });
			$(".total-price span").text(moneyFormat.to(totalPrice));
		});
	}

	if ($(".calc-perc").length > 0) {
		let calcPerc = document.querySelector(".calc-perc");

		noUiSlider.create(calcPerc, {
			start: 36,
			connect: true,
			step: 1,
			tooltips: wNumb({ decimals: 0, suffix: "%" }),
			// pips: {
			// 	mode: "positions",
			// 	values: [0, 100],
			// },
			range: {
				min: 1,
				max: 100,
			},
		});

		calcPerc.noUiSlider.on("update", function () {
			var specSum = $(".calc-checkbox-input:checked").val();
			var specTotal = $(".calc-spec .noUi-handle").attr("aria-valuenow");
			var specPercTotal = $(".calc-perc .noUi-handle").attr("aria-valuenow");
			var totalPrice = Math.round(
				specSum * specTotal * 160 * (specPercTotal / 100)
			);
			var moneyFormat = wNumb({ thousand: " " });
			$(".total-price span").text(moneyFormat.to(totalPrice));
		});
	}

	var specSum = $(".calc-checkbox-input:checked").val();
	var specTotal = $(".calc-spec .noUi-handle").attr("aria-valuenow");
	var specPercTotal = $(".calc-perc .noUi-handle").attr("aria-valuenow");
	var totalPrice = Math.round(
		specSum * specTotal * 160 * (specPercTotal / 100)
	);
	var moneyFormat = wNumb({ thousand: " " });
	$(".total-price span").text(moneyFormat.to(totalPrice));

	$(".calc-checkbox-input").on("click", function () {
		var specSum = $(".calc-checkbox-input:checked").val();
		var specTotal = $(".calc-spec .noUi-handle").attr("aria-valuenow");
		var specPercTotal = $(".calc-perc .noUi-handle").attr("aria-valuenow");

		var totalPrice = Math.round(
			specSum * specTotal * 160 * (specPercTotal / 100)
		);
		var moneyFormat = wNumb({
			thousand: " ",
		});
		$(".total-price span").text(moneyFormat.to(totalPrice));
	});

	// clock complex dots
	$(".clock-dot").each(function (el) {
		let rotDegClock = 30 * el;
		$(this).css("transform", "rotate(" + rotDegClock + "deg)");
	});

	// circular accordion

	//let cicrcleItemRotate = 360 / $(".circle-acc-title").length;

	// 6 - 51.4, 7 - 51.6

	$(".circle-acc-title").each(function (el) {
		if (el < 6) {
			let itemRotate = 51.4 * el;
			$(this).css("transform", "rotate(" + itemRotate + "deg)");
		} else {
			let itemRotate = 51.6 * el;
			$(this).css("transform", "rotate(" + itemRotate + "deg)");
		}
	});

	let rotNew = 0;

	$(".circle-acc-next").on("click", function () {
		$(".circle-acc-title").removeClass("active");
		$(".circle-acc-btns").addClass("btns-disable");

		rotNew = rotNew + 51.4;

		$(".cicrcle-acc-title-body").css("transform", "rotate(" + rotNew + "deg)");

		$(".circle-acc-title").each(function (el) {
			let itemNumber = $(this)
				.attr("data-curr")
				.substr($(this).attr("data-curr").lastIndexOf("-") + 1);

			let newItem = Math.trunc(itemNumber) + 1;
			if (newItem > 7) {
				newItem = 1;
			}
			$(this).attr("data-curr", "item-" + newItem);
			$(this).removeClass("item-" + itemNumber);
			$(this).addClass("item-" + newItem);
		});
		$('.circle-acc-title[data-curr="item-7"]').addClass("active");
		$(".circle-acc-content-item").removeClass("active");
		$(
			".circle-acc-content-item[data-item=" +
				$(".circle-acc-title.active").attr("data-item")
		).addClass("active");

		$(".circle-acc-btns").removeClass("btns-disable");

		return rotNew;
	});

	$(".circle-acc-prev").on("click", function () {
		$(".circle-acc-title").removeClass("active");
		$(".circle-acc-btns").addClass("btns-disable");

		rotNew = rotNew - 51.4;

		$(".cicrcle-acc-title-body").css("transform", "rotate(" + rotNew + "deg)");

		$(".circle-acc-title").each(function (el) {
			let itemNumber = $(this)
				.attr("data-curr")
				.substr($(this).attr("data-curr").lastIndexOf("-") + 1);

			let newItem = Math.trunc(itemNumber) - 1;

			if (newItem < 1) {
				newItem = 7;
			}

			$(this).attr("data-curr", "item-" + newItem);
			$(this).removeClass("item-" + itemNumber);
			$(this).addClass("item-" + newItem);
		});
		$('.circle-acc-title[data-curr="item-7"]').addClass("active");
		$(".circle-acc-content-item").removeClass("active");
		$(
			".circle-acc-content-item[data-item=" +
				$(".circle-acc-title.active").attr("data-item")
		).addClass("active");

		$(".circle-acc-btns").removeClass("btns-disable");

		return rotNew;
	});

	// charts

	if ($(".chart-block").length > 0) {
		var ctx1 = document.getElementById("myChart1");
		var ctx2 = document.getElementById("myChart2");
		var ctx3 = document.getElementById("myChart3");

		var chartOprions = {
			animation: {
				animationRotate: true,
				duration: 2000,
			},
			legend: {
				display: false,
			},
			tooltips: {
				enabled: false,
			},
			cutoutPercentage: 65,
		};

		var myChart1 = new Chart(ctx1, {
			type: "doughnut",
			data: {
				datasets: [
					{
						data: [72, 28],
						backgroundColor: ["#04ADBF", "transparent"],
						borderWidth: [0, 0],
					},
				],
			},
			options: chartOprions,
		});

		var myChart2 = new Chart(ctx2, {
			type: "doughnut",
			data: {
				datasets: [
					{
						data: [95, 5],
						backgroundColor: ["#04ADBF", "transparent"],
						borderWidth: [0, 0],
					},
				],
			},
			options: chartOprions,
		});

		var myChart3 = new Chart(ctx3, {
			type: "doughnut",
			data: {
				datasets: [
					{
						data: [96, 4],
						backgroundColor: ["#04ADBF", "transparent"],
						borderWidth: [0, 0],
					},
				],
			},
			options: chartOprions,
		});
	}

	// case sliders

	if ($(".case-item-slider").length > 0) {
		var caseItemSlider = new Swiper(".case-item-slider", {
			slidesPerView: "auto",
			spaceBetween: 35,
			navigation: {
				nextEl: ".case-item-next",
				prevEl: ".case-item-prev",
			},
			pagination: {
				el: ".case-item-pagination",
				clickable: true,
			},
		});
	}

	if ($(".case__slider").length > 0) {
		var caseSlider = new Swiper(".case__slider", {
			slidesPerView: "auto",
			//spaceBetween: 95,
			navigation: {
				nextEl: ".case__slider-next",
				prevEl: ".case__slider-prev",
			},
			pagination: {
				el: ".case__slider-pagination",
				clickable: true,
			},
		});
	}

	if ($(".portfolio__slider-1").length > 0) {
		var portfolioSlider1 = new Swiper(".portfolio__slider-1", {
			slidesPerView: "auto",

			navigation: {
				nextEl: ".next-1",
				prevEl: ".prev-1",
			},
		});
	}

	if ($(".portfolio__slider-2").length > 0) {
		var portfolioSlider1 = new Swiper(".portfolio__slider-2", {
			slidesPerView: "auto",

			navigation: {
				nextEl: ".next-2",
				prevEl: ".prev-2",
			},
		});
	}

	if ($(".portfolio__slider-3").length > 0) {
		var portfolioSlider1 = new Swiper(".portfolio__slider-3", {
			slidesPerView: "auto",

			navigation: {
				nextEl: ".next-3",
				prevEl: ".prev-3",
			},
		});
	}

	if ($(".partners__slider").length > 0) {
		var partnersSlider = new Swiper(".partners__slider", {
			slidesPerView: 1,
			spaceBetween: 30,
			speed: 500,
			navigation: {
				nextEl: ".partners__slider-next",
				prevEl: ".partners__slider-prev",
			},
		});
	}

	if ($(".roadmap-slider").length > 0) {
		var photoRoadmapSlider = new Swiper(".photo-roadmap-slider", {
			// effect: 'fade',
			// fadeEffect: {
			// 	crossFade: true
			// },
			effect: "flip",
			flipEffect: {
				slideShadows: false,
			},
		});
		var roadmapSlider = new Swiper(".roadmap-slider", {
			spaceBetween: 30,
			navigation: {
				nextEl: ".roadmap-slider-next",
				prevEl: ".roadmap-slider-prev",
			},
		});

		photoRoadmapSlider.controller.control = roadmapSlider;
		roadmapSlider.controller.control = photoRoadmapSlider;
	}

	if ($(".stories-slider").length > 0) {
		var storiesSlider = new Swiper(".stories-slider", {
			slidesPerView: 5,
			spaceBetween: 30,
			navigation: {
				nextEl: ".stories-slider-next",
				prevEl: ".stories-slider-prev",
			},
			breakpoints: {
				320: {
					slidesPerView: "auto",
					//centeredSlides: true,
					//loop: true,
					spaceBetween: 15,
				},
				1570: {
					slidesPerView: 5,
					spaceBetween: 30,
				},
			},
		});
	}

	if ($(".portfolio__quote-slider").length > 0) {
		var portfolioQouteSlider = new Swiper(".portfolio__quote-slider", {
			slidesPerView: 1,
			spaceBetween: 70,
			navigation: {
				nextEl: ".portfolio__quote-next",
				prevEl: ".portfolio__quote-prev",
			},
			breakpoints: {
				320: {
					slidesPerView: "auto",
					spaceBetween: 20,
				},
				768: {
					slidesPerView: "auto",
					spaceBetween: 70,
				},

				1025: {
					slidesPerView: 1,
					spaceBetween: 70,
				},
			},
		});
	}

	if ($(".tech-partners__slider").length > 0) {
		var techPartners = new Swiper(".tech-partners__slider", {
			slidesPerView: 3,
			spaceBetween: 30,
			navigation: {
				nextEl: ".tech-partners__slider-next",
				prevEl: ".tech-partners__slider-prev",
			},
			breakpoints: {
				320: {
					slidesPerView: "auto",
					spaceBetween: 20,
				},
				767: {
					slidesPerView: "auto",
					spaceBetween: 30,
				},
				1515: {
					slidesPerView: 3,
					spaceBetween: 30,
				},
			},
		});
	}

	if ($(".data-portfolio__slider").length > 0) {
		var techPartners = new Swiper(".data-portfolio__slider", {
			slidesPerView: 4,
			spaceBetween: 70,
			navigation: {
				nextEl: ".data-portfolio__slider-next",
				prevEl: ".data-portfolio__slider-prev",
			},
			pagination: {
				el: ".data-portfolio__slider-bullets",
				clickable: true,
			},
			breakpoints: {
				240: {
					slidesPerView: "auto",
					centeredSlides: true,
					loop: true,
					spaceBetween: 20,
				},
				1515: {
					slidesPerView: 4,
					spaceBetween: 60,
				},
			},
		});
	}


	$(".accordion__title--tech-partners").on("click", function () {
		if ($(window).outerWidth() >= 1026) {
			if (!$(this).hasClass("active")) {
				$(".accordion__title--tech-partners").removeClass("active");
				$(".accordion__content--tech-partners").removeClass("active");
				$('.accordion__title--tech-partners[data-title="' + $(this).attr("data-title") + '"]').addClass("active");
				$(".accordion__content--tech-partners[data-content=" + $(this).attr("data-title") + "]").addClass("active");

				var destination = $(this).offset().top - $(".header").outerHeight();
				$("html, body").animate({ scrollTop: destination }, 1000); // Скорость прокрутки
			}
		}

		if ($(window).outerWidth() <= 1025) {
			$('.accordion__title--tech-partners[data-title="' + $(this).attr("data-title") + '"]').toggleClass("active");
			$(".accordion__content--tech-partners[data-content=" + $(this).attr("data-title") + "]").toggleClass("active");

			var destination = $(this).offset().top - $(".header").outerHeight();
			$("html, body").animate({ scrollTop: destination }, 1000); // Скорость прокрутки
		}
	});


	$(".accordion__title--control-grow").on("click", function () {
		if (!$(this).hasClass("active")) {
			$(".accordion__title--control-grow").removeClass("active");
			$(".accordion__content--control-grow").removeClass("active");
			$(
				'.accordion__title--control-grow[data-title="' +
					$(this).attr("data-title") +
					'"]'
			).addClass("active");
			$(
				".accordion__content--control-grow[data-content=" +
					$(this).attr("data-title") +
					"]"
			).addClass("active");
		}
	});

	$(".accordion__title--new-insides").on("click", function () {
		if (!$(this).hasClass("active")) {
			$(".accordion__title--new-insides").removeClass("active");
			$(".accordion__content--new-insides").removeClass("active");
			$(
				'.accordion__title--new-insides[data-title="' +
					$(this).attr("data-title") +
					'"]'
			).addClass("active");
			$(
				".accordion__content--new-insides[data-content=" +
					$(this).attr("data-title") +
					"]"
			).addClass("active");
		}
	});

	if ($(".change-culture__schema-slider").length > 0) {
		var shameSlider = new Swiper('.change-culture__schema-slider', {
			direction: 'horizontal',
			freeMode: true,
			slidesPerView: "auto",
			mousewheel: true,
			navigation: {
				nextEl: '.change-culture__schema-arrow--next',
				prevEl: '.change-culture__schema-arrow--prev'
			}
		})
	}

	// addAnimateTetrahedrons();

	if ($(".our-services__list-item-text-blocks").length < 0) {
		new ResponsiveAutoHeight(".js-auto-height");
	}
	addWritingTextHandler();
	//adaptiveHeightBlocks();
});


if ($('.crm-page__achivements-reach-slider-item').length > 0) {

	var stories = new Zuck('stories-1', {
		previousTap: true,
		stories: [
			Zuck.buildTimelineItem(
				"totmakova",
				"https://web.khorol.com.ua/navicon/img/mobile1.png",
				"Софья Тотмакова",
				"https://google.com.ua",
				timestamp(),
				[
					["totmakova-1", "photo", 3, "https://web.khorol.com.ua/navicon/img/mp4/video-1.jpg", "https://web.khorol.com.ua/navicon/img/mp4/video-1.jpg", '', false, false, timestamp()],
					["totmakova-2", "video", 0, "https://web.khorol.com.ua/navicon/img/mp4/1-totmakova-black-crop.webm", "https://web.khorol.com.ua/navicon/img/mp4/video-1.jpg", '', false, false, timestamp()],
					["totmakova-3", "photo", 3, "https://web.khorol.com.ua/navicon/img/stories/stories-01.jpg", "https://web.khorol.com.ua/navicon/img/stories/stories-01.jpg", '', false, false, timestamp()],

				]
			),
		]
	});

	var stories = new Zuck('stories-2', {
		previousTap: true,
		stories: [
			Zuck.buildTimelineItem(
				"qqq",
				"https://web.khorol.com.ua/navicon/img/mobile1.png",
				"Софья Тотмакова",
				"https://google.com.ua",
				timestamp(),
				[
					["qqq-1", "photo", 3, "https://web.khorol.com.ua/navicon/img/stories/stories-03.jpg", "https://web.khorol.com.ua/navicon/img/stories/stories-03.jpg", '', false, false, timestamp()],
					["qqq-2", "photo", 3, "https://web.khorol.com.ua/navicon/img/mp4/video-1.jpg", "https://web.khorol.com.ua/navicon/img/mp4/video-1.jpg", '', false, false, timestamp()],
					["qqq-3", "video", 0, "https://web.khorol.com.ua/navicon/img/mp4/2-levitskaya-white-crop.webm", "https://web.khorol.com.ua/navicon/img/mp4/video-2.jpg", '', false, false, timestamp()],

				]
			),
		]
	});
}

if ($('.stories-slider__item').length > 0) {
	var hrStory_01 = new Zuck('hr-story-01', {
		previousTap: true,
		stories: [
			Zuck.buildTimelineItem(
				"qqq",
				"https://web.khorol.com.ua/navicon/img/avatars/avatar-05.jpg",
				"Vitya Boll",
				"https://google.com.ua",
				timestamp(),
				[
					["qqq-1", "photo", 3, "https://web.khorol.com.ua/navicon/img/avatars/avatar-05.jpg", "https://web.khorol.com.ua/navicon/img/avatars/avatar-05.jpg", '', false, false, timestamp()],
					["qqq-2", "photo", 3, "https://web.khorol.com.ua/navicon/img/mp4/video-1.jpg", "https://web.khorol.com.ua/navicon/img/mp4/video-1.jpg", '', false, false, timestamp()],
				]
			),
		]
	});

	var hrStory_02 = new Zuck('hr-story-02', {
		previousTap: true,
		stories: [
			Zuck.buildTimelineItem(
				"qqq11",
				"https://web.khorol.com.ua/navicon/img/avatars/avatar-03.jpg",
				"MirnoLink",
				"https://site.com.ua",
				timestamp(),
				[
					["qqq11-2", "photo", 3, "https://web.khorol.com.ua/navicon/img/avatars/avatar-03.jpg", "https://web.khorol.com.ua/navicon/img/avatars/avatar-03.jpg", '', false, false, timestamp()],

				]
			),
		]
	});

	var hrStory_03 = new Zuck('hr-story-03', {
		previousTap: true,
		stories: [
			Zuck.buildTimelineItem(
				"qqq22",
				"https://web.khorol.com.ua/navicon/img/avatars/avatar-03.jpg",
				"MirnoLink",
				"",
				timestamp(),
				[
					["qqq22-1", "photo", 3, "https://web.khorol.com.ua/navicon/img/avatars/avatar-05.jpg", "https://web.khorol.com.ua/navicon/img/avatars/avatar-05.jpg", '', false, false, timestamp()],
					["qqq22-2", "photo", 3, "https://web.khorol.com.ua/navicon/img/mp4/video-1.jpg", "https://web.khorol.com.ua/navicon/img/mp4/video-1.jpg", '', false, false, timestamp()],
					["qqq22-3", "photo", 3, "https://web.khorol.com.ua/navicon/img/avatars/avatar-03.jpg", "https://web.khorol.com.ua/navicon/img/avatars/avatar-03.jpg", '', false, false, timestamp()],

				]
			),
		]
	});

	var hrStory_04 = new Zuck('hr-story-04', {
		previousTap: true,
		stories: [
			Zuck.buildTimelineItem(
				"qqq22",
				"https://web.khorol.com.ua/navicon/img/avatars/avatar-02.jpg",
				"BillyStyds",
				"",
				timestamp(),
				[
					["qqq22-1", "photo", 3, "https://web.khorol.com.ua/navicon/img/avatars/avatar-01.jpg", "https://web.khorol.com.ua/navicon/img/avatars/avatar-01.jpg", '', false, false, timestamp()],
					["qqq22-2", "photo", 3, "https://web.khorol.com.ua/navicon/img/stories/stories-01.jpg", "https://web.khorol.com.ua/navicon/img/stories/stories-01.jpg", '', false, false, timestamp()],

				]
			),
		]
	});

	var hrStory_06 = new Zuck('hr-story-06', {
		previousTap: true,
		stories: [
			Zuck.buildTimelineItem(
				"qqq22",
				"https://web.khorol.com.ua/navicon/img/avatars/avatar-04.jpg",
				"Elena@Official",
				"",
				timestamp(),
				[
					["qqq22-4", "video", 0, "https://web.khorol.com.ua/navicon/img/mp4/2-levitskaya-white-crop.webm", "https://web.khorol.com.ua/navicon/img/mp4/video-2.jpg", '', false, false, timestamp()],
					["qqq22-1", "photo", 3, "https://web.khorol.com.ua/navicon/img/stories/stories-03.jpg", "https://web.khorol.com.ua/navicon/img/stories/stories-03.jpg", '', false, false, timestamp()],
					["qqq22-3", "photo", 3, "https://web.khorol.com.ua/navicon/img/avatars/avatar-04.jpg", "https://web.khorol.com.ua/navicon/img/avatars/avatar-04.jpg", '', false, false, timestamp()],
				]
			),
		]
	});

	var hrStory_05 = new Zuck('hr-story-05', {
		previousTap: true,
		stories: [
			Zuck.buildTimelineItem(
				"qqq22",
				"https://web.khorol.com.ua/navicon/img/avatars/avatar-02.jpg",
				"TomKruzzzz",
				"",
				timestamp(),
				[
					["qqq22-1", "video", 0, "https://web.khorol.com.ua/navicon/img/mp4/3-nazarenko-white-crop.webm", "https://web.khorol.com.ua/navicon/img/avatars/avatar-02.jpg", '', false, false, timestamp()],
					["qqq22-2", "photo", 3, "https://web.khorol.com.ua/navicon/img/stories/stories-02.jpg", "https://web.khorol.com.ua/navicon/img/stories/stories-02.jpg", '', false, false, timestamp()],
					["qqq22-3", "photo", 3, "https://web.khorol.com.ua/navicon/img/avatars/avatar-03.jpg", "https://web.khorol.com.ua/navicon/img/avatars/avatar-03.jpg", '', false, false, timestamp()],

				]
			),
		]
	});
}

