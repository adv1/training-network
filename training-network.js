$(document).ready(function() {

	var urlGeodata = 'https://api.myjson.com/bins/mgypt';
	var urlNestoria = 'https://api.myjson.com/bins/dnqyp';

	var responseListings = [], totalListings = 60;

	function $getData(url) {
		$.ajax({
			dataType: 'json',
			url: url,
			success: function(data) {
				parseResponse(data.response);
				$('#load-button').hide();
			},
		});
	};

	function parseResponse(response) {
		responseListings = responseListings.concat(response.listings);
		// totalListings = response.total_results;
		render(responseListings);
	};

	function render(listings) {
		var $loadMoreButton = $('#load-more-button');
		responseListings.length < totalListings ? $loadMoreButton.show() : $loadMoreButton.hide();

		$('.description-house-room').empty();
		listings.forEach(function(listing, index){
			$('.description-house-room')
				.append('<div class="media" data-id="'+index+'">' +
				  '<div class="pull-left">' +
				    '<img class="media-object" src="' +listing.thumb_url+ ' " alt="' +listing.keywords+ '">' +
				  '</div>' + 
				  '<div class="media-body">' + 
				    '<h4 class="media-heading">' + listing.price_formatted + '</h4>' + 
				    '<p>' + listing.title + '</p>' + 
				  '</div>' + 
				'</div>');
		});
	};

	function tryToShowDetails(e) {
		var $currentTargetId = $(e.target).closest('.media').data('id');
		if ($currentTargetId !== undefined) {
			showListingDetails(responseListings[$currentTargetId]);
		};
	};

	function showListingDetails(listing) { 
		$('#load-more-button').hide();
		$('.description-house-room').empty()
			.append('<div class="media">' +
				'<a class="pull-left">' +
				'<img class="media-object" src="' + listing.img_url + ' " alt="' +listing.keywords+ '">' +
				'</a>' + 
				'<div class="media-body">' + 
				'<h4 class="media-heading">' + listing.price_formatted + '</h4>' + 
				'<p>' + 'Bathroom number: ' + listing.bathroom_number + '</p>' + 
				'<p>' + 'Bedroom number: ' + listing.bedroom_number + '</p>' + 
				'<p>' + 'Car spaces: ' + listing.car_spaces + '</p>' + 
				'<p>' + 'Commission: ' + listing.commission + '</p>' + 
				'<p>' + 'Construction year: ' + listing.construction_year + '</p>' + 
				'<p>' + listing.summary + '</p>' + 
				'</div>' + 
			'</div>');
		$('#go-back-button').show().css({margin: '10px'});
	};
	

	$('#reset-button').on('click', function() { location.reload() });
	$('#load-button').on('click', function() { 
		$getData(urlNestoria);
	});
	$('#load-more-button').on('click', function() { 
		$getData(urlNestoria);
	});
	$('#go-back-button').on('click', function() { 
		$('#go-back-button').hide();
		render(responseListings);
	});
	$('.description-house-room').on('click', tryToShowDetails);
});