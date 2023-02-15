<script setup lang="ts">
import { deleteRestaurant } from "@/services/restaurants";
import type { RestaurantSchema } from "@/types";
import { notifyError, notifySuccess } from "@/utils/sendNotification";
import Trash from "../icons/TrashCan.vue";
import EditRestaurant from "./modals/EditRestaurant.vue";
import { useRestaurantsStore } from "@/stores/restaurants";

const store = useRestaurantsStore();

const props = defineProps<{
  filteredRestaurants: Array<RestaurantSchema>;
}>();

const handleDeleteRestaurant = (restaurant_id: string) => {
  deleteRestaurant(restaurant_id)
    .then((response) => {
      store.deleteRestaurant(response.restaurant._id);
      notifySuccess("Restaurant deleted successfully");
    })
    .catch((error) => {
      notifyError(error.message);
    });
};
</script>

<template>
  <table
    class="w-full text-sm text-left text-gray-500 dark:text-gray-400 transition-all duration-500"
  >
    <thead
      class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 transition-colors duration-500"
    >
      <tr>
        <th scope="col" class="py-3 px-6">Restaurant name</th>
        <th scope="col" class="py-3 px-6">ID</th>
        <th scope="col" class="py-3 px-6">Address</th>
        <th scope="col" class="py-3 px-6">Zipcode</th>
        <th scope="col" class="py-3 px-6">Borough</th>
        <th scope="col" class="py-3 px-6">Cuisine</th>
        <th scope="col" class="py-3 px-6">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700 transition-colors duration-500"
        v-for="restaurant in props.filteredRestaurants"
        :key="restaurant._id"
      >
        <th
          class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white transition-colors duration-500"
        >
          {{ restaurant.name }}
        </th>
        <td class="py-4 px-6">
          {{ restaurant.restaurant_id }}
        </td>
        <td class="py-4 px-6">
          {{ restaurant.address.street }}
        </td>
        <td class="py-4 px-6">
          {{ restaurant.address.zipcode }}
        </td>
        <td class="py-4 px-6">
          {{ restaurant.borough }}
        </td>
        <td class="py-4 px-6">
          {{ restaurant.cuisine }}
        </td>

        <td class="py-4 px-6 flex space-x-3">
          <EditRestaurant :restaurant="restaurant" />
          <button
            type="button"
            class="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 transition-colors duration-300"
            @click="handleDeleteRestaurant(restaurant._id)"
          >
            <Trash class="w-5 h-5" />
            <span class="sr-only">Delete</span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
