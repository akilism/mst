<template>
  <div id="app">
    <map v-bind:shootings="shootings"></map>
    <side-bar v-bind:shootings="shootings"></side-bar>
  </div>
</template>


<script>
import Map from "./Map.vue";
import SideBar from "./SideBar.vue";
import shootingsJson from "../assets/shootings.json";

export default {
  components: { Map, SideBar },
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
}
</style>
