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

function preloader() {
	$(() => {
		setInterval(() => {
			const p = $(".preloader");
			p.css("opacity", 0);
			setInterval(() => p.remove());
		}, 1000);
	});
}

function preloaderAdd() {
	$("body").append(`
			<div class="preloader">
				<div class="preloader-content">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
	`);
}

function bodyLock() {
	const lockPaddingValue =
		window.innerWidth - $(".body-wrapper").outerWidth() + "px";
	$("body").css("padding-right", lockPaddingValue);
	$("body").addClass("lock");
}

function bodyUnLock() {
	$("body").css("padding-right", "0px");
	$("body").removeClass("lock");
}

function counterUp() {
	$(".main__counter").each(function () {
		var $this = $(this),
			countTo = $this.attr("data-count");

		$({ countNum: $this.text() }).animate(
			{
				countNum: countTo,
			},

			{
				duration: 8000,
				easing: "linear",
				step: function () {
					$this.text(Math.floor(this.countNum));
				},
				complete: function () {
					$this.text(this.countNum);
					//alert('finished');
				},
			}
		);
	});
}

$(".header__theme").click(function () {
	if ($(".preloder").length === 0) {
		preloaderAdd();
		preloader();

		$(this).toggleClass("dark");
		$("body").toggleClass("dark");
	}
});

$(".header__burger").click(function () {
	bodyLock();
	$(this).addClass("burger-active");
	$(".burger-menu").addClass("active");
});

$(".burger-menu__close").click(function () {
	bodyUnLock();
	$(".burger-menu").removeClass("active");
	$(".header__burger").removeClass("burger-active");
});

preloader();
counterUp();

let serviceSlider = new Swiper(".service-slider", {
	slidesPerView: 3,
	spaceBetween: 30,

	breakpoints: {
		1024: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
		630: {
			slidesPerView: 2,
			spaceBetween: 10,
		},
		320: {
			slidesPerView: 1,
		},
	},

	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	}
});

let blogSlider = new Swiper('.blog-slider', {
	slidesPerView: 3,
	spaceBetween: 30,

	breakpoints: {
		1024: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
		630: {
			slidesPerView: 2,
			spaceBetween: 10,
		},
		320: {
			slidesPerView: 1,
		},
	},
})

if (serviceSlider.currentBreakpoint < 1024) {
	$('.swiper-button-next, .swiper-button-prev').remove();
}
