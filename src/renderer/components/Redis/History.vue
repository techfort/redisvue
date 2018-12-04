<template>
  <div class="container-fluid">
    <div class="row">
      <label><h2>history of [ {{ type }} ]: {{ key }}</h2></label>
    </div>
    <div class="maincontent" id="historylist">
      <div class="row" v-for="e in history" v-bind="e" :key="e.id">
        <div class="col-md-2 evt">{{ e | ts }}</div>
        <div class="col-md-9 fullvalue"><pre>{{ e.value | jsonify }}</pre></div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Event from './Event.vue';
export default {
  name: 'history',
  computed: {
    key() {
      return this.$route.params.key;
    },
    type() {
      return this.$route.params.type.toUpperCase();
    },
    history() {
      try {
        return this.$store.getters[this.type][this.key].history;
      } catch (err) {
        return [];
      }
    },
  },
  filters: {
    ts(e) {
      const date = e.id.replace(`${e.key}:`, '');
      return moment(parseInt(date, 10)).format('YYYY/MM/DD HH:mm:ss');
    },
    jsonify(v) {
      try {
        const o = JSON.parse(v);
        return JSON.stringify(o, null, 2);
      } catch (_err) {
        return v;
      }
    },
  },
  components: {
    Event,
  },
};
</script>
