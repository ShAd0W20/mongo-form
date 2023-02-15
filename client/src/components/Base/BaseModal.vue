<script setup lang="ts">
import XMark from "../icons/X-mark.vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
const props = defineProps({
  justIcon: {
    type: Boolean,
    default: false,
  },
  buttonText: {
    type: String,
  },
  buttonIcon: {
    type: Object,
    required: true,
  },
  modalTitle: {
    type: String,
    required: true,
  },
  open: {
    type: Boolean,
    required: false,
    default: false,
  },
  handleOpen: {
    type: Function,
    required: true,
  },
  handleCancel: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <button
    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full mb-3 md:mb-0 transition-all duration-500"
    @click="handleOpen()"
    v-if="!justIcon"
  >
    <props.buttonIcon class="h-5 w-5 mr-2 -ml-1" />
    <span>{{ buttonText }}</span>
  </button>
  <button
    v-else
    type="button"
    class="text-indigo-700 border border-indigo-700 hover:bg-indigo-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:focus:ring-indigo-800 transition-colors duration-300"
    @click="handleOpen()"
  >
    <props.buttonIcon class="h-5 w-5" />
    <span class="sr-only">Edit</span>
  </button>
  <TransitionRoot as="template" :show="props.open">
    <Dialog as="div" class="relative z-10" @close="handleCancel()">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-700 bg-opacity-80 transition-opacity"
        />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-700 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg"
            >
              <div
                class="bg-white dark:bg-gray-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
              >
                <div class="sm:flex sm:items-start">
                  <button
                    type="button"
                    @click="handleCancel()"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  >
                    <XMark />
                    <span class="sr-only">Close modal</span>
                  </button>
                  <div class="mt-3 w-full sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      {{ props.modalTitle }}
                    </DialogTitle>
                    <div class="w-full pt-7">
                      <slot name="content"></slot>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
