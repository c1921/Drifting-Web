<template>
  <div class="tabs">
    <div class="tab-buttons">
      <button @click="selectTab('travel')" :class="{ active: selectedTab === 'travel' }">{{ $t('travel') }}</button>
      <button @click="selectTab('team')" :class="{ active: selectedTab === 'team' }">{{ $t('team') }}</button>
      <button @click="selectTab('items')" :class="{ active: selectedTab === 'items' }">{{ $t('items') }}</button>
    </div>
    <div class="tab-content">
      <TravelTab v-if="selectedTab === 'travel'" :travelDistance="travelDistance" :isTraveling="isTraveling" @toggleTravelState="toggleTravelState" />
      <TeamTab v-if="selectedTab === 'team'" :team="team" :teamSpeed="teamSpeed" :player="player" @memberSelected="selectMember" />
      <ItemsTab v-if="selectedTab === 'items'" :items="items" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Character } from '../types/character';
import { Item } from '../types/item';
import TravelTab from './TravelTab.vue';
import TeamTab from './TeamTab.vue';
import ItemsTab from './ItemsTab.vue';

export default defineComponent({
  name: 'Tabs',
  components: {
    TravelTab,
    TeamTab,
    ItemsTab
  },
  props: {
    team: {
      type: Array as PropType<Character[]>,
      required: true
    },
    player: {
      type: Object as PropType<Character>,
      required: true
    },
    teamSpeed: {
      type: Number,
      required: true
    },
    items: {
      type: Array as PropType<Item[]>,
      required: true
    },
    travelDistance: {
      type: Number,
      required: true
    },
    isTraveling: {
      type: Boolean,
      required: true
    }
  },
  emits: ['memberSelected', 'toggleTravelState'],
  setup(props, { emit }) {
    const selectedTab = ref('travel');

    const selectTab = (tab: string) => {
      selectedTab.value = tab;
    };

    const selectMember = (member: Character) => {
      emit('memberSelected', member);
    };

    const toggleTravelState = () => {
      emit('toggleTravelState');
    };

    return { selectedTab, selectTab, selectMember, toggleTravelState };
  }
});
</script>

<style lang="scss" scoped>
@import '../assets//variables.scss';

.tabs {
  display: flex;
  flex-direction: column;
}

.tab-buttons {
  display: flex;
  margin-bottom: 1rem;
}

.tab-buttons button {
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  background-color: #4a4a4a;
  color: white;
}

.tab-buttons button.active {
  background-color: #42b983;
  color: white;
}

.tab-content {
  padding: 1rem;
  border-radius: 4px;
  background: $sub-bg-color;
}
</style>
