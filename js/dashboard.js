'use strict';

const mapsKey = "AIzaSyBGknL0dqalbRZLBJs5U2Vaf0QnLe_Mv08";

particlesJS.load('particles-js', '../assets/particlesjs-config.json');

let oauthComplete = (twitter) => {
  // get the user_id from the path
  let user_id = getAllUrlParams(window.location.href).id;
  let user_name = getAllUrlParams(window.location.href).name;

  $('#dashboard').html(`${user_name}'s Dashboard`)

  let nextCursor = -1;

  // get the first 5 batches
  for (let i = 0; i < 5; i++) {
    twitter.get(endpoints.getFollowers(`?user_id=${user_id}&cursor=${nextCursor}`))
           .done((response) => {
             // increment cursor
             nextCursor = response.next_cursor;

             response.users.forEach((follower) => {
               if (follower.location.length <= 4) return;  // arbitrary length
               $.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${follower.location}&key=AIzaSyBGknL0dqalbRZLBJs5U2Vaf0QnLe_Mv08`).done((data) => {
                 let pos = data.results[0].geometry.location;

                 var contentString = `Name: ${follower.name} <br> @${follower.screen_name}`;

                 var infowindow = new google.maps.InfoWindow({
                   content: contentString
                 });

                 let marker = new google.maps.Marker({
                   position: pos,
                   map: map,
                   label: follower.user_name,
                   animation: google.maps.Animation.DROP
                 });

                 marker.addListener('click', function() {
                   infowindow.open(map, marker);
                 });
               });
             });
           }).fail((err) => {
             console.log(err);
           });
    }
}

OAuth.initialize('DWqzdHVXcBZ2UooaurfWXqMdWUE')
OAuth.popup('twitter').done(function(result) {
    oauthComplete(result);
}).fail((err) => {
    alert(err);
});

// contains all the endpoints this file will hit
const endpoints = {
  searchUsers  : (params) => `https://api.twitter.com/1.1/users/search.json${params}`,
  getFollowers : (params) => `https://api.twitter.com/1.1/followers/list.json${params}`,
}

function getAllUrlParams(url) {

 // get query string from url (optional) or window
 var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

 // we'll store the parameters here
 var obj = {};

 // if query string exists
 if (queryString) {

   // stuff after # is not part of query string, so get rid of it
   queryString = queryString.split('#')[0];

   // split our query string into its component parts
   var arr = queryString.split('&');

   for (var i=0; i<arr.length; i++) {
     // separate the keys and the values
     var a = arr[i].split('=');

     // in case params look like: list[]=thing1&list[]=thing2
     var paramNum = undefined;
     var paramName = a[0].replace(/\[\d*\]/, function(v) {
       paramNum = v.slice(1,-1);
       return '';
     });

     // set parameter value (use 'true' if empty)
     var paramValue = typeof(a[1])==='undefined' ? true : a[1];

     // (optional) keep case consistent
     paramName = paramName.toLowerCase();
     paramValue = paramValue.toLowerCase();

     // if parameter name already exists
     if (obj[paramName]) {
       // convert value to array (if still string)
       if (typeof obj[paramName] === 'string') {
         obj[paramName] = [obj[paramName]];
       }
       // if no array index number specified...
       if (typeof paramNum === 'undefined') {
         // put the value on the end of the array
         obj[paramName].push(paramValue);
       }
       // if array index number specified...
       else {
         // put the value at that index number
         obj[paramName][paramNum] = paramValue;
       }
     }
     // if param name doesn't exist yet, set it
     else {
       obj[paramName] = paramValue;
     }
   }
 }

 return obj;
}

function getCircle() {
  return {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: 'rgba(0, 158, 250, 1.0)',
    fillOpacity: 0.5,
    scale: 7,
    strokeColor: 'rgba(0, 158, 250, 1.0)',
    strokeWeight: .5
  };
}

// Global map variable to be able to add markers from other places
let map;

/**
    Google Maps Initialization
*/
function initMap() {
  var usa = {lat: 37.0902, lng: -95.7129};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    styles: [
              {
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#f5f5f5"
                  }
                ]
              },
              {
                "elementType": "labels",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "elementType": "labels.icon",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#616161"
                  }
                ]
              },
              {
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#f5f5f5"
                  }
                ]
              },
              {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#bdbdbd"
                  }
                ]
              },
              {
                "featureType": "administrative.neighborhood",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#eeeeee"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#757575"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#e5e5e5"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#9e9e9e"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#ffffff"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#757575"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#dadada"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#616161"
                  }
                ]
              },
              {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#9e9e9e"
                  }
                ]
              },
              {
                "featureType": "transit",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#e5e5e5"
                  }
                ]
              },
              {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#eeeeee"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#c9c9c9"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#9e9e9e"
                  }
                ]
              }
            ],
    center: usa
  });
}
