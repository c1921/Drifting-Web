<template>
  <div class="log" ref="logContainer">
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

<style lang="scss" scoped>
@import '../assets/variables.scss';

.log {
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  height: 10rem;
  overflow-y: auto;
  background-color: $sub-bg-color;
  position: relative;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  margin-top: 0.5rem;
}

/* Customize the scrollbar */
.log::-webkit-scrollbar {
  width: 12px;
}

.log::-webkit-scrollbar-track {
  background: #f4f4f4;
  border-radius: 8px;
}

.log::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
  border: 3px solid #f4f4f4;
}

.log::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

/* For Firefox */
.log {
  scrollbar-width: thin;
  scrollbar-color: #888 #494949;
}
</style>
