
//------------------------------------------------
//Header on scroll behaviour
//------------------------------------------------
window.addEventListener('scroll', function(e) {
    if (window.scrollY > 70) {
        document.body.classList.add('is-scrolled');
    } else {
        document.body.classList.remove('is-scrolled');
    }
});

//------------------------------------------------
//SEARCH
//------------------------------------------------
const searchInput = document.querySelector('.js-search-input');
if (searchInput) {
    searchInput.querySelector('input').addEventListener('focus', function() {
        let hamburger_btn = document.getElementById('custom-hamburger');
        if (hamburger_btn.classList.contains('opened')) {
            hamburger_btn.click();
        }
        document.querySelector('.site-header').classList.add('is-search-opened');
        searchInput.classList.add('is-focused');
        searchInput.querySelector('input').focus();
        document.querySelector('#search-tags').classList.add('is-opened');
        document.querySelector('#search-tags').setAttribute('aria-hidden', false);
        document.body.style.overflow = 'hidden';
    });
}

if (document.querySelector('.close-search-form')) {
    const close_form_btn = document.querySelector('.close-search-form');
    close_form_btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        document.querySelector('.site-header').classList.remove('is-search-opened');
        searchInput.classList.remove('is-focused');
        document.querySelector('#search-tags').classList.remove('is-opened');
        document.querySelector('#search-tags').setAttribute('aria-hidden', true);
        document.querySelector('#search-hints').classList.remove('is-opened');
        document.querySelector('#search-hints').setAttribute('aria-hidden', true);
        document.body.style.overflow = 'visible';
    });

    close_form_btn.addEventListener('blur', function() {
        const modals = [...document.querySelectorAll('#search-tags, #search-hints')];
        setTimeout(function() {
            modals.forEach(modal => {
                const style = window.getComputedStyle(modal);
                if (style.getPropertyValue('display') != 'none') {
                    document.getElementById('autoComplete').focus();
                }
            });
        }, 80);
    });
}

if (document.querySelectorAll('.js-search-input').length > 0) {
    const search_terms = JSON.parse(document.querySelectorAll('.js-search-input')[0].dataset.articleTitles);
    if (document.querySelector('.tablet-search-trigger')) {
        document.querySelector('.tablet-search-trigger').addEventListener('click', function() {
            searchInput.style.display = 'flex';
            searchInput.querySelector('input').focus();
            searchInput.removeAttribute('style');
        });
    }
}

//Match the entered value
function autocompleteMatch(input) {
    if (input == '') {
        return [];
    }
    var reg = new RegExp(input)
    return search_terms.filter(function(term) {
        if (term.match(reg)) {
            return term;
        }
    });
}

//Load results to html
function showResults(val) {
    const res = document.querySelector(".js-search-hints");
    res.innerHTML = '';
    let list = '';
    let terms = autocompleteMatch(val);
    document.querySelectorAll('.js-search-count').forEach(function(el) {
        el.innerHTML = terms.length;
    });
    for (i = 0; i < terms.length; i++) {
        list += '<li><a href="search-results.html">' + terms[i] + '</a></li>';
    }
    res.innerHTML = list;
}

//Load results to html
function showResults_mobile(val) {
    const res = document.querySelector(".js-search-hints_mobile");
    res.innerHTML = '';
    let list = '';
    let terms = autocompleteMatch(val);
    document.querySelectorAll('.js-search-count_mobile').forEach(function(el) {
        el.innerHTML = terms.length;
    });
    for (i = 0; i < terms.length; i++) {
        list += '<li><a href="search-results.html">' + terms[i] + '</a></li>';
    }
    res.innerHTML = list;
}

//setup before functions
let typingTimer;
let doneTypingInterval = 200;

//on keyup, start the countdown
if (document.querySelector('#autoComplete')) {
    document.querySelector('#autoComplete').addEventListener('keyup', () => {
        clearTimeout(typingTimer);
        if (document.querySelector('#autoComplete').value.length > 1) {
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
        }
    });
}

if (document.querySelector('#autoComplete-mobile')) {
    document.querySelector('#autoComplete-mobile').addEventListener('keyup', () => {
        clearTimeout(typingTimer);
        if (document.querySelector('#autoComplete-mobile').value.length > 1) {
            typingTimer = setTimeout(doneTyping_mobile, doneTypingInterval);
        }
    });
}

//user is "finished typing," do something
function doneTyping() {
    document.querySelector('#search-tags').classList.remove('is-opened');
    document.querySelector('#search-hints').classList.add('is-opened');
    document.querySelector('#search-tags').setAttribute('aria-hidden', true);
    document.querySelector('#search-hints').setAttribute('aria-hidden', false);
    showResults(document.querySelector('#autoComplete').value);
}

//user is "finished typing," do something
function doneTyping_mobile() {
    document.querySelector('#search-tags-mobile').classList.remove('is-opened');
    document.querySelector('#search-hints-mobile').classList.add('is-opened');
    document.querySelector('#search-tags-mobile').setAttribute('aria-hidden', true);
    document.querySelector('#search-hints-mobile').setAttribute('aria-hidden', false);
    showResults_mobile(document.querySelector('#autoComplete-mobile').value);
}

//------------------------------------------------
//Mobile search
//------------------------------------------------

if (document.querySelector('.mobile-search-open') && document.querySelector('.close-mobile-search')) {
    document.querySelector('.mobile-search-open').addEventListener('click', function(e) {
        document.querySelector('.mobile-search').style.display = 'block';
        document.querySelector('#search-tags-mobile').classList.add('is-opened');
        document.querySelector('#search-tags-mobile').setAttribute('aria-hidden', false);
        document.body.style.overflow = 'hidden';
    })

    document.querySelector('.close-mobile-search').addEventListener('click', function(e) {
        document.querySelector('.mobile-search').style.display = 'none';
        document.querySelector('#search-hints-mobile').classList.remove('is-opened');
        document.querySelector('#search-hints-mobile').setAttribute('aria-hidden', true);
        document.querySelector('#search-tags-mobile').classList.remove('is-opened');
        document.querySelector('#search-tags-mobile').setAttribute('aria-hidden', true);
        document.body.style.overflow = 'auto';
    })
}
