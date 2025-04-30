/* plain JS slideToggle https://github.com/ericbutler555/plain-js-slidetoggle */

HTMLElement.prototype.slideToggle = function (duration, callback) {
	if (this.clientHeight === 0) {
		_s(this, duration, callback, true);
	} else {
		_s(this, duration, callback);
	}
};

HTMLElement.prototype.slideUp = function (duration, callback) {
	_s(this, duration, callback);
};

HTMLElement.prototype.slideDown = function (duration, callback) {
	_s(this, duration, callback, true);
};

function _s(el, duration, callback, isDown) {
	if (typeof duration === "undefined") duration = 400;
	if (typeof isDown === "undefined") isDown = false;

	el.style.overflow = "hidden";
	if (isDown) el.style.display = "block";

	var elStyles = window.getComputedStyle(el);

	var elHeight = parseFloat(elStyles.getPropertyValue("height"));
	var elPaddingTop = parseFloat(elStyles.getPropertyValue("padding-top"));
	var elPaddingBottom = parseFloat(elStyles.getPropertyValue("padding-bottom"));
	var elMarginTop = parseFloat(elStyles.getPropertyValue("margin-top"));
	var elMarginBottom = parseFloat(elStyles.getPropertyValue("margin-bottom"));

	var stepHeight = elHeight / duration;
	var stepPaddingTop = elPaddingTop / duration;
	var stepPaddingBottom = elPaddingBottom / duration;
	var stepMarginTop = elMarginTop / duration;
	var stepMarginBottom = elMarginBottom / duration;

	var start;

	function step(timestamp) {
		if (start === undefined) start = timestamp;

		var elapsed = timestamp - start;

		if (isDown) {
			el.style.height = stepHeight * elapsed + "px";
			el.style.paddingTop = stepPaddingTop * elapsed + "px";
			el.style.paddingBottom = stepPaddingBottom * elapsed + "px";
			el.style.marginTop = stepMarginTop * elapsed + "px";
			el.style.marginBottom = stepMarginBottom * elapsed + "px";
		} else {
			el.style.height = elHeight - stepHeight * elapsed + "px";
			el.style.paddingTop = elPaddingTop - stepPaddingTop * elapsed + "px";
			el.style.paddingBottom = elPaddingBottom - stepPaddingBottom * elapsed + "px";
			el.style.marginTop = elMarginTop - stepMarginTop * elapsed + "px";
			el.style.marginBottom = elMarginBottom - stepMarginBottom * elapsed + "px";
		}

		if (elapsed >= duration) {
			el.style.height = "";
			el.style.paddingTop = "";
			el.style.paddingBottom = "";
			el.style.marginTop = "";
			el.style.marginBottom = "";
			el.style.overflow = "";
			if (!isDown) el.style.display = "none";
			if (typeof callback === "function") callback();
		} else {
			window.requestAnimationFrame(step);
		}
	}

	window.requestAnimationFrame(step);
}

const body = document.querySelector("body");
const menuMob = document.getElementById("menuMobile");

const appHeight = () => {
	const doc = document.documentElement;
	doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};

const menuOpen = () => {
	const menuOverlay = document.createElement("div");
	menuOverlay.id = "menuMobileOverlay";
	menuOverlay.classList.add("fixed", "inset-0", "z-30", "invisible", "opacity-0", "pointer-events-none", "bg-neutral-black-1/50", "backdrop-blur-sm", "transition-all", "duration-300", "lg:hidden");
	body.appendChild(menuOverlay);
	body.classList.add("overflow-clip");
	setTimeout(() => {
		menuOverlay.classList.remove("invisible", "pointer-events-none", "opacity-0");
	}, 10);
	setTimeout(() => {
		menuMob.classList.remove("-translate-x-p110");
	}, 10);
};

const menuClose = () => {
	menuMob.classList.add("-translate-x-p110");
	const menuMobileOverlay = document.getElementById("menuMobileOverlay");
	if (menuMobileOverlay) {
		setTimeout(() => {
			menuMobileOverlay.classList.add("opacity-0");
		}, 100);
		setTimeout(() => {
			body.classList.remove("overflow-clip");
			menuMobileOverlay.remove();
		}, 200);
	}
};

const burgerMenu = document.getElementById("burgerMenu");
const closeMenuMobile = document.getElementById("closeMenuMobile");
if (burgerMenu) {
	burgerMenu.addEventListener("click", menuOpen);
}

if (closeMenuMobile) {
	closeMenuMobile.addEventListener("click", menuClose);
}

document.addEventListener("click", (event) => {
	// Перевіряємо, чи клік був за межами меню та кнопки
	if (menuMob) {
		if (!menuMob.contains(event.target) && !burgerMenu.contains(event.target)) {
			menuClose();
		}
	}
});

window.addEventListener("resize", appHeight);
appHeight();

// review expert show content
const reviewBtnAll = document.querySelectorAll(".review-btn");
reviewBtnAll.forEach((button) => {
	button.addEventListener("click", function () {
		this.querySelector(".icon").classList.toggle("rotate-45");
		this.classList.toggle("text-shadow-mid");

		const reviewContent = button.nextElementSibling;
		if (reviewContent && reviewContent.classList.contains("review-content")) {
			reviewContent.slideToggle();
		}
	});
});

// show more action
const showMoreBtnAll = document.querySelectorAll('.btn-show-more')

if (showMoreBtnAll) {
	let state = 0;
	showMoreBtnAll.forEach((button) => {
		button.addEventListener('click', function () {
			const textDescription = button.parentNode.querySelector('.text-description');
			const textDescriptionShowMoreBtnText = button.querySelector('.btn-show-more-text')
			textDescription.classList.toggle("line-clamp-3");

			if (state === 0) {
				state = 1;
				textDescriptionShowMoreBtnText.textContent = "View less";
				this.querySelector(".icon").classList.add("rotate-x-180");
			} else {
				state = 0;
				textDescriptionShowMoreBtnText.textContent = "View more";
				this.querySelector(".icon").classList.remove("rotate-x-180");
			}
		})
	})
}

// show more plans
const showMorePlansBtn = document.getElementById('showMorePlansBtn');
if (showMorePlansBtn) {
	showMorePlansBtn.addEventListener('click', (e) => {
		e.target.remove();
		const morePlans = document.getElementById('morePlans');
		morePlans.slideDown(500)
	})
}