$(document).ready(function(){
	$(".aticlelink").on("click", function (event) {
	  //отменяем стандартную обработку нажатия по ссылке
	 $('div.fixed').css('position', 'relative');
	});
 });
 
 
 function changeSelectsDomStructure(){
		 // customize select
		 var x, i, j, selElmnt, a, b, c;
		 /* Look for any elements with the class "custom-select": */
		 x = document.getElementsByClassName("select-style");
		 for (i = 0; i < x.length; i++) {
			 selElmnt = x[i].getElementsByTagName("select")[0];
			 /* For each element, create a new DIV that will act as the selected item: */
			 a = document.createElement("DIV");
			 a.setAttribute("class", "select-selected");
			 a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
			 x[i].appendChild(a);
			 /* For each element, create a new DIV that will contain the option list: */
			 b = document.createElement("DIV");
			 b.setAttribute("class", "select-items select-hide");
			 for (j = 1; j < selElmnt.length; j++) {
	  /* For each option in the original select element,
	  create a new DIV that will act as an option item: */
	  c = document.createElement("DIV");
	  c.innerHTML = selElmnt.options[j].innerHTML;
	  c.addEventListener("click", function(e) {
			/* When an item is clicked, update the original select box,
			and the selected item: */
			var y, i, k, s, h;
			s = this.parentNode.parentNode.getElementsByTagName("select")[0];
			h = this.parentNode.previousSibling;
			for (i = 0; i < s.length; i++) {
				if (s.options[i].innerHTML == this.innerHTML) {
					s.selectedIndex = i;
					h.innerHTML = this.innerHTML;
					y = this.parentNode.getElementsByClassName("same-as-selected");
					for (k = 0; k < y.length; k++) {
						y[k].removeAttribute("class");
					}
					this.setAttribute("class", "same-as-selected");
					break;
				}
			}
			h.click();
	  });
	  b.appendChild(c);
 }
 x[i].appendChild(b);
 a.addEventListener("click", function(e) {
	  /* When the select box is clicked, close any other select boxes,
	  and open/close the current select box: */
	  e.stopPropagation();
	  closeAllSelect(this);
	  $(this).parent().find('select').trigger('change');
	  this.nextSibling.classList.toggle("select-hide");
	  this.classList.toggle("select-arrow-active");
 });
 }
 }
 function closeAllSelect(elmnt) {
	/* A function that will close all select boxes in the document,
	except the current select box: */
	var x, y, i, arrNo = [];
	x = document.getElementsByClassName("select-items");
	y = document.getElementsByClassName("select-selected");
	for (i = 0; i < y.length; i++) {
		if (elmnt == y[i]) {
			arrNo.push(i)
		} else {
			y[i].classList.remove("select-arrow-active");
		}
	}
	for (i = 0; i < x.length; i++) {
		if (arrNo.indexOf(i)) {
			x[i].classList.add("select-hide");
		}
	}
 }
 
 /* If the user clicks anywhere outside the select box,
 then close all select boxes: */
 document.addEventListener("click", closeAllSelect);
 function getURLVar(key) {
	 var value = [];
 
	 var query = document.location.search.split('?');
 
	 if (query[1]) {
		 var part = query[1].split('&');
 
		 for (i = 0; i < part.length; i++) {
			 var data = part[i].split('=');
 
			 if (data[0] && data[1]) {
				 value[data[0]] = data[1];
			 }
		 }
 
		 if (value[key]) {
			 return value[key];
		 } else {
			 return '';
		 }
	 }
 }
 
 //---------------------------------------------------------------------
 
 /**
  * SimpleAdaptiveSlider by Itchief v2.0.0 (https://github.com/itchief/ui-components/tree/master/simple-adaptive-slider)
  * Copyright 2020 - 2021 Alexander Maltsev
  * Licensed under MIT (https://github.com/itchief/ui-components/blob/master/LICENSE)
  */
 
 (function() {
	if (typeof window.CustomEvent === 'function' ) return false;
	function CustomEvent(event, params) {
	  params = params || {bubbles: false, cancelable: false, detail: null};
	  var e = document.createEvent('CustomEvent');
	  e.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
	  return e;
	}
	window.CustomEvent = CustomEvent;
 })();
 
 // базовые классы и селекторы
 var WRAPPER_SELECTOR = '.slider__wrapper';
 var ITEMS_SELECTOR = '.slider__items';
 var ITEM_SELECTOR = '.slider__item';
 var ITEM_CLASS_ACTIVE = 'slider__item_active';
 var CONTROL_SELECTOR = '.slider__control';
 var CONTROL_CLASS_SHOW = 'slider__control_show';
 // индикаторы
 var INDICATOR_WRAPPER_ELEMENT = 'ol';
 var INDICATOR_WRAPPER_CLASS = 'slider__indicators';
 var INDICATOR_ITEM_ELEMENT = 'li';
 var INDICATOR_ITEM_CLASS = 'slider__indicator';
 var INDICATOR_ITEM_CLASS_ACTIVE = 'slider__indicator_active';
 //  порог для переключения слайда (40%)
 var SWIPE_THRESHOLD = 20;
 // класс для отключения transition
 var TRANSITION_NONE = 'transition-none';
 
 function SimpleAdaptiveSlider(selector, config) {
	// .slider
	this._$root = document.querySelector(selector);
	// .slider__wrapper
	this._$wrapper = this._$root.querySelector(WRAPPER_SELECTOR);
	// .slider__items
	this._$items = this._$root.querySelector(ITEMS_SELECTOR);
	// .slider__item
	this._$itemList = this._$root.querySelectorAll(ITEM_SELECTOR);
	// С‚РµРєСѓС‰РёР№ РёРЅРґРµРєСЃ
	this._currentIndex = 0;
	// СЌРєСЃС‚СЂРµРјР°Р»СЊРЅС‹Рµ Р·РЅР°С‡РµРЅРёСЏ СЃР»Р°Р№РґРѕРІ
	this._minOrder = 0;
	this._maxOrder = 0;
	this._$itemWithMinOrder = null;
	this._$itemWithMaxOrder = null;
	this._minTranslate = 0;
	this._maxTranslate = 0;
	// РЅР°РїСЂР°РІР»РµРЅРёРµ СЃРјРµРЅС‹ СЃР»Р°Р№РґРѕРІ (РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ)
	this._direction = 'next';
	// С„Р»Р°Рі, РєРѕС‚РѕСЂС‹Р№ РїРѕРєР°Р·С‹РІР°РµС‚, С‡С‚Рѕ РёРґС‘С‚ РїСЂРѕС†РµСЃСЃ СѓСЂР°РІРЅРѕРІРµС€РёРІР°РЅРёСЏ СЃР»Р°Р№РґРѕРІ
	this._balancingItemsFlag = false;
	// С‚РµРєСѓС‰РµРµ Р·РЅР°С‡РµРЅРёРµ С‚СЂР°РЅСЃС„РѕСЂРјР°С†РёРё
	this._transform = 0;
	// swipe РїР°СЂР°РјРµС‚СЂС‹
	this._hasSwipeState = false;
	this._swipeStartPosX = 0;
	// id С‚Р°Р№РјРµСЂР°
	this._intervalId = null;
	// РєРѕРЅС„РёРіСѓСЂР°С†РёСЏ СЃР»Р°Р№РґРµСЂР° (РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ)
	this._config = {
	  loop: true,
	  autoplay: false,
	  interval: 5000,
	  swipe: true,
	};
	// РёР·РјРµРЅСЏРµРј РєРѕРЅС„РёРіСѓСЂР°С†РёСЋ СЃР»Р°Р№РґРµСЂР° РІ СЃРѕРѕС‚РІРµС‚СЃС‚РІРёРё СЃ РїРµСЂРµРґР°РЅРЅС‹РјРё РЅР°СЃС‚СЂРѕР№РєР°РјРё
	for (var key in config) {
	  if (this._config.hasOwnProperty(key)) {
		 this._config[key] = config[key];
	  }
	}
	// РґРѕР±Р°РІР»СЏРµРј Рє СЃР»Р°Р№РґР°Рј data-Р°С‚СЂРёР±СѓС‚С‹
	for (var i = 0, length = this._$itemList.length; i < length; i++) {
	  this._$itemList[i].dataset.order = i;
	  this._$itemList[i].dataset.index = i;
	  this._$itemList[i].dataset.translate = 0;
	}
	// РїРµСЂРµРјРµС‰Р°РµРј РїРѕСЃР»РµРґРЅРёР№ СЃР»Р°Р№Рґ РїРµСЂРµРґ РїРµСЂРІС‹Рј
	if (this._config.loop) {
	  var count = this._$itemList.length - 1;
	  var translate = -this._$itemList.length * 100;
	  this._$itemList[count].dataset.order = -1;
	  this._$itemList[count].dataset.translate = -this._$itemList.length * 100;
	  var transformValue = 'translateX('.concat(translate, '%)');
	  this._$itemList[count].style.transform = transformValue;
	}
	// РґРѕР±Р°РІР»СЏРµРј РёРЅРґРёРєР°С‚РѕСЂС‹ Рє СЃР»Р°Р№РґРµСЂСѓ
	this._addIndicators();
	// РѕР±РЅРѕРІР»СЏРµРј СЌРєСЃС‚СЂРµРјР°Р»СЊРЅС‹Рµ Р·РЅР°С‡РµРЅРёСЏ РїРµСЂРµРјРµРЅРЅС‹С…
	this._refreshExtremeValues();
	// РїРѕРјРµС‡Р°РµРј Р°РєС‚РёРІРЅС‹Рµ СЌР»РµРјРµРЅС‚С‹
	this._setActiveClass();
	// РЅР°Р·РЅР°С‡Р°РµРј РѕР±СЂР°Р±РѕС‚С‡РёРєРё
	this._addEventListener();
	// Р·Р°РїСѓСЃРєР°РµРј Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєСѓСЋ СЃРјРµРЅСѓ СЃР»Р°Р№РґРѕРІ
	this._autoplay();
 }
 
 // set active class
 SimpleAdaptiveSlider.prototype._setActiveClass = function() {
	// slides
	var i;
	var length;
	var $item;
	var index;
	for (i = 0, length = this._$itemList.length; i < length; i++) {
	  $item = this._$itemList[i];
	  index = parseInt($item.dataset.index);
	  if (this._currentIndex === index) {
		 $item.classList.add(ITEM_CLASS_ACTIVE);
	  } else {
		 $item.classList.remove(ITEM_CLASS_ACTIVE);
	  }
	}
	// indicators
	var $indicators = this._$root.querySelectorAll('.' + INDICATOR_ITEM_CLASS);
	if ($indicators.length) {
	  for (i = 0, length = $indicators.length; i < length; i++) {
		 $item = $indicators[i];
		 index = parseInt($item.dataset.slideTo);
		 if (this._currentIndex === index) {
			$item.classList.add(INDICATOR_ITEM_CLASS_ACTIVE);
		 } else {
			$item.classList.remove(INDICATOR_ITEM_CLASS_ACTIVE);
		 }
	  }
	}
	// controls
	var $controls = this._$root.querySelectorAll(CONTROL_SELECTOR);
	if (!$controls.length) {
	  return;
	}
	if (this._config.loop) {
	  for (i = 0, length = $controls.length; i < length; i++) {
		 $controls[i].classList.add(CONTROL_CLASS_SHOW);
	  }
	} else {
	  if (this._currentIndex === 0) {
		 $controls[0].classList.remove(CONTROL_CLASS_SHOW);
		 $controls[1].classList.add(CONTROL_CLASS_SHOW);
	  } else if (this._currentIndex === this._$itemList.length - 1) {
		 $controls[0].classList.add(CONTROL_CLASS_SHOW);
		 $controls[1].classList.remove(CONTROL_CLASS_SHOW);
	  } else {
		 $controls[0].classList.add(CONTROL_CLASS_SHOW);
		 $controls[1].classList.add(CONTROL_CLASS_SHOW);
	  }
	}
 };
 
 // СЃРјРµРЅР° СЃР»Р°Р№РґРѕРІ
 SimpleAdaptiveSlider.prototype._move = function() {
	if (this._direction === 'none') {
	  this._$items.classList.remove(TRANSITION_NONE);
	  this._$items.style.transform = 'translateX('.concat(this._transform, '%)');
	  return;
	}
	if (!this._config.loop) {
	  var condition = this._currentIndex + 1 >= this._$itemList.length;
	  if (condition && this._direction === 'next') {
		 this._autoplay('stop');
		 return;
	  }
	  if (this._currentIndex <= 0 && this._direction === 'prev') {
		 return;
	  }
	}
	var step = this._direction === 'next' ? -100 : 100;
	var transform = this._transform + step;
	if (this._direction === 'next') {
	  if (++this._currentIndex > this._$itemList.length - 1) {
		 this._currentIndex -= this._$itemList.length;
	  }
	} else {
	  if (--this._currentIndex < 0) {
		 this._currentIndex += this._$itemList.length;
	  }
	}
	this._transform = transform;
	this._$items.style.transform = 'translateX('.concat(transform, '%)');
	this._setActiveClass();
 };
 
 // С„СѓРЅРєС†РёСЏ РґР»СЏ РїРµСЂРµРјРµС‰РµРЅРёСЏ Рє СЃР»Р°Р№РґСѓ РїРѕ РёРЅРґРµРєСЃСѓ
 SimpleAdaptiveSlider.prototype._moveTo = function(index) {
	var currentIndex = this._currentIndex;
	this._direction = index > currentIndex ? 'next' : 'prev';
	for (var i = 0; i < Math.abs(index - currentIndex); i++) {
	  this._move();
	}
 };
 
 // РјРµС‚РѕРґ РґР»СЏ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРѕР№ СЃРјРµРЅС‹ СЃР»Р°Р№РґРѕРІ
 SimpleAdaptiveSlider.prototype._autoplay = function(action) {
	if (!this._config.autoplay) {
	  return;
	}
	if (action === 'stop') {
	  clearInterval(this._intervalId);
	  this._intervalId = null;
	  return;
	}
	if (this._intervalId === null) {
	  this._intervalId = setInterval(function() {
		 this._direction = 'next';
		 this._move();
	  }.bind(this),
	  this._config.interval
	  );
	}
 };
 
 // РґРѕР±Р°РІР»РµРЅРёРµ РёРЅРґРёРєР°С‚РѕСЂРѕРІ
 SimpleAdaptiveSlider.prototype._addIndicators = function() {
	if (this._$root.querySelector('.' + INDICATOR_WRAPPER_CLASS)) {
	  return;
	}
	var $wrapper = document.createElement(INDICATOR_WRAPPER_ELEMENT);
	$wrapper.className = INDICATOR_WRAPPER_CLASS;
	for (var i = 0, length = this._$itemList.length; i < length; i++) {
	  var $item = document.createElement(INDICATOR_ITEM_ELEMENT);
	  $item.className = INDICATOR_ITEM_CLASS;
	  $item.dataset.slideTo = i;
	  $wrapper.appendChild($item);
	}
	this._$root.appendChild($wrapper);
 };
 
 // refresh extreme values
 SimpleAdaptiveSlider.prototype._refreshExtremeValues = function() {
	var $itemList = this._$itemList;
	this._minOrder = parseInt($itemList[0].dataset.order);
	this._maxOrder = this._minOrder;
	this._$itemWithMinOrder = $itemList[0];
	this._$itemWithMaxOrder = this._$itemWithMinOrder;
	this._minTranslate = parseInt($itemList[0].dataset.translate);
	this._maxTranslate = this._minTranslate;
	for (var i = 0, length = $itemList.length; i < length; i++) {
	  var $item = $itemList[i];
	  var order = parseInt($item.dataset.order);
	  if (order < this._minOrder) {
		 this._minOrder = order;
		 this._$itemWithMinOrder = $item;
		 this._minTranslate = parseInt($item.dataset.translate);
	  } else if (order > this._maxOrder) {
		 this._maxOrder = order;
		 this._$itemWithMaxOrder = $item;
		 this._minTranslate = parseInt($item.dataset.translate);
	  }
	}
 };
 
 // balancing items
 SimpleAdaptiveSlider.prototype._balancingItems = function() {
	if (!this._balancingItemsFlag) {
	  return;
	}
	var $wrapper = this._$wrapper;
	var wrapperRect = $wrapper.getBoundingClientRect();
	var halfWidthItem = wrapperRect.width / 2;
	var count = this._$itemList.length;
	var translate;
	var clientRect;
	if (this._direction === 'next') {
	  var wrapperLeft = wrapperRect.left;
	  var $min = this._$itemWithMinOrder;
	  translate = this._minTranslate;
	  clientRect = $min.getBoundingClientRect();
	  if (clientRect.right < wrapperLeft - halfWidthItem) {
		 $min.dataset.order = this._minOrder + count;
		 translate += count * 100;
		 $min.dataset.translate = translate;
		 $min.style.transform = 'translateX('.concat(translate, '%)');
		 this._refreshExtremeValues();
	  }
	} else if (this._direction === 'prev') {
	  var wrapperRight = wrapperRect.right;
	  var $max = this._$itemWithMaxOrder;
	  translate = this._maxTranslate;
	  clientRect = $max.getBoundingClientRect();
	  if (clientRect.left > wrapperRight + halfWidthItem) {
		 $max.dataset.order = this._maxOrder - count;
		 translate -= count * 100;
		 $max.dataset.translate = translate;
		 $max.style.transform = 'translateX('.concat(translate, '%)');
		 this._refreshExtremeValues();
	  }
	}
	requestAnimationFrame(this._balancingItems.bind(this));
 };
 
 // adding listeners
 SimpleAdaptiveSlider.prototype._addEventListener = function() {
	var $items = this._$items;
	function onClick(e) {
	  var $target = e.target;
	  this._autoplay('stop');
	  if ($target.classList.contains('slider__control')) {
		 e.preventDefault();
		 this._direction = $target.dataset.slide;
		 this._move();
	  } else if ($target.dataset.slideTo) {
		 e.preventDefault();
		 var index = parseInt($target.dataset.slideTo);
		 this._moveTo(index);
	  }
	  if (this._config.loop) {
		 this._autoplay();
	  }
	}
	function onTransitionStart() {
	  this._balancingItemsFlag = true;
	  window.requestAnimationFrame(this._balancingItems.bind(this));
	}
	function onTransitionEnd() {
	  this._balancingItemsFlag = false;
	  this._$root.dispatchEvent(new CustomEvent('slider.transition.end',
			{bubbles: true}));
	}
	function onMouseEnter() {
	  this._autoplay('stop');
	}
	function onMouseLeave() {
	  if (this._config.loop) {
		 this._autoplay();
	  }
	}
	function onSwipeStart(e) {
	  this._autoplay('stop');
	  var event = e.type.search('touch') === 0 ? e.touches[0] : e;
	  this._swipeStartPosX = event.clientX;
	  this._swipeStartPosY = event.clientY;
	  this._hasSwipeState = true;
	  this._hasSwiping = false;
	}
	function onSwipeMove(e) {
	  if (!this._hasSwipeState) {
		 return;
	  }
	  var event = e.type.search('touch') === 0 ? e.touches[0] : e;
	  var diffPosX = this._swipeStartPosX - event.clientX;
	  var diffPosY = this._swipeStartPosY - event.clientY;
	  if (!this._hasSwiping) {
		 if (Math.abs(diffPosY) > Math.abs(diffPosX)) {
			this._hasSwipeState = false;
			return;
		 }
		 this._hasSwiping = true;
	  }
	  e.preventDefault();
	  if (!this._config.loop) {
		 if (this._currentIndex + 1 >= this._$itemList.length && diffPosX >= 0) {
			diffPosX = diffPosX / 4;
		 }
		 if (this._currentIndex <= 0 && diffPosX <= 0) {
			diffPosX = diffPosX / 4;
		 }
	  }
	  var value = (diffPosX / this._$wrapper.getBoundingClientRect().width) * 100;
	  var translateX = this._transform - value;
	  this._$items.classList.add(TRANSITION_NONE);
	  this._$items.style.transform = 'translateX('.concat(translateX, '%)');
	}
	function onSwipeEnd(e) {
	  if (!this._hasSwipeState) {
		 return;
	  }
	  var event = e.type.search('touch') === 0 ? e.changedTouches[0] : e;
	  var diffPosX = this._swipeStartPosX - event.clientX;
	  if (!this._config.loop) {
		 if (this._currentIndex + 1 >= this._$itemList.length && diffPosX >= 0) {
			diffPosX = diffPosX / 4;
		 }
		 if (this._currentIndex <= 0 && diffPosX <= 0) {
			diffPosX = diffPosX / 4;
		 }
	  }
	  var value = (diffPosX / this._$wrapper.getBoundingClientRect().width) * 100;
	  this._$items.classList.remove(TRANSITION_NONE);
	  if (value > SWIPE_THRESHOLD) {
		 this._direction = 'next';
		 this._move();
	  } else if (value < -SWIPE_THRESHOLD) {
		 this._direction = 'prev';
		 this._move();
	  } else {
		 this._direction = 'none';
		 this._move();
	  }
	  this._hasSwipeState = false;
	  if (this._config.loop) {
		 this._autoplay();
	  }
	}
	function onDragStart(e) {
	  e.preventDefault();
	}
	function onVisibilityChange() {
	  if (document.visibilityState === 'hidden') {
		 this._autoplay('stop');
	  } else if (document.visibilityState === 'visible') {
		 if (this._config.loop) {
			this._autoplay();
		 }
	  }
	}
	// click
	this._$root.addEventListener('click', onClick.bind(this));
	// transitionstart and transitionend
	if (this._config.loop) {
	  $items.addEventListener('transitionstart', onTransitionStart.bind(this));
	  $items.addEventListener('transitionend', onTransitionEnd.bind(this));
	}
	// mouseenter and mouseleave
	if (this._config.autoplay) {
	  this._$root.addEventListener('mouseenter', onMouseEnter.bind(this));
	  this._$root.addEventListener('mouseleave', onMouseLeave.bind(this));
	}
	// swipe
	if (this._config.swipe) {
	  var supportsPassive = false;
	  try {
		 var opts = Object.defineProperty({}, 'passive', {
			get: function() {
			  supportsPassive = true;
			},
		 });
		 window.addEventListener('testPassiveListener', null, opts);
	  } catch (err) {}
	  this._$root.addEventListener('touchstart', onSwipeStart.bind(this),
			 supportsPassive ? {passive: false} : false);
	  this._$root.addEventListener('touchmove', onSwipeMove.bind(this),
			 supportsPassive ? {passive: false} : false);
	  this._$root.addEventListener('mousedown', onSwipeStart.bind(this));
	  this._$root.addEventListener('mousemove', onSwipeMove.bind(this));
	  document.addEventListener('touchend', onSwipeEnd.bind(this));
	  document.addEventListener('mouseup', onSwipeEnd.bind(this));
	}
	this._$root.addEventListener('dragstart', onDragStart.bind(this));
	// РїСЂРё РёР·РјРµРЅРµРЅРёРё Р°РєС‚РёРІРЅРѕСЃС‚Рё РІРєР»Р°РґРєРё
	document.addEventListener('visibilitychange', onVisibilityChange.bind(this));
 };
 
 // РїРµСЂРµР№С‚Рё Рє СЃР»РµРґСѓСЋС‰РµРјСѓ СЃР»Р°Р№РґСѓ
 SimpleAdaptiveSlider.prototype.next = function() {
	this._direction = 'next';
	this._move();
 };
 
 // РїРµСЂРµР№С‚Рё Рє РїСЂРµРґС‹РґСѓС‰РµРјСѓ СЃР»Р°Р№РґСѓ
 SimpleAdaptiveSlider.prototype.prev = function() {
	this._direction = 'prev';
	this._move();
 };
 
 // СѓРїСЂР°РІР»РµРЅРёРµ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРѕР№ СЃРјРµРЅРѕР№ СЃР»Р°Р№РґРѕРІ
 SimpleAdaptiveSlider.prototype.autoplay = function(action) {
	this._autoplay('stop');
 };
 
 //---------------------------------------------------------------------
 
 $(document).ready(function() {
	 $('form#newsletter-form').submit(function(event) {
		 event.preventDefault();
		 $.ajax({
			 url: '/index.php?route=extension/module/ne/subscribe&box=1',
			 type: 'POST',
			 dataType: 'json',
			 data: $(this).serialize(),
		 })
		 .done(function(response) {
			 alert(response.message);
		 })
		 .fail(function(xhr, ajaxOptions, thrownError) {
			 alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
		 });
	 });
 
	 $('footer .footer-title').on('click', function(){
		  $(this).toggleClass('active');
		  $(this).parent().next().slideToggle('fast');
	  });
	  if ($(window).width() < 768) {
 
		  $('footer .mob-hide').hide();
	  }
 
 
	 if ($(window).width() < 992) {
 
		 console.log($(window).width());		
 
		 // РЎР»Р°Р№РґРµСЂ РљР°С‚РµРіРѕСЂРёР№ РЅР° РіР»Р°РІРЅРѕР№
		 $('.category-list .row').slick({
			 rows:2,
			 slidesPerRow: 2,
			 draggable: false,
			 swipe: true,
			 responsive: [
			 {
				 breakpoint: 767,
				 settings: {
					 slidesPerRow: 2,
					 rows: 1
				 }
			 }
			 ]     
		 }); 
	 }
 
 
	 $('.logo-slider a').BlackAndWhite();
	  
	 
 
	 $('.bf-attr-filter .bf-c-1').append('<span class="checkmark"></span>');
 
	 $('.product-layout.product-grid .product-thumb .caption').matchHeight({
		 byRow:true
	 });
	 $('.product-slider .caption h4').matchHeight({
		 byRow:true
	 });
	 $('.product-slider .caption .price').matchHeight({
		 byRow:true
	 });
	 // $('.product-layout.product-grid .product-thumb .caption h4').matchHeight({
	 // 	byRow:true
	 // });
	 // $('.product-slider .caption h4').matchHeight({
	 // 	byRow:true
	 // });
	 // $('.product-layout.product-grid .product-thumb .caption .price').matchHeight({
	 // 	byRow:true
	 // });
	 // $('.product-slider .caption .price').matchHeight({
	 // 	byRow:true
	 // });
 
 
	 var scrollBtn = $('#scroll-top');
 
	 $(window).scroll(function() {
		 if ($(window).scrollTop() > 300) {
			 scrollBtn.show('fast');
		 } else {
			 scrollBtn.hide('fast');
		 }
	 });
 
	 scrollBtn.on('click', function(e) {
		 e.preventDefault();
		 $('html, body').animate({scrollTop:0}, '300');
	 });
 
 
	 // СЃР»Р°Р№РґРµСЂ РІ С‚РѕРІР°СЂРµ
 
	 $('.prod-nav-slider').slick({
		 slidesToShow: 3,
		 slidesToScroll: 1,
		 vertical: true,
		 verticalSwiping: true,
		 arrows: true,
		 asNavFor: '.prod-main-slider',
		 centerMode: true,
		 focusOnSelect: true
	 });
	 $('.prod-main-slider').slick({
		 slidesToShow: 1,
		 slidesToScroll: 1,
		 arrows: false,
		 fade:true,
		 asNavFor: '.prod-nav-slider',
		 centerMode: true,
		 focusOnSelect: true,
		 responsive: [
		 {
			 breakpoint: 991,
			 settings: {
				 infinite: true,
				 dots: true,
				 fade:false
			 }
		 }]
	 });
 
 
 
	 $(window).scroll(function(){
		 var sticky = $('header .head'),
		 scroll = $(window).scrollTop();
 
		 if (scroll >= 41) sticky.addClass('fixed');
		 else sticky.removeClass('fixed');
	 });
 
	 // Р“Р°РјР±СѓСЂРіРµСЂ РЅ РґРµСЃРєС‚РѕРїРµ
	 if ($(window).width() > 992) {
		 $("li.menu-btn").hover(function () {
			 $(this).addClass('hover');
			 $(this).children("ul.sub-menu").slideDown('fast');
		 }, function () {    	
			 $(this).children("ul.sub-menu").slideUp('fast');
			 $(this).removeClass('hover');   	        
		 });
 
		  // Р’С‹РїР°РґР°СЋС‰РµРµ РјРµРЅСЋ РЅР° РґРµСЃРєС‚РѕРїРµ
		  $("li.has-children").hover(function () {
			  $(this).addClass('hover');
			  $(this).children("ul.sub-menu").slideDown('fast');
		  }, function () {        
			  $(this).children("ul.sub-menu").slideUp('fast');
			  $(this).removeClass('hover');    	
		  });	
 
		  $("li.catalog").hover(function () {
			  $(this).addClass('hover');
			  $(this).children(".catalog-container").slideDown('fast');
		  }, function () {    	
			  $(this).children(".catalog-container").slideUp('fast');
			  $(this).removeClass('hover');   	        
		  });
		  $(".catalog-container li.dropdown").hover(function () {
			  $(this).addClass('hover');
			  $(this).children(".sub-menu").slideDown('fast');
		  }, function () {        
			  $(this).children(".sub-menu").slideUp('fast');
			  $(this).removeClass('hover');    	
		  });
 
	 }else{
		 $('.head-links span.togle-menu').on('click', function(){
			 $('.head-links').animate({
				 'left':'-100%'
			 },500);
		 });
 
		 $('.head-links').append('<span class="close">x</span>');
		 
		 $('span.mob-menu').on('click', function(){
			 $('.head-links').animate({
				 'left':'0'
			 },500);
			 $('<div class="overlay"></div>').insertBefore('.head-links');
 
		 });		
 
		 $("li.catalog>a").click(function (e) {
			 e.preventDefault();
			 $(this).toggleClass('hover');
			 $(".catalog-container").slideToggle('fast');
		 });
 
		 $('.catalog-container li.dropdown>a').click(function(e){
			 e.preventDefault();
			 $(this).toggleClass('hover');
			 $(this).parent().find('.sub-menu').slideToggle('fast');
 
		 })
	 }
 
 
 
	 $('.head-links .close').on('click', function(){
		 $('.head-links').animate({
			 'left':'-100%'
		 },500);
		 $('.overlay').remove();
	 });
	 
	 
 
	  // РЎРєСЂС‹С‚РёРµ/РѕС‚РєСЂС‹С‚РёРµ РїРѕРёСЃРєР° РЅР° РїР»Р°РЅС€РµС‚Р°С… Рё С‚РµР»РµС„РѕРЅР°С…
	  $('.toggle-search').on('click', function(){
		  $(this).toggleClass('active');		
		  $('#search').slideToggle('fast');
	  });
	  $(document).mouseup(function (e){ 
		  var div = $('#search');
 
		  if (!div.is(e.target) && div.has(e.target).length === 0 && !$('.toggle-search').is(e.target) && !$('.toggle-search svg').is(e.target)) { 
			  if ($(window).width() <= 991) {
				  div.slideUp('fast');
				  $('.toggle-search').removeClass('active');
			  }
		  } 
 
		  
 
 
		  if ($('.overlay').is(e.target)) {
			  $('.head-links').animate({
				  'left':'-100%'
			  },500);
			  $('.overlay').remove();
		  }
 
	  });
 
 
 
 
	 // Р“Р»Р°РІРЅС‹Р№ СЃР»Р°Р№РґРµСЂ
	 var $status = $('.pagingInfo');
	 var $slickElement = $('.head-carousel');
 
	 $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
		 var i = (currentSlide ? currentSlide : 0) + 1;
		 $status.html('<span class="active">' + i + '</span> | ' + '<span>'+slick.slideCount+'</span>');
	 });
	 $slickElement.slick({
		 dots:true,
		 prevArrow: $('.slider-wrapper .slick-prev'),
		 nextArrow: $('.slider-wrapper .slick-next')
	 });
 
 
	 $('section.new-products .product-slider').slick({
		 infinite: true,
		 slidesToShow: 3,
		 slidesToScroll: 1,
		 draggable: false,
		 swipe: false,
		 responsive: [
		 {
			 breakpoint: 1235,
			 settings: {
				 slidesToShow: 3
			 }
		 },
		 {
			 breakpoint: 991,
			 settings: {
				 slidesToShow: 2,
				 swipe: true
			 }
		 }
		 ]
	 });
	 
	 $('section.tabs-product-section .product-slider').each(function(){
		 $(this).slick({
			 infinite: true,
			 slidesToShow: 4,
			 slidesToScroll: 1,
			 draggable: false,
			 swipe: false,
			 responsive: [
			 {
				 breakpoint: 1235,
				 settings: {
					 slidesToShow: 3
				 }
			 },
			 {
				 breakpoint: 991,
				 settings: {
					 slidesToShow: 2,
					 swipe: true
				 }
			 }
			 ]
		 });
	 });
 
 
 
	 $('.tabs-links li a').on('click', function(e){
		 e.preventDefault();
		 if (!$(this).is('.active')) {
			 $('.tabs-links li a').removeClass('active');	 		
			 $(this).addClass('active');	 		
 
			 var dataLink = $(this).attr('href');	 		
			 $('.tabs-product-section .product-slider').removeClass('active');
			 $(this).closest('.tabs-product-section').find('[data-id="'+dataLink+'"]').addClass('active').slick('refresh');
 
		 };
	 });
 
	 var openName = $('.description-wrap .show-more').text();
 
	 var blockHeight = $('.show-more').prev().height();
	 console.log(blockHeight);
 
	 var maxHeight;
 
	 if ($(window).width() > 767) {
		 maxHeight = 175;
	 }else{
		 maxHeight = 200;
	 }
	 if (blockHeight < maxHeight) {
		 $('.show-more').hide();			
	 }else{
		 $('.show-more').prev().css('maxHeight', maxHeight);
		 $('.show-more').show();				
	 }
 
 
	 $('.show-more').on('click', function(){
		 $(this).toggleClass('active');		
		 if ($(this).is('.active')) {
			 $(this).text('РЎРІРµСЂРЅСѓС‚СЊ');
		 }else{
			 $(this).text('Р Р°Р·РІРµСЂРЅСѓС‚СЊ');
		 }
		 $(this).prev().toggleClass('open');
	 });
 
 
	 // $('.page-wrap.category-list-page .product-slider, .category-product-list .product-slider, .product-page .product-slider').each(function(){
	 // 	$(this).slick({
	 // 		infinite: true,
	 // 		slidesToShow: 4,
	 // 		slidesToScroll: 1,
	 // 		draggable: false,
	 // 		swipe: false,
	 // 		responsive: [
	 // 		{
	 // 			breakpoint: 1235,
	 // 			settings: {
	 // 				slidesToShow: 3
	 // 			}
	 // 		},
	 // 		{
	 // 			breakpoint: 991,
	 // 			settings: {
	 // 				slidesToShow: 3,
	 // 				swipe: true
	 // 			}
	 // 		},
	 // 		{
	 // 			breakpoint: 570,
	 // 			settings: {
	 // 				slidesToShow: 2,
	 // 				swipe: true
	 // 			}
	 // 		}
	 // 		]
	 // 	});
	 // });
 
 
	 $('.page-wrap.category-list-page .product-slider').slick({
		 infinite: true,
		 slidesToShow: 4,
		 slidesToScroll: 1,
		 draggable: false,
		 swipe: false,
		 responsive: [
		 {
			 breakpoint: 1235,
			 settings: {
				 slidesToShow: 3
			 }
		 },
		 {
			 breakpoint: 991,
			 settings: {
				 slidesToShow: 3,
				 swipe: true
			 }
		 },
		 {
			 breakpoint: 570,
			 settings: {
				 slidesToShow: 2,
				 swipe: true
			 }
		 }
		 ]
	 });
	 $('.category-product-list .product-slider').slick({
		 infinite: true,
		 slidesToShow: 4,
		 slidesToScroll: 1,
		 draggable: false,
		 swipe: false,
		 responsive: [
		 {
			 breakpoint: 1235,
			 settings: {
				 slidesToShow: 3
			 }
		 },
		 {
			 breakpoint: 991,
			 settings: {
				 slidesToShow: 3,
				 swipe: true
			 }
		 },
		 {
			 breakpoint: 570,
			 settings: {
				 slidesToShow: 2,
				 swipe: true
			 }
		 }
		 ]
	 });
	 if ($('.product-page .product-slider').length) {
 
		 $('.product-page .last-view .product-slider').each(function(){
			 $(this).slick({
				 infinite: true,
				 slidesToShow: 4,
				 slidesToScroll: 1,
				 draggable: false,
				 swipe: false,
				 responsive: [
				 {
					 breakpoint: 1235,
					 settings: {
						 slidesToShow: 3
					 }
				 },
				 {
					 breakpoint: 991,
					 settings: {
						 slidesToShow: 3,
						 swipe: true
					 }
				 },
				 {
					 breakpoint: 570,
					 settings: {
						 slidesToShow: 2,
						 swipe: true
					 }
				 }
				 ]
			 });
		 });
 
	 }
 
 
 
 
 
 
	 $('.logo-slider').slick({
		 infinite: true,
		 slidesToShow: 6,
		 slidesToScroll: 1,
		 responsive: [
		 {
			 breakpoint: 991,
			 settings: {
				 slidesToShow: 5
			 }
		 },{
			 breakpoint: 767,
			 settings: {
				 slidesToShow: 4
			 }
		 },{
			 breakpoint: 480,
			 settings: {
				 slidesToShow: 3
			 }
		 }
		 ]
	 });
 
 
	 // Р’С‹РїР°РґР°С€РєР° СЏР·С‹РєРѕРІ РјРѕР±
	 $('.form-language li.active').on('click', function(){
		 $(this).toggleClass('open');		
		 $('.mobile-lang-list').slideToggle('fast');
	 });
 
	 $(document).mouseup(function (e){ 
		 var div = $('.mobile-lang-list');
		 if (!div.is(e.target) && div.has(e.target).length === 0 && !$('.form-language li.active').is(e.target) && !$('.form-language li.active span').is(e.target)) { 
			 div.slideUp('fast');
			 $('.form-language li.active').removeClass('open');
		 }       
	 });
 
 
	  // С„РёР»С‚СЂС‹ РЅР° РјРѕР±
 
	  $('.filter-toggle').on('click', function(){
		  $('.filter').animate({
			  'left':'0'
		  },500)
	  });
 
	  $('.filter .close').on('click', function(){    		
		  $('.filter').animate({
			  'left':'-100%'
		  },500);
	  });
 
	  $('.filter').on('click', function(e){
		  if ($(window).width() < 992) {
			  if ($(this).has(e.target).length === 0){
				  $('.filter').animate({
					  'left':'-100%'
				  },500);
			  }
 
		  }
	  });
 
 
 
 
 
 
 
 
		 // Highlight any found errors
		 $('.text-danger').each(function() {
			 var element = $(this).parent().parent();
 
			 if (element.hasClass('form-group')) {
				 element.addClass('has-error');
			 }
		 });
 
		 // Currency
		 $('#form-currency .currency-select').on('click', function(e) {
			 e.preventDefault();
 
			 $('#form-currency input[name=\'code\']').val($(this).attr('name'));
 
			 $('#form-currency').submit();
		 });
 
		 // Language
		 $('.form-language .language-select').on('click', function(e) {
			 e.preventDefault();
 
			 $(this).closest('.form-language').find('input[name=\'code\']').val($(this).attr('name'));
 
			 $(this).closest('.form-language').submit();
		 });
 
		 /* Search */
		 $('#search input[name=\'search\']').parent().find('button').on('click', function() {
			 // var url = $('base').attr('href') + 'index.php?route=product/search';
			 var url = $('base').attr('href') + 'index.php?route=product/isearch';
 
			 var value = $('header #search input[name=\'search\']').val();
 
			 if (value) {
				 url += '&search=' + encodeURIComponent(value);
			 }
 
			 location = url;
		 });
 
		 $('#search input[name=\'search\']').on('keydown', function(e) {
			 if (e.keyCode == 13) {
				 $('header #search input[name=\'search\']').parent().find('button').trigger('click');
			 }
		 });
 
		 // Menu
		 $('#menu .dropdown-menu').each(function() {
			 var menu = $('#menu').offset();
			 var dropdown = $(this).parent().offset();
 
			 var i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#menu').outerWidth());
 
			 if (i > 0) {
				 $(this).css('margin-left', '-' + (i + 10) + 'px');
			 }
		 });
 
		 // Product List
		 $('#list-view').click(function() {
			 $('#content .product-grid > .clearfix').remove();
 
			 $('#content .row > .product-grid').attr('class', 'product-layout product-list col-xs-12');
			 $('#grid-view').removeClass('active');
			 $('#list-view').addClass('active');
 
			 localStorage.setItem('display', 'list');
		 });
 
		 // Product Grid
		 $('#grid-view').click(function() {
			 // What a shame bootstrap does not take into account dynamically loaded columns
			 var cols = $('#column-right, #column-left').length;
 
			 if (cols == 2) {
				 $('#content .product-list').attr('class', 'product-layout product-grid col-lg-6 col-md-6 col-sm-12 col-xs-12');
			 } else if (cols == 1) {
				 $('#content .product-list').attr('class', 'product-layout product-grid col-lg-4 col-md-4 col-sm-6 col-xs-12');
			 } else {
				 $('#content .product-list').attr('class', 'product-layout product-grid col-lg-3 col-md-3 col-sm-6 col-xs-12');
			 }
 
			 $('#list-view').removeClass('active');
			 $('#grid-view').addClass('active');
 
			 localStorage.setItem('display', 'grid');
		 });
 
		 if (localStorage.getItem('display') == 'list') {
			 $('#list-view').trigger('click');
			 $('#list-view').addClass('active');
		 } else {
			 $('#grid-view').trigger('click');
			 $('#grid-view').addClass('active');
		 }
 
		 // Checkout
		 $(document).on('keydown', '#collapse-checkout-option input[name=\'email\'], #collapse-checkout-option input[name=\'password\']', function(e) {
			 if (e.keyCode == 13) {
				 $('#collapse-checkout-option #button-login').trigger('click');
			 }
		 });
 
		 // tooltips on hover
		 $('[data-toggle=\'tooltip\']').tooltip({container: 'body',trigger: 'hover'});
 
		 // Makes tooltips work on ajax generated content
		 $(document).ajaxStop(function() {
			 $('[data-toggle=\'tooltip\']').tooltip({container: 'body'});
		 });
 
 
 
 
		 // changeSelectsDomStructure();
 });
 
 
 
 
 
 
 
 
 // Cart add remove functions
 var cart = {
	 'add': function(product_id, quantity) {
		 $.ajax({
			 url: 'index.php?route=checkout/cart/add',
			 type: 'post',
			 data: 'product_id=' + product_id + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			 dataType: 'json',
			 beforeSend: function() {
				 $('#cart > button').button('loading');
			 },
			 complete: function() {
				 $('#cart > button').button('reset');
			 },
			 success: function(json) {
				 $('.alert, .text-danger').remove();
 
				 if (json['redirect']) {
					 location = json['redirect'];
				 }
 
				 if (json['success']) {
					 $('#content').parent().before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
 
					 // Need to set timeout otherwise it wont update the total
					 setTimeout(function () {
						 $('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
					 }, 100);
 
					 $('html, body').animate({ scrollTop: 0 }, 'slow');
 
					 $('#cart > ul').load('index.php?route=common/cart/info ul li');
				 }
			 },
			 error: function(xhr, ajaxOptions, thrownError) {
				 alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			 }
		 });
	 },
	 'update': function(key, quantity) {
		 $.ajax({
			 url: 'index.php?route=checkout/cart/edit',
			 type: 'post',
			 data: 'key=' + key + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			 dataType: 'json',
			 beforeSend: function() {
				 $('#cart > button').button('loading');
			 },
			 complete: function() {
				 $('#cart > button').button('reset');
			 },
			 success: function(json) {
				 // Need to set timeout otherwise it wont update the total
				 setTimeout(function () {
					 $('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
				 }, 100);
 
				 if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					 location = 'index.php?route=checkout/cart';
				 } else {
					 $('#cart > ul').load('index.php?route=common/cart/info ul li');
				 }
			 },
			 error: function(xhr, ajaxOptions, thrownError) {
				 alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			 }
		 });
	 },
	 'remove': function(key) {
		 $.ajax({
			 url: 'index.php?route=checkout/cart/remove',
			 type: 'post',
			 data: 'key=' + key,
			 dataType: 'json',
			 beforeSend: function() {
				 $('#cart > button').button('loading');
			 },
			 complete: function() {
				 $('#cart > button').button('reset');
			 },
			 success: function(json) {
				 // Need to set timeout otherwise it wont update the total
				 setTimeout(function () {
					 $('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
				 }, 100);
				 
				 var now_location = String(document.location.pathname);
 
				 if ((now_location == '/cart/') || (now_location == '/checkout/') || (getURLVar('route') == 'checkout/cart') || (getURLVar('route') == 'checkout/checkout')) {
					 location = 'index.php?route=checkout/cart';
				 } else {
					 $('#cart > ul').load('index.php?route=common/cart/info ul li');
				 }
			 },
			 error: function(xhr, ajaxOptions, thrownError) {
				 alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			 }
		 });
	 }
 }
 
 var voucher = {
	 'add': function() {
 
	 },
	 'remove': function(key) {
		 $.ajax({
			 url: 'index.php?route=checkout/cart/remove',
			 type: 'post',
			 data: 'key=' + key,
			 dataType: 'json',
			 beforeSend: function() {
				 $('#cart > button').button('loading');
			 },
			 complete: function() {
				 $('#cart > button').button('reset');
			 },
			 success: function(json) {
				 // Need to set timeout otherwise it wont update the total
				 setTimeout(function () {
					 $('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
				 }, 100);
 
				 if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					 location = 'index.php?route=checkout/cart';
				 } else {
					 $('#cart > ul').load('index.php?route=common/cart/info ul li');
				 }
			 },
			 error: function(xhr, ajaxOptions, thrownError) {
				 alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			 }
		 });
	 }
 }
 
 var wishlist = {
	 'add': function(product_id) {
		 $.ajax({
			 url: 'index.php?route=account/wishlist/add',
			 type: 'post',
			 data: 'product_id=' + product_id,
			 dataType: 'json',
			 success: function(json) {
				 $('.alert').remove();
 
				 if (json['redirect']) {
					 location = json['redirect'];
				 }
 
				 if (json['success']) {
					 $('#content').parent().before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				 }
 
				 $('#wishlist-total span').html(json['total']);
				 $('#wishlist-total').attr('title', json['total']);
 
				 $('html, body').animate({ scrollTop: 0 }, 'slow');
			 },
			 error: function(xhr, ajaxOptions, thrownError) {
				 alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			 }
		 });
	 },
	 'remove': function() {
 
	 }
 }
 
 var compare = {
	 'add': function(product_id) {
		 $.ajax({
			 url: 'index.php?route=product/compare/add',
			 type: 'post',
			 data: 'product_id=' + product_id,
			 dataType: 'json',
			 success: function(json) {
				 $('.alert').remove();
 
				 if (json['success']) {
					 $('#content').parent().before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
 
					 $('#compare-total').html(json['total']);
 
					 $('.compare-link, .mob_compare').removeClass('d-none');
					 $('.compare-link > span, .mob_compare > span').html(json['total'].replace(/[^0-9.]/g, ""));
 
					 $('html, body').animate({ scrollTop: 0 }, 'slow');
				 }
			 },
			 error: function(xhr, ajaxOptions, thrownError) {
				 alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			 }
		 });
	 },
	 'remove': function() {
 
	 }
 }
 
 /* Agree to Terms */
 $(document).delegate('.agree', 'click', function(e) {
	 e.preventDefault();
 
	 $('#modal-agree').remove();
 
	 var element = this;
 
	 $.ajax({
		 url: $(element).attr('href'),
		 type: 'get',
		 dataType: 'html',
		 success: function(data) {
			 html  = '<div id="modal-agree" class="modal">';
			 html += '  <div class="modal-dialog">';
			 html += '    <div class="modal-content">';
			 html += '      <div class="modal-header">';
			 html += '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
			 html += '        <h4 class="modal-title">' + $(element).text() + '</h4>';
			 html += '      </div>';
			 html += '      <div class="modal-body">' + data + '</div>';
			 html += '    </div';
			 html += '  </div>';
			 html += '</div>';
 
			 $('body').append(html);
 
			 $('#modal-agree').modal('show');
		 }
	 });
 });
 
 // Autocomplete */
 (function($) {
	 $.fn.autocomplete = function(option) {
		 return this.each(function() {
			 this.timer = null;
			 this.items = new Array();
 
			 $.extend(this, option);
 
			 $(this).attr('autocomplete', 'off');
 
			 // Focus
			 $(this).on('focus', function() {
				 this.request();
			 });
 
			 // Blur
			 $(this).on('blur', function() {
				 setTimeout(function(object) {
					 object.hide();
				 }, 200, this);
			 });
 
			 // Keydown
			 $(this).on('keydown', function(event) {
				 switch(event.keyCode) {
					 case 27: // escape
					 this.hide();
					 break;
					 default:
					 this.request();
					 break;
				 }
			 });
 
			 // Click
			 this.click = function(event) {
				 event.preventDefault();
 
				 value = $(event.target).parent().attr('data-value');
 
				 if (value && this.items[value]) {
					 this.select(this.items[value]);
				 }
			 }
 
			 // Show
			 this.show = function() {
				 var pos = $(this).position();
 
				 $(this).siblings('ul.dropdown-menu').css({
					 top: pos.top + $(this).outerHeight(),
					 left: pos.left
				 });
 
				 $(this).siblings('ul.dropdown-menu').show();
			 }
 
			 // Hide
			 this.hide = function() {
				 $(this).siblings('ul.dropdown-menu').hide();
			 }
 
			 // Request
			 this.request = function() {
				 clearTimeout(this.timer);
 
				 this.timer = setTimeout(function(object) {
					 object.source($(object).val(), $.proxy(object.response, object));
				 }, 200, this);
			 }
 
			 // Response
			 this.response = function(json) {
				 html = '';
 
				 if (json.length) {
					 for (i = 0; i < json.length; i++) {
						 this.items[json[i]['value']] = json[i];
					 }
 
					 for (i = 0; i < json.length; i++) {
						 if (!json[i]['category']) {
							 html += '<li data-value="' + json[i]['value'] + '"><a href="#">' + json[i]['label'] + '</a></li>';
						 }
					 }
 
					 // Get all the ones with a categories
					 var category = new Array();
 
					 for (i = 0; i < json.length; i++) {
						 if (json[i]['category']) {
							 if (!category[json[i]['category']]) {
								 category[json[i]['category']] = new Array();
								 category[json[i]['category']]['name'] = json[i]['category'];
								 category[json[i]['category']]['item'] = new Array();
							 }
 
							 category[json[i]['category']]['item'].push(json[i]);
						 }
					 }
 
					 for (i in category) {
						 html += '<li class="dropdown-header">' + category[i]['name'] + '</li>';
 
						 for (j = 0; j < category[i]['item'].length; j++) {
							 html += '<li data-value="' + category[i]['item'][j]['value'] + '"><a href="#">&nbsp;&nbsp;&nbsp;' + category[i]['item'][j]['label'] + '</a></li>';
						 }
					 }
				 }
 
				 if (html) {
					 this.show();
				 } else {
					 this.hide();
				 }
 
				 $(this).siblings('ul.dropdown-menu').html(html);
			 }
 
			 $(this).after('<ul class="dropdown-menu"></ul>');
			 $(this).siblings('ul.dropdown-menu').delegate('a', 'click', $.proxy(this.click, this));
 
		 });
	 }
 })(window.jQuery);
 