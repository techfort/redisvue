<template>
    <div class="container-fluid">
      <div class="header">
        <div class="row">
            <label><h2>query</h2></label>
        </div>
        <div class="row">
              <label for="term">search key</label><input class="form-control" type="text" id="term" v-on:keyup="search" v-model="term"/>
        </div>
        <div class="row" v-if="entries.length > 0">
                <div class="col"><a class="uilink" @click="selectAll">SELECT ALL</a></div>
                <div class="col"><a class="uilink" @click="addEntries">ADD TO EVENTS</a></div>
        </div>
      </div>
      <div class="maincontent" id="querylist">
        <div v-for="e in entries" v-bind:entry="e" v-bind:key="e.key" class="row evt">
            <div class="col-md-1"><input type="checkbox" v-model="selected" :value="e.key" /></div>
            <div class="col-md-1 evtbadge" v-bind:class="e.type">{{ e.type }}</div>
            <div class="col-md-3">{{ e.key }}</div>
            <div class="col-md-7 evtvalue">{{ e.value }}</div>
        </div>
      </div>
    </div>
</template>

<script>
/* eslint no-await-in-loop: 0 */
import to, { entry, GETTERS } from '../../helpers';

const scan = (client, term, cursor, results) => client.scanAsync(cursor, 'MATCH', `*${term}*`, 'COUNT', 10)
  .then((res) => {
    const [cursor, keys] = res;
    console.log('res and keys', res, keys);
    results = results.concat(keys);
    if (cursor === '0') {
      return results;
    }
    return scan(client, term, cursor, results);
  }).catch((err) => { throw err; });

const query = async (client, term) => {
  const keys = await scan(client, term, 0, []);
  const results = [];
  const promises = keys.map(k => client.typeAsync(k).then(async (typeResult) => {
    const method = GETTERS[typeResult];
    const args = [k];
    console.log('method and args', method, args);
    if (method === 'zrangeAsync' || method === 'lrangeAsync') {
      args.push(0, -1);
      if (method === 'zrangeAsync') {
        args.push('WITHSCORES');
      }
    }
    const { error, data } = await to(client[method](...args));
    if (!error) {
      results.push(entry(k, typeResult, data));
    }
  }));
  await Promise.all(promises);
  console.log('RESULTS FROM PROMISES', results);
  return results;
};

export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.$store.getters.CONNECTED) {
        vm.$router.push('/');
      }
    });
  },
  methods: {
    selectAll() {
      const selected = [];
      this.entries.forEach((e) => {
        selected.push(e.key);
      });
      this.selected = selected;
    },
    addEntries() {
      const filtered = this.entries.filter(e => this.selected.indexOf(e.key) !== -1);
      filtered.map(e => this.$store.dispatch('addEvent', e));
    },
    search() {
      this.entries = [];
      if (this.term.length > 3) {
        query(this.$store.getters.CLIENT, this.term).then((results) => {
          console.log('Results', results);
          this.entries = results;
        });
      }
    },
  },
  data() {
    return {
      term: '',
      entries: [],
      selected: [],
    };
  },
};
</script>