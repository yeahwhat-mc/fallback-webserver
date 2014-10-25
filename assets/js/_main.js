// Function to check URL and redirect if we get 200 status
function checkURL(url) {
  console.log("[INFO] Starting to check connectivity to \"" + url + "\"");
  // Fire test request
  $.ajax({
    type: 'GET',
    url: 'https://yeahwhat-proxy.herokuapp.com/?url=' + url,
    timeout: 1000,
    success: function(data, textStatus, XMLHttpRequest) {
      console.log("[INFO] Site seems available again. Trying to redirect ...");
      location.href = url;
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log("[INFO] Still down. Recheck in 5 seconds ...");
    }
  });
}

// If jQuery is loaded, parse hash to store the subdomain
$(document).ready(function(){
  var subdomain, fulldomain;

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
  setTimeout(function() {
    setInterval(checkURL('http://' + fulldomain), 5 * 1000);
  }, 5 * 1000);
});
