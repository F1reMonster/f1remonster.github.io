const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const SERVER = 'https://api.themoviedb.org/3';
const API_KEY = '3bc503aff18f88e513f84bf18df60c6a';

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
    searchFormInput = document.querySelector('.search__form-input');

    

const loading = document.createElement('div');
loading.className = 'loading';



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
            return this.getData('test.json');
        }

        getTestCard = () => {
            return this.getData('card.json');

        }

        getSearchResult = query => {
            return this.getData(`${SERVER}/search/tv?api_key=${API_KEY}&query=${query}&language=ru-RU`);
        }

        getTvShow = id => {
            return this.getData(`${SERVER}/tv/${id}?api_key=${API_KEY}&language=ru-RU`);
        }
        
    };
    

    
    const renderCard = response => {
        console.log(response.total_results);
        console.log(response);
        tvShowList.textContent = '';
    
        if (response.total_results != 0) {
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

        } else {
            loading.remove();
            const resMSG = document.querySelector('.tv-shows__head');
            resMSG.textContent = `По вашему запросу сериалов не найдено`;

            
        }

        
    };


searchForm.addEventListener('submit', event => {
    event.preventDefault();
    const value = searchFormInput.value.trim();
    if (value) {
        tvShows.append(loading);
        new DBService().getSearchResult(value).then(renderCard);
    } 
    searchFormInput.value = '';
    
    
});

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
    event.preventDefault();
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
    modal.append(loading);
    event.preventDefault();
    const target = event.target;
    const card = target.closest('.tv-card');
    
    if (card) {
        
        new DBService().getTvShow(card.id)
            .then(data => {
                
                console.log(data);
                

                if (data.poster_path) {
                
                    tvCardImg.src = IMG_URL + data.poster_path;
                    modalTitle.textContent = data.name;
                    // genresList.innerHTML = data.genres.reduce((acc, item) => `${acc}<li>${item.name}</li>`, '');
                    genresList.textContent = '';
                    for (const item of data.genres) {
                        genresList.innerHTML += `<li>${item.name}</li>`;
                    }
                    rating.textContent = data.vote_average;
                    description.textContent = data.overview;
                    modalLink.href = data.homepage;

                    

                        document.body.style.overflow = 'hidden';
                        modal.classList.remove('hide');
                        loading.remove();

                }
                                
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

