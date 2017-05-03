$(document).ready(function() {

	var urlGeodata = 'https://api.myjson.com/bins/mgypt';
	var urlNestoria = 'https://api.myjson.com/bins/dnqyp';
	
	
	$('#loadButton').one('click', function() {
		$.ajax({
			dataType: 'json',
			url: urlNestoria,
			success: function (data) {
				console.log(data);
		
				$.each(data, function(dataKey,dataValue) {
					$.each(dataValue, function(intermedKey,intermedValue) {
						if (typeof intermedValue === 'object') {
							$('.box-task').append('<div id='+ intermedKey + '>' + intermedKey + ' : ' +'</div>');
							$.each(intermedValue, function(lowKey,lowValue) {
								if (typeof lowValue !== 'object') {
									$('#' + intermedKey).append('<div>' + lowKey + ' : ' + lowValue +'</div>').css('background-color', 'red');
								} else $('#' + intermedKey).append('<div class='+ lowKey + '>' + lowKey + ' : ' +'</div>').css('background-color', 'lightblue');
								
								if (typeof lowValue === 'object') {
									$.each(lowValue, function(key, value) {
										$('.' + lowKey).append('<div>' + key + ' : ' + value +'</div>').css({
											'background-color': 'coral',
											border: 'solid black 1px',
											'margin-bottom': '5px',
										});
									
									});
								};
								
							})
						};
						})
				})
			},
    	});
	});
});