jQuery(document).ready(function() {

	var navOffset = jQuery("div").offset().top;

	jQuery(window).scroll(function() {

		var scrollPos = jQuery(window).scrollTop();

		if (scrollPos >= navOffset) {
			jQuery("div").addClass("fixed");
		} else {

			jQuery("div").removeClass("fixed");
		}


	});

});
