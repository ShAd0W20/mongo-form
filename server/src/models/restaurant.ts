import mongoose from "mongoose";

const GradeSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  grade: {
    type: String,
    required: [true, "Please provide a grade."],
    enum: ["A", "B", "C", "D", "F"],
  },
  score: {
    type: Number,
    required: [true, "Please provide a score."],
    min: 0,
    max: 100,
  },
}, { _id: false });

const AddressSchema = new mongoose.Schema({
  building: {
    type: String,
    required: [true, "Please provide a building name or number."],
  },
  street: {
    type: String,
    required: [true, "Please provide a street."],
  },
  zipcode: {
    type: String,
    required: [true, "Please provide a zipcode."],
  },
  coord: {
    type: [Number],
    index: "2dsphere",
  },
}, { _id: false });

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name."],
    unique: true,
    trim: true,
    maxlength: [60, "Name cannot be more than 60 characters."],
  },
  borough: {
    type: String,
    required: [true, "Please provide a borough."],
    enum: [
      "Bronx",
      "Brooklyn",
      "Manhattan",
      "Queens",
      "Staten Island",
      "Missing",
    ],
  },
  cuisine: {
    type: String,
    required: [true, "Please provide a cuisine."],
    enum: [
      "American",
      "Chinese",
      "Chiken",
      "Cuban",
      "Delicatessen",
      "Donuts",
      "French",
      "Greek",
      "Indian",
      "Irish",
      "Italian",
      "Japanese",
      "Jewish/Kosher",
      "Latin (Cuban, Dominican, Puerto Rican, South & Central American)",
      "Mexican",
      "Pizza",
      "Pizza/Italian",
      "Pakistani",
      "Polish",
      "Russian",
      "Salads",
      "Sandwiches/Salads/Mixed Buffet",
      "Seafood",
      "Soups",
      "Soups & Sandwiches",
      "Spanish",
      "Tex-Mex",
      "Thai",
      "Turkish",
      "Vegetarian",
      "Vietnamese/Cambodian/Malaysia",
      "Other",
    ],
  },
  address: AddressSchema,
  grades: [GradeSchema],
  restaurant_id: {
    type: String,
    required: [true, "Please provide a restaurant_id."],
  },
});
      

export const Restaurant = mongoose.models.Restaurant || mongoose.model("Restaurant", RestaurantSchema);