<template>
  <div class="sidebar sticky-top">
    <div class="nav-item">
      <router-link to="/watch" active-class="router-link-active">
        <div class="navitemtext">watch</div>
      </router-link>
    </div>
    <div class="nav-item">
      <router-link to="/insert" active-class="router-link-active">
        <div class="navitemtext">run</div>
      </router-link>
    </div>
    <div class="nav-item" active-class="router-link-active">
      <router-link to="/query">
        <div class="navitemtext">query</div>
      </router-link>
    </div>
    <div class="nav-item">
      <router-link to="/sets" active-class="router-link-active">
        <div class="navitemtext">sets</div>
      </router-link>
    </div>
    <div class="nav-item">
      <router-link to="/zsets" active-class="router-link-active">
        <div class="navitemtext">zsets</div>
      </router-link>
    </div>
   <div class="nav-item">
      <router-link to="/pubsub" active-class="router-link-active">
        <div class="navitemtext">pubsub</div>
      </router-link>
    </div>
   <div class="nav-item">
      <router-link to="/lua" active-class="router-link-active">
        <div class="navitemtext">lua</div>
      </router-link>
    </div>
    <div class="nav-item">
      <a @click="disconnect">
        <div class="navitemtext" active-class="router-link-active">esc</div>
      </a>
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
