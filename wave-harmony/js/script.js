// const { default: Swiper } = require("swiper");

function testWebP(callback) {

  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

  if (support == true) {
    document.querySelector('body').classList.add('webp');
  }

});

var popularItems = new Swiper ('.popular-items', {
  slidesPerView: 4,
  
  breakpoints: {
    1170: {
      slidesPerView: 4,
    },
    956: {
      slidesPerView: 3,
    },
    630: {
      slidesPerView: 2,
    },
    320: {
      slidesPerView: 1,
    }
  }
});

var comments = new Swiper ('.comments', {
  slidesPerView: 3,
  spaceBetween: 55,
  pagination: {
    el: '.comment-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.comment-next',
    prevEl: '.comment-prev',
  },

  breakpoints: {
    1170: {
      slidesPerView: 3,
    },
    956: {
      slidesPerView: 2,
    },
    320: {
      slidesPerView: 1,
      
    }
    
  }
});

