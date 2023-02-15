<script setup lang="ts">
import Modal from "@/components/Base/BaseModal.vue";
import ModalCancelButton from "@/components/Base/ModalCancelButton.vue";
import ModalInput from "@/components/Base/ModalInput.vue";
import ModalSubmitButton from "@/components/Base/ModalSubmitButton.vue";
import PlusCircle from "@/components/icons/PlusCircle.vue";
import { createRestaurant } from "@/services/restaurants";
import type { RestaurantRequestSchema } from "@/types";
import { notifyError, notifySuccess } from "@/utils/sendNotification";
import { ref } from "vue";

const open = ref(false);
const loading = ref(false);

const formState = ref<RestaurantRequestSchema>({
  name: "",
  cuisine: "",
  borough: "",
  restaurant_id: "",
  address: {
    building: "",
    street: "",
    zipcode: "",
    coord: [0, 0],
  },
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    await createRestaurant(formState.value);
    resetForm();
    open.value = false;
    notifySuccess("Restaurant created successfully");
  } catch (error: any) {
    notifyError(error.response.data.message);
  } finally {
    loading.value = false;
  }
};

const handleCancel = () => {
  open.value = false;
  resetForm();
};

const resetForm = () => {
  formState.value = {
    name: "",
    cuisine: "",
    borough: "",
    restaurant_id: "",
    address: {
      building: "",
      street: "",
      zipcode: "",
      coord: [0, 0],
    },
  };
};
</script>

<template>
  <Modal
    button-text="New Restaurant"
    modal-title="New Restaurant"
    :button-icon="PlusCircle"
    :open="open"
    :handle-cancel="() => (open = !open)"
    :handle-open="() => (open = !open)"
  >
    <template #content>
      <form class="w-full" @submit.prevent="handleSubmit">
        <ModalInput
          label-text="Restaurant ID"
          input-id="restaurantId"
          input-name="restaurantId"
          input-type="text"
          :input-required="true"
          v-model="formState.restaurant_id"
        />
        <ModalInput
          label-text="Restaurant Name"
          input-id="restaurantName"
          input-name="restaurantName"
          input-type="text"
          :input-required="true"
          v-model="formState.name"
        />
        <ModalInput
          label-text="Cuisine"
          input-id="cuisine"
          input-name="cuisine"
          input-type="text"
          :input-required="true"
          v-model="formState.cuisine"
        />
        <ModalInput
          label-text="Borough"
          input-id="borough"
          input-name="borough"
          input-type="text"
          :input-required="true"
          v-model="formState.borough"
        />
        <div class="grid md:grid-cols-3 md:gap-6">
          <ModalInput
            label-text="Building"
            input-id="building"
            input-name="building"
            input-type="text"
            :input-required="true"
            v-model="formState.address.building"
          />
          <ModalInput
            label-text="Street"
            input-id="street"
            input-name="street"
            input-type="text"
            :input-required="true"
            v-model="formState.address.street"
          />
          <ModalInput
            label-text="Zipcode"
            input-id="zipcode"
            input-name="zipcode"
            input-type="text"
            :input-required="true"
            v-model="formState.address.zipcode"
          />
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <ModalInput
            label-text="Latitude"
            input-id="latitude"
            input-name="latitude"
            input-type="float"
            :input-required="true"
            v-model="formState.address.coord[0]"
          />
          <ModalInput
            label-text="Longitude"
            input-id="longitude"
            input-name="longitude"
            input-type="float"
            :input-required="true"
            v-model="formState.address.coord[1]"
          />
        </div>

        <div class="bg-white dark:bg-gray-700 sm:flex sm:flex-row-reverse">
          <ModalSubmitButton :loading="loading" />
          <ModalCancelButton :onClickFunction="handleCancel" />
        </div>
      </form>
    </template>
  </Modal>
</template>
