<template>
  <div class="info-view" v-if="activeInfo && visible">
    <span @click.prevent="hide()" class="X">X</span>
    <h2>{{ activeInfo.title }}</h2>
    <ul v-if="items.length > 0">
      <li v-for="item in items" class="info-item">
        {{ item.label }}: ${{ item.val }}
        <div class="info-bar" style="width: {{item.scale}}px"></div>
      </li>
    </ul>
  </div>
</template>


<script>
  import d3 from "d3";

  export default {
    computed: {

    },
    data() {
      return {
        enter: null,
        exit: null,
        items: [],
        visible: false
      };
    },
    methods: {
      hide: function() {
        this.visible = false;
      },
      setGraph: function(info) {
        const max = Object.keys(info[info.key]).reduce((acc, key) => {
          const val = info[info.key][key];
          if(!acc) { return val; }
          console.log(acc, val, (acc > val));
          return (acc > val) ? acc : val;
        }, false);
        console.log('max', max);
        const scale = d3.scale.linear().domain([0, max]).range([0, 400]);

        this.items = Object.keys(info[info.key]).map((key) => {
          const val = info[info.key][key];
          return { label: key,
                   val: val.toFixed(2),
                   scale: scale(val) };
        });
      }
    },
    props: {

    },
    ready() {

    },
    watch: {
      "activeInfo": function(newVal, oldVal) {
        this.setGraph(newVal);
        this.visible = true;
      }
    },
    vuex: {
      getters: {
        activeInfo: ({ activeInfo }) => {
          return activeInfo;
        }
      }
    }
  }
</script>


<style>
  .info-view {
    position: fixed;
    top: 10vh;
    left: 10vw;
    padding: 30px;
    border: 1px solid black;
    background-color: white;
    z-index: 1000;
    border-radius: 3px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  }

  .info-view .X {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  .info-view h2 {
    margin-top: 0;
  }

  .info-view ul {
    margin: 0;
    padding: 0;
  }

  .info-item {
    list-style: none;
    text-transform: capitalize;
    line-height: 1.5;
  }

  .info-bar {
    height: 30px;
    background-color: black;
    border-radius: 3px;
    margin-bottom: 30px;
  }
</style>
