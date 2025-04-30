(function() {
    let card_canvases = __arrElements(".section-cards-with-dent-and-list canvas");
    if (card_canvases.length > 0) {
        drawCardsWithDentAlt('.section-cards-with-dent-and-list canvas');
        drawCardsWithDentAltHover('.section-cards-with-dent-and-list .card-btn');
    }
})()
