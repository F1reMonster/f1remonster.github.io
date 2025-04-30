window.tabsFunc = function () {
	let tabButton = document.querySelectorAll('.js-button-tab');

	if(tabButton !== null) {
		tabButton.forEach((el) => {
			const id = el.getAttribute('data-id');
			el.addEventListener('click', (event) => {
				el.closest('.branch-item__row').querySelectorAll('.js-button-tab').forEach((el) => {
					el.classList.remove('is-active')
				})
				el.closest('.branch-item__row').querySelectorAll('.js-block-tab').forEach((el) => {
					el.classList.remove('is-active')
				})
				el.classList.add('is-active')
				document.querySelector('.js-block-tab[data-id="' + id +'"]').classList.add('is-active')
			})
		})
	}
}

window.tabsFunc()

let map, infoWindow;
function initMap() {
	const clearBranch = document.querySelector('.clear-branch-search');
	let countHidden = document.querySelector('.js-filter-count');
	let loaded = true;
	var mapOptions = {
		zoom: 11,
		center: { lat: -33.9, lng: 151.2 },
		// styles: stylesMap
	}
	var markers = [];

	const image = {
		url: "./assets/img/point.svg",
		size: new google.maps.Size(32, 42),
		// The origin for this image is (0, 0).
		origin: new google.maps.Point(0, 0),
		// The anchor for this image is the base of the flagpole at (0, 32).
		anchor: new google.maps.Point(0, 32),
	};
	const shape = {
		coords: [1, 1, 1, 32, 32, 32, 32, 1],
		type: "poly",
	};
	const rad = function(x) {
		return x * Math.PI / 180;
	};

	const getDistance = function(p1, p2) {
		var R = 6378137; // Earth’s mean radius in meter
		var dLat = rad(p2.lat - p1.lat);
		var dLong = rad(p2.lng - p1.lng);
		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
			Math.sin(dLong / 2) * Math.sin(dLong / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c;
		return d / 1000; // returns the distance in meter
	};

	// const beaches = JSON.parse(document.querySelector('.js-branches-array').getAttribute('data-start'))
	const beaches = [
		{
			"name": 'Default Branch 1',
			"number": '88',
			"id": "88",
			"address": 'strret name 1',
			"template": '<div class="filter-result">' +
				'<div class="filter-result__icon"></div>' +
				'<div class="filter-result__body"> <div class="filter-result__top">Default Branch 1</div> <div class="filter-result__text">strret name 1, Odessa</div></div>' +
				'</div>',
			"lat": -33.890542,
			"lng": 151.274856,
			"phone": "076-7459465",
			"openTime": "15:30",
			"status": true,
			"city": "odessa",
			"checkedFilter": [
				{
					"status": false,
					"id": "first-check",
					"name": "כספומט"
				},{
					"status": true,
					"id": "second-check",
					"name": "ייעוץ משכנתאות"
				},{
					"status": true,
					"id": "third-check",
					"name": "ייעוץ פנסיוני"
				},{
					"status": true,
					"id": "four-check",
					"name": "פתוח ביום ו׳"
				},{
					"status": true,
					"id": "five-check",
					"name": "סכום ההלוואה"
				},{
					"status": true,
					"id": "six-check",
					"name": "סכום ההלוואה"
				},{
					"status": true,
					"id": "seven-check",
					"name": "סכום ההלוואה"
				},{
					"status": true,
					"id": "eight-check",
					"name": "סכום ההלוואה"
				},{
					"status": true,
					"id": "nine-check",
					"name": "סכום ההלוואה9"
				}
			],
			"point": true,
			"cityInclude": "odessa",
			"infoWindow": '<div class="infowindow">' +
				'<div class="infowindow__top"><span>1</span> <span>Default Branch 1</span></div>' +
				'<div class="infowindow__body">' +
				"<p>street1</p>" +
				"</div>" +
				"</div>",
			"schedule": ' <div class="mini-status__table-item">' +
				'           <span>א׳, ג׳, ה׳</span>' +
				'              <span>08:30-14:00</span>' +
				'            </div>' +
				'         <div class="mini-status__table-item">' +
				'            <span>ב׳, ד׳</span>' +
				'             <span>15:30-17:00 ,08:30-14:00</span>' +
				'          </div>' +
				'           <div class="mini-status__table-item">' +
				'              <span>א׳, ג׳, ה׳</span>' +
				'               <span>08:30-12:00</span>' +
				'           </div>',
			"moreSchedule": `
						<div class="branch-item__row-top branch-item__row-top--tabs">
			                <div class="branch-item__title">
			                    שעות הפעילות
			                </div>
			                <div class="branch-item__tabs-btns">
			                    <button class="primary-btn-mini js-button-tab is-active" data-id="12b-tab1">
			                    פעילות כללית
			                </button>
			                <button class="primary-btn-mini js-button-tab" data-id="12b-tab2">
			                    שעות ייעוץ 
			                </button>
			                <button class="primary-btn-mini js-button-tab" data-id="12b-tab3">
			                    שעות ייעוצי משכנתאות
			                </button>
			                </div>
			            </div>
			            <div class="branch-item__grid-2 js-block-tab is-active" data-id="12b-tab1">
			                <span>א׳, ג׳, ה׳</span>
			                <strong>08:00 - 16:00</strong>
			                <span>ב׳, ד׳</span>
			                <strong>08:00 - 16:00, 09:00 - 23:00</strong>
			                <span>א׳, ג׳, ה׳</span>
			                <strong>06:00 - 14:00</strong>
			            </div>
			            <div class="branch-item__grid-2 js-block-tab" data-id="12b-tab2">
			                <span>א׳, ג׳, ה׳</span>
			                <strong>08:00 - 16:00</strong>
			                <span>א׳, ג׳, ה׳</span>
			                <strong>06:00 - 14:00</strong>
			                <span>ב׳, ד׳</span>
			                <strong>08:00 - 16:00, 09:00 - 23:00</strong>
			            </div>
			            <div class="branch-item__grid-2 js-block-tab" data-id="12b-tab3">
			                <span>ב׳, ד׳</span>
			                <strong>08:00 - 16:00, 09:00 - 23:00</strong>
			                <span>א׳, ג׳, ה׳</span>
			                <strong>08:00 - 16:00</strong>
			                <span>א׳, ג׳, ה׳</span>
			                <strong>06:00 - 14:00</strong>
			            </div>
					`
		},
		{
			"name": 'Default Branch 2',
			"number": '99',
			"id": "99",
			"address": 'strret name second',
			"template": '<div class="filter-result">' +
				'<div class="filter-result__icon"></div>' +
				'<div class="filter-result__body"> <div class="filter-result__top">Default Branch 2</div> <div class="filter-result__text">strret name 2, Odessa</div></div>' +
				'</div>',
			"lat": -33.923036,
			"lng": 151.259052,
			"phone": "076-2113478",
			"openTime": "15:30",
			"city": "odessa",
			"point": true,
			"cityInclude": "odessa",
			"checkedFilter": [
				{
					"status": true,
					"id": "first-check",
					"name": "כספומט"
				},{
					"status": false,
					"id": "second-check",
					"name": "ייעוץ משכנתאות"
				},{
					"status": false,
					"id": "third-check",
					"name": "ייעוץ פנסיוני"
				},{
					"status": true,
					"id": "four-check",
					"name": "פתוח ביום ו׳"
				},{
					"status": true,
					"id": "five-check",
					"name": "סכום ההלוואה"
				},{
					"status": true,
					"id": "six-check",
					"name": "סכום ההלוואה"
				},{
					"status": true,
					"id": "seven-check",
					"name": "סכום ההלוואה"
				},{
					"status": true,
					"id": "eight-check",
					"name": "סכום ההלוואה"
				},{
					"status": true,
					"id": "nine-check",
					"name": "סכום ההלוואה"
				}
			],
			"status": true,
			"infoWindow": '<div class="infowindow">' +
				'<div class="infowindow__top"><span>1</span> <span>Default Branch 1</span></div>' +
				'<div class="infowindow__body">' +
				"<p>street2</p>" +
				"</div>" +
				"</div>",
			"schedule": ' <div class="mini-status__table-item">' +
				'           <span>א׳, ג׳, ה׳</span>' +
				'              <span>08:30-14:00</span>' +
				'            </div>' +
				'         <div class="mini-status__table-item">' +
				'            <span>ב׳, ד׳</span>' +
				'             <span>15:30-17:00 ,08:30-14:00</span>' +
				'          </div>' +
				'           <div class="mini-status__table-item">' +
				'              <span>א׳, ג׳, ה׳</span>' +
				'               <span>08:30-12:00</span>' +
				'           </div>',
			"moreSchedule": `
						<div class="branch-item__row-top branch-item__row-top--tabs">
			                <div class="branch-item__title">
			                    שעות הפעילות
			                </div>
			                <div class="branch-item__tabs-btns">
			                    <button class="primary-btn-mini js-button-tab is-active" data-id="12b-tab1">
			                    פעילות כללית
			                </button>
			                <button class="primary-btn-mini js-button-tab" data-id="12b-tab2">
			                    שעות ייעוץ
			                </button>
			                <button class="primary-btn-mini js-button-tab" data-id="12b-tab3">
			                    שעות ייעוצי משכנתאות
			                </button>
			                </div>
			            </div>
			            <div class="branch-item__grid-2 js-block-tab is-active" data-id="12b-tab1">
			                <span>א׳, ג׳, ה׳</span>
			                <strong>08:00 - 16:00</strong>
			                <span>ב׳, ד׳</span>
			                <strong>08:00 - 16:00, 09:00 - 23:00</strong>
			                <span>א׳, ג׳, ה׳</span>
			                <strong>06:00 - 14:00</strong>
			            </div>
			            <div class="branch-item__grid-2 js-block-tab" data-id="12b-tab2">
			                <span>א׳, ג׳, ה׳</span>
			                <strong>08:00 - 16:00</strong>
			                <span>א׳, ג׳, ה׳</span>
			                <strong>06:00 - 14:00</strong>
			                <span>ב׳, ד׳</span>
			                <strong>08:00 - 16:00, 09:00 - 23:00</strong>
			            </div>
			            <div class="branch-item__grid-2 js-block-tab" data-id="12b-tab3">
			                <span>ב׳, ד׳</span>
			                <strong>08:00 - 16:00, 09:00 - 23:00</strong>
			                <span>א׳, ג׳, ה׳</span>
			                <strong>08:00 - 16:00</strong>
			                <span>א׳, ג׳, ה׳</span>
			                <strong>06:00 - 14:00</strong>
			            </div>
					`
		},
		{
			"name": 'Default Branch 3',
			"number": '77',
			"id": "77",
			"address": 'strret name third',
			"template": '<div class="filter-result">' +
				'<div class="filter-result__icon"></div>' +
				'<div class="filter-result__body"> <div class="filter-result__top">Default Branch 3</div> <div class="filter-result__text">strret name 3, Odessa</div></div>' +
				'</div>',
			"lat": -33.950198,
			"lng": 151.259302,
			"phone": "076-2113478",
			"openTime": "15:30",
			"city": "odessa",
			"point": true,
			"cityInclude": "odessa",
			"checkedFilter": [
				{
					"status": true,
					"id": "first-check",
					"name": "כספומט"
				},{
					"status": true,
					"id": "second-check",
					"name": "ייעוץ משכנתאות"
				},{
					"status": false,
					"id": "third-check",
					"name": "ייעוץ פנסיוני"
				},{
					"status": true,
					"id": "four-check",
					"name": "פתוח ביום ו׳"
				},{
					"status": true,
					"id": "five-check",
					"name": "סכום ההלוואה"
				},{
					"status": true,
					"id": "six-check",
					"name": "סכום ההלוואה"
				},{
					"status": true,
					"id": "seven-check",
					"name": "סכום ההלוואה"
				},{
					"status": true,
					"id": "eight-check",
					"name": "סכום ההלוואה"
				},{
					"status": true,
					"id": "nine-check",
					"name": "סכום ההלוואה"
				}
			],
			"status": true,
			"infoWindow": '<div class="infowindow">' +
				'<div class="infowindow__top"><span>1</span> <span>Default Branch 3</span></div>' +
				'<div class="infowindow__body">' +
				"<p>street3</p>" +
				"</div>" +
				"</div>",
			"schedule": ' <div class="mini-status__table-item">' +
				'           <span>א׳, ג׳, ה׳</span>' +
				'              <span>08:30-14:00</span>' +
				'            </div>' +
				'         <div class="mini-status__table-item">' +
				'            <span>ב׳, ד׳</span>' +
				'             <span>15:30-17:00 ,08:30-14:00</span>' +
				'          </div>' +
				'           <div class="mini-status__table-item">' +
				'              <span>א׳, ג׳, ה׳</span>' +
				'               <span>08:30-12:00</span>' +
				'           </div>',
			"moreSchedule": `
						<div class="branch-item__row-top branch-item__row-top--tabs">
			                <div class="branch-item__title">
			                    שעות הפעילות
			                </div>
			                <div class="branch-item__tabs-btns">
			                    <button class="primary-btn-mini js-button-tab is-active" data-id="12b-tab1">
			                    פעילות כללית
			                </button>
			                <button class="primary-btn-mini js-button-tab" data-id="12b-tab2">
			                    שעות ייעוץ
			                </button>
			                <button class="primary-btn-mini js-button-tab" data-id="12b-tab3">
			                    שעות ייעוצי משכנתאות
			                </button>
			                </div>
			            </div>
			            <div class="branch-item__grid-2 js-block-tab is-active" data-id="12b-tab1">
			                <span>א׳, ג׳, ה׳</span>
			                <strong>08:00 - 16:00</strong>
			                <span>ב׳, ד׳</span>
			                <strong>08:00 - 16:00, 09:00 - 23:00</strong>
			                <span>א׳, ג׳, ה׳</span>
			                <strong>06:00 - 14:00</strong>
			            </div>
			            <div class="branch-item__grid-2 js-block-tab" data-id="12b-tab2">
			                <span>א׳, ג׳, ה׳</span>
			                <strong>08:00 - 16:00</strong>
			                <span>א׳, ג׳, ה׳</span>
			                <strong>06:00 - 14:00</strong>
			                <span>ב׳, ד׳</span>
			                <strong>08:00 - 16:00, 09:00 - 23:00</strong>
			            </div>
			            <div class="branch-item__grid-2 js-block-tab" data-id="12b-tab3">
			                <span>ב׳, ד׳</span>
			                <strong>08:00 - 16:00, 09:00 - 23:00</strong>
			                <span>א׳, ג׳, ה׳</span>
			                <strong>08:00 - 16:00</strong>
			                <span>א׳, ג׳, ה׳</span>
			                <strong>06:00 - 14:00</strong>
			            </div>
					`
		}
	];
	const map = new google.maps.Map(document.getElementById("map"), mapOptions);
	infoWindow = new google.maps.InfoWindow();
	// branch toggle
	let branchToggleFunc = function () {
		let branchButton = document.querySelectorAll('.js-open-branch');

		if(branchButton !== null) {
			branchButton.forEach((el) => {
				const id = el.getAttribute('data-id');
				const lat = el.getAttribute('data-lat');
				const lng = el.getAttribute('data-lng');
				const zoom = el.getAttribute('data-zoom');
				let list = el.closest('.branches-block').querySelector('.branches-block-list')
				el.addEventListener('click', (event) => {
					document.querySelectorAll('.js-open-branch').forEach((el) => {
						el.classList.remove('is-active')
					})
					document.querySelectorAll('.js-block-branch').forEach((el) => {
						el.classList.remove('is-active')
					})
					el.classList.add('is-active')
					document.querySelector('.js-block-branch[data-id="' + id +'"]').classList.add('is-active')
					document.querySelector('.js-block-branch[data-id="' + id +'"]').querySelector('.js-close-branch').focus()
					list.classList.add('hide')

					document.querySelector('#map').classList.add('relative');
					document.querySelector('.js-open-map').classList.add('hide');
					map.panTo(new google.maps.LatLng(lat, lng));
					map.setZoom(24);
				})

			})

			document.querySelectorAll('.js-close-branch').forEach((el) => {
				el.addEventListener('click', (ev) => {
					console.log(88888);
					ev.currentTarget.closest('.js-block-branch').classList.remove('is-active')
					let list = ev.currentTarget.closest('.branches-block').querySelector('.branches-block-list')
					list.classList.remove('hide')
					document.querySelector('#map').classList.remove('relative')
					document.querySelector('.js-open-map').classList.remove('hide');
				})
			})
		}
	}

	branchToggleFunc()
	window.tabsFunc()
	setMarkers(map, beaches, '', false)
	// const locationButton = document.createElement("button");
	//
	// locationButton.textContent = "Pan to Current Location";
	// locationButton.classList.add("custom-map-control-button");
	// map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
	navigator.geolocation.watchPosition(function(position) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const pos = {
						// lat: position.coords.latitude,
						// lng: position.coords.longitude,
						lat: 32.0642543,
						lng: 34.7722518,
					};
					window.tabsFunc()
					if(loaded) {
						setMarkers(map, founded, pos, true, false)
						clearBranch.addEventListener('click', () => {
							setMarkers(map, founded, pos, true, false);
							clearBranch.style.display = 'none';
							document.querySelector('#branch-autocomplete').value = ''
							document.querySelector('.branches-block-list').classList.remove('uniq')
						})
					}
					loaded = false
				},
				() => {
					handleLocationError(true, infoWindow, map.getCenter());
				}
			);
		},
		function(error) {
			if (error.code == error.PERMISSION_DENIED) {
				window.tabsFunc()
				if(loaded) {
					setMarkers(map, beaches, '', false, false)
					clearBranch.addEventListener('click', () => {
						setMarkers(map, beaches, '', false, false);
						clearBranch.style.display = 'none';
						document.querySelector('#branch-autocomplete').value = ''
						document.querySelector('.branches-block-list').classList.remove('uniq')
					})
				}
				loaded = false
			}
		});

// To add the marker to the map, call setMap();
// 	setMarkers(map, beaches)
// 	const founded = JSON.parse(document.querySelector('.js-branches-array').getAttribute('data-founded'))
	const founded = [
		{
			"name": 'Discount 1',
			"number": '88',
			"id": "88",
			"address": 'Yehuda Halevi 38',
			"template": '<div class="filter-result">' +
				'<div class="filter-result__icon"></div>' +
				'<div class="filter-result__body"> <div class="filter-result__top">Discount 1</div> <div class="filter-result__text">Yehuda Halevi 38, Tel Aviv-Yafo</div></div>' +
				'</div>',
			"lat": 32.6100479,
			"lng": 35.2851204,
			"phone": "076-7459465",
			"openTime": "15:30",
			"status": true,
			"city": "Tel Aviv-Yafo",
			"checkedFilter": [
				{
					"status": false,
					"id": "first-check",
					"name": "כספומט"
				},{
					"status": true,
					"id": "second-check",
					"name": "ייעוץ משכנתאות"
				},{
					"status": true,
					"id": "third-check",
					"name": "ייעוץ פנסיוני"
				},{
					"status": true,
					"id": "four-check",
					"name": "פתוח ביום ו׳"
				},{
					"status": true,
					"id": "five-check",
					"name": "סכום ההלוואה"
				},{
					"status": true,
					"id": "six-check",
					"name": "סכום ההלוואה"
				},{
					"status": true,
					"id": "seven-check",
					"name": "סכום ההלוואה"
				},{
					"status": true,
					"id": "eight-check",
					"name": "סכום ההלוואה"
				},{
					"status": true,
					"id": "nine-check",
					"name": "סכום ההלוואה"
				}
			],
			"point": true,
			"cityInclude": "Tel Aviv-Yafo",
			"infoWindow": '<div class="infowindow">' +
				'<div class="infowindow__top"><span>1</span> <span>Discount 1</span></div>' +
				'<div class="infowindow__body">' +
				"<p>Yehuda Halevi 38</p>" +
				"</div>" +
				"</div>",
			"schedule": ' <div class="mini-status__table-item">' +
				'           <span>א׳, ג׳, ה׳</span>' +
				'              <span>08:30-14:00</span>' +
				'            </div>' +
				'         <div class="mini-status__table-item">' +
				'            <span>ב׳, ד׳</span>' +
				'             <span>15:30-17:00 ,08:30-14:00</span>' +
				'          </div>' +
				'           <div class="mini-status__table-item">' +
				'              <span>א׳, ג׳, ה׳</span>' +
				'               <span>08:30-12:00</span>' +
				'           </div>',
			"moreSchedule": `
						<div class="branch-item__row-top branch-item__row-top--tabs">
			                <div class="branch-item__title">
			                    שעות הפעילות
			                </div>
			                <div class="branch-item__tabs-btns">
			                    <button class="primary-btn-mini js-button-tab is-active" data-id="12b-tab1">
			                    פעילות כללית
			                </button>
			                <button class="primary-btn-mini js-button-tab" data-id="12b-tab2">
			                    שעות ייעוץ
			                </button>
			                <button class="primary-btn-mini js-button-tab" data-id="12b-tab3">
			                    שעות ייעוצי משכנתאות
			                </button>
			                </div>
			            </div>
			            <div class="branch-item__grid-2 js-block-tab is-active" data-id="12b-tab1">
			                <span>א׳, ג׳, ה׳</span>
			                <strong>08:00 - 16:00</strong>
			                <span>ב׳, ד׳</span>
			                <strong>08:00 - 16:00, 09:00 - 23:00</strong>
			                <span>א׳, ג׳, ה׳</span>
			                <strong>06:00 - 14:00</strong>
			            </div>
			            <div class="branch-item__grid-2 js-block-tab" data-id="12b-tab2">
			                <span>א׳, ג׳, ה׳</span>
			                <strong>08:00 - 16:00</strong>
			                <span>א׳, ג׳, ה׳</span>
			                <strong>06:00 - 14:00</strong>
			                <span>ב׳, ד׳</span>
			                <strong>08:00 - 16:00, 09:00 - 23:00</strong>
			            </div>
			            <div class="branch-item__grid-2 js-block-tab" data-id="12b-tab3">
			                <span>ב׳, ד׳</span>
			                <strong>08:00 - 16:00, 09:00 - 23:00</strong>
			                <span>א׳, ג׳, ה׳</span>
			                <strong>08:00 - 16:00</strong>
			                <span>א׳, ג׳, ה׳</span>
			                <strong>06:00 - 14:00</strong>
			            </div>
					`
		},
		{
			"name": 'Discount 2',
			"number": '99',
			"id": "99",
			"address": 'Dizengoff St 55',
			"template": '<div class="filter-result">' +
				'<div class="filter-result__icon"></div>' +
				'<div class="filter-result__body"> <div class="filter-result__top">Discount 2</div> <div class="filter-result__text">Dizengoff St 55, Tel Aviv-Yafo</div></div>' +
				'</div>',
			"lat": 32.0754281,
			"lng": 34.7726441,
			"phone": "076-2113478",
			"openTime": "15:30",
			"city": "Tel Aviv-Yafo",
			"point": true,
			"cityInclude": "Tel Aviv-Yafo",
			"checkedFilter": [
				{
					"status": true,
					"id": "first-check",
					"name": "כספומט"
				},{
					"status": false,
					"id": "second-check",
					"name": "ייעוץ משכנתאות"
				},{
					"status": false,
					"id": "third-check",
					"name": "ייעוץ פנסיוני"
				},{
					"status": true,
					"id": "four-check",
					"name": "פתוח ביום ו׳"
				},{
					"status": true,
					"id": "five-check",
					"name": "סכום ההלוואה"
				},{
					"status": true,
					"id": "six-check",
					"name": "סכום ההלוואה"
				},{
					"status": true,
					"id": "seven-check",
					"name": "סכום ההלוואה"
				},{
					"status": true,
					"id": "eight-check",
					"name": "סכום ההלוואה"
				},{
					"status": true,
					"id": "nine-check",
					"name": "סכום ההלוואה"
				}
			],
			"status": true,
			"infoWindow": '<div class="infowindow">' +
				'<div class="infowindow__top"><span>1</span> <span>Discount 2</span></div>' +
				'<div class="infowindow__body">' +
				"<p>Dizengoff St 55</p>" +
				"</div>" +
				"</div>",
			"schedule": ' <div class="mini-status__table-item">' +
				'           <span>א׳, ג׳, ה׳</span>' +
				'              <span>08:30-14:00</span>' +
				'            </div>' +
				'         <div class="mini-status__table-item">' +
				'            <span>ב׳, ד׳</span>' +
				'             <span>15:30-17:00 ,08:30-14:00</span>' +
				'          </div>' +
				'           <div class="mini-status__table-item">' +
				'              <span>א׳, ג׳, ה׳</span>' +
				'               <span>08:30-12:00</span>' +
				'           </div>',
			"moreSchedule": `
						<div class="branch-item__row-top branch-item__row-top--tabs">
			                <div class="branch-item__title">
			                    שעות הפעילות
			                </div>
			                <div class="branch-item__tabs-btns">
			                    <button class="primary-btn-mini js-button-tab is-active" data-id="12b-tab1">
			                    פעילות כללית
			                </button>
			                <button class="primary-btn-mini js-button-tab" data-id="12b-tab2">
			                    שעות ייעוץ
			                </button>
			                <button class="primary-btn-mini js-button-tab" data-id="12b-tab3">
			                    שעות ייעוצי משכנתאות
			                </button>
			                </div>
			            </div>
			            <div class="branch-item__grid-2 js-block-tab is-active" data-id="12b-tab1">
			                <span>א׳, ג׳, ה׳</span>
			                <strong>08:00 - 16:00</strong>
			                <span>ב׳, ד׳</span>
			                <strong>08:00 - 16:00, 09:00 - 23:00</strong>
			                <span>א׳, ג׳, ה׳</span>
			                <strong>06:00 - 14:00</strong>
			            </div>
			            <div class="branch-item__grid-2 js-block-tab" data-id="12b-tab2">
			                <span>א׳, ג׳, ה׳</span>
			                <strong>08:00 - 16:00</strong>
			                <span>א׳, ג׳, ה׳</span>
			                <strong>06:00 - 14:00</strong>
			                <span>ב׳, ד׳</span>
			                <strong>08:00 - 16:00, 09:00 - 23:00</strong>
			            </div>
			            <div class="branch-item__grid-2 js-block-tab" data-id="12b-tab3">
			                <span>ב׳, ד׳</span>
			                <strong>08:00 - 16:00, 09:00 - 23:00</strong>
			                <span>א׳, ג׳, ה׳</span>
			                <strong>08:00 - 16:00</strong>
			                <span>א׳, ג׳, ה׳</span>
			                <strong>06:00 - 14:00</strong>
			            </div>
					`
		},
		{
			"name": 'Discount 33',
			"number": '99',
			"id": "99",
			"address": 'Yigal Alon St 96',
			"template": '<div class="filter-result">' +
				'<div class="filter-result__icon"></div>' +
				'<div class="filter-result__body"> <div class="filter-result__top">Discount 33</div> <div class="filter-result__text">Yigal Alon St 96, Tel Aviv-Yafo</div></div>' +
				'</div>',
			"lat": 32.0694499,
			"lng": 34.7920466,
			"phone": "076-2113478",
			"openTime": "15:30",
			"city": "Tel Aviv-Yafo",
			"point": true,
			"cityInclude": "Tel Aviv-Yafo",
			"checkedFilter": [
				{
					"status": true,
					"id": "first-check",
					"name": "כספומט"
				},{
					"status": false,
					"id": "second-check",
					"name": "ייעוץ משכנתאות"
				},{
					"status": false,
					"id": "third-check",
					"name": "ייעוץ פנסיוני"
				},{
					"status": true,
					"id": "four-check",
					"name": "פתוח ביום ו׳"
				},{
					"status": true,
					"id": "five-check",
					"name": "סכום ההלוואה"
				},{
					"status": true,
					"id": "six-check",
					"name": "סכום ההלוואה"
				},{
					"status": true,
					"id": "seven-check",
					"name": "סכום ההלוואה"
				},{
					"status": true,
					"id": "eight-check",
					"name": "סכום ההלוואה"
				},{
					"status": true,
					"id": "nine-check",
					"name": "סכום ההלוואה"
				}
			],
			"status": true,
			"infoWindow": '<div class="infowindow">' +
				'<div class="infowindow__top"><span>1</span> <span>Discount 33</span></div>' +
				'<div class="infowindow__body">' +
				"<p>Yigal Alon St 96</p>" +
				"</div>" +
				"</div>",
			"schedule": ' <div class="mini-status__table-item">' +
				'           <span>א׳, ג׳, ה׳</span>' +
				'              <span>08:30-14:00</span>' +
				'            </div>' +
				'         <div class="mini-status__table-item">' +
				'            <span>ב׳, ד׳</span>' +
				'             <span>15:30-17:00 ,08:30-14:00</span>' +
				'          </div>' +
				'           <div class="mini-status__table-item">' +
				'              <span>א׳, ג׳, ה׳</span>' +
				'               <span>08:30-12:00</span>' +
				'           </div>',
			"moreSchedule": `
						<div class="branch-item__row-top branch-item__row-top--tabs">
			                <div class="branch-item__title">
			                    שעות הפעילות
			                </div>
			                <div class="branch-item__tabs-btns">
			                    <button class="primary-btn-mini js-button-tab is-active" data-id="12b-tab1">
			                    פעילות כללית
			                </button>
			                <button class="primary-btn-mini js-button-tab" data-id="12b-tab2">
			                    שעות ייעוץ
			                </button>
			                <button class="primary-btn-mini js-button-tab" data-id="12b-tab3">
			                    שעות ייעוצי משכנתאות
			                </button>
			                </div>
			            </div>
			            <div class="branch-item__grid-2 js-block-tab is-active" data-id="12b-tab1">
			                <span>א׳, ג׳, ה׳</span>
			                <strong>08:00 - 16:00</strong>
			                <span>ב׳, ד׳</span>
			                <strong>08:00 - 16:00, 09:00 - 23:00</strong>
			                <span>א׳, ג׳, ה׳</span>
			                <strong>06:00 - 14:00</strong>
			            </div>
			            <div class="branch-item__grid-2 js-block-tab" data-id="12b-tab2">
			                <span>א׳, ג׳, ה׳</span>
			                <strong>08:00 - 16:00</strong>
			                <span>א׳, ג׳, ה׳</span>
			                <strong>06:00 - 14:00</strong>
			                <span>ב׳, ד׳</span>
			                <strong>08:00 - 16:00, 09:00 - 23:00</strong>
			            </div>
			            <div class="branch-item__grid-2 js-block-tab" data-id="12b-tab3">
			                <span>ב׳, ד׳</span>
			                <strong>08:00 - 16:00, 09:00 - 23:00</strong>
			                <span>א׳, ג׳, ה׳</span>
			                <strong>08:00 - 16:00</strong>
			                <span>א׳, ג׳, ה׳</span>
			                <strong>06:00 - 14:00</strong>
			            </div>
					`
		},
	];


	function clearMarkers() {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);  //markerToBeRemoved.setMap(null);
		}
	}

// Deletes all markers in the array by removing references to them.
	function deleteMarkers() {
		clearMarkers();
		markers = [];
	}

	function setMarkers(map, array, userPos, findPos, search) {
		let bounds = new google.maps.LatLngBounds();

		let markerFUnc = function (el, boundsCheck) {
			const position = {
				lat: el.lat,
				lng: el.lng
			}
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(el.lat, el.lng),
				map: map,
				icon: image,
				shape: shape,
				title: el[0],
				zIndex: el[3],
			});

			marker.addListener('click', function() {
				map.panTo(marker.getPosition());
				map.setZoom(20)
			});

			marker.addListener('mouseover', function() {
				infoWindow.setPosition(position);
				infoWindow.open(map);
				infoWindow.setContent(el.infoWindow);
			});

			marker.addListener('click', function() {
				infoWindow.setPosition(position);
				infoWindow.open(map);
				infoWindow.setContent(el.infoWindow);
			});

			marker.addListener('mouseout', function() {
				infoWindow.setPosition(position);
				infoWindow.close();
			});

			markers.push(marker);

			if(boundsCheck) {
				bounds.extend(marker.getPosition());
				map.fitBounds(bounds);
			}
		}

		if(findPos) {
			let filtered = array.filter(item => {
				if (getDistance(userPos, { lat: item.lat, lng: item.lng }) < 2) {
					return item;
				}
			});

			if (filtered.length > 0) {
				let myarr2 = []
				let count = []
				filtered.forEach((el) => {
					markerFUnc(el, true)
					infoWindow.setPosition(userPos);
					infoWindow.setContent("Your Location");
					infoWindow.open(map);
				})
				let theseCheckBoxes =
					filtered.map(function(element) {
						const name = element.name;
						const number = element.number;
						const address = element.address;
						const phone = element.phone;
						const openTime = element.openTime;
						const schedule = element.schedule;
						const status = element.status;
						const lat = element.lat;
						const lng = element.lng;
						const id = element.id;

						return `
						 <div class="branch-item">
						 <button class="branch-item__top js-open-branch" data-id="${id}" data-lat="${lat}" data-lng="${lng}" data-zoom="16">
						     <div class="branch-item__numb">${number}</div>
						     <div class="branch-item__name">${name}</div>
						     <img src="./assets/img/arrow-right.svg" alt="tick" width="14" height="14">
						 </button>
						 <div class="branch-item__contacts">
						     <div class="branch-item__address">${address}</div>
						     <a href="tel:${phone}" class="branch-item__phone">${phone}</a>
						 </div>
						 <div class="branch-item__bottom">
						     <div class="branch-item__schedule">
						         <div class="branch-item__schedule-top">
						             <button class="mini-status mini-status--${status}">
						                 <div class="mini-status__name">הסניף סגור</div>
						                 <img src="./assets/img/info.svg" alt="tick" width="30" height="30">
						                 <div class="mini-status__dropdown">
						                     <div class="mini-status__title">שעות הפעילות</div>
						                     <div class="mini-status__table">${schedule}</div>
						                 </div>
						             </button>
						         </div>
						         <time class="branch-item__time">ייפתח היום ב-${openTime}</time>
						     </div>
						     <div class="branch-item__buttons">
						         <a href="#" class="secondary-btn-small">ניווט</a>
						         <a href="#" class="typical-btn-small">קביעת פגישה</a>
						     </div>
						 </div>
						  </div>
						`
					});
				let openModal =
					filtered.map(function(element) {
						const name = element.name;
						const number = element.number;
						const address = element.address;
						const city = element.city;
						const phone = element.phone;
						const openTime = element.openTime;
						const schedule = element.schedule;
						const checkedFilter = element.checkedFilter;
						const moreSchedule = element.moreSchedule;
						const status = element.status;
						const id = element.id;
						var rounded = function(number){
							return Math.round(parseFloat(number) * 100) / 100;
						}
						let distance = rounded(element.distance = getDistance(userPos, { lat: element.lat, lng: element.lng }))
						checkedFilter.forEach((el) => {
							if(!el.status) {
								myarr2.push(el)
							}
						})
						checkedFilter.forEach((el) => {
							document.querySelectorAll('.js-filter-checkbox').forEach((check) => {
								if(el.id === check.getAttribute('data-id')) {
									check.querySelector('input').checked = el.status
								}
							})
						})
						let checks = checkedFilter.map((el) => {
							return `
										  <label data-id="${el.id}" class="input-checkbox input-checkbox--disabled input-checkbox--square">
                                                <input type="checkbox" ${el.status ? 'checked' : ''} name="checkbox1">
                                                <span class="input-checkbox-checkmark"></span>
                                                <span class="input-checkbox-label">${el.name}</span>
                                            </label>
										`
						})
						return `
										<div class="branch-popup js-block-branch" data-id="${id}">
                                    <div class="branch-item branch-item--opened">
                                        <button class="branch-item__top js-close-branch">
                                            <img src="./assets/img/arrow-right.svg" alt="tick" width="14" height="14">
                                            <div class="branch-item__numb">
                                               ${number}
                                            </div>
                                            <div class="branch-item__name">
                                                ${name}
                                            </div>
                                        </button>
                                        <div class="branch-item__scroll">
                                            <div class="branch-item__title">
                                              	${city}
                                            </div>
                                            <div class="branch-item__address">
                                                 ${address}
                                            </div>
                                            <div class="branch-item__row">
                                                <div class="branch-item__title">
                                                    אבן גבירול 19, א׳, ג׳, ה׳ אביב
                                                </div>
                                                <div class="branch-item__grid-3">
                                                	${checks.join('')}
                                                </div>
                                            </div>
                                            <div class="branch-item__row">
                                                ${moreSchedule}
                                            </div>
                                            <div class="branch-item__row">
                                                <div class="branch-item__row-top">
                                                    <div class="branch-item__title">
                                                        טלפונים
                                                    </div>
                                                </div>
                                                <div class="branch-item__grid-2">
                                                    <span>טלפונים</span>
                                                    <strong>076-8053222</strong>
                                                    <span>יועצי משכנתאות</span>
                                                    <strong>076-8053222</strong>
                                                    <span>פקס</span>
                                                    <strong>076-8053222</strong>
                                                </div>
                                            </div>
                                            <div class="branch-item__row">
                                                <div class="branch-item__row-top">
                                                    <div class="branch-item__title js-button-tab" data-id="more ${id}">
                                                        + מידע נוסף
                                                    </div>
                                                </div>
                                                <div class="branch-item__grid-2 js-block-tab" data-id="more ${id}">
                                                    <span>טלפונים</span>
                                                    <strong>076-8053222</strong>
                                                    <span>יועצי משכנתאות</span>
                                                    <strong>076-8053222</strong>
                                                    <span>פקס</span>
                                                    <strong>076-8053222</strong>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="branch-item__bottom">
                                            <div class="branch-item__schedule">
                                                <div class="branch-item__schedule-top">
                                                    <div class="mini-status mini-status--${status}">
                                                        <span class="mini-status__name">פתוח עכשיו</span>
                                                    </div>
                                                    <div class="branch-item__distantion">
                                                        <span>${distance} ק״מ מהיעד</span>
                                                        <span>קרוב אליי</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="branch-item__buttons">
                                                <a href="#" class="secondary-btn-small">ניווט</a>
                                                <a href="#" class="typical-btn-small">קביעת פגישה</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
									`
					});
				let uniqueChars = myarr2.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i);
				document.querySelectorAll('.js-filter-checkbox').forEach((element) => {
					element.querySelector('input').checked = true;

					uniqueChars.forEach((el) => {
						let id = el.id;
						if(element.getAttribute('data-id') === id) {
							element.querySelector('input').checked = false;
							element.querySelector('input').classList.remove('count')
						}
					})

					if(element.querySelector('input').classList.contains('count')) {
						count.push(element)
					}
				})
				countHidden.innerHTML = count.length + '+';
				const appendBlock = document.querySelector('.js-append-body').querySelector('.branches-block-list');
				const appendBlockModals = document.querySelector('.js-append-body').querySelector('.js-append-modals');
				appendBlock.innerHTML = theseCheckBoxes.join('');
				appendBlockModals.innerHTML = openModal.join('');
				branchToggleFunc()
				window.tabsFunc()
			} else {
				let closest = array.map(function(item){
					item.distance = getDistance(userPos, { lat: item.lat, lng: item.lng })
					return item;
				})

				closest.forEach((el) => {
					markerFUnc(el, false)
				})
				let myarr2 = []
				let count = []
				let theseCheckBoxes =
					closest.map(function(element) {
						const name = element.name;
						const number = element.number;
						const address = element.address;
						const phone = element.phone;
						const openTime = element.openTime;
						const schedule = element.schedule;
						const lat = element.lat;
						const lng = element.lng;
						const id = element.id;
						const status = element.status;
						return `
						 <div class="branch-item">
						 <button class="branch-item__top js-open-branch" data-id="${id}" data-lat="${lat}" data-lng="${lng}" data-zoom="16">
						     <div class="branch-item__numb">${number}</div>
						     <div class="branch-item__name">${name}</div>
						     <img src="./assets/img/arrow-right.svg" alt="tick" width="14" height="14">
						 </button>
						 <div class="branch-item__contacts">
						     <div class="branch-item__address">${address}</div>
						     <a href="tel:${phone}" class="branch-item__phone">${phone}</a>
						 </div>
						 <div class="branch-item__bottom">
						     <div class="branch-item__schedule">
						         <div class="branch-item__schedule-top">
						             <button class="mini-status mini-status--${status}">
						                 <div class="mini-status__name">הסניף סגור</div>
						                 <img src="./assets/img/info.svg" alt="tick" width="30" height="30">
						                 <div class="mini-status__dropdown">
						                     <div class="mini-status__title">שעות הפעילות</div>
						                     <div class="mini-status__table">${schedule}</div>
						                 </div>
						             </button>
						         </div>
						         <time class="branch-item__time">ייפתח היום ב-${openTime}</time>
						     </div>
						     <div class="branch-item__buttons">
						         <a href="#" class="secondary-btn-small">ניווט</a>
						         <a href="#" class="typical-btn-small">קביעת פגישה</a>
						     </div>
						 </div>
						  </div>
						`
					});
				let openModal =
					closest.map(function(element) {
						const name = element.name;
						const number = element.number;
						const address = element.address;
						const city = element.city;
						const phone = element.phone;
						const openTime = element.openTime;
						const schedule = element.schedule;
						const checkedFilter = element.checkedFilter;
						const moreSchedule = element.moreSchedule;
						const status = element.status;
						const id = element.id;
						var rounded = function(number){
							return Math.round(parseFloat(number) * 100) / 100;
						}
						let distance = rounded(element.distance = getDistance(userPos, { lat: element.lat, lng: element.lng }))
						checkedFilter.forEach((el) => {
							if(!el.status) {
								myarr2.push(el)
							}
						})
						checkedFilter.forEach((el) => {
							document.querySelectorAll('.js-filter-checkbox').forEach((check) => {
								if(el.id === check.getAttribute('data-id')) {
									check.querySelector('input').checked = el.status
								}
							})
						})
						let checks = checkedFilter.map((el) => {
							return `
										  <label data-id="${el.id}" class="input-checkbox input-checkbox--disabled input-checkbox--square">
                                                <input type="checkbox" ${el.status ? 'checked' : ''} name="checkbox1">
                                                <span class="input-checkbox-checkmark"></span>
                                                <span class="input-checkbox-label">${el.name}</span>
                                            </label>
										`
						})
						return `
										<div class="branch-popup js-block-branch" data-id="${id}">
                                    <div class="branch-item branch-item--opened">
                                        <button class="branch-item__top js-close-branch">
                                            <img src="./assets/img/arrow-right.svg" alt="tick" width="14" height="14">
                                            <div class="branch-item__numb">
                                               ${number}
                                            </div>
                                            <div class="branch-item__name">
                                                ${name}
                                            </div>
                                        </button>
                                        <div class="branch-item__scroll">
                                            <div class="branch-item__title">
                                              	${city}
                                            </div>
                                            <div class="branch-item__address">
                                                 ${address}
                                            </div>
                                            <div class="branch-item__row">
                                                <div class="branch-item__title">
                                                    אבן גבירול 19, א׳, ג׳, ה׳ אביב
                                                </div>
                                                <div class="branch-item__grid-3">
                                                	${checks.join('')}
                                                </div>
                                            </div>
                                            <div class="branch-item__row">
                                                ${moreSchedule}
                                            </div>
                                            <div class="branch-item__row">
                                                <div class="branch-item__row-top">
                                                    <div class="branch-item__title">
                                                        טלפונים
                                                    </div>
                                                </div>
                                                <div class="branch-item__grid-2">
                                                    <span>טלפונים</span>
                                                    <strong>076-8053222</strong>
                                                    <span>יועצי משכנתאות</span>
                                                    <strong>076-8053222</strong>
                                                    <span>פקס</span>
                                                    <strong>076-8053222</strong>
                                                </div>
                                            </div>
                                             <div class="branch-item__row">
                                                <div class="branch-item__row-top">
                                                    <div class="branch-item__title js-button-tab" data-id="more ${id}">
                                                        + מידע נוסף
                                                    </div>
                                                </div>
                                                <div class="branch-item__grid-2 js-block-tab" data-id="more ${id}">
                                                    <span>טלפונים</span>
                                                    <strong>076-8053222</strong>
                                                    <span>יועצי משכנתאות</span>
                                                    <strong>076-8053222</strong>
                                                    <span>פקס</span>
                                                    <strong>076-8053222</strong>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="branch-item__bottom">
                                            <div class="branch-item__schedule">
                                                <div class="branch-item__schedule-top">
                                                    <button class="mini-status mini-status--${status}">
                                                        <span class="mini-status__name">פתוח עכשיו</span>
                                                    </button>
                                                    <div class="branch-item__distantion">
                                                        <span>${distance} ק״מ מהיעד</span>
                                                        <span>קרוב אליי</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="branch-item__buttons">
                                                <a href="#" class="secondary-btn-small">ניווט</a>
                                                <a href="#" class="typical-btn-small">קביעת פגישה</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
									`
					});
				let uniqueChars = myarr2.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i);
				document.querySelectorAll('.js-filter-checkbox').forEach((element) => {
					element.querySelector('input').checked = true;

					uniqueChars.forEach((el) => {
						let id = el.id;
						if(element.getAttribute('data-id') === id) {
							element.querySelector('input').checked = false;
							element.querySelector('input').classList.remove('count')
						}
					})

					if(element.querySelector('input').classList.contains('count')) {
						count.push(element)
					}
				})
				countHidden.innerHTML = count.length + '+';
				const appendBlock = document.querySelector('.js-append-body').querySelector('.branches-block-list');
				const appendBlockModals = document.querySelector('.js-append-body').querySelector('.js-append-modals');
				appendBlock.innerHTML = theseCheckBoxes.join('');
				appendBlockModals.innerHTML = openModal.join('');
				branchToggleFunc()
				window.tabsFunc()

				const lowest = closest.reduce((previous, current) => {
					return current.distance < previous.distance ? current : previous;
				});

				map.panTo(new google.maps.LatLng(lowest.lat, lowest.lng));
				map.setZoom(24)
			}
		} else if(search) {
			array.forEach((el) => {
				markerFUnc(el.value, true)
			})
		}else {
			array.forEach((el) => {
				markerFUnc(el, false)
				map.panTo(new google.maps.LatLng(el.lat, el.lng));
			})

			let myarr2 = []
			let count = []
			array.forEach((el) => {
				markerFUnc(el, true)
			})
			let theseCheckBoxes =
				array.map(function(element) {
					const name = element.name;
					const number = element.number;
					const address = element.address;
					const phone = element.phone;
					const openTime = element.openTime;
					const schedule = element.schedule;
					const lat = element.lat;
					const lng = element.lng;
					const id = element.id;
					const status = element.status;

					return `
						 <div class="branch-item">
						 <button class="branch-item__top js-open-branch" data-id="${id}" data-lat="${lat}" data-lng="${lng}" data-zoom="16">
						     <div class="branch-item__numb">${number}</div>
						     <div class="branch-item__name">${name}</div>
						     <img src="./assets/img/arrow-right.svg" alt="tick" width="14" height="14">
						 </button>
						 <div class="branch-item__contacts">
						     <div class="branch-item__address">${address}</div>
						     <a href="tel:${phone}" class="branch-item__phone">${phone}</a>
						 </div>
						 <div class="branch-item__bottom">
						     <div class="branch-item__schedule">
						         <div class="branch-item__schedule-top">
						             <button class="mini-status mini-status--${status}">
						                 <div class="mini-status__name">הסניף סגור</div>
						                 <img src="./assets/img/info.svg" alt="tick" width="30" height="30">
						                 <div class="mini-status__dropdown">
						                     <div class="mini-status__title">שעות הפעילות</div>
						                     <div class="mini-status__table">${schedule}</div>
						                 </div>
						             </button>
						         </div>
						         <time class="branch-item__time">ייפתח היום ב-${openTime}</time>
						     </div>
						     <div class="branch-item__buttons">
						         <a href="#" class="secondary-btn-small">ניווט</a>
						         <a href="#" class="typical-btn-small">קביעת פגישה</a>
						     </div>
						 </div>
						  </div>
						`
				});
			let openModal =
				array.map(function(element) {
					const name = element.name;
					const number = element.number;
					const address = element.address;
					const city = element.city;
					const phone = element.phone;
					const openTime = element.openTime;
					const schedule = element.schedule;
					const checkedFilter = element.checkedFilter;
					const moreSchedule = element.moreSchedule;
					const status = element.status;
					const id = element.id;
					checkedFilter.forEach((el) => {
						if(!el.status) {
							myarr2.push(el)
						}
					})
					checkedFilter.forEach((el) => {
						document.querySelectorAll('.js-filter-checkbox').forEach((check) => {
							if(el.id === check.getAttribute('data-id')) {
								check.querySelector('input').checked = el.status
							}
						})
					})
					let checks = checkedFilter.map((el) => {
						return `
										  <label data-id="${el.id}" class="input-checkbox input-checkbox--disabled input-checkbox--square">
                                                <input type="checkbox" ${el.status ? 'checked' : ''} name="checkbox1">
                                                <span class="input-checkbox-checkmark"></span>
                                                <span class="input-checkbox-label">${el.name}</span>
                                            </label>
										`
					})
					return `
										<div class="branch-popup js-block-branch" data-id="${id}">
                                    <div class="branch-item branch-item--opened">
                                        <button class="branch-item__top js-close-branch">
                                            <img src="./assets/img/arrow-right.svg" alt="tick" width="14" height="14">
                                            <div class="branch-item__numb">
                                               ${number}
                                            </div>
                                            <div class="branch-item__name">
                                                ${name}
                                            </div>
                                        </button>
                                        <div class="branch-item__scroll">
                                            <div class="branch-item__title">
                                              	${city}
                                            </div>
                                            <div class="branch-item__address">
                                                 ${address}
                                            </div>
                                            <div class="branch-item__row">
                                                <div class="branch-item__title">
                                                    אבן גבירול 19, א׳, ג׳, ה׳ אביב
                                                </div>
                                                <div class="branch-item__grid-3">
                                                	${checks.join('')}
                                                </div>
                                            </div>
                                            <div class="branch-item__row">
                                                ${moreSchedule}
                                            </div>
                                            <div class="branch-item__row">
                                                <div class="branch-item__row-top">
                                                    <div class="branch-item__title">
                                                        טלפונים
                                                    </div>
                                                </div>
                                                <div class="branch-item__grid-2">
                                                    <span>טלפונים</span>
                                                    <strong>076-8053222</strong>
                                                    <span>יועצי משכנתאות</span>
                                                    <strong>076-8053222</strong>
                                                    <span>פקס</span>
                                                    <strong>076-8053222</strong>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="branch-item__bottom">
                                            <div class="branch-item__schedule">
                                                <div class="branch-item__schedule-top">
                                                    <button class="mini-status mini-status--${status}">
                                                        <span class="mini-status__name">פתוח עכשיו</span>
                                                    </button>
                                                
                                                </div>
                                            </div>
                                            <div class="branch-item__buttons">
                                                <a href="#" class="secondary-btn-small">ניווט</a>
                                                <a href="#" class="typical-btn-small">קביעת פגישה</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
									`
				});
			let uniqueChars = myarr2.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i);
			document.querySelectorAll('.js-filter-checkbox').forEach((element) => {
				element.querySelector('input').checked = true;

				uniqueChars.forEach((el) => {
					let id = el.id;
					if(element.getAttribute('data-id') === id) {
						element.querySelector('input').checked = false;
						element.querySelector('input').classList.remove('count')
					}
				})

				if(element.querySelector('input').classList.contains('count')) {
					count.push(element)
				}
			})
			countHidden.innerHTML = count.length + '+';
			const appendBlock = document.querySelector('.js-append-body').querySelector('.branches-block-list');
			const appendBlockModals = document.querySelector('.js-append-body').querySelector('.js-append-modals');
			appendBlock.innerHTML = theseCheckBoxes.join('');
			appendBlockModals.innerHTML = openModal.join('');
			branchToggleFunc()
			window.tabsFunc()
		}
	}
	function handleLocationError(browserHasGeolocation, infoWindow, pos) {
		infoWindow.setPosition(pos);
		infoWindow.setContent(
			browserHasGeolocation
				? "Error: The Geolocation service failed."
				: "Error: Your browser doesn't support geolocation."
		);
		infoWindow.open(map);
	}

//glossary page functionality
	const autoCompleteJS = new autoComplete({
		selector: "#branch-autocomplete",
		placeHolder: 'חפשו כתובת, יישוב או סניף',
		resultsList: {
			element: (list, data) => {
				if (!data.results.length) {
					// Create "No Results" message list element
					const message = document.createElement("li");
					message.setAttribute("class", "no_result");
					// Add message text content
					// TO DEVELOPER: you can use parameter data.query to be more specific about searhc
					message.innerHTML = `<div class="filter-result">
						<div class="filter-result__icon filter-result__icon--empty"></div>
						<div class="filter-result__body"> <div class="filter-result__top">לא מצאנו סניף שמתאים למה שחיפשת</div></div>
						</div>`
					// Add message list element to the list
					list.appendChild(message);
				} else {

				}
			},
			maxResults: 20,
			noResults: true,
		},
		data: {
			// Data source 'Object' key to be searched
			src: async (query) => {
				function isNumeric(value) {
					return /^\d+$/.test(value);
				}
				if(!isNumeric(query) && query.length > 1 || isNumeric(query) && query.length > 0) {
					try {
						const source = await fetch(`./branches.php/${query}`)
						// Data should be an array of `Objects` or `Strings`
						const data = await source.json();
						return data;
					} catch (error) {
						return error;
					}
				}

			},
			keys: ["template"],
			cache: false,
		},
		resultItem: {
			highlight: true
		},
		events: {
			input: {
				results: (event) => {
					let myarr = [];
					let count = [];
					document.querySelector('.js-show-all-founded').addEventListener('click', () => {
						deleteMarkers()
						const results = event.detail.results.filter((word) => {
							if(word.value.point) {
								return word
							}
						});
						setMarkers(map, results, '', false, true);
						let theseCheckBoxes =
							results.map(function(element) {
								const name = element.value.name;
								const number = element.value.number;
								const address = element.value.address;
								const phone = element.value.phone;
								const openTime = element.value.openTime;
								const schedule = element.value.schedule;
								const lat = element.value.lat;
								const lng = element.value.lng;
								const id = element.value.id;
								const status = element.status;

								return `
						 <div class="branch-item">
						 <button class="branch-item__top js-open-branch" data-id="${id}" data-lat="${lat}" data-lng="${lng}" data-zoom="16">
						     <div class="branch-item__numb">${number}</div>
						     <div class="branch-item__name">${name}</div>
						     <img src="./assets/img/arrow-right.svg" alt="tick" width="14" height="14">
						 </button>
						 <div class="branch-item__contacts">
						     <div class="branch-item__address">${address}</div>
						     <a href="tel:${phone}" class="branch-item__phone">${phone}</a>
						 </div>
						 <div class="branch-item__bottom">
						     <div class="branch-item__schedule">
						         <div class="branch-item__schedule-top">
						             <button class="mini-status mini-status--${status}">
						                 <div class="mini-status__name">הסניף סגור</div>
						                 <img src="./assets/img/info.svg" alt="tick" width="30" height="30">
						                 <div class="mini-status__dropdown">
						                     <div class="mini-status__title">שעות הפעילות</div>
						                     <div class="mini-status__table">${schedule}</div>
						                 </div>
						             </button>
						         </div>
						         <time class="branch-item__time">ייפתח היום ב-${openTime}</time>
						     </div>
						     <div class="branch-item__buttons">
						         <a href="#" class="secondary-btn-small">ניווט</a>
						         <a href="#" class="typical-btn-small">קביעת פגישה</a>
						     </div>
						 </div>
						  </div>
						`
							});
						let openModal =
							results.map(function(element) {
								const name = element.value.name;
								const number = element.value.number;
								const address = element.value.address;
								const city = element.value.city;
								const phone = element.value.phone;
								const openTime = element.value.openTime;
								const schedule = element.value.schedule;
								const checkedFilter = element.value.checkedFilter;
								const moreSchedule = element.value.moreSchedule;
								const status = element.value.status;
								const id = element.value.id;
								checkedFilter.forEach((el) => {
									if(!el.status) {
										myarr.push(el)
									}
								})
								checkedFilter.forEach((el) => {
									document.querySelectorAll('.js-filter-checkbox').forEach((check) => {
										if(el.id === check.getAttribute('data-id')) {
											check.querySelector('input').checked = el.status
										}
									})
								})
								let checks = checkedFilter.map((el) => {
									return `
										  <label data-id="${el.id}" class="input-checkbox input-checkbox--disabled input-checkbox--square">
                                                <input type="checkbox" ${el.status ? 'checked' : ''} name="checkbox1">
                                                <span class="input-checkbox-checkmark"></span>
                                                <span class="input-checkbox-label">${el.name}</span>
                                            </label>
										`
								})
								return `
										<div class="branch-popup js-block-branch" data-id="${id}">
                                    <div class="branch-item branch-item--opened">
                                        <button class="branch-item__top js-close-branch">
                                            <img src="./assets/img/arrow-right.svg" alt="tick" width="14" height="14">
                                            <div class="branch-item__numb">
                                               ${number}
                                            </div>
                                            <div class="branch-item__name">
                                                ${name}
                                            </div>
                                        </button>
                                        <div class="branch-item__scroll">
                                            <div class="branch-item__title">
                                              	${city}
                                            </div>
                                            <div class="branch-item__address">
                                                 ${address}
                                            </div>
                                            <div class="branch-item__row">
                                                <div class="branch-item__title">
                                                    אבן גבירול 19, א׳, ג׳, ה׳ אביב
                                                </div>
                                                <div class="branch-item__grid-3">
                                                	${checks.join('')}
                                                </div>
                                            </div>
                                            <div class="branch-item__row">
                                                ${moreSchedule}
                                            </div>
                                            <div class="branch-item__row">
                                                <div class="branch-item__row-top">
                                                    <div class="branch-item__title">
                                                        טלפונים
                                                    </div>
                                                </div>
                                                <div class="branch-item__grid-2">
                                                    <span>טלפונים</span>
                                                    <strong>076-8053222</strong>
                                                    <span>יועצי משכנתאות</span>
                                                    <strong>076-8053222</strong>
                                                    <span>פקס</span>
                                                    <strong>076-8053222</strong>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="branch-item__bottom">
                                            <div class="branch-item__schedule">
                                                <div class="branch-item__schedule-top">
                                                    <div class="mini-status mini-status--${status}">
                                                        <div class="mini-status__name">פתוח עכשיו</div>
                                                    </div>
                                                    <div class="branch-item__distantion">
                                                        <span>0.8 ק״מ מהיעד</span>
                                                        <span>קרוב אליי</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="branch-item__buttons">
                                                <a href="#" class="secondary-btn-small">ניווט</a>
                                                <a href="#" class="typical-btn-small">קביעת פגישה</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
									`
							});
						let uniqueChars = myarr.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i);

						document.querySelectorAll('.js-filter-checkbox').forEach((element) => {
							element.querySelector('input').checked = true;

							uniqueChars.forEach((el) => {
								let id = el.id;
								if(element.getAttribute('data-id') === id) {
									element.querySelector('input').checked = false;
									element.querySelector('input').classList.remove('count')
								}
							})

							if(element.querySelector('input').classList.contains('count')) {
								count.push(element)
							}
						})
						countHidden.innerHTML = count.length + '+';
						document.querySelector('.js-branch-count').innerHTML = results.length -1
						const appendBlock = document.querySelector('.js-append-body').querySelector('.branches-block-list');
						const appendBlockModals = document.querySelector('.js-append-body').querySelector('.js-append-modals');
						appendBlock.innerHTML = theseCheckBoxes.join('');
						appendBlockModals.innerHTML = openModal.join('');
						branchToggleFunc()
						window.tabsFunc()
					})
				},
				selection: (event) => {
					let myarr = [];
					let count = [];
					document.querySelectorAll('.js-block-branch').forEach((el) => {
						el.classList.remove('is-active');
						el.closest('.branches-block').querySelector('.branches-block-list').classList.remove('hide');
					})
					document.querySelector('.filter-map__title').style.display = 'none';
					document.querySelector('.js-show-on-search').style.display = 'block';
					document.querySelector('.branches-block-list').classList.add('uniq')
					if(event.detail.selection.value.cityTrigger) {
						autoCompleteJS.input.value = event.detail.selection.value.name;
						let nameCity = event.detail.selection.value.name;
						deleteMarkers()
						console.log(event.detail.results);
						const results = event.detail.results.filter((word) => {
							if(word.value.point && word.value.city === nameCity) {
								return word
							}
						});
						setMarkers(map, results, '', false, true);
						document.querySelector('.js-branch-count').innerHTML = event.detail.results.length - 1
						let cityCheckBoxes =
							event.detail.results.map(function(element) {
								if(element.value.cityInclude === nameCity) {
									const name = element.value.name;
									const number = element.value.number;
									const address = element.value.address;
									const phone = element.value.phone;
									const openTime = element.value.openTime;
									const schedule = element.value.schedule;
									const id = element.value.id;
									const lat = element.value.lat;
									const lng = element.value.lng;
									const status = element.value.status;
									return `
								 <div class="branch-item">
								 <button class="branch-item__top js-open-branch" data-id="${id}" data-lat="${lat}" data-lng="${lng}" data-zoom="16">
								     <div class="branch-item__numb">${number}</div>
								     <div class="branch-item__name">${name}</div>
								     <img src="./assets/img/arrow-right.svg" alt="tick" width="14" height="14">
								 </button>
								 <div class="branch-item__contacts">
								     <div class="branch-item__address">${address}</div>
								     <a href="tel:${phone}" class="branch-item__phone">${phone}</a>
								 </div>
								 <div class="branch-item__bottom">
								     <div class="branch-item__schedule">
								         <div class="branch-item__schedule-top">
								             <button class="mini-status mini-status--${status}">
								                 <div class="mini-status__name">הסניף סגור</div>
								                 <img src="./assets/img/info.svg" alt="tick" width="30" height="30">
								                 <div class="mini-status__dropdown">
								                     <div class="mini-status__title">שעות הפעילות</div>
								                     <div class="mini-status__table">${schedule}</div>
								                 </div>
								             </button>
								         </div>
								         <time class="branch-item__time">ייפתח היום ב-${openTime}</time>
								     </div>
								     <div class="branch-item__buttons">
								         <a href="#" class="secondary-btn-small">ניווט</a>
								         <a href="#" class="typical-btn-small">קביעת פגישה</a>
								     </div>
								 </div>
								  </div>
								`
								}
							});
						let openModal =
							event.detail.results.map(function(element) {
								if(element.value.cityInclude === nameCity) {
									const name = element.value.name;
									const number = element.value.number;
									const address = element.value.address;
									const city = element.value.city;
									const phone = element.value.phone;
									const openTime = element.value.openTime;
									const schedule = element.value.schedule;
									const checkedFilter = element.value.checkedFilter;
									const moreSchedule = element.value.moreSchedule;
									const status = element.value.status;
									const id = element.value.id;
									checkedFilter.forEach((el) => {
										if(!el.status) {
											myarr.push(el)
										}
									})
									let checks = checkedFilter.map((el) => {
										return `
										  <label data-id="${el.id}" class="input-checkbox input-checkbox--disabled input-checkbox--square">
                                                <input type="checkbox" ${el.status ? 'checked' : ''} name="checkbox1">
                                                <span class="input-checkbox-checkmark"></span>
                                                <span class="input-checkbox-label">${el.name}</span>
                                            </label>
										`
									})
									return `
										<div class="branch-popup js-block-branch" data-id="${id}">
                                    <div class="branch-item branch-item--opened">
                                        <button class="branch-item__top js-close-branch">
                                            <img src="./assets/img/arrow-right.svg" alt="tick" width="14" height="14">
                                            <div class="branch-item__numb">
                                               ${number}
                                            </div>
                                            <div class="branch-item__name">
                                                ${name}
                                            </div>
                                        </button>
                                        <div class="branch-item__scroll">
                                            <div class="branch-item__title">
                                              	${city}
                                            </div>
                                            <div class="branch-item__address">
                                                 ${address}
                                            </div>
                                            <div class="branch-item__row">
                                                <div class="branch-item__title">
                                                    אבן גבירול 19, א׳, ג׳, ה׳ אביב
                                                </div>
                                                <div class="branch-item__grid-3">
                                                	${checks.join('')}
                                                </div>
                                            </div>
                                            <div class="branch-item__row">
                                                ${moreSchedule}
                                            </div>
                                            <div class="branch-item__row">
                                                <div class="branch-item__row-top">
                                                    <div class="branch-item__title">
                                                        טלפונים
                                                    </div>
                                                </div>
                                                <div class="branch-item__grid-2">
                                                    <span>טלפונים</span>
                                                    <strong>076-8053222</strong>
                                                    <span>יועצי משכנתאות</span>
                                                    <strong>076-8053222</strong>
                                                    <span>פקס</span>
                                                    <strong>076-8053222</strong>
                                                </div>
                                            </div>
                                             <div class="branch-item__row">
                                                <div class="branch-item__row-top">
                                                    <div class="branch-item__title js-button-tab" data-id="more ${id}">
                                                        + מידע נוסף
                                                    </div>
                                                </div>
                                                <div class="branch-item__grid-2 js-block-tab" data-id="more ${id}">
                                                    <span>טלפונים</span>
                                                    <strong>076-8053222</strong>
                                                    <span>יועצי משכנתאות</span>
                                                    <strong>076-8053222</strong>
                                                    <span>פקס</span>
                                                    <strong>076-8053222</strong>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="branch-item__bottom">
                                            <div class="branch-item__schedule">
                                                <div class="branch-item__schedule-top">
                                                    <div class="mini-status mini-status--${status}">
                                                        <div class="mini-status__name">פתוח עכשיו</div>
                                                    </div>
                                                    <div class="branch-item__distantion">
                                                        <span>0.8 ק״מ מהיעד</span>
                                                        <span>קרוב אליי</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="branch-item__buttons">
                                                <a href="#" class="secondary-btn-small">ניווט</a>
                                                <a href="#" class="typical-btn-small">קביעת פגישה</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
									`
								}
							});
						let uniqueChars = myarr.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i);

						document.querySelectorAll('.js-filter-checkbox').forEach((element) => {
							element.querySelector('input').checked = true;

							uniqueChars.forEach((el) => {
								let id = el.id;
								if(element.getAttribute('data-id') === id) {
									element.querySelector('input').checked = false;
									element.querySelector('input').classList.remove('count')
								}
							})

							if(element.querySelector('input').classList.contains('count')) {
								count.push(element)
							}
						})
						countHidden.innerHTML = count.length + '+';
						document.querySelector('.js-branch-count').innerHTML = event.detail.results.length - 1;
						const appendBlock = document.querySelector('.js-append-body').querySelector('.branches-block-list');
						const appendBlockModals = document.querySelector('.js-append-body').querySelector('.js-append-modals');
						appendBlock.innerHTML = cityCheckBoxes.join('');
						appendBlockModals.innerHTML = openModal.join('');
						branchToggleFunc()
						window.tabsFunc()
					} else {
						const elem = event.detail.selection.value;
						const name = elem.name;
						const number = elem.number;
						const address = elem.address;
						const city = elem.city;
						const phone = elem.phone;
						const openTime = elem.openTime;
						const schedule = elem.schedule;
						const checkedFilter = elem.checkedFilter;
						const moreSchedule = elem.moreSchedule;
						const lat = elem.lat;
						const lng = elem.lng;
						const id = elem.id;
						const status = elem.status;
						checkedFilter.forEach((el) => {
							document.querySelectorAll('.js-filter-checkbox').forEach((check) => {
								if(el.id === check.getAttribute('data-id')) {
									check.querySelector('input').checked = el.status
								}
							})
						})
						let checks = checkedFilter.map((el) => {
							return `
										  <label data-id="${el.id}" class="input-checkbox input-checkbox--disabled input-checkbox--square">
                                                <input type="checkbox" ${el.status ? 'checked' : ''} name="checkbox1">
                                                <span class="input-checkbox-checkmark"></span>
                                                <span class="input-checkbox-label">${el.name}</span>
                                            </label>
										`
						})
						autoCompleteJS.input.value = name;
						document.querySelector('.js-branch-count').innerHTML =  1
						const appendBlock = document.querySelector('.js-append-body').querySelector('.branches-block-list');
						const appendBlockModal = document.querySelector('.js-append-body').querySelector('.js-append-modals');
						const appendItem = `
							 <div class="branch-item">
								 <button class="branch-item__top js-open-branch" data-id="${id}" data-lat="${lat}" data-lng="${lng}" data-zoom="16">
								     <div class="branch-item__numb">${number}</div>
								     <div class="branch-item__name">${name}</div>
								     <img src="./assets/img/arrow-right.svg" alt="tick" width="14" height="14">
								 </button>
								 <div class="branch-item__contacts">
								     <div class="branch-item__address">${address}</div>
								     <a href="tel:${phone}" class="branch-item__phone">${phone}</a>
								 </div>
								 <div class="branch-item__bottom">
								     <div class="branch-item__schedule">
								         <div class="branch-item__schedule-top">
								             <button class="mini-status mini-status--${status}">
								                 <div class="mini-status__name">הסניף סגור</div>
								                 <img src="./assets/img/info.svg" alt="tick" width="30" height="30">
								                 <div class="mini-status__dropdown">
								                     <div class="mini-status__title">שעות הפעילות</div>
								                     <div class="mini-status__table">${schedule}</div>
								                 </div>
								             </button>
								         </div>
								         <time class="branch-item__time">ייפתח היום ב-${openTime}</time>
								     </div>
								     <div class="branch-item__buttons">
								         <a href="#" class="secondary-btn-small">ניווט</a>
								         <a href="#" class="typical-btn-small">קביעת פגישה</a>
								     </div>
								 </div>
								  </div>
						`
						const openModal = `
							<div class="branch-popup js-block-branch" data-id="${id}">
                                    <div class="branch-item branch-item--opened">
                                        <button class="branch-item__top js-close-branch">
                                            <img src="./assets/img/arrow-right.svg" alt="tick" width="14" height="14">
                                            <div class="branch-item__numb">
                                               ${number}
                                            </div>
                                            <div class="branch-item__name">
                                                ${name}
                                            </div>
                                        </button>
                                        <div class="branch-item__scroll">
                                            <div class="branch-item__title">
                                              ${city}
                                            </div>
                                            <div class="branch-item__address">
                                                 ${address}
                                            </div>
                                            <div class="branch-item__row">
                                                <div class="branch-item__title">
                                                    אבן גבירול 19, א׳, ג׳, ה׳ אביב
                                                </div>
                                                <div class="branch-item__grid-3">
                                                 ${checks.join('')}
                                                </div>
                                            </div>
                                            <div class="branch-item__row">
                                                ${moreSchedule}
                                            </div>
                                            <div class="branch-item__row">
                                                <div class="branch-item__row-top">
                                                    <div class="branch-item__title">
                                                        טלפונים
                                                    </div>
                                                </div>
                                                <div class="branch-item__grid-2">
                                                    <span>טלפונים</span>
                                                    <strong>076-8053222</strong>
                                                    <span>יועצי משכנתאות</span>
                                                    <strong>076-8053222</strong>
                                                    <span>פקס</span>
                                                    <strong>076-8053222</strong>
                                                </div>
                                            </div>
                                        </div>
                                         <div class="branch-item__row">
                                                <div class="branch-item__row-top">
                                                    <div class="branch-item__title js-button-tab" data-id="more ${id}">
                                                        + מידע נוסף
                                                    </div>
                                                </div>
                                                <div class="branch-item__grid-2 js-block-tab" data-id="more ${id}">
                                                    <span>טלפונים</span>
                                                    <strong>076-8053222</strong>
                                                    <span>יועצי משכנתאות</span>
                                                    <strong>076-8053222</strong>
                                                    <span>פקס</span>
                                                    <strong>076-8053222</strong>
                                                </div>
                                            </div>
                                        <div class="branch-item__bottom">
                                            <div class="branch-item__schedule">
                                                <div class="branch-item__schedule-top">
                                                    <div class="mini-status mini-status--${status}">
                                                        <span class="mini-status__name">פתוח עכשיו</span>
                                                    </div>
                                                    <div class="branch-item__distantion">
                                                        <span>0.8 ק״מ מהיעד</span>
                                                        <span>קרוב אליי</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="branch-item__buttons">
                                                <a href="#" class="secondary-btn-small">ניווט</a>
                                                <a href="#" class="typical-btn-small">קביעת פגישה</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
						`
						appendBlock.innerHTML = appendItem;
						appendBlockModal.innerHTML = openModal;
						branchToggleFunc()
						window.tabsFunc()
						deleteMarkers();
						const position = {
							lat: elem.lat,
							lng: elem.lng
						}
						var marker = new google.maps.Marker({
							position: new google.maps.LatLng(elem.lat, elem.lng),
							map: map,
							icon: image,
							shape: shape,
							title: elem[0],
							zIndex: elem[3],
						});

						marker.addListener('click', function() {
							map.panTo(marker.getPosition());
							map.setZoom(20)
						});

						marker.addListener('mouseover', function() {
							infoWindow.setPosition(position);
							infoWindow.open(map);
							infoWindow.setContent(elem.infoWindow);
						});

						marker.addListener('click', function() {
							infoWindow.setPosition(position);
							infoWindow.open(map);
							infoWindow.setContent(elem.infoWindow);
						});

						marker.addListener('mouseout', function() {
							infoWindow.setPosition(position);
							infoWindow.close();
						});

						markers.push(marker);
						map.panTo(new google.maps.LatLng(elem.lat, elem.lng));
						map.setZoom(24);
					}

				},
			},
		},
	});

}

document.addEventListener('DOMContentLoaded', () => {
	window.initMap = initMap;
})

document.addEventListener('keyup', function (event) {
	var code = event.keyCode || event.which;
	console.log(document.activeElement);
});

document.querySelectorAll('input').forEach((input) => {
	input.addEventListener('keyup', (ev) => {
		var code = ev.keyCode || ev.which;

		if(code === 13) {
			input.click()
		}
	})
})
