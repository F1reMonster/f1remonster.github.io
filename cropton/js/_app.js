"use strict";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin); // ====================================================
// scroll anchor

function scrollAnchor(selector) {
  selector.on("click", "a", function () {
    if ($(".header__group--mobile-menu").hasClass("opened")) {
      // $(".header__burger").removeClass("opened");
      $(".header__group--mobile-menu").removeClass("opened");
      $("body").removeClass("lock");
    }

    var $this = $(this),
        href = $this.attr("href"),
        // topY = $(href).offset().top - $(".header").innerHeight(),
    topY = $(href).offset().top,
        idx = $(href).index(),
        duration = $("section").length / 3;
    gsap.to($(window), {
      duration: duration,
      scrollTo: {
        y: topY,
        autoKill: true
      },
      ease: Power3.easeOut
    });
    return false;
  });
} // function drawChart() {
// 	let darkmode, color, colorLine;
// 	var data = google.visualization.arrayToDataTable([
// 		["Year", "Price", "Dividents"],
// 		["1994", 20, 0.025],
// 		["1995", 21, 0.022],
// 		["1996", 22, 0.031],
// 		["1997", 23, 0.03],
// 		["1998", 24, 0.028],
// 	]);
// 	var options2 = {
// 		curveType: "function",
// 		width: "100%",
// 		height: 500,
// 		backgroundColor: { fill: "transparent" },
// 		chartArea: {
// 			backgroundColor: "transparent",
// 		},
// 		legend: { position: "none" },
// 		vAxis: {
// 			gridlines: { count: 3 },
// 			titleTextStyle: {
// 			},
// 		},
// 		hAxis: {
// 			title: "Years",
// 			titleTextStyle: {
// 			},
// 		},
// 		series: {
// 			0: {
// 				type: "bars",
// 				targetAxisIndex: 0,
// 				color: 'blue'
// 			},
// 			1: {
// 				type: "line",
// 				targetAxisIndex: 1,
// 				color: 'red',
// 			},
// 		},
// 		vAxes: {
// 			0: {
// 				title: "Price",
// 				// color: "linear-gradient(146.28deg, #00AACF 31.55%, #0E51D3 91.53%), #D9D9D9",
// 			},
// 			1: {
// 				title: "Dividents",
// 			},
// 		},
// 	};
// 	// Instantiate and draw our chart, passing in some options.
// 	var chart = new google.visualization.LineChart(
// 		document.querySelector(".graph")
// 	);
// 	chart.draw(data, options2);
// }


$(document).ready(function () {
  // charts
  var priceColor = "#a4a4a4",
      yearColor = "#a4a4a4"; // var options = {
  // 	series: [
  // 		{
  // 			name: "Price",
  // 			type: "column",
  // 			data: [
  // 				21, 22, 25, 26, 28, 28, 30, 31, 32, 33, 34, 35, 36, 38, 40, 41, 42,
  // 				43, 44, 45, 46, 47, 48, 49, 50, 52, 60, 62, 63, 65, 68, 69,
  // 			],
  // 		},
  // 		{
  // 			name: "Dividents",
  // 			type: "line",
  // 			data: [
  // 				0.01, 0.02, 0.05, 0.08, 0.1, 0.11, 0.115, 0.13, 0.14, 0.145, 0.15,
  // 				0.14, 0.145, 0.156, 0.17, 0.18, 0.19, 0.21, 0.222, 0.226, 0.2, 0.225,
  // 				0.22, 0.232, 0.244, 0.2513, 0.26, 0.244, 0.231, 0.233, 0.24356, 0.236,
  // 			],
  // 		},
  // 	],
  // 	chart: {
  // 		width: "100%",
  // 		height: "100%",
  // 		type: "line",
  // 		stacked: true,
  // 		toolbar: {
  // 			show: false,
  // 		},
  // 	},
  // 	dataLabels: {
  // 		enabled: false,
  // 	},
  // 	stroke: {
  // 		width: [1, 4],
  // 	},
  // 	colors: ["#0876d2", "#FF4A4A"],
  // 	xaxis: {
  // 		categories: [
  // 			1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2002, 2003, 2004,
  // 			2005, 2006, 2007, 2008, 2009, 2009, 2010, 2011, 2012, 2013, 2014, 2014,
  // 			2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
  // 		],
  // 		tickAmount: 3.5,
  // 		labels: {
  // 			rotate: 0,
  // 			style: {
  // 				colors: yearColor,
  // 				fontSize: "14px",
  // 				fontFamily: "Montserrat, sans-serif",
  // 				fontWeight: 600,
  // 			},
  // 		},
  // 	},
  // 	yaxis: [
  // 		{
  // 			seriesName: "Price",
  // 			axisTicks: {
  // 				show: true,
  // 			},
  // 			tickAmount: 0,
  // 			axisBorder: {
  // 				show: true,
  // 				color: priceColor,
  // 			},
  // 			labels: {
  // 				style: {
  // 					colors: priceColor,
  // 					fontFamily: "Montserrat, sans-serif",
  // 					fontWeight: 500,
  // 				},
  // 				formatter: (val) => {
  // 					return val.toFixed(0);
  // 				},
  // 			},
  // 			title: {
  // 				text: "Price, $",
  // 				style: {
  // 					color: priceColor,
  // 					fontFamily: "Montserrat, sans-serif",
  // 				},
  // 			},
  // 			tooltip: {
  // 				enabled: true,
  // 			},
  // 		},
  // 		{
  // 			seriesName: "Dividents",
  // 			opposite: true,
  // 			axisTicks: {
  // 				show: true,
  // 			},
  // 			tickAmount: 0,
  // 			axisBorder: {
  // 				show: true,
  // 				color: "#7CBFFF",
  // 			},
  // 			fill: {
  // 				colors: ["#FF4A4A"],
  // 			},
  // 			labels: {
  // 				style: {
  // 					colors: "#7CBFFF",
  // 					fontFamily: "Montserrat, sans-serif",
  // 					fontWeight: 500,
  // 				},
  // 				formatter: (val) => {
  // 					return val.toFixed(2);
  // 				},
  // 			},
  // 			title: {
  // 				text: "Dividents",
  // 				style: {
  // 					color: "#7CBFFF",
  // 					fontFamily: "Montserrat, sans-serif",
  // 				},
  // 			},
  // 			tooltip: {
  // 				enabled: true,
  // 			},
  // 		},
  // 	],
  // 	tooltip: {
  // 		theme: "dark",
  // 		style: {
  // 			fontSize: "12px",
  // 			fontFamily: "Montserrat, sans-serif",
  // 		},
  // 	},
  // 	legend: {
  // 		fontSize: "12px",
  // 		fontFamily: "Montserrat, sans-serif",
  // 		labels: {
  // 			colors: yearColor,
  // 		},
  // 		horizontalAlign: "left",
  // 		offsetX: 40,
  // 	},
  // };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();

  if (localStorage.getItem(window.location.host) === "theme-dark") {
    $(".switcher").addClass("active");
    $("html").addClass("theme__dark");
    $(".block__hiw-content-img").attr("src", "img/hiw-dark.png");
    priceColor = yearColor = "#fff"; // chart.updateOptions({
    // 	colors: ["#0876d2", "#fff"],
    // 	xaxis: {
    // 		categories: [
    // 			1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2002, 2003,
    // 			2004, 2005, 2006, 2007, 2008, 2009, 2009, 2010, 2011, 2012, 2013,
    // 			2014, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
    // 		],
    // 		tickAmount: 3.5,
    // 		labels: {
    // 			rotate: 0,
    // 			style: {
    // 				colors: yearColor,
    // 				fontSize: "14px",
    // 				fontFamily: "Montserrat, sans-serif",
    // 				fontWeight: 600,
    // 			},
    // 		},
    // 	},
    // 	yaxis: [
    // 		{
    // 			seriesName: "Price",
    // 			axisTicks: {
    // 				show: true,
    // 			},
    // 			tickAmount: 0,
    // 			axisBorder: {
    // 				show: true,
    // 				color: priceColor,
    // 			},
    // 			labels: {
    // 				style: {
    // 					colors: priceColor,
    // 					fontFamily: "Montserrat, sans-serif",
    // 					fontWeight: 500,
    // 				},
    // 				formatter: (val) => {
    // 					return val.toFixed(0);
    // 				},
    // 			},
    // 			title: {
    // 				text: "Price, $",
    // 				style: {
    // 					color: priceColor,
    // 					fontFamily: "Montserrat, sans-serif",
    // 				},
    // 			},
    // 			tooltip: {
    // 				enabled: true,
    // 			},
    // 		},
    // 		{
    // 			seriesName: "Dividents",
    // 			opposite: true,
    // 			axisTicks: {
    // 				show: true,
    // 			},
    // 			tickAmount: 0,
    // 			axisBorder: {
    // 				show: true,
    // 				color: "#7CBFFF",
    // 			},
    // 			fill: {
    // 				colors: ["#FF4A4A"],
    // 			},
    // 			labels: {
    // 				style: {
    // 					colors: "#7CBFFF",
    // 					fontFamily: "Montserrat, sans-serif",
    // 					fontWeight: 500,
    // 				},
    // 				formatter: (val) => {
    // 					return val.toFixed(2);
    // 				},
    // 			},
    // 			title: {
    // 				text: "Dividents",
    // 				style: {
    // 					color: "#7CBFFF",
    // 					fontFamily: "Montserrat, sans-serif",
    // 				},
    // 			},
    // 			tooltip: {
    // 				enabled: true,
    // 			},
    // 		},
    // 	],
    // 	tooltip: {
    // 		theme: "dark",
    // 		style: {
    // 			fontSize: "12px",
    // 			fontFamily: "Montserrat, sans-serif",
    // 		},
    // 	},
    // 	legend: {
    // 		fontSize: "12px",
    // 		fontFamily: "Montserrat, sans-serif",
    // 		labels: {
    // 			colors: yearColor,
    // 		},
    // 		horizontalAlign: "left",
    // 		offsetX: 40,
    // 	},
    // });
  } else {
    $(".switcher").removeClass("active");
    $("html").removeClass("theme__dark");
    $(".block__hiw-content-img").attr("src", "img/hiw-light.png");
    priceColor = yearColor = "#a4a4a4"; // chart.updateOptions({
    // 	colors: ["#0876d2", "#FF4A4A"],
    // 	xaxis: {
    // 		categories: [
    // 			1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2002, 2003,
    // 			2004, 2005, 2006, 2007, 2008, 2009, 2009, 2010, 2011, 2012, 2013,
    // 			2014, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
    // 		],
    // 		tickAmount: 3.5,
    // 		labels: {
    // 			rotate: 0,
    // 			style: {
    // 				colors: yearColor,
    // 				fontSize: "14px",
    // 				fontFamily: "Montserrat, sans-serif",
    // 				fontWeight: 600,
    // 			},
    // 		},
    // 	},
    // 	yaxis: [
    // 		{
    // 			seriesName: "Price",
    // 			axisTicks: {
    // 				show: true,
    // 			},
    // 			tickAmount: 0,
    // 			axisBorder: {
    // 				show: true,
    // 				color: priceColor,
    // 			},
    // 			labels: {
    // 				style: {
    // 					colors: priceColor,
    // 					fontFamily: "Montserrat, sans-serif",
    // 					fontWeight: 500,
    // 				},
    // 				formatter: (val) => {
    // 					return val.toFixed(0);
    // 				},
    // 			},
    // 			title: {
    // 				text: "Price, $",
    // 				style: {
    // 					color: priceColor,
    // 					fontFamily: "Montserrat, sans-serif",
    // 				},
    // 			},
    // 			tooltip: {
    // 				enabled: true,
    // 			},
    // 		},
    // 		{
    // 			seriesName: "Dividents",
    // 			opposite: true,
    // 			axisTicks: {
    // 				show: true,
    // 			},
    // 			tickAmount: 0,
    // 			axisBorder: {
    // 				show: true,
    // 				color: "#7CBFFF",
    // 			},
    // 			fill: {
    // 				colors: ["#FF4A4A"],
    // 			},
    // 			labels: {
    // 				style: {
    // 					colors: "#7CBFFF",
    // 					fontFamily: "Montserrat, sans-serif",
    // 					fontWeight: 500,
    // 				},
    // 				formatter: (val) => {
    // 					return val.toFixed(2);
    // 				},
    // 			},
    // 			title: {
    // 				text: "Dividents",
    // 				style: {
    // 					color: "#7CBFFF",
    // 					fontFamily: "Montserrat, sans-serif",
    // 				},
    // 				// rotate: 0,
    // 				// offsetX: -50,
    // 				// offsetY: -210,
    // 			},
    // 			tooltip: {
    // 				enabled: true,
    // 			},
    // 		},
    // 	],
    // 	tooltip: {
    // 		theme: "light",
    // 		style: {
    // 			fontSize: "12px",
    // 			fontFamily: "Montserrat, sans-serif",
    // 		},
    // 	},
    // 	legend: {
    // 		fontSize: "12px",
    // 		fontFamily: "Montserrat, sans-serif",
    // 		labels: {
    // 			colors: yearColor,
    // 		},
    // 		horizontalAlign: "left",
    // 		offsetX: 40,
    // 	},
    // });
  } // ===================================================
  // faq accordeon


  $(".block__title--faq-item").click(function () {
    $(".block__faq-content").not($(this).next()).slideUp();
    $(".block__faq-item").not($(this).parent()).removeClass("active");
    $(this).parent().toggleClass("active");
    $(this).next().slideToggle();
  }); // ====================================================
  //  burger menu

  $(".header__burger").click(function () {
    $(".header__group--mobile-menu").addClass("opened");
    $("body").addClass("lock");
  });
  $(".header__menu-mobile-close").click(function () {
    $(".header__group--mobile-menu").removeClass("opened");
    $("body").removeClass("lock");
  }); // =====================================================
  //  theme

  $(".dark").click(function () {
    $(".switcher").addClass("active");
    $("html").addClass("theme__dark");
    $(".block__hiw-content-img").attr("src", "img/hiw-dark.png");
    localStorage.setItem(window.location.host, "theme-dark");
    priceColor = yearColor = "#fff"; // chart.updateOptions({
    // 	colors: ["#0876d2", "#fff"],
    // 	xaxis: {
    // 		categories: [
    // 			1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2002, 2003,
    // 			2004, 2005, 2006, 2007, 2008, 2009, 2009, 2010, 2011, 2012, 2013,
    // 			2014, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
    // 		],
    // 		tickAmount: 3.5,
    // 		labels: {
    // 			rotate: 0,
    // 			style: {
    // 				colors: yearColor,
    // 				fontSize: "14px",
    // 				fontFamily: "Montserrat, sans-serif",
    // 				fontWeight: 600,
    // 			},
    // 		},
    // 	},
    // 	yaxis: [
    // 		{
    // 			seriesName: "Price",
    // 			axisTicks: {
    // 				show: true,
    // 			},
    // 			tickAmount: 0,
    // 			axisBorder: {
    // 				show: true,
    // 				color: priceColor,
    // 			},
    // 			labels: {
    // 				style: {
    // 					colors: priceColor,
    // 					fontFamily: "Montserrat, sans-serif",
    // 					fontWeight: 500,
    // 				},
    // 				formatter: (val) => {
    // 					return val.toFixed(0);
    // 				},
    // 			},
    // 			title: {
    // 				text: "Price, $",
    // 				style: {
    // 					color: priceColor,
    // 					fontFamily: "Montserrat, sans-serif",
    // 				},
    // 			},
    // 			tooltip: {
    // 				enabled: true,
    // 			},
    // 		},
    // 		{
    // 			seriesName: "Dividents",
    // 			opposite: true,
    // 			axisTicks: {
    // 				show: true,
    // 			},
    // 			tickAmount: 0,
    // 			axisBorder: {
    // 				show: true,
    // 				color: "#7CBFFF",
    // 			},
    // 			fill: {
    // 				colors: ["#FF4A4A"],
    // 			},
    // 			labels: {
    // 				style: {
    // 					colors: "#7CBFFF",
    // 					fontFamily: "Montserrat, sans-serif",
    // 					fontWeight: 500,
    // 				},
    // 				formatter: (val) => {
    // 					return val.toFixed(2);
    // 				},
    // 			},
    // 			title: {
    // 				text: "Dividents",
    // 				style: {
    // 					color: "#7CBFFF",
    // 					fontFamily: "Montserrat, sans-serif",
    // 				},
    // 				rotate: 0,
    // 				offsetX: -50,
    // 				offsetY: -210,
    // 			},
    // 			tooltip: {
    // 				enabled: true,
    // 			},
    // 		},
    // 	],
    // 	tooltip: {
    // 		theme: "dark",
    // 		style: {
    // 			fontSize: "12px",
    // 			fontFamily: "Montserrat, sans-serif",
    // 		},
    // 	},
    // 	legend: {
    // 		fontSize: "12px",
    // 		fontFamily: "Montserrat, sans-serif",
    // 		labels: {
    // 			colors: yearColor,
    // 		},
    // 		horizontalAlign: "left",
    // 		offsetX: 40,
    // 	},
    // });
  });
  $(".light").click(function () {
    $(".switcher").removeClass("active");
    $("html").removeClass("theme__dark");
    $(".block__hiw-content-img").attr("src", "img/hiw-light.png");
    localStorage.removeItem(window.location.host);
    priceColor = yearColor = "#a4a4a4"; // chart.updateOptions({
    // 	colors: ["#0876d2", "#FF4A4A"],
    // 	xaxis: {
    // 		categories: [
    // 			1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2002, 2003,
    // 			2004, 2005, 2006, 2007, 2008, 2009, 2009, 2010, 2011, 2012, 2013,
    // 			2014, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
    // 		],
    // 		tickAmount: 3.5,
    // 		labels: {
    // 			rotate: 0,
    // 			style: {
    // 				colors: yearColor,
    // 				fontSize: "14px",
    // 				fontFamily: "Montserrat, sans-serif",
    // 				fontWeight: 600,
    // 			},
    // 		},
    // 	},
    // 	yaxis: [
    // 		{
    // 			seriesName: "Price",
    // 			axisTicks: {
    // 				show: true,
    // 			},
    // 			tickAmount: 0,
    // 			axisBorder: {
    // 				show: true,
    // 				color: priceColor,
    // 			},
    // 			labels: {
    // 				style: {
    // 					colors: priceColor,
    // 					fontFamily: "Montserrat, sans-serif",
    // 					fontWeight: 500,
    // 				},
    // 				formatter: (val) => {
    // 					return val.toFixed(0);
    // 				},
    // 			},
    // 			title: {
    // 				text: "Price, $",
    // 				style: {
    // 					color: priceColor,
    // 					fontFamily: "Montserrat, sans-serif",
    // 				},
    // 			},
    // 			tooltip: {
    // 				enabled: true,
    // 			},
    // 		},
    // 		{
    // 			seriesName: "Dividents",
    // 			opposite: true,
    // 			axisTicks: {
    // 				show: true,
    // 			},
    // 			tickAmount: 0,
    // 			axisBorder: {
    // 				show: true,
    // 				color: "#7CBFFF",
    // 			},
    // 			fill: {
    // 				colors: ["#FF4A4A"],
    // 			},
    // 			labels: {
    // 				style: {
    // 					colors: "#7CBFFF",
    // 					fontFamily: "Montserrat, sans-serif",
    // 					fontWeight: 500,
    // 				},
    // 				formatter: (val) => {
    // 					return val.toFixed(2);
    // 				},
    // 			},
    // 			title: {
    // 				text: "Dividents",
    // 				style: {
    // 					color: "#7CBFFF",
    // 					fontFamily: "Montserrat, sans-serif",
    // 				},
    // 				rotate: 0,
    // 				offsetX: -50,
    // 				offsetY: -210,
    // 			},
    // 			tooltip: {
    // 				enabled: true,
    // 			},
    // 		},
    // 	],
    // 	tooltip: {
    // 		theme: "light",
    // 		style: {
    // 			fontSize: "12px",
    // 			fontFamily: "Montserrat, sans-serif",
    // 		},
    // 	},
    // 	legend: {
    // 		fontSize: "12px",
    // 		fontFamily: "Montserrat, sans-serif",
    // 		labels: {
    // 			colors: yearColor,
    // 		},
    // 		horizontalAlign: "left",
    // 		offsetX: 40,
    // 	},
    // });
  });
  var menu = $(".header__menu"),
      menuMobile = $(".header__group--mobile-menu");
  scrollAnchor(menu);
  scrollAnchor(menuMobile);
  $(".btn-plan").click(function () {
    if (!$(this).hasClass("active")) {
      $(".btn-plan").removeClass("active");
      $(this).addClass("active");
      $(".range").attr("data-plan", $(this).attr("data-plan"));
    } else {
      return;
    }
  });
  $(".log-in").click(function (e) {
    e.preventDefault();
    $.fancybox.open({
      src: "#form-login",
      type: "inline"
    });
  });
});
$(window).on("resize", function () {});
$(window).on("load", function () {
  $(".preloader").remove();
});