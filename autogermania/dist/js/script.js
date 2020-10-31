function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
	}
});



const sliderMain = $('.slider'),
	carSlider = $(".car__slider"),
	bestOfferSlider = $(".best-offers__slider");

sliderMain.slick({
	dots: true,
	dotsClass: 'slider__dots',
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	// autoplay: true,
	// autoplaySpeed: 3000,
	prevArrow: '<button type="button" class="slider__btn prev"><svg><use xlink:href="img/sprite.svg#slider_arrow_left"></use></svg></button>',
	nextArrow: '<button type="button" class="slider__btn next"><svg><use xlink:href="img/sprite.svg#slider_arrow_right"></use></svg></button>',
	responsive: [
		{
			breakpoint: 775,
			settings: {
				arrows: false,
			}
		}
	]
});

carSlider.slick({
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	prevArrow: '<button type="button" class="car__slider-btn prev"><svg><use xlink:href="img/sprite.svg#arrow_prev"></use></svg></button>',
	nextArrow: '<button type="button" class="car__slider-btn next"><svg><use xlink:href="img/sprite.svg#arrow_next"></use></svg></button>',

});


bestOfferSlider.slick({
	infinite: true,
	slidesToShow: 4,
	slidesToScroll: 1,
	prevArrow: '<button type="button" class="best-offers__slider-btn prev"><svg><use xlink:href="img/sprite.svg#slider_arrow_left"></use></svg></button>',
	nextArrow: '<button type="button" class="best-offers__slider-btn next"><svg><use xlink:href="img/sprite.svg#slider_arrow_right"></use></svg></button>',
	responsive: [
		{
			breakpoint: 1200,
			settings: {

				slidesToShow: 3,
				slidesToScroll: 1,

			}
		},
		{
			breakpoint: 992,
			settings: {

				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 480,
			settings: {

				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
			}
		}

	]
});


const btnFooterUp = $(".footer__up"),
	aboutTitle = $(".about__title-text"),
	aboutIcon = $('.about__title-icon'),
	aboutText = $(".about__text"),
	burgerMenu = $('.burger'),
	footerListTitle = $('.footer__nav-list-title'),
	footerListContent = $('.footer__nav-list-content'),
	footerTitleIcon = $('.footer__nav-icon'),
	userMobile = $('.user-mobile'),
	accountSignMobile = $('.header__account-sign-mobile'),
	filterCarBrands = $('.search__filter-brands'),
	filterCarModels = $('.search__filter-models'),
	filterCarOdo = $('.search__filter-odo'),
	filterCarYear = $('.search__filter-year');


btnFooterUp.on('click', function (e) {
	e.preventDefault();
	$('html, body').animate({ scrollTop: 0 }, '300');
});


aboutTitle.on('click', function (e) {
	e.preventDefault();
	aboutIcon.toggleClass('rotate');
	aboutText.toggleClass('about__text-close');

});

burgerMenu.on('click', function (e) {
	e.preventDefault();
	burgerMenu.toggleClass('burger-active');
	//$('.header__menu-list').toggleClass('active-menu');
});

footerListTitle.on('click', function (e) {
	e.preventDefault();
	$(this).find(footerTitleIcon).toggleClass('rotate');
	$(this).next(footerListContent).toggleClass('footer__nav-change');
});

userMobile.on('click', function (e) {
	e.preventDefault();
	accountSignMobile.toggleClass('header__account-mobile-open');
});

filterCarBrands.select2({
	placeholder: 'Обрати марку',
	width: '100%',
});
filterCarModels.select2({
	placeholder: 'Обрати модель',
	width: '100%'
});

filterCarOdo.select2({
	placeholder: 'рік',
	width: '100%'
});

filterCarYear.select2({
	placeholder: 'км',
	width: '100%'
});



// const selected = document.querySelectorAll(".selected");
// const optionsContainer = document.querySelectorAll(".options-container");

// const optionsList = document.querySelectorAll(".option");

// selected.addEventListener("click", () => {
// 	optionsContainer.classList.toggle("active");
// });

// optionsList.forEach(o => {
// 	o.addEventListener("click", () => {
// 		selected.innerHTML = o.querySelector("label").innerHTML;
// 		optionsContainer.classList.remove("active");
// 	});
// });

const selected = $('.selected'), 
		optionsContainer = $(".option-container"),
		option = $('.option'),
		filterItem = $('.search__filter-item');

	selected.on('click', function(e) {
		e.preventDefault();
		$(this).next(optionsContainer).toggleClass('active');
	} )