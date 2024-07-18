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
            <tr v-for="member in team" :key="member.id" @click="selectMember(member)" :class="{ player: isPlayer(member) }">
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
            <tr v-for="item in items" :key="item.name" class="tooltip-container" @mousemove="showTooltip($event, item)" @mouseleave="hideTooltip">
              <td>{{ item.name }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.weight * item.quantity }}</td>
              <td>{{ item.value * item.quantity }}</td>
            </tr>
          </tbody>
        </table>
        <div class="tooltip" ref="tooltip" v-html="tooltipContent"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Character } from '../types/character';
import { Item, Food, Weapon, Shield } from '../types/item';

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
    const tooltipContent = ref('');
    const tooltip = ref<HTMLElement | null>(null);

    const selectTab = (tab: string) => {
      selectedTab.value = tab;
    };

    const selectMember = (member: Character) => {
      emit('memberSelected', member);
    };

    const isPlayer = (member: Character) => {
      return member.id === props.player.id;
    };

    const showTooltip = (event: MouseEvent, item: Item) => {
      if (!tooltip.value) return;

      tooltipContent.value = `Name: ${item.name}<br>Weight: ${item.weight}<br>Value: ${item.value}`;
      if ('nutrition' in item) {
        tooltipContent.value += `<br>Nutrition: ${(item as Food).nutrition}`;
        tooltipContent.value += `<br>Hydration: ${(item as Food).hydration}`;
        tooltipContent.value += `<br>Taste: ${(item as Food).taste}`;
      }
      if ('attackPower' in item) {
        tooltipContent.value += `<br>Attack Power: ${(item as Weapon).attackPower}`;
      }
      if ('defense' in item) {
        tooltipContent.value += `<br>Defense: ${(item as Shield).defense}`;
      }

      tooltip.value.style.display = 'block';
      tooltip.value.style.left = `${event.pageX + 10}px`;
      tooltip.value.style.top = `${event.pageY + 10}px`;
    };

    const hideTooltip = () => {
      if (tooltip.value) {
        tooltip.value.style.display = 'none';
      }
    };

    return { selectedTab, selectTab, selectMember, isPlayer, showTooltip, hideTooltip, tooltipContent, tooltip };
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
  background-color: #4a4a4a; /* 深灰色背景 */
  color: white; /* 白色文字 */
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
  background-color: #333; /* 深灰色背景 */
  color: white; /* 白色文字 */
}

tr {
  cursor: pointer; /* 鼠标悬停时显示指针 */
}

tr.player {
  font-weight: bold; /* 玩家角色加粗显示 */
}

.tooltip-container {
  position: relative;
}

.tooltip {
  display: none;
  position: absolute;
  background-color: black;
  color: #fff;
  text-align: left; /* 左对齐文本 */
  border-radius: 5px;
  padding: 5px;
  z-index: 1000;
  white-space: nowrap;
}

* {
  user-select: none; /* 禁止选择文本 */
}
</style>
