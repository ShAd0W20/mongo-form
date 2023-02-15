<script setup lang="ts">
const props = defineProps<{
  labelText: string;
  selectName: string;
  selectId: string;
  selectRequired: boolean;
  modelValue: string | number | undefined;
  focus?: Function;
}>();

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};

const handleFocusFunction = () => {
  if (props.focus) {
    props.focus();
  }
};
</script>

<template>
  <div class="relative z-0 mb-6 w-full group">
    <label
      :for="props.selectName"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
    >
      {{ props.labelText }}
    </label>
    <select
      :id="props.selectId"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
      :value="props.modelValue"
      :required="props.selectRequired"
      autocomplete="false"
      @change="updateValue"
      @focus="handleFocusFunction"
    >
      <slot name="options"></slot>
    </select>
  </div>
</template>
