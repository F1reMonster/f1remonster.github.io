function drawCalcCard(params) {
    let { canvas, is_background_image, strokeStyle, fillStyle, lineWidth } = params;

    let proportion_coef = getFontSizeProportionCoeficient(canvas, 16);

    let parent = canvas.parentElement;
    let dir = window.getComputedStyle(parent).getPropertyValue("direction");
    let btn = parent.querySelector(":scope .calculator-block-submit");
    let rect_btn = btn.getClientRects();
    let w_half_btn = rect_btn[0].width / 2;
    let h_half_btn = rect_btn[0].height / 2;
    let delta_btn = window.innerWidth > 767 ? 20 : 20;
    delta_btn = delta_btn * proportion_coef;

    // shift btn relativly to div containing it.
    let shift_btn = window.innerWidth > 991 ? 19 : 25;
    shift_btn = shift_btn * proportion_coef;

    let rect = parent.getClientRects();
    let w = rect[0].width;
    let h = rect[0].height;
    let half_w = w / 2;
    let half_h = h / 2;
    const margin = 20 * proportion_coef;
    let r = 13 * proportion_coef;

    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);

    let ctx = canvas.getContext("2d");

    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = fillStyle;
    ctx.clearRect(0, 0, w, h);

    ctx.beginPath();

    let gipotenuza = w_half_btn + delta_btn;
    let katet = w_half_btn - shift_btn;
    let half_angle = Math.acos(katet / gipotenuza);

    let correction = 10 * proportion_coef;
    if (dir === "rtl") {
        if (window.innerWidth > 1051) {
            const margin = 20;
            let r = 13;

            ctx.arc(-2, half_h + 5, 61, 1.62 * Math.PI, 0.38 * Math.PI);
            ctx.arcTo(margin, h - margin, w - margin, h - margin, r);
            ctx.arcTo(w - margin, h - margin, w - margin, margin, r);
            ctx.arcTo(w - margin, margin, margin, margin, r);
            ctx.arcTo(margin, margin, margin, half_h - h_half_btn, r);
            ctx.lineTo(margin, half_h - h_half_btn);
        } else if (window.innerWidth > 991) {
            const margin = 20;
            let r = 13;

            ctx.arc(2, half_h + 5, 51, 1.62 * Math.PI, 0.38 * Math.PI);
            ctx.arcTo(margin, h - margin, w - margin, h - margin, r);
            ctx.arcTo(w - margin, h - margin, w - margin, margin, r);
            ctx.arcTo(w - margin, margin, margin, margin, r);
            ctx.arcTo(margin, margin, margin, half_h - h_half_btn, r);
            ctx.lineTo(margin, half_h - h_half_btn);
        } else {
            let st_angle = 1.5 * Math.PI - half_angle;
            let end_angle = 1.5 * Math.PI + half_angle;
            ctx.arc(half_w, h + h_half_btn - shift_btn - delta_btn - correction / 2, gipotenuza - correction, st_angle, end_angle, false);
            ctx.arcTo(w - margin, h - margin, w - margin, margin, r);
            ctx.arcTo(w - margin, margin, margin, margin, r);
            ctx.arcTo(margin, margin, margin, h - margin, r);
            ctx.arcTo(margin, h - margin, w - margin, h - margin, r);
        }
    } else {
        if (window.innerWidth > 1051) {
            const margin = 20;
            let r = 13;

            ctx.arc(w + 2, half_h + 5, 61, 1.38 * Math.PI, 0.62 * Math.PI, true);
            ctx.arcTo(w - margin, h - margin, margin, h - margin, r);
            ctx.arcTo(margin, h - margin, margin, margin, r);
            ctx.arcTo(margin, margin, w - margin, margin, r);
            ctx.arcTo(w - margin, margin, w - margin, h - margin, r);
        } else if (window.innerWidth > 991) {
            const margin = 20;
            let r = 13;

            ctx.arc(w - 2, half_h + 5, 51, 1.38 * Math.PI, 0.62 * Math.PI, true);
            ctx.arcTo(w - margin, h - margin, margin, h - margin, r);
            ctx.arcTo(margin, h - margin, margin, margin, r);
            ctx.arcTo(margin, margin, w - margin, margin, r);
            ctx.arcTo(w - margin, margin, w - margin, h - margin, r);
        } else {
            let st_angle = 1.5 * Math.PI - half_angle;
            let end_angle = 1.5 * Math.PI + half_angle;
            ctx.arc(half_w, h + h_half_btn - shift_btn - delta_btn - correction / 2, gipotenuza - correction, st_angle, end_angle, false);
            ctx.arcTo(w - margin, h - margin, w - margin, margin, r);
            ctx.arcTo(w - margin, margin, margin, margin, r);
            ctx.arcTo(margin, margin, margin, h - margin, r);
            ctx.arcTo(margin, h - margin, w - margin, h - margin, r);
        }
    }

    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // ctx.beginPath();
    // ctx.moveTo(w - margin, margin);
    // ctx.lineTo(w - margin, h - margin);
    // ctx.strokeStyle = '#f0f';
    // ctx.stroke();
}

function drawCalcMiddleCard(params) {
    let { canvas, is_background_image, strokeStyle, fillStyle, lineWidth } = params;
    let proportion_coef = getFontSizeProportionCoeficient(canvas, 16);
    let parent = canvas.parentElement;

    let rect = parent.getClientRects();
    let w = rect[0].width;
    let h = rect[0].height;

    const margin = 20 * proportion_coef;
    let r = 13 * proportion_coef;

    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);

    let ctx = canvas.getContext("2d");

    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = fillStyle;
    ctx.clearRect(0, 0, w, h);

    ctx.beginPath();

    ctx.moveTo(w / 2, margin);
    ctx.arcTo(w - margin, margin, w - margin, h - margin, r);
    ctx.arcTo(w - margin, h - margin, margin, h - margin, r);
    ctx.arcTo(margin, h - margin, margin, margin, r);
    ctx.arcTo(margin, margin, w - margin, margin, r);

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

// card with dent on the "Calculator" page.
(function() {
    let card_canvases = __arrElements(".calculator-block-end canvas");

    // draw border and shadow for custrom card with dent
    function drawCardsWithDent() {
        let proportion_coef = FontChangeSubscriber.getInstance().proportion_coef;
        card_canvases.forEach(function(canvas) {
            let is_background_image = canvas.classList.contains("back-img");
            let strokeStyle = "rgba(60,63,69,0.2)";
            let fillStyle;
            if (is_background_image) {
                fillStyle = "rgba(60,63,69,0.2)";
                // par.classList.remove('hover');
            } else {
                fillStyle = "#fff";
            }

            let lineWidth = 1;
            let params = { canvas, is_background_image, strokeStyle, fillStyle, lineWidth };
            drawCalcCard(params);
        });
    }
    if (card_canvases.length > 0) {
        drawCardsWithDent();
        window.addEventListener("resize", drawCardsWithDent);
        // let first_item = card_canvases[0];
        // first_item = first_item.parentElement;
        // let font_change_subscriber = FontChangeSubscriber.getInstance();
        // font_change_subscriber.add(first_item);

        // window.addEventListener('resize', __throttle(drawCardsWithDent), 80);
    }
})();

(function() {
    let card_canvases = __arrElements(".calculator-block-mid canvas");

    // draw border and shadow for custrom card with dent
    function drawCardsWithDent() {
        card_canvases.forEach(function(canvas) {
            let is_background_image = canvas.classList.contains("back-img");
            let strokeStyle = "rgba(60,63,69,0.2)";
            let fillStyle;
            if (is_background_image) {
                fillStyle = "rgba(60,63,69,0.2)";
                // par.classList.remove('hover');
            } else {
                fillStyle = "#fff";
            }

            let lineWidth = 1;
            let params = { canvas, is_background_image, strokeStyle, fillStyle, lineWidth };
            drawCalcMiddleCard(params);
        });
    }
    if (card_canvases.length > 0) {
        drawCardsWithDent();
        window.addEventListener("resize", drawCardsWithDent);
    }
})();


// calculator
(function() {
    if (!("$" in window)) {
        return;
    }
    $('input[type="range"]').rangeslider({
        // Feature detection the default is `true`.
        // Set this to `false` if you want to use
        // the polyfill also in Browsers which support
        // the native <input type="range"> element.
        polyfill: false,

        // Default CSS classes
        rangeClass: "rangeslider",
        disabledClass: "rangeslider--disabled",
        horizontalClass: "rangeslider--horizontal",
        verticalClass: "rangeslider--vertical",
        fillClass: "rangeslider__fill",
        handleClass: "rangeslider__handle",
        tooltipClass: "input-range-tooltip",

        // Callback function
        onInit: function() {
            const el = $(this)[0];
            const handleEl = el.$handle[0];
            const inputEl = el.$element[0];
            const tooltip = document.createElement("div");
            const tooltipClass = el.options.tooltipClass;
            const parent = handleEl.closest(".calculator-block-field");
            const min = el.min;
            const max = el.max;
            const minVal = parent.querySelector(".input-range-min");
            const maxVal = parent.querySelector(".input-range-max");

            minVal.innerHTML = min;
            maxVal.innerHTML = max;

            tooltip.classList.add(tooltipClass);
            tooltip.innerHTML = el.value;

            if (inputEl.hasAttribute("data-is-price")) {
                tooltip.innerHTML = el.value
                    .toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                    })
                    .slice(0, -3);
                minVal.innerHTML = min
                    .toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                    })
                    .slice(0, -3);
                maxVal.innerHTML = max
                    .toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                    })
                    .slice(0, -3);
            } else {
                tooltip.innerHTML = el.value;
                minVal.innerHTML = min;
                maxVal.innerHTML = max;
            }
            // inputEl.hasAttribute('data-is-price') ?  : tooltip.innerHTML = el.value;
            handleEl.append(tooltip);

            if (parent !== null) {
                const num = parent.querySelector(".calculator-block-num");

                if (num !== null) {
                    num.hasAttribute("data-is-price")
                        ? (num.innerHTML = el.value
                            .toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                            })
                            .slice(0, -3))
                        : (num.innerHTML = el.value);
                }
            }
        },

        // Callback function
        onSlide: function(position, value) {
            const el = $(this)[0];
            const handleEl = el.$handle[0];
            const inputEl = el.$element[0];
            const tooltipClass = el.options.tooltipClass;
            const tooltip = handleEl.querySelector("." + tooltipClass);
            const parent = handleEl.closest(".calculator-block-field");

            if (tooltip !== null) {
                inputEl.hasAttribute("data-is-price")
                    ? (tooltip.innerHTML = el.value
                        .toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                        })
                        .slice(0, -3))
                    : (tooltip.innerHTML = el.value);
                tooltip.classList.add("active");
            }

            if (parent !== null) {
                const num = parent.querySelector(".calculator-block-num");

                if (num !== null) {
                    num.hasAttribute("data-is-price")
                        ? (num.innerHTML = el.value
                            .toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                            })
                            .slice(0, -3))
                        : (num.innerHTML = el.value);
                }
            }
        },

        // Callback function
        onSlideEnd: function(position, value) {
            const el = $(this)[0];
            const handleEl = el.$handle[0];
            const tooltipClass = el.options.tooltipClass;
            const tooltip = handleEl.querySelector("." + tooltipClass);

            if (tooltip !== null) {
                tooltip.classList.remove("active");
            }
        },
    });
})();
