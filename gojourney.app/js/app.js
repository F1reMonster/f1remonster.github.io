$('.post-popover-link').click(function (e) {
	e.preventDefault();
	let $srcPopover = $(this).attr('data-src');

	$.fancybox.open({
		src: $srcPopover,
		type: "inline",
		touch: false
	});
})

$('.post-badge').click(function (e) {
	e.preventDefault();
	let $srcPopover = $(this).attr('data-src');

	$.fancybox.open({
		src: $srcPopover,
		type: "inline",
		touch: false
	});
})