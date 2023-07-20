<script setup>
import { defineOptions, defineProps, defineEmits, ref, computed } from "vue";
import CardGame from "./CardGame";

defineOptions({ name: "GamesList" });
const props = defineProps({
  games: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["action"]);

const pageOfGames = ref(0);

const publishGames = computed(() => {
  const start = 15 * pageOfGames.value;
  return props.games.slice(start, start + 15).map(({ id, attributes: { image, title } }) => ({
    id,
    image,
    title,
  }));
});
const changeStep = (step) => (pageOfGames.value += step);
</script>

<template>
  <div class="gamesList">
    <CardGame
      v-for="item in publishGames"
      :key="item.id"
      :image="item.image"
      :title="item.title"
      @click="emit('action', item.id)"
    >
    </CardGame>
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
</style>
