<template>
  <div id="app">
    <Header :currentTime="currentTime" :isRunning="isRunning" @toggleTimer="toggleTimer" />
    <div class="layout">
      <CharacterPanel v-if="selectedCharacter" :character="selectedCharacter" :isPlayer="isPlayer(selectedCharacter)" />
      <Tabs
        :team="team"
        :teamSpeed="teamSpeed"
        :player="player!"
        :items="items"
        :travelDistance="travelDistance"
        :isTraveling="isTraveling"
        @memberSelected="selectCharacter"
        @toggleTravelState="toggleTravelState"
      />
    </div>
    <LogPanel :log="log" />
    <Footer :currentTheme="currentTheme" @changeLanguage="changeLanguage" @toggleTheme="toggleTheme" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import CharacterPanel from './components/CharacterPanel.vue';
import Tabs from './components/Tabs.vue';
import LogPanel from './components/LogPanel.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { Character } from './types/character';
import { Item } from './types/item';
import { itemFactory, findOrCreateItem } from './factory/itemFactory';
import { v4 as uuidv4 } from 'uuid';
import { Event, events } from './types/event';

export default defineComponent({
  name: 'App',
  components: {
    CharacterPanel,
    Tabs,
    LogPanel,
    Header,
    Footer
  },
  setup() {
    const { t, locale } = useI18n();

    const player = ref<Character | null>(null);
    const team = ref<Character[]>([]);
    const selectedCharacter = ref<Character | null>(null);
    const travelDistance = ref(0);
    const isTraveling = ref(true);
    const items = ref<Item[]>([]);
    const log = ref<string[]>([]);

    const currentTime = ref(new Date());
    const isRunning = ref(false);
    const currentTheme = ref('light');

    const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Edward'];
    const genders = [t('male'), t('female')];

    const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    const getRandomValue = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

    const generateCharacter = (): Character => {
      return {
        id: uuidv4(),
        name: getRandomElement(names),
        gender: getRandomElement(genders),
        age: getRandomValue(18, 60),
        strength: getRandomValue(1, 10),
        agility: getRandomValue(1, 10),
        charisma: getRandomValue(1, 10),
        intelligence: getRandomValue(1, 10),
        walkingSpeed: 70,
        ridingSpeed: getRandomValue(100, 150),
        isRiding: false,
        satiety: 100,
        hydration: 100,
        stamina: 100,
        mood: 100
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
        itemFactory('Apple', getRandomValue(1, 10)),
        itemFactory('Sword', getRandomValue(1, 5)),
        itemFactory('Wooden Shield', getRandomValue(1, 5))
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

    let timer: number | undefined;

    const updateTime = () => {
      currentTime.value = new Date(currentTime.value.getTime() + 60000);
      if (isTraveling.value) {
        travelDistance.value += teamSpeed.value;
        team.value.forEach(character => {
          character.satiety = parseFloat((Math.max(character.satiety - 0.1, 0)).toFixed(2));
          character.hydration = parseFloat((Math.max(character.hydration - 0.2, 0)).toFixed(2));
          character.stamina = parseFloat((Math.max(character.stamina - 0.3, 0)).toFixed(2));
          character.mood = parseFloat((Math.max(character.mood - 0.05, 0)).toFixed(2));
        });
        triggerEvents();
      } else {
        team.value.forEach(character => {
          character.stamina = parseFloat((Math.min(character.stamina + 1.5, 100)).toFixed(2));
          character.mood = parseFloat((Math.min(character.mood + 0.1, 100)).toFixed(2));
        });
      }
    };

    const triggerEvents = () => {
      const random = Math.random();
      if (random < 0.3) {
        events[0].effect(items.value, log.value);
      } else if (random < 0.35) {
        events[1].effect(items.value, log.value);
      }
    };

    const toggleTimer = () => {
      if (isRunning.value) {
        clearInterval(timer);
      } else {
        timer = window.setInterval(updateTime, 200) as unknown as number;
      }
      isRunning.value = !isRunning.value;
    };

    const toggleTravelState = () => {
      isTraveling.value = !isTraveling.value;
    };

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

    return {
      player,
      team,
      selectedCharacter,
      toggleTimer,
      isRunning,
      changeLanguage,
      t,
      toggleTheme,
      currentTheme,
      selectCharacter,
      isPlayer,
      travelDistance,
      teamSpeed,
      items,
      isTraveling,
      toggleTravelState,
      log,
      currentTime
    };
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

* {
  user-select: none;
}
</style>
