
// function show/hide language menu on pages (not footer)

import { contactEmail, contactPhone } from "./data.js";


function languageMenuTouch() {
	$(".language__item.dropdown").on("click", function (el) {
		el.preventDefault();

		if ($(window).outerWidth() < 1025) {
			if ($(this).hasClass("active")) {
				$(this).removeClass("active");
			} else {
				$(this).addClass("active");
			}
		}

		$(document).mouseup(function (e) {
			if ($(e.target).closest(".language__item.dropdown.active").length === 0) {
				$(".language__item.dropdown").removeClass("active");
			}
		});
	});
}

$('body').css('opacity', '0');

$(document).ready(function () {
	// burger open
	$(".burger").click(function (e) {
		e.preventDefault();

		$(this).toggleClass("open");
		$(".header").toggleClass("menu-show");
		$(".overlay").toggleClass("show");
		$(".header__menu-wrapper").toggleClass("show");
	});

	if ($(".customers-slider")) {
		var customersSlider = new Swiper(".customers-slider", {
			slidesPerView: 1,
			// spaceBetween: 24,

			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
		});
	}
	
	// email&phone

	let clickEmail = 0,
		clickPhone = 0;

	$('[data-email]').click(function (e) {
		// e.preventDefault();
		$(this).html(contactEmail);
		if (clickEmail > 0) {
			$(this).prop('href', 'mailto:' + contactEmail);
		}
		clickEmail++;
		// window.open("mailto:" + contactEmail);
	})

	$('[data-phone]').click(function (e) {
		// e.preventDefault();
		$(this).html(contactPhone);

		if (clickPhone > 0) {
			$(this).prop('href', 'tel:' + contactPhone);
		}
		clickPhone++;
		// location.href = "tel:" + contactPhone;
	})
	

	$('a[href*="#"]').on("click", function (e) {
		if ($(".header__menu-wrapper").hasClass("show")) {
			$(".burger").removeClass("open");
			$(".header").removeClass("menu-show");
			$(".overlay").removeClass("show");
			$(".header__menu-wrapper").removeClass("show");
		}

		let link = $(this).attr("href");
		let hrefAnchor = link.split("#")[1];
		//console.log(hrefAnchor);

		if (hrefAnchor.length > 0) {
			$("html, body").animate(
				{
					scrollTop: $("#" + hrefAnchor).offset().top - 100,
				},
				500
			);
		}
	});

	// $('a[href*="mailto:"]').click(function (e) {
	// 	e.preventDefault();
	// 	window.open($(this).attr('href'))
	// });

	// $('a[href*="tel:"]').click(function (e) {
	// 	e.preventDefault();
	// 	window.open($(this).attr('href'))
	// });



	var urlHash = window.location.href.split("#")[1];
	if (urlHash && $("#" + urlHash).length) {
		scroll(0, 0);

		$("html,body").animate(
			{
				scrollTop: $("#" + urlHash).offset().top - 100,
			},
			500
		);
	}

	//let currentPage = window.location.pathname.split("/")[1];
	//let lastSlash = window.location.pathname.lastIndexOf("/");
	let currentPage = window.location.pathname.substr(
		window.location.pathname.lastIndexOf("/") + 1
	);

	$(".menu-item a").each(function () {
		if ($(this).attr("href") === currentPage) {
			$(this).removeAttr("href");
			$(this).parent().addClass("current-menu-item");
			//$(this).parent().addClass("careers");
		}
	});

	$(".header__menu-wrapper").removeClass("second-row-show");

	if ($(".menu-item.menu-item-has-children.current-menu-item").length > 0) {
		$(".header__menu-wrapper").addClass("second-row-show");
	}

	if (currentPage === "careers.html") {
		$(".case-studies").addClass("current-menu-item");
	}

	if (currentPage === "vacancies.html") {
		$(".header__menu-wrapper").addClass("second-row-show");
		$(".case-studies").addClass("current-menu-item");
		$(".case-studies").addClass("careers");
		$(".its-careers").removeClass("its-careers");
		$(".vacancies").addClass("its-careers");

		$(".case-studies .sub-menu .menu-item").hide();
		$(".case-studies .sub-menu .menu-item.careers").show();
		$(".case-studies .sub-menu .menu-item.vacancies").show();
	}

	if (currentPage === "vacancy.html") {
		$(".header__menu-wrapper").addClass("second-row-show");
		$(".case-studies").addClass("current-menu-item");
		$(".case-studies").addClass("careers");
		$(".its-careers").removeClass("its-careers");
		$(".vacancies").removeClass("its-careers");

		$(".case-studies .sub-menu .menu-item").hide();
		$(".case-studies .sub-menu .menu-item.careers").show();
		$(".case-studies .sub-menu .menu-item.vacancies").show();
	}

	// $('.footer__menu .menu-item').on('click', function() {
	// 	console.log($(this).attr('data-menu'));

	// 	$('.header__menu.menu-item').removeClass('current-menu-item')
	// 	$('.header__menu.menu-item[data-menu='+$(this).attr('data-menu')+']').addClass('current-menu-item')
	// })

	// show in [input type="file"] file name
	$('input[type="email"]').inputmask("email");

	$(".app-form__input.file").change(function () {
		let fileName = this.files[0];
		let fileSize = this.files[0].size;
		let fileSizeAttr = $(this).attr("size");
		let mBytes = fileSizeAttr / 1048576;

		if (fileSize <= fileSizeAttr) {
			$(this).next("span").text(fileName.name);
			$(this).next("span").css({ color: "rgb(0, 0, 0)" });
		} else {
			$(this)
				.next("span")
				.text("Error!!! File size more than " + mBytes + "Mb");
			$(this).next("span").css({ color: "#FA004A" });
		}
	});

	if ($(".map").length > 0) {
		//map

		let map = L.map("map1").setView([53.916667, 27.55], 10);
		map.scrollWheelZoom.disable();
		L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
			maxZoom: 20,
			subdomains: ["mt0", "mt1", "mt2", "mt3"],
		}).addTo(map);
		map.on('click', function (e) {
			window.open("https://www.google.com/maps/search/" + e.target._lastCenter.lat +"," + e.target._lastCenter.lng, "_blank");
		});
		let marker = L.marker([53.916667, 27.55]).addTo(map).on('click', function (e) {
			window.open("https://www.google.com/maps/search/" + e.target._latlng.lat +"," + e.target._latlng.lng, "_blank");
		});

		let map1 = L.map("map2").setView([49.842509, 24.027241], 10);
		map1.scrollWheelZoom.disable();
		L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
			maxZoom: 20,
			subdomains: ["mt0", "mt1", "mt2", "mt3"],
		}).addTo(map1);
		let marker1 = L.marker([49.842509, 24.027241]).addTo(map1).on('click', function (e) {
			window.open("https://www.google.com/maps/search/" + e.target._latlng.lat +"," + e.target._latlng.lng, "_blank");
		});
		map1.on('click', function (e) {
			window.open("https://www.google.com/maps/search/" + e.target._lastCenter.lat +"," + e.target._lastCenter.lng, "_blank");
		});

		let map2 = L.map("map3").setView([51.171356, 71.425753], 10);
		map2.scrollWheelZoom.disable();
		L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
			maxZoom: 20,
			subdomains: ["mt0", "mt1", "mt2", "mt3"],
		}).addTo(map2);
		let marker2 = L.marker([51.171356, 71.425753]).addTo(map2).on('click', function (e) {
			window.open("https://www.google.com/maps/search/" + e.target._latlng.lat +"," + e.target._latlng.lng, "_blank");
		});
		map2.on('click', function (e) {
			window.open("https://www.google.com/maps/search/" + e.target._lastCenter.lat +"," + e.target._lastCenter.lng, "_blank");
		});
	}

	$(".language__item.dropdown").removeClass("active");

	languageMenuTouch();

	

});

$(window).on('load', function() {
	//$('body').animate({opacity: '100%'}, 0);
	$('body').css('opacity', '1');
})

