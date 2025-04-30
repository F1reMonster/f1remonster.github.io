function __throttle(func, ms) {
	let isThrottled = false,
		savedArgs,
		savedThis;

	function wrapper() {
		if (isThrottled) {
			// (2)
			savedArgs = arguments;
			savedThis = this;
			return;
		}

		func.apply(this, arguments); // (1)

		isThrottled = true;

		setTimeout(function() {
			isThrottled = false; // (3)
			if (savedArgs) {
				wrapper.apply(savedThis, savedArgs);
				savedArgs = savedThis = null;
			}
		}, ms);
	}

	return wrapper;
}

/* SLIDE UP */
let MyslideUp = (target, duration = 500) => {
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + "ms";
	target.style.boxSizing = "border-box";
	target.style.height = target.offsetHeight + "px";
	target.offsetHeight;
	target.style.overflow = "hidden";
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = "none";
		target.style.removeProperty("height");
		target.style.removeProperty("padding-top");
		target.style.removeProperty("padding-bottom");
		target.style.removeProperty("margin-top");
		target.style.removeProperty("margin-bottom");
		target.style.removeProperty("overflow");
		target.style.removeProperty("transition-duration");
		target.style.removeProperty("transition-property");
		//alert("!");
	}, duration);
};

/* SLIDE DOWN */
let MyslideDown = (target, duration = 500) => {
	target.style.removeProperty("display");
	let display = window.getComputedStyle(target).display;
	if (display === "none") display = "block";
	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = "hidden";
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.boxSizing = "border-box";
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + "ms";
	target.style.height = height + "px";
	target.style.removeProperty("padding-top");
	target.style.removeProperty("padding-bottom");
	target.style.removeProperty("margin-top");
	target.style.removeProperty("margin-bottom");
	window.setTimeout(() => {
		target.style.removeProperty("height");
		target.style.removeProperty("overflow");
		target.style.removeProperty("transition-duration");
		target.style.removeProperty("transition-property");
	}, duration);
};

function MyAccordeon(container) {
	this.container = container;
	this.container.addEventListener("click", this.Toggle.bind(this));
}

MyAccordeon.prototype.Toggle = function(e) {
	let target = e.target;
	let header = target.closest(".accordeon-title");
	if (!header) {
		return;
	}

	let body = header.nextElementSibling;
	if (header.classList.contains("opened")) {
		MyslideUp(body);
		header.classList.remove("opened");
		header.firstElementChild.setAttribute("aria-expanded", "false");
	} else {
		let headers = Array.prototype.slice.call(this.container.querySelectorAll(":scope .accordeon-title"));
		let rest_headers = headers.filter((item) => {
			return !item.isEqualNode(header);
		});
		rest_headers.forEach((_header) => {
			if (_header.classList.contains("opened")) {
				let _body = _header.nextElementSibling;
				MyslideUp(_body);
				_header.classList.remove("opened");
				_header.firstElementChild.setAttribute("aria-expanded", "false");
			}
		});
		header.classList.add("opened");
		header.firstElementChild.setAttribute("aria-expanded", "true");
		MyslideDown(body);
	}
};
// helper function
function __arrElements(selector_or_node_arr) {
	if (typeof selector_or_node_arr == "string") {
		return Array.prototype.slice.call(document.querySelectorAll(selector_or_node_arr));
	} else {
		return Array.prototype.slice.call(selector_or_node_arr);
	}
}

// makes input to behave as angular material input
function CustomInput(container) {
	this.container = container;
	this.input = container.querySelector(":scope input");
	this.label = container.querySelector(":scope label");
}

CustomInput.prototype.Init = function() {
	this.input.addEventListener("focus", this.onFocus.bind(this));
	this.input.addEventListener("blur", this.onBlur.bind(this));
	this.label.addEventListener("click", this.onLabelClick.bind(this));
	if (this.input.value.trim()) {
		this.input.focus();
	}
};

CustomInput.prototype.onBlur = function() {
	if (this.container.classList.contains("pure")) {
		this.container.classList.remove("pure");
	}
	if (!this.input.value.trim()) {
		this.container.classList.remove("focus");
	}
};

CustomInput.prototype.onFocus = function() {
	this.container.classList.add("focus");
};

CustomInput.prototype.onLabelClick = function() {
	if (!this.container.classList.contains("focus")) {
		// this.container.classList.add( 'focus' );
		this.input.focus();
	}
};

function CustomInputAutocomplete(input_selector, options) {
	this.input_selector = input_selector;
	this.input = document.querySelector(input_selector);
	this.container = this.input.closest(".input-with-autocomplete");
	this.options = options;

	this.label = this.container.querySelector(":scope .label-autocomplete");
	this.label.addEventListener("click", () => this.container.classList.add("focus"));

	this.input.addEventListener("input", this.OnInput.bind(this));
	this.input.addEventListener("init", () => {
		if (this.input.value === "") {
			this.container.classList.add("empty-input");
		}
	});
}

CustomInputAutocomplete.prototype.OnInput = function() {
	if (this.input.value === "") {
		this.container.classList.add("empty-input");
	} else {
		this.container.classList.remove("empty-input");
	}
};

CustomInputAutocomplete.prototype.Init = function() {
	const _AutoComplete = new autoComplete({
		selector: this.input_selector,
		data: {
			src: this.options,
			cache: true,
		},
		resultsList: {
			maxResults: undefined,
		},
		resultItem: {
			highlight: true,
		},
		
		events: {
			input: {
				selection: (event) => {
					const selection = event.detail.selection.value;
					_AutoComplete.input.value = selection;
				},
			},
		},
	});
	this.AutoComplete = _AutoComplete;
};
function FontChangeSubscriber() {
	this.subscribers = [];
	this.curFont = null;
	this.proportion_coef = 1;
	this.standart_font_size = 16;
}

FontChangeSubscriber.instanse = null;

FontChangeSubscriber.getInstance = function() {
	if (!FontChangeSubscriber.instanse) {
		FontChangeSubscriber.instanse = new FontChangeSubscriber();
	}
	return FontChangeSubscriber.instanse;
};

FontChangeSubscriber.prototype.add = function(elem) {
	this.subscribers.push(elem);
};

FontChangeSubscriber.prototype.sendEvent = function() {
	const e = new CustomEvent("fontchange");
	this.subscribers.forEach(function(subscriber) {
		subscriber.dispatchEvent(e);
	});
};

// detects when default font size was changed
function fontSizeDetector() {
	let div = document.createElement("div");
	div.id = "font-size-detector";
	let style = "position: absolute; height: 1em; visibility: hidden";
	div.setAttribute("style", style);

	document.body.append(div);

	let font_change_subscriber = FontChangeSubscriber.getInstance();
	// let oldVal = parseInt(window.getComputedStyle(div).getPropertyValue('height'));
	let oldVal = font_change_subscriber.curFont;

	function getCurrenFont() {
		let newVal = parseInt(window.getComputedStyle(div).getPropertyValue("height"));
		if (newVal !== oldVal) {
			font_change_subscriber.curFont = newVal;
			font_change_subscriber.proportion_coef = newVal / font_change_subscriber.standart_font_size;
			font_change_subscriber.sendEvent();
			oldVal = newVal;
		}
	}
	getCurrenFont();
	setInterval(getCurrenFont, 500);
}

fontSizeDetector();

// draw custom border of contact form on canvas.
// function accepts canvas as argument, one of the canvases
// draw forground layer with border, and background canvas is used
// for producing shadow.
function drawContactFormCanvasLayer(canvas) {
	let proportion_coef = FontChangeSubscriber.getInstance().proportion_coef;
	let parent = canvas.parentElement;

	let rect = parent.getClientRects();
	let w = rect[0].width;
	let h = rect[0].height;
	let half_w = w / 2;

	let margin = 20 * proportion_coef;
	let r = 10 * proportion_coef;

	let btn = parent.querySelector(":scope .submit-contact-form");
	let rect_btn = btn.getClientRects();
	let w_half_btn = rect_btn[0].width / 2;
	let delta_btn_x = window.innerWidth > 767 ? 16 : 12;
	delta_btn_x = proportion_coef * delta_btn_x;
	let delta_btn_y = window.innerWidth > 767 ? 32 : 20;
	delta_btn_y = proportion_coef * delta_btn_y;
	let r_btn = window.innerWidth > 767 ? 31 : 20;
	r_btn = r_btn * proportion_coef;

	// there are possible cases when there are desktop and mobile icons.
	let icons = parent.querySelectorAll(":scope .cf-icon");
	icons = [].slice.call(icons);
	let w_half_icon;
	for (const icon of icons) {
		let rect_icon = icon.getClientRects();
		if (rect_icon.length > 0) {
			w_half_icon = rect_icon[0].width / 2;
		}
	}
	let delta_icon = window.innerWidth > 767 ? 20 : 10;
	delta_icon = delta_icon * proportion_coef;

	canvas.setAttribute("width", w);
	canvas.setAttribute("height", h);

	let ctx = canvas.getContext("2d");

	let is_background_image = canvas.id === "cf-shadow-canvas";
	ctx.lineWidth = 0;
	if (is_background_image) {
		ctx.fillStyle = "rgba(60,63,69,0.2)";
		ctx.strokeStyle = "rgba(60,63,69,0.2)";
	} else {
		ctx.fillStyle = "#fff";
		ctx.strokeStyle = "rgba(105,36,232,0.6)";
	}
	ctx.clearRect(0, 0, w, h);

	//draw top part of the border
	ctx.beginPath();
	ctx.moveTo(half_w, margin + w_half_icon + delta_icon);

	// left half o the circle near the form icon.
	ctx.arc(half_w, margin, w_half_icon + delta_icon, 0.5 * Math.PI, Math.PI, false);

	// top left corner
	ctx.arcTo(margin, margin, margin, h - margin, r);

	// bottom left corner
	ctx.arcTo(margin, h - margin, half_w - w_half_btn - delta_btn_x, h - margin, r);
	ctx.lineTo(half_w - w_half_btn - delta_btn_x, h - margin);

	ctx.arcTo(half_w - w_half_btn - delta_btn_x, h - margin - delta_btn_y, half_w, h - margin - delta_btn_y, r_btn);
	ctx.lineTo(half_w, h - margin - delta_btn_y);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	// draw right half part
	ctx.beginPath();
	ctx.moveTo(half_w + 1, margin + w_half_icon + delta_icon);
	ctx.arc(half_w + 1, margin, delta_icon + w_half_icon, 0.5 * Math.PI, 0, true);

	// top right corner
	ctx.arcTo(w - margin, margin, w - margin, h - margin, r);

	// bottom right corner
	ctx.arcTo(w - margin, h - margin, half_w + w_half_btn + delta_btn_x, h - margin, r);
	ctx.lineTo(half_w + w_half_btn + delta_btn_x, h - margin);

	//draw half arc above submit button.
	ctx.arcTo(half_w + w_half_btn + delta_btn_x, h - margin - delta_btn_y, half_w, h - margin - delta_btn_y, r_btn);
	ctx.lineTo(half_w, h - margin - delta_btn_y);
	ctx.closePath();

	ctx.fill();
	ctx.stroke();

	if (!is_background_image) {
		ctx.beginPath();
		// ctx.moveTo( half_w - 11, w_half_icon + delta_icon + 1 );
		ctx.fillStyle = "#fff";
		ctx.fillRect(half_w - 11 * proportion_coef, margin + w_half_icon + delta_icon + 1, 22 * proportion_coef, h - 2 * margin - w_half_icon - delta_icon - delta_btn_y - 2);
	}
}

// draw contact form custom border.
function drawContactFormBackground(section_id) {
	const cf_section = document.getElementById(section_id);
	let contact_form_canvases = __arrElements(cf_section.querySelectorAll("canvas"));
	if (contact_form_canvases.length === 0) {
		return;
	}

	function drawBG() {
		for (const canvas of contact_form_canvases) {
			drawContactFormCanvasLayer(canvas);
		}
	}

	drawBG();

	const collapse_btn = cf_section.querySelector(":scope .cf-icon.mobile");
	const form = cf_section.querySelector(":scope .contact-form");
	const form_content = cf_section.querySelector(":scope .form-inner");
	const submit_btn = cf_section.querySelector(":scope .submit-contact-form");

	// param. canvasses is a list of canvases ( background and foregroun ),
	// and w_half_icon - width of the top icon.
	// Function draws contact form in collapsed state and used in animation
	// function which animates process of collapsing.
	function drawCollappsedForm(canvases, w_half_icon) {
		for (const canvas of canvases) {
			let proportion_coef = FontChangeSubscriber.getInstance().proportion_coef;
			let parent = canvas.closest(".contact-form");

			let rect = parent.getClientRects();
			let w = rect[0].width;
			let h = rect[0].height;
			let half_w = w / 2;

			let margin = 20 * proportion_coef;
			let r = 10 * proportion_coef;

			let delta_icon = 10;
			delta_icon = delta_icon * proportion_coef;

			canvas.setAttribute("width", w);
			canvas.setAttribute("height", h);

			let ctx = canvas.getContext("2d");

			let is_background_image = canvas.id === "cf-shadow-canvas";
			ctx.lineWidth = 1;
			if (is_background_image) {
				ctx.fillStyle = "rgba(60,63,69,0.2)";
				ctx.strokeStyle = "rgba(60,63,69,0.2)";
			} else {
				ctx.fillStyle = "#fff";
				ctx.strokeStyle = "rgba(105,36,232,0.6)";
			}
			ctx.clearRect(0, 0, w, h);

			//draw top part of the border
			ctx.beginPath();

			// left half o the circle near the form icon.
			ctx.arc(half_w, margin, w_half_icon + delta_icon, 0, Math.PI, false);

			//top left corner
			ctx.arcTo(margin, margin, margin, h - margin, r);

			// botton left corner
			ctx.arcTo(margin, h - margin, w - margin, h - margin, r);

			// bottom right corner
			ctx.arcTo(w - margin, h - margin, w - margin, margin, r);

			// top right corner
			ctx.arcTo(w - margin, margin, margin, margin, r);

			ctx.closePath();
			ctx.fill();
			ctx.stroke();
		}
	}

	function animateCollapse(w_half_icon) {
		drawCollappsedForm(contact_form_canvases, w_half_icon);
		if (form.classList.contains("collapsing")) {
			window.requestAnimationFrame(function() {
				animateCollapse(w_half_icon);
			});
		}
	}

	form_content.addEventListener("transitionend", function() {
		if (form.classList.contains("collapsing")) {
			form.classList.remove("collapsing");
		}
		if (!form.classList.contains("collapsed")) {
			submit_btn.classList.remove("hide-submit-btn");
			setTimeout(drawBG, 70);
		}
	});

	collapse_btn.addEventListener("click", function() {
		let rect_icon = collapse_btn.getClientRects();
		let w_half_icon = rect_icon[0].width / 2;
		if (!form.classList.contains("collapsed")) {
			form_content.style.height = form_content.clientHeight + "px";
			form.classList.add("collapsing");
			setTimeout(() => (form_content.style.height = 0), 70);

			animateCollapse(w_half_icon);
			submit_btn.classList.add("hide-submit-btn");
		} else {
			let h = form_content.scrollHeight;
			form.classList.add("collapsing");
			setTimeout(() => (form_content.style.height = h + "px"), 70);
			animateCollapse(w_half_icon);
		}

		form.classList.toggle("collapsed");
	});

	window.addEventListener(
		"resize",
		__throttle(function() {
			if (window.innerWidth > 768) {
				drawBG();
			} else {
				if (form.classList.contains("collapsed")) {
					let rect_icon = collapse_btn.getClientRects();
					let w_half_icon = rect_icon[0].width / 2;
					drawCollappsedForm(contact_form_canvases, w_half_icon);
				} else {
					drawBG();
				}
			}
		}, 80)
	);
}


if (document.getElementById("wanted-more-cf")) {
	drawContactFormBackground("wanted-more-cf");
}

if (document.getElementById("contact-form-section")) {
	drawContactFormBackground("contact-form-section");
}

// if the el had font size 16px, than function calculates proportional change its font size.
function getFontSizeProportionCoeficient(el, $default_font_size) {
	let compStyles = window.getComputedStyle(el);
	let cur_font_size = parseInt(compStyles.getPropertyValue("font-size"));
	let proportion_coef = cur_font_size / 16;
	return proportion_coef;
}

function drawCardWithDent(params) {
	let { canvas, is_background_image, strokeStyle, fillStyle, lineWidth, r_dent, h_dent, w_dent } = params;

	let proportion_coef = getFontSizeProportionCoeficient(canvas, 16);

	let parent = canvas.parentElement;
	let btn = parent.querySelector(":scope .card-btn");
	let rect_btn = btn.getClientRects();
	let w_half_btn = rect_btn[0].width / 2;

	let rect = parent.getClientRects();
	let w = rect[0].width;
	let h = rect[0].height;
	let half_w = w / 2;

	canvas.setAttribute("width", w);
	canvas.setAttribute("height", h);

	let ctx = canvas.getContext("2d");

	ctx.strokeStyle = strokeStyle;
	ctx.lineWidth = lineWidth;
	ctx.fillStyle = fillStyle;

	ctx.clearRect(0, 0, w, h);

	let r = 12 * proportion_coef;
	let margin = 20 * proportion_coef;
	let delta = 10 * proportion_coef;
	ctx.beginPath();
	//
	// upper left corner
	ctx.moveTo(half_w, margin);

	//upper right corner
	ctx.arcTo(w - margin, margin, w - margin, margin + delta, r);

	r_dent = r_dent * proportion_coef;
	h_dent = h_dent * proportion_coef;

	//bottom right corner
	// ctx.lineTo(w - margin, h - margin - delta);
	ctx.arcTo(w - margin, h - margin, half_w + w_half_btn + w_dent, h - margin, r);

	ctx.lineTo(half_w + w_half_btn + w_dent, h - margin);

	// right part of dent
	ctx.arcTo(half_w + w_half_btn + w_dent, h - margin - h_dent, half_w, h - margin - h_dent, r_dent);
	ctx.lineTo(half_w - 1, h - margin - h_dent);

	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(half_w, margin);

	//top left corner
	ctx.arcTo(margin, margin, margin, h - margin - delta, r);
	// ctx.lineTo(margin, h - margin - delta);

	//bottom left corner
	ctx.arcTo(margin, h - margin, half_w - w_half_btn - w_dent, h - margin, r);
	ctx.lineTo(half_w - w_half_btn - w_dent, h - margin);

	//left part of dent
	ctx.arcTo(half_w - w_half_btn - w_dent, h - margin - h_dent, half_w, h - margin - h_dent, r_dent);
	ctx.lineTo(half_w, h - margin - h_dent);
	ctx.lineTo(half_w, margin);

	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	// get rid of the line in the middle of the card.
	if (!is_background_image) {
		ctx.beginPath();
		ctx.fillStyle = "#fff";
		ctx.fillRect(half_w - 4, margin + 1, 8, h - 2 * margin - h_dent - 2);
	}
}

//draws card with "lesser dent"
function drawCardWithDentAlt(params) {
	let { canvas, is_background_image, strokeStyle, fillStyle, lineWidth } = params;

	let proportion_coef = getFontSizeProportionCoeficient(canvas, 16);

	let parent = canvas.parentElement;
	let btn = parent.querySelector(":scope .card-btn");
	let rect_btn = btn.getClientRects();

	// if element is hidden then rect_btn does not have any data so skip drawing.
	if (rect_btn.length === 0) {
		return;
	}

	let w_half_btn = rect_btn[0].width / 2;

	let rect = parent.getClientRects();
	let w = rect[0].width;
	let h = rect[0].height;
	let half_w = w / 2;

	canvas.setAttribute("width", w);
	canvas.setAttribute("height", h);

	// let ct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x = canvas.getContext('2d');
	let ctx = canvas.getContext("2d");

	ctx.strokeStyle = strokeStyle;
	ctx.lineWidth = lineWidth;
	ctx.fillStyle = fillStyle;

	ctx.clearRect(0, 0, w, h);

	let r = 12 * proportion_coef;
	let margin = 20 * proportion_coef;
	let delta = 10 * proportion_coef;
	ctx.beginPath();
	//
	// upper left corner
	ctx.moveTo(half_w, margin);

	//upper right corner
	ctx.arcTo(w - margin, margin, w - margin, margin + delta, r);

	let r_dent = 30 * proportion_coef;
	let h_dent = 32 * proportion_coef;
	let h_half_dent = h_dent / 2;
	let w_dent_delta = 5 * proportion_coef;

	//bottom right corner
	// ctx.lineTo(w - margin, h - margin - delta);
	ctx.arcTo(w - margin, h - margin, half_w + w_half_btn + h_half_dent, h - margin, r);

	ctx.lineTo(half_w + w_half_btn + h_half_dent - w_dent_delta, h - margin);

	// right part of dent
	ctx.arcTo(half_w + w_half_btn + h_half_dent - w_dent_delta, h - margin - h_dent, half_w, h - margin - h_dent, r_dent);
	ctx.lineTo(half_w - 1, h - margin - h_dent);

	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(half_w, margin);

	//top left corner
	ctx.arcTo(margin, margin, margin, h - margin - delta, r);
	// ctx.lineTo(margin, h - margin - delta);

	//bottom left corner
	ctx.arcTo(margin, h - margin, half_w - w_half_btn - h_half_dent, h - margin, r);
	ctx.lineTo(half_w - w_half_btn - h_half_dent + w_dent_delta, h - margin);

	//left part of dent
	ctx.arcTo(half_w - w_half_btn - h_half_dent + w_dent_delta, h - margin - h_dent, half_w, h - margin - h_dent, r_dent);
	ctx.lineTo(half_w, h - margin - h_dent);
	ctx.lineTo(half_w, margin);

	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	// get rid of the line in the middle of the card.
	if (!is_background_image) {
		ctx.beginPath();
		ctx.fillStyle = "#fff";
		ctx.fillRect(half_w - 4, margin + 1, 8, h - 2 * margin - h_dent - 2);
	}
}

// draws other type of card with lesser "dent"
function drawCardsWithDentAlt(selector) {
	let card_canvases = __arrElements(selector);

	// draw border and shadow for custrom card with dent
	function _drawCardsWithDentAlt() {
		let proportion_coef = FontChangeSubscriber.getInstance().proportion_coef;
		card_canvases.forEach(function(canvas) {
			let is_background_image = canvas.classList.contains("back-img");
			let strokeStyle = "rgba(60,63,69,0.2)";
			let fillStyle;
			if (is_background_image) {
				fillStyle = "rgba(60,63,69,0.2)";
			} else {
				fillStyle = "#fff";
			}

			let lineWidth = 1;
			let params = { canvas, is_background_image, strokeStyle, fillStyle, lineWidth };
			drawCardWithDentAlt(params);
		});
	}
	if (card_canvases.length > 0) {
		_drawCardsWithDentAlt();
		let first_item = card_canvases[0];
		first_item = first_item.parentElement;
		let font_change_subscriber = FontChangeSubscriber.getInstance();
		font_change_subscriber.add(first_item);

		first_item.addEventListener("fontchange", _drawCardsWithDentAlt);

		window.addEventListener("resize", __throttle(_drawCardsWithDentAlt), 80);
	}
};


// hover on the card with lesser dent
function drawCardsWithDentAltHover(selector) {
	const card_with_dents_btns = __arrElements(selector);

	card_with_dents_btns.forEach(function(btn) {
		btn.addEventListener("mouseenter", function() {
			let par = btn.closest("article");
			let canvas = par.querySelector(":scope .card-canvas");
			let is_background_image = false;
			let strokeStyle = "#00A661";
			let fillStyle = "#fff";
			let lineWidth = 2;
			let params = { canvas, is_background_image, strokeStyle, fillStyle, lineWidth };
			drawCardWithDentAlt(params);
		});
		btn.addEventListener("mouseleave", function() {
			let par = btn.closest("article");
			let params = {
				canvas: par.querySelector(":scope .card-canvas"),
				is_background_image: false,
				strokeStyle: "rgba(60,63,69,0.2)",
				fillStyle: "#fff",
				lineWidth: 1,
			};
			drawCardWithDentAlt(params);
		});
	});
}

//used for drawing shapes that contain icon at the top and button at the bottom
function drawIconButtonShape(canvas_selector, button_selector, icon_selector) {
	let canvases = __arrElements(canvas_selector);
	if (canvases.length === 0) {
		return;
	}

	function drawShape(canvas) {
		let proportion_coef = FontChangeSubscriber.getInstance().proportion_coef;
		let parent = canvas.parentElement;

		let rect = parent.getClientRects();
		let w = rect[0].width;
		let h = rect[0].height;
		let half_w = w / 2;

		let margin = 20 * proportion_coef;
		let r = 10 * proportion_coef;

		let btn = parent.querySelector(button_selector);
		let rect_btn = btn.getClientRects();
		let w_half_btn = rect_btn[0].width / 2;
		let delta_btn_x = window.innerWidth > 767 ? 16 : 12;
		delta_btn_x = proportion_coef * delta_btn_x;
		let delta_btn_y = window.innerWidth > 767 ? 32 : 20;
		delta_btn_y = proportion_coef * delta_btn_y;
		let r_btn = window.innerWidth > 767 ? 31 : 20;
		r_btn = r_btn * proportion_coef;

		// there are possible cases when there are desktop and mobile icons.
		let icons = parent.querySelectorAll(icon_selector);
		let w_half_icon;
		icons = [].slice.call(icons);
		for (const icon of icons) {
			let rect_icon = icon.getClientRects();
			if (rect_icon.length > 0) {
				w_half_icon = rect_icon[0].width / 2;
			}
		}
		let delta_icon = window.innerWidth > 767 ? 20 : 10;
		delta_icon = delta_icon * proportion_coef;

		canvas.setAttribute("width", w);
		canvas.setAttribute("height", h);

		let ctx = canvas.getContext("2d");

		let is_background_image = canvas.classList.contains("shadow-canvas");
		ctx.lineWidth = 0;
		if (is_background_image) {
			ctx.fillStyle = "rgba(60,63,69,0.2)";
			ctx.strokeStyle = "rgba(60,63,69,0.2)";
		} else {
			ctx.fillStyle = "#fff";
			ctx.strokeStyle = "rgba(105,36,232,0.6)";
		}
		ctx.clearRect(0, 0, w, h);

		//draw top part of the border
		ctx.beginPath();
		ctx.moveTo(half_w, margin + w_half_icon + delta_icon);

		// left half o the circle near the form icon.
		ctx.arc(half_w, margin, w_half_icon + delta_icon, 0.5 * Math.PI, Math.PI, false);

		// top left corner
		ctx.arcTo(margin, margin, margin, h - margin, r);

		// bottom left corner
		ctx.arcTo(margin, h - margin, half_w - w_half_btn - delta_btn_x, h - margin, r);
		ctx.lineTo(half_w - w_half_btn - delta_btn_x, h - margin);

		ctx.arcTo(half_w - w_half_btn - delta_btn_x, h - margin - delta_btn_y, half_w, h - margin - delta_btn_y, r_btn);
		ctx.lineTo(half_w, h - margin - delta_btn_y);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		// draw right half part
		ctx.beginPath();
		ctx.moveTo(half_w + 1, margin + w_half_icon + delta_icon);
		ctx.arc(half_w + 1, margin, delta_icon + w_half_icon, 0.5 * Math.PI, 0, true);

		// top right corner
		ctx.arcTo(w - margin, margin, w - margin, h - margin, r);

		// bottom right corner
		ctx.arcTo(w - margin, h - margin, half_w + w_half_btn + delta_btn_x, h - margin, r);
		ctx.lineTo(half_w + w_half_btn + delta_btn_x, h - margin);

		//draw half arc above submit button.
		ctx.arcTo(half_w + w_half_btn + delta_btn_x, h - margin - delta_btn_y, half_w, h - margin - delta_btn_y, r_btn);
		ctx.lineTo(half_w, h - margin - delta_btn_y);
		ctx.closePath();

		ctx.fill();
		ctx.stroke();

		if (!is_background_image) {
			ctx.beginPath();
			// ctx.moveTo( half_w - 11, w_half_icon + delta_icon + 1 );
			ctx.fillStyle = "#fff";
			ctx.fillRect(half_w - 11 * proportion_coef, margin + w_half_icon + delta_icon + 1, 22 * proportion_coef, h - 2 * margin - w_half_icon - delta_icon - delta_btn_y - 2);
		}
	}

	function drawBG() {
		for (const canvas of canvases) {
			drawShape(canvas);
		}
	}

	drawBG();

	window.addEventListener("resize", __throttle(drawBG, 80));
}

