$(".reviews-items").slick({
	slidesToShow: 2,
	arrows: true,
	dots: true,
	infinite: false,
	prevArrow:
		'<span class="slick-prev slick-arrow" style=""><i class="icon-arrow-left1"></i></span>',
	nextArrow:
		'<span class="slick-next slick-arrow" style=""><i class="icon-arrow-right1"></i></span>',
	responsive: [
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				arrows: false,
			},
		},
	],
});

$(".slider-main-advantages").slick({
	slidesToShow: 1,
	arrows: false,
	infinite: true,
	dots: true,
	autoplay: true,
	speed: 800,
	// easing: 'ease-out'
});

$(".slider-top-covid").slick({
	slidesToShow: 1,
	arrows: false,
	infinite: true,
	dots: false,
	autoplay: true,
	speed: 800,
	// easing: 'ease-out'
});

$(".reviews-item__block").matchHeight({
	property: "height",
	byRow: true,
});

$(".btn-more").click(function (e) {
	e.preventDefault();
	$(this).remove();
	$(".section__article--more").css("display", "block");
});
// $(window).resize(function () {
// 	$('.reviews-item__block').matchHeight._update();

// })

$(".section__anchor a").click(function (e) {
	e.preventDefault();
	console.log($(this).attr("href").split("#")[1]);
	const $linkSection = $(this).attr("href").split("#")[1];
	const $headerHeight = $(".main-header-bg").outerHeight();

	if ($linkSection.length > 0) {
		$("html, body").animate(
			{
				scrollTop: $("#" + $linkSection).offset().top - $headerHeight,
			},
			500
		);
	}
});

$('.atmosphere').slick({
	slidesToScroll: 1,
	slidesToShow: 1,
	arrows: false,
	dots: false,
	asNavFor: '.atmosphere__thumbnails'
});

$('.atmosphere__thumbnails').slick({
	slidesToScroll: 1,
	slidesToShow: 4,
	arrows: true,
	dots: false,
	asNavFor: '.atmosphere',
	prevArrow:
		'<span class="slick-prev slick-arrow" style=""><i class="icon-arrow-left1"></i></span>',
	nextArrow:
		'<span class="slick-next slick-arrow" style=""><i class="icon-arrow-right1"></i></span>',
	focusOnSelect: true,
	responsive: [
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 3,
				arrows: false,
			},
		},
		{
			breakpoint: 568,
			settings: {
				slidesToShow: 2,
				arrows: false,
			},
		},
	],
	
});

$('.section__cosmetology-top').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	infinite: true,
	dots: false,
	autoplay: true,
	speed: 800,
})
