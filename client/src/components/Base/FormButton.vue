<script setup lang="ts">
const props = defineProps<{
  buttonIcon: Object;
  buttonText: string;
}>();
</script>

<template>
  <button
    type="submit"
    class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-500"
  >
    <span
      class="absolute inset-y-0 left-0 flex items-center pl-3 transition-all duration-500"
    >
      <props.buttonIcon
        class="h-5 w-5 text-indigo-300 group-hover:text-indigo-400"
        aria-hidden="true"
      />
    </span>
    {{ buttonText }}
  </button>
</template>
