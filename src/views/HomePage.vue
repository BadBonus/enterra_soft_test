<script setup>
import { defineOptions, ref, computed } from "vue";
import { getBalance, getListOfGames, getLinkOfGame } from "@/services/BaseRequests";
import { logOut } from "@/helpers";
import SideBar from "@/components/SideBar";
import GamesList from "@/components/GamesList";

defineOptions({ name: "HomePage" });

const balance = ref(null);
const games = ref(null);
const isLoadingGames = ref(true);
const isLoadingBalance = ref(true);

getBalance()
  .then(({ data }) => {
    balance.value = data;
  })
  .finally(() => (isLoadingBalance.value = false));

setInterval(() => {
  getBalance().then(({ data }) => (balance.value = data));
}, 30_000);

getListOfGames()
  .then(({ data }) => {
    games.value = data?.data ?? [];
  })
  .finally(() => (isLoadingGames.value = false));

const publishBalance = computed(() => {
  const data = balance.value?.data ?? [];
  return data.map(({ id, attributes: { currency, available: value } }) => ({
    id,
    currency,
    value,
  }));
});

const gameRequest = (id) => {
  getLinkOfGame(id).then(({ data }) => {
    const gameUrl = data.data[0].attributes["launch-options"]["game-url"];
    const gameName = data.data[0].attributes["type"];

    window.open(gameUrl, gameName);
  });
};
</script>

<template>
  <button
    @click="logOut"
    class="leaveBtn"
  >
    Exit
  </button>
  <div class="flexWrapper">
    <main>
      <GamesList
        :games="games"
        v-if="!isLoadingGames"
        @action="gameRequest"
      />

      <h1 v-if="isLoadingGames">Loading...</h1>
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

.leaveBtn {
  margin-bottom: 12px;
  display: block;
  width: 55px;
  height: 35px;
  border: 2px dashed black;
  border-radius: 100px;
  margin-left: auto;
  margin-right: 4px;
  background: none;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    transform: scale(1.2);
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
