Adaptive Image
==============

Allows you to specify different images for different breakpoints (and resolutions).

Can also be used to simply lazy load images on your page that don't need to be loaded until the rest of your content has been.

## Usage

Add the [adaptive-image.js](https://github.com/tmwagency/adaptive-image/blob/master/js/adaptive-image.js) to your project.

Specify your adaptive images using HTML as shown below, and then call `AdaptiveImage.init(window, true);` to initialise your adaptive images.


### Specifying your adaptive images

	<div class="adaptive-image" data-adaptive="" data-adaptive-image-breakpoints="320 480 800" data-alt="Adaptive Test Image" data-img-320="img/less320.jpg" data-img-480="img/less480.jpg" data-img-800="img/less800.jpg" data-img-max="img/max.jpg">
		<noscript>
			<img src="img/max.jpg" width="800" height="800" alt="Adaptive Test Image" title="Adaptive Test Image" />
		</noscript>
	</div>

All adaptive images must be specified using `div` tags

## Attributes

###`data-adaptive`

Should be set to specify the fact that the container is an adaptive image element

###`data-adaptive-image-breakpoints`

Set with the breakpoint width values you wish to specify images for, in pixels.

###`data-alt`
The alt text for your image – this text is the same across all images

###`data-adaptive-defer`
Stops the image being loaded when the initialise method is called.  Can then be subsequently loaded by calling `AdaptiveImage.loadImage(element)`



## Author
[Ashley Nolan](https://github.com/ashleynolan) – [@AshNolan_](http://www.twitter.com/AshNolan_)

