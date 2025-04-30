
(function() {
    const importantTermsList = document.querySelectorAll(".important-terms-list");
    const isHe = document.querySelector('html[lang="he"]') !== null ? false : true;

    [...importantTermsList].map((item) => {
        new Masonry(item, {
            itemSelector: ".important-terms-card",
            columnWidth: ".important-terms-card-sizer",
            gutter: ".important-terms-card-gutter-sizer",
            percentPosition: true,
            horizontalOrder: true,
            originLeft: isHe,
        });
    });
})();
