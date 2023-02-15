import type { RestaurantFilterSchema, RestaurantRequestSchema } from "@/types";
import axios from "axios";

const baseUrl = "http://localhost:3000/api/v1";

export const getRestaurants = async ({ page = 1, limit = 10 }) => {
  const { data } = await axios.get(`${baseUrl}/restaurants`, {
    params: { page, limit },
  });
  return data;
};

export const getRestaurant = async (id: string) => {
  const { data } = await axios.get(`${baseUrl}/restaurants/${id}`);
  return data;
};

export const getFilteredRestaurants = async ({
  name,
  cuisine,
  borough,
  restaurant_id,
  street,
  page = 1,
  limit = 10,
}: RestaurantFilterSchema) => {
  const { data } = await axios.get(`${baseUrl}/restaurants/filter`, {
    params: {
      name,
      cuisine,
      borough,
      restaurant_id,
      street,
      page,
      limit,
    },
  });
  return data;
};

export const createRestaurant = async (restaurant: RestaurantRequestSchema) => {
  const { data } = await axios.post(`${baseUrl}/restaurants`, restaurant);
  return data;
};

export const updateRestaurant = async (id: string, restaurant: any) => {
  const { data } = await axios.put(`${baseUrl}/restaurants/${id}`, restaurant);
  return data;
};

export const deleteRestaurant = async (id: string) => {
  const { data } = await axios.delete(`${baseUrl}/restaurants/${id}`);
  return data;
};
