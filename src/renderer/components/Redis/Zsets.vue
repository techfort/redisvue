<template>
  <div id="zsetwrapper" class="contentwrapper">
    <div id="zsetquery">
      <label>ZSET QUERY</label>
      <select v-model="command" class="form-control">
        <option v-for="q in queries" v-bind:key="q" v-bind:value="q">{{ q }}</option>
      </select>
      <label>KEY</label>
      <input type="text" v-model="key" class="form-control" />
      <label>ARGS</label>
      <input type="text" class="form-control" @keyup.enter="zsetQuery" v-model="args" />
      <a class="uilink" href="#" @click="zsetQuery">query</a>
    </div>
    <div id="zsetresults">
      <div v-if="result">
        <div class="resultentry">
          <div class="member"><label>member</label></div>
          <div class="score"><label>score</label></div>
        </div>
        <div v-for="r in result" :key="r.member" class="resultentry">
          <div class="member">{{ r.member }}</div>
          <div class="score">{{ r.score }}</div>
        </div>
      </div>
      <div v-else-if="error" class="resultentry">{{ error }}</div>
      <div v-else class="resultentry">Type your query above</div>
    </div>
  </div>
</template>
<style>
#zsetwrapper {
  display: grid;
  grid-template-rows: 300px auto;
}

#zsetresults {
  display: grid;
  grid-template-rows: repeat(50, 1fr);
}
.resultentry {
  display: grid;
  grid-gap: 10px;
  grid-row: span 1;
  grid-template-columns: repeat(2, 1fr);
}
.score, .member {
  grid-column: span 1;
}
</style>


<script>
import to from '../../helpers';

const zsetQuery = (client, { command, key, args }) => to(client[command](key, args));

const zip = (array, withscores) => {
  if (!Array.isArray(array)) {
    return [{ score: array }];
  }
  if (!withscores) {
    return array.map(member => ({ score: 'N/A', member }));
  }
  const results = [];
  for (let i = 0; i < array.length; i += 1) {
    const score = array[i + 1];
    const member = array[i];
    results.push({ score, member });
    i += 1;
  }
  return results;
};

export default {
  name: 'Zsets',
  data() {
    return {
      error: null,
      args: '',
      queries: [
        'ZRANGE',
        'ZRANGEBYLEX',
        'ZRANGEBYSCORE',
        'ZREVRANGE',
        'ZREVRANGEBYLEX',
        'ZREVRANGEBYSCORE',
        'ZRANK',
        'ZREVRANK',
      ],
      key: '',
      command: '',
      result: '',
    };
  },
  methods: {
    async zsetQuery() {
      this.error = null;
      this.result = null;
      const args = this.args.split(' ').map((e) => {
        if (e === 'withscores' || e === 'weights' || e === 'aggregate') {
          return e.toUpperCase();
        }
        return e;
      });
      const command = `${this.command.toLowerCase()}Async`;
      const { data, error } = await zsetQuery(
        this.$store.getters.CLIENT,
        {
          command,
          key: this.key,
          args,
        },
      );
      if (error) {
        this.error = error.message;
        return;
      }
      this.result = [];
      const withscores = args.indexOf('WITHSCORES') !== -1;
      this.result = zip(data, withscores);
    },
  },
};
</script>
