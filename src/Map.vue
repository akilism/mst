<template>
  <div>
    <h1>Map</h1>
    <div class="map-holder" id="map"></div>
  </div>
</template>

<script>
// import states from "../assets/geojson/state.json";

const stateStyle = (feature) => {
  return { stroke: true,
    color: "#000",
    weight: 1.5,
    opacity: 1,
    fill: true,
    fillColor: "#c00",
    fillOpacity: 0.35,
    className: "state-feature" };
};

const stateFeature = (feature, layer) => {
  layer.bindPopup(feature.properties.NAME10);
};

export default {
  methods: {
    addStates: function(mapEl) {
      window.fetch("/assets/geojson/state.json")
      .then((response) => {
        return response.json();
      })
      .then((states) => {
        const geoLayer = L.geoJson(states, { style: stateStyle, onEachFeature: stateFeature});
        const bounds = geoLayer.getBounds();
        geoLayer.addTo(mapEl);
      })
      .catch((err) => {
        console.error(err);
      });
    }
  },
  props: {
    "shootings": {
      required: true,
      type: Array
    }
  },
  ready() {
    this.$map = L.map(this.$el.querySelector("#map")).setView([40.918341, -97.472751], 4);
    L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
      attribution: `&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>`,
      subdomains: "abcd",
      maxZoom: 19
    })
    .addTo(this.$map);

    this.addStates(this.$map);
  },
  data() {
    return {
      $map: null
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}

#map { height: 480px; }

.state-feature:hover {
  fill-opacity: 0.65;
}
</style>
