<template>
  <div class="sidebar sticky-top">
    <div class="nav-item">
      <router-link to="/watch">
        <div class="menuopt">&#x23ff;</div>
        <div class="navitemtext">watch</div>
      </router-link>
    </div>
    <div class="nav-item">
      <router-link to="/insert">
        <div class="menuopt">&#x21d2;</div>
        <div class="navitemtext">insert</div>
      </router-link>
    </div>
    <div class="nav-item">
      <router-link to="/query">
        <div class="menuopt">&#x26A1;</div>
        <div class="navitemtext">query</div>
      </router-link>
    </div>
    <div class="nav-item">
      <router-link to="/sets">
        <div class="menuopt">&#x2282;</div>
        <div class="navitemtext">sets</div>
      </router-link>
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
      this.$router.push('/');
    },
  },
};
</script>
