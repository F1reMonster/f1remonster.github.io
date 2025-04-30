// Функція, яка перевіряє, чи елемент стає видимим на екрані
function isElementInViewport(el) {
	var rect = el.getBoundingClientRect();
	return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}

// Функція, яка перевіряє, чи елемент стає не видимим на екрані
function isElementNotInViewport(el) {
	var rect = el.getBoundingClientRect();
	return rect.bottom < 0 || rect.right < 0 || rect.left > (window.innerWidth || document.documentElement.clientWidth) || rect.top > (window.innerHeight || document.documentElement.clientHeight);
}

const menuBurgerBtn = document.querySelector(".header__burger");
const headerMenu = document.querySelector(".header__menu");
const headerLogo = document.querySelector(".header__logo");
const body = document.querySelector("body");
const menuBackground = document.querySelector(".header__menu-background");
const btnSoundOnOff = document.querySelector(".block__about-video .btn");
const aboutVideo = document.querySelector(".block__about-video video");
const serviceItems = document.querySelectorAll(".block__services-items-title li");
const serviceItemsContent = document.querySelectorAll(".block__services-items-content li");
const menuLinks = document.querySelectorAll(".header__menu li a");
let swiper;

// бургер меню
if (menuBurgerBtn) {
	menuBurgerBtn.addEventListener("click", function () {
		this.classList.toggle("header__burger--active");
		headerMenu.classList.toggle("header__menu--active");
		headerLogo.classList.toggle("header__logo--menu-active");
		body.classList.toggle("lock");
		menuBackground.classList.toggle("header__menu-background--active");
	});
}

if (menuLinks) {
	menuLinks.forEach((link) => {
		link.addEventListener("click", () => {
			menuBurgerBtn.classList.remove("header__burger--active");
			headerMenu.classList.remove("header__menu--active");
			headerLogo.classList.remove("header__logo--menu-active");
			body.classList.remove("lock");
			menuBackground.classList.remove("header__menu-background--active");
		});
	});
}

// вкл/викл звуку
if (btnSoundOnOff) {
	btnSoundOnOff.addEventListener("click", function () {
		aboutVideo.muted = !aboutVideo.muted;
		const btnIcon = this.querySelector(".icon");

		if (btnIcon.classList.contains("icon--soundoff")) {
			btnIcon.classList.remove("icon--soundoff");
			btnIcon.classList.add("icon--soundon");
		} else {
			btnIcon.classList.remove("icon--soundon");
			btnIcon.classList.add("icon--soundoff");
		}
	});
}

// плей/стоп відео
window.addEventListener("scroll", function () {
	if (isElementNotInViewport(aboutVideo)) {
		aboutVideo.pause();
		aboutVideo.currentTime = 0;
		aboutVideo.muted = true;

		const btnIcon = btnSoundOnOff.querySelector(".icon");

		if (btnIcon.classList.contains("icon--soundon")) {
			btnIcon.classList.remove("icon--soundon");
			btnIcon.classList.add("icon--soundoff");
		}
	} else {
		aboutVideo.play();
		aboutVideo.volume = 0.5;
	}
});

// сервіси таби
function initTabs() {
	serviceItems.forEach((tab, index) => {
		tab.addEventListener("click", () => {
			serviceItems.forEach((t) => t.classList.remove("active"));
			serviceItemsContent.forEach((c) => c.classList.remove("active"));

			tab.classList.add("active");
			serviceItemsContent[index].classList.add("active");
		});
	});
}

function initSwiper() {
	swiper = new Swiper(".block__services-list .swiper", {
		slidesPerView: 1,
		spaceBetween: 10,
		autoHeight: true,

		navigation: {
			nextEl: ".block__services-list .slider-next",
			prevEl: ".block__services-list .slider-prev",
		},
	});
}

function checkWidth() {
	if (window.innerWidth <= 767) {
		if (!swiper) {
			initSwiper();
		}
	} else {
		if (swiper) {
			swiper.destroy();
			swiper = null;
		}
		initTabs();
	}
}

checkWidth();
window.addEventListener("resize", checkWidth);
