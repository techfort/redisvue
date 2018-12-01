<template>
  <div class="sidebar maincontainer">
    <div class="nav-item">
      <router-link to="/watch"><span class="menuopt">&#x23ff;</span></router-link>
    </div>
    <div class="nav-item">
      <router-link to="/insert"><span class="menuopt">&#x21d2;</span></router-link>
    </div>
    <div class="nav-item">
      <router-link to="/query"><span class="menuopt">&#x26A1;</span></router-link>
    </div>
    <div class="nav-item">
      <router-link to="/sets"><span class="menuopt">&#x2282;</span></router-link>
    </div>
    <div class="nav-item">
      <a @click="disconnect"><span class="menuopt">&#x23fb;</span></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar',
  computed: {
    connected() {
      return this.$store.getters.CONNECTED;
    },
  },
  methods: {
    disconnect() {
      this.$store.dispatch('disconnect');
    },
  },
};
</script>
