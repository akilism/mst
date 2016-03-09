<template>
  <div class="side-bar" id="sideBar">
    <ul class="shootings">
      <li class="shooting" v-for="shooting in shootings" @click.prevent="clickHandle(shooting)">
        <h2 class="shooting-date">{{ shooting.date | DateFilter }}</h2>
        <h3 class="shooting-location">{{ shooting.city }}, {{ shooting.state }}</h3>
        <ul class="shooting-stats">
          <li>{{ shooting.killed }} Dead</li>
          <li>{{ shooting.injured }} Injured</li>
        </ul>
        <div class="shooting-summary">{{ shooting.summary }}</div>
      </li>
    </ul>
  </div>
</template>


<script>
	import DateFilter from './filters/DateFilter';
	import { setShooting } from "./state/actions";

	export default {
	  filters: { DateFilter },
	  methods: {
	  	clickHandle: function(shooting) {
	  		this.setShooting(shooting);
	  		this.$dispatch("onShootingClick", shooting);
	  	}
	  },
	  props: {
	    "shootings": {
	      required: true,
	      type: Array
	    }
	  },
	  vuex: {
	  	actions: { setShooting }
	  }
	}
</script>


<style>
	.shootings {
	  list-style: none;
	  margin: 0 -15px 0 0;
	  padding: 0 10px;
	  position: fixed;
	  height: 100vh;
    overflow-y: scroll;
	}

	.shooting {
	  padding: 25px 10px 20px 10px;
	  border: 1px solid #cdcecc;
	  border-width: 0 0 1px 0;
	  cursor: pointer;
	  transition: background-color 250ms;
	}

	.shooting:hover {
		background-color: #cdcecc;
	}

	.shooting-date {
	  margin: 0 0 0 0;
	  // font-size: 13px;
	}

	.shooting-location {
	  margin: 0 0 15px 0;
	}

	.shooting-summary {
	  text-indent: 2rem;
	  margin: 0;
	  font-size: 14px;
	}

	.shooting-stats {
	  list-style: none;
	  margin: 0 0 15px 0;
	  padding: 0;
	}
</style>
