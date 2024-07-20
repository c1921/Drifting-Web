<template>
  <header>
    <p>{{ $t('currentTime') }}: {{ formattedTime }}</p>
    <button @click="toggleTimer">{{ isRunning ? $t('pause') : $t('resume') }}</button>
  </header>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

export default defineComponent({
  name: 'Header',
  props: {
    currentTime: {
      type: Date as PropType<Date>,
      required: true
    },
    isRunning: {
      type: Boolean,
      required: true
    }
  },
  emits: ['toggleTimer'],
  setup(props, { emit }) {
    const formattedTime = computed(() => {
      const year = props.currentTime.getFullYear();
      const month = String(props.currentTime.getMonth() + 1).padStart(2, '0');
      const day = String(props.currentTime.getDate()).padStart(2, '0');
      const hours = String(props.currentTime.getHours()).padStart(2, '0');
      const minutes = String(props.currentTime.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    });

    const toggleTimer = () => {
      emit('toggleTimer');
    };

    return { formattedTime, toggleTimer };
  }
});
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #357a38;
}

button:focus {
  outline: none;
}
</style>
