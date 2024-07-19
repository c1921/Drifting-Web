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
    <p>{{ $t('walkingSpeed') }}: {{ character.walkingSpeed }} {{ $t('distanceUnit') }}/min</p>
    <p>{{ $t('ridingSpeed') }}: {{ character.ridingSpeed }} {{ $t('distanceUnit') }}/min</p>
    <p>{{ $t('isRiding') }}: {{ character.isRiding ? $t('yes') : $t('no') }}</p>
    <div>
      <p>{{ $t('satiety') }}: {{ character.satiety.toFixed(2) }}</p>
      <progress :value="character.satiety" max="100"></progress>
    </div>
    <div>
      <p>{{ $t('hydration') }}: {{ character.hydration.toFixed(2) }}</p>
      <progress :value="character.hydration" max="100"></progress>
    </div>
    <div>
      <p>{{ $t('stamina') }}: {{ character.stamina.toFixed(2) }}</p>
      <progress :value="character.stamina" max="100"></progress>
    </div>
    <div>
      <p>{{ $t('mood') }}: {{ character.mood.toFixed(2) }}</p>
      <progress :value="character.mood" max="100"></progress>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Character } from '../types/character';

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
  border-radius: 8px;
}

progress {
  width: 100%;
  height: 20px;
}
</style>
