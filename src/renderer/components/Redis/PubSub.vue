<template>
  <div id="pubsubwrapper" class="contentwrapper">
    <div class="psbody">
      <div class="channelslist">
        <label>FILTER CHANNEL</label><input type="text" v-model="channelfilter" class="form-control" />
        <label>FILTER MESSAGE</label><input type="text" v-model="textfilter" class="form-control" /> 
        <a class="uilink" @click="clear">clear messages</a>
        <div><label>ACTIVE CHANNELS</label></div>
        <ul>
        <li v-for="c in channels" v-bind:key="c" class="channel" @click="subscribe($event)" v-bind:id="c">{{ c }}</li>
        </ul>
      </div>
      <div class="subscribedchannels">
        <div><label>SUBSCRIBE TO CHANNEL</label>
          <label>Channel Name</label>
          <input type="text" v-model="channel" @keyup.enter="subscribeToChannel" class="form-control" /><a class="uilink">subscribe</a>
        </div>
        <div><label>SUBSCRIBED</label></div>
        <ul>
          <li v-for="p in SUBCHANNELS" :key="p" class="channel">
            <div>{{ p }}
              <div><input type="text" placeholder="type+enter to publish" class="form-control" @keyup.enter="publishToChannel($event)" v-bind:id="p" /></div>
              <a href="#" @click="unsubscribe($event)" :id="p">unsubscribe</a>
            </div>
          </li>
        </ul>
      </div>
      <div class="log">
        <label>MESSAGES</label>
        
        <div id="pubsubmessages">
          <div class="pubsubentry" v-for="e in entries" v-bind:key="e.key">
            <div class="pubsubchannelname">{{ e.type }}</div>
            <div class="pubsubmessage">{{ e.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>

li {
  list-style-type: none;
}
.psheader {
  grid-column: span 12;
}
.psbody {
  display: grid;
  grid-column: span 12;
  grid-gap: 10px;
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
import { setInterval } from 'timers';
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
    async clear() {
      await this.$store.dispatch('clearMessages');
    },
    async loadChannels() {
      await this.$store.dispatch('loadChannels');
    },
    async publishToChannel(e) {
      await this.$store.dispatch('publish', {
        channel: e.target.id,
        message: e.target.value,
      });
      e.target.value = '';
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
      this.channel = '';
    },
  },
  created() {
    this.loadChannels();
    setInterval(this.loadChannels, 5000);
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
