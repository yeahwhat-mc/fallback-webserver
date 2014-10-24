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
        return 302 $scheme://fallback.yeahwh.at/maintenance/forums;
    }
}
```

The rest of the magic happens via JavaScript in the actual maintenance page. Checkout [`assets/js/_main.js`](assets/js/_main.js).

### Requirements

* Nginx (as web server)
* Installed `npm` and `grunt`: `npm install -g grunt-cli`

### Installation

1. Clone the repository: `git clone https://github.com/yeahwhat-mc/gh-pages`
2. Install all dependencies: `npm install`
3. Install web libraries: `bower install`
4. Run grunt task: `grunt`
5. Thats it. Open the `index.html`!

PS: Use `make` to push to GitHub, since you want to keep the gh-pages and master branch in sync! 

### Dependencies

* NodeJS (`npm`)
* Bower
* Grunt

## Version

1.0.0

## License

[WTFPL](LICENSE)
