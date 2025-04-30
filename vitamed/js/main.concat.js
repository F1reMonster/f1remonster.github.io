"use strict";
var player;
if (document.getElementById("player")) {
	void 0;
	var tag = document.createElement("script");
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName("script")[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady() {
	player = new YT.Player("player", {
		height: "100%",
		width: "100%",
		videoId: "M7lc1UVf-VE",
		playerVars: {
			rel: 0,
			showinfo: 0,
			controls: 1,
		},
	});
}
void 0;

function onPlayerReady(datavideo) {
	player.cueVideoById(datavideo);
	player.playVideo();
}

function stopVideo() {
	player.stopVideo();
}
$(document).ready(function () {
	var topVal;
	var flagvar = true;

	function onResizeWindow() {
		if (window.innerWidth < 768) {
			if (flagvar) {
				void 0;
				flagvar = false;
				$("[data-menu]").addClass("click-mobile");
				$("[data-menu]").removeClass("hover-menu-pc");
			}
		} else {
			$("[data-menu]").addClass("hover-menu-pc");
			if (!flagvar) {
				void 0;
				flagvar = true;
				$("[data-menu]").removeClass("click-mobile");
			}
		}
	}
	var timeId;
	timeId = setTimeout(onResizeWindow, 200);
	window.onresize = function () {
		clearTimeout(timeId);
		timeId = setTimeout(onResizeWindow, 200);
	};
	$(document).on("click", ".hover-menu-pc", function (e) {
		e.preventDefault();
		e.stopPropagation();
	});
	var timeId2;
	$(document).on("mouseenter", ".hover-menu-pc", function (e) {
		var th = $(this);
		void 0;
		clearTimeout(timeId2);
		timeId2 = setTimeout(function () {
			void 0;
			if (!$(".main-header-bg").hasClass("-fixed")) {
				var nameCssPosition = "-show";
				topVal =
					$(".header-topline-bg").innerHeight() +
					$(".main-header-bg").innerHeight() -
					4;
				$("#menu-dropdown").css({
					top: topVal + "px",
					bottom: "0",
				});
			} else {
				var nameCssPosition = "-fixed";
				topVal = $(".main-header-bg").innerHeight() - 4;
				$("#menu-dropdown").css({
					top: topVal + "px",
				});
			}
			$("#menu-dropdown-about").removeClass(nameCssPosition);
			$("#menu-dropdown").addClass(nameCssPosition);
			$(".main-menu a").removeClass("-active");
			th.addClass("-active");
		}, 50);
	});
	$(document).on("mouseenter", "#menu-dropdown", function (e) {
		if ($(".hover-menu-pc").length) {
			clearTimeout(timeId2);
		}
	});
	$(document).on("mouseleave", ".hover-menu-pc, #menu-dropdown", function (e) {
		var th = $(this);
		clearTimeout(timeId2);
		if ($(".hover-menu-pc").length) {
			timeId2 = setTimeout(function () {
				void 0;
				if (!$(".main-header-bg").hasClass("-fixed")) {
					var nameCssPosition = "-show";
					topVal =
						$(".header-topline-bg").innerHeight() +
						$(".main-header-bg").innerHeight() -
						4;
					$("#menu-dropdown").css({
						top: topVal + "px",
						bottom: "0",
					});
				} else {
					var nameCssPosition = "-fixed";
					topVal = $(".main-header-bg").innerHeight() - 4;
					$("#menu-dropdown").css({
						top: topVal + "px",
					});
				}

				$("#menu-dropdown").removeClass(nameCssPosition);
				$("#menu-dropdown-about").removeClass(nameCssPosition);
				void 0;
				$("[data-menu]").removeClass("-active");
				$(".hover-menu-about").removeClass("-active");
			}, 100);
		}
	});

	//
	var timeId;
	timeId = setTimeout(onResizeWindow, 200);
	window.onresize = function () {
		clearTimeout(timeId);
		timeId = setTimeout(onResizeWindow, 200);
	};
	$(document).on("click", ".hover-menu-about", function (e) {
		e.preventDefault();
		e.stopPropagation();
	});
	var timeId2;
	$(document).on("mouseenter", ".hover-menu-about", function (e) {
		var th = $(this);
		void 0;
		clearTimeout(timeId2);
		timeId2 = setTimeout(function () {
			void 0;
			if (!$(".main-header-bg").hasClass("-fixed")) {
				var nameCssPosition = "-show";
				topVal =
					$(".header-topline-bg").innerHeight() +
					$(".main-header-bg").innerHeight() -
					4;
				$("#menu-dropdown-about").css({
					top: topVal + "px",
					bottom: "0",
				});
			} else {
				var nameCssPosition = "-fixed";
				topVal = $(".main-header-bg").innerHeight() - 4;
				$("#menu-dropdown-about").css({
					top: topVal + "px",
				});
			}
			$("#menu-dropdown").removeClass(nameCssPosition);
			$("#menu-dropdown-about").addClass(nameCssPosition);
			$(".main-menu a").removeClass("-active");
			th.addClass("-active");
		}, 50);
	});
	$(document).on("mouseenter", "#menu-dropdown-about", function (e) {
		if ($(".hover-menu-about").length) {
			clearTimeout(timeId2);
		}
	});
	$(document).on("mouseleave", "#menu-dropdown-about", function (e) {
		var th = $(this);
		clearTimeout(timeId2);
		if ($(".hover-menu-about").length) {
			timeId2 = setTimeout(function () {
				void 0;
				if (!$(".main-header-bg").hasClass("-fixed")) {
					var nameCssPosition = "-show";
					topVal =
						$(".header-topline-bg").innerHeight() +
						$(".main-header-bg").innerHeight() -
						4;
					$("#menu-dropdown-about").css({
						top: topVal + "px",
						bottom: "0",
					});
				} else {
					var nameCssPosition = "-fixed";
					topVal = $(".main-header-bg").innerHeight() - 4;
					$("#menu-dropdown-about").css({
						top: topVal + "px",
					});
				}
				$("#menu-dropdown-about").removeClass(nameCssPosition);
				$("#menu-dropdown").removeClass(nameCssPosition);
				void 0;
				$(".hover-menu-about").removeClass("-active");
				$(".hover-menu-pc").removeClass("-active");
			}, 100);
		}
	});
	//

	$(document).on("click", ".click-mobile", function (e) {
		e.preventDefault();
		if (!$(".main-header-bg").hasClass("-fixed")) {
			var nameCssPosition = "-show";
			topVal =
				$(".header-topline-bg").innerHeight() +
				$(".main-header-bg").innerHeight() -
				4;
			$("#menu-dropdown").css({
				top: topVal + "px",
				bottom: "0",
			});
		} else {
			var nameCssPosition = "-fixed";
			topVal = $(".main-header-bg").innerHeight() - 4;
			$("#menu-dropdown").css({
				top: topVal + "px",
			});
		}
		$("#menu-dropdown").toggleClass(nameCssPosition);
		$(this).toggleClass("-active");
	});
	$(".video-thumb__img").on("click", function (e) {
		e.preventDefault();
		var bigImage = $(this).attr("data-imglg");
		var ytLink = $(this).attr("data-vidhref");
		$(".main-video-wrap__play").attr("data-video", ytLink);
		var imgMain = $(".main-video-wrap").find("img");
		imgMain.attr("src", bigImage);
		if (imgMain.hasClass("-active")) {
			player.stopVideo();
			imgMain.removeClass("-active");
			$(".main-video-wrap__play").css("display", "block");
		}
		$(".main-video-wrap__play").trigger("click");
	});
	$(".main-video-wrap__play").on("click", function (e) {
		$(this).hide();
		$(this).parent().find("img").toggleClass("-active");
		var url = $(this).attr("data-video");
		void 0;
		onPlayerReady(url);
	});
	$(".sidebar-doctor-item-bg").on("click", function (e) {
		e.preventDefault();
		$(this).closest(".doc-plus-pseudo").toggleClass("-active");
	});
	$(".list-doc").on("click", function (e) {
		e.preventDefault();
		e.stopPropagation();
		void 0;
	});
	$(".list-doc a").on("click", function (e) {
		e.stopPropagation();
	});
	$(".main-tabs").on("click", ".categ-caption:not(.-active)", function () {
		$(this)
			.addClass("-active")
			.parent()
			.siblings()
			.find(".categ-caption")
			.removeClass("-active")
			.closest(".main-tabs")
			.find(".row-categ-tab")
			.removeClass("-active")
			.css({
				opacity: "0",
				display: "none",
			})
			.eq($(this).parent().index())
			.addClass("-active")
			.css("display", "block")
			.animate(
				{
					opacity: "1",
				},
				300
			);
	});
	$(".dropdown-tabs").on(
		"click",
		".dropdown-caption:not(.-active)",
		function () {
			$(this)
				.addClass("-active")
				.siblings()
				.removeClass("-active")
				.closest(".dropdown-tabs")
				.find(".dropdown-content")
				.removeClass("-active")
				.css({
					opacity: "0",
					display: "none",
				})
				.eq($(this).index())
				.addClass("-active")
				.css("display", "block")
				.animate(
					{
						opacity: "1",
					},
					300
				);
		}
	);
	$(document).on("mouseenter", ".dropdown-caption", function (e) {
		if (window.innerWidth > 768) {
			$(".dropdown-caption").eq($(this).index()).trigger("click");
		}
	});
	$(".phone-wrap .icon-arrow-down").on("click", function (e) {
		e.preventDefault();
		$(".phone-item-dropdown").slideToggle();
		$(".phone-item-dropdown").toggleClass("-active");
	});
	$(document).on("click", ".phone-item-dropdown .phone-item", function (e) {
		e.preventDefault();
		var phoneM = $(this).text();
		var phone_replace = phoneM.replace(/\D+/g, "");
		$(".phone-item-active .phone-link").text(phoneM);
		$(".phone-item-active .phone-link").attr("href", "tel:+" + phone_replace);
		$(".phone-item-dropdown").slideToggle();
		$(".phone-item-dropdown").toggleClass("-active");
	});
	var f = true;
	var hh;
	$(window).on("scroll", function () {
		var scrTop = $(window).scrollTop();
		var headerHeight =
			window.innerWidth < $(".header").innerHeight()
				? 15
				: $(".header").innerHeight();
		var header =
			window.innerWidth < 768
				? $(".main-header-bg").innerHeight()
				: $(".main-header-bg").innerHeight();
		if (scrTop > headerHeight && f) {
			f = false;
			hh = $(".main-header-bg").innerHeight();
			$(".main-header-bg").addClass("-fixed");
			if ($(".main-menu-dropdown").hasClass("-show")) {
				$(".main-menu-dropdown").removeClass("-show");
				$(".main-menu-dropdown").addClass("-fixed");
				topVal = $(".main-header-bg").innerHeight() - 4;
				$("#menu-dropdown").css({
					top: topVal + "px",
				});
			}
		} else if (scrTop <= headerHeight && !f) {
			f = true;
			$(".main-header-bg").removeClass("-fixed");
			if ($(".main-menu-dropdown").hasClass("-fixed")) {
				$(".main-menu-dropdown").removeClass("-fixed");
				$(".main-menu-dropdown").addClass("-show");
				topVal =
					$(".header-topline-bg").innerHeight() +
					$(".main-header-bg").innerHeight() -
					4;
				$("#menu-dropdown").css({
					top: topVal + "px",
				});
			}
		}
	});
	
	$(document).on("click", ".js-more-content", function (e) {
		e.preventDefault();
		
		var textButton = $(this).find(".btn-more__text").text();
		var textButtonData = $(this).attr("data-buttontext");
		

		

		$(this).find(".btn-more__circle").toggleClass("btn-more__circle_up");
		
		if (textButton !== textButtonData) {
			$(this).find(".btn-more__text").text(textButtonData);
			$(this).attr("data-buttontext", textButton);
		}
		
		$(this).closest(".js-content-closest").find(".js-content-hidden").slideToggle(300);

		if ($(this).hasClass("js-gradient")) {
			void 0;
			$(this).closest(".js-content-closest").find(".css-showed-content-gradient").toggleClass("-gradient");
		}
		
		if ($(this).hasClass("js-more-toggle")) {
			$(this).closest(".js-content-closest").toggleClass("-position-btn");
		}
	});

	$(document).on("click", ".js-more", function (e) {
		e.preventDefault();
		$(this).find(".btn-more__circle").toggleClass("btn-more__circle_up");
		$(this).closest(".js-content-closest").toggleClass("-active");
	});

	$(".main-menu-dropdown .hamburger").on("click", function (e) {
		e.preventDefault();
		$(".main-menu a.-active").removeClass("-active");
		$(".main-menu-dropdown").removeClass("-show -fixed");
	});

	$(".js-hamburger").on("click", function (e) {
		e.preventDefault();
		$(".js-hamburger").toggleClass("is-active");
		$(".wrap-menu").toggleClass("-active");
	});

	$(".send").on("click", function (e) {
		e.preventDefault();
		var form = $(this).parents("form");
		form.find("input").each(function () {
			var inp = $(this);
			var req = $(this).data("req");
			if (inp.attr("type") === "email") {
				var em = inp.val();
				if (!validateEmail(em)) {
					inp.parent().addClass("-error");
				} else {
					inp.parent().removeClass("-error");
				}
			} else if (req === 1 && !inp.val().length) {
				inp.parent().addClass("-error");
			} else {
				inp.parent().removeClass("-error");
			}
		});
		if (form.find(".-error").length) {
			return false;
		} else {
			$.ajax({
				type: "POST",
				url: form.attr("action"),
				data: form.serialize(),
				success: function (response) {
					$(":input")
						.not(":button, :submit, :reset, :hidden")
						.val("")
						.removeAttr("checked")
						.removeAttr("selected");
					$.fancybox.close();
					$.fancybox.open({
						src: "#thx",
						touch: false,
						smallBtn: false,
					});
				},
			});
		}
	});

	$("input,textarea")
		.focus(function () {
			$(this)
				.data("placeholder", $(this).attr("placeholder"))
				.attr("placeholder", "");
		})
		.blur(function () {
			$(this).attr("placeholder", $(this).data("placeholder"));
		});
	if ($("#map-canvas").length) {
		var myMap1;
		var objectManager;
		var dataObj = {
			type: "FeatureCollection",
			features: [
				{
					type: "Feature",
					id: 0,
					geometry: {
						type: "Point",
						coordinates: [44.585309, 33.51679],
					},
					properties: {
						hintContent: "",
					},
					options: {
						preset: "islands#redDotIcon",
					},
				},
				{
					type: "Feature",
					id: 1,
					geometry: {
						type: "Point",
						coordinates: [44.572326, 33.523139],
					},
					properties: {
						hintContent: "",
					},
					options: {
						preset: "islands#redDotIcon",
					},
				},
				{
					type: "Feature",
					id: 3,
					geometry: {
						type: "Point",
						coordinates: [44.591492, 33.554214],
					},
					properties: {
						hintContent: "",
					},
					options: {
						preset: "islands#redDotIcon",
					},
				},
				{
					type: "Feature",
					id: 4,
					geometry: {
						type: "Point",
						coordinates: [44.555065, 33.527453],
					},
					properties: {
						hintContent: "",
					},
					options: {
						preset: "islands#redDotIcon",
					},
				},
				{
					type: "Feature",
					id: 2,
					geometry: {
						type: "Point",
						coordinates: [44.585046, 33.44202],
					},
					properties: {
						hintContent: "",
					},
					options: {
						preset: "islands#redDotIcon",
					},
				},
			],
		};

		function init() {
			(myMap1 = new ymaps.Map(
				"map-canvas",
				{
					center: [44.583101, 33.479197],
					zoom: 12,
				},
				{
					searchControlProvider: "yandex#search",
				}
			)),
				(objectManager = new ymaps.ObjectManager({
					clusterize: false,
					gridSize: 32,
					clusterDisableClickZoom: true,
				}));
			myMap1.behaviors.disable("scrollZoom");
			myMap1.geoObjects.add(objectManager);
			objectManager.add(dataObj);
		}
		ymaps.ready(init);
		$(".map-contacts__top").on("click", function (e) {
			var arr = $(this).attr("data-map").split(",");
			changeCenter(arr);
		});

		function changeCenter(pos) {
			myMap1.setCenter(pos);
		}
	}
	if ($("#map-contacts-page").length) {
		var dataObj = {
			type: "FeatureCollection",
			features: [
				{
					type: "Feature",
					id: 0,
					geometry: {
						type: "Point",
						coordinates: [44.585309, 33.51679],
					},
					properties: {
						hintContent: "",
					},
					options: {
						preset: "islands#redDotIcon",
					},
				},
				{
					type: "Feature",
					id: 1,
					geometry: {
						type: "Point",
						coordinates: [44.572326, 33.523139],
					},
					properties: {
						hintContent: "",
					},
					options: {
						preset: "islands#redDotIcon",
					},
				},
				{
					type: "Feature",
					id: 3,
					geometry: {
						type: "Point",
						coordinates: [44.591492, 33.554214],
					},
					properties: {
						hintContent: "",
					},
					options: {
						preset: "islands#redDotIcon",
					},
				},
				{
					type: "Feature",
					id: 2,
					geometry: {
						type: "Point",
						coordinates: [44.585046, 33.44202],
					},
					properties: {
						hintContent: "",
					},
					options: {
						preset: "islands#redDotIcon",
					},
				},
				{
					type: "Feature",
					id: 4,
					geometry: {
						type: "Point",
						coordinates: [44.555065, 33.527453],
					},
					properties: {
						hintContent: "",
					},
					options: {
						preset: "islands#redDotIcon",
					},
				},
			],
		};
		ymaps.ready(init);

		function init() {
			var myMap = new ymaps.Map(
					"map-contacts-page",
					{
						center: [44.583101, 33.479197],
						zoom: 12,
					},
					{
						searchControlProvider: "yandex#search",
					}
				),
				objectManager = new ymaps.ObjectManager({
					clusterize: false,
					gridSize: 32,
					clusterDisableClickZoom: true,
				});
			myMap.behaviors.disable("scrollZoom");
			myMap.geoObjects.add(objectManager);
			objectManager.add(dataObj);
		}
	}

	function validateEmail(email) {
		var re =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
	if ($("#player").length) {
	}
});
$(document).ready(function () {
	var formOldName;
	var formName;
	var oncePopup = 0;
	$("[data-jsformtitle]").on("click", function (e) {
		formName = $(this).attr("data-jsformtitle");
	});
	$("[data-fancybox]").fancybox({
		touch: false,
		smallBtn: false,
		beforeShow: function (instance, slide) {
			if (formName) {
				void 0;
				var slideBlock = $(slide.src);
				oncePopup++;
				if (formName && oncePopup === 1) {
					void 0;
					var jsInput = slideBlock.find("[data-jsval]");
					formOldName = jsInput.val();
					void 0;
					jsInput.val(formName);
				}
			}
		},
		afterClose: function (instance, slide) {
			if (formName && oncePopup === 1) {
				var slide = slide.$content[0];
				void 0;
				$(slide).find("[data-jsval]").val(formOldName);
				formName = null;
			}
			if (oncePopup > 0) {
				oncePopup--;
				void 0;
			}
		},
	});
	$("input[type=tel]").inputmask({
		mask: "+7 (999)-999-99-99",
		clearIncomplete: true,
	});
	$(".service-item__top").matchHeight();
	$(".news-item__title").matchHeight();
	(function () {
		$(window).on("load", function () {
			$(".sidebar-doctor-item-mh").each(function (i, item) {
				var h = $(item).innerHeight();
				void 0;
				if (h > 470) {
					$(item).css("height", "470px");
				} else {
					var hInteg = parseInt($(item).innerHeight());
					void 0;
					$(item).css("height", hInteg + 2);
				}
			});
			var hVid = $(".main-video-wrap").innerHeight();
			var hThumbVid = $(".video-thumb-wrap").innerHeight();
			if (window.innerWidth > 768) {
				$(".video-thumb-wrap").css("height", hVid);
			} else {
				$(".video-thumb-wrap").css("height", "300px");
			}
			$(".video-thumb-wrap").mCustomScrollbar({
				scrollInertia: 100,
			});
			$(".row-categ-tab").each(function (i, item) {
				var h = $(item).innerHeight();
				if (h > 840) {
					$(item).css("height", "840px");
				} else {
					var hInteg = parseInt($(item).innerHeight());
					$(item).css("height", hInteg + 2);
				}
			});
			$(".map-contacts").mCustomScrollbar({
				scrollInertia: 100,
			});
			$(".table-service-wrap").mCustomScrollbar({
				scrollInertia: 100,
			});
			$(".news-sidebar-bg").mCustomScrollbar({
				scrollInertia: 100,
			});
			$(".sidebar-doctor-item-mh").mCustomScrollbar({
				scrollInertia: 100,
			});
			$(".row-categ-tab").mCustomScrollbar({
				scrollInertia: 100,
			});
		});
	})();
	if ($(".your-class").length) {
		$(".your-class").slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true,
			centerMode: false,
			prevArrow:
				'<button type="button" data-role="none" class="slick-prev slick-arrow" aria-label="Previous" role="button" style="display: block;"></button>',
			nextArrow:
				'<button type="button" data-role="none" class="slick-next slick-arrow" aria-label="Next" role="button" style="display: block;"></button>',
			centerPadding: "30px",
			touchMove: false,
			draggable: false,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						dots: false,
						slidesToShow: 2,
						slidesToScroll: 1,
					},
				},
				{
					breakpoint: 668,
					settings: {
						dots: false,
						slidesToShow: 1,
						slidesToScroll: 1,
					},
				},
			],
		});
	}
	if ($(".stock-slider-wrap").length) {
		$(".stock-slider-wrap").slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true,
			centerMode: false,
			arrows: false,
			prevArrow:
				'<button type="button" data-role="none" class="slick-prev slick-arrow" aria-label="Previous" role="button" style="display: block;"></button>',
			nextArrow:
				'<button type="button" data-role="none" class="slick-next slick-arrow" aria-label="Next" role="button" style="display: block;"></button>',
			centerPadding: "30px",
			touchMove: false,
			draggable: false,
			appendDots: ".stock-dots .container",
			autoplay: true,
			autoplaySpeed: 1800,
		});
		$(".stock-next").on("click", function (e) {
			e.preventDefault();
			$(".stock-slider-wrap").slick("slickNext");
		});
		$(".stock-prev").on("click", function (e) {
			e.preventDefault();
			$(".stock-slider-wrap").slick("slickPrev");
		});
	}
	if ($(".gallery-slider").length) {
		$(".gallery-slider").slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: false,
			centerMode: false,
			arrows: true,
			prevArrow:
				'<button type="button" data-role="none" class="slick-prev slick-arrow" aria-label="Previous" role="button" style="display: block;"><i class="icon-arrow-left"></i></button>',
			nextArrow:
				'<button type="button" data-role="none" class="slick-next slick-arrow" aria-label="Next" role="button" style="display: block;"><i class="icon-arrow-right"></i></button>',
			centerPadding: "30px",
			touchMove: false,
			draggable: false,
			appendArrows: ".gallery-arrows-sm-slide",
		});
	}
	if ($(".testimonials-slider").length) {
		$(".testimonials-slider").slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: false,
			centerMode: false,
			arrows: true,
			prevArrow:
				'<button type="button" data-role="none" class="slick-prev slick-arrow" aria-label="Previous" role="button" style="display: block;"><i class="icon-arrow-left"></i></button>',
			nextArrow:
				'<button type="button" data-role="none" class="slick-next slick-arrow" aria-label="Next" role="button" style="display: block;"><i class="icon-arrow-right"></i></button>',
			centerPadding: "30px",
			touchMove: false,
			draggable: false,
		});
	}
	if ($(".js-stickysidebar-container").length) {
		$(".js-sidebar-sticky").stickySidebar({
			containerSelector: ".js-stickysidebar-container",
			topSpacing: $(".main-header-bg").innerHeight() + 17,
			bottomSpacing: 20,
			minWidth: 768,
		});
	}
	if ($(".js-stickysidebar-container2").length) {
		$(".js-sidebar-sticky2").stickySidebar({
			containerSelector: ".js-stickysidebar-container2",
			topSpacing: $(".main-header-bg").innerHeight() + 17,
			bottomSpacing: 20,
			minWidth: 768,
		});
	}
	void 0;
});
