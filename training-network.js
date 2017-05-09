$(document).ready(function() {

	var urlGeodata = 'https://api.myjson.com/bins/mgypt';
	var urlNestoria = 'https://api.myjson.com/bins/dnqyp';

	var dataFromUrl, dataFromRequest, responseInfo, responseListings, indexListings;

	function $getData(url) {
		$.ajax({
			dataType: 'json',
			url: url,
			success:  function(dataFromUrl) {
				dataFromRequest = dataFromUrl;
				Listing(dataFromRequest);
			},
		});
	};

	function Listing(argument) {
		// your request should be here

		responseInfo = argument.response;
		parseResponse(responseInfo);
	};

	function parseResponse(response) {
		// Responce parsing should be here + check for load more button availability
		
		response.listings.forEach(function(listing, index) {
			responseListings = listing;
			indexListings = index;
			render(responseListings);
		});
		if ((indexListings+1) <= 20) { 
			$('#load-more-button').show().css({margin: '10px'}) 
		};
	};

	function render(requiredArguments) {
		// DOM manipulations should be here
		var listingInside = requiredArguments;

		$('.description-house-room')
			.append('<div class="media">' +
					  '<div class="pull-left">' +
					    '<img class="media-object" src="' +listingInside.thumb_url+ ' " alt="' +listingInside.keywords+ '">' +
					  '</div>' + 
					  '<div class="media-body">' + 
					    '<h4 class="media-heading">' + listingInside.price_formatted + '</h4>' + 
					    '<p>' + listingInside.title + '</p>' + 
					  '</div>' + 
					'</div>');
		$('.media').on('click', function() { 
			$('#load-more-button').hide();
			showMoreInfo(listingInside);
		});	
	};

	function showMoreInfo(listingArgument) { 

		$('.description-house-room')
			.empty()
			.append('<div class="media">' +
					  '<a class="pull-left">' +
					    '<img class="media-object" src="' +listingArgument.img_url+ ' " alt="' +listingArgument.keywords+ '">' +
					  '</a>' + 
					  '<div class="media-body">' + 
					    '<h4 class="media-heading">' + listingArgument.price_formatted + '</h4>' + 
					    '<p>' + 'Bathroom number: ' + listingArgument.bathroom_number + '</p>' + 
					    '<p>' + 'Bedroom number: ' + listingArgument.bedroom_number + '</p>' + 
					    '<p>' + 'Car spaces: ' + listingArgument.car_spaces + '</p>' + 
					    '<p>' + 'Commission: ' + listingArgument.commission + '</p>' + 
					    '<p>' + 'Construction year: ' + listingArgument.construction_year + '</p>' + 
					    '<p>' + listingArgument.summary + '</p>' + 
					  '</div>' + 
					'</div>');

		$('#go-back-button').show().css({margin: '10px'});
	};
	
	$('#reset-button').on('click', function() { location.reload() });
	$('#load-button').on('click', function() { $getData(urlNestoria); });
	$('#load-more-button').on('click', function() { $getData(urlNestoria) } );
	$('#go-back-button').on('click', function() { 
		$('#go-back-button, #load-more-button').hide();
		$('.description-house-room').empty();
		$getData(urlNestoria);
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