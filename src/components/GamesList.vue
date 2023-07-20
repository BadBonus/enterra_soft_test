<script setup>
import { ref, toRefs, computed, reactive } from "vue";
import { getListOfGames, getLinkOfGame } from "@/services/BaseRequests";
import CardGame from "./CardGame";

const games = ref([]);
const isLoadingGames = ref(true);
const currentPage = ref(0);
const maxCountOfPages = ref(0);

const getGames = (numberPage) => {
  if (!games.value[numberPage] || !games.value[numberPage].length) {
    isLoadingGames.value = true;
    getListOfGames(numberPage)
      .then(({ data }) => {
        games.value[numberPage] = data?.data ?? [];
        currentPage.value = numberPage;
        maxCountOfPages.value = data.meta["page-count"];
      })
      .finally(() => (isLoadingGames.value = false));
  } else {
    currentPage.value = numberPage;
  }
};

const gameRequest = (id) => {
  getLinkOfGame(id).then(({ data }) => {
    const gameUrl = data.data[0].attributes["launch-options"]["game-url"];
    const gameName = data.data[0].attributes["type"];

    window.open(gameUrl, gameName);
  });
};

const publishGames = computed(() => {
  return games.value[currentPage.value].map(({ id, attributes: { image, title } }) => ({
    id,
    image,
    title,
  }));
});

getGames(1);
</script>

<template>
  <h1 v-if="isLoadingGames">Loading...</h1>

  <div
    class="gamesList"
    v-if="!isLoadingGames"
  >
    <CardGame
      v-for="item in publishGames"
      :key="item.id"
      :image="item.image"
      :title="item.title"
      @click="gameRequest(item.id)"
    >
    </CardGame>
    <div class="controlBlock">
      <button
        :disabled="currentPage <= 1"
        @click="getGames(currentPage - 1)"
      >
        &larr;
      </button>
      <button
        :disabled="currentPage >= maxCountOfPages"
        @click="getGames(currentPage + 1)"
      >
        &rarr;
      </button>
    </div>
    <div class="controlBlock">
      <button
        :disabled="currentPage <= 1"
        @click="getGames(currentPage - 1)"
      >
        &larr;
      </button>
      <button
        :disabled="currentPage >= maxCountOfPages"
        @click="getGames(currentPage + 1)"
      >
        &rarr;
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gamesList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  position: relative;
  padding: 40px 0;

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
}

h1 {
  margin-top: 70px;
  height: 40px;
  animation: 1s linear 0s infinite roundMeBaby;
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
