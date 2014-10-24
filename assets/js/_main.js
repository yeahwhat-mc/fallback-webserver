var subdomain, fulldomain;



// Function to check URL and redirect if we get 200 status
function checkURL(url) {
  setTimeout(function (){
    // Hide outage information and show spinner
    $('.outageinfo').hide();
    $('.spinner').show();
    // Fire test request
    $.ajax('http://cors-anywhere.herokuapp.com/' + url, {
      type: "HEAD",
      timeout:1000,
      statusCode: {
        // In case of 404, disable spinner and show outage info again
        404: function() {
          $('.spinner').hide();
          $('.outageinfo').show();
        },
        // In case of 200, disable spinner and redirect back to working website
        200: function() {
          $('.spinner').hide();
          location.href = url;
        }
      }
    });
  }, 5 * 1000);
}

// If jQuery is loaded, parse hash to store the subdomain
$(document).ready(function(){
  if(window.location.hash) {
    subdomain = window.location.hash.substring(1);
  } else {
    subdomain = 'www';
  }

  // Generate FQDN
  fulldomain = subdomain + '.yeahwh.at';

  // If subdomain is not "www"
  if (subdomain != 'www') {
    // Replace span with hash ...
    $('span').text('Our ' + subdomain);
    // ... and substitute title
    $('title').text(subdomain + ' - ' + $('title').text());
  }

  // Run checkURL function every 5 seconds
  setInterval(checkURL('http://' + fulldomain), 0);
});
