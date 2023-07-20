<script setup>
import { defineOptions, defineProps } from "vue";

defineOptions({ name: "cardGame" });
defineProps({
  image: String,
  title: String,
});
</script>

<template>
  <article class="cardGame">
    <span class="cardGame__label">{{ title }}</span>
    <img
      :src="image"
      :alt="label"
      loading="lazy"
      :onload="(e) => e.target.classList.add('loaded')"
    />
    <button>Play Demo</button>
  </article>
</template>

<style lang="scss" scoped>
.cardGame {
  cursor: pointer;
  &__label {
    font-size: 16px;
  }

  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 4px;
  border: 2px solid black;
  width: 100%;

  button {
    height: 30px;
    cursor: pointer;
  }

  img {
    height: 180px;
    object-fit: cover;
    opacity: 0;
    transition: 0.3s;

    &.loaded {
      opacity: 1;
    }
  }
}
</style>
