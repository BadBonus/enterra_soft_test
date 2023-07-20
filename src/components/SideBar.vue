<script setup>
import { defineOptions, defineProps } from "vue";
defineOptions({
  name: "Sidebar",
});
defineProps({
  balance: {
    type: Array,
    default: () => [],
  },
  isLoading: Boolean,
});
</script>
<template>
  <aside>
    <span v-if="isLoading">Loading...</span>
    <template v-if="!isLoading">
      <div
        v-for="item in balance"
        :key="item.id"
      >
        <span> баланс {{ item.currency }} </span>
        <p>{{ item.value }}</p>
      </div>
    </template>
  </aside>
</template>

<style lang="scss" scoped>
aside {
  max-width: 250px;
  width: 100%;
  height: fit-content;
  border: 2px dashed;
  margin-left: 8px;
  padding: 4px;
}
span {
  font-size: 18px;
  font-weight: bold;
}
</style>
