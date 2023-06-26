+++
title = "it's been a while..."
date = 2023-06-23
description = "just a little update on what i've been doing for the past 3 months"

[taxonomies]
tags = ["meta", "update"]
+++

## hello again!
hi! the lack of posts here has mostly been from a, being in college and b, not having any ideas of what to blog about. there's just that small part in my brain that makes me think that i *need* "real" content to post like how to setup some nginx thing, how to optimize this one specific problem, etc. i've also just been busy with life stuff, finals happened and i've moved back to the suburbs; i hate it by the way thanks for asking.

## another new theme?
yeah, i liked the old one but i honestly just wanted to copy [Xe Iaso's blog](https://https://xeiaso.net/) because i really like how it looks ~~and they look really cool~~. as a benefit, i know a lot more about optimization and website things now because of this, for example, the home page has a webp instead of a gif because it provides a ~40% speedup! i also learned that http compression was a thing and i prompty turned that on in my `nginx.conf` with
```conf
gzip on;
gzip_vary on;
gzip_min_length 10240;
gzip_proxied expired no-cache no-store private auth;
gzip_types
    application/atom+xml
    application/geo+json
    application/javascript
    application/x-javascript
    application/json
    application/ld+json
    application/manifest+json
    application/rdf+xml
    application/rss+xml
    application/xhtml+xml
    application/xml
    font/eot
    font/otf
    font/ttf
    image/svg+xml
    text/css
    text/javascript
    text/plain
    text/xml;
gzip_disable "MSIE [1-6]\.";
```
  
## what about those projects?
yeaah no those are never getting completed. [tehda](https://github.com/nyadiia/tehda) was close to being something really good except someone else had the same idea and did it way before [autumn](https://autumns.page) and i. that program is called [anyrun](https://github.com/Kirottu/anyrun) and it does everything we were doing with more modularity and completness.  
  
i also don't think i'll ever get around to finishing, hell, starting [minne](https://github.com/nyadiia/minne) because i just don't really have a need for a non-cross platform todo application. plus, i just don't use it and i don't want to make something that i wouldn't use. i also suffer from this thing called a "skill issue" and i'm not persistent enough to learn how to use [tui-rs](https://docs.rs/crate/tui/latest), it's probably well written but i come from a background of not enough CS learning in high school so i'm still behind on Rust and other similar programming languages.

## miku??
oh yeah i figured out how to do websites on other ports. it's on [https://mikufan.page:39](https://mikufan.page:39). i did it adding this in my nginx configs
```conf
server {
    server_name mikufan.page;
    root /var/www/miku;

    index index.html;

    location / {
        # First attempt to serve request as file, then
        # as directory, then fall back to displaying a 404.
        try_files $uri $uri/ =404;
    }

    listen [::]:39 http2 ssl; # managed by Certbot
    listen 39 http2 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/mikufan.page/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/mikufan.page/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}
```
it felt really relieving to finally get that working.  
  
i do want to rework that site to use [Zola](https://getzola.org) and to organize the ascii art in a grid, like how [Tumblr](https://tumblr.com) does it. i also want to have some no-reply email or form or something so that you all can add some (you better not upload that one nsfw among us picture istg).  
  
see you all in like 3 months when i post something else about how great the cities are because i will have moved back in by then.  
  
:3