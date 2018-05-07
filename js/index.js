'use strict';

/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', '../assets/particlesjs-config.json', function() {
  console.log('callback - particles.js config loaded');
});

let twitter;

OAuth.initialize('DWqzdHVXcBZ2UooaurfWXqMdWUE')
OAuth.popup('twitter').done(function(result) {
    twitter = result;
});

// contains all the endpoints this file will hit
const endpoints = {
  searchUsers : (params) => `https://api.twitter.com/1.1/users/search.json${params}`
}

// generates search result div contents
let generateSearchResults = (results) => {
  // clear old results
  $('#searchresults').html('');

  results.forEach((result) => {
    let resultEl = document.createElement('a');
    let name     = document.createElement('h1');
    let handle   = document.createElement('p');


    handle.innerHTML = `@ ${result.screen_name}`;
    name.innerHTML   = result.name;

    $(resultEl).append(name);
    $(resultEl).append(handle);
    $(resultEl).attr('href', `http://localhost:8080/dashboard.html?id=${result.id}&name=${result.screen_name}`);

    resultEl.classList.add('search-result-item');
    $('#searchresults').append(resultEl);
  });
}

$('#searchbox').keyup((event) => {
  if (event.target.value === '') {
    $('#searchresults').slideToggle();
    generateSearchResults([]);
    return;
  }

  twitter.get(endpoints.searchUsers(`?q=${event.target.value}&count=10`))
         .done((response) => {
           generateSearchResults(response);
            if ($('#searchresults').is(":hidden")) {
              $('#searchresults').slideToggle();
            }
         }).fail((err) => {
           console.log(err);
         });
});
