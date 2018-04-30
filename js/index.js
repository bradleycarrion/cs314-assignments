'use strict';

const twitterAPIRequestHeader = 'authorization: OAuth oauth_consumer_key=\"consumer-key-for-app\",
  oauth_nonce=\"generated-nonce\", oauth_signature=\"generated-signature\",
  oauth_signature_method=\"HMAC-SHA1\", oauth_timestamp=\"generated-timestamp\",
  oauth_token="access-token-for-authed-user", oauth_version=\"1.0\"'

// contains all the endpoints this file will hit
const endpoints = {
  searchUsers : (params) => `https://www.twitter.com/users/search${params}`
}

const apiToolkit = {
  // endpoint , success callback, failed callback, body
  get : (endpoint, sc, fc, body) => $.get(endpoint, body)
                                     .done(sc(data)).fail(fc(data))
}

$('#searchbox').keypress((event) => {
  apiToolkit.get(endpoints.searchUsers(`/q=${event.target.value}`), (data) => {
    console.log(data);
  })
});
