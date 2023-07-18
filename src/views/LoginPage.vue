<script setup>
import { defineOptions, ref } from "vue";

defineOptions({ name: "LoginPage" });
</script>

<template>
  <form>
    <div>
      <label for="login">Ваш логин</label>
      <input
        id="login"
        type="text"
        placeholder="Введите логин"
      />
    </div>
    <div>
      <label for="password">Ваш пароль</label>
      <input
        id="password"
        type="password"
        placeholder="Введите пароль"
      />
    </div>

    <button>Отправить</button>
  </form>
</template>

<style lang="scss" scoped></style>
