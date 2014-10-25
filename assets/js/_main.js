var startupdelay = 5;
var timeout = 10;
var repeatinterval = 10;

// Function to check URL and redirect if we get 200 status
function checkURL(url) {
  console.log("[INFO] Starting to check connectivity to \"" + url + "\"");
  // Fire test request
  $.ajax('https://yeahwhat-proxy.herokuapp.com/?url=' + url, {
    type: "HEAD",
    timeout: timeout * 1000,
    // In case of 404, disable spinner and show outage info again
    error: function() {
      console.log("[INFO] Still down. Recheck in " + repeatinterval + " seconds ...");
    },
    // In case of 200, disable spinner and redirect back to working website
    success: function() {
      console.log("[INFO] Site seems available again. Trying to redirect ...");
      location.href = url;
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

  // Delay first execution, then run checkURL function every repeatinterval seconds
  setTimeout(function() {
    setInterval(function() {
      checkURL('http://' + fulldomain);
    }, repeatinterval * 1000);
  }, startupdelay * 1000);
});
