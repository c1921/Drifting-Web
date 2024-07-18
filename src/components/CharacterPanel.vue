<template>
  <div class="character-panel">
    <h2>{{ $t('characterInfo') }}</h2>
    <p>{{ $t('name') }}: {{ character.name }} <span v-if="isPlayer">★</span></p>
    <p>{{ $t('gender') }}: {{ character.gender }}</p>
    <p>{{ $t('age') }}: {{ character.age }}</p>
    <p>{{ $t('strength') }}: {{ character.strength }}</p>
    <p>{{ $t('agility') }}: {{ character.agility }}</p>
    <p>{{ $t('charisma') }}: {{ character.charisma }}</p>
    <p>{{ $t('intelligence') }}: {{ character.intelligence }}</p>
    <p>{{ $t('walkingSpeed') }}: {{ character.walkingSpeed }} m/min</p>
    <p>{{ $t('ridingSpeed') }}: {{ character.ridingSpeed }} m/min</p>
    <p>{{ $t('isRiding') }}: {{ character.isRiding ? $t('yes') : $t('no') }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Character {
  name: string;
  gender: string;
  age: number;
  strength: number;
  agility: number;
  charisma: number;
  intelligence: number;
  walkingSpeed: number;
  ridingSpeed: number;
  isRiding: boolean;
}

export default defineComponent({
  name: 'CharacterPanel',
  props: {
    character: {
      type: Object as PropType<Character>,
      required: true
    },
    isPlayer: {
      type: Boolean,
      required: true
    }
  }
});
</script>

<style scoped>
.character-panel {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  user-select: none; /* 禁止选择文本 */
}
</style>
