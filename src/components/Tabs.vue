<template>
  <div class="tabs">
    <div class="tab-buttons">
      <button @click="selectTab('travel')" :class="{ active: selectedTab === 'travel' }">{{ $t('travel') }}</button>
      <button @click="selectTab('team')" :class="{ active: selectedTab === 'team' }">{{ $t('team') }}</button>
    </div>
    <div class="tab-content">
      <div v-if="selectedTab === 'travel'">{{ $t('travelContent') }}</div>
      <div v-if="selectedTab === 'team'">
        <table>
          <thead>
            <tr>
              <th>{{ $t('name') }}</th>
              <th>{{ $t('gender') }}</th>
              <th>{{ $t('age') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in team" :key="member.name">
              <td>{{ member.name }}</td>
              <td>{{ member.gender }}</td>
              <td>{{ member.age }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

interface Character {
  name: string;
  gender: string;
  age: number;
}

export default defineComponent({
  name: 'Tabs',
  props: {
    team: {
      type: Array as PropType<Character[]>,
      required: true
    }
  },
  setup() {
    const selectedTab = ref('travel');

    const selectTab = (tab: string) => {
      selectedTab.value = tab;
    };

    return { selectedTab, selectTab };
  }
});
</script>

<style scoped>
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
  background-color: #f0f0f0;
}

.tab-buttons button.active {
  background-color: #42b983;
  color: white;
}

.tab-content {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f4f4f4;
}
</style>
