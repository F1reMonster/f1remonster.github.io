// home top dismisable strip-swiper
(function() {
    let home_top_stripe = document.getElementById("home-top-stripe");
    if (!home_top_stripe) {
        return;
    }

    new Swiper("#home-top-stripe .swiper", {
        loop: true,
        slidesPerView: 1,
        navigation: {
            nextEl: "#home-top-stripe .next",
        },
        autoplay: {
            delay: 8000,
        },
    });

    const close_btn = home_top_stripe.querySelector(":scope .close");
    close_btn.addEventListener("click", function() {
        home_top_stripe.remove();
        document.body.classList.remove("home-strip-present");
    });
})();
