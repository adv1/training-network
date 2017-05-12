$(document).ready(function() {

	var urlGeodata = 'https://api.myjson.com/bins/mgypt';
	var urlNestoria = 'https://api.myjson.com/bins/dnqyp';

	var responseListings = [], imitateNetRequest = [];

	function $getData(url) {
		$.ajax({
			dataType: 'json',
			url: url,
			success:  function(data) {
				parseResponse(data.response);
			},
		});
	};

	function parseResponse(response) {
		responseListings = imitateNetRequest = response.listings;
		render(response.listings);
		if (response.listings.length <= 20) { 
			$('#load-more-button').show().css({margin: '10px'});
		};
	};

	function render(arrayListings) {
		arrayListings.forEach(function(listing, index){
			$('.description-house-room')
				.append('<div class="media" id="'+index+'">' +
				  '<div class="pull-left">' +
				    '<img class="media-object" src="' +listing.thumb_url+ ' " alt="' +listing.keywords+ '">' +
				  '</div>' + 
				  '<div class="media-body">' + 
				    '<h4 class="media-heading">' + listing.price_formatted + ' --- ' +index+ '</h4>' + 
				    '<p>' + listing.title + '</p>' + 
				  '</div>' + 
				'</div>');
		});
		showMoreInfo(arrayListings);
	};

	function showMoreInfo(listingMoreInfo) { 
		$('.media').on('click', function(event) { 
			$('#load-more-button').hide();
			var targetId = event.currentTarget.id;
			$(function() {
				listingMoreInfo.forEach(function(listing, index){
					if (index == targetId) {
						$('.description-house-room').empty()
							.append('<div class="media" id="'+targetId+'">' +
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
					};
				});
			});
			$('#go-back-button').show().css({margin: '10px'});
		});
	};
	
	$('#reset-button').on('click', function() { location.reload() });
	$('#load-button').on('click', function() { 
		$getData(urlNestoria); 
		$('#load-button').hide();
	});
	$('#load-more-button').on('click', function() { 
		$('.description-house-room').empty();
		responseListings = responseListings.concat(imitateNetRequest);
		render(responseListings)
	});

	$('#go-back-button').on('click', function() { 
		$('#go-back-button').hide();
		$('.description-house-room').empty();
		render(responseListings);
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