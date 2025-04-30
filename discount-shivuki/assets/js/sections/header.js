(function() {
	//------------------------------------------------
	//Header on scroll behaviour
	//------------------------------------------------
	window.addEventListener('scroll', function(e) {
		if (window.scrollY > 70) {
			document.body.classList.add('is-scrolled');
		} else {
			document.body.classList.remove('is-scrolled');
		}
	});

	//------------------------------------------------
	//SEARCH
	//------------------------------------------------
	const searchInput = document.querySelector('.js-search-input');
	if (searchInput) {
		searchInput.querySelector('input').addEventListener('focus', function() {
			let hamburger_btn = document.getElementById('custom-hamburger');
			if (hamburger_btn.classList.contains('opened')) {
				hamburger_btn.click();
			}
			document.querySelector('.site-header').classList.add('is-search-opened');
			searchInput.classList.add('is-focused');
			searchInput.querySelector('input').focus();
			document.querySelector('#search-tags').classList.add('is-opened');
			document.querySelector('#search-tags').setAttribute('aria-hidden', false);
			document.body.style.overflow = 'hidden';
		});
	}

	if (document.querySelector('.close-search-form')) {
		const close_form_btn = document.querySelector('.close-search-form');
		close_form_btn.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			document.querySelector('.site-header').classList.remove('is-search-opened');
			searchInput.classList.remove('is-focused');
			document.querySelector('#search-tags').classList.remove('is-opened');
			document.querySelector('#search-tags').setAttribute('aria-hidden', true);
			document.querySelector('#search-hints').classList.remove('is-opened');
			document.querySelector('#search-hints').setAttribute('aria-hidden', true);
			document.body.style.overflow = 'visible';
		});

		close_form_btn.addEventListener('blur', function() {
			const modals = [...document.querySelectorAll('#search-tags, #search-hints')];
			setTimeout(function() {
				modals.forEach(modal => {
					const style = window.getComputedStyle(modal);
					if (style.getPropertyValue('display') != 'none') {
						document.getElementById('autoComplete').focus();
					}
				});
			}, 80);
		});
	}

	if (document.querySelectorAll('.js-search-input').length > 0) {
		const search_terms = JSON.parse(document.querySelectorAll('.js-search-input')[0].dataset.articleTitles);
		if (document.querySelector('.tablet-search-trigger')) {
			document.querySelector('.tablet-search-trigger').addEventListener('click', function() {
				searchInput.style.display = 'flex';
				searchInput.querySelector('input').focus();
				searchInput.removeAttribute('style');
			});
		}
	}

	//Match the entered value
	function autocompleteMatch(input) {
		if (input == '') {
			return [];
		}
		var reg = new RegExp(input)
		return search_terms.filter(function(term) {
			if (term.match(reg)) {
				return term;
			}
		});
	}

	//Load results to html
	function showResults(val) {
		const res = document.querySelector(".js-search-hints");
		res.innerHTML = '';
		let list = '';
		let terms = autocompleteMatch(val);
		document.querySelectorAll('.js-search-count').forEach(function(el) {
			el.innerHTML = terms.length;
		});
		for (i = 0; i < terms.length; i++) {
			list += '<li><a href="search-results.html">' + terms[i] + '</a></li>';
		}
		res.innerHTML = list;
	}

	//Load results to html
	function showResults_mobile(val) {
		const res = document.querySelector(".js-search-hints_mobile");
		res.innerHTML = '';
		let list = '';
		let terms = autocompleteMatch(val);
		document.querySelectorAll('.js-search-count_mobile').forEach(function(el) {
			el.innerHTML = terms.length;
		});
		for (i = 0; i < terms.length; i++) {
			list += '<li><a href="search-results.html">' + terms[i] + '</a></li>';
		}
		res.innerHTML = list;
	}

	//setup before functions
	let typingTimer;
	let doneTypingInterval = 200;

	//on keyup, start the countdown
	if (document.querySelector('#autoComplete')) {
		document.querySelector('#autoComplete').addEventListener('keyup', () => {
			clearTimeout(typingTimer);
			if (document.querySelector('#autoComplete').value.length > 1) {
				typingTimer = setTimeout(doneTyping, doneTypingInterval);
			}
		});
	}

	if (document.querySelector('#autoComplete-mobile')) {
		document.querySelector('#autoComplete-mobile').addEventListener('keyup', () => {
			clearTimeout(typingTimer);
			if (document.querySelector('#autoComplete-mobile').value.length > 1) {
				typingTimer = setTimeout(doneTyping_mobile, doneTypingInterval);
			}
		});
	}

	//user is "finished typing," do something
	function doneTyping() {
		document.querySelector('#search-tags').classList.remove('is-opened');
		document.querySelector('#search-hints').classList.add('is-opened');
		document.querySelector('#search-tags').setAttribute('aria-hidden', true);
		document.querySelector('#search-hints').setAttribute('aria-hidden', false);
		showResults(document.querySelector('#autoComplete').value);
	}

	//user is "finished typing," do something
	function doneTyping_mobile() {
		document.querySelector('#search-tags-mobile').classList.remove('is-opened');
		document.querySelector('#search-hints-mobile').classList.add('is-opened');
		document.querySelector('#search-tags-mobile').setAttribute('aria-hidden', true);
		document.querySelector('#search-hints-mobile').setAttribute('aria-hidden', false);
		showResults_mobile(document.querySelector('#autoComplete-mobile').value);
	}

	//------------------------------------------------
	//Mobile search
	//------------------------------------------------

	if (document.querySelector('.mobile-search-open') && document.querySelector('.close-mobile-search')) {
		document.querySelector('.mobile-search-open').addEventListener('click', function(e) {
			document.querySelector('.mobile-search').style.display = 'block';
			document.querySelector('#search-tags-mobile').classList.add('is-opened');
			document.querySelector('#search-tags-mobile').setAttribute('aria-hidden', false);
			document.body.style.overflow = 'hidden';
		})

		document.querySelector('.close-mobile-search').addEventListener('click', function(e) {
			document.querySelector('.mobile-search').style.display = 'none';
			document.querySelector('#search-hints-mobile').classList.remove('is-opened');
			document.querySelector('#search-hints-mobile').setAttribute('aria-hidden', true);
			document.querySelector('#search-tags-mobile').classList.remove('is-opened');
			document.querySelector('#search-tags-mobile').setAttribute('aria-hidden', true);
			document.body.style.overflow = 'auto';
		})
	}

	// switcher functionality.
	function MySwitcher(container_selector, data_attribute_selected, func) {
		let switcher = document.getElementById(container_selector);
		let button = switcher.querySelector(":scope .label");
		let ul = switcher.querySelector(":scope ul");

		//remove focus border from item
		function removeFocus() {
			let focused_item = ul.querySelector(":scope li.currently-focused");
			if (focused_item) {
				focused_item.classList.remove("currently-focused");
			}
		}

		function shutUpSwitcher() {
			MyslideUp(ul, 30);
			switcher.classList.remove("opened");
			removeFocus();
			button.setAttribute("aria-activedescendant", "");
		}

		function openSwitcher() {
			MyslideDown(ul, 30);
			let prev_selected_li = ul.querySelector(":scope li.selected");
			if (prev_selected_li) {
				prev_selected_li.classList.add("currently-focused");
			}
			switcher.classList.add("opened");
		}

		// open&close language menu
		if (button) {
			button.addEventListener("click", function(e) {
				e.stopPropagation();
				if (switcher.classList.contains("opened")) {
					MyslideUp(ul, 30);
					removeFocus();
					button.setAttribute("aria-activedescendant", "");
				} else {
					let cur_selected = ul.querySelector(":scope li.selected");
					cur_selected.classList.add("currently-focused");
					button.setAttribute("aria-activedescendant", cur_selected.id);
					MyslideDown(ul, 30);
				}
				switcher.classList.toggle("opened");
			});

			// click on a menu item will chose the language.
			let items = __arrElements(ul.querySelectorAll(":scope span"));
			items.forEach(function(item) {
				item.addEventListener("click", function(e) {
					e.stopPropagation();
					if (item.parentElement.classList.contains("selected")) {
						shutUpSwitcher();
						return;
					}
					let name = item.innerText;
					button.querySelector(":scope .cur-name").innerText = name;

					shutUpSwitcher();

					let prev_selected_li = ul.querySelector(":scope li.selected");
					if (prev_selected_li) {
						prev_selected_li.classList.remove("selected");
						item.parentElement.classList.add("selected");
					}

					/********************** Use the language code to your needs ********************************/
					let code = item.dataset[data_attribute_selected];
					if (func != undefined) {
						func(code);
					}
					/********************** Use the language code to your needs ********************************/
				});
			});

			button.addEventListener("keydown", function(e) {
				let key = e.key;
				if (key === "ArrowDown") {
					e.preventDefault();
					if (!switcher.classList.contains("opened")) {
						openSwitcher();
						return;
					}
					let currently_focused = ul.querySelector(".currently-focused");
					if (currently_focused.nextElementSibling) {
						currently_focused.classList.remove("currently-focused");
						currently_focused.nextElementSibling.classList.add("currently-focused");
						button.setAttribute("aria-activedescendant", currently_focused.nextElementSibling.id);
					}
				} else if (key === "ArrowUp") {
					let currently_focused = ul.querySelector(".currently-focused");
					if (currently_focused.previousElementSibling) {
						currently_focused.classList.remove("currently-focused");
						currently_focused.previousElementSibling.classList.add("currently-focused");
						button.setAttribute("aria-activedescendant", currently_focused.prevElementSibling.id);
					}
				} else if (key === "Enter") {
					e.preventDefault();
					if (!switcher.classList.contains("opened")) {
						openSwitcher();
						return;
					}
					if (switcher.classList.contains("opened")) {
						let currently_focused = ul.querySelector(".currently-focused");
						currently_focused.firstElementChild.click();
					}
				} else if (key === "Tab") {
					if (switcher.classList.contains("opened")) {
						shutUpSwitcher();
					}
				}
			});

			document.body.addEventListener("click", function(e) {
				const target = e.target;
				if (!target.closest("#" + container_selector)) {
					if (switcher.classList.contains("opened")) {
						shutUpSwitcher();
					}
				}
			});
		}
	}

	if (document.getElementById("lang-switcher")) {
		MySwitcher("lang-switcher", "lang_code");
	}
	if (document.getElementById("client-switcher")) {
		MySwitcher("client-switcher", "client_type");
	}

	if (document.getElementById('filter-hidden-checkboxes')) {
		MySwitcher('filter-hidden-checkboxes', 'client_type');
	}
})();


// open & close top menu
(function() {
	let hamburger = document.getElementById("custom-hamburger");
	if (!hamburger) {
		return;
	}

	let header_menu = document.getElementById("header-menu");
	let header_menu_links = header_menu.querySelectorAll("a");

	// focus from last link in the top menu returns to hamburger
	let last_header_menu_link = header_menu_links.item(header_menu_links.length - 1);
	last_header_menu_link.addEventListener("blur", function() {
		hamburger.focus();
	});

	hamburger.addEventListener("blur", function(e) {
		if (hamburger.classList.contains("opened")) {
			e.preventDefault();
			let first_link_in_the_menu = header_menu.querySelector("a");
			first_link_in_the_menu.focus();
		}
	});

	let btn_txt = hamburger.querySelector(":scope .btn-txt");
	let mobile_hamburger = document.getElementById("custom-hamburger-mobile");
	hamburger.addEventListener("click", function() {
		if (hamburger.classList.contains("opened")) {
			hamburger.classList.remove("opened");
			hamburger.setAttribute("aria-expanded", "false");
			btn_txt.innerText = btn_txt.dataset.closed_state;
			document.body.classList.remove("overflow-hidden");
			MyslideUp(header_menu);

			// keep two hamburgers in sync.
			if (mobile_hamburger.classList.contains("opened")) {
				mobile_hamburger.click();
			}
		} else {
			hamburger.classList.add("opened");
			hamburger.setAttribute("aria-expanded", "true");
			btn_txt.innerText = btn_txt.dataset.opened_state;
			document.body.classList.add("overflow-hidden");
			MyslideDown(header_menu);

			let first_link_in_the_menu = header_menu.querySelector("a");
			first_link_in_the_menu.focus();

			// keep two hamburgers in sync.
			if (!mobile_hamburger.classList.contains("opened")) {
				mobile_hamburger.click();
			}
		}
	});

	let header_menu_bg = document.getElementById("header-menu-bg");
	header_menu_bg.addEventListener("click", function() {
		hamburger.click();
	});
})();

// open & close top menu
(function() {
	let hamburger = document.getElementById("custom-hamburger-mobile");
	if (!hamburger) {
		return;
	}

	let header_menu = document.getElementById("header-menu-mobile");
	const header_menu_links = header_menu.querySelectorAll(":scope a");

	const last_header_menu_link = header_menu_links.item(header_menu_links.length - 1);
	last_header_menu_link.addEventListener("blur", function(e) {
		e.preventDefault();
		hamburger.focus();
	});

	hamburger.addEventListener("blur", function(e) {
		if (hamburger.classList.contains("opened")) {
			e.preventDefault();
			header_menu_links.item(0).focus();
		}
	});

	let desktop_hamburger = document.getElementById("custom-hamburger");
	hamburger.addEventListener("click", function() {
		if (hamburger.classList.contains("opened")) {
			hamburger.classList.remove("opened");
			hamburger.setAttribute("aria-expanded", "false");
			document.body.classList.remove("overflow-hidden");
			MyslideUp(header_menu);

			// keep two hamburgers in sync.
			if (desktop_hamburger.classList.contains("opened")) {
				desktop_hamburger.click();
			}
		} else {
			hamburger.classList.add("opened");
			hamburger.setAttribute("aria-expanded", "true");
			document.body.classList.add("overflow-hidden");
			MyslideDown(header_menu);
			header_menu_links.item(0).focus();

			// keep two hamburgers in sync.
			if (!desktop_hamburger.classList.contains("opened")) {
				desktop_hamburger.click();
			}
		}
	});
})();

// collapses menus in the mobile menu
(function() {
	let mobile_header_menu = document.getElementById("header-menu-mobile");
	if (mobile_header_menu) {
		new MyAccordeon(mobile_header_menu);
	}
})();
