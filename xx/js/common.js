$(document).ready(function () {

    $("body, html").click(function () {
        $(".dropdown").removeClass('active');
    });

    //stopPropagation
    $(".dropdown, .popup").click( function (e) {
        e.stopPropagation();
    });

    //Select
    $(".select-item").click(function () {
        $(this).closest(".select").toggleClass('active');
        $(".select-drop").slideToggle(300);
    });

    $(".select-option").click(function () {
        let option = $(this).text();
        let optionLink = $(this).find("a").text();

        $(this).closest(".select").removeClass('active').find(".select-item span").text(option);
        $(this).closest(".select-lang").removeClass('active').find(".select-item span").text(optionLink);

        $(this).addClass('active').siblings().removeClass('active');
        $(this).closest(".select").find(".select-drop").slideUp(300);
    });

    //choice number of guests
    $(".input-visitor, .icon").click( function (e) {
        e.stopPropagation();
        $(".dropdown").addClass('active');
    });

    $(".count-minus").click(function () {
        let $input = $(this).parent().find("input");
        let count = parseInt($input.val() - 1);

        //adults
        let $inputChildren= $(this).parent().find(".count__adults");
        let guestAdult  = count < 1 ? 1 : count;
        $inputChildren.val(guestAdult);

        //children
        let $inputAdults = $(this).parent().find(".count__children");
        let guestChildren  = count < 0 ? 0 : count;
        $inputAdults.val(guestChildren);

        $input.change();
        return false;
    });

    $('.count-plus').click(function () {
        let $input = $(this).parent().find('.input-count');
        $input.val(parseInt($input.val()) + 1);
        let count = parseInt($input.val());
        count = count >= 12 ? 12 : count;
        $input.val(count);
        $input.change();
        return false;
    });

    $(".input-count").change( function () {
        let a = parseInt($(".count__adults").val());
        let b = parseInt($(".count__children").val());
        let total = a+b;

        if (total == 1 || total >= 5){
            $(".input-visitor").val(a+b + " человек");
        } else {
            $(".input-visitor").val(a+b + " человекa");
        }
    });

    //Slider (page MAIN)
    $(".row-slider").slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        variableWidth: true,
        prevArrow:" <button type=\"button\" class=\"btn-arrow btn-prev\"></button>",
        nextArrow:"  <button type=\"button\" class=\"btn-arrow btn-next\"></button>",
        responsive: [
            {
                breakpoint: 1179,
                settings: {
                    slidesToShow: 3,
                    variableWidth: false,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    variableWidth: false,
                }
            },

        ]
    });

    //Slider in cards
    $(".card-slider").slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
    });

    // POPUPS

    $(".header__selects-item .menu__link, .footer__select").click(function (e) {
        e.preventDefault();
        $(".popup__lang-curr").addClass('active');
        let popup =  $(".popup__lang-curr .popup");

        if (popup.height() >= $(window).height()){
            popup.addClass("positionTop");
        }
    });

    $(".btn-filter").click(function (e) {
        e.preventDefault();
        $(".popup__additional-filters").addClass('active');
    });
    $(".close, .popups").click(function (e) {
        e.preventDefault();
        $(".popups").removeClass('active');
        $(".error").removeClass('active');
    });

    //show only 6 apartments in the desktop and 3 in the mobile. The rest are hidden
    function hideCards() {
        let lengthCard = $(".offers-cards .card").length;
        if (window.matchMedia("(max-width: 767px)").matches) {
            if (lengthCard > 3) {
                $(".offers-cards .card").hide();
                for (let i = 1; i <= 3; i++) {
                    $(".offers-cards .card:nth-child(" + i + ")").show();
                }
            }
        } else {
            if (lengthCard > 6) {
                $(".offers-cards .card").hide();
                for (let i = 1; i <= 6; i++) {
                    $(".offers-cards .card:nth-child(" + i + ")").show();
                }
            }
        }
    }

    hideCards();

    //show all apartments
    $("#more-apartaments").click(function (e) {
        e.preventDefault();
        $(".offers-cards .card").show();
    });

    //selected option in sorting button (page CATALOG)
    $(".sorting-option").click(function () {
        let option = $(this).text();
        $(this).addClass('active').siblings().removeClass('active');
        $(this).closest(".sorting").find("button span").text(option);
    });


    // card layout (page CATALOG)

    if (window.matchMedia("(min-width: 1179px)").matches) {
        $(".catalog-list").find("li").removeClass('card').addClass('card-item');
    } else {
        $(".catalog-list").find("li").removeClass('card-item').addClass('card');
    }

    //tabs
    $(".tab").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        let index = $(this).index();
        $(".forms-content form").eq(index).addClass('active').siblings().removeClass('active');
    });

    $(".more").click(function () {
        $(this).toggleClass('active');
        $(".read-more").slideToggle(300);
        $(".remember__item").show();
    });

    //show only 6 remember in the desktop and 3 in the mobile. The rest are hidden
    function hideRemember() {
        let lengthRemember = $(".remember__item").length;
        if (window.matchMedia("(max-width: 767px)").matches) {
            if (lengthRemember > 3) {
                $(".remember__item").hide();
                for (let i = 1; i <= 3; i++) {
                    $(".remember__item:nth-child(" + i + ")").show();
                }
            }
        } else {
            if (lengthRemember > 6) {
                $(".remember__item").hide();
                for (let i = 1; i <= 6; i++) {
                    $(".remember__item:nth-child(" + i + ")").show();
                }
            }
        }
    }

    hideRemember();

    //show/hide intelligence in mobile (page payment_1)
    if (window.matchMedia("(max-width: 991px)").matches) {
        $(".continue").click(function (e) {
            e.preventDefault()
            $(".step-mob").hide();
            $(".payment__right").show();
            $(".payment__close").show();
        });
        $(".payment__close").click(function (e) {
            e.preventDefault()
            $(".step-mob").show();
            $(".payment__right").hide();
            $(".payment__close").hide();
        });
    }

    //select
    $(".input-select, .icon").click(function (e) {
        e.preventDefault();
        $(this).closest(".field").find(".select").slideToggle(300);
    });
    $(".select-option").click(function (e) {
        let option = $(this).text();
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
        $(this).closest(".select").slideUp(300);
        $(this).closest(".field").find(".input-select").val(option);
    });

});

$(document).ready(function () {

    //valid form

    $("#sign-in").click(function () {
        $(".btn-error").hide();
        let input = $(this).closest("form").find("input:invalid");
        input.closest(".field").find(".btn-error").show();
        if(input.val() == ''){
            $(".error").addClass('active');
        }
    });

    $("#sign-up").click(function (e) {
        $(".btn-error").hide();
        let input = $(this).closest("form").find("input:invalid");
        input.closest(".field").find(".btn-error").show();

        e.preventDefault();

        if(input.val() != ''){
            $(this).closest(".signup").removeClass('active');
            $(".signup-step").addClass('active');
        } else {
            $(".error").addClass('active');
        }
    });

});

//Autocomplete
$(document).ready(function () {

    let options = {
        url: "city.json",
        getValue: "cityname",
        list: {
            maxNumberOfElements: 4,
            match: {
                enabled: true
            }
        }
    };

    $("#js-easyAutocomplete").easyAutocomplete(options); //page MAIN

    let options2 = {
        url: "city.json",
        getValue: function(element) {
            return element.codecountry;
        },
        list: {
            maxNumberOfElements: 4,
            onSelectItemEvent: function() {
                let selectedItemValue = $("#input-country").getSelectedItemData().mask;
                $("#input-phone").val(selectedItemValue).trigger("mask");
            },
            match: {
                enabled: true
            }

        }
    };

    $("#input-country").easyAutocomplete(options2); //page SIGNIN

    let options3 = {
        url: "city.json",
        getValue: function(element) {
            return element.cityname;
        },
        list: {
            maxNumberOfElements: 4,
            onSelectItemEvent: function() {
                let selectedItemValue = $(".search-result__city-body").getSelectedItemData().city;
                $(".search-result__city-body").val(selectedItemValue).trigger("city");

                let selectedItemValue2 = $(".search-result__city-head").getSelectedItemData().city;
                $(".search-result__city-head").val(selectedItemValue2).trigger("city");
            },
            match: {
                enabled: true
            }
        }
    };

    $(".search-result__city").easyAutocomplete(options3); //page Catalog

});

$(document).ready(function () {
    //after selected country - focus on next input
    $(".easy-autocomplete-container").click( function () {
        $("input#input-phone").focus();
    });
});


