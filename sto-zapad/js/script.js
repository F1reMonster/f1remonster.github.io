$(document).ready(function () {
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

	$(".burger").click(function (e) {
		e.preventDefault();
		$(".header__content").toggleClass("active");
		$(".burger__menu").toggleClass("show");
	});

	// select

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
			filterList("");

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

		searchBox.addEventListener("keyup", function (e) {
			filterList(e.target.value);
		});

		const filterList = (searchTerm) => {
			searchTerm = searchTerm.toLowerCase();
			optionsList.forEach((option) => {
				let label =
					option.firstElementChild.nextElementSibling.innerText.toLowerCase();
				if (label.indexOf(searchTerm) != -1) {
					option.style.display = "block";
				} else {
					option.style.display = "none";
				}
			});
		};
	});

	// sliders

	const mainGal = new Swiper(".gallery__slider", {
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		speed: 800,
		loop: true,
		centeredSlides: true,
		slidesPerView: "auto",
		grabCursor: true,
		effect: "coverflow",
		breakpoints: {
			568: {
				effect: "coverflow",
				coverflowEffect: {
					rotate: 0,
					stretch: 322,
					depth: 150,
					modifier: 1.5,
				},
			},
			320: {
				effect: "fade",
				fadeEffect: {
					crossFade: true,
				},
			},
		},
	});

	const testmonials = new Swiper(".testimonials__slider", {
		slidesPerView: 2,
		spaceBetween: 56,
		pagination: {
			el: ".comments-pagination",
			type: "fraction",
		},
		navigation: {
			nextEl: ".swiper-button-next1",
			prevEl: ".swiper-button-prev1",
		},
		breakpoints: {
			668: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			320: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
		},
	});

	//map

	let map = L.map("mapid").setView([53.9158, 27.45226], 16);

	map.scrollWheelZoom.disable();
	L.tileLayer(
		// "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
		// {
		// 	maxZoom: 18,
		// 	attribution:
		// 		'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
		// 		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		// 	id: "mapbox/streets-v11",
		// 	tileSize: 512,
		// 	zoomOffset: -1,
		// }
		"http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
		{
			maxZoom: 20,
			subdomains: ["mt0", "mt1", "mt2", "mt3"],
		},

	).addTo(map);

	let marker = L.marker([53.9158, 27.45226]).addTo(map);
	marker.bindPopup("<b>STO-ZAPAD</b><br><b>ул. Лещинского 12</b>").openPopup();

	//change map pin
	// $(".leaflet-marker-pane img").attr("src", "img/marker-icon.png");
	$(".leaflet-marker-pane img").css({
		width: "auto",
		height: "auto",
		"margin-left": "-36px",
	});
	// $(".leaflet-shadow-pane img").attr("src", "img/marker-shadow.png");

	// faq accordion

	$(".faq__content").hide();
	$(".faq__title").click(function () {
		if ($(this).hasClass("active")) {
			$(this).removeClass("active");
			$(this).next(".faq__content").slideUp();
		} else {
			$(".faq__title").removeClass("active");
			$(".faq__content").slideUp();
			$(this).addClass("active");
			$(this).next(".faq__content").slideDown();
		}
	});

	// form

	// inputmask

	// let selector = document.querySelectorAll('input[type="phone"]');
	// let maskPhone = new Inputmask("+375 (999) 999-99-99");
	// maskPhone.mask(selector);

	$('input[type="tel"]').inputmask("+375 (99) 999-99-99");
	//$('input[type="text"]').inputmask({ mask: "a{3,30}"});

	// validate

	// let validateForms = function (selector, rules, successModal, yaGoal) {
	// 	new window.JustValidate(selector, {
	// 		rules: rules,
	// 		submitHandler: function (form) {
	// 			let formData = new FormData(form);

	// 			let xhr = new XMLHttpRequest();

	// 			xhr.onreadystatechange = function () {
	// 				if (xhr.readyState === 4) {
	// 					if (xhr.status === 200) {
	// 						console.log("Отправлено");
	// 					}
	// 				}
	// 			};

	// 			xhr.open("POST", "mail.php", true);
	// 			xhr.send(formData);

	// 			form.reset();

	// 			//fileInput.closest('label').querySelector('span').textContent = 'Прикрепить файл';
	// 		},
	// 	});
	// };

	// validateForms(
	// 	"#main-form",
	// 	{
	// 		phone: { required: true },
	// 		name: { required: true },
	// 		agree: { required: true },
	// 	},
	// 	".thanks-popup",
	// 	"send goal"
	// );



	// show success modal

	// main-form
	$('#main-form').submit(function (e) {
		e.preventDefault();



		let adminEmail = $('input[name="admin_email[]"]').val();
		console.log("admin email: " + adminEmail);

		let formSubject = $('input[name="form_subject"]').val();
		console.log("form subject: " + formSubject);

		let visitorName = $('input[name="name"]').val();
		console.log("Visitor name: " + visitorName);

		let visitorPhone = $('input[name="phone"]').val();
		console.log("Visitor phone: " + visitorPhone);

		let visitorService = $('.radio:checked').val();
		let visitorServiceId = $('.radio:checked').attr('id');
		console.log("serviceiD: " + visitorServiceId);
		console.log("Visitor service: " + visitorService);





		$('.modal').removeClass('open');

		$('input[type="text"]').val("");
		$('input[type="tel"]').val("");
		$('.selected').text("Услуга");
		$('.radio:checked').removeAttr('checked');

		$('#modal-send-success').addClass('open')

	});

	$('#modal-main-form').submit(function (e) {
		e.preventDefault();



		let adminEmail = $('input[name="admin_email_modal[]"]').val();
		console.log("admin email: " + adminEmail);

		let formSubject = $('input[name="form_subject_modal"]').val();
		console.log("form subject: " + formSubject);

		let visitorName = $('input[name="name-modal"]').val();
		console.log("Visitor name: " + visitorName);

		let visitorPhone = $('input[name="phone-modal"]').val();
		console.log("Visitor phone: " + visitorPhone);

		let visitorService = $('.radio:checked').val();
		let visitorServiceId = $('.radio:checked').attr('id');
		console.log("serviceiD: " + visitorServiceId);
		console.log("Visitor service: " + visitorService);





		$('.modal').removeClass('open');

		$('input[type="text"]').val("");
		$('input[type="tel"]').val("");
		$('.selected').text("Услуга");
		$('.radio:checked').removeAttr('checked');

		$('#modal-send-success').addClass('open')

	})
});

// modal

const modalLinks = document.querySelectorAll(".modal-link");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding"); // for fixed objects

const timeout = 800;

let unlock = true;

if (modalLinks.length > 0) {
	for (let index = 0; index < modalLinks.length; index++) {
		const modalLink = modalLinks[index];
		modalLink.addEventListener("click", function (e) {
			const modalName = modalLink.getAttribute("href").replace("#", "");
			const currentModal = document.getElementById(modalName);
			modalOpen(currentModal);
			e.preventDefault();
		});
	}
}

const modalCloseIcon = document.querySelectorAll(".modal-close");
if (modalCloseIcon.length > 0) {
	for (let index = 0; index < modalCloseIcon.length; index++) {
		const el = modalCloseIcon[index];
		el.addEventListener("click", function (e) {
			modalClose(el.closest(".modal"));
			e.preventDefault();
		});
	}
}

function modalOpen(currentModal) {
	if (currentModal && unlock) {
		const modalActive = document.querySelector(".modal.open");
		if (modalActive) {
			modalClose(modalActive, false);
		} else {
			bodyLock();
		}
		currentModal.classList.add("open");
		currentModal.addEventListener("click", function (e) {
			if (!e.target.closest(".modal__content")) {
				modalClose(e.target.closest(".modal"));
			}
		});
	}
}

function modalClose(modalActive, doUnlock = true) {
	if (unlock) {
		modalActive.classList.remove("open");
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue =
		window.innerWidth -
		document.querySelector(".body-wrapper").offsetWidth +
		"px";

	if (lockPadding.length > 0) {
		for (let index = 0; lockPadding.length < 0; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add("lock");

	unLock = false;

	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = "0px";
		}
		body.style.paddingRight = "0px";
		body.classList.remove("lock");
	}, timeout);
}

document.addEventListener("keydown", function (e) {
	if (e.which === 27) {
		const modalActive = document.querySelector(".modal.open");
		modalClose(modalActive);
	}
});
