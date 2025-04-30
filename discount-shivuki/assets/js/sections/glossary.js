//glossary page functionality
(function() {
    let glossary_items_wrap = document.getElementById("glossary-items");
    if (!glossary_items_wrap) {
        return;
    }
    let styles = window.getComputedStyle(glossary_items_wrap);
    let direction = styles.getPropertyValue("direction");
    let placeholder_txt = direction === "rtl" ? "חפשו מונח עליו רציתם לקרוא" : "Search for term";
    let no_result_search_msg = direction === 'rtl' ? 'אין תוצאת חיפוש' : 'No search result';

    const autoCompleteJS = new autoComplete({
        selector: "#glossaryAutocomplet",
        placeHolder: placeholder_txt,
        resultsList: {
            element: (list, data) => {
                if (!data.results.length) {
                    // Create "No Results" message list element
                    const message = document.createElement("li");
                    message.setAttribute("class", "no_result");
                    // Add message text content
                    // TO DEVELOPER: you can use parameter data.query to be more specific about searhc
                    message.innerHTML = no_result_search_msg;
                    // Add message list element to the list
                    list.appendChild(message);
                }
            },
            noResults: true,
        },
        data: {
            src: (query) => {
                // use param. "query" to make ajax call to get data.
                // return ["איגרות חוב ממשלתיות", "איגרות חוב קונצרניות", "איגרות חוב בלי ריבית", "איגרת בזק", "איגרת המנכ״ל"];
                return ['London', 'Bristol', 'Birmingham', 'Leeds', 'Sheffield', 'Bradford', 'Manchester'];
            },
            cache: false,
        },
        resultItem: {
            highlight: true,
        },
        events: {
            input: {
                selection: (event) => {
                    const selection = event.detail.selection.value;
                    autoCompleteJS.input.value = selection;
                },
            },
        },
    });

    const open_txt = glossary_items_wrap.dataset.btn_open_item_txt;
    const close_txt = glossary_items_wrap.dataset.btn_close_item_txt;

    glossary_items_wrap.addEventListener("click", function(e) {
        const target = e.target;
        if (target.closest(".more-less-btn")) {
            let item_container = target.closest(".item");
            let txt = item_container.querySelector(":scope .txt");
            let btn_txt = item_container.querySelector(":scope .more-less-txt");
            let sign = item_container.querySelector(":scope .sign");

            if (!item_container.classList.contains("expanded")) {
                txt.style.maxHeight = txt.scrollHeight + "px";
                item_container.classList.add("expanded");
                item_container.classList.remove("clipped");
                btn_txt.innerText = close_txt;
                sign.innerText = "-";
            } else {
                txt.removeAttribute("style");
                item_container.classList.remove("expanded");
                btn_txt.innerText = open_txt;
                sign.innerText = "+";
                setTimeout(() => item_container.classList.add("clipped"), 400);
            }
        }
    });

    const col_odd = document.createElement("div");
    col_odd.setAttribute("class", "col-odd");

    const col_even = document.createElement("div");
    col_even.setAttribute("class", "col-even");

    // shove items into left and right columns
    function shove_items_into_columns() {
        const items = [...glossary_items_wrap.querySelectorAll(":scope .item")];
        items.forEach((item, ind) => {
            let reminder = ind % 2;
            if (reminder === 0) {
                col_odd.appendChild(item);
            } else {
                col_even.appendChild(item);
            }
        });
    }

    glossary_items_wrap.appendChild(col_odd);
    glossary_items_wrap.appendChild(col_even);

    //disassemble columns and shove them into parent element.
    function disassemble_columns() {
        const items = [...glossary_items_wrap.querySelectorAll(":scope .item")];
        const n_items = items.length;
        for (let index = 0; index < n_items; index++) {
            let reminder = index % 2;
            if (reminder === 0) {
                if (col_odd.firstElementChild) {
                    glossary_items_wrap.appendChild(col_odd.firstElementChild);
                }
            } else {
                if (col_even.firstElementChild) {
                    glossary_items_wrap.appendChild(col_even.firstElementChild);
                }
            }
        }
    }
    function resolution_change() {
        if (window.innerWidth > 767) {
            shove_items_into_columns();
        } else {
            disassemble_columns();
        }
    }

    resolution_change();

    let mq = window.matchMedia("(max-width: 767px)");
    mq.addListener(resolution_change);

    function ajaxCallFunc(params) {
        return new Promise((resolver) => {
            let html;
            if (params.lang === "rtl") {
                html = `
            <div class="item clipped">
                <h3 class="item-header">
                    איגרות חוב ממשלתיותconst
                </h3>
                <div class="item-content">
                    <div class="txt">
                        התשלום נעשה על פי תנאי האיגרת עד למועד הפדיון שבו מוחזרת יתרת ההלוואה. הריבית המשולמת למחזיק
                        האיגרת מכונה א׳, ג׳, ה׳וש או קופון.
                        מחזיק האיגרת מלווה כסף לחברה או לממשלה, והתמוה מקבל איגרת חוב שבה נקוב מועד הפירעון, גובה
                        הריבית, סוג הריבית וסוג ההצמדה.
                        בעלי החוב (רוכשי איגרת החוב) נמצאים בעדיפים על פני בעלי המניות בעת פירוק חברה.
                    </div>
                    <button class="more-less-btn">
                        <span class="more-less-txt">קרא עוד</span>
                        <span class="sign">+</span>
                    </button>
                </div>
            </div>

            <div class="item clipped">
                <h3 class="item-header">
                    איגרות חוב קונצרניות - Corporate Bond חוב ממשלתיות
                </h3>
                <div class="item-content">
                    <div class="txt">
                        איגרת חוב היא שטר התחייבות של לווה לתקופת זמן קצובה, המשלם למחזיק בה ריבית וקרן במועדים קבועים.
                        האיגרת מכונה א׳, ג׳, ה׳וש או קופון.
                        מחזיק האיגרת מלווה כסף לחברה או לממשלה, והתמוה מקבל איגרת חוב שבה נקוב מועד הפירעון, גובה
                        הריבית, סוג הריבית וסוג ההצמדה.
                        בעלי החוב (רוכשי איגרת החוב) נמצאים בעדיפים על פני בעלי המניות בעת פירוק חברה.
                    </div>
                    <button class="more-less-btn">
                        <span class="more-less-txt">קרא עוד</span>
                        <span class="sign">+</span>
                    </button>
                </div>
            </div>

            <div class="item clipped">
                <h3 class="item-header">
                    איגרות חוב בלי ריבית / בלי א׳, ג׳, ה׳וש Zero Coupon Bond No-Coupon Bond
                </h3>
                <div class="item-content">
                    <div class="txt">
                        איגרת חוב היא שטר התחייבות של לווה לתקופת זמן קצובה, המשלם למחזיק בה ריבית וקרן במועדים קבועים.
                        האיגרת מכונה א׳, ג׳, ה׳וש או קופון.
                        מחזיק האיגרת מלווה כסף לחברה או לממשלה, והתמוה מקבל איגרת חוב שבה נקוב מועד הפירעון, גובה
                        הריבית, סוג הריבית וסוג ההצמדה.
                        בעלי החוב (רוכשי איגרת החוב) נמצאים בעדיפים על פני בעלי המניות בעת פירוק חברה.
                    </div>
                    <button class="more-less-btn">
                        <span class="more-less-txt">קרא עוד</span>
                        <span class="sign">+</span>
                    </button>
                </div>
            </div>
        `;
            } else {
                html = `
            <div class="item clipped">
                <h3 class="item-header">
                    <span>Profit warning - Warning example</span>
                </h3>
                <div class="item-content">
                    <div class="txt">
                        A bond is a deed of commitment of a borrower for a fixed period of time, which pays its holder
                        interest and principal at fixed dates.
                        The payment is made according to the terms of the bond until the maturity date when the balance
                        of the loan is returned. The interest paid to the holder
                        The bond is called a slip or coupon.
                        The holder of the bond lends money to a company or the government, and the borrower receives a
                        bond that states the maturity date, amount
                        The interest, the type of interest and the type of linkage.
                        Debt holders (bond buyers) are preferred over shareholders when a company is liquidated.
                    </div>
                    <button class="more-less-btn">
                        <span class="more-less-txt">read more</span>
                        <span class="sign">+</span>
                    </button>
                </div>
            </div>

            <div class="item clipped">
                <h3 class="item-header">
                    Debenture, loan stock, bond
                </h3>
                <div class="item-content">
                    <div class="txt">
                        The payment is made according to the terms of the bond until the maturity date when the balance
                        of the loan is returned. The interest paid to the holder
                        The bond is called a slip or coupon.
                        The interest, the type of interest and the type of linkage.
                        Debt holders (bond buyers) are preferred over shareholders when a company is liquidated.
                    </div>
                    <button class="more-less-btn">
                        <span class="more-less-txt">read more</span>
                        <span class="sign">+</span>
                    </button>
                </div>
            </div>

            <div class="item clipped">
                <h3 class="item-header">
                    Government bonds
                </h3>
                <div class="item-content">
                    <div class="txt">
                        The payment is made according to the terms of the bond until the maturity date when the balance
                        of the loan is returned. The interest paid to the holder
                        The bond is called a slip or coupon.
                        The holder of the bond lends money to a company or the government, and the borrower receives a
                        bond that states the maturity date, amount
                        The interest, the type of interest and the type of linkage.
                        Debt holders (bond buyers) are preferred over shareholders when a company is liquidated.
                    </div>
                    <button class="more-less-btn">
                        <span class="more-less-txt">read more</span>
                        <span class="sign">+</span>
                    </button>
                </div>
            </div>
                `;
            }
            // do make here ajax request to obtain html markup for next glossary items.
            setTimeout(() => {
                resolver(html);
            }, 1500);
        });
    }

    // click on "Load more glossary" will load additional items and remove when all items are already loaded.
    const load_more_items_btn = document.getElementById("load-more-glossary-items");
    if (load_more_items_btn) {
        const load_icon = document.getElementById("ajax-glossary-icon");
        let cur_page = 1;
        const n_pages = parseInt(load_more_items_btn.dataset.n_pages);
        load_more_items_btn.addEventListener("click", function(e) {
            e.preventDefault();
            if (load_icon.classList.contains("show")) {
                return;
            }
            cur_page++;
            if (cur_page <= n_pages) {
                load_icon.classList.add("show");
                // page direction here was used in purpose to show example
                //You are going to use current language
                let lang = direction;
                ajaxCallFunc({ cur_page, lang }).then((html) => {
                    if (window.innerWidth > 767) {
                        let div = document.createElement("div");
                        div.insertAdjacentHTML("afterbegin", html);
                        let items = __arrElements(div.querySelectorAll(".item"));
                        let insert_in_first_column = col_even.querySelectorAll(".item").length >= col_odd.querySelectorAll(".item").length;
                        items.forEach((item, ind) => {
                            let reminder = ind % 2;
                            if (reminder === 0) {
                                if (insert_in_first_column) {
                                    col_odd.appendChild(item);
                                } else {
                                    col_even.appendChild(item);
                                }
                            } else {
                                if (insert_in_first_column) {
                                    col_even.appendChild(item);
                                } else {
                                    col_odd.appendChild(item);
                                }
                            }
                        });
                    } else {
                        glossary_items_wrap.insertAdjacentHTML("beforeend", html);
                    }
                    load_icon.classList.remove("show");
                    if (cur_page === n_pages) {
                        load_more_items_btn.parentElement.remove();
                    }
                });
            }
        });
    }
})();
