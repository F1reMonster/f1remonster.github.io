// faq section
(function() {
	function getFaqItems(some_parameters) {
		let html = `
            <h4 class="question accordeon-title">
                <button id="question-5" aria-expanded="true" aria-controls="answer-5">
                    <span>אילו מכשירים תומכים בארנק של PayBox?</span>
                    <img class="faq-icon" src="./assets/img/faq-tick.svg" alt="tick-mark">
                </button>
            </h4>
            <div id="answer-5" role="region" aria-labelledby="question-5" class="answer accordeon-content">
                <p>
                    אפשר להתכתב עם העוזרת הדיגיטלית שלנו והיא תעביר אותך לביצוע פעולה, מידע או התכתבות עם בנקאי
                    אנושי.
                    כדי להגיע לשם, פשוט לוחצים בכניסה לאפליקציה למטה משמאל על "חיפוש" (אייקון זכוכית מגדלת)
                    ומתכתבים.
                </p>

                <a class="purple-link" href="#">מחשבון ריביות</a>
            </div>
            <h4 class="question accordeon-title">
                <button id="question-6" aria-expanded="true" aria-controls="answer-6">
                    <span>באילו כרטיסים אפשר להשתמש בארנק דיגיטלי?</span>
                    <img class="faq-icon" src="./assets/img/faq-tick.svg" alt="tick-mark">
                </button>
            </h4>
            <div id="answer-6" role="region" aria-labelledby="question-6" class="answer accordeon-content">
                <p>
                    אפשר להתכתב עם העוזרת הדיגיטלית שלנו והיא תעביר אותך לביצוע פעולה, מידע או התכתבות עם בנקאי
                    אנושי.
                    כדי להגיע לשם, פשוט לוחצים בכניסה לאפליקציה למטה משמאל על "חיפוש" (אייקון זכוכית מגדלת)
                    ומתכתבים.
                </p>

                <a class="purple-link" href="#">מחשבון ריביות</a>
            </div>
        `;
		let html_ltr = `
            <h4 class="question accordeon-title">
                <button id="question-5" aria-expanded="true" aria-controls="answer-5">
                    <span>Question </span>
                    <img class="faq-icon" src="./assets/img/faq-tick.svg" alt="tick-mark">
                </button>
            </h4>
            <div id="answer-5" role="region" aria-labelledby="question-5" class="answer accordeon-content">
                <h5>
                    Header
                </h5>
                <p>Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi
                    Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia.
                    Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est
                    proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat
                    reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident
                    adipisici</p>

                <a class="purple-link" href="#">more</a>
            </div>
            <h4 class="question accordeon-title">
                <button id="question-6" aria-expanded="true" aria-controls="answer-6">
                    <span>Question </span>
                    <img class="faq-icon" src="./assets/img/faq-tick.svg" alt="tick-mark">
                </button>
            </h4>
            <div id="answer-6" role="region" aria-labelledby="question-6" class="answer accordeon-content">
                <h5>
                    Header
                </h5>
                <p>Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur
                    cupidatat.Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint
                    consectetur cupidatat.</p>

                <a class="purple-link" href="#">more</a>
            </div>
        `;
		return some_parameters.dir === "rtl" ? html : html_ltr;
	}

	let faq_section = document.getElementById("faq-section");
	if (faq_section) {
		new MyAccordeon(faq_section.querySelector(":scope .faq-items-wrap"));

		//click on the button will emulate ajax loading of new faq items.
		let load_more = document.getElementById("load-more-faq");
		if (load_more) {
			let load_more_icon = document.getElementById("load-more-spinner");
			let load_more_wrap = faq_section.querySelector(":scope .faq-items-wrap");
			let cur_page_ind = 0;
			let n_pages = parseInt(load_more.dataset.n_pages);
			let style = window.getComputedStyle(document.body);
			let dir = style.getPropertyValue("direction");
			load_more.addEventListener("click", function(e) {
				e.preventDefault();
				if (load_more_icon.classList.contains("show")) {
					return;
				}
				if (cur_page_ind <= n_pages) {
					load_more_icon.classList.add("show");

					// emulate loading new faq items through ajax using function setTimeout.
					setTimeout(() => {
						cur_page_ind++;
						let params = {
							cur_page_ind,
							dir,
						};
						let faq_html = getFaqItems(params);
						load_more_wrap.insertAdjacentHTML("beforeend", faq_html);
						load_more_icon.classList.remove("show");
						if (cur_page_ind === n_pages) {
							load_more.parentElement.remove();
						}
					}, 1500);
				}
			});
		}
	}
})();
