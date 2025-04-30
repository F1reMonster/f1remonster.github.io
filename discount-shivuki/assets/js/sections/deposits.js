(function() {
  const card_canvases = __arrElements(".deposits canvas");
	
	if (card_canvases.length > 0) {
			drawCardsWithDentAlt('.deposits canvas');
			drawCardsWithDentAltHover('.deposits .card-btn');
	}
  
})();