(function ($) {
  Drupal.behaviors.twitter_geo = {
    attach: function(context, settings) {
      var map = L.map('twitter_geo_map', {
        //center: [51.505, -0.09],
        minZoom: 1,
      });
      map.setView([$('input[name="lat"]').val(), $('input[name="lon"]').val()], $('input[name="zoom"]').val());
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
      }).addTo(map);
      var marker = L.marker(map.getCenter()).addTo(map);
      
      var circle = L.circle(map.getCenter(), $('select[name="distance"]').val() * 1609.34, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
      }).addTo(map);

      var bingGeocoder = new L.Control.BingGeocoder('ArSsBzViQeHdmrTqsbmxQ6vrhsEStGnR6tmGjO7l8mOJsxFxDqJm5qu2cCep2vCR', {collapsed: false});
      map.addControl(bingGeocoder);

      refresh();
      //map.on('drag', drag);
      map.on('move', refresh);
      map.on('moveend', refresh);
      //map.on('zoomend', refresh);

      $('select[name="distance"]').change(function() {
        refresh();
      });

      function refresh() {
        center = map.getCenter();
        $('input[name="lat"]').val(center.lat);
        $('input[name="lon"]').val(center.lng);
        $('input[name="zoom"]').val(map.getZoom());
        circle.setLatLng(map.getCenter());
        circle.setRadius($('select[name="distance"]').val() * 1609.34);
      }
    }
  }
})(jQuery); 

