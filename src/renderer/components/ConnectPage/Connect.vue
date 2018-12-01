<template>
    <div class='container'>
      <form>
        <div class='control-group'>
          <label for='url'>
            URL
          </label>
          <input type='text' class='form-control' v-model='url' />
          <button class='form-control' @click="connect">CONNECT</button>
        </div>
      </form>
    </div>
</template>
<script>
import redis from 'redis';
import { promisifyAll } from 'bluebird';

const redisAsync = promisifyAll(redis);

export default {
  methods: {
    connect() {
      const client = redisAsync.createClient({
        url: this.redisURL(),
      });
      client.on('ready', () => {
        this.$store.dispatch('setUrl', this.redisURL());
        this.$store.dispatch('connect', client);
      });
      client.on('error', (err) => {
        this.$store.dispatch('disconnect', err);
      });
    },
    redisURL() {
      return `redis://${this.url}`;
    },
  },
  data() {
    return {
      connected: false,
      url: 'localhost:6379',
    };
  },
  created() {
    this.connected = this.$store.getters.CONNECTED;
  },
};
</script>
