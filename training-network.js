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
								  '<div class="pull-left" href="#">' +
								    '<img class="media-object" src="' +listing.img_url+ ' " alt="' +listing.keywords+ '">' +
								  '</div>' + 
								  '<div class="media-body">' + 
								    '<h4 class="media-heading">' + listing.price_formatted + '</h4>' + 
								    '<p>' + 'Bathroom number: ' + listing.bathroom_number + ', ' + 
								    'Bedroom number: ' + listing.bedroom_number + ', ' + '</p>' + 
								    '<p>' + 'Car spaces: ' + listing.car_spaces + ', ' + '</p>' + 
								    '<p>' + 'Commission: ' + listing.commission + ', ' + 
								    'Construction year: ' + listing.construction_year + ', ' + '</p>' + 
								    '<h3>' + 'Lister name: ' + listing.lister_name + '</h3>' + 
								    '<p>' + listing.summary + '</p>' + 
								  '</div>' + 
								'</div>');
				});
			},
	    });
	})
});