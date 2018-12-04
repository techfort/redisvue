<template>
  <div id="wrapper">
    <main class="container-fluid">
      <div class="col" v-if="disconnected"> 
        <connect></connect>
      </div>
      <div class="col" v-else>
        Connected to {{ URL }}
      </div>
      <div class="col homeinfo" v-if="disconnected">
        <div class="">
          <img src="@/assets/icon-redis.svg" class="logo" width="240px" />
          <h1>RedisVue</h1>
        </div>
        <p><a target="_blank" href="http://github.com/techfort/redisvue" class="normallink">redisvue</a> is a real time redis monitor for Redis.
        It allows real-time monitoring of keys, inspection of their history and preview of advanced operations on sets.
        </p>
        <p>Powered by <a target="_blank" class="normallink" href="http://vuejs.org">Vue.js</a> and <a class="normallink" target="_blank" href="http://electronjs.org">Electron</a></p>
        <p>Made with love by <a class="normallink" href="http://github.com/techfort">techfort</a></p>
      </div>
      <div v-else class="col homeinfo">
        <label><h6>server info</h6></label>
        <div class="info">
          <div class="serverinfo row" v-for="(k, v) in INFO" :key="v">
            <div class="col"><label>{{ v }}</label></div>
            <div class="col">{{ k }}</div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Connect from './ConnectPage/Connect';

export default {
  name: 'landing-page',
  components: { Connect },
  computed: {
    ...mapGetters([
      'URL',
      'INFO',
    ]),
    disconnected() {
      return !this.$store.getters.CONNECTED;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#wrapper {
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  justify-content: space-between;
}

main > div { flex-basis: 50%; }
</style>
