<template>
  <div>
    <p>{{ $t('travelDistance') }}: {{ travelDistance.toFixed(2) }} {{ $t('distanceUnit') }}</p>
    <button @click="toggleTravelState">{{ isTraveling ? $t('rest') : $t('travel') }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from 'vue';

export default defineComponent({
  name: 'TravelTab',
  props: {
    travelDistance: {
      type: Number,
      required: true
    },
    isTraveling: {
      type: Boolean,
      required: true
    }
  },
  emits: ['toggleTravelState'],
  setup(props, { emit }) {
    const toggleTravelState = () => {
      emit('toggleTravelState');
    };

    return { toggleTravelState };
  }
});
</script>
