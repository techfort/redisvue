<template>
    <div class="container-fluid">
        <div class="row evtrow">
            <div class="col-md-1 evt evtkey evtbadge"
                    v-bind:class="event.type">
                        {{ event.type }}
            </div>
            <div class="col-md-4 keycol evt">
              <router-link
                :to="{ name: 'history', params: { key: event.key, type: event.type }}"
                :title="event.key">{{ event.key }}</router-link>
            </div>
            <div class="col-md-7 evt evtvalue"><a :title="event.value">{{ event.value }}</a></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Event',
  props: ['event'],
};
</script>