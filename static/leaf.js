var mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZmlrYXJjaGFtaWlpaW0iLCJhIjoiY2t0ZnN2cXV3MDAweTJwbXducHNxZHRuaSJ9.8tzHf03xnosiXLVL7G_iRQ'
}).addTo(mymap);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     maxZoom: 18
// }).addTo(mymap);

mapMarkers1 = [];
mapMarkers2 = [];
mapMarkers3 = [];

var source = new EventSource('/topic/plane_data'); //ENTER YOUR TOPICNAME HERE
source.addEventListener('message', function(e) {

    console.log('Message');
    obj = JSON.parse(e.data);
    console.log(obj);

    if (obj.busline == '00001') {
        for (var i = 0; i < mapMarkers1.length; i++) {
            mymap.removeLayer(mapMarkers1[i]);
        }
        marker1 = L.marker([obj.latitude, obj.longitude]).addTo(mymap);
        mapMarkers1.push(marker1);
    }

    if (obj.busline == '00002') {
        for (var i = 0; i < mapMarkers2.length; i++) {
            mymap.removeLayer(mapMarkers2[i]);
        }
        marker2 = L.marker([obj.latitude, obj.longitude]).addTo(mymap);
        mapMarkers2.push(marker2);
    }

    if (obj.busline == '00003') {
        for (var i = 0; i < mapMarkers3.length; i++) {
            mymap.removeLayer(mapMarkers3[i]);
        }
        marker3 = L.marker([obj.latitude, obj.longitude]).addTo(mymap);
        mapMarkers3.push(marker3);
    }
}, false);