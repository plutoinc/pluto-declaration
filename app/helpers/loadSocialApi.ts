export function loadTwitterApi() {
  (window as any).twttr = (function(d, s, id) {
    var js: any,
      fjs = d.getElementsByTagName(s)[0],
      t = (window as any).twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f: any) {
      t._e.push(f);
    };

    return t;
  })(document, "script", "twitter-wjs");
}

export function loadFacebookApi() {
  (window as any).facebook = (function(d, s, id) {
    var js: any,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
}
