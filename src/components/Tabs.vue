<template>
  <div class="tabs">
    <div class="tab-buttons">
      <button @click="selectTab('travel')" :class="{ active: selectedTab === 'travel' }">{{ $t('travel') }}</button>
      <button @click="selectTab('team')" :class="{ active: selectedTab === 'team' }">{{ $t('team') }}</button>
      <button @click="selectTab('items')" :class="{ active: selectedTab === 'items' }">{{ $t('items') }}</button>
    </div>
    <div class="tab-content">
      <div v-if="selectedTab === 'travel'">{{ $t('travelContent') }}</div>
      <div v-if="selectedTab === 'team'">
        <p>{{ $t('teamSpeed') }}: {{ teamSpeed }} {{ $t('distanceUnit') }}/min</p>
        <table>
          <thead>
            <tr>
              <th>{{ $t('name') }}</th>
              <th>{{ $t('gender') }}</th>
              <th>{{ $t('age') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in team" :key="member.name" @click="selectMember(member)" :class="{ player: isPlayer(member) }">
              <td>{{ member.name }} <span v-if="isPlayer(member)">★</span></td>
              <td>{{ member.gender }}</td>
              <td>{{ member.age }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="selectedTab === 'items'">
        <table>
          <thead>
            <tr>
              <th>{{ $t('name') }}</th>
              <th>{{ $t('quantity') }}</th>
              <th>{{ $t('totalWeight') }}</th>
              <th>{{ $t('totalValue') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.weight * item.quantity }}</td>
              <td>{{ item.value * item.quantity }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Character } from '../types/character'; // 导入 Character 接口
import { Item } from '../types/item'; // 导入 Item 接口

export default defineComponent({
  name: 'Tabs',
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
    }
  },
  emits: ['memberSelected'],
  setup(props, { emit }) {
    const selectedTab = ref('travel');

    const selectTab = (tab: string) => {
      selectedTab.value = tab;
    };

    const selectMember = (member: Character) => {
      emit('memberSelected', member);
    };

    const isPlayer = (member: Character) => {
      return member.name === props.player.name;
    };

    return { selectedTab, selectTab, selectMember, isPlayer };
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

tr {
  cursor: pointer; /* 鼠标悬停时显示指针 */
}

tr.player {
  font-weight: bold; /* 玩家角色加粗显示 */
}

* {
  user-select: none; /* 禁止选择文本 */
}
</style>
