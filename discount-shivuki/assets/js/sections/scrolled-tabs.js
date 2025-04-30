
// helper functin, used in animation to calculate next point.
function easeInOutQuad(t, b, c, d) {
	t /= d / 2;
	if (t < 1) return (c / 2) * t * t + b;
	t--;
	return (-c / 2) * (t * (t - 2) - 1) + b;
}

// tabs functionality on the "Saving and Deposits 2" page.
function ScrolledTabs(container, tabs_content_container) {
	this.mobile_res = 767;
	this.container = container;
	this.tabs = __arrElements(container.querySelectorAll(":scope button:not(.prev):not(.next)"));
	this.tabs_wrap = container.querySelector(".scrolled-tabs");
	this.outer_container = container.parentElement;
	this.prev_btn = this.outer_container.querySelector(":scope .prev");
	this.next_btn = this.outer_container.querySelector(":scope .next");
	this.switcher_face = this.outer_container.querySelector(":scope .switcher-face");

	this.tabs_content = __arrElements(tabs_content_container.querySelectorAll(":scope .tab-content"));
	this.dir = window.getComputedStyle(container).getPropertyValue("direction");
}

ScrolledTabs.prototype.Init = function() {
	window.addEventListener("resize", this.Resize.bind(this));
	this.Resize();
	this.prev_btn.addEventListener("click", this.MoveForwardTabs.bind(this));
	this.next_btn.addEventListener("click", this.MoveBackTabs.bind(this));
	this.tabs.forEach((item) => item.addEventListener("click", this.TabClick.bind(this, item)));
	this.tabs.forEach((item) => item.addEventListener("keydown", this.OnKeyDown.bind(this, item)));
	this.switcher_face.addEventListener("click", this.onSwitcherFaceClick.bind(this));

	let media_query_str = `(max-width: ${this.mobile_res}px)`;
	let mql = window.matchMedia(media_query_str);
	mql.addEventListener("change", this.onChangeResolution.bind(this));
	this.onChangeResolution();
	this.DisabeNavBtns();
	document.body.addEventListener("click", this.onClickOnBody.bind(this));
};

ScrolledTabs.prototype.getCurrentItem = function() {
	let active_item = this.tabs.filter((item) => {
		return item.classList.contains("active");
	});
	active_item = active_item[0];
	return active_item;
};

ScrolledTabs.prototype.onClickOnBody = function(e) {
	if (this.outer_container.classList.contains("opened")) {
		let active_item = this.getCurrentItem();
		active_item.click();
	}
};

ScrolledTabs.prototype.onChangeResolution = function(e) {
	let is_mobile;
	if (e) {
		is_mobile = e.matches;
	} else {
		is_mobile = window.innerWidth <= this.mobile_res;
	}

	if (is_mobile) {
		// sets height on the items wrap in order to produce smooth opening
		// when switcher face is clicked.
		if (!this.outer_container.classList.contains("opened")) {
			let active_item = this.getCurrentItem();
			let h_active_item = active_item.getBoundingClientRect().height;
			this.tabs_wrap.style.height = h_active_item + "px";
		} else {
			this.onSwitcherFaceClick();
		}
	}
};

ScrolledTabs.prototype.onSwitcherFaceClick = function(e) {
	e.stopPropagation();
	this.outer_container.classList.add("opened", "rotate-switcher-tick");

	let h_dropdown_opened = 0;
	h_dropdown_opened = this.tabs.reduce((h, cur_node) => {
		let h_cur_node = cur_node.getBoundingClientRect().height;
		return h + h_cur_node;
	}, h_dropdown_opened);

	this.tabs_wrap.style.height = h_dropdown_opened + "px";
};

//keys "Left" and "Right" changes Tabs.
ScrolledTabs.prototype.OnKeyDown = function(item, e) {
	let next_item;
	if (e.key == "ArrowLeft") {
		next_item = this.dir === "rtl" ? item.nextElementSibling : item.previousElementSibling;
		if (!next_item) {
			next_item = this.dir === "rtl" ? this.tabs[0] : this.tabs[this.tabs.length - 1];
		}
	} else if (e.key === "ArrowRight") {
		next_item = this.dir === "rtl" ? item.previousElementSibling : item.nextElementSibling;
		if (!next_item) {
			next_item = this.dir === "rtl" ? this.tabs[this.tabs.length - 1] : this.tabs[0];
		}
	} else if (e.key === "Home") {
		e.preventDefault();
		next_item = this.tabs[0];
	} else if (e.key === "End") {
		e.preventDefault();
		next_item = this.tabs[this.tabs.length - 1];
	}

	if (next_item) {
		next_item.click();
		next_item.focus();
	}
};

ScrolledTabs.prototype.TabClick = function(item, e) {
	e.stopPropagation();
	if (window.innerWidth > this.mobile_res) {
		this.TabClickDesctop(item, e);
	} else {
		this.TabClickMobile(item, e);
	}
};

ScrolledTabs.prototype.TabClickMobile = function(item, e) {
	let new_switcher_face_txt = item.textContent;
	this.switcher_face.textContent = new_switcher_face_txt;

	let new_h_switcher = item.getBoundingClientRect().height;
	this.tabs_wrap.style.height = new_h_switcher + "px";

	this.TabClickDesctop(item, e);

	let transition_duration = 400;
	setTimeout(() => this.outer_container.classList.remove("opened"), transition_duration);

	this.outer_container.classList.remove("rotate-switcher-tick");
};

ScrolledTabs.prototype.TabClickDesctop = function(item, e) {
	if (this.outer_container.classList.contains("show-nav-btns")) {
		this.MakeActiveItemVisible(item);
	}
	if (item.classList.contains("active")) {
		return;
	}
	let rest_items = this.tabs.filter((_item) => {
		return !item.isEqualNode(_item);
	});

	rest_items.forEach((_item) => {
		_item.classList.remove("active");
		_item.setAttribute("aria-selected", "false");
		_item.setAttribute("tabindex", "-1");
	});

	item.classList.add("active");
	item.setAttribute("aria-selected", "true");
	item.setAttribute("tabindex", "0");

	// syncs text of the switcher face with curren value.
	this.switcher_face.innerText = item.querySelector(":scope .btn").innerText;

	const ind_item = this.tabs.indexOf(item);

	let old_item_arr = this.tabs_content.filter((_item) => _item.classList.contains("active"));
	if (old_item_arr.length > 0) {
		let old_item = old_item_arr.pop();
		old_item.classList.remove("visible");
		setTimeout(() => old_item.classList.remove("active"), 500);
	}

	let new_tab_content = this.tabs_content[ind_item];
	if (new_tab_content !== undefined) {
		new_tab_content.classList.add("active");

		let styles = window.getComputedStyle(new_tab_content);
		let h = styles.getPropertyValue("height");

		// resize events will redraw all cards
		// including hidden ones which the algoritm havn't drawn when they were hidden.
		window.dispatchEvent(new Event("resize"));
		new_tab_content.classList.add("visible");
	}
};

// if not the whole active tab button visible, than move nav bar so that it becomes completly visible
ScrolledTabs.prototype.MakeActiveItemVisible = function(item) {
	let item_rect = item.getBoundingClientRect();
	let prev_btn_rect = this.prev_btn.getBoundingClientRect();
	let next_btn_rect = this.next_btn.getBoundingClientRect();
	let speed = 200;
	if (this.dir === "rtl") {
		if (item_rect.left < next_btn_rect.left + next_btn_rect.width) {
			let delta = next_btn_rect.left + next_btn_rect.width - item_rect.left;
			this.ScrollTo(-1 * delta, speed);
			setTimeout(this.DisabeNavBtns.bind(this), speed);
		}
		if (item_rect.right > prev_btn_rect.left) {
			let delta = item_rect.right - prev_btn_rect.left;
			this.ScrollTo(delta, speed);
			setTimeout(this.DisabeNavBtns.bind(this), speed);
		}
	} else {
		if (item_rect.left < prev_btn_rect.right) {
			let delta = prev_btn_rect.right - item_rect.left;
			this.ScrollTo(-1 * delta, speed);
			setTimeout(this.DisabeNavBtns.bind(this), speed);
		}
		if (item_rect.right > next_btn_rect.left + next_btn_rect.width) {
			let delta = item_rect.right - next_btn_rect.left + next_btn_rect.width;
			this.ScrollTo(1 * delta, speed);
			setTimeout(this.DisabeNavBtns.bind(this), speed);
		}
	}
};

ScrolledTabs.prototype.ScrollTo = function(delta, duration) {
	let element = this.container;
	const start = this.container.scrollLeft;
	startDate = +new Date();

	const animateScroll = function() {
		const currentDate = +new Date();
		const currentTime = currentDate - startDate;
		element.scrollLeft = parseInt(easeInOutQuad(currentTime, start, delta, duration));
		if (currentTime < duration) {
			requestAnimationFrame(animateScroll);
		} else {
			element.scrollLeft = start + delta;
		}
	};
	animateScroll();
};

ScrolledTabs.prototype.DisabeNavBtns = function() {
	let max_scroll = this.container.scrollWidth - this.container.clientWidth;
	let cur_scroll = this.container.scrollLeft;
	let delta = 5;
	if (this.dir === "rtl") {
		if (cur_scroll >= -1 * delta) {
			this.prev_btn.classList.add("disabled");
			this.next_btn.classList.remove("disabled");
			this.prev_btn.setAttribute("disabled", "");
			this.next_btn.removeAttribute("disabled");
		} else if (-1 * cur_scroll >= max_scroll - delta) {
			this.next_btn.classList.add("disabled");
			this.prev_btn.classList.remove("disabled");

			this.next_btn.setAttribute("disabled", "");
			this.prev_btn.removeAttribute("disabled");
		} else {
			this.prev_btn.classList.remove("disabled");
			this.next_btn.classList.remove("disabled");

			this.prev_btn.removeAttribute("disabled");
			this.next_btn.removeAttribute("disabled");
		}
	} else {
		if (cur_scroll <= delta) {
			this.prev_btn.classList.add("disabled");
			this.next_btn.classList.remove("disabled");
		} else if (cur_scroll >= max_scroll - delta) {
			this.next_btn.classList.add("disabled");
			this.prev_btn.classList.remove("disabled");
		} else {
			this.prev_btn.classList.remove("disabled");
			this.next_btn.classList.remove("disabled");
		}
	}
};

ScrolledTabs.prototype.MoveBackTabs = function(e) {
	e.preventDefault();
	let speed = 400;
	let delta = this.dir === "rtl" ? -200 : 200;
	this.ScrollTo(delta, speed);
	setTimeout(this.DisabeNavBtns.bind(this), speed);
};

ScrolledTabs.prototype.MoveForwardTabs = function(e) {
	e.preventDefault();
	let speed = 400;
	let delta = this.dir === "rtl" ? 200 : -200;
	this.ScrollTo(delta, speed);
	setTimeout(this.DisabeNavBtns.bind(this), speed);
};

ScrolledTabs.prototype.Resize = function() {
	if (this.container.clientWidth < this.container.scrollWidth) {
		this.outer_container.classList.add("show-nav-btns");
		let btn_width = this.prev_btn.getBoundingClientRect().width;
		if (this.dir === "rtl") {
			this.tabs[0].style.paddingRight = btn_width + "px";
			this.tabs[this.tabs.length - 1].style.paddingLeft = btn_width + "px";
		} else {
			this.tabs[0].style.paddingLeft = btn_width + "px";
			this.tabs[this.tabs.length - 1].style.paddingRight = btn_width + "px";
		}
	} else {
		this.outer_container.classList.remove("show-nav-btns");
		if (this.dir === "rtl") {
			this.tabs[0].style.paddingRight = "0";
			this.tabs[this.tabs.length - 1].style.paddingLeft = "0";
		} else {
			this.tabs[0].style.paddingLeft = "0";
			this.tabs[this.tabs.length - 1].style.paddingRight = "0";
		}
	}
};


(function() {
	let tabs_wrap = document.querySelector(".scrolled-tabs-container:not(.demo) .srolled-tabs-wrap");
	if (!tabs_wrap) {
		return;
	}
	let obj = new ScrolledTabs(tabs_wrap, document.querySelector(".scrolled-tabs-section .tab-content-wrap:not(.demo)"));
	obj.Init();

	const card_canvases = __arrElements('.scrolled-tabs-section canvas');
	if (card_canvases.length > 0) {
		drawCardsWithDentAlt('.scrolled-tabs-section canvas');
		drawCardsWithDentAltHover('.scrolled-tabs-section .card-btn');
	}
})();
