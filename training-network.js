$(document).ready(function() {

	var urlGeodata = 'https://api.myjson.com/bins/mgypt';
	var urlNestoria = 'https://api.myjson.com/bins/dnqyp';

	var dataFromRequest, responseListings, listingInside, arrayListings;

	function $getData(url) {
		$.ajax({
			dataType: 'json',
			url: url,
			success:  function(data) {
				dataFromRequest = data.response;
				parseResponse(dataFromRequest);
			},
		});
	};

	function parseResponse(response) {
		responseListings = response.listings;
		arrayListings = responseListings.map(function(value){ return value });
		render(arrayListings);
		if (response.listings.length <= 20 || arrayListings.length <= 20) { 
			$('#load-more-button').show().css({margin: '10px'}) 
		};
	};

	function render(requiredArguments) {
		requiredArguments.forEach(function(listing, index){
			$('.description-house-room')
				.append('<div class="media" id="'+index+'">' +
				  '<div class="pull-left">' +
				    '<img class="media-object" src="' +listing.thumb_url+ ' " alt="' +listing.keywords+ '">' +
				  '</div>' + 
				  '<div class="media-body">' + 
				    '<h4 class="media-heading">' + listing.price_formatted + '</h4>' + 
				    '<p>' + listing.title + '</p>' + 
				  '</div>' + 
				'</div>');
			 listingInside = listing;
		});
		
		if (requiredArguments.length <= 20 || arrayListings.length <= 20) { 
			$('#load-more-button').show().css({margin: '10px'}) 
		};
		showMoreInfo(listingInside);
	};

	function showMoreInfo(listingArgumentMoreInfo) { 
		$('.media').on('click', function(event) { 
			$('#load-more-button').hide();
			$('.description-house-room').empty().prepend($(event.currentTarget))
				.append('<div class="media">' +
							'<a class="pull-left">' +
								'<img class="media-object" src="' + listingArgumentMoreInfo.img_url + ' " alt="' +listingArgumentMoreInfo.keywords+ '">' +
							'</a>' + 
							'<div class="media-body">' + 
								'<h4 class="media-heading">' + listingArgumentMoreInfo.price_formatted + '</h4>' + 
								'<p>' + 'Bathroom number: ' + listingArgumentMoreInfo.bathroom_number + '</p>' + 
								'<p>' + 'Bedroom number: ' + listingArgumentMoreInfo.bedroom_number + '</p>' + 
								'<p>' + 'Car spaces: ' + listingArgumentMoreInfo.car_spaces + '</p>' + 
								'<p>' + 'Commission: ' + listingArgumentMoreInfo.commission + '</p>' + 
								'<p>' + 'Construction year: ' + listingArgumentMoreInfo.construction_year + '</p>' + 
								'<p>' + listingArgumentMoreInfo.summary + '</p>' + 
							'</div>' + 
						'</div>');
			console.log($(event.currentTarget));
			
			$('#go-back-button').show().css({margin: '10px'});
		});
	};
	
	$('#reset-button').on('click', function() { location.reload() });
	$('#load-button').on('click', function() { $getData(urlNestoria); });
	$('#load-more-button').on('click', function() { 
		render(responseListings);
		arrayListings = arrayListings.concat(responseListings);
	});
	$('#go-back-button').on('click', function() { 
		$('#go-back-button').hide();
		$('.description-house-room').empty();
		render(arrayListings);
		$('#load-more-button').show().css({margin: '10px'}) 
	});
});

// при клике на какой-то итем из списка который ты отображаешь, будешь отображать подробную информацию о данном итеме
// на странице подробной информации сделаешь кнопку которая будет вести на предыдущую страницу со списком листингов
// в твоем кейсе это означает
// что по клику на итемы ты рендеришь в контейнер со списком листингов информацию о деталях листинга
// при клике на кнопку goBack ты рендеришь в контейнер с листингами листинги которые у тебя были
// хранить данные будешь скорей всего в своей изолированой глобальной области видимости
// определяемой посредством функции document.ready
// а получать доступ к данным из нужных тебе методов посредством замыканий