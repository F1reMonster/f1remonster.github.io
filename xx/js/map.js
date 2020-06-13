// $(document).ready(function () {

    // //create a card template in Catalog list
    // function createPage(page){
    //     return `  
    //          <li class="card-item">
    //             <div class="card-top">
    //                 <div class="card-slider">
    //                     <div class="slide">
    //                         <img src="img/foto.jpg" alt="image room" class="card-img">
    //                     </div>
    //                     <div class="slide">
    //                         <img src="img/foto.jpg" alt="image room" class="card-img">
    //                     </div>
    //                     <div class="slide">
    //                         <img src="img/foto.jpg" alt="image room" class="card-img">
    //                     </div>
    //                 </div>
    //                 <div class="card-top__info">
    //                     <a href="#" class="text-15 c-white">2 комнаты</a>
    //                     <div class="star">
    //                         <img src="img/star.svg" alt="star" class="img-star">
    //                         <span class="text-15">5,0 <span class="c-gray-light"> (98)</span></span>
    //                     </div>
    //                 </div>
    //             </div>
    //             <div class="card-col">
    //                 <div class="card-content">
    //                     ${page.discount}
    //                     <a href="#" class="text-16">${page.title}</a>
    //                     <div class="card-info">
    //                         <div class="card-info__left">
    //                            ${page.status1}
    //                            ${page.status2}
    //                         </div>
    //                         <p class="c-blue">Всего $180</p>
    //                     </div>
    //                     <div class="card-row">
    //                         <a href="#" class="location">
    //                             <span class="pin"></span>
    //                             <p>
    //                                 <span class="address">${page.name}</span>
    //                                 0,5 км от центра
    //                             </p>
    //                         </a>
    //                         <div class="price">
    //                             <span class="c-blue">Всего $180</span>
    //                             <div class="price-row">
    //                                 <span class="price-crossed">${page.priceCrossed}</span>
    //                                 <span class="price-item">${page.price}</span>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <label class="card-bottom">
    //                     <input type="checkbox" class="checkbox">
    //                     <span><img src="img/lightning.svg" alt="lightning" class="img-lightning"> МГНОВЕННОЕ БРОНИРОВАНИЕ</span>
    //                     <svg class="instant-reservation">
    //                         <use xlink:href="img/sprite/sprite.svg#heart"></use>
    //                     </svg>
    //                 </label>
    //             </div>
    //        </li>
    //     `
    // }

    // // draw templates in HTML
    // const templates = card.map(page => createPage(page));
    // const html = templates.join(' ');
    // document.querySelector('#catalog-list').innerHTML = html;


//     $(".card-item").mouseover(function () {
//         let index = $(this).index();
//         $(".my-div-icon").eq(index).addClass('active').siblings().removeClass('active');
//     });
//     $(".card-item").mouseout(function () {
//         $(".my-div-icon").removeClass('active');
//     });

// });

// info
// let card = [
//     {
//         lat: 40.371950,     // Широта
//         lng: 49.846418,    // Долгота
//         title:'Просторная и современная квартира в центре города',
//         name: "ул. Зарифа Алиева 28",
//         url: 'img/map-pin.svg',
//         price: '45$',
//         status1: ' <p class="card-info__item bg-light-yellow">Опытный владелец</p>',
//         status2: '<p class="card-info__item bg-light-pink">Редкая находка</p>',
//         discount: '<div class="discount">-10%</div>',
//         priceCrossed: '$50',
//     },
//     {
//         lat: 40.374631,     // Широта
//         lng: 49.856293,    // Долгота
//         title: 'Просторная и современная квартира в центре города',
//         name: "Нефтчилярный проспект, 123",
//         url: 'img/map-pin.svg',
//         price: '50$',
//         status1: '',
//         status2: '',
//         discount: '',
//         priceCrossed: '',
//     },
//     {
//         lat: 40.386287,     // Широта
//         lng: 49.862855,    // Долгота
//         title: 'Просторная и современная квартира в центре города',
//         name: "Улица Юсифа Сафарова",
//         url: 'img/map-pin.svg',
//         price: '55$',
//         status1: '',
//         status2: '',
//         discount: '',
//         priceCrossed: '45$',
//     }
// ]

let map = L.map('map', {
    zoom: 16,
    center: [50.43572,30.51943],
    doubleClickZoom: false,
    scrollWheelZoom: false,
}).locate({setView: true});

let marker = L.marker([50.43572, 30.51943]).addTo(map);    
    
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);

// for (let i = 0; i < card.length; i++) {
//     let marker = L.marker([card[i].lat, card[i].lng],{icon:myIcon = L.divIcon({
//             className: 'my-div-icon',
//             html: '<div class="map-pin"><span class="map-price">'+ card[i].price +'</span></div>'
//         })
//     }).addTo(map);
// }
