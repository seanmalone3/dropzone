var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {
      lat: 35.781,
      lng: -78.645
    }
  });

  // Load GeoJSON.
  map.data.loadGeoJson(
    'https://storage.googleapis.com/mapsdevsite/json/google.json');

  // Color each letter gray. Change the color when the isColorful property
  // is set to true.
  map.data.setStyle(function(feature) {
    var color = 'gray';
    if (feature.getProperty('isColorful')) {
      color = feature.getProperty('color');
    }
    return /** @type {google.maps.Data.StyleOptions} */ ({
      fillColor: color,
      strokeColor: color,
      strokeWeight: 2
    });
  });

  // When the user clicks, set 'isColorful', changing the color of the letters.
  map.data.addListener('click', function(event) {
    event.feature.setProperty('isColorful', true);
  });

  // When the user hovers, tempt them to click by outlining the letters.
  // Call revertStyle() to remove all overrides. This will use the style rules
  // defined in the function passed to setStyle()
  map.data.addListener('mouseover', function(event) {
    map.data.revertStyle();
    map.data.overrideStyle(event.feature, {
      strokeWeight: 8
    });
  });

  map.data.addListener('mouseout', function(event) {
    map.data.revertStyle();
  });
}