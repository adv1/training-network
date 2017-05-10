$(document).ready(function() {

	var urlGeodata = 'https://api.myjson.com/bins/mgypt';
	var urlNestoria = 'https://api.myjson.com/bins/dnqyp';

	var dataFromRequest, responseListings, listingInside;

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
		// Responce parsing should be here + check for load more button availability

		responseListings = response.listings;
		responseListings.forEach(function(listing, index) {
			render(listing);
			listingInside = listing;
		});
		moreInfo(listingInside);
		if (responseListings.length <= 20) { 
			$('#load-more-button').show().css({margin: '10px'}) 
		};
	};

	function render(requiredArguments) {
		// DOM manipulations should be here

		$('.description-house-room')
			.append('<div class="media">' +
					  '<div class="pull-left">' +
					    '<img class="media-object" src="' +requiredArguments.thumb_url+ ' " alt="' +requiredArguments.keywords+ '">' +
					  '</div>' + 
					  '<div class="media-body">' + 
					    '<h4 class="media-heading">' + requiredArguments.price_formatted + '</h4>' + 
					    '<p>' + requiredArguments.title + '</p>' + 
					  '</div>' + 
					'</div>');
	};

	function moreInfo(listingArgument) { 
		$('.media').on('click', function() { 
			$('#load-more-button').hide();
			showMoreInfo(listingArgument);
		});
	};

	function showMoreInfo(listingArgumentMoreInfo) { 
		$('.description-house-room')
			.empty()
			.append('<div class="media">' +
					  '<a class="pull-left">' +
					    '<img class="media-object" src="' +listingArgumentMoreInfo.img_url+ ' " alt="' +listingArgumentMoreInfo.keywords+ '">' +
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

		$('#go-back-button').show().css({margin: '10px'});
	};
	
	$('#reset-button').on('click', function() { location.reload() });
	$('#load-button').on('click', function() { $getData(urlNestoria); });
	$('#load-more-button').on('click', function() { $getData(urlNestoria) } );
	$('#go-back-button').on('click', function() { 
		$('#go-back-button, #load-more-button').hide();
		$('.description-house-room').empty();
		parseResponse(dataFromRequest); //parseResponse(dataFromRequest);
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