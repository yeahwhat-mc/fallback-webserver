var subdomain, fulldomain;

function checkURL(url) {
  $.ajax('http://cors-anywhere.herokuapp.com/' + url, {
    statusCode: {
      404: function() {
        console.log('Not working: ' + url);
      },
      200: function() {
        console.log('Working: ' + url);
      }
    }
  });
}

$(document).ready(function(){
  if(window.location.hash) {
    subdomain = window.location.hash.substring(1);
  } else {
    subdomain = 'www';
  }

  fulldomain = subdomain + '.yeahwh.at';

  if (subdomain != 'www') {
    // Replace span with hash ...
    $('span').text('Our ' + subdomain);
    // ... and substitute title
    $('title').text(subdomain + ' - ' + $('title').text());
  }

  setInterval(checkURL('http://' + fulldomain), 5 * 1000);
});
