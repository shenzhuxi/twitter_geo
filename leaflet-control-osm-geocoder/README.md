Leaflet Control OSM Geocoder
=============================

# What is it ?
A simple geocoder that uses the OpenstreetMap gecoder Nominatim to locate places.

# How to use it ?
```javascript
var cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
    cloudmade = new L.TileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {attribution: cloudmadeAttribution});

var map = new L.Map('map').addLayer(cloudmade).setView(new L.LatLng(48.5, 2.5), 15);

var osmGeocoder = new L.Control.OSMGeocoder();

map.addControl(osmGeocoder);
```

# What are the options ?
You can specify an options object as a second argument of L.Control.OSMGeocoder.
```javascript
var options = {
    collapsed: true, /* Whether its collapsed or not */
    position: 'topright', /* The position of the control */
    text: 'Locate', /* The text of the submit button */
    callback: function (results) {
			var bbox = results[0].boundingbox,
				first = new L.LatLng(bbox[0], bbox[2]),
				second = new L.LatLng(bbox[1], bbox[3]),
				bounds = new L.LatLngBounds([first, second]);
			this._map.fitBounds(bounds);
    }
};
```
