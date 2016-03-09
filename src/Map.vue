<template>
  <div>
    <div class="map-holder" id="map"></div>
  </div>
</template>


<script>
	import d3 from "d3";
	import { setState } from "./state/actions";

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
	  data() {
	    return {
	      $map: null,
	      stateData: null,
        markers: {}
	    }
	  },
		events: {
			"viewShooting": function(shooting, zoom) {
				const pos = [shooting.location.lat, shooting.location.lng];
				const data = this.stateData[shooting.state];
        zoom = zoom || 4;
        this.$map.setView(pos, zoom);

        //only add markers once.
        if(!this.markers[shooting.id]) {
          this.markers[shooting.id] = L.marker(pos).addTo(this.$map);
        }

        this.setState({ ...data, NAME10: shooting.state });
			}
		},
	  methods: {
	    addStates: function(mapEl) {
	      window.fetch("/assets/geojson/state.topo.json")
	      .then((response) => {
	        return response.json();
	      })
	      .then((topoStates) => {
	      	const states = topojson.feature(topoStates, topoStates.objects.state);
	      	const reds = ["#fee5d9", "#fcbba1", "#fc9272", "#fb6a4a", "#de2d26", "#a50f15"];
	      	const oranges = ["#feedde", "#fdd0a2", "#fdae6b", "#fd8d3c", "#e6550d", "#a63603"];
	      	const inputDomain = [1, 2, 3, 5, 10, 15];
	      	const color = d3.scale.threshold().domain(inputDomain).range(reds);
	        const geoLayer = L.geoJson(states, {
	        	style: (feature) => {
	        		const data = this.stateData[feature.properties.NAME10];
	        		return stateStyle(feature, data, color);
	        	},
	        	onEachFeature: (feature, layer) => {
	        		const data = this.stateData[feature.properties.NAME10];
		        	layer.on("mouseover", () => {
								this.setState({ ...feature.properties, ...data });
							});
	        	}
	        });

	        geoLayer.addTo(mapEl);
	      })
	      .catch((err) => {
	        console.error(err);
	      });
	    },
      getRandomDonation: function(count) {
        if(Math.random() > Math.random()) {
          return (Math.random() * count);
        }
        return this.getRandomDonation(++count);
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
	    			acc[state].urbanPct = Math.round(Math.random() * 100);
	    			acc[state].ruralPct = 100 - acc[state].urbanPct;
	    			acc[state].gunLobby = Math.round(Math.random() * 50);
	    			acc[state].gunControl = Math.round(Math.random() * 50);
	    			acc[state].donations = {
	    				state: this.getRandomDonation(100000),
	    				federal: this.getRandomDonation(100000)
	    			};
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
	    this.$map = L.map(this.$el.querySelector("#map")).setView([39.018341, -97.472751], 4);
	    L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
	      attribution: `&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>`,
	      subdomains: "abcd",
	      maxZoom: 19
	    })
	    .addTo(this.$map);

	    this.addStates(this.$map);
	  },
	  vuex: {
	  	actions: { setState }
	  }
	}
</script>


<style>
	#map {
    height: 380px;
    width: 100%;
    box-shadow: 1px 0px 1px rgba(0, 0, 0, 0.35);
  }


	@media only screen and (min-height : 810px) {
    #map {
    	height: 480px;
    }
	}


	.state-feature {
		transition: fill-opacity 150ms;
	}

	.state-feature:hover {
	  fill-opacity: 0.65;
	}
</style>
