import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MealDocument = HydratedDocument<Meal>;

@Schema()
export class Meal {
  @Prop()
  mealId: string;
  @Prop()
  price: number;
  @Prop()
  quantity: number;
}

export const MealSchema = SchemaFactory.createForClass(Meal);
