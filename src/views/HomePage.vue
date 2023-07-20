<script setup>
import { defineOptions, ref, computed } from "vue";
import { getBalance, getListOfGames, getLinkOfGame } from "@/services/BaseRequests";
import SideBar from "@/components/SideBar";
import CardGame from "@/components/CardGame";

defineOptions({ name: "HomePage" });

const balance = ref(null);
const games = ref(null);
const pageOfGames = ref(0);
const isLoadingGames = ref(true);
const isLoadingBalance = ref(true);

getBalance().then(({ data }) => {
  isLoadingBalance.value = false;
  balance.value = data;
});
setInterval(() => {
  getBalance().then(({ data }) => (balance.value = data));
}, 30_000);
getListOfGames().then(({ data }) => {
  games.value = data;
  isLoadingGames.value = false;
});

const publishBalance = computed(() => {
  const data = balance.value?.data ?? [];
  return data.map(({ id, attributes: { currency, available: value } }) => ({
    id,
    currency,
    value,
  }));
});

const publishGames = computed(() => {
  const data = games.value?.data ?? [];
  const start = 15 * pageOfGames.value;
  return data.slice(start, start + 15).map(({ id, attributes: { image, title } }) => ({
    id,
    image,
    title,
  }));
});

const changeStep = (step) => (pageOfGames.value += step);
</script>

<template>
  <div class="flexWrapper">
    <main>
      <template v-if="!isLoadingGames">
        <CardGame
          v-for="item in publishGames"
          :key="item.id"
          :image="item.image"
          :title="item.title"
        >
        </CardGame>
      </template>

      <h1 v-if="isLoadingGames">Loading...</h1>

      <div class="controlBlock">
        <button
          :disabled="pageOfGames <= 0"
          @click="changeStep(-1)"
        >
          &larr;
        </button>
        <button
          :disabled="publishGames.length < 15"
          @click="changeStep(1)"
        >
          &rarr;
        </button>
      </div>
      <div class="controlBlock">
        <button
          :disabled="pageOfGames <= 0"
          @click="changeStep(-1)"
        >
          &larr;
        </button>
        <button
          :disabled="publishGames.length < 15"
          @click="changeStep(1)"
        >
          &rarr;
        </button>
      </div>
    </main>
    <SideBar
      :isLoading="isLoadingBalance"
      :balance="publishBalance"
    />
  </div>
</template>

<style lang="scss">
.flexWrapper {
  display: flex;
  @media only screen and (max-width: 500px) {
    flex-direction: column-reverse;
  }
}
main {
  width: 100%;
  border: 2px dashed black;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  position: relative;
  padding: 40px 0;

  h1 {
    margin-top: 70px;
    height: 40px;
    animation: 1s linear 0s infinite roundMeBaby;
  }
}
aside {
  max-width: 250px;
  width: 100%;

  @media only screen and (max-width: 500px) {
    max-width: unset;
  }
}

.controlBlock {
  position: absolute;
  right: 0;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  width: 70px;
  top: 6px;
  width: 75px;
  display: flex;
  justify-content: space-between;

  &:last-of-type {
    top: unset;
    bottom: 6px;
  }

  button {
    border-radius: 100px;
    width: 34px;
    height: 34px;
    cursor: pointer;
    background: none;
    border: 2px dashed black;
    transition: 0.3s;
    &:hover {
      background: black;
      color: white;
      border-color: white;
    }

    &:disabled {
      cursor: default;
      opacity: 0.5;
      pointer-events: none;
    }
  }
}

@keyframes roundMeBaby {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
