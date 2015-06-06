/*
 Client IDS
 Defines the CLIENT_ID (AppID's) of the OAuth2 providers
 relative to the domain host where this code is presented.
 */

var FACEBOOK_CLIENT_ID = {
    'localhost': '1477771395811233',
    'buildph.ajsjee.com': '315004078693938',
    'www.ajsjee.com': '1476356425952730',
    'ajsjee.com': '1476356425952730'
}[window.location.hostname];

var GOOGLE_CLIENT_ID = '839194582912-6v1fhkmoc390gdf5gmseo1glkp86qr1o.apps.googleusercontent.com';

var TWITTER_CLIENT_ID = {
    'localhost': 'hLzhSQK0yvd0ZDYc6RPiHlCcg',
    'ajsjee.com': 'NX0FxjlQJLLiOySuNzVvS5NKJ',
    'www.ajsjee.com': 'NX0FxjlQJLLiOySuNzVvS5NKJ',
    'buildph.ajsjee.com': 'n90VzUAREkDwAt5yfWYuhkowW'
}[window.location.hostname];

var LINKEDIN_CLIENT_ID = '757ypc7biergwf';

var YAHOO_CLIENT_ID = {
    'local.ajsjee.com': 'dj0yJmk9eHVNa0s3Z25KM3p0JmQ9WVdrOWJYQlVXSHAyTjJrbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD04Ng--',
    'buildph.ajsjee.com': 'dj0yJmk9Skh3cGk0UlFHRUVHJmQ9WVdrOWVWaGxiV0V4TmpJbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1iYg--',
    'ajsjee.com': 'dj0yJmk9TlRGVkhMSHZ6SWZ4JmQ9WVdrOWNXZzJRWFV3TnpJbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yNw--',
    'www.ajsjee.com': 'dj0yJmk9WGFVcXB0YUZOVkkxJmQ9WVdrOVpIb3hUVnA0TXpnbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1hNw--',
    'ebayanihan.org': 'dj0yJmk9SXRIQ1FJMnFCY1lNJmQ9WVdrOVptbG1XRnBFTnpRbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1kYw--'
}[window.location.hostname];

var CLIENT_IDS_ALL = {
    facebook: FACEBOOK_CLIENT_ID,
    google: GOOGLE_CLIENT_ID,
    twitter: TWITTER_CLIENT_ID,
    linkedin: LINKEDIN_CLIENT_ID,
    yahoo: YAHOO_CLIENT_ID
};

// OAUTH PROXY
// Ubuntu Server
//var OAUTH_PROXY_URL = 'http://5.175.192.105:3002/oauthproxy';

// Heroku Server
//var OAUTH_PROXY_URL = 'http://pacific-citadel-4753.herokuapp.com/oauthproxy';

// Heroku Server Testing
var OAUTH_PROXY_URL = 'https://auth-server.herokuapp.com/proxy';