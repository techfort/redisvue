<template>
  <div id="pubsubwrapper" class="contentwrapper">
    <div class="psheader">
      <div>
          <label>PUBSUB</label>
      </div>
      
    </div>
    <div class="psbody">
      <div class="channelslist">
        <div><label>ACTIVE CHANNELS</label></div>
        <ul>
        <li v-for="c in channels" v-bind:key="c" class="channel" @click="subscribe($event)" v-bind:id="c">{{ c }}</li>
        </ul>
      </div>
      <div class="subscribedchannels">
        <div><label>SUBSCRIBE TO CHANNEL</label>
          <input type="text" v-model="channel" @keyup.enter="subscribeToChannel" class="inputform" /><a class="uilink">subscribe</a>
        </div>
        <div><label>SUBSCRIBED (click to unsubscribe)</label></div>
        <ul>
          <li v-for="p in SUBCHANNELS" :key="p" class="channel" @click="unsubscribe($event)" :id="p">{{ p }}</li>
        </ul>
      </div>
      <div class="log">
        <label>MESSAGES</label>
        Filter channel: <input type="text" v-model="channelfilter" class="inputform" /> Filter message: <input type="text" v-model="textfilter" class="inputform" /> 
        <div id="pubsubmessages">
          <div class="pubsubentry" v-for="e in entries" v-bind:key="e.key">
            <div class="pubsubchannelname">{{ e.type }}</div>
            <div class="pubsubmessage">{{ e.value }}</div>
          </div>
        </div>
        <!--
        <Event v-for="e in entries" v-bind:event="e" v-bind:key="e.key"/>
        -->
      </div>
    </div>
  </div>
</template>
<style>
#pubsubwrapper {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 200px, auto; 
}
#pubsubmessages {
  display:grid;
  grid-template-rows: repeat(50, 1fr);
}
.pubsubentry {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row: span 1;
}
.pubsubchannelname {
  grid-column: span 1;
}
.pubsubmessage {
  grid-column: span 2;
}



.psheader {
  grid-column: span 12;
}
.psbody {
  display: grid;
  grid-column: span 12;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto;
  overflow: auto;
  padding-bottom: 60px;
}
.channel {
  cursor: pointer;
}
.subscribedchannels {
  grid-column: span 1;
}
.channelslist {
  grid-column: span 1;
}
.log {
  grid-row: span 1;
  height: 85vh;
  grid-column: span 4;
}
</style>
<script>
import { mapGetters } from 'vuex';
import Event from './Event.vue';

export default {
  name: 'PubSub',
  components: {
    Event,
  },
  data() {
    return {
      channel: '',
      channelfilter: '',
      textfilter: '',
    };
  },
  methods: {
    async loadChannels() {
      await this.$store.dispatch('loadChannels');
    },
    async subscribe(e) {
      const channel = e.target.id;
      if (!channel || channel === '') {
        await this.$store.dispatch('logError', `channel is ${channel}`);
        return;
      }
      await this.$store.dispatch('subscribe', channel);
    },
    async unsubscribe(e) {
      await this.$store.dispatch('unsubscribe', e.target.id);
    },
    async subscribeToChannel() {
      await this.$store.dispatch('subscribe', this.channel);
    },
  },
  created() {
    console.log('Loading channels');
    this.loadChannels();
  },
  computed: {
    ...mapGetters([
      'MESSAGES',
      'CHANNELS',
      'SUBCHANNELS',
    ]),
    channels() {
      return this.$store.getters.CHANNELS.filter(e => e !== '');
    },
    entries() {
      let messages = Array.from(this.$store.getters.PUBSUB);
      if (this.channelfilter !== '') {
        messages = messages.filter(m => m.type.indexOf(this.channelfilter) !== -1);
      }
      if (this.textfilter !== '') {
        console.log('Filtering by text');
        messages = messages.filter(m => m.value.indexOf(this.textfilter) !== -1);
      }
      return messages.slice(0, 100);
    },
  },
};
</script>
