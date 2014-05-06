/*	Adaptive Image – Responsive Image Method
:	Author: Ashley Nolan – TMW, 2013
:	----------------------------------------
:	Borrows heavily from Scott Jehls picturefill.js
:	https://github.com/scottjehl/picturefill
:
:	It is structured differently in the HTML and slight tweaks to work a bit 'tidier'
:
:
:
:	Function List
:	1. init
:	2. checkAdaptiveElements
:	3. loadImage
:	4. getRelevantBreakpoint
:	5. getPixelRatio
********************************************************/
AdaptiveImage = {
	checkForPixelDensity: false,
	pixelDensity: '',

	init : function(w, px) {

		//set whether we bother setting for retina devices
		this.checkForPixelDensity = px;
		if (this.checkForPixelDensity) {
			this.pixelDensity = this.getPixelRatio();
		}

		// Run on domready (w.load as a fallback)
		if( w.addEventListener ) {
			w.addEventListener( "DOMContentLoaded", function(){
				AdaptiveImage.checkAdaptiveElements();
				// Run once only
				w.removeEventListener( "load", AdaptiveImage.checkAdaptiveElements, false );
			}, false );
			w.addEventListener( "load", AdaptiveImage.checkAdaptiveElements, false );
		}
		else if( document.attachEvent ){
			w.attachEvent( "onload", function () {
				AdaptiveImage.checkAdaptiveElements();
			} );
		}

	},

	//finds all div elements on the page with the adaptive-image data attribute set, or can be passed a subset of div elements to check
	checkAdaptiveElements : function (elements) {

		var ps = elements || window.document.getElementsByTagName( "div" );// list of all div elements on our page

		// Loop through each div which has the data-adaptive attribute and isn't hidden
		for( var i = 0, il = ps.length; i < il; i++ ) {
			if( ps[ i ].getAttribute( "data-adaptive" ) !== null &&
				ps[ i ].style.display !== 'none' &&
				ps[ i ].getAttribute('data-adaptive-defer') === null) {

				this.loadImage( ps[ i ] );
			}
		}
	},

	loadImage : function (element) {

		var selected_breakpoint = this.getRelevantBreakpoint(element);

		//get the image path for the correct breakpoint
		imgPath = element.getAttribute('data-img-' + selected_breakpoint);

		// Find any existing img element in the adaptive element
		var picImg = element.getElementsByTagName( "img" )[ 0 ];

		if( imgPath ){
			if( !picImg ){
				picImg = document.createElement( "img" );
				picImg.alt = element.getAttribute( "data-alt" );
				element.appendChild( picImg );
			}

			//check whether to add pixelDensity into the filename for retina images
			if (this.checkForPixelDensity === true && this.pixelDensity !== '') {
				var imgName = imgPath.substring(0, imgPath.lastIndexOf('.')),
					imgExt = imgPath.substring(imgPath.lastIndexOf('.'), imgPath.length);

				imgPath = imgName + this.pixelDensity + imgExt;
			}

			//and set the imgPath of the image
			picImg.src =  imgPath;
		}
		else if( picImg ){
			element.removeChild( picImg );
		}

		element.setAttribute( "data-adaptive-loaded", true);
	},

	//returns the breakpoint that is relevant to our current width
	getRelevantBreakpoint : function (element) {

		var selected_breakpoint = 'max', // used to store which breakpoint image to load - reset to max
			breakpoints = element.getAttribute("data-adaptive-image-breakpoints"); // stores the specified breakpoints to choose between, defined on the data attribute data-adaptive-image-breakpoints

		//if breakpoints exists
		if (breakpoints) {
			//split the values
			breakpoints = breakpoints.split(' ');

			//and loop through the resulting breakpoint array to find the most appropriate breakpoint to use
			for ( var j = 0, br = breakpoints.length; j < br; j++ ) {
				if (document.documentElement.clientWidth <= Number(breakpoints[j]) &&
					(selected_breakpoint == 'max' || Number(breakpoints[j]) < Number(selected_breakpoint))) {

					selected_breakpoint = breakpoints[j];

				}
			}
		}

		return selected_breakpoint;

	},

	getPixelRatio : function () {

		if (window.devicePixelRatio > 1) {
			return '-2x';
		}
		return '';
	}
}



if (typeof define !== 'undefined' && define.amd) {

	// AMD. Register as an anonymous module.
	define(function() {
		'use strict';
		return AdaptiveImage;
	});
} else if (typeof module !== 'undefined' && module.exports) {
	module.exports = AdaptiveImage.attach;
	module.exports.AdaptiveImage = AdaptiveImage;
} else {
	window.AdaptiveImage = AdaptiveImage;
}