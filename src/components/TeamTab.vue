<template>
  <div>
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
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Character } from '../types/character';

export default defineComponent({
  name: 'TeamTab',
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
    }
  },
  emits: ['memberSelected'],
  setup(props, { emit }) {
    const selectMember = (member: Character) => {
      emit('memberSelected', member);
    };

    const isPlayer = (member: Character) => {
      return member.id === props.player.id;
    };

    return { selectMember, isPlayer };
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

tr {
  cursor: pointer; /* 鼠标悬停时显示指针 */
}

tr.player {
  font-weight: bold; /* 玩家角色加粗显示 */
}
</style>
