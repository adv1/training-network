$(document).ready(function() {

	var urlGeodata = 'https://api.myjson.com/bins/mgypt';
	var urlNestoria = 'https://api.myjson.com/bins/dnqyp';
	
	$('#reset-button').on('click', function() { 
		location.reload()
	});
	$('#load-button').on('click', function() { 
		$.ajax({
			dataType: 'json',
			url: urlNestoria,
			success: function (data) {
				console.log(data);

				data.response.listings.forEach(function(listing, index) {
					$('.description-house-room')
						.append('<div class="media">' +
								  '<div class="pull-left">' +
								    '<img class="media-object" src="' +listing.thumb_url+ ' " alt="' +listing.keywords+ '">' +
								  '</div>' + 
								  '<div class="media-body">' + 
								    '<h4 class="media-heading">' + listing.price_formatted + '</h4>' + 
								    '<h4>' + listing.title + '</h4>' + 
								  '</div>' + 
								'</div>');
				});
			},
	    });
	})
});