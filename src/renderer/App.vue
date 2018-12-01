<template>
  <div id="app"> 
    <NavigationBar></NavigationBar> 
    <div class="main maincontainer">
      <router-view></router-view>
    </div>
    <StatusBar></StatusBar>
  </div>
</template>

<script>
import store from './store';
import StatusBar from './components/StatusBar/StatusBar.vue';
import NavigationBar from './components/NavigationBar/NavigationBar.vue';

export default {
  name: 'redisvue',
  components: {
    NavigationBar,
    StatusBar,
  },
  store,
};
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.css';

html, body {
  font-family: 'Noto Sans', sans-serif;
  background: #2e3440 !important;
  color: #d8dee9 !important;
  height: 100vh;
}

label {
  font-variant: small-caps;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.1);
  width: 100%;
  padding-left: 10px;
}

.maincontainer {
  height: 100vh;
}

.sidebar {
  float: left;
  height: 100vh;
  width: 65px;
  border-right: 1px solid #777;
}

.status {
  position: absolute;
  bottom: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 20px; /* Set the fixed height of the footer here */
  line-height: 20px; /* Vertically center the text there */
  background-color: #2f3945;
  font-size: 0.8rem;
}
.evt {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
}
.evtrow {
    font-size: 0.8rem;
}
.uilink {
  font-variant: small-caps;
  font-weight: 700;
  text-decoration: underline !important;
}
.evtbadge {
  font-variant: small-caps;
}
.evtkey {
  text-align: center;
}
.insertform {
  margin-bottom: 3em;
}

a, a:visited, a:target {
  color: rgba(255, 255, 255, 0.6);
}

a, a:hover, a:visited {
  text-decoration: none;
}

.nav-item a:hover {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1em;
}

span.menuopt {
  font-size: 3em;
  font-weight: 800;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
}

.disconnect {
  position: absolute;
  bottom: 20px;
}
.nav-item {
  height: 80px;
  line-height: 80px;
  border-bottom: 1px solid #777;
  text-align: center;
}
</style>
