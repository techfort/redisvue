<template>
  <div id="luaeditor">
    <div class="luacm">
      <Lua />
    </div>
    <div class="luabuttons">
      NUMKEYS: <input type="number" v-model="numkeys" /> KEYS: <input type="text" v-model="keys" /> ARGV: <input type="text" v-model="argv" />
      <a class="uilink" href="#" @click="run">run</a>
      <a class="uilink" href="#">open</a>
    </div>
    <div class="luaconsole">
      {{ output }}
    </div>
  </div>
</template>
<style>
.luaeditor {
  display: grid;
  grid-template-rows: repeat(10, 1fr);
}
.luacm {
  grid-row: span 4;
}
.luabuttons {
  grid-row: span 1
}
.luaconsole {
  grid-row: span 5;
}
</style>

<script>
import { mapGetters } from 'vuex';
import Lua from './Lua.vue';

export default {
  name: 'Editor',
  components: {
    Lua,
  },
  data() {
    return {
      output: '',
      keys: 'hello',
      argv: '',
      numkeys: 1,
    };
  },
  computed: {
    ...mapGetters([
      'CLIENT',
      'SCRIPT',
    ]),
  },
  mounted() {
  },
  methods: {
    async run() {
      this.output = 'loading...';
      this.CLIENT.eval(this.SCRIPT, this.numkeys, ...this.keys.split(' '), ...this.argv.split(' '), (err, result) => {
        if (err) {
          console.log('ERROR', err);
        }
        this.output = result || JSON.stringify(err);
      });
    },
  },
};
</script>

