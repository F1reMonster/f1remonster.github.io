jQuery(function ($) {
	$(document).ready(function () {

		const sliderMain = $('.slider'),
			btnFooterUp = $(".footer__up"),
			aboutTitle = $(".about__title-text"),
			aboutIcon = $('.about__title-icon'),
			aboutText = $(".about__text"),
			burgerMenu = $('.burger'),
			headerMenu = $('.header__menu'),
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
			autoplay: true,
			autoplaySpeed: 3000,
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



		// * best-offers слайдер в слайдері */


		var innerSlider = $(".car__slider"),
			$wrapperSlider = $(".best-offers__slider");

		wrapperSlider = $wrapperSlider[0];


		$(".best-offers__slider").slick({
			infinite: false,
			centerMode: false,
			variableWidth: false,
			slidesToShow: 4,
			slidesToScroll: 1,
			speed: 500,
			prevArrow: '<button type="button" class="best-offers__slider-btn prev"><svg><use xlink:href="img/sprite.svg#slider_arrow_left"></use></svg></button>',
			nextArrow: '<button type="button" class="best-offers__slider-btn next"><svg><use xlink:href="img/sprite.svg#slider_arrow_right"></use></svg></button>',
			swipe: true,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						swipe: true,
					}
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						swipe: true,
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						swipe: true,
					}
				}

			]
		});

		$(".car__slider").on('mousedown', function () {
			wrapperSlider.slick.setOption({
				swipe: false
			})
		})

		innerSlider.slick({
			infinite: false,
			centerMode: false,
			variableWidth: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			prevArrow: '<button type="button" class="car__slider-btn prev"><svg><use xlink:href="img/sprite.svg#arrow_prev"></use></svg></button>',
			nextArrow: '<button type="button" class="car__slider-btn next"><svg><use xlink:href="img/sprite.svg#arrow_next"></use></svg></button>',
			swipe: true,

		}).on('afterChange', function (event, slick) {
			wrapperSlider.slick.setOption({
				swipe: true
			})
		});







		// * =============== search.html slider ================ * //


		var numSlick = 0;
		var carCardSlider = $('.car-item__img-container');
		//var paginInfo = $('.paging-info');

		numSlick = 0;
		carCardSlider.each(function () {

			numSlick++;

			var newSlider = $(this).addClass('slider-' + numSlick);

			var status = newSlider.next('.paging-info').addClass('page-' + numSlick);

			newSlider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
				//currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
				var i = (currentSlide ? currentSlide : 0) + 1;
				status.text(i + ' | ' + slick.slideCount);
			})


			newSlider.slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				prevArrow: '<button type="button" class="carslider-btn prev"></button>',
				nextArrow: '<button type="button" class="carslider-btn next"></button>',

			});

		});


		// * =============== favorites.html slider ================ * //

		//console.log($(window).width());

		var numFavSlick = 0;
		var favSlider = $('.favorites__slider');
		//var paginInfo = $('.paging-info');

		numFavSlick = 0;
		favSlider.each(function () {

			numFavSlick++;

			var windowWidth = $(window).width();

			var newFavSlider = $(this).addClass('slider-' + numFavSlick);

			if (windowWidth > 768)  {
				var paging = newFavSlider.next('.paging-info').addClass('page-' + numFavSlick);
				pagingToShow = paging.text(i + ' | ' + slick.slideCount)
			} else {

			}

			
			

		//	var pagingMobile

			// $current = $('.details-pagination.current'),
			// 	$total = $('.details-pagination.total');

			newFavSlider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
				//currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
				var i = (currentSlide ? currentSlide : 0) + 1;
				//paging.text(i + ' | ' + slick.slideCount);
				pagingToShow;
			})


			newFavSlider.slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				prevArrow: '<button type="button" class="carslider-btn prev"></button>',
				nextArrow: '<button type="button" class="carslider-btn next"></button>',

			});

		});



		// * similar in details.html 


		$('.car__similar-slider').slick({
			slidesToShow: 2,
			slidesToScroll: 1,
			infinite: false,
			prevArrow: '<button type="button" class="carsimilar-btn prev"></button>',
			nextArrow: '<button type="button" class="carsimilar-btn next"></button>',
			responsive: [
				{
					breakpoint: 560,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,


						//arrows: false,
					}
				}
			]
		});

		$('.ds-car__slider').slick({
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			prevArrow: '<button type="button" class="ds__slider-btn prev"><svg><use xlink:href="img/sprite.svg#arrow_prev"></use></svg></button>',
			nextArrow: '<button type="button" class="ds__slider-btn next"><svg><use xlink:href="img/sprite.svg#arrow_next"></use></svg></button>'

		});

		//** refresh sliders after change window */
		$(window).on('resize', function () {
			$('.car__similar-slider').on('breakpoint', function (event, slick) {
				//console.log('in details.html slider is breakpointed');

				//$(this).slick('refresh');
				//$('.ds-car__slider').slick('unslick');
				$('.ds-car__slider').slick('unslick');
				$('.ds-car__slider').slick({
					infinite: false,
					slidesToShow: 1,
					slidesToScroll: 1,
					prevArrow: '<button type="button" class="ds__slider-btn prev"><svg><use xlink:href="img/sprite.svg#arrow_prev"></use></svg></button>',
					nextArrow: '<button type="button" class="ds__slider-btn next"><svg><use xlink:href="img/sprite.svg#arrow_next"></use></svg></button>'

				});
			});

			$(".best-offers__slider").on('breakpoint', function (event, slick) {
				//console.log('in index.html slider is breakpointed');

				//$(this).slick('refresh');
				$('.car__slider').slick('unslick');
				$('.car__slider').slick({
					infinite: false,
					centerMode: false,
					variableWidth: false,
					slidesToShow: 1,
					slidesToScroll: 1,
					prevArrow: '<button type="button" class="car__slider-btn prev"><svg><use xlink:href="img/sprite.svg#arrow_prev"></use></svg></button>',
					nextArrow: '<button type="button" class="car__slider-btn next"><svg><use xlink:href="img/sprite.svg#arrow_next"></use></svg></button>',
					swipe: true,

				});
			});
		});



		// * ============= details.html ===================== * 



		var detailsSlider = $('.details__slider');
		detailsSlider.each(function () {
			var
				$current = $('.details-pagination.current'),
				$total = $('.details-pagination.total');

			$(this).on('init reInit afterChange', function (evet, slick, currentSlide, nextSlide) {
				var i = (currentSlide ? currentSlide : 0) + 1;

				$current.html(i);
				$total.html(slick.slideCount);

			});

			$(this).slick({
				slidesToShow: 1,
				infinite: false,
				prevArrow: '<button type="button" class="carsimilar-btn prev-main"></button>',
				nextArrow: '<button type="button" class="carsimilar-btn next-main"></button>',
			});

		});



		$('a.fancybox-img').fancybox({
			//selector: '.slick-slide:not(.slick-cloned)',
			autoSize: true,
			arrows: true,
			buttons: [
				'close',
			]

			// backFocus: false,
			// afterShow: function (instance, current) {
			// 	current.opts.$orig.closest(".slick-initialized").slick('slickGoTo', parseInt(current.index), true);
			// }

		});




		// * скрол 

		$(".mobile-bottom .basic-data").click(function () { // ID откуда кливаем
			var destination = $("#mainData").offset().top - $('.header').outerHeight();
			$('html, body').animate({ scrollTop: destination }, 1000); // Скорость прокрутки
		});

		$(".mobile-bottom .advanced-data").click(function () { // ID откуда кливаем
			var destination = $("#advData").offset().top - $('.header').outerHeight();
			$('html, body').animate({ scrollTop: destination }, 1000); // Скорость прокрутки
		});

		// * ================= end detail.html ===============================


		// * закр/відкп блоки голловний даних авто та додаткових
		$('.car__info-name-wrapper').on('click', function () {
			$(this).toggleClass('p-11-20');
			$(this).next('.car__block-content').toggleClass('close');
			$(this).find('svg').toggleClass('rotate');
			$(this).parent().parent().toggleClass('addmargin');
		})






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
			headerMenu.toggleClass('open');

			if (accountSignMobile.hasClass('header__account-mobile-open')) {
				accountSignMobile.removeClass('header__account-mobile-open');
			}
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

			if (headerMenu.hasClass('open')) {
				burgerMenu.removeClass('burger-active');
				headerMenu.removeClass('open');
			}
		});

		//обробник подій у фільтрі
		$('.select-box .selected').on('click', function () {
			const $target = $(this).parent().find('.options-container');
			let remove = false;
			if ($target.hasClass('active'))
				remove = true;

			$('.select-box .options-container').removeClass('active');

			if (remove) {
				$target.removeClass('active');
			} else {
				$target.addClass('active');
			}



		});
		$('.select-box .option').on('click', function () {
			const $cont = $(this).closest('.select-box');
			const text = $(this).find('span').html();
			$cont.find('.placeholder').html(text);
			$cont.find('.options-container').removeClass('active');


			//зміна background-color пілся вибору елемента в списку
			const $a = $(this).closest('.options-container');
			$a.find('.select').removeClass('select');
			$(this).addClass('select');

		});

		//закриваєм фільтр якщо клікаєм не на елементі фільтра
		$(document).mouseup(function (e) {
			var container = $('.select-box');
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				$('.select-box .options-container').removeClass('active');
			}
		});






		function arrowUpVisible() {
			var arrow = $('.main-arrow-up');
			var windowHeight = $(window).outerHeight();
			opacityVision = pageYOffset / windowHeight;
			arrow.css('opacity', opacityVision);
			arrow.on('click', function (e) {
				e.preventDefault();
				e.stopPropagation();
				var winHeight = $(document).height();
				var step = 12;
				var timeToScroll = winHeight / step;
				$('html, body').stop().animate({
					scrollTop: 0
				}, timeToScroll);
			});
		}

		function filterBtnFixed() {
			var filterHeight = $('.filter.filter-open').outerHeight();
			var btnFixed = $('.filter-wrapper-btn').outerHeight();
			var headerHeight = $('.header').outerHeight()
			var footerHeight = $('.footer').outerHeight();

			var posBtnRemove = filterHeight - footerHeight + btnFixed + headerHeight;
			var posBtnActive = filterHeight - footerHeight + btnFixed;

			if (posBtnRemove < $(window).scrollTop()) {
				$('.filter-wrapper-btn').removeClass('fixed');
			}

			if (posBtnActive > $(window).scrollTop()) {
				$('.filter-wrapper-btn').addClass('fixed');
			}
		}

		function stikyPriceMobile() {

			// * добавляємо stiky блоку price-mobile


			if ($(window).scrollTop() + $('.header').outerHeight() >= $('#mainData').offset().top) {
				$('.price-mobile').addClass('sticky');
			} else {
				$('.price-mobile').removeClass('sticky');
			}


		}

		$(window).scroll(function () {

			if ($(this).scrollTop() > 0) {
				$('.header__bottom').css('background-color', 'rgba(255,255,255,0.8)')
			}
			if ($(this).scrollTop() === 0) {
				$('.header__bottom').css('background-color', 'rgba(255,255,255,0.2)')
			}

			if ($('#mainData').length) {
				stikyPriceMobile();
			}

			arrowUpVisible();
		});


		$('.benefits__top-item-wrapper').hover(function () {
			$(this).next('.benefits__tooltip').addClass('active');
		}, function () {
			$(this).next('.benefits__tooltip').removeClass('active');
		});


		$('.bottom-filter').on('click', function () {
			$('.filter').toggleClass('filter-open');
			console.log($(window).width());



			if ($(window).width() > 768) {
				$('.benefits__news').addClass('hide');
			}

			if ($(window).width() < 768) {
				$('.header__bottom-news-mobile').addClass('hide');
			}

		});

		//* закриваємо фільтр 
		$('.filter-btn-close').on('click', function (e) {
			e.preventDefault();
			$('.car-item__img-container').slick('refresh');

			if ($('.filter').hasClass('filter-open')) {
				$('.filter').removeClass('filter-open');
				if ($(window).width() > 768) {
					if ($('.benefits__news').hasClass('hide')) {
						$('.benefits__news').removeClass('hide')
					};
				}

				if ($(window).width() < 768) {

					if ($('.header__bottom-news-mobile').hasClass('hide')) {
						$('.header__bottom-news-mobile').removeClass('hide')
					};
					;
				}

			}
		});

		$('.filter__item-title').click(function (e) {
			e.preventDefault();
			$(this).toggleClass('close');
		});

		$('.filter-body__item-title.advanced').click(function (e) {
			e.preventDefault();
			$(this).toggleClass('close');
		});





		// * ============ rangeSlider ============== * //

		if ($('.filter').length) {
			const filterYear = document.querySelector('.filter-year'),
				filterKm = document.querySelector('.filter-km'),
				filterPower = document.querySelector('.filter-power');

			noUiSlider.create(filterYear, {
				start: [1990, 2020],
				connect: true,
				step: 1,
				tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
				range: {
					'min': 1990,
					'max': 2020
				}
			});

			noUiSlider.create(filterKm, {
				start: [0, 300000],
				connect: true,
				step: 10000,
				tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
				range: {
					'min': 0,
					'max': 300000
				}
			});

			noUiSlider.create(filterPower, {
				start: [50, 1000],
				connect: true,
				step: 10,
				tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
				range: {
					'min': 50,
					'max': 1000
				}
			});
		}

	});

});



