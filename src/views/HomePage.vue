<script setup>
import { defineOptions, ref } from "vue";
import { refresh } from "@/services/Auth";

defineOptions({ name: "HomePage" });
</script>

<template>
  <div><button @click="refresh">refresh token</button></div>
</template>

<style lang="scss" scoped></style>
