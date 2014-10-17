$(document).ready(function(){
	if(window.location.hash) {
		// Replace span with hash ...
		$('span').text('Our ' + window.location.hash.substring(1));
		// ... and substitute title
		$('title').text(window.location.hash.substring(1) + ' - ' + $('title').text());
	}
});
