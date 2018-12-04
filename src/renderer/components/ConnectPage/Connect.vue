<template>
    <div class='container'>
        <div>
          <label for='url'>
            <h2>connect to redis</h2>
            URL
          </label>
          <input type='text' class='form-control' v-model='url' />
          <a class='uilink' @click="connect">CONNECT</a>
        </div>
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
      client.on('ready', async () => {
        await this.$store.dispatch('setUrl', this.redisURL());
        await this.$store.dispatch('connect', client);
        // this.$router.push('/watch');
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
