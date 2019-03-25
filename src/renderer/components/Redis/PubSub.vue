<template>
  <div id="pubsubwrapper">
    <div class="psheader">
      <div class="container-fluid">
          <label>SUBSCRIBE</label>
      </div>
      <div class="col">
        <label for="command">command</label><input type="text" class="form-control" @keyup.enter="doSubscribe" id="channel" v-model="channel" />
      </div>
      <div class="container-fluid">
        <a @click="doSubscribe" class="uilink">SUBSCRIBE</a>
         <a @click="doUnubscribe" class="uilink">UNSUBSCRIBE</a>
      </div>
    </div>
    <div class="psbody">
      <Event v-for="e in entries" v-bind:event="e" v-bind:key="e.key"/>
    </div>
  </div>
</template>
<style>
#pubsubwrapper {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 200px, auto; 
}
.psheader {
  grid-column: span 12;
}
.psbody {
  grid-column: span 12;
  overflow: auto;
  height: 80vh;
  padding-bottom: 60px;
}
</style>
<script>
import Event from './Event.vue';

export default {
  name: 'PubSub',
  components: {
    Event,
  },
  data() {
    return {
      channel: '',
    };
  },
  methods: {
    async doSubscribe() {
      console.log(`CHANNEL: ${this.channel}`);
      this.$store.dispatch('subscribe', this.channel);
    },
    async doUnubscribe() {
      this.$store.dispatch('unsubscribe', this.channel);
    },
  },
  computed: {
    entries() {
      return this.$store.getters.PUBSUB;
    },
  },
};
</script>
