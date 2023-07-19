<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const logOut = () => {
  localStorage.clear();
  router.push("/");
};
const isLogged = ref(localStorage.getItem("token"));
</script>

<template>
  <notifications />
  <button
    v-if="isLogged"
    @click="logOut"
  >
    Exit
  </button>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
