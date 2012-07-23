(function ($) {
Drupal.behaviors.twitter_geo = {
  'attach': function(context, settings) {
    var data = $(context).data('openlayers');
    if (data) {
      //data.openlayers.zoomTo(1);
      //data.openlayers.setCenter(new OpenLayers.LonLat(0,0),10);
      var layer = new OpenLayers.Layer.Vector("Chrosshairs", {
        displayInLayerSwitcher: 0,
      });
      data.openlayers.addLayer(layer);
      Drupal.behaviors.twitter_geo.refresh(data);

      $('select[name="distance"]').change(function() {
        Drupal.behaviors.twitter_geo.refresh(data);
      });

      data.openlayers.events.register('zoomend', data.map, function() {
        var zoom = data.openlayers.getZoom();
        $('input[name="zoom"]').val(zoom);
      });
      data.openlayers.events.register('moveend', data.map, function() {
        var center = data.openlayers.getCenter();
        center.transform(new OpenLayers.Projection('EPSG:900913'), new OpenLayers.Projection('EPSG:4326'));
        $('input[name="lat"]').val(center.lat);
        $('input[name="lon"]').val(center.lon);
        Drupal.openlayers.redrawVectors();
      });
      data.openlayers.events.register('move', data.map, function() {
        Drupal.behaviors.twitter_geo.refresh(data);
      });
    }
  },
  'refresh': function(data) {
    console.log(data);
    data.openlayers.layers[4].removeAllFeatures();
    center = data.openlayers.getCenter();
    var circle = OpenLayers.Geometry.Polygon.createRegularPolygon(
      new OpenLayers.Geometry.Point(center.lon, center.lat),
      $('select[name="distance"]').val() * 1609.34,
      32
    );
    var attributes = {name: "my name", bar: "foo"};
    var feature = new OpenLayers.Feature.Vector(circle, attributes);

    data.openlayers.layers[4].addFeatures([feature]);

  }
};
})(jQuery); 

