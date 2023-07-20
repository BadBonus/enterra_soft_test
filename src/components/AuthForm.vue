<script setup>
import { defineOptions, defineEmits, ref } from "vue";

defineOptions({
  name: "AuthForm",
});

const emit = defineEmits(["request"]);

const user = ref({
  login: "richard",
  password: "poker",
});
const isLoading = ref(false);

const action = async () => {
  isLoading.value = true;

  await emit("request", user.value.login, user.value.password);
  isLoading.value = true;
};
</script>

<template>
  <form
    @submit.prevent="action"
    :disabled="isLoading ?? 'disabled'"
  >
    <span v-if="isLoading"><b>Loading</b></span>

    <template v-if="!isLoading">
      <div class="inputWrapper">
        <label for="login">Ваш логин</label>
        <input
          v-model="user.login"
          id="login"
          type="text"
          placeholder="Введите логин"
          autocomplete="off"
          :disabled="isLoading ?? 'disabled'"
          required
        />
      </div>
      <div class="inputWrapper">
        <label for="password">Ваш пароль</label>
        <input
          v-model="user.password"
          id="password"
          type="password"
          placeholder="Введите пароль"
          autocomplete="off"
          :disabled="isLoading ?? 'disabled'"
          required
        />
      </div>

      <input
        type="submit"
        value="Отправить"
      />
    </template>
  </form>
</template>

<style lang="scss" scoped>
form {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  max-width: 390px;
  width: 100%;
  border: 2px dashed;
  height: fit-content;
  padding-bottom: 16px;
  padding-top: 12px;

  &:disabled {
    opacity: 0.5;
  }

  .inputWrapper {
    &:first-of-type {
      margin-top: 0;
    }
    margin: 15px auto;
    display: flex;
    flex-direction: column;
    width: 50%;
  }

  input[type="submit"] {
    background: unset;
    border: 2px solid;
    font-weight: bold;
    padding: 6px;
    transition: 0.3s;

    &:hover {
      color: white;
      background: black;
    }
  }
}
</style>
