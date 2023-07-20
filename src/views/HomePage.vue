<script setup>
import { defineOptions } from "vue";
import { logOut } from "@/helpers";
import Balance from "@/components/Balance";
import GamesList from "@/components/GamesList";

defineOptions({ name: "HomePage" });
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
      <GamesList />
    </main>
    <Balance />
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
</style>
