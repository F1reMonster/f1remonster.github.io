var nextYear = new Date().getFullYear() + 1 + "/01/01";
// $("#getting-started").countdown(nextYear, function (event) {
// 	$(this).html(event.strftime("%-w тижнів %-d днів %H годин %M хвилин %S сек"));
// });

console.log(new Date())
console.log(nextYear)



function countdownTimer() {
	// var ending = $(".timer").attr("data-endtime")
	var endTime = new Date(nextYear);
	endTime = Date.parse(endTime) / 1000;

	var now = new Date();
	now = Date.parse(now) / 1000;

	var timeLeft = endTime - now;

	if (timeLeft > 0) {
		var days = Math.floor(timeLeft / 86400);
		var hours = Math.floor((timeLeft - days * 86400) / 3600);
		var minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
		var seconds = Math.floor(timeLeft - days * 86400 - hours * 3600 - minutes * 60);

		if ( days > 99 ) {
			$(".timer .days").html(padDays(days));
		} else {
			$(".timer .days").html(pad(days));
		}
		
		$(".timer .hours").html(pad(hours));
		$(".timer .minutes").html(pad(minutes));
		$(".timer .seconds").html(pad(seconds));
		
		
	}

	setTimeout(countdownTimer, 1000);
}

function pad(s) {
	s = ("00" + s).substr(-2);
	return "<span>" + s[0] + "</span><span>" + s[1] + "</span>";
	
}

function padDays(s) {
	s = ("000" + s).substr(-3);
	return "<span>" + s[0] + "</span><span>" + s[1] + "</span><span>" + s[2] + "</span>";
	
}

countdownTimer();
