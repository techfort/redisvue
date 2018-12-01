<template>
  <div id="wrapper">
    <main>
      <div v-if="disconnected"> 
        <span class="title">
          Connect to Redis Server
        </span>
        <connect></connect>
      </div>
      
    </main>
  </div>
</template>

<script>
import Connect from './ConnectPage/Connect';

export default {
  name: 'landing-page',
  components: { Connect },
  computed: {
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
