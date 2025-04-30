//home slider
(function() {
    let home_slider = document.getElementById("home-slider");
    if (!home_slider) {
        return;
    }
    new Swiper(home_slider, {
        loop: true,
        navigation: {
            nextEl: "#home-next-slide",
            prevEl: "#home-prev-slide",
        },
        slidesPerView: 1.5,
        centeredSlides: true,
        breakpoints: {
            768: {
                slidesPerView: 3,
                centeredSlides: false,
            },
            1280: {
                slidesPerView: 4,
                centeredSlides: false,
            },
        },
    });
})();
