const leftMenu = document.querySelector('.left-menu'),
    hamburger = document.querySelector('.hamburger'),
    tvShowList = document.querySelector('.tv-shows__list'),
    modal = document.querySelector('.modal');

const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmM1MDNhZmYxOGY4OGU1MTNmODRiZjE4ZGY2MGM2YSIsInN1YiI6IjVlY2Q3NjNhYTU3OWY5MDAyMDA2YzBiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KRLwpDq3cThrr3c7JsagbsZFcbBmt3kysaLO-hy9PgQ';



    const DBService = class {
        getData = async (url) => {
            const res = await fetch(url);
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`no connect to url ${url}`)
    
            }
            
        }
    
        getTestData = () => {
            return this.getData('test.json')
        }
    };
    
    const renderCard = response => {
        console.log(response);
        tvShowList.textContent = '';
    
        response.results.forEach(item => {
            
            const {
                backdrop_path: backdrop,
                name: title,
                poster_path: poster,
                vote_average: vote
            } = item;

            const posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg';
            const backdropIMG = backdrop ? IMG_URL + backdrop : '';
            const voteElem = vote ? `<span class="tv-card__vote">${vote}</span>` : '';
            
            const card = document.createElement('li');
            card.className = 'tv-shows__item';

            card.innerHTML = `
            <a href="#" class="tv-card">
                ${voteElem}
                <img class="tv-card__img"
                    src="${posterIMG}"
                    data-backdrop="${backdropIMG}"
                    alt=">${title}">
                <h4 class="tv-card__head">${title}</h4>
            </a>
            `;

            tvShowList.append(card);

            
        });
    
    
    };
    
    new DBService().getTestData().then(renderCard);
        


// menu

hamburger.addEventListener('click', () => {
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
});

document.addEventListener('click', event => {
    const target = event.target;
    if (!target.closest('.left-menu')) {
        leftMenu.classList.remove('openMenu');
        hamburger.classList.remove('open');
    }
});

leftMenu.addEventListener('click', event => {
    
    const target = event.target;
    const dropdown = target.closest('.dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
        leftMenu.classList.add('openMenu');
        hamburger.classList.add('open');
    }
});

// open modal window

tvShowList.addEventListener('click', event => {

    event.preventDefault();

    const target = event.target;
    const card = target.closest('.tv-card');

    if (card) {
        document.body.style.overflow = 'hidden';
        modal.classList.remove('hide');
    }

});

// close modal window

modal.addEventListener('click', event => {
    if (event.target.closest('.cross') || 
        event.target.classList.contains('modal')) {
        document.body.style.overflow = '';
        modal.classList.add('hide');
    }
});

// smena kartochki

const changeImage = event => {
    const card = event.target.closest('.tv-shows__item');

    if (card) {
        const img = card.querySelector('.tv-card__img');
        // 1st variant change image
        // const changeImg = img.dataset.backdrop;
        
        // if (changeImg) {
        //     img.dataset.backdrop = img.src;
        //     img.src = changeImg;
        // }

        if (img.dataset.backdrop) {
            
            // метод деструктурізації заміни змінних

            [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src]
        }

    }
};

tvShowList.addEventListener('mouseover', changeImage);
tvShowList.addEventListener('mouseout', changeImage);

