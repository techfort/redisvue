<template>
  <div id="app">
    <div class="windowcontrols container-fluid">
      <div class="row">
        <div class="col-6"><img src="@/assets/icon-redis.svg" width="32" />RedisVue</div>
        <div class="col-6 text-right">
          <a class="windowcontrol" @click="$electron.remote.getCurrentWindow().minimize()">&#x2014;</a>
          <a class="windowcontrol" @click="$electron.remote.getCurrentWindow().isMaximized() ?
          $electron.remote.getCurrentWindow().unmaximize() :
          $electron.remote.getCurrentWindow().maximize()">&#x1f5d6;</a>
          <a class="windowcontrol" @click="$electron.remote.getCurrentWindow().close()">&#x274c;</a>
        </div>
      </div>
    </div>
    <div class="maincontainer">
      <NavigationBar></NavigationBar> 
      <div class="main">
        <router-view></router-view>
      </div>
      <StatusBar></StatusBar>
    </div>
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

<style lang="scss">
@import '~bootstrap/dist/css/bootstrap.css';
@import '~nord/src/sass/nord.scss';
@import url('https://fonts.googleapis.com/css?family=Share+Tech+Mono');
html, body {
  font-family: 'Share Tech Mono', 'Noto Sans', sans-serif;
  font-size: 1.1em;
  background: $nord0 !important;
  color: $nord4 !important;
  height: 100vh;
  overflow:hidden;
}
.maincontainer {
  clear:both;
  padding-top: 32px;
}
.router-link-active {
  color: $nord14 !important;
}
.logo {
  float: left;

}
.controls {
  padding: 0px 0.5em 0px 1em;
}
.windowcontrols {
  z-index: 1000000000;
  font-size: 0.9em;
  top: 0;
  left: 0;
  position: fixed;
  -webkit-user-select: none;
  -webkit-app-region: drag;
  background: $nord0;
  color: $nord14;
}
.windowcontrols .row {
  padding: 0;
  margin: 0;
}

.windowcontrol {
  margin-right: 0.5em;
  margin-left: 1em;
  -webkit-app-region: no-drag;
  cursor: pointer;
}

label {
  font-variant: small-caps;
  font-weight: 700;
  background: $nord1;
  width: 100%;
  padding-left: 1em;
  color: $nord14;
}

a {
  outline: none;
}

.form-control {
  background: $nord1 !important;
  color: $nord4 !important;
}

input {
  box-shadow: none !important;
}

::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    background: $nord0; 
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: $nord14; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: $nord3; 
}

.errorMessage {
  color: $nord11 !important;
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
/*
.maincontent {
  flex: 1;
  overflow-y: auto;
}
*/
.sidebar {
  float: left;
  height: 100vh;
  width: 55px;
  z-index: 10000;
  /* border-right: 1px solid #777; */
}
.numkeys {
  font-size: 0.6em
}
.info {
  flex: 1;
  max-height: 60vh;
  overflow: auto;
}
.serverinfo {
  font-size: 0.8em;
}
.suggestion {
  font-size: 0.9em;
  background: $nord3;
}

.homeinfo {
  box-shadow: 4px 4px 4px 2px $nord1;
  background: $nord3;
  padding: 1em !important;
}
a.normallink, a.normallink:hover, a.normallink:visited {
  color: $nord7 !important;
}

.status {
  position: fixed;
  bottom: 0;
  margin: 0;
  padding: 0;
  z-index: 1000000;
  width: 100%;
  height: 20px; /* Set the fixed height of the footer here */
  line-height: 20px; /* Vertically center the text there */
  background-color: $nord1;
  font-size: 0.8rem;
}
.evt {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    /* font-family: 'Courier New', Courier, monospace; 
    font-size: 0.9em;*/
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
  font-size: 0.9em;
  border-top: 1px solid $nord3;
  word-wrap: none;
  word-break: normal;
  color: $nord4;
}
pre {
  color:$nord4;
}
.uilink {
  font-variant: small-caps;
  padding: 0.5em;
  height: 50px;
  line-height: 50px;
  font-weight: 700;
  cursor: pointer;
  color: $nord0 !important;
  background: $nord14 !important;
  border-radius: 0.5em;
}

.uilink:hover {
  color: $nord7 !important;
}

.evtbadge {
  font-variant: small-caps;
  width: 100%;
  font-weight: 700;
}
#watchlist, #querylist, #historylist {
  font-size:0.8em;
  flex: 1;
  max-height: 100vh;
  overflow: auto;
  margin-bottom: 100px;
  padding-bottom: 100px;
}
#querylist {
  max-height: 79vh;
}
.set {
  background: $nord11;
  color: $nord4;
}

.zset {
  color: $nord12 !important;
}
 
.hash {
  background: $nord14;
  color: $nord3;
}

.list {
  background: $nord4;
  color: $nord10;
}

.string {
  background: $nord1;
  color: $nord11;
}

.evtkey {
  text-align: center;
  word-wrap:break-word;
  word-break:break-all;
}
.insertform {
  margin-bottom: 3em;
}

a, a:visited, a:target {
  color: $nord7;
}

a:hover {
  color: $nord15;
  text-decoration: none;
}

.nav-item:hover {
  color: $nord11;
}

.menuopt {
  font-size: 2em;
  font-weight: 800;
  text-decoration: none;
  color: $nord3;
}

.disconnect {
  position: absolute;
  bottom: 20px;
}
.nav-item {
  cursor: pointer;
  border-bottom: 1px solid $nord3;
  text-align: center;
  color: $nord7 !important;
}
.navitemtext {
  color: $nord4;
  font-size: 0.9em;
  font-variant: small-caps;
}
</style>
