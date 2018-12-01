<template>
    <div class="container-fluid">
        <div class="row evtrow">
            <div class="col-md-1 evt evtkey">
                <span class="badge evtbadge"
                    v-bind:class="{ 'badge-primary': event.type === 'string', 'badge-danger': event.type === 'set', 'badge-warning': event.type === 'hash'}">
                    {{ event.type }}
                </span>
            </div>
            <div class="col-md-3 keycol evt">{{ evtKey }}</div>
            <div class="col-md-8 evt">{{ event.value }}</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Event',
  props: ['event'],
  computed: {
    evtKey() {
      return this.event.key.length > 20 ? `${this.event.key.substring(0, 20)}...` : this.event.key;
    },
  },
};
</script>