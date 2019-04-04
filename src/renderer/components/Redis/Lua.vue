<template>
  <div class="cmwrapper">
    <codemirror ref="myCm" v-model="code" :options="cmOptions" @input="onCodeChange"></codemirror>
  </div>
</template>
<style>
.cmwrapper {
  width: 49%;
}
</style>

<script>
import Vue from 'vue';
import { codemirror } from 'vue-codemirror';
import 'codemirror/mode/lua/lua.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-dark.css';
import { mapGetters } from 'vuex';
Vue.use(codemirror);

export default {
  name: 'Lua',
  components: {
    codemirror,
  },
  data() {
    return {
      code: 'return 1',
      cmOptions: {
        tabSize: 4,
        mode: 'text/x-lua',
        theme: 'default',
        lineNumbers: true,
        line: true,
      },
    };
  },
  created() {
    this.code = this.SCRIPT;
  },
  computed: {
    ...mapGetters([
      'SCRIPT',
    ]),
  },
  methods: {
    onCodeChange() {
      this.$store.dispatch('luaChange', this.code);
    },
  },
};
</script>
