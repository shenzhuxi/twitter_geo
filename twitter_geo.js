(function ($) {
  Drupal.behaviors.twitter_geo = {
    attach: function(context, settings) {
      var map = L.map('twitter_geo_map').setView([51.505, -0.09], 13);
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
      }).addTo(map);
      //var marker = L.marker([51.5, -0.09]).addTo(map);
      map.on('dragend', drag);
      //console.log(map);
      function drag(e) {
        center = map.getCenter();
        $('input[name="lat"]').val(center.lat);
        $('input[name="lon"]').val(center.lng);
        console.log(center);
      }
    }
  }
})(jQuery); 

