<template>
  <div>
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
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Item, Food, Weapon, Shield } from '../types/item';

export default defineComponent({
  name: 'ItemsTab',
  props: {
    items: {
      type: Array as PropType<Item[]>,
      required: true
    }
  },
  setup(props) {
    const tooltipContent = ref('');
    const tooltip = ref<HTMLElement | null>(null);

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

    return { showTooltip, hideTooltip, tooltipContent, tooltip };
  }
});
</script>

<style scoped>
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
</style>
