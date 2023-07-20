<script setup>
import { defineOptions, ref, computed } from "vue";
import { getBalance } from "@/services/BaseRequests";

const balance = ref(null);
const isLoadingBalance = ref(true);

getBalance()
  .then(({ data }) => {
    balance.value = data;
  })
  .finally(() => (isLoadingBalance.value = false));

setInterval(() => {
  getBalance().then(({ data }) => (balance.value = data));
}, 30_000);

defineOptions({
  name: "Sidebar",
});

const publishBalance = computed(() => {
  const data = balance.value?.data ?? [];
  return data.map(({ id, attributes: { currency, available: value } }) => ({
    id,
    currency,
    value,
  }));
});
</script>
<template>
  <aside>
    <span v-if="isLoadingBalance">Loading...</span>
    <template v-if="!isLoadingBalance">
      <div
        v-for="item in publishBalance"
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
