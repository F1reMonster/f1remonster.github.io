$( document ).ready(function() {

    $('.owl-carousel.main').owlCarousel({
        loop:true,
        margin:0,
        nav:false,
        items:1,
        dots:true,
        autoplay:true,
        autoplayTimeout:5000,
        autoplayHoverPause:true
    })

    $('.aside-wrap .owl-carousel').owlCarousel({
        loop:true,
        margin:0,
        nav:false,
        items:1,
        dots:true,
        //autoplay:true,
        //autoplayTimeout:5000,
        //autoplayHoverPause:true,
        autoHeight:true
    })

    $('.pred-next.owl-carousel').owlCarousel({
        loop:true,
        margin:0,
        nav:false,
        items:1,
        dots:true,
    })


$( ".ham" ).click(function() {
  $(this).toggleClass('active');
  $('.menu-mob').toggle();

});

});


$( document ).ready(function(){

    if ($(window).width() >= '992'){
        var pos = $( "header .logo img" ).offset();
       console.log( pos.left ); // выводим в консоль значение ключа left (позиция элемента <p> от левого края)
       $('.proj-header .grid').css( "padding-left", pos.left-20 );
    } else{
        $('.proj-header .grid').css( "padding-left", 0 );
    }

    $( window ).resize(function() {

            if ($(window).width() >= '992'){
                var pos = $( "header .logo img" ).offset();
               console.log( pos.left ); // выводим в консоль значение ключа left (позиция элемента <p> от левого края)
               $('.proj-header .grid').css( "padding-left", pos.left-20 );
            } else{
                $('.proj-header .grid').css( "padding-left", 0 );
            }
    });
       
});

$( document ).ready(function() {
    $( "span.hide-eye" ).click(function() {
        if ($(this).prev('#password-input').attr('type') == 'password'){
            $(this).addClass('view');
            $(this).prev('#password-input').attr('type', 'text');
        }else {
            $(this).removeClass('view');
            $(this).prev('#password-input').attr('type', 'password');
        }
    });

    $( ".forgot_pass" ).click(function() {
        $('.modal').modal('hide');
        $('#recovery').modal('show');
        return false;
    });
    
    $( ".login_md" ).click(function() {
        $('.modal').modal('hide');
        $('#login').modal('show');
        return false;
    });

    $( ".md_register" ).click(function() {
        $('.modal').modal('hide');
        $('#register').modal('show');
        return false;
    });
    

    
});