
// card with dent on the "Marketing Long Campaign" page.
(function() {

    let card_canvases = __arrElements('.market-card-dent canvas');

    // draw border and shadow for custrom card with dent
    function drawCardsWithDent() {
        card_canvases.forEach(function(canvas) {
            let is_background_image = canvas.classList.contains('back-img');
            let strokeStyle = 'rgba(60,63,69,0.2)';
            let r_dent = 25;
            let h_dent = 30;
            let w_dent = 20;
            let fillStyle;
            if (is_background_image) {
                fillStyle = 'rgba(60,63,69,0.2)';
                // par.classList.remove('hover');
            }
            else {
                fillStyle = '#fff';
            }

            let lineWidth = 1;
            let params = { canvas, is_background_image, strokeStyle, fillStyle, lineWidth, r_dent, h_dent, w_dent }
            drawCardWithDent(params);

        });
    }
    if (card_canvases.length > 0) {
        drawCardsWithDent();
        let first_item = card_canvases[0];
        first_item = first_item.parentElement;
        let font_change_subscriber = FontChangeSubscriber.getInstance();
        font_change_subscriber.add(first_item);

        first_item.addEventListener('fontchange', drawCardsWithDent);

        window.addEventListener('resize', __throttle(drawCardsWithDent), 80);
    }
})();


// hover on the card with dent on the "Marketing Long Campaign" page
(function() {
    const card_with_dents_btns = __arrElements('.market-card-dent .card-btn');

    card_with_dents_btns.forEach(function(btn) {
        btn.addEventListener('mouseenter', function() {
            let par = btn.parentElement.parentElement;
            par.classList.add('hover');
            let canvas = par.querySelector(':scope .card-canvas');
            let is_background_image = false;
            let strokeStyle = '#00A661';
            let fillStyle = '#fff';
            let lineWidth = 2;
            let r_dent = 25;
            let h_dent = 30;
            let w_dent = 20;
            let params = { canvas, is_background_image, strokeStyle, fillStyle, lineWidth, r_dent, h_dent, w_dent };
            drawCardWithDent(params);
        });
        btn.addEventListener('mouseleave', function() {
            let par = btn.parentElement.parentElement;
            par.classList.remove('hover');
            let params = {
                'canvas': par.querySelector(':scope .card-canvas'),
                'is_background_image': false,
                'strokeStyle': 'rgba(60,63,69,0.2)',
                'fillStyle': '#fff',
                'lineWidth': 1,
                'r_dent': 25,
                'h_dent': 30,
                'w_dent': 20
            };
            drawCardWithDent(params);
        });
    });
})();
