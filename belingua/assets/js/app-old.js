! function(e) {
    var t = {};

    function i(n) {
        if(t[n]) return t[n].exports;
        var r = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(r.exports, r, r.exports, i), r.l = !0, r.exports
    }
    i.m = e, i.c = t, i.d = function(e, t, n) {
        i.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }, i.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, i.t = function(e, t) {
        if(1 & t && (e = i(e)), 8 & t) return e;
        if(4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if(i.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for(var r in e) i.d(n, r, function(t) {
                return e[t]
            }.bind(null, r));
        return n
    }, i.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return i.d(t, "a", t), t
    }, i.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, i.p = "", i(i.s = 1)
}([function(e, t) {

}, function(e, t, i) {
    i(2), i(0), i(3), i(4), e.exports = i(5)
}, function(e, t, i) {
    "use strict";
    i.r(t);
    i(0);


}, function(e, t) {
    $((function() {
        $("input").each((function() {
            var e = $(this).parent().find("label");
            $(this).val().length > 0 ? e.addClass("active") : e.removeClass("active")
        }))
    }))
}, function(e, t) {

    $(".time-group > input").on("input", (function() {
        $(this).val($(this).val().replace(/[^\d]/g, ""))
    }))
}, function(e, t) {
    var i, n
}]);
$.datepicker.regional.ru = {
    closeText: "Закрыть",
    currentText: "Сегодня",
    monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    monthNamesShort: ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"],
    dayNames: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
    dayNamesShort: ["вск", "пнд", "втр", "срд", "чтв", "птн", "сбт"],
    dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    weekHeader: "Нед",
    dateFormat: "dd.mm.yy",
    firstDay: 1,
    isRTL: !1,
    showOtherMonths: true,
    showMonthAfterYear: !1,
    yearSuffix: ""
}

$.datepicker.setDefaults($.datepicker.regional.ru);
var minDate = new Date();
$("#form-step__date_start1").datepicker({
    dateFormat: "d M yy",
    minDate: minDate,
    onClose: function(selectedDate){
        $('#form-step__date_end1').datepicker("option", "minDate", selectedDate)
    }
})
$("#form-step__date_end1").datepicker({
    dateFormat: "d M yy",
    minDate: minDate,
    /*onClose: function(selectedDate){
     $('#form-step__date_start1').datepicker("option", "minDate", selectedDate)
     }*/
})
$('#form-step__date_start1').val($.datepicker.formatDate('d M yy', minDate));

$(".step-element__btn > .next").on("click", (function() {
    var step = $(this).data("id");
    if(validate()){
        var nxtpage = $(this).parent().parent().data('hash') + 1;
        $('.step__item').removeClass('active');
        $('#step' + nxtpage).addClass('active')
        $("html, body").animate({
            scrollTop: 0
        }, 500);

        first_order(step);
    }

}))

$(".step-element__btn > .prev").on("click", (function() {
    var page = $(this).parent().parent().data('hash') - 1;
    $('.step__item').removeClass('active');
    $('#step' + page).addClass('active')
    $("html, body").animate({
        scrollTop: 0
    }, 500)
}))
$('.translate-tabs input').on('change', function () {

    var type = $(this).attr('id');
    if (type === 'writing') {
        $('.writing-type').addClass('active');
        $('.verbal-type').removeClass('active');
        $('#distance').prop('checked', true);
        $('#local').prop('checked', false);
        $('#local').attr('disabled', true);
        $('.container-form_local').removeClass('active');
        $('#form-step__address').prop('required', false);
        $('#form-step__work_time1').prop('required', false);
        $('.default-work-time').removeClass('active');
        $('.duration-text').addClass('active');
        $('#minPricePerHour').hide();
        $('#minPricePerList').show();
        $('.js-value-label').text('Длительность работы');
        $('.js-time').show();
        $('.js-symbols').hide();
        $('.form-step__work_time').val('Минут');
        $('#js-input-symbols').prop('placeholder', 'Минут или часов');
        $('.js-required').removeClass('checked');
    }
    if (type === 'verbal') {
        $('.writing-type').removeClass('active');
        $('.verbal-type').addClass('active');
        $('#distance').prop('checked', false);
        $('#local').prop('checked', true);
        $('#local').attr('disabled', false);
        $('.container-form_local').addClass('active');
        $('#form-step__address').prop('required', true);
        $('#form-step__work_time1').prop('required', true);
        $('.default-work-time').addClass('active');
        $('.duration-text').removeClass('active');
        $('#minPricePerHour').show();
        $('#minPricePerList').hide();
        $('.js-time').hide();
        $('.js-symbols').show();
        $('.form-step__work_time').val('Знаков');
        $('#js-input-symbols').prop('placeholder', 'Знаков или страниц');
        $('.js-required').removeClass('checked');
    }
    if (type === 'local') {
        $('.container-form_local').addClass('active');
        $('#form-step__address').prop('required', true);
    }
    if (type === 'distance') {
        $('.container-form_local').removeClass('active');
        $('#form-step__address').prop('required', false);
        $('#form-step__address').removeClass('error');

    }
    $('input[name=method]').prop('checked', false);
    $(this).parent().parent().find('.error-text').fadeOut();
})
$('.form-step__group_list input').on('click', function(){
    var id = $(this).attr('id')
    $(this).parent().parent().addClass('checked');
    var type = $('.translate-tabs input[name=translateType]:checked').attr('id');
    if(id == 4 && type ==='verbal'){
        $('.default-work-time').removeClass('active');
        $('.duration-text').addClass('active');
        $('#form-step__work_time1').prop('required', false);
        $('#distance').prop('checked', true);
        $('.container-form_local').removeClass('active');
        $('#js-input-symbols').prop('required', true);
        $('.js-value-label').text('Объем работы');
        $('.js-time').show();
        $('.js-symbols').hide();
        $('.form-step__work_time').val('Минут');
        $('#js-input-symbols').attr('placeholder', 'Минут или часов');
    } else if(id != 4 && type ==='verbal') {
        $('.default-work-time').addClass('active');
        $('.duration-text').removeClass('active');
        $('#form-step__work_time1').prop('required', true);
        $('#js-input-symbols').prop('required', false);

    }
    else if(id != 4 && type ==='writing') {
        $('.js-time').hide();
        $('.js-symbols').show();
        $('.form-step__work_time').val('Знаков');
        $('#form-step__work_time1').prop('required', false);
        $('#js-input-symbols').prop('placeholder', 'Знаков или страниц');
        $('#js-input-symbols').prop('required', true);
    }
})
var minPricePerHour = $('#minPricePerHour').data('price');
var minPricePerList = $('#minPricePerList').data('price');

$('#form-step__work_time1').on('keyup', function(){
    var timing = $(this).val();
    var errorText = 'минимальное время работы — 3 часа';
    $('#form-step__price_end1').val('')
    if(timing < 3) {
        $(this).addClass('error')
        $(this).parent().find('.error-text').text(errorText).fadeIn()
    } else {
        $(this).removeClass('error')
        $(this).parent().find('.error-text').fadeOut();
        $('#form-step__price_start1').val(Math.round(minPricePerHour * timing))
        var priceFrom = $('#form-step__price_start1').val()
        $('.js-price-start').val(priceFrom)
    }
    if(!timing){
        var errorText = 'заполните поле';
        $(this).addClass('error')
        $(this).parent().find('.error-text').text(errorText).fadeIn()
    }
})


var totalMinutesPrice = 0;
$('#js-input-symbols').on('keyup', function(){
    var type = $('#js-dropdown-work_time').val();
    calculatePrice(type);

})
$('#js-dropdown-work_time').parent().find('.dropdown-list__item').on('click', function(){
    var type = $(this).find('span').first().text().trim();
    $('#js-dropdown-work_time').val(type)
    calculatePrice(type);
});
function calculatePrice(translateType){
    var numbers = $('#js-input-symbols').val();
    $('#form-step__price_end1').val('')
    if(translateType === 'Знаков') {
        $('#form-step__price_start1').val(Math.round(minPricePerList / 1800 * numbers))
    }
    if (translateType === 'Страниц') {
        $('#form-step__price_start1').val(Math.round(minPricePerList * numbers))
    }
    if(translateType === 'Минут') {
        $('#form-step__price_start1').val(Math.round(minPricePerHour / 60 * numbers))
    }
    if(translateType === 'Часов') {
        $('#form-step__price_start1').val(Math.round(minPricePerHour * numbers))
    }
    var priceFrom = $('#form-step__price_start1').val()
    $('.js-price-start').val(priceFrom)
}
$('#form-step__price_end1').on('blur', function(){
    var priceEnd = parseInt($(this).val());
    var priceStart = parseInt($('#form-step__price_start1').val());
    $('.js-price-start').val(priceStart);

    if(priceEnd < priceStart){
        $(this).val(priceStart);
    }
})

$('.other').on('focus', function(){
    $(this).parent().find('input[type=radio]').prop('checked', true);
});
$('.other').on('blur', function(){
    if($(this).val()) {
        $('.js-required.active').addClass('checked')
    } else {
        $('.js-required.active').removeClass('checked')
    }
})
$('button.create').on('click', function(){
    $('#orderCreated').fadeIn();
})

function validate(){
    var valid = false;
    var step = $('.step__item.active');
    var localBlock = step.find('.container-form_2.active');
    var checkboxes = $('#form-step-1').find('.js-required.active.checked')
    checkInputs(step)


    /*if(localBlock){
     checkInputs(localBlock)
     }*/

    if(checkboxes.length){
        $('.js-required').parent().find('.error-text').fadeOut();
        valid = true;
    } else {
        $('.js-required').parent().find('.error-text').fadeIn();
        return valid = false;
    }

    function checkInputs(block){

        block.find('input').each(function(){
            var input = $(this);
            if(input.prop('required')){
                if(!input.val()) {
                    input.addClass('error');
                    input.parent().find('.error-text').fadeIn();
                    return valid = false;
                } else {
                    input.removeClass('error');
                    input.parent().find('.error-text').fadeOut();
                    return valid = true;
                }
            }
        });

    }
    var errors = $('.step__item.active').find('.error')
    if(errors.length){
        return valid = false;
    } else {
        return valid = true;
    }
}


