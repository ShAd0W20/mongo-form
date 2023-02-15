import * as dotenv from "dotenv";

dotenv.config();

export default {
  MONGO_URI: process.env.MONGO_URI || "",
  BASE_PORT: process.env.PORT || 3000,
};
