let buttonMap = document.querySelector('.js-open-map');
let buttonList = document.querySelector('.js-open-list');
let dropdownMap = document.querySelector('#map');

buttonMap.addEventListener('click', (event) => {
	if(event.currentTarget.classList.contains('opened')) {
		event.currentTarget.classList.remove('opened')
		dropdownMap.classList.remove('show')
		document.body.style.overflow = 'initial'
		document.querySelector('.filter-map-filter').classList.remove('show');
		document.querySelectorAll('.js-block-branch').forEach((el) => {
			el.classList.remove('is-active');
			el.closest('.branches-block').querySelector('.branches-block-list').classList.remove('hide');
		})
	} else {
		event.currentTarget.classList.add('opened')
		dropdownMap.classList.add('show')
		document.body.style.overflow = 'hidden';
		document.querySelector('.filter-map-filter').classList.add('show');
	}

})

