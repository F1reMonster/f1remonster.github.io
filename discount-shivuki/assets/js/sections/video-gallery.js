
// video gallery page functionality.
(function() {
	let youtube_player = document.getElementById("custom-youtube-player");
	if (!youtube_player) {
		return;
	}

	// 2. This code loads the IFrame Player API code asynchronously.
	var tag = document.createElement("script");

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName("script")[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	// find out and youtube_id from the first video slide
	let first_slide = document.querySelector(".video-gallery-section .video-slide");
	let youtube_id = "";
	if (first_slide) {
		youtube_id = first_slide.dataset.youtube_id;
	}

	let player;
	window.onYouTubeIframeAPIReady = function() {
		player = new YT.Player(youtube_player, {
			height: "390",
			width: "640",
			videoId: youtube_id,
			playerVars: {
				playsinline: 1,
			},
			events: {
				onReady: onPlayerReady,
			},
		});
	};

	function onPlayerReady(event) {
		event.target.playVideo();
	}

	const swiper = new Swiper(".video-gallery-section .swiper", {
		// 'autoplay': {
		//     delay: 500000
		// },
		slidesPerView: 1.8,
		loop: true,
		breakpoints: {
			769: {
				slidesPerView: 3,
			},
			1456: {
				slidesPerView: 4,
			},
		},
		navigation: {
			nextEl: ".video-gallery-section .next",
			prevEl: ".video-gallery-section .prev",
		},
	});

	//click on a slide will start playing it in the player on the video gallery page.
	let slides = __arrElements(".video-gallery-section .video-slide");
	let player_wrap = document.getElementById("custom-youtube-player-wrap");
	let video_header = document.getElementById("video-header");
	let video_desc = document.getElementById("video-desc");

	for (const slide of slides) {
		const btn = slide.querySelector(":scope .btn-focus");
		btn.addEventListener("click", function() {
			if (slide.classList.contains("active")) {
				return;
			}
			slides.map((item) => item.classList.remove("active"));

			player.loadVideoById(slide.dataset.youtube_id);

			//set player new header from slide
			let cur_slide_title = slide.querySelector(":scope .slide-header");
			video_header.innerHTML = cur_slide_title.innerHTML;

			let new_desc = "";
			let cur_slide_desc = slide.querySelector(":scope .desc");
			if (cur_slide_desc) {
				new_desc = cur_slide_desc.innerHTML;
			}
			video_desc.innerHTML = new_desc;

			slide.classList.add("active");

			let player_rect = player_wrap.getBoundingClientRect();
			let scroll = player_rect.top + window.scrollY - 20;
			window.scrollTo({ top: scroll, behavior: "smooth" });
		});
	}
})();
