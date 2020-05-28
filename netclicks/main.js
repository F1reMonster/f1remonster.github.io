const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';


const leftMenu = document.querySelector('.left-menu'),
    hamburger = document.querySelector('.hamburger'),
    tvShowList = document.querySelector('.tv-shows__list'),
    modal = document.querySelector('.modal'),
    tvShows = document.querySelector('.tv-shows'),
    tvCardImg = document.querySelector('.tv-card__img'),
    modalTitle = document.querySelector('.modal__title'),
    genresList = document.querySelector('.genres-list'),
    rating = document.querySelector('.rating'),
    description = document.querySelector('.description'),
    modalLink = document.querySelector('.modal__link'),
    searchForm = document.querySelector('.search__form'),
    searchFormInput = document.querySelector('.search__form-input'),
    preloader = document.querySelector('.preloader'),
    dropdown = document.querySelectorAll('.dropdown'),
    tvShowsHead = document.querySelector('.tv-shows__head'),
    posterWrapper = document.querySelector('.poster__wrapper'),
    modalContent = document.querySelector('.modal__content'),
    pagination = document.querySelector('.pagination');

    

const loading = document.createElement('div');
loading.className = 'loading';

const DBService = class {

    constructor() {
        this.SERVER = 'https://api.themoviedb.org/3';
        this.API_KEY = '3bc503aff18f88e513f84bf18df60c6a';
    }

    getData = async (url) => {
        const res = await fetch(url);
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(`no connect to url ${url}`)
        }
    }
    getTestData = () => {
        return this.getData('test.json');
    }
    getTestCard = () => {
        return this.getData('card.json');
    }
    getSearchResult = query => {
        this.temp = `${this.SERVER}/search/tv?api_key=${this.API_KEY}&language=uk-UA&query=${query}`;
        return this.getData(this.temp);
    }
    getNextPage = page => {
        return this.getData(this.temp + '&page=' + page);
    }
    getTvShow = id => this.getData(`${this.SERVER}/tv/${id}?api_key=${this.API_KEY}&language=uk-UA`);
    
    getTopRated = () => this.getData(`${this.SERVER}/tv/top_rated?api_key=${this.API_KEY}&language=uk-UA`);
    
    getPopular = () => this.getData(`${this.SERVER}/tv/popular?api_key=${this.API_KEY}&language=uk-UA`);
    
    getToday = () => this.getData(`${this.SERVER}/tv/airing_today?api_key=${this.API_KEY}&language=uk-UA`);
    
    getWeek = () => this.getData(`${this.SERVER}/tv/on_the_air?api_key=${this.API_KEY}&language=uk-UA`);
        
};
    
    
const dbService = new DBService();

    
const renderCard = (response, target) => {
        
    console.log(response);
    
    tvShowList.textContent = '';


    
    if (!response.total_results) {
        loading.remove();
        tvShowsHead.textContent = 'Нічого не знайдено!!!';
        tvShowsHead.style.cssText = 'color: red;';
        return;
    }

    tvShowsHead.textContent = target ? target.textContent : 'Результат пошуку';
    tvShowsHead.style.cssText = 'color: green;';
    
    response.results.forEach(item => {
        const {
            backdrop_path: backdrop,
            name: title,
            poster_path: poster,
            vote_average: vote,
            id
        } = item;
        
        const posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg';
        const backdropIMG = backdrop ? IMG_URL + backdrop : '';
        const voteElem = vote ? `<span class="tv-card__vote">${vote}</span>` : '';
        const card = document.createElement('li');
        
        card.idTV = id;
        card.className = 'tv-shows__item';
        card.innerHTML = `
                <a href="#" id="${id}" class="tv-card">
                    ${voteElem}
                    <img class="tv-card__img"
                        src="${posterIMG}"
                        data-backdrop="${backdropIMG}"
                        alt=">${title}">
                    <h4 class="tv-card__head">${title}</h4>
                </a>
                `;
        loading.remove();
        tvShowList.append(card);
    });
    
    pagination.textContent = '';

    if (!target && response.total_pages > 1) {
        for (let i = 1; i <= response.total_pages; i++) {
            pagination.innerHTML += `<li><a href="#" class="pages">${i}</a></li>`
        }
    }

};

// search

searchForm.addEventListener('submit', event => {
    event.preventDefault();
    const value = searchFormInput.value.trim();
    
    if (value) {
        tvShows.append(loading);
        dbService.getSearchResult(value).then(renderCard);
    } 
    
    searchFormInput.value = '';
});

// menu


const closeDropDown = () => {
    dropdown.forEach(item => {
        
        item.classList.remove('active');

    })
};

// open menu
hamburger.addEventListener('click', () => {
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
    closeDropDown();
});

// close menu
document.addEventListener('click', event => {
    const target = event.target;
    if (!target.closest('.left-menu')) {
        leftMenu.classList.remove('openMenu');
        hamburger.classList.remove('open');
        closeDropDown();

    }
});

leftMenu.addEventListener('click', event => {
    event.preventDefault();
    const target = event.target;
    const dropdown = target.closest('.dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
        leftMenu.classList.add('openMenu');
        hamburger.classList.add('open');
    }

    if (target.closest('#top-rated')) {
        tvShows.append(loading);
        dbService.getTopRated().then((response) => renderCard(response, target));
    }

    if (target.closest('#popular')) {
        tvShows.append(loading);
        dbService.getPopular().then((response) => renderCard(response, target));
    }

    if (target.closest('#week')) {
        tvShows.append(loading);
        dbService.getWeek().then((response) => renderCard(response, target));
    }

    if (target.closest('#today')) {
        tvShows.append(loading);
        dbService.getToday().then((response) => renderCard(response, target));
    }

    if (target.closest('#search')) {
        tvShowList.textContent = '';
        tvShowsHead.textContent = '';
    }

});




// open modal window

tvShowList.addEventListener('click', event => {
    
    preloader.style.display = 'block'; // add preloader before open modal window
    
    event.preventDefault();
    
    const target = event.target;
    const card = target.closest('.tv-card');
    
    if (card) {
        
        dbService.getTvShow(card.id)
            .then(({
                poster_path: posterPath,
                name: title,
                genres,
                vote_average: voteAverage,
                overview,
                homepage
            }) => {

                if (posterPath) {
                    tvCardImg.src = IMG_URL + posterPath;
                    tvCardImg.alt = title;
                    posterWrapper.style.display = '';
                    modalContent.style.paddingLeft = '';
                } else {
                    posterWrapper.style.display = 'none';
                    modalContent.style.paddingLeft = '25px';
                }
                
                modalTitle.textContent = title;
                genresList.textContent = '';
                
                genres.forEach(item => {
                    genresList.innerHTML += `<li>${item.name}</li>`;
                });

                rating.textContent = voteAverage;
                description.textContent = overview;
                modalLink.href = homepage;               
            })
            .then(() => {
                document.body.style.overflow = 'hidden';
                modal.classList.remove('hide');
            })
            .finally(() => {
                preloader.style.display = ''; // close preloader after modal window
        })
            
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

pagination.addEventListener('click', event => {
    event.preventDefault();
    const target = event.target;

    if (target.classList.contains('pages')) {
        tvShows.append(loading);
        dbService.getNextPage(target.textContent).then(renderCard);
    }
});

