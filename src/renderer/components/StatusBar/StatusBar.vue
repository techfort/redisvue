<template>
  <footer class="status row sticky-bottom">
    <div class="col-md-1">
        <router-link to="/">&#x2302; home</router-link> 
    </div>
    <div class="col-md-1">
    </div>
    <div class="col-md-8">
      Server: {{ URL }}
    </div>
    <div class="col-md-2 statusright">
      Status: {{ connected }}
    </div>
  </footer>
</template>
<style>
.statusright{
  text-align: right;
}
</style>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'StatusBar',
  computed: {
    ...mapGetters([
      'URL',
    ]),
    connected() {
      return this.$store.getters.CONNECTED ? 'connected' : 'offline';
    },
  },
};
</script>

