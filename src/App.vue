<template>
  <div id="app">
    <div class="layout">
      <CharacterPanel v-if="selectedCharacter" :character="selectedCharacter" :isPlayer="isPlayer(selectedCharacter)" />
      <Tabs :team="team" :teamSpeed="teamSpeed" :player="player!" :items="items" @memberSelected="selectCharacter" />
    </div>
    <p>{{ $t('currentTime') }}: {{ formattedTime }}</p>
    <p>{{ $t('travelDistance') }}: {{ travelDistance }} {{ $t('distanceUnit') }}</p>
    <button @click="toggleTimer">{{ isRunning ? $t('pause') : $t('resume') }}</button>
    <div>
      <button @click="changeLanguage('en')">English</button>
      <button @click="changeLanguage('zh')">中文</button>
    </div>
    <button @click="toggleTheme">{{ currentTheme === 'light' ? $t('switchToDarkMode') : $t('switchToLightMode') }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import CharacterPanel from './components/CharacterPanel.vue';
import Tabs from './components/Tabs.vue';
import { Character } from './types/character';
import { Item } from './types/item';
import { itemFactory } from './factory/itemFactory';
import { v4 as uuidv4 } from 'uuid';

export default defineComponent({
  name: 'App',
  components: {
    CharacterPanel,
    Tabs
  },
  setup() {
    const { t, locale } = useI18n();

    const player = ref<Character | null>(null);
    const team = ref<Character[]>([]);
    const selectedCharacter = ref<Character | null>(null);
    const travelDistance = ref(0);
    const items = ref<Item[]>([]);

    const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Edward'];
    const genders = [t('male'), t('female')];

    const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    const getRandomValue = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

    const generateCharacter = (): Character => {
      return {
        id: uuidv4(),  // 生成唯一标识符
        name: getRandomElement(names),
        gender: getRandomElement(genders),
        age: getRandomValue(18, 60),
        strength: getRandomValue(1, 10),
        agility: getRandomValue(1, 10),
        charisma: getRandomValue(1, 10),
        intelligence: getRandomValue(1, 10),
        walkingSpeed: 70,
        ridingSpeed: getRandomValue(100, 150),
        isRiding: false
      };
    };

    const initializeGame = () => {
      player.value = generateCharacter();
      team.value = [player.value];
      for (let i = 0; i < 3; i++) {
        team.value.push(generateCharacter());
      }
      selectedCharacter.value = player.value;

      items.value = [
        itemFactory('food', getRandomValue(1, 10)),
        itemFactory('weapon', getRandomValue(1, 5)),
        itemFactory('shield', getRandomValue(1, 5))
      ];
    };

    const selectCharacter = (character: Character) => {
      selectedCharacter.value = character;
    };

    const isPlayer = (character: Character) => {
      return character.id === player.value?.id;
    };

    const teamSpeed = computed(() => {
      return Math.min(...team.value.map(character => character.isRiding ? character.ridingSpeed : character.walkingSpeed));
    });

    const currentTime = ref(new Date());
    const isRunning = ref(false);
    let timer: number | undefined;

    const updateTime = () => {
      currentTime.value = new Date(currentTime.value.getTime() + 60000); // 每分钟增加60,000毫秒
      travelDistance.value += teamSpeed.value;
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

    const currentTheme = ref('light');

    const setTheme = (theme: string) => {
      document.documentElement.setAttribute('data-theme', theme);
      currentTheme.value = theme;
    };

    const toggleTheme = () => {
      const newTheme = currentTheme.value === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    };

    onMounted(() => {
      initializeGame();
      timer = window.setInterval(updateTime, 200) as unknown as number;
      isRunning.value = true;

      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
      setTheme(prefersDarkScheme.matches ? 'dark' : 'light');

      prefersDarkScheme.addEventListener('change', (e) => {
        setTheme(e.matches ? 'dark' : 'light');
      });
    });

    onUnmounted(() => {
      clearInterval(timer);
    });

    const changeLanguage = (lang: string) => {
      locale.value = lang;
    };

    return { player, team, selectedCharacter, formattedTime, toggleTimer, isRunning, changeLanguage, t, toggleTheme, currentTheme, selectCharacter, isPlayer, travelDistance, teamSpeed, items };
  }
});
</script>

<style scoped>
.layout {
  display: flex;
}

.character-panel {
  width: 20%;
}

.tabs {
  width: 80%;
  margin-left: 1rem;
}

button {
  background-color: #4a4a4a; /* 深灰色背景 */
  color: white; /* 白色文字 */
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #616161; /* 浅灰色背景 */
}

button:active {
  background-color: #757575; /* 更浅的灰色背景 */
}

button:focus {
  outline: none;
}

* {
  user-select: none; /* 禁止选择文本 */
}
</style>
