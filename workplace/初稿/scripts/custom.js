// JavaScript Document

(function($) {

	$(window).load(function() {
		$("#status").fadeOut(); // will first fade out the loading animation
		$("#preloader").delay(400).fadeOut("slow"); // will fade out the white DIV that covers the website.
	});

	$(document).ready(function() {

		function getCookie(c_name) {
			if (document.cookie.length > 0) {
				c_start = document.cookie.indexOf(c_name + "=")
				if (c_start != -1) {
					c_start = c_start + c_name.length + 1
					c_end = document.cookie.indexOf(";", c_start)
					if (c_end == -1) c_end = document.cookie.length
					return unescape(document.cookie.substring(c_start, c_end))
				}
			}
			return ""
		}

		if(getCookie("userID")!='')
		{
			$("#sidebar-login").addClass("hide");
		}
		else
		{
			$("#sidebar-post").addClass("hide");
			$("#sidebar-mana").addClass("hide");
		}


		screen_width = $(document).width();
		screen_height = $(document).height();
		//$('.all-elements').animate({
		//	minHeight: 100+'%'
		//});

		//$('.header-tip').delay(3000).slideUp(500);
		$('.header-tip').addClass('hide-header-tip');

		$('.show-submenu').click(function() {
			//$(this).find('submenu').toggle();
			//$(this).parent().find('.submenu').slideToggle(200);
			$(this).parent().find('.submenu').toggleClass('submenu-active');
			$(this).toggleClass('show-submenu-active');
			return false;
		});

		window.addEventListener('load', function() {
			FastClick.attach(document.body);
		}, false);

		//Submenu Deploy//

		$('.swipebox').click(function() {
			$('.gallery').hide(0);
			$('.portfolio-wide').hide(0);
		});

		$('.open-nav').click(function() {
			//$(this).toggleClass('remove-sidebar');
			if (snapper.state().state == "left") {
				snapper.close();
			} else {
				snapper.open('left');
			}
			return false;
		});

		$('.sidebar-close').click(function() {
			snapper.close();
		});

		$('.close-menu').click(function() {
			snapper.close();
			return false;
		});

		var snapper = new Snap({
			element: document.getElementById('content')
		});

		/////////////////////////////////////////////////////////////////////////////////////////////
		//Detect user agent for known mobile devices and show hide elements for each specific element
		/////////////////////////////////////////////////////////////////////////////////////////////

		var isiPhone = navigator.userAgent.toLowerCase().indexOf("iphone");
		var isiPad = navigator.userAgent.toLowerCase().indexOf("ipad");
		var isiPod = navigator.userAgent.toLowerCase().indexOf("ipod");
		var isiAndroid = navigator.userAgent.toLowerCase().indexOf("android");

		if (isiPhone > -1) {
			$('.ipod-detected').hide();
			$('.ipad-detected').hide();
			$('.iphone-detected').show();
			$('.android-detected').hide();
		}
		if (isiPad > -1) {
			$('.ipod-detected').hide();
			$('.ipad-detected').show();
			$('.iphone-detected').hide();
			$('.android-detected').hide();
		}
		if (isiPod > -1) {
			$('.ipod-detected').show();
			$('.ipad-detected').hide();
			$('.iphone-detected').hide();
			$('.android-detected').hide();
		}
		if (isiAndroid > -1) {
			$('.ipod-detected').hide();
			$('.ipad-detected').hide();
			$('.iphone-detected').hide();
			$('.android-detected').show();
		}


		//Detect if iOS WebApp Engaged and permit navigation without deploying Safari
		(function(a, b, c) {
			if (c in b && b[c]) {
				var d, e = a.location,
					f = /^(a|html)$/i;
				a.addEventListener("click", function(a) {
					d = a.target;
					while (!f.test(d.nodeName)) d = d.parentNode;
					"href" in d && (d.href.indexOf("http") || ~d.href.indexOf(e.host)) && (a.preventDefault(), e.href = d.href)
				}, !1)
			}
		})(document, window.navigator, "standalone")

		var owlStaffControls = $(".staff-slider");
		owlStaffControls.owlCarousel({
			//Basic Stuff
			items: 3,
			itemsDesktop: [1199, 3],
			itemsDesktopSmall: [980, 3],
			itemsTablet: [768, 2],
			itemsTabletSmall: [480, 1],
			itemsMobile: [370, 1],
			singleItem: false,
			itemsScaleUp: false,
			slideSpeed: 250,
			paginationSpeed: 250,
			rewindSpeed: 250,
			pagination: false,
			autoPlay: false,
			autoHeight: false,
		});

		$(".next-staff").click(function() {
			owlStaffControls.trigger('owl.next');
			return false;
		});
		$(".prev-staff").click(function() {
			owlStaffControls.trigger('owl.prev');
			return false;
		});

		var owlQuoteSlider = $(".quote-slider");
		owlQuoteSlider.owlCarousel({
			items: 1,
			itemsDesktop: [1199, 1],
			itemsDesktopSmall: [980, 1],
			itemsTablet: [768, 1],
			itemsTabletSmall: [480, 1],
			itemsMobile: [370, 1],
			singleItem: false,
			itemsScaleUp: false,
			slideSpeed: 800,
			paginationSpeed: 300,
			rewindSpeed: 250,
			pagination: false,
			autoPlay: true,
		});

		$(".next-quote").click(function() {
			owlQuoteSlider.trigger('owl.next');
			return false;
		});
		$(".prev-quote").click(function() {
			owlQuoteSlider.trigger('owl.prev');
			return false;
		});

	});

}(jQuery));