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
  color: yellowgreen;
}

a {
  outline: none;
}
.row {
  margin-right: 0px !important;
  margin-left: 0px !important;
}
.container-fluid {
  margin: 0 !important;
  padding: 0 !important;
}
.col {
  padding: 0 4px 0 0 !important;
}
.header {
  padding-left: 55px;
}
.maincontent {
  flex: 1;
  overflow-y: auto;
}
.sidebar {
  float: left;
  height: 100vh;
  width: 55px;
  z-index: 10000;
  /* border-right: 1px solid #777; */
}

.status {
  position: fixed;
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
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.9em;
}
.evtvalue {
  word-wrap:break-word;
  word-break:break-all;
  overflow: hidden;
  max-height: 60px;
}
.evtrow {
    font-size: 0.8rem;
}
.fullvalue {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  word-wrap: none;
  word-break: normal;
  color: white;
}
pre {
  color: white;
}
.uilink {
  font-variant: small-caps;
  padding: 0 1em;
  height: 50px;
  line-height: 50px;
  font-weight: 700;
  cursor: pointer;
  color: #2f3945 !important;
  background: yellowgreen !important;
  border-radius: 0.5em;
}

.uilink:hover {
  color: aquamarine !important;
}

.evtbadge {
  font-variant: small-caps;
  width: 100%;
  font-weight: 700;
}

.set {
  background: yellowgreen;
  color: white;
}

.zset {
  color: yellowgreen !important;
}
 
.hash {
  background: darkgreen;
  color: white;
}

.list {
  background: white;
  color: #2f3945;
}

.string {
  background: white;
  color: green;
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
  color: rgba(255, 25, 25, 0.8);
}

.menuopt {
  font-size: 2em;
  font-weight: 800;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
}

.disconnect {
  position: absolute;
  bottom: 20px;
}
.nav-item {
  cursor: pointer;
  /* height: 80px;
  line-height: 80px;
  */
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  text-align: center;
}
.navitemtext {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.9em;
  font-variant: small-caps;
}
</style>
