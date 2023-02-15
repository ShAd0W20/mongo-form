<script setup lang="ts">
const props = defineProps<{
  labelText: string;
  inputType: string;
  inputName: string;
  inputId: string;
  inputRequired: boolean;
  inputPlaceholder: string;
  modelValue: string;
  position: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<template>
  <label :for="props.inputId" class="sr-only">
    {{ props.labelText }}
  </label>
  <input
    :id="props.inputId"
    :name="props.inputName"
    :type="props.inputType"
    autocomplete="Password"
    :required="props.inputRequired"
    :class="[
      'relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:text-white dark:bg-gray-800 transition-colors duration-500',
      props.position === 'top' ? 'rounded-t-md' : 'rounded-b-md',
    ]"
    :placeholder="props.inputPlaceholder"
    :value="props.modelValue"
    @input="updateValue"
  />
</template>
