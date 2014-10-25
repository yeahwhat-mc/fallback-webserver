fallback-webserver
==================

This repository contains some static pages hosted on GitHub pages which are used as fallback in case of issues or maintenace of our Nginx.

### Example Nginx virtual host

In the example below, you can find the productive virtual host for our **Discourse** forums which can [be found here](http://forums.yeahwh.at). In case of 502 HTTP status code, we assume the Docker instance is currently getting rebuilded (because of a new version/update) so the Nginx proxy can't reach the actual Discourse upstream and shows the default error page. I rather want a pretty and informative maintenance page so my visitors know whats going on and why they currently can't use the forums.

Because I'm lazy I wanted to automate this workflow and "not switching" virtual hosts manually on each update. I found a possibilty to use a fallback upstream/location, so here's the tiny and easy configuration:    

```
server {
    server_name  forums.yeahwh.at;

    access_log  /var/log/nginx/forums.yeahwh.at.access.log;

    proxy_set_header X-Forwarded-For $remote_addr;

    # Primary location
    location / {
        # Pass to Docker
        proxy_pass http://127.0.0.1:8090;
        proxy_redirect default;
        # Assume maintenance in case of 502 error, pass to fallback upstream
        error_page 502 = @fallback;
        proxy_intercept_errors on;
    }

    # Fallback location
    location @fallback {
        # Redirect with 302 (temporary redirect) to maintenance page hosted on GitHub pages
        return 302 $scheme://fallback.yeahwh.at/#forums;
    }
}
```

The rest of the magic happens via JavaScript in the actual maintenance page. Checkout [`assets/js/_main.js`](assets/js/_main.js). As soon you visit the fallback page, it trys to connect to the referring site (subdomain gets passed via URL hash) every 10 seconds to check if its already online again (HTTP status == 200). If so, you'll get redirected to the site which was actually in maintenance. If not, it will start to check again in the background.

### Requirements

* Nginx (as web server)
* Installed `npm` and `grunt`: `npm install -g grunt-cli`

### Installation

1. Set up a proxy on Heroku to parse status codes:  
  https://github.com/yeahwhat-mc/heroku-php-status-proxy
2. Fork and clone the repository:  
  `git clone https://github.com/<username>/fallback-webserver`
3. Adjust the `CNAME` file if you want to use a custom domain for your fallback, otherwise remove it
4. Change the maintenance page as you wish
5. Push to GitHub and sync master branch with gh-pages:  
  `make`
5. Thats it. Open your fallback webserver using GitHub's (http://<username>.github.io/fallback-webserver) or your custom domain! 

### Development

1. Install all dependencies:  
  `npm install`
2. Install web libraries:  
  `bower install`
3. Run grunt task:  
  `grunt dev`

### Dependencies

* NodeJS (`npm`)
* Bower
* Grunt

## Version

1.0.0

## License

[WTFPL](LICENSE)
