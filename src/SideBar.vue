<template>
  <div class="side-bar" id="sideBar">
    <h1>Side Bar</h1>
    <ul>
      <li v-for="shooting in shootings">
        {{ shooting.date | DateFilter }}<br>
        {{ shooting.city }}, {{ shooting.state }}<br>
        {{ shootings.summary }}
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
</style>
