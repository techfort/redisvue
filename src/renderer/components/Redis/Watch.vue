<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
              <label for="channel">filter</label> <input class="form-control" type="text" id="channel" v-model="expr" />
              <a @click="reset" class="uilink">clear history</a>
            </div>
            <div class="col">
              <label for="type">type</label> <input type="text" class="form-control" id="type" v-model="type" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-1"><strong>TYPE</strong></div>
            <div class="col-md-3"><strong>KEY</strong></div>
            <div class="col-md-8"><strong>VALUE</strong></div>
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
        .filter(e => e.key.indexOf(this.expr) !== -1 &&
          e.type.toLowerCase().indexOf(this.type.toLowerCase()) !== -1);
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
};
</script>