<script setup>
import { defineOptions, ref } from "vue";
import { signIn } from "@/services/Auth";
import { notify } from "@kyvg/vue3-notification";

defineOptions({ name: "LoginPage" });

const login = ref("richard");
const password = ref("poker");
const isLoading = ref(false);

const sign = (e) => {
  e.preventDefault();
  isLoading.value = true;

  signIn({ login: login.value, password: password.value })
    .then((answer) => {
      if (!answer) {
        return;
      }

      const userData = answer.data.data[0];
      localStorage.setItem("token", userData.attributes.token);
      localStorage.setItem("refresh-token", userData.attributes["refresh-token"]);
      localStorage.setItem("user", userData.id);
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>

<template>
  <form
    @submit="sign"
    :disabled="isLoading ?? 'disabled'"
  >
    <span v-if="isLoading"><b>Loading</b></span> <br />

    <div class="inputWrapper">
      <label for="login">Ваш логин</label>
      <input
        v-model="login"
        id="login"
        type="text"
        placeholder="Введите логин"
        autocomplete="off"
        :disabled="isLoading ?? 'disabled'"
      />
    </div>
    <div class="inputWrapper">
      <label for="password">Ваш пароль</label>
      <input
        v-model="password"
        id="password"
        type="password"
        placeholder="Введите пароль"
        autocomplete="off"
        :disabled="isLoading ?? 'disabled'"
      />
    </div>

    <input
      type="submit"
      value="Отправить"
    />
  </form>
</template>

<style lang="scss" scoped>
form[disabled="true"] .inputWrapper {
  opacity: 0.5;
}
</style>
