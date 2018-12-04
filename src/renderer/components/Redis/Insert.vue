<template>
    <div class="container-fluid">
      <div class="row insertform">
        <div class="container-fluid">
            <label>RUN COMMAND</label>
        </div>
        <div class="col">
          <label for="command">command</label><input type="text" class="form-control" @keyup.enter="execCOMMAND" id="command" v-model="command" />
          <p v-for="s in suggestions" v-bind="s" :key="s.command" class="suggestion" >{{ s.value }}</p>
        </div>
        <div class="container-fluid">
          <a @click="execCOMMAND" class="uilink">RUN</a>
          <div>{{ latestCOMMAND }}</div>
        </div>
      </div>
      <div class="row insertform">
        <div class="container-fluid">
            <label>SET</label>
        </div>
        <div class="col">
          <label for="plainkey">key</label><input type="text" class="form-control" id="plainkey" v-model="setKey" />
        </div>
        <div class="col">
          <label for="setValue">value</label><input class="form-control" id="setValue" type="text" v-model="setValue" @keyup.enter="execSET" />
        </div>
        <div class="container-fluid">
          <a @click="execSET" class="uilink">SET</a>
          <div>{{ latestSET }}</div>
        </div>
      </div>
      <div class="row insertform">
            <div class="container-fluid">
                <label>HSET</label>
            </div>
            <div class="col">
              <label for="hasKey">key</label><input class="form-control" type="text" id="hashKey" v-model="hsetKey" />
            </div>
            <div class="col">
              <label for="hsetField">field</label><input class="form-control" type="text" id="hsetField" v-model="hsetField" />
            </div>
            <div class="col">
              <label for="hsetValue">value</label><input class="form-control" type="text" v-model="hsetValue" id="hsetValue" @keyup.enter="execHSET" />
            </div>
            <div class="container-fluid">  
              <a class="uilink" @click="execHSET">HSET</a>
              <div>{{ latestHSET }}</div>
            </div>
        </div>
        <div class="row insertform">
            <div class="container-fluid">
                <label>SADD</label>
            </div>
            <div class="col">
              <label for="saddKey">key</label><input class="form-control" type="text" id="saddKey" v-model="saddKey"  />
            </div>
            <div class="col">  
              <label for="saddValue">value</label><input class="form-control" type="text" id="saddValue" v-model="saddValue" @keyup.enter="execSADD"/>
            </div>
             <div class="container-fluid">  
              <a class="uilink" @click="execSADD">SADD</a>
              <div>{{ latestSADD }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import to from '../../helpers';

const redisSET = async (client, key, value) => to(client.setAsync(key, value));
const redisSADD = async (client, key, value) => to(client.saddAsync(key, value));
const redisHSET = async (client, key, field, value) => to(client.hsetAsync(key, field, value));

const commands = [
  { command: 'SET', value: 'SET key value [expiration EX seconds|PX milliseconds]' },
  { command: 'SADD', value: 'SADD key member [member ...]' },
  { command: 'HSET', value: 'HSET key field value' },
  { command: 'LPUSH', value: 'LPUSH key value [value ...]' },
];

export default {
  name: 'Insert',
  methods: {
    async execCOMMAND() {
      const chunks = this.command.split(' ');
      const cmd = chunks.shift();
      const { error, data } = await to(this.$store.getters.CLIENT.send_commandAsync(cmd, chunks));
      this.latestCOMMAND = data || error;
    },
    async execSET() {
      const { error, data } = await redisSET(
        this.$store.getters.CLIENT,
        this.setKey.trim(),
        this.setValue.trim(),
      );
      this.latestSET = error || data;
    },
    async execHSET() {
      const { error, data } = await redisHSET(
        this.$store.getters.CLIENT,
        this.hsetKey.trim(),
        this.hsetField.trim(),
        this.hsetValue.trim(),
      );
      this.latestHSET = error || data;
    },
    async execSADD() {
      const { error, data } = await redisSADD(
        this.$store.getters.CLIENT,
        this.saddKey.trim(),
        this.saddValue.trim(),
      );
      this.latestSADD = error || data;
    },
  },
  computed: {
    suggestions() {
      if (this.command.length < 3) {
        return [];
      }
      const chunks = this.command.split(' ');
      return commands.filter(({ command }) => command.indexOf(chunks[0].toUpperCase()) === 0);
    },
  },
  data() {
    return {
      command: '',
      setKey: '',
      setValue: '',
      hsetKey: '',
      hsetField: '',
      hsetValue: '',
      saddKey: '',
      saddValue: '',
      latestSET: '',
      latestHSET: '',
      latestSADD: '',
      latestCOMMAND: '',
    };
  },
  created() {
    if (!this.$store.getters.CONNECTED) {
      this.$router.push('/');
    }
  },
};
</script>