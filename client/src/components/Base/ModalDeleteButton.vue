<script setup lang="ts">
import TrashCan from "@/components/icons/TrashCan.vue";

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
    class="mt-3 inline-flex w-full justify-center items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
    @click="props.onClickFunction"
    ref="cancelButtonRef"
  >
    <TrashCan class="mr-1" />
    Delete
  </button>
</template>
