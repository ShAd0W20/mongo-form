import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { Restaurant } from "../models/restaurant";

export const getRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const restaurants = await Restaurant.find()
      .limit((limit as number) * 1)
      .skip(page > 0 ? ((page as number) - 1) * (limit as number) : 1);

    const count = await Restaurant.countDocuments();

    res.status(200).json({
      restaurants,
      totalPages: Math.ceil(count / (limit as number)),
      currentPage: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    next(error);
  }
};

export const getRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error("No restaurant with that id");
    }

    const restaurant = await Restaurant.findById({ _id: id });
    res.status(200).json({ restaurant });
  } catch (error) {
    next(error);
  }
};

export const filterRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      cuisine,
      borough,
      restaurant_id,
      street,
      page = 1,
      limit = 10,
    } = req.query;

    const restaurants = await Restaurant.find({
      $or: [
        { name: { $regex: ".*" + name + ".*" } },
        { cuisine: { $regex: ".*" + cuisine + ".*" } },
        { borough: { $regex: ".*" + borough + ".*" } },
        { restaurant_id: { $regex: ".*" + restaurant_id + ".*" } },
        { street: { $regex: ".*" + street + ".*" } },
      ],
    })
      .limit((limit as number) * 1)
      .skip(page > 0 ? ((page as number) - 1) * (limit as number) : 1);

    const count = await Restaurant.countDocuments({
      $or: [
        { name: { $regex: ".*" + name + ".*" } },
        { cuisine: { $regex: ".*" + cuisine + ".*" } },
        { borough: { $regex: ".*" + borough + ".*" } },
        { restaurant_id: { $regex: ".*" + restaurant_id + ".*" } },
        { street: { $regex: ".*" + street + ".*" } },
      ],
    });

    res.status(200).json({
      restaurants,
      totalPages: Math.ceil(count / (limit as number)),
      currentPage: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    next(error);
  }
};

export const createRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurant = req.body;

    const newRestaurant = new Restaurant(restaurant);

    const error = await newRestaurant.validateSync();

    if (error) {
      res.status(400);
      throw new Error(error);
    }

    const result = await newRestaurant.save();
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: _id } = req.params;
    const restaurant = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(404);
      throw new Error("No restaurant with that id");
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      _id,
      restaurant,
      {
        new: true,
      }
    );

    res.json(updatedRestaurant);
  } catch (error) {
    next(error);
  }
};

export const deleteRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error("No restaurant with that id");
    }

    const restaurant = await Restaurant.findByIdAndDelete({ _id: id });

    res.json({ message: "Restaurant deleted successfully", restaurant });
  } catch (error) {
    next(error);
  }
};
