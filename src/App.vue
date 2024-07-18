<template>
  <div id="app">
    <button @click="generateCharacter">{{ $t('generateCharacter') }}</button>
    <div v-if="character">
      <h2>{{ $t('characterInfo') }}</h2>
      <p>{{ $t('name') }}: {{ character.name }}</p>
      <p>{{ $t('gender') }}: {{ character.gender }}</p>
      <p>{{ $t('age') }}: {{ character.age }}</p>
      <p>{{ $t('strength') }}: {{ character.strength }}</p>
      <p>{{ $t('agility') }}: {{ character.agility }}</p>
      <p>{{ $t('charisma') }}: {{ character.charisma }}</p>
      <p>{{ $t('intelligence') }}: {{ character.intelligence }}</p>
    </div>
    <h2>{{ $t('currentTime') }}</h2>
    <p>{{ formattedTime }}</p>
    <button @click="toggleTimer">{{ isRunning ? $t('pause') : $t('resume') }}</button>
    <div>
      <button @click="changeLanguage('en')">English</button>
      <button @click="changeLanguage('zh')">中文</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

interface Character {
  name: string;
  gender: string;
  age: number;
  strength: number;
  agility: number;
  charisma: number;
  intelligence: number;
}

export default defineComponent({
  setup() {
    const { t, locale } = useI18n();

    const character = ref<Character | null>(null);
    const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Edward'];
    const genders = [t('male'), t('female')];

    const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    const getRandomValue = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

    const generateCharacter = () => {
      character.value = {
        name: getRandomElement(names),
        gender: getRandomElement(genders),
        age: getRandomValue(18, 60),
        strength: getRandomValue(1, 10),
        agility: getRandomValue(1, 10),
        charisma: getRandomValue(1, 10),
        intelligence: getRandomValue(1, 10),
      };
    };

    const currentTime = ref(new Date());
    const isRunning = ref(false);
    let timer: number | undefined;

    const updateTime = () => {
      currentTime.value = new Date(currentTime.value.getTime() + 60000); // 每分钟增加60,000毫秒
    };

    const toggleTimer = () => {
      if (isRunning.value) {
        clearInterval(timer);
      } else {
        timer = window.setInterval(updateTime, 200) as unknown as number;
      }
      isRunning.value = !isRunning.value;
    };

    const formattedTime = computed(() => {
      const year = currentTime.value.getFullYear();
      const month = String(currentTime.value.getMonth() + 1).padStart(2, '0');
      const day = String(currentTime.value.getDate()).padStart(2, '0');
      const hours = String(currentTime.value.getHours()).padStart(2, '0');
      const minutes = String(currentTime.value.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    });

    onMounted(() => {
      timer = window.setInterval(updateTime, 200) as unknown as number;
      isRunning.value = true;
    });

    onUnmounted(() => {
      clearInterval(timer);
    });

    const changeLanguage = (lang: string) => {
      locale.value = lang;
    };

    return { character, generateCharacter, formattedTime, toggleTimer, isRunning, changeLanguage, t };
  }
});
</script>

