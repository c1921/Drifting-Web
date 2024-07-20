<template>
  <footer>
    <div>
      <select @change="changeLanguage($event)">
        <option value="en">English</option>
        <option value="zh">中文</option>
      </select>
    </div>
    <button @click="toggleTheme">{{ currentTheme === 'light' ? $t('switchToDarkMode') : $t('switchToLightMode') }}</button>
  </footer>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Footer',
  props: {
    currentTheme: {
      type: String as PropType<'light' | 'dark'>,
      required: true
    }
  },
  emits: ['changeLanguage', 'toggleTheme'],
  setup(props, { emit }) {
    const changeLanguage = (event: Event) => {
      const select = event.target as HTMLSelectElement;
      emit('changeLanguage', select.value);
    };

    const toggleTheme = () => {
      emit('toggleTheme');
    };

    return { changeLanguage, toggleTheme };
  }
});
</script>

<style scoped>
footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  color: white;
}

select {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  margin-right: 0.5rem;
}

select:hover {
  background-color: #357a38;
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

button:focus, select:focus {
  outline: none;
}
</style>
