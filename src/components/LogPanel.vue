<template>
  <div class="log" ref="logContainer">
    <h3>Log</h3>
    <ul>
      <li v-for="(entry, index) in log" :key="index">{{ entry }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, nextTick } from 'vue';

export default defineComponent({
  name: 'LogPanel',
  props: {
    log: {
      type: Array as () => string[],
      required: true
    }
  },
  setup(props) {
    const logContainer = ref<HTMLElement | null>(null);

    watch(
      () => props.log,
      () => {
        nextTick(() => {
          if (logContainer.value) {
            logContainer.value.scrollTop = logContainer.value.scrollHeight;
          }
        });
      },
      { deep: true }
    );

    return { logContainer };
  }
});
</script>

<style scoped>
.log {
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  height: 150px;
  overflow-y: auto;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
}
</style>
