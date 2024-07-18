<template>
  <div id="app">
    <h1>随机角色生成器</h1>
    <button @click="generateCharacter">生成角色</button>
    <div v-if="character">
      <h2>角色信息</h2>
      <p>名字: {{ character.name }}</p>
      <p>性别: {{ character.gender }}</p>
      <p>年龄: {{ character.age }}</p>
      <p>力量: {{ character.strength }}</p>
      <p>敏捷: {{ character.agility }}</p>
      <p>魅力: {{ character.charisma }}</p>
      <p>智力: {{ character.intelligence }}</p>
    </div>
    <h2>当前时间</h2>
    <p>{{ formattedTime }}</p>
    <button @click="toggleTimer">{{ isRunning ? '暂停' : '继续' }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue';

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
    const character = ref<Character | null>(null);
    const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Edward'];
    const genders = ['男', '女'];

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

    return { character, generateCharacter, formattedTime, toggleTimer, isRunning };
  }
});
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
