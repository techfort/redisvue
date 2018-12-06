<template>
    <div class='container'>
        <div>
          <h2>connect to redis</h2>
          <label for='url'>URL</label>
          <input type='text' class='form-control' v-model='url' />
          <label>Pattern</label>
          <input type="text" class="form-control" v-model="pattern" />
          <label>Database</label>
          <input type="number" class="form-control" v-model="db" />
          <a class='uilink' @click="connect">CONNECT</a>
        </div>
        <div class="errorMessage" v-show="errorMessage">{{ errorMessage }}</div>
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
        await this.$store.dispatch('setPattern', this.pattern);
        await this.$store.dispatch('setDb', this.db);
        await this.$store.dispatch('setErrorMessage', null);
        await this.$store.dispatch('connect', client);
        // this.$router.push('/watch');
      });
      client.on('error', (err) => {
        this.$store.dispatch('setErrorMessage', err);
        this.$store.dispatch('disconnect', err);
      });
    },
    redisURL() {
      return `redis://${this.url}`;
    },
  },
  computed: {
    errorMessage() {
      return this.$store.getters.ERROR_MSG;
    },
  },
  data() {
    return {
      connected: false,
      url: 'localhost:6379',
      pattern: '*',
      db: 0,
    };
  },
  created() {
    this.connected = this.$store.getters.CONNECTED;
  },
};
</script>
