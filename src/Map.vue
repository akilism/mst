<template>
  <div>
    <div class="map-holder" id="map"></div>
  </div>
</template>

<script>
import d3 from "d3";

const stateStyle = (feature, data, color) => {
	const stateColor = (data) ? color(data.shootings) : "transparent";
	return (data) ?  { stroke: true,
    color: color(data.shootings),
    weight: 1.5,
    opacity: 1,
    fill: true,
    fillColor: color(data.shootings),
    fillOpacity: 0.35,
    className: "state-feature" } :
    { stroke: false,
	    opacity: 0,
	    fill: false,
	    className: "no-state-feature",
	    pointerEvents: false };
};

const stateFeature = (feature, layer, data) => {
	if (data) {
		layer.bindPopup(`${feature.properties.NAME10}
			Shootings: ${data.shootings}
			Dead: ${data.killed}
			Injured: ${data.injured}`);
	} else {
		layer.bindPopup(feature.properties.NAME10);
	}
};

export default {
	created() {
		this.stateData = this.buildStateData(this.shootings);
	},
	events: {
		"viewShooting": function(shooting) {
			const pos = [shooting.location.lat, shooting.location.lng];
			this.$map.setView(pos, 7);
			L.marker(pos).addTo(this.$map);
		}
	},
  methods: {
    addStates: function(mapEl) {
      window.fetch("/assets/geojson/state.json")
      .then((response) => {
        return response.json();
      })
      .then((states) => {
      	const reds = ["#fee5d9", "#fcbba1", "#fc9272", "#fb6a4a", "#de2d26", "#a50f15"];
      	const oranges = ["#feedde", "#fdd0a2", "#fdae6b", "#fd8d3c", "#e6550d", "#a63603"];
      	const color = d3.scale.threshold()
      		.domain([1, 2, 3, 5, 10, 15])
      		.range(reds);
        const geoLayer = L.geoJson(states, { style: (feature) => {
        	const data = this.stateData[feature.properties.NAME10];
        	return stateStyle(feature, data, color);
        }, onEachFeature: (feature, layer) => {
        	const data = this.stateData[feature.properties.NAME10];
        	return stateFeature(feature, layer, data);
        }});
        const bounds = geoLayer.getBounds();
        geoLayer.addTo(mapEl);
      })
      .catch((err) => {
        console.error(err);
      });
    },
    buildStateData: function(shootings) {
    	return shootings.reduce((acc, shooting, i) => {
    		const state = shooting.state;
    		const killed = shooting.killed;
    		const injured = shooting.injured;

    		if(acc[state]) {
    			acc[state].killed += killed;
    			acc[state].injured += injured;
    			acc[state].shootings++;
    		} else {
    			acc[state] = {};
    			acc[state].killed = killed;
    			acc[state].injured = injured;
    			acc[state].shootings = 1;
    		}

    		return acc;
    	}, {});
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
      $map: null,
      stateData: null
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}

#map { height: 480px; width: 50vw;}

.state-feature:hover {
  fill-opacity: 0.65;
}
</style>
