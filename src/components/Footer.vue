<template>
  <footer>
    <div>
      <button @click="changeLanguage('en')">English</button>
      <button @click="changeLanguage('zh')">中文</button>
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
    const changeLanguage = (lang: string) => {
      emit('changeLanguage', lang);
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
  padding: 1rem;
  color: white;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-right: 0.5rem;
}

button:hover {
  background-color: #357a38;
}

button:focus {
  outline: none;
}
</style>
