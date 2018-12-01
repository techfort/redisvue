const redisHSET = () => {};
const redisSADD = () => {};
const redisSET = () => {};

export default {
  name: 'Insert',
  methods: {
    execSET() {
      redisSET(this.setKey.trim(), this.setValue.trim())
        .then(({
          statusText,
        }) => {
          this.latestSET = statusText;
        })
        .catch((error) => {
          this.latestSET = error.response.data.error;
        });
    },
    execHSET() {
      redisHSET(this.hsetKey.trim(), this.hsetField.trim(), this.hsetValue.trim())
        .then(({
          statusText,
        }) => {
          this.latestHSET = statusText;
        })
        .catch((error) => {
          this.latestHSET = error.response.data.error;
        });
    },
    execSADD() {
      redisSADD(this.saddKey.trim(), this.saddValue.trim())
        .then(({
          statusText,
        }) => {
          this.latestSADD = statusText;
        })
        .catch((error) => {
          this.latestSADD = error.response.data.error;
        });
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
