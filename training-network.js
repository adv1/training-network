$(document).ready(function() {

	var urlGeodata = 'https://api.myjson.com/bins/mgypt';
	var urlNestoria = 'https://api.myjson.com/bins/dnqyp';
	
	$('#reset-button').on('click', function() { 
		location.reload()
	})
	$.ajax({
		dataType: 'json',
		url: urlNestoria,
		success: function (data) {
			console.log(data);

			$('#load-button').one('click', function() { 
				var keyInData, valueInData, 
				keyInResponse, valueInResponse, 
				keyInListings, valueInListings, 
				houseInfoKey, houseInfoValue,
				houseInfo_img_url, houseInfo_img_height, houseInfo_img_width,
				houseInfo_bathroom_number, houseInfo_bedroom_number, houseInfo_car_spaces, 
				houseInfo_commission, houseInfo_construction_year, houseInfo_keywords, 
				houseInfo_price, houseInfo_price_currency, houseInfo_price_formatted,
				houseInfo_lister_name;
				
				Object.keys(data).forEach(function(keyInData) {
					valueInData = data[keyInData];
					if (keyInData === 'response') {
						$('.description-house-room').append('<div class=' + keyInData + '>' + '</div>');
						Object.keys(valueInData).forEach(function(keyInResponse) {
							valueInResponse = valueInData[keyInResponse];
							if (keyInResponse === 'listings') {
								$('.' + keyInData).append('<div class=' + keyInResponse + '>' + '</div>')
								Object.keys(valueInResponse).forEach(function(keyInListings) {
									valueInListings = valueInResponse[keyInListings];
									Object.keys(valueInListings).forEach(function(houseInfoKey){
										houseInfoValue = valueInListings[houseInfoKey];
										if(houseInfoKey === 'img_url'){
											houseInfo_img_url = houseInfoValue;
										};
											if (houseInfoKey === 'img_height') {
												houseInfo_img_height = houseInfoValue;
											};
												if (houseInfoKey === 'img_width') {
													houseInfo_img_width = houseInfoValue;
												};
													if (houseInfoKey === 'bathroom_number') {
														houseInfo_bathroom_number = houseInfoValue;
													};
														if (houseInfoKey === 'bedroom_number') {
															houseInfo_bedroom_number = houseInfoValue || '-';
														};
															if (houseInfoKey === 'car_spaces') {
																houseInfo_car_spaces = houseInfoValue;
															};
																if (houseInfoKey === 'commission') {
																	houseInfo_commission = houseInfoValue;
																};
																	if (houseInfoKey === 'construction_year') {
																		houseInfo_construction_year = houseInfoValue;
																	};
																		if (houseInfoKey === 'keywords') {
																			houseInfo_keywords = houseInfoValue;
																		};
																			if (houseInfoKey === 'price_formatted') {
																				houseInfo_price_formatted = houseInfoValue;
																			};
																				if (houseInfoKey === 'lister_name') {
																					houseInfo_lister_name = houseInfoValue;
																				};
									});

									$('.' + keyInResponse).append('<div class=in-listing' + keyInListings + '>' + '</div>');
									$('.in-listing' + keyInListings).append('<div class="thumbnail">' + 
										'<div class="img">' + 
										'<img src="' + houseInfo_img_url +'" alt="'+houseInfo_keywords+'" class="img-thumbnail" style="width:'+houseInfo_img_width+';height:" '+houseInfo_img_height+'";>' + 
										'</div>' + 
										'<div class="caption">' + 
										'<h3>' + 'price : ' + houseInfo_price_formatted + '</h3>' + 
										'<h4>' + 'Lister Name : ' + houseInfo_lister_name + '</h4>' + 
										'<p>' + 'Bathroom number : ' + houseInfo_bathroom_number + '</p>' + 
										'<p>' + 'Bedroom number : ' + houseInfo_bedroom_number + '</p>' + 
										'<p>' + 'Car Spaces : ' + houseInfo_car_spaces + '</p>' + 
										'<p>' + 'Commission : ' + houseInfo_commission + '</p>' + 
										'<p>' + 'Construction year : ' + houseInfo_construction_year + '</p>' + 
										'</div>' +
									 '</div>');
								});
							};
						});
					};	
				});
			})
		},
    });
});

// keys in list to display
//datasource_name,
//latitude,
//lister_name,
//lister_url,listing_type,location_accuracy,longitude,
//price,price_currency,price_formatted,price_high,price_low,price_type,
//property_type,size,size_type,summary,thumb_height,thumb_url,thumb_width,title,updated_in_days,
//updated_in_days_formatted