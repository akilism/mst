<template>
  <div id="app">
  	<img class="hero-image" src="https://vice-images.vice.com/images/articles/crops/2016/02/01/introducing-the-vice-2016-mass-shooting-tracker-1454367077-crop_desktop.jpg?resize=*:*&output-quality=75">
	  <div class="left">
	    <map v-bind:shootings="shootings"></map>
	    <state-info v-bind:shootings="shootings"></state-info>
	  </div>
	  <div class="right">
    	<side-bar v-bind:shootings="shootings"></side-bar>
    </div>
  </div>
</template>


<script>
	import Map from "./Map.vue";
	import SideBar from "./SideBar.vue";
	import StateInfo from "./StateInfo.vue";

	import shootingsJson from "../assets/shootings.json";

	export default {
	  components: { Map, SideBar, StateInfo },
	  events: {
	  	onShootingClick: function(shooting) {
	  		this.$broadcast("viewShooting", shooting);
	  	}
	  },
	  data () {
	    return {
	      shootings: shootingsJson.shootings
	    }
	  }
	}
</script>


<style>
	body {
	  font-family: Helvetica, sans-serif;
	  font-size: 14px;
	}

	h1, h2, h3 {
		font-family: 'TradeGothic-BoldCondTwenty', Helvetica, sans-serif;
	}

	#app {
	  display: flex;
	  justify-content: flex-start;
	  align-items: flex-start;
	}

	.hero-image {
		display: none;
	}

	.right {
		 width: 50vw;
	}

	.left {
		 width: 50vw;
	}
</style>
