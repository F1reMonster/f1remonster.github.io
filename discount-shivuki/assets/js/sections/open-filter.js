let button = document.querySelector('.js-open-filter');
let close = document.querySelector('.js-filter-close');
let dropdownFilter = document.querySelector('.js-mobile-filter');

button.addEventListener('click', () => {
	dropdownFilter.classList.add('show')
	document.body.style.overflow = 'hidden'
})

close.addEventListener('click', () => {
	dropdownFilter.classList.remove('show')
	document.body.style.overflow = 'initial'
})
