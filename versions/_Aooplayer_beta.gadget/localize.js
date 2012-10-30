$(document).ready(function localize() {
	$('*[localize]').each(function() {
		var localize = $(this).attr('localize');
		if(localize != '') {
			var list = localize.split(',');
			for(var i = 0, c = list.length; i < c; i++) {
				var parts = list[i].split(':');
				if(parts.length == 1) {
					$(this).html(strings[parts[0]]);
				} else {
					$(this).attr(parts[0], strings[parts[1]]);
				}
			}
		}
	});
});