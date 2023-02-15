<script setup lang="ts">
import XMark from "../icons/X-mark.vue";

const props = defineProps({
  onClickFunction: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <button
    type="button"
    class="mt-3 inline-flex w-full justify-center items-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
    @click="props.onClickFunction"
    ref="cancelButtonRef"
  >
    <XMark class="mr-1" />
    Cancel
  </button>
</template>
