<template>
  <footer class="status row">
    <div class="col-md-1">
        <router-link to="/">/</router-link> 
    </div>
    <div class="col-md-1">
    
    </div>
    <div class="col-md-8"></div>
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
export default {
  name: 'StatusBar',
  computed: {
    connected() {
      return this.$store.getters.CONNECTED ? 'connected' : 'offline';
    },
  },
};
</script>

