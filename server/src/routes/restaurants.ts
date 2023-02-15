import { Router } from "express";
import * as RestaurantService from "../services/restaurants";

const router = Router();

router.get("/", RestaurantService.getRestaurants);
router.get("/filter", RestaurantService.filterRestaurants);
router.get("/:id", RestaurantService.getRestaurant);
router.post("/", RestaurantService.createRestaurant);
router.put("/:id", RestaurantService.updateRestaurant);

router.delete("/:id", RestaurantService.deleteRestaurant);

export default router;
