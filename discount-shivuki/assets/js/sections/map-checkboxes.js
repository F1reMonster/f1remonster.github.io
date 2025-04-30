const checkPos = function () {
	let wrap = document.querySelector('.js-map-checkboxes');
	let trigger = wrap.querySelector('.filter-button-checkboxes');
	let dropdown = wrap.querySelector('.filter-dropdown-checkboxes');
	let checkWrap = document.querySelector('.js-check-position');
	let checkEem = checkWrap.querySelectorAll('.js-filter-checkbox');
	let countHidden = document.querySelector('.js-filter-count');
	let wrapWidth = checkWrap.offsetWidth;

	trigger.addEventListener('click', (ev) => {
		let element = ev.currentTarget;

		if(dropdown.classList.contains('show')) {
			dropdown.classList.remove('show')
			trigger.setAttribute('aria-expanded', 'false');
		} else {
			dropdown.classList.add('show')
			trigger.setAttribute('aria-expanded', 'true');
		}
	})

	dropdown.querySelectorAll('input').forEach((input, i) => {
		input.addEventListener('blur', (ev) => {
			setTimeout(() => {
				if (i + 1 === dropdown.querySelectorAll('input').length && !document.activeElement.classList.contains('count') || i === 0 && !document.activeElement.classList.contains('count')) {
					dropdown.classList.remove('show')
					trigger.setAttribute('aria-expanded', 'false');
				}
			}, 0)
		})
	})



	document.addEventListener('click', function(event) {
		if (!dropdown.contains(event.target) && dropdown.classList.contains('show') && !trigger.contains(event.target)) {
			dropdown.classList.remove('show')
		}
	});
// visible checkboxes
	checkEem.forEach((el, i) => {
		const id = el.getAttribute('data-id');
		const input = el.querySelector('input')

		if(window.outerWidth > 1600) {
			if(i > 3) {
				el.style.display = 'none'
				dropdown.querySelector('.js-filter-checkbox[data-id="' + id + '"]').style.display = 'flex'
				dropdown.querySelector('.js-filter-checkbox[data-id="' + id + '"] input').classList.add('count');
				dropdown.querySelector('.js-filter-checkbox[data-id="' + id + '"] input').checked = true
			}
		}

		if(window.outerWidth > 1440 && window.outerWidth < 1600) {
			if(i > 2) {
				el.style.display = 'none'
				dropdown.querySelector('.js-filter-checkbox[data-id="' + id + '"]').style.display = 'flex'
				dropdown.querySelector('.js-filter-checkbox[data-id="' + id + '"] input').classList.add('count');
				dropdown.querySelector('.js-filter-checkbox[data-id="' + id + '"] input').checked = true
			}
		}

		if(window.outerWidth < 1440) {
			if(i > 1) {
				el.style.display = 'none'
				dropdown.querySelector('.js-filter-checkbox[data-id="' + id + '"]').style.display = 'flex'
				dropdown.querySelector('.js-filter-checkbox[data-id="' + id + '"] input').classList.add('count');
				dropdown.querySelector('.js-filter-checkbox[data-id="' + id + '"] input').checked = true
			}
		}

		window.addEventListener('resize', () => {
			if(window.outerWidth > 1600) {
				if(i > 3) {
					el.style.display = 'none'
					dropdown.querySelector('.js-filter-checkbox[data-id="' + id + '"]').style.display = 'flex'
					dropdown.querySelector('.js-filter-checkbox[data-id="' + id + '"] input').classList.add('count');
					dropdown.querySelector('.js-filter-checkbox[data-id="' + id + '"] input').checked = true
				}
			}

			if(window.outerWidth > 1440 && window.outerWidth < 1600) {
				if(i > 2) {
					el.style.display = 'none'
					dropdown.querySelector('.js-filter-checkbox[data-id="' + id + '"]').style.display = 'flex'
					dropdown.querySelector('.js-filter-checkbox[data-id="' + id + '"] input').classList.add('count');
					dropdown.querySelector('.js-filter-checkbox[data-id="' + id + '"] input').checked = true
				}
			}

			if(window.outerWidth < 1440) {
				if(i > 1) {
					el.style.display = 'none'
					dropdown.querySelector('.js-filter-checkbox[data-id="' + id + '"]').style.display = 'flex'
					dropdown.querySelector('.js-filter-checkbox[data-id="' + id + '"] input').classList.add('count');
					dropdown.querySelector('.js-filter-checkbox[data-id="' + id + '"] input').checked = true
				}
			}
		})

		input.addEventListener('change', (event) => {
			if(event.currentTarget.checked) {
				wrap.querySelector('.js-filter-checkbox[data-id="' + id + '"]').querySelector('input').checked = true
			} else {
				wrap.querySelector('.js-filter-checkbox[data-id="' + id + '"]').querySelector('input').checked = false
			}
		})
	})


// hidden checkboxes

	let checkElements = document.querySelectorAll('.js-filter-checkbox');
	checkElements.forEach((el) => {
		const id = el.getAttribute('data-id')
		const input = el.querySelector('input')

		input.addEventListener('change', (event) => {
			if(event.currentTarget.checked) {
				checkWrap.querySelector('.js-filter-checkbox[data-id="' + id + '"]').querySelector('input').checked = true
				input.classList.add('count');
			} else {
				checkWrap.querySelector('.js-filter-checkbox[data-id="' + id + '"]').querySelector('input').checked = false
			}

			document.querySelector('.js-append-modals').querySelectorAll('.js-block-branch').forEach((el) => {
				let checks = el.querySelectorAll('.input-checkbox');
				let idBr = el.getAttribute('data-id')

				checks.forEach((check) => {
					if(check.getAttribute('data-id') === id) {
						if(event.currentTarget.checked && !check.querySelector('input').checked) {
							document.querySelector('.js-open-branch[data-id="'+ idBr + '"]').closest('.branch-item').classList.add('hide')
						} else if(!event.currentTarget.checked && !check.querySelector('input').checked) {
							document.querySelector('.js-open-branch[data-id="'+ idBr + '"]').closest('.branch-item').classList.remove('hide')
						}
					}
				})
			})

			if(el.closest('.js-map-checkboxes') !== null) {

				let quant = wrap.querySelectorAll('.count:checked').length;
				console.log(quant, 'egr');
				countHidden.innerHTML = quant + '+';

				if(quant > 0) {
					countHidden.style.display = 'flex'
				} else {
					countHidden.style.display = 'none'
				}
			}
		})

		if(el.closest('.js-map-checkboxes') !== null) {

			let quant = wrap.querySelectorAll('.count:checked').length;
			countHidden.innerHTML = quant + '+';

			if(quant > 0) {
				countHidden.style.display = 'flex'
			} else {
				countHidden.style.display = 'none'
			}
		}
	})

}

checkPos();

