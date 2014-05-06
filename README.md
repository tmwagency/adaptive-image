Adaptive Image
==============

Allows you to specify different images for different breakpoints (and resolutions).

## Usage

Add the [adaptive-image.js] to your project.

AdaptiveImage.init(window, true);


### Sample HTML

	<div class="adaptive-image" data-adaptive="" data-adaptive-image-breakpoints="320 480 800" data-alt="Adaptive Test Image" data-img-320="img/less320.jpg" data-img-480="img/less480.jpg" data-img-800="img/less800.jpg" data-img-max="img/max.jpg">
		<noscript>
			<img src="img/max.jpg" width="800" height="800" alt="Adaptive Test Image" title="Adaptive Test Image" />
		</noscript>
	</div>

### Data attributes

	data-adaptive-defer

## Contributors
[Ashley Nolan](https://github.com/ashleynolan) – [@AshNolan_](http://www.twitter.com/AshNolan_)

