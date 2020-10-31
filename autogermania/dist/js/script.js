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


jQuery(function ($) {
	$(document).ready(function () {

		const sliderMain = $('.slider'),
			carSlider = $(".car__slider"),
			bestOfferSlider = $(".best-offers__slider"),
			btnFooterUp = $(".footer__up"),
			aboutTitle = $(".about__title-text"),
			aboutIcon = $('.about__title-icon'),
			aboutText = $(".about__text"),
			burgerMenu = $('.burger'),
			footerListTitle = $('.footer__nav-list-title'),
			footerListContent = $('.footer__nav-list-content'),
			footerTitleIcon = $('.footer__nav-icon'),
			userMobile = $('.user-mobile'),
			accountSignMobile = $('.header__account-sign-mobile');

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

		// кнопка "на гору" у футері
		btnFooterUp.on('click', function (e) {
			e.preventDefault();
			$('html, body').animate({ scrollTop: 0 }, '300');
		});


		aboutTitle.on('click', function (e) {
			e.preventDefault();
			aboutIcon.toggleClass('rotate');
			aboutText.toggleClass('about__text-close');
		});

		// бургер
		burgerMenu.on('click', function (e) {
			e.preventDefault();
			burgerMenu.toggleClass('burger-active');
			//$('.header__menu-list').toggleClass('active-menu');
		});

		// футер меню закриваємо/откриваємо
		footerListTitle.on('click', function (e) {
			e.preventDefault();
			$(this).find(footerTitleIcon).toggleClass('rotate');
			$(this).next(footerListContent).toggleClass('footer__nav-change');
		});

		// меню логіна
		userMobile.on('click', function (e) {
			e.preventDefault();
			accountSignMobile.toggleClass('header__account-mobile-open');
		});

		//обробник подій у фільтрі
		$('.select-box .selected').on('click', function () {
			const $target = $(this).parent().find('.options-container');
			let remove = false;
			if ($target.hasClass('active'))
				remove = true;

			$('.select-box .options-container').removeClass('active');
			if (remove)
				$target.removeClass('active');
			else
				$target.addClass('active');
		});
		$('.select-box .option').on('click', function () {
			const $cont = $(this).closest('.select-box');
			const text = $(this).find('label').html();
			$cont.find('.search__filter-item-placeholder').html(text);
			$cont.find('.options-container').removeClass('active');
		});

		//закриваєм фільтр якщо клікаєм не на елементі фільтра
		$(document).mouseup(function (e) {
			var container = $('.select-box');
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				$('.select-box .options-container').removeClass('active');
			}
		});
	});

});
