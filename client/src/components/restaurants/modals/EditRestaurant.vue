<script setup lang="ts">
import Modal from "@/components/Base/BaseModal.vue";
import ModalCancelButton from "@/components/Base/ModalCancelButton.vue";
import ModalInput from "@/components/Base/ModalInput.vue";
import ModalSubmitButton from "@/components/Base/ModalSubmitButton.vue";
import PencilSquare from "@/components/icons/PencilSquare.vue";
import { updateRestaurant } from "@/services/restaurants";
import type { RestaurantSchema } from "@/types";
import { notifyError, notifySuccess } from "@/utils/sendNotification";
import { ref } from "vue";
import { useRestaurantsStore } from "@/stores/restaurants";

const store = useRestaurantsStore();

const open = ref(false);
const loading = ref(false);

const props = defineProps<{
  restaurant: RestaurantSchema;
}>();

const formState = ref({
  name: props.restaurant.name,
  cuisine: props.restaurant.cuisine,
  borough: props.restaurant.borough,
  address: props.restaurant.address,
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    const response = await updateRestaurant(props.restaurant._id, {
      ...props.restaurant,
      ...formState.value,
    });
    formState.value = response;
    store.updateRestaurant(response);
    open.value = false;
    notifySuccess("Restaurant updated successfully");
  } catch (error: any) {
    notifyError(error.message);
  } finally {
    loading.value = false;
  }
};

const handleCancel = () => {
  open.value = false;
};
</script>

<template>
  <Modal
    :just-icon="true"
    modal-title="Edit Restaurant"
    :button-icon="PencilSquare"
    :open="open"
    :handle-cancel="() => (open = !open)"
    :handle-open="() => (open = !open)"
  >
    <template #content>
      <form class="w-full" @submit.prevent="handleSubmit">
        <ModalInput
          label-text="Name"
          input-id="name"
          input-name="name"
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
            input-id="address"
            input-name="address"
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
