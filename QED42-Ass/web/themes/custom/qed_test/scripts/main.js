/**
 * @file
 * A JavaScript file for the theme.
 */

(function ($, Drupal) {

	Drupal.behaviors.qed_test = {
		attach: function (context, settings) {
			
		}
	};

	$(document).ready(function(){
		$(".header__search-block .fa-search").click(function(){
			$('body').toggleClass("search_act");
		});
		$(".search__close-icon .fa-times-circle").click(function(){
			$("body").removeClass("search_act");
		});
		$(".header__search-block .fa-align-center").click(function(){
			$('body').toggleClass("menu_act");
		});
		$('.twitter-slider > .view-content').slick({
			dots: false,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 2000,
			speed: 300,
			slidesToShow: 1,
			adaptiveHeight: true
		  });
		  $('.view-banner-slider > .view-content').slick({
			dots: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 2000,
			speed: 300,
			slidesToShow: 1,
			adaptiveHeight: true
		  });
	});

})(jQuery, Drupal);
  