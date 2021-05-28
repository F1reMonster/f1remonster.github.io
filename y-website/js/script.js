$(document).ready(() => {
	function testWebP(callback) {
		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src =
			"data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {
		if (support == true) {
			$("body").addClass("webp");
		}
	});

	//if burger menu opoened and windows resizing more then 1024px burger menu auto close
	function checkWidth() {
		let windowWidth = $("body").innerWidth();
		let headerNav = $(".header__nav");

		if (headerNav.hasClass("open") && windowWidth > 1024) {
			headerNav.removeClass("open");
		}
	}

	$(window).resize(() => {
		checkWidth();
	});


	if ($('.header').offset().top != 0) {
		$('.header').addClass('fixed');
	}

	//header bg show on scroll

	$(document).scroll(function () {

		$('.header').addClass('fixed');

		if ($('.header').offset().top === 0) {
			$('.header').removeClass('fixed');
		}

	})

	//burger

	$(".header__burger").click(() => {
		$(".header__nav").addClass("open");
	});

	$(".header__mobile-top-close").click(() => {
		$(".header__nav").removeClass("open");
	});

	// tabs plan

	$(".call-country__plans-tab-content").hide();
	$(".call-country__plans-tab-content.active").show();

	$(".plan-item").on("click", function (evt) {
		evt.preventDefault();

		if (!$(this).hasClass("active")) {
			$(".plan-item").removeClass("active");
			$(this).addClass("active");
			var sel = this.getAttribute("data-tab");
			$(".call-country__plans-tab-content").hide();
			$(".call-country__plans-tab-content").filter(sel).fadeIn(500, "linear");
		}
	});
	// end tabs

	//faq accordion

	$(".faq__accord-content").hide();
	//$(".faq__accord-caption").eq(0).addClass("show");
	// $(".faq__accord-content")
	// 	.eq(0)
	// 	.css("display", "block")
	// 	.css("opacity", 1)
	// 	.css("visibility", "visible");

	$(".faq__accord-caption").click(function () {
		if ($(this).hasClass("show")) {
			$(this).removeClass("show");
			$(this).next(".faq__accord-content").slideUp();
		} else {
			$(".faq__accord-caption").removeClass("show");
			$(".faq__accord-content").slideUp();
			$(this).addClass("show");
			$(this).next(".faq__accord-content").slideDown();
		}
	});

	if ($(".choose-country")) {
		let azList = "";
		let countriesFiltered = {};

		//array from API https://restcountries.eu

		$.getJSON("https://restcountries.eu/rest/v2/all", function (data) {

			sortCountry(data);

			for (let index = 0; index < data.length; index++) {
				const letter = data[index].name[0].toLowerCase();
				if (!countriesFiltered[letter]) {
					azList += `<button class="btn-letter" data-letter="${letter}">${letter.toUpperCase()}</button>`;
				}
				if (!countriesFiltered[letter]) countriesFiltered[letter] = [];
				countriesFiltered[letter].push(data[index]);
			}

			$(".choose-country__az-list").append(azList);

			for (let i = 0; i < Object.keys(countriesFiltered).length; i++) {
				let letter = Object.keys(countriesFiltered)[i];

				$(".countries-wrapper").append(
					`<ul class="country-list letter-${letter}"><li class="letter">${letter.toUpperCase()}</li></ul>`
				);
				//console.log(letter);

				for (let j = 0; j < countriesFiltered[letter].length; j++) {
					const name = countriesFiltered[letter][j].name;

					//console.log(name);

					$(".country-list.letter-" + letter).append(
						`<li class="name"><a class="name-link" href="#">${name}</a></li>`
					);
				}
			}

			$('.current-location').click(function() {
				$(this).addClass('show');
				$(".btn-letter").removeClass('show');
				$('.country-list').removeClass('show');
				$(".countries-searched").addClass("show");
				$(".show-all").removeClass("show");


			})

			$(".btn-letter").click(function () {
				//console.log($(this).data("letter"));

				if ($(".show-all").hasClass("show")) {
					$(".show-all").removeClass("show");
					$(".country-list").removeClass("show");


				}

				if ($('.current-location').hasClass('show')) {
					$('.current-location').removeClass('show');
					$(".countries-searched").removeClass("show");
				}



				$(this).toggleClass("show");
				const letterAttr = $(this).data("letter");
				$(".country-list.letter-" + letterAttr).toggleClass("show");
			});

			$(".show-all").click(function () {
				if (!$(this).hasClass("show")) {
					$(".country-list").addClass("show");
					$(".btn-letter").removeClass("show");
					$(this).addClass("show");

					$('.current-location').removeClass('show');
					$(".countries-searched").removeClass('show');
				} else {
					$(".country-list").removeClass("show");
					$(this).removeClass("show");
					$(".countries-searched").addClass('show');
					$('.current-location').addClass('show');
				}
			});

			if (navigator.userAgent.indexOf("Firefox") != -1)
				$(".country-list").addClass("ff");
		});
	}
	//end of choose-country

	if ($(".country__list")) {
		let azList = "";
		let countriesFiltered = {};

		//array from API https://restcountries.eu

		$.getJSON("https://restcountries.eu/rest/v2/all", function (data) {

			sortCountry(data);

			for (let index = 0; index < data.length; index++) {
				const letter = data[index].name[0].toLowerCase();
				if (!countriesFiltered[letter]) {
					azList += `<button class="btn-letter btn-country-list" data-letter="${letter}">${letter.toUpperCase()}</button>`;
				}
				if (!countriesFiltered[letter]) countriesFiltered[letter] = [];
				countriesFiltered[letter].push(data[index]);
			}

			for (let i = 0; i < Object.keys(countriesFiltered).length; i++) {
				let letter = Object.keys(countriesFiltered)[i];

				$(".country__list").append(
					`<div class="country-letter-${letter}"></div>`
				);
				//console.log(letter);

				for (let j = 0; j < countriesFiltered[letter].length; j++) {
					//console.log(name);

					$(".country-letter-" + letter).append(
						`<ul class="country__list-row letter-${letter}">
								<li class="country__col name" title="${
									countriesFiltered[letter][j].name
								}"><a href="#">${countriesFiltered[letter][j].name}</a></li>
								<li class="country__col">${
									countriesFiltered[letter][j].callingCodes[0]
										? "+" + countriesFiltered[letter][j].callingCodes[0]
										: ""
								}</li>
								<li class="country__col" title="${countriesFiltered[letter][j].timezones[0]}">${
							countriesFiltered[letter][j].timezones[0]
						}</li>
								<li class="country__col" title="${countriesFiltered[letter][j].capital}">${
							countriesFiltered[letter][j].capital
						}</li>
							</ul>`
					);
				}
			}

			$(".country__list-az").append(azList);
			$('.btn-country-list[data-letter="a"]').addClass("show");
			$(".country__list-row.letter-a").addClass("show");

			$(".btn-country-list").click(function () {
				$("html, body").animate(
					{
						scrollTop: $("#list-az").offset().top - 20,
					},
					500
				);

				$(".btn-country-list").removeClass("show");

				$(".country__list-row").removeClass("show");

				$(this).addClass("show");
				const letterAttr = $(this).data("letter");
				$(".country__list-row.letter-" + letterAttr).addClass("show");
			});
		});
	}

	//chat remove
	if ($(".chat__close")) {
		$(".chat__close").click(function () {
			$(".chat").remove();
		});
	}

	//live search
	if ($(".choose-country__search-input")) {
		$.getJSON("https://restcountries.eu/rest/v2/all", function (data) {
			sortCountry(data);
			let countryNames = [];
			let $countrySearch = $(".choose-country__search-input");
			let $searchResult = $(".search-result");

			for (let i = 0; i < data.length; i++) {
				countryNames.push(data[i].name);
			}

			$countrySearch.keyup(function () {
				let searchedCountry = "";
				let $value = $(".choose-country__search-input").val().toLowerCase();
				let count = 0;

				$(".choose-country__az-list").css("display", "none");
				$(".show-all").css("display", "none");
				$(".countries-searched").css("display", "none");
				$(".countries-wrapper").css("display", "none");
				$searchResult.css("margin-top", "50px");

				if ($value.length > 0) {
					for (let i = 0; i < countryNames.length; i++) {
						countryLowerCase = countryNames[i].toLowerCase();

						if (countryLowerCase.indexOf($value) != -1) {
							searchedCountry += `<li class="searched-country"><a class="name-link" href="#">${countryNames[i]}</a></li>`;
							count ++;
						}
					}
				} else {
					searchedCountry = "";
					$searchResult.css("margin-top", "0");
					$(".choose-country__az-list").css("display", "flex");
					$(".show-all").css("display", "inline-block");
					$(".countries-searched").css("display", "block");
					$(".countries-wrapper").css("display", "block");
					$(".btn-letter, .country-list").removeClass("show");
				}

				if (count === 0 && $value != 0) {
					searchedCountry = '<li class="text-md text-white md:text-base">Sorry! No match!</li>'
				}
				//console.log(count);

				$searchResult.html(searchedCountry);
			});
			//console.log(countryNames);
		});
	}
});
//enf document ready

//sort by name
function sortCountry(data) {
	data.sort(function (a, b) {
		let nameA = a.name.toLowerCase();
		let nameB = b.name.toLowerCase();

		if (nameA < nameB) return -1;
		if (nameA > nameB) return 1;
		return 0;
	});

	return data;
}

//slider comments
const testimonialsWrapper = $(".testimonials__slider-wrapper");
const ratesSlider = $(".rates-deals__slider");
const popularDestinationSlider = $(".popular-destination__slider");

if (testimonialsWrapper) {
	let testimonialsSlider = new Swiper(".comment-slider", {
		slidesPerView: 2,
		spaceBetween: 10,

		breakpoints: {
			825: {
				slidesPerView: 2,
			},

			100: {
				slidesPerView: "auto",
			},
		},

		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
}

//slider country-card
if (ratesSlider) {
	let countrySlider = new Swiper(".rates-deals__slider", {
		spaceBetween: 10,
		slidesPerView: "auto",

		breakpoints: {
			1152: {
				slidesPerView: 3,
			},
			790: {
				slidesPerView: 2,
			},


		},

		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
}

if (popularDestinationSlider) {
	let popularDestination = new Swiper(".popular-destination__slider", {
		slidesPerView: "auto",
		spaceBetween: 10,

		breakpoints: {
			1152: {
				slidesPerView: 5,
			},
			786: {
				slidesPerView: 3,
			},

		},

		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
}

if ($('.sms__slider')) {
	let smsSlider = new Swiper ('.sms__slider', {
		slidesPerView: 1,
		effect: "fade",
		grabCursor: true,

		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},

	})
}

// select dropdown

const selectedAll = document.querySelectorAll(".selected");

selectedAll.forEach((selected) => {
	const optionsContainer = selected.previousElementSibling;
	const searchBox = selected.nextElementSibling;

	const optionsList = optionsContainer.querySelectorAll(".option");

	selected.addEventListener("click", () => {
		if (optionsContainer.classList.contains("active")) {
			optionsContainer.classList.remove("active");
		} else {
			let currentActive = document.querySelector(".options-container.active");

			if (currentActive) {
				currentActive.classList.remove("active");
			}

			optionsContainer.classList.add("active");
		}

		searchBox.value = "";

		if (optionsContainer.classList.contains("active")) {
			searchBox.focus();
		}
	});

	optionsList.forEach((o) => {
		o.addEventListener("click", () => {
			selected.innerHTML = o.querySelector("label").innerHTML;
			optionsContainer.classList.remove("active");
		});
	});
});
