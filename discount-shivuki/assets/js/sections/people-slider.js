
function MyPopUp(bg_layer, close_btn) {
	this.last_clicked_card = undefined;
	this.bg_layer = bg_layer;
	if (close_btn) {
		close_btn.addEventListener("click", this.Close.bind(this));
	}
	this.bg_layer.addEventListener("click", this.ClickOnBgLayer.bind(this));
}

MyPopUp.prototype.Show = function() {
	this.bg_layer.classList.add("show");
	let popup_stiles = window.getComputedStyle(this.bg_layer);
	let h = popup_stiles.getPropertyValue("height");
	this.bg_layer.classList.add("visible");
	document.body.classList.add("overflow-hidden");
};

MyPopUp.prototype.ClickOnBgLayer = function(e) {
	if (this.bg_layer.isEqualNode(e.target)) {
		this.Close();
	}
};

MyPopUp.prototype.Close = function() {
	this.bg_layer.classList.remove("visible");
	setTimeout(() => {
		this.bg_layer.classList.remove("show"), 600;
		document.body.classList.remove("overflow-hidden");
		if (this.last_clicked_card) {
			this.last_clicked_card.focus();
		}
	});
};

// popup with people slider, used on the "Team" and "Directorate" pages.
(function() {
	let popup_container = document.getElementById("people-slider-bg");

	if (!popup_container) {
		return;
	}
	let close_btn = popup_container.querySelector(":scope .close-people-slider");
	let popup = new MyPopUp(popup_container, close_btn);
	const swiper = new Swiper("#people-slider-bg .swiper", {
		// 'autoplay': {
		//     delay: 500000
		// },
		slideToClickedSlide: true,
		loop: true,
		navigation: {
			nextEl: "#people-slider-bg .next",
			prevEl: "#people-slider-bg .prev",
		},
	});

	// create scrollbars in the team slides
	let Scrollbar = window.Scrollbar;
	let slides = __arrElements("#people-slider-bg .slide-inner");
	slides.forEach((slide) => {
		Scrollbar.init(slide);
	});

	function InitPopUp(main_card_selector, cards_selector) {
		let cards = [];
		let main_card = document.querySelector(main_card_selector);
		if (main_card) {
			cards.push(main_card);
		}
		let members = __arrElements(cards_selector);
		cards = cards.concat(members);
		cards.forEach((item, ind) => {
			item.addEventListener("click", function() {
				popup.Show();
				popup.last_clicked_card = item;
				// set attribute 'aria-controls' when swiper is already set up and also its id.
				close_btn.setAttribute("aria-controls", swiper.$wrapperEl[0].id);
				close_btn.focus();
				swiper.slideToLoop(ind, 0);
			});
		});

		// when popup with swiper is opened then cickle focus on buttons of swiper until user won't close popup.
		const slider_btns = [...document.querySelectorAll("#people-slider-bg .content-wrap button")];
		const last_btn = slider_btns[slider_btns.length - 1];

		last_btn.addEventListener("keydown", function(e) {
			if (e.key == "Tab" && !e.shiftKey) {
				e.preventDefault();
				close_btn.focus();
			}
		});

		//prevent shif tab to go back to page while the popup with swiper is open.
		close_btn.addEventListener("keydown", function(e) {
			if (e.key == "Tab" && e.shiftKey) {
				e.preventDefault();
				return;
			}
		});
	}

	// team page
	InitPopUp(".team-section .boss-card .btn-focus", ".team-section .member-card .btn-focus");
	InitPopUp(".directorate-section .boss-card .btn-focus", ".directorate-section .directorate-card .btn-focus");
})();
