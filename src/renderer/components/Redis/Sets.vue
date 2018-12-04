<template>
    <div class='container-fluid'>
        <div class="row">
          <label><h2>sets</h2></label>
        </div>
        <div class="row">
            <label for="search">SEARCH</label>
            <input class="form-control" type='text' id='search' v-model='search' />
        </div>
        <div class="row">
            <div class="col"><a @click="reset" class="uilink">CLEAR</a></div>
            <div class="col"><a @click="invert" class="uilink">INVERT SELECTION</a></div>
        </div>
        <div class='row'>
            <div class='col-md-4 column'>
                <label>SETS</label>
                <div class='evt selectable' v-bind:class="{ 'sel' : e.key == sel1key || e.key == sel2key }" @click='select(e.key)' v-for='e in sets' v-bind='e' v-bind:key='e.key'>
                    {{ e.key }}
                </div>
            </div>
            
            <div class='col-md-4 column'>
                <label>SELECTED</label>
                <div v-show="sel1" class='evt'>
                    <div><strong>{{ sel1key }}</strong></div>
                    <div>{{ sel1.value }}</div>
                </div>
                <div v-show='sel2' class='evt'>
                    <div><strong>{{ sel2key }}</strong></div>
                    <div>{{ sel2.value }}</div>
                </div>
            </div>
            
            <div class='col-md-4' v-show="sel2key !== ''">
                <div class='insertform'>
                    <label>UNION</label>
                    <div class='evt'>{{ union }}</div>
                    <div class='command'><pre>{{ unioncommand }}</pre></div>
                </div>
                <div class='insertform'>
                    <label>DIFF</label>
                    <div class='evt'>{{ diff }}</div>
                    <div class='command'><pre>{{ diffcommand }}</pre></div>
                </div>
                <div class='insertform'>
                    <label>INTERSECT</label>
                    <div class='evt'>{{ intersect }}</div>
                    <div class='command'><pre>{{ intersectcommand }}</pre></div>
                </div>

            </div>
        </div>
    </div>
</template>

<style>
.selectable {
    cursor: pointer ;
}
.column {
    border-right: 1px solid #ccc;
}
.command {
    font-size: 0.8em;
    background: #ccc;
}
.command pre {
  color: #333;
}
.sel {
  color: yellowgreen;
}
</style>

<script>
export default {
  name: 'Sets',
  computed: {
    sets() {
      return Object.values(this.$store.getters.SET).reduce((acc, { current }) => {
        if (current.key.indexOf(this.search) !== -1) {
          acc[current.key] = current;
        }
        return acc;
      }, {});
    },
    sel1key() {
      return this.sel1 ? this.sel1.key : '';
    },
    sel2key() {
      return this.sel2 ? this.sel2.key : '';
    },
    union() {
      const a = Array.from(this.sel1.value);
      const b = Array.from(this.sel2.value);
      const s = new Set(a.concat(b));
      return [...s].join(', ');
    },
    unioncommand() {
      const a = this.sel1.key;
      const b = this.sel2.key;
      return `SUNION ${a} ${b}`;
    },
    diff() {
      const a = Array.from(this.sel1.value);
      const b = Array.from(this.sel2.value);
      const c = new Set(a.filter(e => b.indexOf(e) === -1));
      return [...c].join(', ');
    },
    diffcommand() {
      const a = this.sel1.key;
      const b = this.sel2.key;
      return `SDIFF ${a} ${b}`;
    },
    intersect() {
      const a = Array.from(this.sel1.value);
      const b = Array.from(this.sel2.value);
      const c = new Set(a.filter(e => b.indexOf(e) !== -1));
      return [...c].join(', ');
    },
    intersectcommand() {
      const a = this.sel1.key;
      const b = this.sel2.key;
      return `SINTER ${a} ${b}`;
    },
  },
  methods: {
    invert() {
      const x = this.sel1;
      this.sel1 = this.sel2;
      this.sel2 = x;
    },
    reset() {
      this.sel1 = {
        key: '',
        type: '',
        value: '',
        id: '',
      };
      this.sel2 = {
        key: '',
        type: '',
        value: '',
        id: '',
      };
    },
    select(id) {
      if (this.sel1key === '') {
        this.sel1 = this.sets[id];
        return;
      }
      this.sel2 = this.sets[id];
    },
  },
  data() {
    return {
      search: '',
      sel1: {
        key: '',
        type: '',
        value: '',
        id: '',
      },
      sel2: {
        key: '',
        type: '',
        value: '',
        id: '',
      },
    };
  },
  created() {
    if (!this.$store.getters.CONNECTED) {
      this.$router.push('/');
    }
  },
};
</script>