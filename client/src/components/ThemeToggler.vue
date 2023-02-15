<script setup lang="ts">
import { onMounted } from "vue";
import Moon from "./icons/DarkIcon.vue";
import Sun from "./icons/LightIcon.vue";

const getStorageTheme = () => {
  if (localStorage.getItem("theme")) {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
};

onMounted(() => {
  getStorageTheme();
});

const handleChangeTheme = () => {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );
};
</script>

<template>
  <button
    id="theme-toggle"
    type="button"
    class="fixed bottom-4 right-4 z-50 p-2 bg-gray-100 dark:bg-gray-700 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-gray-500 dark:focus:ring-gray-400"
    @click="handleChangeTheme"
  >
    <Moon />
    <Sun />
  </button>
</template>
