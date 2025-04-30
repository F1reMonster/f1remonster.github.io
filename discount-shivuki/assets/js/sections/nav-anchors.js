
(function() {
    let nav = document.getElementById('_nav-anchors');
    if (!nav) {
        return;
    }


    const header = document.querySelector('.simple-header');
    const threshold = 20;
    const static_nav_container = nav.querySelector(':scope .swiper');

    // container in the header for keeping sticky menu in the desktop resolutions
    const sticky_nav_container = document.getElementById('nav-anchor-sticky-container');
    let nav_links = [...nav.querySelectorAll('.nav-menu-anchors-wrap a')];

    //save target sections to which the click on the nav menu page will scroll.
    const target_sections = [];

    nav_links.forEach(link => {
        const target_section_id = link.href.split('#')[1];
        const target_section = document.getElementById(target_section_id);
        if (target_section) {
            target_sections[target_section_id] = target_section;
        }
    });

    // puts nav anchors in the header when page scrolled down, after passing
    // intro section on desktop resolutions.
    function SwithchingNavAnchorMenuDesktop() {
        const nav_rect = nav.getBoundingClientRect();
        const header_rect = header.getBoundingClientRect();

        if (nav_rect.bottom - threshold <= header_rect.bottom) {
            const nav_menu = nav.querySelector(':scope .swiper-wrapper');
            if (nav_menu) {
                sticky_nav_container.appendChild(nav_menu);
                static_nav_container.innerHTML = '';
            }
        }
        else {
            if (sticky_nav_container.firstElementChild) {
                static_nav_container.appendChild(sticky_nav_container.firstElementChild);
                sticky_nav_container.innerHTML = '';
            }
        }
    }

    const section_before_nav = nav.previousElementSibling;
    function SwithchingNavAnchorMenuMobile() {
        const section_rect = section_before_nav.getBoundingClientRect();
        if (section_rect.bottom < 0) {
            nav.classList.add('fixed-on-mobile');
        }
        else {
            nav.classList.remove('fixed-on-mobile');
        }
    }

    // change menu item to "selected" when nav menu is over section which 
    // corresponds to menu item
    function HandleMenuItemSelection() {
        let section_was_not_found = true;
        nav_links.forEach(link => {
            const elem = (window.innerWidth > 768) ? header : nav;
            const header_rect = elem.getBoundingClientRect();

            const target_section_id = link.href.split('#')[1];
            const target_section = target_sections[target_section_id];
            const target_rect = target_section.getBoundingClientRect();
            if (header_rect.bottom > target_rect.top && header_rect.top < target_rect.bottom) {
                link.parentElement.classList.add('selected');
                const rest_links = nav_links.filter(_link => link.href != _link.href);
                rest_links.forEach(_link => _link.parentElement.classList.remove('selected'));
                section_was_not_found = false;
            }

            if (section_was_not_found) {
                nav_links.forEach(_link => _link.parentElement.classList.remove('selected'));
            }
        });
    }

    window.addEventListener('scroll', __throttle(function() {
        if (window.innerWidth > 767) {
            SwithchingNavAnchorMenuDesktop();
        }
        else {
            SwithchingNavAnchorMenuMobile();
        }
        HandleMenuItemSelection();
    }), 60);

    // click on nav link will scroll to chosen section
    nav_links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target_section_id = link.href.split('#')[1];
            const target_section = target_sections[target_section_id];
            const rect_section = target_section.getBoundingClientRect();
            let top = window.scrollY + rect_section.top;
            const section_styles = window.getComputedStyle(target_section);
            let section_top_padding = parseInt(section_styles.getPropertyValue('padding-top'));
            let correction;
            if (window.innerWidth > 767) {
                const header_height = header.clientHeight;
                correction = header_height - section_top_padding + 20;
            }
            else {
                if (nav.classList.contains('fixed-on-mobile')) {
                    nav_rect = nav.getBoundingClientRect();
                    correction = nav_rect.bottom - section_top_padding + 5;
                }
                else {
                    const nav_height = nav.clientHeight;
                    const top_position_sticky_nav = 20;
                    // we have to double nav_height because it goes out of the flow of content
                    // when it goes in sticky position.
                    correction = top_position_sticky_nav + 2 * nav_height - section_top_padding + 5;
                }
            }
            window.scrollTo({
                top: top - correction,
                behavior: "smooth"
            });
        });
    })

    document.querySelector("html[lang='he']") ? static_nav_container.setAttribute('dir', 'rtl') : static_nav_container.setAttribute('dir', 'ltr');
    function initAnchorSwiper(query) {
        const breakpoint = window.matchMedia('(min-width:768px)');
        let mySwiper;

        const breakpointChecker = function() {

            // if larger viewport and multi-row layout needed
            if (breakpoint.matches === true) {

                // clean up old instances and inline styles when available
                if (mySwiper !== undefined) mySwiper.destroy(true, true);

                //generate scroll event in order to set active item in the nav.
                window.scrollBy(0, 1);
                window.scrollBy(0, -1);
                // or/and do nothing
                return;

                // else if a small viewport and single column layout needed
            } else if (breakpoint.matches === false) {

                if (sticky_nav_container.firstElementChild) {
                    static_nav_container.appendChild(sticky_nav_container.firstElementChild);
                    sticky_nav_container.innerHTML = '';
                }


                //generate scroll event in order to set active item in the nav.
                window.scrollBy(0, 1);
                window.scrollBy(0, -1);
                // fire small viewport version of swiper
                return enableSwiper();

            }

        };

        const enableSwiper = function() {

            mySwiper = new Swiper(query, {
                freeMode: true,
                slidesPerView: "auto",
                spaceBetween: 30,
                rewind: true,
                a11y: false,
                navigation: {
                    nextEl: '#_nav-anchors .swiper-button-next',
                    prevEl: '#_nav-anchors .swiper-button-prev',
                }
            });

        };

        // keep an eye on viewport size changes
        breakpoint.addListener(breakpointChecker);

        // kickstart
        breakpointChecker();
    }

    initAnchorSwiper('#_nav-anchors .swiper');
})();
