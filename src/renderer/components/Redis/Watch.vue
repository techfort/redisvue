<template>
    <div class="container-fluid">
        <div class="header">
          <div class="row">
            <label><h2>watch <span class="numkeys">[{{ entries.length }} keys]</span></h2></label>
          </div>
          <div class="row">
              <div class="col">
                <label for="channel">filter</label> <input class="form-control" type="text" id="channel" v-model="expr" />
              </div>
              <div class="col">
                <label for="type">type</label> <input type="text" class="form-control" id="type" v-model="type" />
              </div>
              <div class="col">
                <a @click="reset" class="uilink">clear history</a>
              </div>
          </div>
          <div class="row">
              <div class="col-md-1"><label>type</label></div>
              <div class="col-md-4"><label>key</label></div>
              <div class="col-md-7"><label>value</label></div>
          </div>
        </div>
        <div class="maincontent" id="watchlist">
          <Event v-for="e in entries" v-bind:event="e" v-bind:key="e.id"/>
        </div>
    </div>
</template>
<script>
import Event from './Event.vue';

export default {
  name: 'Watch',
  components: {
    Event,
  },
  computed: {
    entries() {
      return this.$store.getters.EVENTS
        .filter((e) => {
          if (!e || !e.key) {
            return false;
          }
          if (e.key.indexOf(this.expr) !== -1 &&
          e.type.toLowerCase().indexOf(this.type.toLowerCase()) !== -1) {
            return true;
          }
          return false;
        });
    },
  },
  data() {
    return {
      connected: this.$store.getters.CONNECTED,
      expr: '',
      type: '',
    };
  },
  methods: {
    reset() {
      this.$store.dispatch('reset');
    },
  },
  created() {
    if (!this.$store.getters.CONNECTED) {
      this.$router.push('/');
    }
  },
};
</script>