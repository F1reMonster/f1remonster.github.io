
// card with dent on the "Credit Cards Lobby" page.
(function() {
    let card_canvases = __arrElements(".how-to-join .cards-wrap canvas");

    // draw border and shadow for custrom card with dent
    function drawCardsWithDent() {
        card_canvases.forEach(function(canvas) {
            let is_background_image = canvas.classList.contains("back-img");
            let strokeStyle = "rgba(60,63,69,0.2)";
            let r_dent = 24;
            let h_dent = 32;
            let w_dent = 10;
            let fillStyle;
            if (is_background_image) {
                fillStyle = "rgba(60,63,69,0.2)";
                // par.classList.remove('hover');
            } else {
                fillStyle = "#fff";
            }

            let lineWidth = 1;
            let params = { canvas, is_background_image, strokeStyle, fillStyle, lineWidth, r_dent, h_dent, w_dent };
            drawCardWithDent(params);
        });
    }
    if (card_canvases.length > 0) {
        drawCardsWithDent();
        let first_item = card_canvases[0];
        first_item = first_item.parentElement;
        let font_change_subscriber = FontChangeSubscriber.getInstance();
        font_change_subscriber.add(first_item);

        first_item.addEventListener("fontchange", drawCardsWithDent);

        window.addEventListener("resize", __throttle(drawCardsWithDent), 80);
    }
})();

// hover on the card with dent on the "You wanted more" page
(function() {
    const card_with_dents_btns = __arrElements(".how-to-join .cards-wrap .card-btn");

    card_with_dents_btns.forEach(function(btn) {
        btn.addEventListener("mouseenter", function() {
            let par = btn.parentElement.parentElement;
            let canvas = par.querySelector(":scope .card-canvas");
            let is_background_image = false;
            let strokeStyle = "#00A661";
            let fillStyle = "#fff";
            let lineWidth = 2;
            let r_dent = 24;
            let h_dent = 32;
            let w_dent = 10;
            let params = { canvas, is_background_image, strokeStyle, fillStyle, lineWidth, r_dent, h_dent, w_dent };
            drawCardWithDent(params);
        });
        btn.addEventListener("mouseleave", function() {
            let par = btn.parentElement.parentElement;
            let params = {
                canvas: par.querySelector(":scope .card-canvas"),
                is_background_image: false,
                strokeStyle: "rgba(60,63,69,0.2)",
                fillStyle: "#fff",
                lineWidth: 1,
                r_dent: 24,
                h_dent: 32,
                w_dent: 10,
            };
            drawCardWithDent(params);
        });
    });
})();
