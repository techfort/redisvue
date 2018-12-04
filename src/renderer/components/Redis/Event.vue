<template>
    <div class="container-fluid">
        <div class="row evtrow">
            <div class="col-md-1 evt evtkey evtbadge"
                    v-bind:class="event.type">
                        {{ event.type }}
            </div>
            <div class="col-md-4 keycol evt">
              <router-link :to="{ name: 'history', params: { key: event.key, type: event.type }}">{{ evtKey }}</router-link>
            </div>
            <div class="col-md-7 evt evtvalue">{{ event.value }}</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Event',
  props: ['event'],
  computed: {
    evtKey() {
      return (this.event && this.event.key && this.event.key.length > 20) ? `${this.event.key.substring(0, 50)}...` : this.event.key;
    },
  },
};
</script>