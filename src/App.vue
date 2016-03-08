<template>
  <div id="app">
  	<img class="hero-image" src="https://vice-images.vice.com/images/articles/crops/2016/02/01/introducing-the-vice-2016-mass-shooting-tracker-1454367077-crop_desktop.jpg?output-quality=75">
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
	  	onShootingClick: function(shooting, zoom) {
	  		this.$broadcast("viewShooting", shooting, zoom);
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
  @font-face {
    font-family: 'TradeGothic-BoldCondTwenty';
    src: url('../assets/fonts/TradeGothic/BoldCondTwenty/TradeGothic-BoldCondTwenty.eot'); /* IE9 Compat Modes */
    src: url('../assets/fonts/TradeGothic/BoldCondTwenty/TradeGothic-BoldCondTwenty.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('../assets/fonts/TradeGothic/BoldCondTwenty/TradeGothic-BoldCondTwenty.woff2') format('woff2'), /* Super Modern Browsers */
         url('../assets/fonts/TradeGothic/BoldCondTwenty/TradeGothic-BoldCondTwenty.woff') format('woff'), /* Pretty Modern Browsers */
         url('../assets/fonts/TradeGothic/BoldCondTwenty/TradeGothic-BoldCondTwenty.ttf')  format('truetype'), /* Safari, Android, iOS */
         url('../assets/fonts/TradeGothic/BoldCondTwenty/TradeGothic-BoldCondTwenty.svg') format('svg'); /* Legacy iOS */
  }

  * {
    box-sizing: border-box;
  }

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
	  flex-wrap: wrap;
	}

	.hero-image {
		display: none;
		margin: 10px auto 30px auto;
	}

	.right {
		width: 48vw;
    flex: 1;
	}

	.left {
		width: 50vw;
    flex: 1;
	}
</style>
