<template>
    <div class="container-fluid">
      <div class="row insertform">
        <div class="container-fluid">
            <label>SET</label>
        </div>
        <div class="col">
          <label for="plainkey">key</label><input type="text" class="form-control" id="plainkey" v-model="setKey" />
        </div>
        <div class="col">
          <label for="setValue">value</label><input class="form-control" id="setValue" type="text" v-model="setValue" />
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
              <label for="hsetValue">value</label><input class="form-control" type="text" v-model="hsetValue" id="hsetValue" />
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
              <label for="saddKey">key</label><input class="form-control" type="text" id="saddKey" v-model="saddKey" />
            </div>
            <div class="col">  
              <label for="saddValue">value</label><input class="form-control" type="text" id="saddValue" v-model="saddValue" />
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

export default {
  name: 'Insert',
  methods: {
    async execSET() {
      const { error, data } = await redisSET(
        this.$store.getters.CLIENT,
        this.setKey.trim(),
        this.setValue.trim(),
      );
      console.log(error, data);
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
  data() {
    return {
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
    };
  },

};
</script>