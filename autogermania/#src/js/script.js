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
			cssEase: 'linear',
			autoplaySpeed: 5000,
			
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



		



		// * =============== search.html & favorites.html slider ================ * //


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


				if ($(window).width() >= 768) {
					status.text(i + ' | ' + slick.slideCount);
				} else {
					status.html('&lsaquo;&lsaquo;&nbsp;' + i + '&nbsp;<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="17px"> <path fill-rule="evenodd" fill="rgb(255, 255, 255)" d="M10.000,12.277 C8.343,12.277 7.000,11.009 7.000,9.444 C7.000,7.879 8.343,6.611 10.000,6.611 C11.657,6.611 13.000,7.879 13.000,9.444 C13.000,11.009 11.657,12.277 10.000,12.277 ZM18.000,1.888 C19.100,1.888 20.000,2.738 20.000,3.777 L20.000,15.111 C20.000,16.149 19.100,17.000 18.000,17.000 L2.000,17.000 C0.900,17.000 -0.000,16.149 -0.000,15.111 L-0.000,3.777 C-0.000,2.738 0.900,1.888 2.000,1.888 L5.170,1.888 L6.400,0.613 C6.780,0.226 7.320,-0.001 7.880,-0.001 L12.120,-0.001 C12.680,-0.001 13.220,0.226 13.590,0.613 L14.830,1.888 L18.000,1.888 ZM10.000,14.166 C12.760,14.166 15.000,12.051 15.000,9.444 C15.000,6.837 12.760,4.722 10.000,4.722 C7.240,4.722 5.000,6.837 5.000,9.444 C5.000,12.051 7.240,14.166 10.000,14.166 Z" /></svg>&nbsp;' + slick.slideCount + '&nbsp;&rsaquo;&rsaquo;');
				}

			})


			newSlider.slick({
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


		// $('#modal-open').on('click', function(){
		// 	$.fancybox.open($('#modal'));
		// })


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
		// userMobile.on('click', function (e) {
		// 	e.preventDefault();
		// 	accountSignMobile.toggleClass('header__account-mobile-open');

		// 	if (headerMenu.hasClass('open')) {
		// 		burgerMenu.removeClass('burger-active');
		// 		headerMenu.removeClass('open');
		// 	}
		// });

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



