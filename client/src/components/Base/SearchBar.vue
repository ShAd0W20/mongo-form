<script setup lang="ts">
const props = defineProps<{
  labelText: string;
  inputName: string;
  inputId: string;
  inputPlaceholder: string;
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>
<template>
  <div>
    <label :for="props.inputId" class="sr-only">
      {{ props.labelText }}
    </label>
    <input
      :id="props.inputId"
      :name="props.inputName"
      class="block p-2 pl-10 w-full sm:w-60 lg:w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-600 dark:focus:border-indigo-600 focus:outline-none focus:ring-1 transition-all duration-500"
      :placeholder="props.inputPlaceholder"
      :value="props.modelValue"
      @input="updateValue"
    />
  </div>
</template>
