const mobileBtn = document.querySelector('.mobile-btn');
const mobileMenu = document.querySelector('.mobile__menu');

mobileBtn.addEventListener('click', function(){
	mobileMenu.classList.toggle('open');
})