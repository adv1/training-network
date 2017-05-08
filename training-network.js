$(document).ready(function() {

	$('#load-more-button').hide();
	var urlGeodata = 'https://api.myjson.com/bins/mgypt';
	var urlNestoria = 'https://api.myjson.com/bins/dnqyp';

	var $getData = function(url) { 
		$.ajax({
			dataType: 'json',
			url: url,
			success: function (data) {
				console.log(data);
				var listing, index;

				data.response.listings.forEach(function(listing, index) {
					$('.description-house-room')
						.append('<div class="media">' +
								  '<div class="pull-left">' +
								    '<img class="media-object" src="' +listing.thumb_url+ ' " alt="' +listing.keywords+ '">' +
								  '</div>' + 
								  '<div class="media-body">' + 
								    '<h4 class="media-heading">' + listing.price_formatted + '</h4>' + 
								    '<p>' + listing.title + '</p>' + 
								  '</div>' + 
								'</div>');
					if (index <= 20) { $('#load-more-button').show().css({margin: '10px'}) }; 
				});
			},
		});
	};
	
	$('#reset-button').on('click', function() { location.reload() });
	$('#load-button').on('click', function() { $getData(urlNestoria) } );
	$('#load-more-button').on('click', function() { $getData(urlNestoria) } );
});