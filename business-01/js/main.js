$(function () {
  $(".slider").slick({
    arrows: false,
    dots: true,
    dotsClass: "slick-dots",
    infinite: false
  });

 
});

$('.header__menu-mobile').hide();

$("#burger").on("click", function() {
  this.classList.toggle('burger-active');
  $(".header__menu-mobile").slideToggle();
})

$('')