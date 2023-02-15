<script setup lang="ts">
import { RouterView } from "vue-router";
import { VueNotificationList } from "@dafcoe/vue-notification";
import ThemeToggler from "./components/ThemeToggler.vue";
</script>

<template>
  <div
    class="bg-white dark:bg-gray-900 min-h-screen overflow-hidden transition-colors duration-500"
  >
    <ThemeToggler />
    <div id="content">
      <vue-notification-list position="top-right"></vue-notification-list>
      <RouterView />
    </div>
  </div>
</template>

<style>
@media screen and (max-width: 400px) {
  .notification-list-item[data-v-0730d53e] {
    margin: 8px 0px !important;
  }
}
</style>
