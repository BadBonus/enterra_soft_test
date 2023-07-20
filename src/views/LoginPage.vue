<script setup>
import { defineOptions } from "vue";
import { useRouter } from "vue-router";
import { signIn } from "@/services/Auth";
import AuthForm from "@/components/AuthForm";

const router = useRouter();

defineOptions({ name: "LoginPage" });

const sign = (login, password) => {
  signIn({ login, password }).then(() => {
    router.push("/home");
  });
};
</script>

<template>
  <AuthForm @request="sign" />
</template>
