import type { RestaurantSchema } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useRestaurantsStore = defineStore("restaurants", () => {
  const restaurants = ref<RestaurantSchema[]>([]);

  const setRestaurants = (res: RestaurantSchema[]) => {
    restaurants.value = res;
  };

  const addRestaurant = (res: RestaurantSchema) => {
    restaurants.value.push(res);
  };

  const updateRestaurant = (res: RestaurantSchema) => {
    const index = restaurants.value.findIndex(
      (restaurant) => restaurant._id === res._id
    );
    restaurants.value[index] = res;
  };

  const deleteRestaurant = (id: string) => {
    restaurants.value = restaurants.value.filter(
      (restaurant) => restaurant._id !== id
    );
  };

  return {
    restaurants,
    setRestaurants,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
  };
});
