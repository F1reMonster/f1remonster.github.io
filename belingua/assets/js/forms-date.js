import './lang'
$.datepicker.setDefaults($.datepicker.regional['ru']);
$('.form-step__time').datepicker({
    dateFormat: "d M yy",
})
