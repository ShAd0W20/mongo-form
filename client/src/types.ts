interface GradeSchema {
  date: Date;
  grade: string;
  score: number;
}

interface AddressSchema {
  building: string;
  street: string;
  zipcode: string;
  coord: [number, number];
}

export interface RestaurantSchema {
  _id: string;
  name: string;
  borough: string;
  cuisine: string;
  grades: GradeSchema[];
  address: AddressSchema;
  restaurant_id: string;
}

export interface RestaurantRequestSchema
  extends Omit<RestaurantSchema, "_id" | "grades"> {}

export interface RestaurantFilterSchema {
  name?: string;
  cuisine?: string;
  borough?: string;
  restaurant_id?: string;
  street?: string;
  page: number;
  limit: number;
}
