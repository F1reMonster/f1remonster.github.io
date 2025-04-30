$(function(){
	$('[data-fancybox]').fancybox({
		
	});

	$('.heroes__slider-img').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '<button type="button" class="heroes__btn slick-prev"><img src="images/arrow-left.png" alt="arrow-left"></button>',
		nextArrow: '<button type="button" class="heroes__btn slick-next"><img src="images/arrow-right.png" alt="arrow-right"></button>',
		asNavFor: '.heroes__slider-text',
		responsive: [
			{
				breakpoint: 769,
				settings: {
					arrows: false,

				}
			}
		]
		});

	$('.heroes__slider-text').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.heroes__slider-img',
		arrows: false,
		fade: true,
		});

	$('.menu__btn').on('click', function(){
		$('.menu__list').toggleClass('active')
	})
});

