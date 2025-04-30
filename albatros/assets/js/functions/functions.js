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