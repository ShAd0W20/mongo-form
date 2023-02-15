<script setup lang="ts">
import CheckIcon from "../icons/CheckIcon.vue";
import LoadingState from "../icons/LoadingState.vue";
const props = defineProps({
  loading: {
    type: Boolean,
    required: false,
  },
});
</script>

<template>
  <button
    type="submit"
    :disabled="props.loading"
    class="inline-flex w-full justify-center items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
    :class="{
      'opacity-50 cursor-not-allowed': props.loading,
    }"
  >
    <CheckIcon class="mr-1" v-if="!loading" />
    <LoadingState v-if="loading" />
    <span v-if="!loading">Submit</span>
    <span v-if="loading">Submitting</span>
  </button>
</template>
