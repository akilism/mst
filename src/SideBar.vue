<template>
  <div class="side-bar" id="sideBar">
    <ul class="shootings">
      <li class="shooting" v-for="shooting in shootings">
        <div class="shooting-date">{{ shooting.date | DateFilter }}</div>
        <div class="shooting-location">{{ shooting.city }}, {{ shooting.state }}</div>
        <div class="shooting-summary">{{ shooting.summary }}</div>
        <ul class="shooting-stats">
          <li>{{ shooting.killed }} Dead</li>
          <li>{{ shooting.injured }} Injured</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import DateFilter from './filters/DateFilter';

export default {
  data () {
    return {
      msg: 'Hello Vue!'
    }
  },
  filters: { DateFilter },
  props: {
    "shootings": {
      required: true,
      type: Array
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}

.shootings {
  list-style: none;
  padding: 0;
  margin: 0 0 0 20px;
}

.shooting {
  padding: 0 0 15px 0;
  margin: 0 0 30px 0;
  border: 1px solid black;
  border-width: 0 0 1px 0;
}

.shooting-date {
  margin: 0 0 5px 0;
}

.shooting-location {
  margin: 0 0 15px 0;
}

.shooting-summary {
  margin: 0 0 10px 0;
}

.shooting-stats {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
