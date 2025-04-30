$('input').blur(function (){
	let label = $(this).parent().find('label')
	$(this).val().length > 0 ? label.addClass('active') : label.removeClass('active')
})
$(document).keypress(
	function(event){
		if (event.which == '13') {
			event.preventDefault();
		}
	});
$('.js-slide__toggle').on('click', function () {
	$(this).toggleClass('active');
	$(this).parent().find('.js-slide__content').slideToggle()
})

$('.burger').on('click', function (){
	$('.profile-menu').removeClass('open')
	$('.notify-menu-wrapper').removeClass('open')
	$(this).toggleClass('active');
	$('nav.menu').toggleClass('open')
	$('.menu-overlay').toggle()
})
$('.js-open-profile-menu').on('click', function (){
	$('.burger').removeClass('active');
	$('.menu').removeClass('open');
	$('.notify-menu-wrapper').removeClass('open');
	$('.profile-menu').toggleClass('open');
	$('.menu-overlay').toggle();
})
$('.menu-overlay').click(function(){
	$(this).hide()
	$('.open').removeClass('open');
	$('.burger').removeClass('active');
})

$('.js-open-notify').on('click', function(e){
	e.preventDefault();
	$('.burger').removeClass('active');
	$('.menu').removeClass('open');
	$('.profile-menu').removeClass('open');
	$('.notify-menu-wrapper').toggleClass('open');
	if($(this).hasClass('profile-menu__item')){
		$('.menu-overlay').show()
	} else {
		$('.menu-overlay').toggle()
	}


})

$('.mobile_filters, .close_filters').on('click', function(){
	$('body').toggleClass('noscroll')
	$('.translators-filter').toggleClass('open')
})

$('#remoteCheckbox').on('change', function(){
	if($(this).prop('checked') == true) {
		$('#form-step__address').prop('disabled', true)
	} else {
		$('#form-step__address').prop('disabled', false)
	}
})
$('.sorting-mobile-btn').on('click', function(e){
	e.stopPropagation();
	$(this).parent().find('.dropdown-list').toggleClass('open');
	$(this).parent().find('.dropdown-list').show()
});


/*$('.forms-language input').on('blur', function(){
 console.log('new ajax')
 })*/
$(document).on('click', '.dropdown-list__item', function(e){
//$('.dropdown-list__item').on('click', function (e){
	e.stopPropagation();
	//$(this).parent().hide().removeClass('open')
	var id = $(this).data('id');
	$(this).parent().parent().find('.dirty').removeClass('dirty')
	$(this).closest('.dropdown-group').find('input[type=hidden]').val(id);
	$(this).parent().parent().find('input').removeClass('dirty');
	$(this).parent().parent().find('input').removeClass('error');
	$(this).parent().parent().find('.error-text').hide()
	let inp = $(this).closest('.dropdown-group').find('input[type=text]');
	let label = $(this).closest('.dropdown-group').find('label');
	label.addClass('active');
	inp.val($(this).find('span').first().text().trim());

	var targetContainer = $('#catalog_ajax'), // Контейнер, в котором хранятся элементы
		url = $(this).attr('data-href');
	if (url !== undefined) {
		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'html',
			beforeSend: function() {
				//$('body').after('<div class="preloader"><div class="preloader-icon"><img src="/local/templates/new_ru/assets/images/preloader.gif"></div></div>')
			},
			success: function(data){

				var elements = $(data).find('#catalog_ajax_in'); // Ищем элементы

				targetContainer.html(elements); // Добавляем посты в конец контейнера

				dynamic_change_url(url);

				$('.mobile_filters').on('click', function(){
					$('body').addClass('noscroll')
					$('.translators-filter').addClass('open')
				});
				$('.close_filters').on('click', function(){
					$('body').removeClass('noscroll')
					$('.translators-filter').removeClass('open')
				});
				setTimeout( function(){
					$('.preloader').remove();
				}, 500);
			}
		})
	}

	runAjaxFilter();
	//$('.open').removeClass('open');
})
$('.translate-type input').on('click', function(e){
	if($(this).hasClass('open')){
		$(this).removeClass('open');
	} else {
		$(this).addClass('open');
	}
})

$('.translate-type').on('click', function(e){
	e.stopPropagation();
	$(this).find('.dropdown-list__item').on('click', function(){
		var id = $(this).data('id');
		$(this).closest('.dropdown-group').find('input[type=hidden]').val(id);
		$(this).parent().parent().find('input').removeClass('dirty');
		$(this).parent().parent().find('input').removeClass('error');
		$(this).parent().parent().find('.error-text').hide()
		let inp = $(this).closest('.dropdown-group').find('input[type=text]');
		let label = $(this).closest('.dropdown-group').find('label');
		label.addClass('active');
		inp.val($(this).find('span').first().text().trim());

		var targetContainer = $('#catalog_ajax'), // Контейнер, в котором хранятся элементы
			url = $(this).attr('data-href');
		if (url !== undefined) {
			$.ajax({
				type: 'GET',
				url: url,
				dataType: 'html',
				success: function(data){
					var elements = $(data).find('#catalog_ajax_in'); // Ищем элементы

					targetContainer.html(elements); // Добавляем посты в конец контейнера
					dynamic_change_url(url);
				}
			})
		}
		$('.translate-type .open').removeClass('open');
		$('.dropdown-list__hassub.open').removeClass('open');
		runAjaxFilter();
	})
})

function closeaAll(){
	$('.dropdown-list__hassub.open').removeClass('open');
	$(document).removeClass('open');
}
$('.dropdown-list__hassub span').on('click', function(e){
	$(this).parent().toggleClass('open')

})
$(document).on('click', '.load_more_in', function(){

	var targetContainer = $('#news-list'),
		pagerCont = $('#respage_number'),// Контейнер, в котором хранятся элементы
		url = $('.load_more_in').attr('data-url'); // URL, из которого будем брать элементы

	if (url !== undefined) {
		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'html',
			success: function(data){

				// Удаляем старую навигацию
				$('.load_more_in').remove();

				var elements = $(data).find('.news-item'),
					pagination_in = $(data).find('.page_number'),// Ищем элементы
					pagination = $(data).find('.load_more_in');// Ищем навигацию

				targetContainer.append(elements); // Добавляем посты в конец контейнера
				targetContainer.append(pagination); // добавляем навигацию следом
				pagerCont.html(pagination_in);

			}
		})
	}

});



function dynamic_change_url(link){
	window.history.pushState("", "", link);
	window.history.replaceState("", "", link);

}

$('.js-login').on('click', function(){
	$(this).parent().find('input').each(function(){
		if($(this).val()){
			$(this).removeClass('error')
			$(this).parent().find('.error-text').fadeOut()
		} else {
			$(this).removeClass('error')
			$(this).parent().find('.error-text').fadeOut()
		}
	})
})
$(function (){
	$('input').each(function (){
		let label = $(this).parent().find('label')
		$(this).val().length > 0 ? label.addClass('active') : label.removeClass('active')
	})
})
function isEmail(email) {
	var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(email);
}
$(document).ready(function(){

	let audio = document.getElementById("audio");    // Берём элемент audio


	if(audio) {
		const player = new Plyr('#audio', {
			controls:['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions']
		})
	}

	//$(document).on('blur', '.filterform input', function(){


	$("input[type=email]").on("blur", function(){
		var emailVal = $(this).val();

		if(isEmail(emailVal)) {
			$(this).removeClass('error');
			$(this).parent().find('.error-text').fadeOut();
		} else {
			$(this).addClass('error');
			$(this).parent().find('.error-text').fadeIn();
		}

	})

	$(".js-nonumbers").on("input", function(){
		$(this).val( $(this).val().replace(/[^a-zA-ZА-Яа-яЁё\s]/ig,'') );
	});
	$(".js-notext").on("input", function(){
		$(this).val('');
	});

	$("input[name=phone]").on('focus', function(){
		$(this).one('mouseup', function () {
			$(this).select();
			return false;
		}).select();

	}).mask("+7 (999) 999-99-99");

	$.fn.setCursorPosition = function(pos) {
		if ($(this).get(0).setSelectionRange) {
			$(this).get(0).setSelectionRange(pos, pos);
		} else if ($(this).get(0).createTextRange) {
			var range = $(this).get(0).createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	};
	$('.modalbox').on('click',function(e){
		e.preventDefault();
		$('#startTask').fadeIn()
	})
	$('.modalthnx').on('click',function(e){
		e.preventDefault();
		$('.modal').fadeOut()
		$('#taskCreated').fadeIn()
	})
	$('#forms-language__buget').on('click', function(){
		$(this).val('');
	})
	$('#forms-language__buget').on('blur', function(){
		if(!$(this).val()) {
			$(this).val(0)
		}
		$(this).parent().find('label').addClass('active');
		runAjaxFilter()
	})
	$('#forms-language__buget').on('keyup', function(){
		setTimeout( function(){
			runAjaxFilter()
		}, 1000)
	})
	$('.js-smartmultiselect').on('input', function(){
		$(this).parent().addClass('open')
		var inputValue = $.trim($(this).val()).toLowerCase(),
			i = 0,
			$menuElements = $(this).parent().parent().find('.checkbox-list li'),
			len = $menuElements.length;
		if (inputValue !== '') {
			$menuElements.hide();
			for (; i < len; i += 1) {

				if (inputValue === $menuElements.eq(i).find('span').text().toLowerCase().substr(0, inputValue.length)) {
					$menuElements.eq(i).show();
				}
			}
		} else {
			$menuElements.show();
		}

		$(this).parent().parent().find('.list-item__smart-checkbox__item').on('click', function(){
			inputValue = '';
			$(this).parent().parent().find('.js-smartmultiselect').val('')
			$menuElements.show();
		})
	});

	//$('.js-smartinput').val('');
	if($('.js-smartinput').val()){
		$(this).parent().find('label').addClass('active')
	}
	$('.js-smartinput').on('click', function(){
		$(this).val('');
		$(this).addClass('dirty');
	})
	$('.js-smartinput').on('blur', function(){
		//
		if($(this).hasClass('dirty')){
			$(this).removeClass('dirty').addClass('error')
			$(this).parent().find('.error-text').show()
		}


	})
	$('.js-smartinput').keyup(function(e){

		var inputValue = $.trim($(this).val()).toLowerCase(),
			i = 0,
			$menuElements = $(this).parent().find('.dropdown-list li'),
			len = $menuElements.length;
		if (inputValue !== '') {
			$menuElements.hide();
			for (; i < len; i += 1) {
				if (inputValue === $menuElements.eq(i).text().toLowerCase().substr(0, inputValue.length)) {
					$menuElements.eq(i).show();
				}
			}
		} else {
			$menuElements.show();
		}

	});
	/*$('.filterform input').blur(function(){
	 runAjaxFilter();
	 })*/

	$('.modal-overlay, .modal_close, .btn-close, .edit-modal .btn-save').on('click',function(e){
		e.preventDefault();
		$('body').removeClass('noscroll');
		$('.modal').fadeOut();
	})

	var zone = $(".page-load_gallery");
	var zoneMedia = $(".page-load-video_gallery");
	var loadEdu = $(".load-edu, .load-edu .loadfiles-text");
	var loadDoc = $(".load-doc");
	var loadOrderFiles = $(".drop_files");
	var galery = document.getElementById("load");
	var idd = $('.drop_files.first_file').data("id");

	zone.dropzone({
		url: '/upload.php?id='+idd,
		previewsContainer: "#load",
		acceptedFiles: "image/*",
		previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><span class=\"dz-delete\" data-dz-remove></span><div class=\"dz-container\"><img data-dz-thumbnail /></div></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Check</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Error</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>"

	});

	zoneMedia.dropzone({
		url: "/content1",
		previewsContainer: "#loadMedia",
		acceptedFiles: "video/mp4,.mp3",
		previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><span class=\"dz-delete\" data-dz-remove></span><div class=\"dz-container\"><img data-dz-thumbnail /> <video class=\"dz-video\" id=\"video\" data-dz-thumbnail /></video></div></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Check</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Error</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>",

		init: function(){
			// for video files, use frame-grab to generate a preview.
			this.on("addedfile", function(file) {

				// check file extension, see:
				// http://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript
				var comps = file.name.split(".");
				if (comps.length === 1 || (comps[0] === "" && comps.length === 2)) {
					return;
				}
				var ext = comps.pop().toLowerCase();
				if (ext == 'mov' || ext == 'mpeg' || ext == 'mp4' || ext == 'wmv') {

					// create a hidden <video> element with video file.
					FrameGrab.blob_to_video(file).then(
						function videoRendered(videoEl) {

							// extract video frame at 1 sec into a 160px image and
							// set to the <img> element.
							var frameGrab = new FrameGrab({video: videoEl});
							var imgEl = file.previewElement.querySelector("img");
							$(imgEl).toggleClass("video-cont");
							frameGrab.grab(imgEl, 1, 368).then(
								function frameGrabbed(itemEntry) {

								},
								function frameFailedToGrab(reason) {
									console.log("Can't grab the video frame from file: " +
										file.name + ". Reason: " + reason);
								}
							);
						},
						function videoFailedToRender(reason) {
							console.log("Can't convert the file to a video element: " +
								file.name + ". Reason: " + reason);
						}
					);
				}
			});
			this.on("success", function(file) {
				$(".dz-container img").each(function(index){
					if($(this).hasClass("video-cont")){
						$(this).parent().parent().css("max-width","368px").css("width","368px").css("max-height","207px").css("height","207px");
					}
				})
			});
		}
	});

	loadEdu.dropzone({ url: "/content2",
		previewsContainer: "#loadEdu",
		acceptedFiles: "image/*",
		previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><span class=\"dz-delete\" data-dz-remove></span><div class=\"dz-container\"><img data-dz-thumbnail /></div></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Check</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Error</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>"
	});

	loadDoc.dropzone({ url: "/content3",
		previewsContainer: "#loadDoc",
		acceptedFiles: "image/*",
		previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><span class=\"dz-delete\" data-dz-remove></span><div class=\"dz-container\"><img data-dz-thumbnail /></div></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Check</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Error</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>"
	});

	loadOrderFiles.dropzone({ url: '/upload.php?id='+idd,
		previewsContainer: "#loadOrderFiles",
		acceptedFiles: "image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.tsv,.ppt,.pptx,.pages,.odt,.rtf",
		maxFilesize:5,
		thumbnailWidth:80,
		thumbnailHeight:80,
		previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><span class=\"dz-delete\" data-dz-remove></span><div class=\"dz-container\"><img data-dz-thumbnail /</div></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Check</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n<path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Error</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\"></path>\n</g>\n </g>\n</svg>\n</div>\n</div> ",
		addRemoveLinks: true,
		removedfile: function(file) {
			var name = file.name;
			$.ajax({
				type: 'POST',
				url: '/delete.php',
				data: "id="+name,
				dataType: 'html'
			});
			var _ref;
			return (_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
		},
		init: function() {
			var idd = $('.drop_files.first_file').data("id");
			/*this.on("addedfile", function () {
			 $('.drop_files.first_file').css({'display': 'none'});
			 })*/
			var thisDropzone = this;

			$.get('/upload.php?id='+idd, function (data) {
				console.log(data);
				$.each(data, function (key, value) {
					var mockFile = {name: value.name, size: value.size};
					thisDropzone.options.addedfile.call(thisDropzone, mockFile);
					thisDropzone.options.thumbnail.call(thisDropzone, mockFile, "/uploads/"+idd+"/" + value.name);

				});

			});
		}
	});

	$('.js-cancel').on('click', function(e){
		e.preventDefault();
		$('body').removeClass('noscroll');
		$(this).parent().parent().fadeOut()
	})
	$('.js-delete-person_photo').on('click', function(){
		$('.js-current-photo').remove();
	})
	$('.js-delete-logo').on('click', function(){
		$('.js-current-logo').remove();
	})

	$('.js-change-person_photo').dropzone({ url: "/photo_person.php", thumbnailHeight:196, thumbnailWidth:196,
		previewsContainer: ".js-no_photo",
		acceptedFiles: "image/*",
		maxFiles: 1,
		previewTemplate: "<div class=\"dz-preview dz-file-preview personal-preview\">\n  <div class=\"dz-image\"><span class=\"dz-edit\">Изменить фото</span><span class=\"dz-delete\" data-dz-remove>Удалить фото</span><div class=\"dz-image-overlay\"></div><div class=\"dz-container\"><img data-dz-thumbnail /></div></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Check</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Error</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>",

		init: function(){
			this.on("addedfile", function() {
				$('.js-current-photo').remove();
			})

		}
	});

	$('.settings_nav_item').on('click', function(e){
		e.preventDefault();
		let pageId = $(this).data('page');
		$('#header').addClass('pageopen');
		$('.settings_menu a').removeClass('active');
		$('.settings_menu a[data-page="'+pageId+'"]').addClass('active');
		$('.settings-page').fadeOut(function(){

		});
		$("html, body").animate({
			scrollTop: 0
		}, 300)
		$('.settings-page'+'.'+pageId).fadeIn();
		$('.btn-back').on('click', function(e){
			e.preventDefault();
			$("html, body").animate({
				scrollTop: 0
			}, 300)
			$('#header').removeClass('pageopen');
			$('.settings-page'+'.'+pageId).fadeOut();
			$('.settings-page.page1').fadeIn();
		})
	});

	$('.add-education').on('click', function(e){
		e.preventDefault();
		modalActive();
		$('.modal_header-title').text('Добавить образование')
		$('#modalEdit').fadeIn();
	});

	$('.edit_education').on('click', function(e){
		e.preventDefault();
		modalActive();
		$('.modal_header-title').text('Редактировать образование')
		$('#modalEdit').fadeIn();
	});

	$('.edit_doc_btn').on('click', function(e){
		e.preventDefault();
		modalActive();
		$('.modal_header-title').text('Редактировать документ')
		$('#modalEditDoc').fadeIn();
	});

	$('.add-doc').on('click', function(e){
		e.preventDefault();
		modalActive();
		$('.modal_header-title').text('Добавить документ')
		$('#modalEditDoc').fadeIn();
	});

	$('.add-service').on('click', function(e){
		e.preventDefault();
		modalActive();
		$('.modal_header-title').text('Добавить услугу')
		$('#modalEditService').fadeIn();
	});

	$('.profile-new-add-service').on('click', function(e){
		e.preventDefault();
		modalActive();
		// $('.modal_header-title').text('Добавить услугу')
		$('#modalAddService').fadeIn();
	});

	$('.edit_service_btn').on('click', function(e){
		e.preventDefault();
		modalActive();
		// $('.modal_header-title').text('Редактировать услугу')
		$('#modalEditService').fadeIn();
	});

	$('.add-themes').on('click', function(e){
		e.preventDefault();
		modalActive();
		$('#modalEditThemes').fadeIn();
	});

	$('.login_modal').on('click', function(e){
		$('.modal').fadeOut()
		e.preventDefault();
		$('#modalReg').fadeIn();
	});

	$('.have-acc').on('click', function(e){
		e.preventDefault();
		$('.modal').fadeOut()
		$('#modalLogin').fadeIn();
	});

	$('.modal_body .tag').on('click', function(){
		$(this).toggleClass('active')
	});

	$('.tasks-filter__item').on('click', function(){
		$('.tasks-filter__item').removeClass('active')
		$(this).addClass('active')
	});

	$('.delete_account').on('click', function(e){
		e.preventDefault();
		$('#modalDelete').fadeIn();
	});

	$('.add-education').on('click', function(e) {
		e.preventDefault();
		$('#modalAddEducation').fadeIn();
	});

	$('.send-to-check').on('click', function(e) {
		e.preventDefault();
		$('#modalAccountVerify').fadeIn();
	});

	$('.order-edit-file-add').on('click', function(e) {
		e.preventDefault();
		$('#addFiles').fadeIn();
	});

	$('.btn-edit-order').on('click', function(e){
		e.preventDefault();
		modalActive();
		$('#editOrder').fadeIn();
	});

	$('.order-edit-delete').on('click', function(e) {
		e.preventDefault();
		$('body').removeClass('noscroll');
		$('.modal').fadeOut();
		$('#orderRemove').fadeIn();
	});

	$('.edit-order-mobile').on('click', function(e) {
		e.preventDefault();
		$('body').removeClass('noscroll');
		$('.modal').fadeOut();
		$('#editOrderMobile').fadeIn();
	});





	function modalActive(){
		$('body').addClass('noscroll')
	}

	$('.remove-all').on('click', function(e){
		e.preventDefault();
		$(this).parent().find('input[type=checkbox]').each(function(){

			$(this).prop('checked', false)
		})
	})

	$('.open_full').on('click', function(e){
		e.preventDefault();
		$(this).parent().addClass('full')
	})

	$('#forms-language__themes').on('blur', function(){
		var textLine = '';
		var idLine = '';
		$(this).parent().find('input[type=checkbox]').each(function(){
			if($(this).prop('checked')) {
				var id = $(this).val();
				var txt = $(this).parent().find('span').text()
				textLine = textLine + txt +  ',';
				idLine = idLine + id +  ',';
			}
		})

		if(textLine){
			$(this).parent().find('label').addClass('active')
		}
		$(this).val(textLine)
		$(this).parent().find('input[type=hidden]').val(idLine)
	})

	$('.checkbox_dropdown input[type=text]').each(function(){
		var textLine = '';
		var idLine = '';
		$(this).parent().find('input[type=checkbox]').each(function(){
			if($(this).prop('checked')) {
				var txt = $(this).parent().find('span').text()
				var id = $(this).val();
				textLine = textLine + txt +  ','
				idLine = idLine + id +  ',';
			}
		})
		if(textLine){
			$(this).parent().find('label').addClass('active')
		}
		$(this).val(textLine)
		$(this).parent().find('input[type=hidden]').val(idLine)
	});

	$('.more-filters_btn').on('click', function(){
		$(this).toggleClass('open');
		$('.more-filters__inner').toggleClass('open')
	})

	$(window).on('click', function(){
		$('.checkbox_dropdown, .temes__inner').removeClass('open');
		$('.translate-type input.open').removeClass('open')
		$('.dropdown-list__hassub.open').removeClass('open');
		$('.js-smartinput.error').val('');
		$('.js-smartinput.error').parent().find('label').removeClass('active')
	})

	$('.checkbox_dropdown input[type=text]').on('click', function(e){
		e.stopPropagation();
		$(this).parent().toggleClass('open');
	});

	$('.list-item__smart-checkbox__item').each(function () {
		var currentVal = [];
		var idLine = '';
		$(this).parent().find('input[type=checkbox]').each(function(){
			if($(this).prop('checked')) {
				var txt = $(this).parent().find('span').text()
				currentVal.push(txt)
				var id = $(this).val();
				idLine = idLine + id +  ',';
			}
		})
		$(this).parent().parent().find('input[type=hidden]').val(idLine)
		$('.temes__inner .smart-tag').remove();
		$(currentVal).each(function(el, name){
			$('#form-step__subjects').before('<span class="smart-tag">' + name + '<i class="del-tag close_w"></i></span>')
		})
		$('.temes__inner').scrollTop($('.temes__inner')[0].scrollHeight);

		$('.smart-tag .del-tag').on('click', function(e){
			e.stopPropagation()
			var txt = $(this).parent().text();
			$(this).parent().parent().parent().find('input[type=checkbox]').each(function(index, val){
				if(txt === $(this).parent().find('span').text()){
					$(this).prop('checked', false);
				}
			});
			$(this).parent().remove();
			$(this).parent().find('input[type=checkbox]').each(function(){
				if($(this).prop('checked')) {
					var txt = $(this).parent().find('span').text()
					currentVal.push(txt)
				}
			})
		})
	})

	$('.list-item__smart-checkbox__item').on('click', function (e) {
		e.stopPropagation()
		var currentVal = [];
		var idLine = '';
		$(this).parent().find('input[type=checkbox]').each(function(){
			if($(this).prop('checked')) {
				var txt = $(this).parent().find('span').text()
				currentVal.push(txt)
				var id = $(this).val();
				idLine = idLine + id +  ',';
			}
		})
		$(this).parent().parent().find('input[type=hidden]').val(idLine)
		$('.temes__inner .smart-tag').remove();
		$(currentVal).each(function(el, name){
			$('#form-step__subjects').before('<span class="smart-tag">' + name + '<i class="del-tag close_w"></i></span>')
		})
		$('.temes__inner').scrollTop($('.temes__inner')[0].scrollHeight);

		$('.smart-tag .del-tag').on('click', function(e){
			e.stopPropagation()
			var txt = $(this).parent().text();
			$(this).parent().parent().parent().find('input[type=checkbox]').each(function(index, val){
				if(txt === $(this).parent().find('span').text()){
					$(this).prop('checked', false);
				}
			});
			$(this).parent().remove();
			$(this).parent().find('input[type=checkbox]').each(function(){
				if($(this).prop('checked')) {
					var txt = $(this).parent().find('span').text()
					currentVal.push(txt)
				}
			})
		})
	})

	$('.list-item__checkbox input').on('change', function (e) {
		runAjaxFilter()
	})

	$('.list-item__checkbox__item').on('click', function (e) {
		e.stopPropagation()
		var thisInput = $(this).parent().parent().find('input[type=text]');
		var currentVal = '';
		var idLine = '';
		$(this).parent().find('input[type=checkbox]').each(function(){

			if($(this).prop('checked')) {
				var txt = $(this).parent().find('span').text()
				var id = $(this).val();
				idLine = idLine + id +  ',';
				return currentVal = currentVal + txt +  ','
			}
		})
		if(currentVal){
			thisInput.parent().find('label').addClass('active')
		} else {
			thisInput.parent().find('label').removeClass('active')
		}
		thisInput.parent().find('input[type=hidden]').val(idLine)
		thisInput.val(currentVal)
		runAjaxFilter()
	})

	if(window.innerWidth > 450 ) {
		$('.item-edit').on('click', function(e){
			$('.item-edit.active').removeClass('active')
			e.preventDefault();
			e.stopPropagation();
			$(this).addClass('active')

		})
		$(".page-person_photo").dropzone({ url: "/photo_person.php", thumbnailHeight:196, thumbnailWidth:196,
			acceptedFiles: "image/*",
			maxFiles: 1,
			previewTemplate: "<div class=\"dz-preview dz-file-preview personal-preview\">\n  <div class=\"dz-image\"><span data-dz-remove class=\"dz-delete js-delete-person_photo\">Удалить фото</span><div class=\"dz-image-overlay\"></div><div class=\"dz-container\"><img data-dz-thumbnail /></div></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Check</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Error</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>",

		});
		$(".page-logo_photo").dropzone({ url: "/photo_logo.php",
			acceptedFiles: "image/*",
			maxFiles: 1,
			previewTemplate: "<div class=\"dz-preview dz-file-preview personal-preview\">\n  <div class=\"dz-image\"><span class=\"dz-delete\" data-dz-remove>Удалить лого</span><div class=\"dz-image-overlay\"></div><div class=\"dz-container\"><img data-dz-thumbnail /></div></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Check</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Error</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>"

		});

	}


	$('.reset-filters').on('click', function(e){
		e.preventDefault();
		$('.forms-language').find('label.active').removeClass('active')
		$('.forms-language').find('input[type=text]').val('')
		$('.forms-language').find('input[type=hidden]').val('')
		$('#forms-language__location').prop('disabled', false)
		$('.price-filter').find('label').addClass('active')
		$('.language__buget').val(0)
		$('.smart-tag').remove();
		$('.forms-language').find('input[type=checkbox]').prop('checked', false);
		runAjaxFilter()
	})

	$(window).click(function() {
		$('.item-edit.active').removeClass('active')
	});

	if(window.innerWidth < 450 ) {
		/* $('.catalogue .languages_tags').each(function(){
		var wrapper = $(this);
		var tags = wrapper.find('.tag').length -2;
		wrapper.find('.more_tags').text('+' + tags)
		});*/

		$('.education_item-edit').on('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			modalActive();
			$('.item-edit.active').removeClass('active')
			$('.mobile-item-education__edit').fadeIn()

		})
		$('.service_item-edit').on('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			modalActive();
			$('.item-edit.active').removeClass('active')
			$('.mobile-item-service__edit').fadeIn()

		})
		$('.doc_item-edit').on('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			modalActive();
			$('.item-edit.active').removeClass('active')
			$('.mobile-item-doc__edit').fadeIn()

		})
		$('.js-transator').on('click', function(){
			var url = $(this).data('url');
			window.location.href = url;
		})
		$(".edit_photo_btn").dropzone({
			url: "/photo_person.php",
			previewsContainer: ".js-no_photo",
			acceptedFiles: "image/*",
			maxFiles: 1,
			previewTemplate: "<div class=\"dz-preview dz-file-preview js-current-photo\">\n  <div class=\"dz-image\"><span class=\"dz-delete\" data-dz-remove></span><div class=\"dz-container\"><img data-dz-thumbnail /></div></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Check</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Error</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>",
			init: function(){
				this.on("addedfile", function() {
					if($('.js-current-photo').length > 1){$('.js-current-photo')[0].remove();}
					$('.mobile-item__edit').hide();
					$('body').removeClass('noscroll');
				})

			}
		});

		$('.page-person_photo').on('click', function(e){
			e.preventDefault();
			modalActive();
			$('.mobile-item-photo__edit').fadeIn();
		});
		$('.page-logo_photo').on('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			modalActive();
			$('.item-edit.active').removeClass('active')
			$('.mobile-item-logo__edit').fadeIn();

		})
		$(".edit_logo_btn").dropzone({
			url: "/contentL",
			acceptedFiles: "image/*",
			previewsContainer: ".js-no_logo",
			maxFiles: 1,
			previewTemplate: "<div class=\"js-current-logo dz-preview dz-file-preview logo-preview\">\n  <div class=\"dz-image\"><div class=\"dz-image-overlay\"></div><div class=\"dz-container\"><img data-dz-thumbnail /></div></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Check</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Error</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>",
			init: function(){
				this.on("addedfile", function() {
					if($('.js-current-logo').length > 1){$('.js-current-photo')[0].remove();}
					$('.mobile-item-logo__edit').hide();
					$('body').removeClass('noscroll');
				})

			}

		});
		$('.menu__title').on('click', function(){
			$(this).toggleClass('open')

		});
	}
	$('.reviews-top .reviews-top__list .reviews-top__item').on('click', function(){
		$(this).addClass('open')
	})

	// add doc profile-new.html

	$('.edu-doc-add, .edu-doc-icon').dropzone({ url: "/upload-doc",
	previewsContainer: ".edu-doc-add-container",
	acceptedFiles: "image/*,application/pdf",
	previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><span class=\"dz-delete\" data-dz-remove></span><div class=\"dz-container\"><img data-dz-thumbnail /></div></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Check</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Error</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>"

	});

	$('.file-add-container, .file-icon, .loadfiles-btn').dropzone({ url: "/upload-doc",
	previewsContainer: ".file-added-container",
	acceptedFiles: "image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.tsv,.ppt,.pptx,.pages,.odt,.rtf",
	previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><span class=\"dz-delete\" data-dz-remove></span><div class=\"dz-container\"><img data-dz-thumbnail /></div></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Check</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Error</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>"

	})


	$('#distance1').on('change', function(){
		$('.address-input').prop('disabled', true);
	})
	$('#local1').on('change', function(){
		$('.address-input').prop('disabled', false);
	})







})
$('i.private').on('click', function(){
	$(this).toggleClass('no');
	if($(this).hasClass('no')){
		$(this).parent().find('input').prop('type', 'text');
	} else {
		$(this).parent().find('input').prop('type', 'password');
	}


})
function runAjaxFilter() {

	if(window.innerWidth > 950 ) {
		var targetContainer = $('#catalog_ajax'),
			pagerCont = $('#respage_number')// Контейнер, в котором хранятся элементы
		dataF = $('.filterform').serializeArray(),
			url = $('.filterform').attr('data-href');

		if (url !== undefined) {
			$.ajax({
				type: 'GET',
				url: url,
				data: dataF,
				dataType: 'html',
				beforeSend: function() {
					$('body').after('<div class="preloader"><div class="preloader-icon"><svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 44C23.2469 44 22.6364 43.3895 22.6364 42.6364C22.6364 41.8832 23.2469 41.2727 24 41.2727C33.5395 41.2727 41.2727 33.5395 41.2727 24C41.2727 14.4605 33.5395 6.72727 24 6.72727C14.4605 6.72727 6.72727 14.4605 6.72727 24C6.72727 26.872 7.42787 29.6399 8.74892 32.1166C9.10336 32.7811 8.85201 33.6071 8.18751 33.9615C7.52302 34.316 6.69701 34.0646 6.34257 33.4001C4.81208 30.5308 4 27.3224 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44Z" fill="#636B75"/></svg></div></div>')
					$('#page').addClass('blured')
				},
				success: function(data){
					var elements = $(data).find('#catalog_ajax_in'); // Ищем элементы
					var urlN = $(data).find(".filterform").data("href");
					var pagination_in = $(data).find('.page_number');
					targetContainer.html(elements);
					pagerCont.html(pagination_in);
					dynamic_change_url(urlN);
					setTimeout( function(){
						$('.preloader').remove();
						$('#page').removeClass('blured')
					}, 500);

				}
			})
		}
	}

}
ymaps.ready(init);
function init() {
	if($('#form-step__address').length) {
		var suggestView1 = new ymaps.SuggestView('form-step__address');
	}
	if($('#forms-language__location').length) {
		var suggestView2 = new ymaps.SuggestView('forms-language__location');
	}
	if($('#forms-language__location-footer').length) {
		var suggestView3 = new ymaps.SuggestView('forms-language__location-footer');
	}

}

// rating
$('.rating-total-item').on('click', function(){
	$(this).parent().attr('data-total-rating', $(this).attr('data-rating'));
	$('.rating__more').show();
	var totalRating = $('.rating__list').attr('data-total-rating');

	$('.rating-total-literacy').attr('data-total-literacy', totalRating);
	$('.rating-total-punctuality').attr('data-total-punctuality', totalRating);
	$('.rating-total-quality').attr('data-total-quality', totalRating);

	// console.log($('.rating-total-quality').attr('data-total-quality'));

})

$('.rating-literacy-item').on('click', function(){
	$(this).parent().attr('data-total-literacy', $(this).attr('data-rating-literacy'));

	var literacy = $('.rating-total-literacy').attr('data-total-literacy');
	var punctuality = $('.rating-total-punctuality').attr('data-total-punctuality');
	var quality = $('.rating-total-quality').attr('data-total-quality');
	var total = (Number(literacy) + Number(punctuality) + Number(quality)) / 3;

	$('.rating-total').attr('data-total-rating', Math.round(total));
})


$('.rating-punctuality-item').on('click', function(){
	$(this).parent().attr('data-total-punctuality', $(this).attr('data-rating-punctuality'));

	var literacy = $('.rating-total-literacy').attr('data-total-literacy');
	var punctuality = $('.rating-total-punctuality').attr('data-total-punctuality');
	var quality = $('.rating-total-quality').attr('data-total-quality');
	var total = (Number(literacy) + Number(punctuality) + Number(quality)) / 3;

	$('.rating-total').attr('data-total-rating', Math.round(total));

})

$('.rating-quality-item').on('click', function () {
	$(this).parent().attr('data-total-quality', $(this).attr('data-rating-quality'));

	var literacy = $('.rating-total-literacy').attr('data-total-literacy');
	var punctuality = $('.rating-total-punctuality').attr('data-total-punctuality');
	var quality = $('.rating-total-quality').attr('data-total-quality');
	var total = (Number(literacy) + Number(punctuality) + Number(quality)) / 3;

	$('.rating-total').attr('data-total-rating', Math.round(total));

});

$('.method-verbal').on('click', function () {	
	if ($('#methodVerbal').hasClass('active') === false) {
		$('#methodVerbal').addClass('active');
		$('#methodWritting').removeClass('active');
	}

	
})

$('.method-writting').on('click', function () {
	
	if ($('#methodWritting').hasClass('active') === false) {
		$('#methodVerbal').removeClass('active');
		$('#methodWritting').addClass('active');
	}

	
})





