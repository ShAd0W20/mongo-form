<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  labelText: string;
  inputType: string;
  inputName: string;
  inputId: string;
  inputRequired: boolean;
  inputDisabled?: boolean;
  inputPlaceholder?: string;
  modelValue: string | number;
}>();

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};

const inputPlaceholder = computed(() => {
  if (props.inputPlaceholder) {
    return props.inputPlaceholder;
  }
  return "";
});
</script>

<template>
  <div class="relative z-0 mb-6 w-full group">
    <input
      :id="props.inputId"
      :name="props.inputName"
      :type="props.inputType"
      :required="props.inputRequired"
      :class="[
        'block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer',
        props.inputDisabled ? 'text-gray-400' : 'text-gray-900 dark:text-white',
      ]"
      :placeholder="inputPlaceholder"
      :value="props.modelValue"
      @input="(e) => updateValue(e)"
      :disabled="props.inputDisabled"
    />
    <label
      :for="props.inputId"
      class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-500 peer-focus:dark:text-indigo-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
    >
      {{ props.labelText }}
    </label>
  </div>
</template>
