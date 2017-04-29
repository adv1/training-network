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
					$('.box-task').append('<div id=' + dataKey + '>' + dataKey + ' : ' + '</div>');
					var intermedValue = dataValue;
					$.each(intermedValue, function(intermedKey,intermedValue) {
						$('.box-task').append('<div>' + intermedKey + ' : ' + intermedValue +'</div>');
					})
				})
			},
    	});
	});
});